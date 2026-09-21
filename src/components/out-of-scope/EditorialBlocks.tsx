import type { ComponentChildren } from 'preact';

interface BlockProps { children?: ComponentChildren; title?: string }

function Block({ children, title, kind }: BlockProps & { kind: string }) {
  return <aside class={`oos-block oos-block--${kind}`} aria-label={title ?? kind.replace('-', ' ')}>
    <p class="oos-block__label">{title ?? kind.replace('-', ' ')}</p>
    <div>{children}</div>
  </aside>;
}

export const Question = (props: BlockProps) => <Block {...props} kind="question" />;
export const Experiment = (props: BlockProps) => <Block {...props} kind="experiment" />;
export const Result = (props: BlockProps) => <Block {...props} kind="result" />;
export const Observation = (props: BlockProps) => <Block {...props} kind="observation" />;
export const Aside = (props: BlockProps) => <Block {...props} kind="aside" />;
export const Callout = (props: BlockProps) => <Block {...props} kind="callout" />;
export const OutOfScope = (props: BlockProps) => <Block {...props} kind="out-of-scope" />;
export const OpenQuestions = (props: BlockProps) => <Block {...props} kind="open-questions" />;

export function OriginalScope({ original, beyond, originalLabel = 'ORIGINAL SCOPE', beyondLabel = 'OUT OF SCOPE', ariaLabel = 'Original scope and out of scope' }: { original: string; beyond: string; originalLabel?: string; beyondLabel?: string; ariaLabel?: string }) {
  return <aside class="oos-scope" aria-label={ariaLabel}>
    <div><p class="oos-block__label">{originalLabel}</p><p>{original}</p></div>
    <div><p class="oos-block__label">{beyondLabel}</p><p>{beyond}</p></div>
  </aside>;
}

export function Compare({ left, right, leftLabel = 'A', rightLabel = 'B' }: { left: ComponentChildren; right: ComponentChildren; leftLabel?: string; rightLabel?: string }) {
  return <div class="oos-compare">
    <section><p class="oos-block__label">{leftLabel}</p>{left}</section>
    <section><p class="oos-block__label">{rightLabel}</p>{right}</section>
  </div>;
}

export function Code({ children, language }: { children?: ComponentChildren; language?: string }) {
  return <figure class="oos-code"><figcaption>{language ?? 'CODE'}</figcaption><pre><code>{children}</code></pre></figure>;
}
