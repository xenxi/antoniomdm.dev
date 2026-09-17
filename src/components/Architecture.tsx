import type { ComponentChildren } from "preact";
import type { UiData } from "../data/ui";
import { useLocale } from "../i18n/context";

type CaseStudy = UiData["architectureCases"][number];
type Decision = UiData["representativeDecisions"][number];
const sectionOrder = [
  "context",
  "problem",
  "constraints",
  "options",
  "decision",
  "implementation",
  "tradeoffs",
  "result",
  "learning",
] as const;

function DiagramNode({
  children,
  tone,
}: {
  children: ComponentChildren;
  tone?: "source" | "change" | "outcome";
}) {
  return (
    <li class={tone ? `diagram-node diagram-node-${tone}` : "diagram-node"}>
      {children}
    </li>
  );
}
function Flow({ children }: { children: ComponentChildren }) {
  return <ol class="diagram-flow">{children}</ol>;
}
function ArchitectureDiagram({ item }: { item: CaseStudy }) {
  if (!item.diagram) return null;
  const titleId = `${item.id}-diagram-title`;
  const descriptionId = `${item.id}-diagram-description`;
  return (
    <figure
      class={`architecture-diagram diagram-${item.id}`}
      role="group"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <h2 id={titleId}>{item.diagram.title}</h2>
      <figcaption id={descriptionId}>{item.diagram.description}</figcaption>
      <div class="diagram-stages">
        {item.diagram.groups.map((group) => (
          <section
            class={group.wide ? "diagram-wide" : undefined}
            key={group.title}
          >
            <h3>{group.title}</h3>
            <Flow>
              {group.nodes.map((value) => (
                <DiagramNode key={value.label} tone={value.tone}>
                  {value.label}
                </DiagramNode>
              ))}
            </Flow>
            {group.note && <p class="diagram-note">{group.note}</p>}
          </section>
        ))}
      </div>
    </figure>
  );
}
function EvidenceBadge({ kind }: { kind: Decision["evidenceKind"] }) {
  const { locale } = useLocale();
  return (
    <span class={`decision-evidence decision-evidence-${kind}`}>
      {kind === "professional"
        ? locale === "es"
          ? "PROFESIONAL"
          : "PROFESSIONAL"
        : kind === "personal"
          ? "PERSONAL"
          : locale === "es"
            ? "PATRÓN RECURRENTE"
            : "RECURRING PATTERN"}
    </span>
  );
}
function DecisionAreas({ data }: { data: UiData }) {
  const { locale } = useLocale();
  return (
    <section class="decision-areas" aria-labelledby="decision-areas-title">
      <div class="architecture-section-heading">
        <p class="eyebrow">
          01 / {locale === "es" ? "MAPA DE DECISIONES" : "DECISION MAP"}
        </p>
        <h2 id="decision-areas-title">
          {locale === "es" ? "Áreas de decisión" : "Decision areas"}
        </h2>
        <p>
          {locale === "es"
            ? "Las preguntas que aparecen una y otra vez al diseñar, modernizar y operar sistemas reales."
            : "The questions that recur when designing, modernizing and operating real systems."}
        </p>
      </div>
      <div class="decision-area-grid">
        {data.decisionAreas.map((area) => (
          <article class="decision-area" key={area.id}>
            <h3>{area.title}</h3>
            <p>{area.summary}</p>
            <div class="decision-area-links">
              {area.decisionIds.map((id) => {
                const decision = data.representativeDecisions.find(
                  (item) => item.id === id,
                );
                return decision ? (
                  <a href={`#${decision.id}`} key={id}>
                    {decision.number} · {decision.title}
                  </a>
                ) : null;
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function RepresentativeDecisions({ data }: { data: UiData }) {
  const { locale, href } = useLocale();
  const cases = new Map(data.architectureCases.map((item) => [item.id, item]));
  return (
    <section
      class="representative-decisions"
      aria-labelledby="representative-decisions-title"
    >
      <div class="architecture-section-heading">
        <p class="eyebrow">
          02 / {locale === "es" ? "SEÑALES FUERTES" : "STRONG SIGNALS"}
        </p>
        <h2 id="representative-decisions-title">
          {locale === "es"
            ? "Decisiones representativas"
            : "Representative decisions"}
        </h2>
        <p>
          {locale === "es"
            ? "No es un catálogo de patrones: son decisiones sobre coste total, ownership, comportamiento y reversibilidad."
            : "This is not a pattern catalogue: these are decisions about total cost, ownership, behaviour and reversibility."}
        </p>
      </div>
      <div class="decision-grid">
        {data.representativeDecisions.map((item) => (
          <article class="decision-card" id={item.id} key={item.id}>
            <div class="decision-card-top">
              <span class="case-number">{item.number}</span>
              <EvidenceBadge kind={item.evidenceKind} />
            </div>
            <h3>{item.title}</h3>
            <p class="decision-summary">{item.summary}</p>
            <details class="decision-detail">
              <summary>
                {locale === "es" ? "Explorar decisión" : "Explore decision"}
              </summary>
              <dl class="decision-fields">
                <div>
                  <dt>{locale === "es" ? "Problema" : "Problem"}</dt>
                  <dd>{item.problem}</dd>
                </div>
                <div>
                  <dt>{locale === "es" ? "Decisión" : "Decision"}</dt>
                  <dd>{item.decision}</dd>
                </div>
              </dl>
              <p class="decision-principle">“{item.principle}”</p>
              <div class="evidence-links">
                {item.experienceIds.map((id) => (
                  <a href={href(`/experience/#${id}`)} key={id}>
                    {
                      data.professionalExperience.find((job) => job.id === id)
                        ?.company
                    }
                  </a>
                ))}
              </div>
              <div class="decision-signals">
                {item.competencyIds.map((id) => (
                  <span key={id}>
                    {
                      data.competencies.find(
                        (competency) => competency.id === id,
                      )?.name
                    }
                  </span>
                ))}
              </div>
              <div class="decision-footer">
                {item.technologyExamples.map((value) => (
                  <span key={value}>{value}</span>
                ))}
                {item.caseStudyIds.map((id) =>
                  cases.get(id) ? (
                    <a
                      data-native-navigation
                      href={href(`/architecture/${cases.get(id)!.slug}/`)}
                      key={id}
                    >
                      {locale === "es" ? "Caso completo ↗" : "Deep dive ↗"}
                    </a>
                  ) : null,
                )}
              </div>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
function Relations({ item, data }: { item: CaseStudy; data: UiData }) {
  const { locale, href } = useLocale();
  const l = (es: string, en: string) => (locale === "es" ? es : en);
  const experiences = new Map(
    data.professionalExperience.map((value) => [value.id, value.company]),
  );
  const competencies = new Map(
    data.competencies.map((value) => [value.id, value.name]),
  );
  const achievements = new Map(
    data.achievements.map((value) => [value.id, value.title]),
  );
  return (
    <section class="architecture-relations" aria-labelledby="relations-title">
      <h2 id="relations-title">
        {l("Evidencia y relaciones", "Evidence and relations")}
      </h2>
      <div class="relation-groups">
        {item.experienceIds.length > 0 && (
          <div>
            <h3>{l("Experiencia", "Experience")}</h3>
            {item.experienceIds.map((id) => (
              <a key={id} href={href(`/experience/#${id}`)}>
                {experiences.get(id)}
              </a>
            ))}
          </div>
        )}
        {item.competencyIds.length > 0 && (
          <div>
            <h3>{l("Competencias", "Competencies")}</h3>
            {item.competencyIds.map((id) => (
              <a key={id} href={href(`/profile/competencies/#${id}`)}>
                {competencies.get(id)}
              </a>
            ))}
          </div>
        )}
        {item.achievementIds.length > 0 && (
          <div>
            <h3>{l("Logros", "Achievements")}</h3>
            {item.achievementIds.map((id) => (
              <a key={id} href={href(`/profile/achievements/#${id}`)}>
                {achievements.get(id)}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export default function Architecture({
  path,
  data,
}: {
  path: string;
  data: UiData;
}) {
  const { locale, href } = useLocale();
  const l = (es: string, en: string) => (locale === "es" ? es : en);
  const selected = data.architectureCases.find(
    (item) => path === `/architecture/${item.slug}/`,
  );
  const competencies = new Map(
    data.competencies.map((item) => [item.id, item.name]),
  );
  if (!selected)
    return (
      <div class="architecture-app architecture-index">
        <header class="architecture-index-header">
          <p class="eyebrow">
            {l(
              "ARQUITECTURA / DECISIONES DE INGENIERÍA",
              "ARCHITECTURE / ENGINEERING DECISIONS",
            )}
          </p>
          <h1>
            {l(
              "La arquitectura es una secuencia continua de decisiones.",
              "Architecture is a continuous sequence of decisions.",
            )}
          </h1>
          <p>
            {l(
              "Diseñar, simplificar y operar sistemas bajo restricciones reales: implementación, comportamiento, ownership, coste y reversibilidad. La evidencia principal procede de experiencia profesional; los laboratorios personales amplían la exploración.",
              "Designing, simplifying and operating systems under real constraints: implementation, behaviour, ownership, cost and reversibility. The primary evidence comes from professional experience; personal labs broaden the exploration.",
            )}
          </p>
        </header>
        <DecisionAreas data={data} />
        <RepresentativeDecisions data={data} />
        <section class="deep-dive-cases" aria-labelledby="deep-dive-title">
          <div class="architecture-section-heading">
            <p class="eyebrow">
              03 / {l("EVIDENCIA EN PROFUNDIDAD", "DEEP EVIDENCE")}
            </p>
            <h2 id="deep-dive-title">
              {l("Casos de estudio", "Deep-dive case studies")}
            </h2>
            <p>
              {l(
                "Contexto, fuerzas de decisión, alternativas, trade-offs, resultado y aprendizaje en casos anonimizados o generalizados.",
                "Context, decision forces, options, trade-offs, outcome and learning in anonymized or generalized cases.",
              )}
            </p>
          </div>
          <div class="architecture-grid">
            {data.architectureCases.map((item, index) => (
              <a
                class={`architecture-card architecture-card-${index + 1}`}
                data-native-navigation
                href={href(`/architecture/${item.slug}/`)}
                key={item.id}
              >
                <span class="case-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <ul
                    class="case-themes"
                    aria-label={l(
                      "Temas de arquitectura",
                      "Architecture themes",
                    )}
                  >
                    {item.competencyIds.map((id) => (
                      <li key={id}>{competencies.get(id)}</li>
                    ))}
                  </ul>
                  <span class="case-open">
                    {l("Abrir caso", "Open case")}{" "}
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    );
  const sectionLabels: Record<(typeof sectionOrder)[number], string> = {
    context: l("Contexto", "Context"),
    problem: l("Problema", "Problem"),
    constraints: l("Fuerzas de decisión", "Decision forces"),
    options: l("Alternativas", "Options"),
    decision: l("Decisión y evolución", "Decision and evolution"),
    implementation: l("Implementación", "Implementation"),
    tradeoffs: "Trade-offs",
    result: l("Resultado", "Outcome"),
    learning: l("Aprendizaje", "Learning"),
  };
  const sections = new Map(
    selected.sections.map((section) => [section.id, section.content]),
  );
  if (!sections.has("options"))
    sections.set(
      "options",
      l(
        "La evidencia describe la decisión adoptada; no documenta una lista completa de alternativas evaluadas.",
        "The evidence records the adopted decision; it does not document a complete shortlist of evaluated alternatives.",
      ),
    );
  const principles = [
    ...new Set(
      data.representativeDecisions
        .filter((item) => item.caseStudyIds.includes(selected.id))
        .map((item) => item.principle),
    ),
  ];
  return (
    <article
      class="architecture-app architecture-case"
      data-architecture-case={selected.id}
    >
      <a class="back-link" data-native-navigation href={href("/architecture/")}>
        ← {l("Todas las decisiones", "All decisions")}
      </a>
      <header class="case-header">
        <p class="eyebrow">
          {l(
            "CASO DE ESTUDIO · EXPERIENCIA PROFESIONAL",
            "CASE STUDY · PROFESSIONAL EXPERIENCE",
          )}
        </p>
        <h1>{selected.title}</h1>
        <p class="lead">{selected.summary}</p>
        <ul
          class="case-themes"
          aria-label={l("Competencias relacionadas", "Related competencies")}
        >
          {selected.competencyIds.map((id) => (
            <li key={id}>{competencies.get(id)}</li>
          ))}
        </ul>
      </header>
      <div class="case-sections">
        {sectionOrder.slice(0, 5).map(
          (id) =>
            sections.get(id) && (
              <section id={id} key={id}>
                <h2>{sectionLabels[id]}</h2>
                <p>{sections.get(id)}</p>
              </section>
            ),
        )}
        <section>
          <h2>{l("Por qué", "Why")}</h2>
          {principles.map((principle) => (
            <p key={principle}>{principle}</p>
          ))}
        </section>
        <ArchitectureDiagram item={selected} />
        {sectionOrder.slice(5).map(
          (id) =>
            sections.get(id) && (
              <section id={id} key={id}>
                <h2>{sectionLabels[id]}</h2>
                <p>{sections.get(id)}</p>
              </section>
            ),
        )}
      </div>
      <Relations item={selected} data={data} />
    </article>
  );
}
