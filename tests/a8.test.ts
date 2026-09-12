import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { contactInfo, contactMailto, contactSummary } from '../src/data/contact';
import { cvAssets } from '../src/data/cv';
import { resolveTerminalCommand, terminalAliases, terminalCommands } from '../src/data/terminal';
import { getProfile, publicProfessionalModel, validatePublicProfessionalModel, type ProfessionalModelCandidate } from '../src/data/professional';

const pdfTargets = {
  es: 'public/cv/antonio-manuel-diaz-moreno-software-architect-es.pdf',
  en: 'public/cv/antonio-manuel-diaz-moreno-software-architect-en.pdf',
} as const;

const pdf = (locale: 'es' | 'en') => {
  const buffer = readFileSync(pdfTargets[locale]);
  return { buffer, raw: buffer.toString('latin1') };
};

describe('A8.1 approved public contact data', () => {
  it('exposes exactly the approved values from the professional model', () => {
    expect(contactInfo.displayName).toBe('Antonio Manuel Díaz Moreno');
    expect(contactInfo.location).toEqual({ es: 'Linares (Jaén), España', en: 'Linares (Jaén), Spain' });
    expect(contactInfo.availability).toEqual({ es: 'Remoto', en: 'Remote' });
    expect(contactInfo.email).toBe('antoniom.diaz.moreno@gmail.com');
    expect(contactMailto).toBe('mailto:antoniom.diaz.moreno@gmail.com');
    expect(contactInfo.linkedin).toBe('https://www.linkedin.com/in/antoniomanueldiazmoreno');
    expect(contactInfo.github).toBe('https://github.com/xenxi');
    expect(contactInfo.website).toBe('https://antoniomdm.dev');
    expect(contactSummary('es')).toBe('Linares (Jaén), España · Remoto');
    expect(contactSummary('en')).toBe('Linares (Jaén), Spain · Remote');
  });

  it('has no telephone field or value on the public web contact model', () => {
    expect(contactInfo).not.toHaveProperty('phone');
    expect(contactInfo).not.toHaveProperty('telephone');
    expect(Object.keys(contactInfo)).toEqual(['displayName', 'location', 'availability', 'email', 'linkedin', 'github', 'website']);
  });

  it('keeps the model as the single factual source for contact links', () => {
    for (const [id, expected] of [['linkedin', contactInfo.linkedin], ['github', contactInfo.github], ['website', contactInfo.website]] as const) {
      const link = publicProfessionalModel.externalLinks.find(item => item.id === id);
      expect(link?.url).toBe(expected);
      expect(link?.availability).toBe('available');
    }
    const email = publicProfessionalModel.externalLinks.find(item => item.id === 'email');
    expect(email?.url).toBe(contactMailto);
  });

  it('rejects any telephone link in the public web model', () => {
    const candidate = structuredClone(publicProfessionalModel) as ProfessionalModelCandidate;
    candidate.externalLinks[0].url = 'tel:+34000000000';
    expect(validatePublicProfessionalModel(candidate).join('\n')).toContain('unsupported protocol tel:');
  });

  it('keeps the professional positioning boundary', () => {
    expect(getProfile('es').headline).toBe('Software Architect | Senior .NET Engineer');
    expect(getProfile('en').headline).toBe('Software Architect | Senior .NET Engineer');
    expect(getProfile('en').headline).not.toMatch(/AI Engineer|AI Architect|Machine Learning Engineer|Data Scientist/);
  });
});

