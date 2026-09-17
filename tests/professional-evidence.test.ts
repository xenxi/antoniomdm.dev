import { describe, expect, it } from "vitest";
import {
  getProfile,
  getProjects,
  getRepresentativeDecisions,
  publicProfessionalModel as model,
  validatePublicProfessionalModel,
} from "../src/data/professional";
import { getPortfolio } from "../src/data/portfolio";
import { resolveTerminalCommand } from "../src/data/terminal";
import provenance from "../docs/professional-evidence.json";

describe("shared professional evidence", () => {
  it("keeps an internal source reference for every published claim", () => {
    expect(provenance.claims.map((item) => item.id).sort()).toEqual(
      model.claims.map((item) => item.id).sort(),
    );
    for (const claim of model.claims) {
      const source = provenance.claims.find((item) => item.id === claim.id)!;
      expect(source.evidenceId).toBe(claim.evidenceId);
      expect(source.delivery).toBe(claim.status);
      expect(source.source[0]).toMatch(/^career\//);
    }
  });
  it("rejects personal evidence promoted to professional architecture", () => {
    const candidate = structuredClone(model);
    candidate.representativeDecisions[0].claimIds = ["platform-implemented"];
    expect(validatePublicProfessionalModel(candidate).join("\n")).toContain(
      "cannot use personal evidence as professional evidence",
    );
  });

  it("rejects orphaned metrics and decisions without evidence", () => {
    const candidate = structuredClone(model);
    candidate.representativeDecisions[0].achievementIds = [
      "unconfirmed-saving",
    ];
    candidate.representativeDecisions[1].claimIds = [];
    const errors = validatePublicProfessionalModel(candidate).join("\n");
    expect(errors).toContain("unconfirmed-saving");
    expect(errors).toContain("needs claim evidence");
  });

  it("keeps every lab in the shared model and preserves localized facts across adapters", () => {
    for (const locale of ["es", "en"] as const) {
      const domain = getProjects(locale);
      const portfolio = getPortfolio(locale);
      expect(domain).toHaveLength(9);
      for (const project of portfolio.projects) {
        const source = domain.find((item) => item.id === project.id)!;
        expect(source.title).toBe(project.name);
        expect(source.summary).toBe(project.description);
        expect(source.technologies).toEqual(project.technologies);
        expect(project.purpose.trim()).not.toBe("");
        expect(project.tradeoff.trim()).not.toBe("");
        if (locale === "es") expect(project.status).toContain("IMPLEMENTADO");
        else expect(project.status).toContain("IMPLEMENTED");
      }
      expect(portfolio.profile.introduction).toBe(
        getProfile(locale).introduction,
      );
    }
  });

  it("keeps confirmed cases distinct from recurring patterns and unresolved technologies", () => {
    const decisions = getRepresentativeDecisions("en");
    expect(decisions).toHaveLength(14);
    expect(model.decisionAreas).toHaveLength(11);
    expect(
      decisions.find((item) => item.id === "ddd-where-needed")?.evidenceKind,
    ).toBe("professional");
    expect(
      decisions.find((item) => item.id === "crud-isnt-crud")?.evidenceKind,
    ).toBe("recurring-pattern");
    expect(
      decisions.flatMap((item) => item.technologyExamples).join(" "),
    ).not.toMatch(
      /gRPC|MassTransit|Qdrant|RAG|Polly|Container Apps|Grafana|Tempo/,
    );
    for (const decision of decisions)
      expect(decision.claimIds.length).toBeGreaterThan(0);
  });

  it("exposes bounded terminal exploration without accepting arbitrary cat or shell commands", () => {
    expect(resolveTerminalCommand("cat mode.txt")?.id).toBe("mode");
    expect(resolveTerminalCommand("cat principles.txt")?.id).toBe("principles");
    expect(resolveTerminalCommand("impact")?.action).toBe("OUTPUT");
    expect(resolveTerminalCommand("cat private.txt")).toBeUndefined();
    expect(resolveTerminalCommand("impact; reboot")).toBeUndefined();
  });
});
