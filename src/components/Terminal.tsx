import { useMemo, useRef, useState } from 'preact/hooks';
import type { TargetedKeyboardEvent } from 'preact';
import { useLocale } from '../i18n/context';
import type { UiData } from '../data/ui';
import { resolveTerminalCommand, terminalAliases, terminalCommands } from '../data/terminal';

interface TerminalLine { text: string; href?: string }
interface Props { open?: (path: string) => void; data: UiData }

export default function Terminal({ open, data }: Props) {
  const { locale, t } = useLocale();
  const { profile } = data.portfolio;
  const initialLines = (): TerminalLine[] => [
    { text: t('AntoñiOS [version 1.0]') },
    { text: locale === 'es' ? 'Explora decisiones, principios y resultados: mode · principles · impact' : 'Explore decisions, principles and outcomes: mode · principles · impact' },
    { text: '' },
    { text: t('Type help to explore.') },
  ];
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [history, setHistory] = useState<string[]>([]);
  const historyIndex = useRef<number | null>(null);
  const draft = useRef('');
  const inputRef = useRef<HTMLInputElement>(null);

  const externalLinks = useMemo(() => Object.fromEntries(
    data.publicLinks.filter(link => link.availability === 'available' && link.url).map(link => [link.id, link.url as string]),
  ), [data.publicLinks]);

  function helpOutput(): string {
    const commands = terminalCommands.map(command => `${command.id.padEnd(12)} ${command.description[locale]}`).join('\n');
    const aliases = Object.keys(terminalAliases).map(alias => `${alias} → ${terminalAliases[alias]}`).join(', ');
    return `${t('Available commands')}:\n${commands}\n\n${t('Aliases')}: ${aliases}`;
  }

  function prompt(token: string): TerminalLine { return { text: `antonio@antonios:~$ ${token}` }; }

  function scrollToPrompt() { requestAnimationFrame(() => inputRef.current?.scrollIntoView({ block: 'nearest' })); }

  function execute(event: Event) {
    event.preventDefault();
    const token = input.trim();
    setInput('');
    historyIndex.current = null;
    draft.current = '';
    if (!token) return;
    setHistory(previous => previous[previous.length - 1] === token ? previous : [...previous, token]);
    const command = resolveTerminalCommand(token);
    if (!command) { setLines(previous => [...previous, prompt(token), { text: t('Command not found. Type help.') }].slice(-100)); scrollToPrompt(); return; }
    if (command.action === 'CLEAR') { setLines([]); requestAnimationFrame(() => inputRef.current?.focus()); return; }
    const response: TerminalLine[] = [prompt(token)];
    if (command.action === 'OUTPUT') {
      if (command.id === 'help') response.push({ text: helpOutput() });
      else if (command.id === 'whoami') response.push({ text: `${profile.name} · ${profile.role}` });
      else if (command.id === 'mode') response.push({ text: profile.mode });
      else if (command.id === 'principles') response.push({ text: data.representativeDecisions.map(item => `${item.number} · ${item.principle}`).join('\n') });
      else if (command.id === 'impact') response.push({ text: data.achievements.map(item => `${item.title}\n${item.summary}\n${item.scope}`).join('\n\n') });
    } else if (command.action === 'NAVIGATE' || command.action === 'THEME' || command.action === 'ARCADE') {
      if (command.route) { open?.(command.route); response.push({ text: `${t('Opening')} ${command.id}…` }); }
    } else if (command.action === 'EXTERNAL_LINK') {
      const url = command.externalLinkId ? externalLinks[command.externalLinkId] : undefined;
      if (url) response.push({ text: url, href: url });
    } else if (command.action === 'REBOOT') {
      response.push({ text: t('Have you tried turning it off and on again?') });
    } else if (command.action === 'EASTER_EGG') {
      response.push({ text: t('Nice try. Curiosity needs no root access.') });
    }
    setLines(previous => [...previous, ...response].slice(-100));
    scrollToPrompt();
  }

  function keyboard(event: TargetedKeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setInput(''); historyIndex.current = null; return; }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      if (historyIndex.current === null) { draft.current = input; historyIndex.current = history.length - 1; }
      else historyIndex.current = Math.max(0, historyIndex.current - 1);
      setInput(history[historyIndex.current]);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex.current === null) return;
      if (historyIndex.current >= history.length - 1) { historyIndex.current = null; setInput(draft.current); }
      else { historyIndex.current += 1; setInput(history[historyIndex.current]); }
    }
  }

  return <div class="terminal">
    <div class="terminal-log" role="log" aria-live="polite" aria-label={t('Terminal output')}>
      {lines.map((entry, index) => <p key={index}>{entry.href ? <a href={entry.href} target="_blank" rel="noreferrer">{entry.text} ↗</a> : entry.text}</p>)}
    </div>
    <form onSubmit={execute}>
      <label for="terminal-input">antonio@antonios:<span>~$</span></label>
      <input id="terminal-input" ref={inputRef} aria-label={t('Terminal command')} value={input} onInput={event => setInput(event.currentTarget.value)} onKeyDown={keyboard} onFocus={scrollToPrompt} autoComplete="off" spellcheck={false} />
    </form>
  </div>;
}