describe('A8.1 typed terminal command allowlist', () => {
  const requiredCanonical = ['help', 'whoami', 'profile', 'experience', 'architecture', 'projects', 'ai', 'contact', 'cv', 'github', 'linkedin', 'clear', 'theme', 'arcade', 'reboot', 'sudo'];

  it('contains every canonical command exactly once', () => {
    const ids = terminalCommands.map(command => command.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of requiredCanonical) expect(ids).toContain(id);
    expect(ids).toEqual(requiredCanonical);
  });

  it('resolves aliases and rejects anything else', () => {
    expect(terminalAliases).toEqual({ about: 'profile', career: 'experience', work: 'experience', resume: 'cv' });
    for (const [alias, target] of Object.entries(terminalAliases)) {
      expect(terminalCommands.map(command => command.id)).toContain(target);
      expect(resolveTerminalCommand(alias)?.id).toBe(target);
    }
  });

  it('resolves only allowlisted navigation and external-link targets', () => {
    expect(resolveTerminalCommand('PROFILE')?.route).toBe('/profile/');
    expect(resolveTerminalCommand('resume')?.route).toBe('/cv/');
    expect(resolveTerminalCommand('github')?.externalLinkId).toBe('github');
    expect(resolveTerminalCommand('linkedin')?.externalLinkId).toBe('linkedin');
    for (const command of terminalCommands) {
      if (command.action === 'NAVIGATE') expect(command.route).toMatch(/^\/[a-z-]+\/$/);
      if (command.action === 'EXTERNAL_LINK') expect(['github', 'linkedin']).toContain(command.externalLinkId);
      expect(command).not.toHaveProperty('command');
    }
  });

  it('keeps hostile and arbitrary input inert', () => {
    for (const input of ['open https://example.com', '../../etc/passwd', 'javascript:alert(1)', "eval('x')", 'github attacker', 'github xenxi', 'rm -rf /']) {
      expect(resolveTerminalCommand(input)).toBeUndefined();
    }
  });

  it('never builds executable behavior into the terminal sources', () => {
    const sources = ['src/components/Terminal.tsx', 'src/data/terminal.ts'].map(file => readFileSync(file, 'utf8')).join('\n');
    for (const pattern of [/\beval\s*\(/, /new\s+Function\s*\(/, /child_process/, /execSync\s*\(/, /\bexec\s*\(/, /spawn\s*\(/, /process\.env/, /window\.location\s*=/, /\bfetch\s*\(/]) {
      expect(sources).not.toMatch(pattern);
    }
    expect(sources).not.toMatch(/localStorage|sessionStorage|indexedDB/);
  });
});

describe('A8.1 typed CV asset registry', () => {
  it('registers approved ES/EN PDFs, printable and TXT fallbacks', () => {
    expect(cvAssets.map(asset => asset.id)).toEqual(['cv-pdf-es', 'cv-pdf-en', 'cv-print', 'cv-txt-es', 'cv-txt-en']);
    for (const asset of cvAssets) expect(asset.status).toBe('APPROVED');
    const es = cvAssets.find(asset => asset.id === 'cv-pdf-es');
    const en = cvAssets.find(asset => asset.id === 'cv-pdf-en');
    expect(es?.publicPath).toBe('/cv/antonio-manuel-diaz-moreno-software-architect-es.pdf');
    expect(en?.publicPath).toBe('/cv/antonio-manuel-diaz-moreno-software-architect-en.pdf');
    expect(cvAssets.find(asset => asset.id === 'cv-txt-es')?.publicPath).toBe('/es/cv.txt');
    expect(cvAssets.find(asset => asset.id === 'cv-txt-en')?.publicPath).toBe('/en/cv.txt');
  });

  it('uses stable file names without version or draft suffixes', () => {
    for (const asset of cvAssets) expect(asset.publicPath).not.toMatch(/final|latest|new|draft|v\d+|\d{4}-\d{2}-\d{2}\.pdf/);
  });
});

describe('A8.1 CV PDF artifacts', () => {
  it('produces valid, two-page, text-extractable ES and EN PDFs', () => {
    for (const locale of ['es', 'en'] as const) {
      const { buffer, raw } = pdf(locale);
      expect(buffer.length).toBeGreaterThan(4000);
      expect(raw.startsWith('%PDF-')).toBe(true);
      expect(raw).toContain('%%EOF');
      expect(raw).toContain('/Count 2');
      expect(raw).toContain('Antonio Manuel Díaz Moreno');
      expect(raw).toContain('Software Architect | Senior .NET Engineer');
      expect(raw).toContain('Distributed Systems · Engineering Excellence · Applied AI');
      expect(raw).toContain('antoniom.diaz.moreno@gmail.com');
      expect(raw).toContain('linkedin.com/in/antoniomanueldiazmoreno');
      expect(raw).toContain('github.com/xenxi');
      expect(raw).toContain('antoniomdm.dev');
      expect(raw).toContain('Domingo Alonso Group');
      expect(raw).toContain('Anexia');
      expect(raw).toContain('Nokia');
    }
  });

  it('preserves the education and language boundaries in both languages', () => {
    expect(pdf('es').raw).toContain('título no obtenido');
    expect(pdf('en').raw).toContain('degree not awarded');
    expect(pdf('es').raw).toContain('Español nativo');
    expect(pdf('en').raw).toContain('Native Spanish');
  });

  it('omits telephone and forbidden claims from the CV PDFs', () => {
    for (const locale of ['es', 'en'] as const) {
      const { raw } = pdf(locale);
      expect(raw).not.toMatch(/\+34|teléfono|telephone|\bphone\b/i);
      for (const forbidden of ['AI Engineer', 'AI Architect', 'Machine Learning Engineer', 'Data Scientist', 'B2', 'C1', 'fluent', 'RAG', 'MCP', 'vector database', 'autonomous agent', 'autonomous remediation']) {
        expect(raw.toLowerCase()).not.toContain(forbidden.toLowerCase());
      }
    }
  });

  it('does not leak telephone through the public web contact model', () => {
    for (const file of ['src/components/Contact.tsx', 'src/data/contact.ts', 'src/components/Terminal.tsx']) {
      const source = readFileSync(file, 'utf8');
      expect(source).not.toMatch(/\+34|tel:|phone|telephone/i);
    }
  });
});
