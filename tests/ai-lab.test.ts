import { describe, expect, it } from 'vitest';
import { aiLabAxes, aiLabBoundaries, aiLabCases, aiLabPrinciples, getAiLabCase, getAiLabCases, validateAiLabModel } from '../src/data/aiLab';

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') { out.push(value); return out; }
  if (Array.isArray(value)) { value.forEach(item => strings(item, out)); return out; }
  if (value && typeof value === 'object') { Object.values(value).forEach(item => strings(item, out)); }
  return out;
}

const allStrings = strings(aiLabCases);
const serialized = JSON.stringify(aiLabCases);
const negated = (value: string) => /(\bno\b|\bnot\b|\bnever\b|\bsin\b|\bni\b|does not|is not|are not|not implemented|no está implementado)/i.test(value);

const byId = (id: string) => aiLabCases.find(item => item.id === id)!;

describe('A7.1 AI Lab model', () => {
  it('is a valid, bilingual dataset with the locked five cases', () => {
    expect(validateAiLabModel()).toEqual([]);
    expect(aiLabCases).toHaveLength(5);
    expect(new Set(aiLabCases.map(item => item.id)).size).toBe(5);
    expect(new Set(aiLabCases.flatMap(item => (item.slug ? [item.slug] : []))).size).toBe(3);
    for (const item of aiLabCases) {
      expect(item.title.es.trim()).not.toBe(''); expect(item.title.en.trim()).not.toBe('');
      expect(item.summary.es.trim()).not.toBe(''); expect(item.summary.en.trim()).not.toBe('');
      expect(item.lead.es.trim()).not.toBe(''); expect(item.lead.en.trim()).not.toBe('');
      expect(item.problem.es.trim()).not.toBe(''); expect(item.problem.en.trim()).not.toBe('');
    }
  });

  it('keeps the locked hierarchy of types, depths and origins', () => {
    expect(byId('ai-lab-platform934-agentic-architecture')).toMatchObject({ type: 'PRODUCT_AI', depth: 'DEEP_AI_CASE', origin: 'PERSONAL_PROJECT' });
    expect(byId('ai-lab-professional-incident-investigation')).toMatchObject({ type: 'PROFESSIONAL_AI', depth: 'STANDARD_AI_CASE', origin: 'PROFESSIONAL' });
    expect(byId('ai-lab-agentic-engineering-practice')).toMatchObject({ type: 'AGENTIC_ENGINEERING', depth: 'PRACTICE_CASE', origin: 'PORTFOLIO_ENGINEERING' });
    expect(byId('ai-lab-anexia-mlnet-property-pricing')).toMatchObject({ type: 'HISTORICAL_AI', depth: 'HISTORICAL_NOTE', origin: 'HISTORICAL_PROFESSIONAL' });
    expect(byId('ai-lab-vector-classic-nlp')).toMatchObject({ type: 'HISTORICAL_AI', depth: 'HISTORICAL_NOTE', origin: 'HISTORICAL_PROFESSIONAL' });
    expect(aiLabCases.filter(item => item.slug).map(item => item.slug)).toEqual(['platform934', 'incident-investigation', 'agentic-engineering']);
    expect(new Set(aiLabCases.map(item => item.type))).toEqual(new Set(['PRODUCT_AI', 'PROFESSIONAL_AI', 'AGENTIC_ENGINEERING', 'HISTORICAL_AI']));
    expect(new Set(aiLabCases.map(item => item.depth))).toEqual(new Set(['DEEP_AI_CASE', 'STANDARD_AI_CASE', 'PRACTICE_CASE', 'HISTORICAL_NOTE']));
  });

  it('keeps Platform934 identity technology personal and AI-specific', () => {
    const platform = getAiLabCase('en', 'platform934')!;
    expect(platform.origin).toBe('PERSONAL_PROJECT');
    expect(platform.technologies).toEqual(expect.arrayContaining(['Semantic Kernel', 'LiteLLM', '.NET']));
    expect(platform.status).toBe('IMPLEMENTED');
    expect(platform.capabilities.some(capability => capability.title === 'Gated notify_playback')).toBe(true);
    expect(platform.evidence).toContain('Personal Platform934 API project');
  });

  it('keeps the professional case anonymized and framework/provider-neutral', () => {
    const professional = byId('ai-lab-professional-incident-investigation');
    expect(professional.technologies).toEqual([]);
    expect(JSON.stringify(professional)).not.toMatch(/Semantic Kernel|LiteLLM|LangChain|LangGraph|AutoGen|OpenAI|Azure OpenAI|MCP|RAG|embeddings/i);
    expect(professional.flow?.steps.map(step => step.id)).toEqual(['trace', 'telemetry', 'knowledge', 'code', 'synthesis', 'report', 'decision']);
    expect(JSON.stringify(professional)).not.toMatch(/Domingo Alonso/i);
  });

  it('keeps the incident flow supervised and free of autonomous remediation', () => {
    const professional = byId('ai-lab-professional-incident-investigation');
    const claimStrings = strings({
      summary: professional.summary, lead: professional.lead, sections: professional.sections,
      flow: professional.flow, capabilities: professional.capabilities,
    });
    expect(claimStrings.some(value => /no autonomous production remediation|no hay remediación autónoma/i.test(value))).toBe(true);
    expect(professional.nonClaims.map(item => item.id)).toContain('no-remediation');
    for (const value of claimStrings.filter(text => /remediation|remediación/i.test(text))) expect(negated(value)).toBe(true);
  });

  it('never publishes unsupported RAG, MCP, vector or embedding claims', () => {
    const unsupported = /(\bRAG\b|\bMCP\b|embedding|vector database|base de datos vectorial|búsqueda vectorial|búsqueda semántica|semantic search)/i;
    for (const value of allStrings.filter(text => unsupported.test(text))) expect(negated(value)).toBe(true);
  });

  it('keeps the agentic engineering practice bounded and non-autonomous', () => {
    const agentic = byId('ai-lab-agentic-engineering-practice');
    expect(agentic.flow?.steps.map(step => step.id)).toEqual(['milestone', 'evidence', 'task', 'verification', 'review', 'sha']);
    expect(agentic.capabilities.map(item => item.id)).toEqual(['code-quality', 'tests', 'accessibility', 'no-js', 'responsive', 'performance', 'ci']);
    expect(agentic.nonClaims.map(item => item.id)).toContain('no-autonomous-development');
    expect(strings(agentic).join(' ')).not.toMatch(/fully autonomous|autonomous software development is/i);
  });

  it('keeps historical ML/NLP clearly historical and pre-LLM', () => {
    const anexia = byId('ai-lab-anexia-mlnet-property-pricing');
    const vector = byId('ai-lab-vector-classic-nlp');
    expect(anexia.technologies).toContain('ML.NET');
    expect(vector.lead.es).toContain('Bag of Words');
    expect(vector.lead.en).toContain('TF-IDF');
    expect(anexia.nonClaims.map(item => item.id)).toContain('no-genai');
    expect(anexia.nonClaims.map(item => item.id)).toContain('no-metrics');
    expect(vector.nonClaims.map(item => item.id)).toContain('no-modern-ai');
    expect(vector.lead.en).toContain('pre-LLM-era historical context');
  });

  it('never repositions Antonio as an AI engineer or architect', () => {
    expect(serialized).not.toMatch(/AI Engineer|AI Architect|Machine Learning Engineer|Data Scientist/i);
  });

  it('exposes the two axes, principles and boundary chips bilingually', () => {
    expect(aiLabAxes.map(item => item.id)).toEqual(['product-ai', 'agentic-engineering']);
    expect(aiLabPrinciples).toHaveLength(7);
    expect(aiLabBoundaries.map(item => item.id)).toContain('no-autonomous-remediation');
    for (const value of [...aiLabAxes, ...aiLabPrinciples, ...aiLabBoundaries]) {
      for (const field of Object.values(value)) if (field && typeof field === 'object' && 'es' in field) { expect((field as { es: string }).es.trim()).not.toBe(''); expect((field as { en: string }).en.trim()).not.toBe(''); }
    }
  });

  it('localizes every case deterministically in both locales', () => {
    expect(getAiLabCases('es').map(item => item.id)).toEqual(getAiLabCases('en').map(item => item.id));
    expect(getAiLabCase('es', 'platform934')?.title).toContain('Platform934');
    expect(getAiLabCase('en', 'incident-investigation')?.title).toBe('AI-assisted incident investigation');
    expect(getAiLabCase('es', 'agentic-engineering')?.title).toBe('Ingeniería agéntica con gates y evidencia');
  });
});
