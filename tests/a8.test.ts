import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { contactInfo, contactMailto, contactSummary } from '../src/data/contact';
import { resolveTerminalCommand, terminalAliases, terminalCommands } from '../src/data/terminal';
import { getProfile, publicProfessionalModel, validatePublicProfessionalModel, type ProfessionalModelCandidate } from '../src/data/professional';

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
  const requiredCanonical = ['help', 'mode', 'principles', 'impact', 'whoami', 'profile', 'experience', 'architecture', 'projects', 'ai', 'contact', 'github', 'linkedin', 'clear', 'theme', 'arcade', 'reboot', 'sudo'];

  it('contains every canonical command exactly once', () => {
    const ids = terminalCommands.map(command => command.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of requiredCanonical) expect(ids).toContain(id);
    expect(ids).toEqual(requiredCanonical);
  });

  it('resolves aliases and rejects anything else', () => {
    expect(terminalAliases).toEqual({ 'cat mode.txt': 'mode', 'cat principles.txt': 'principles', about: 'profile', career: 'experience', work: 'experience' });
    for (const [alias, target] of Object.entries(terminalAliases)) {
      expect(terminalCommands.map(command => command.id)).toContain(target);
      expect(resolveTerminalCommand(alias)?.id).toBe(target);
    }
  });

  it('resolves only allowlisted navigation and external-link targets', () => {
    expect(resolveTerminalCommand('PROFILE')?.route).toBe('/profile/');
    expect(resolveTerminalCommand('resume')).toBeUndefined();
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

describe('A8.1 public web privacy boundary', () => {
  it('does not leak telephone through the public web contact model', () => {
    for (const file of ['src/components/Contact.tsx', 'src/data/contact.ts', 'src/components/Terminal.tsx']) {
      const source = readFileSync(file, 'utf8');
      expect(source).not.toMatch(/\+34|tel:|phone|telephone/i);
    }
  });
});
