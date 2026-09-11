import { useLocale } from '../i18n/context';
import { useEffect, useRef } from 'preact/hooks';
import type { ComponentChildren, TargetedPointerEvent, TargetedKeyboardEvent } from 'preact';
import type { Rect, Size, WindowAction, WindowInstance } from '../os/types';
import { registry } from '../os/registry';
import { clampRect } from '../os/window-manager';
import Icon from './Icon';

interface Props { instance: WindowInstance; active: boolean; zIndex: number; viewport: Size; dispatch: (action: WindowAction) => void; children: ComponentChildren }
export default function Window({ instance: win, active, zIndex, viewport, dispatch, children }: Props) {
  const { t } = useLocale();
  const originalApp = registry[win.id];
  const app = { ...originalApp, name: t(originalApp.name), description: t(originalApp.description) }; const ref = useRef<HTMLElement>(null);
  const cleanup = useRef<(() => void) | null>(null);
  const maximized = win.state === 'maximized';
  useEffect(() => () => cleanup.current?.(), []);
  useEffect(() => {
    if (active && ref.current && !ref.current.contains(document.activeElement)) ref.current.focus({ preventScroll: true });
  }, [active, win.state]);
  function start(event: TargetedPointerEvent<HTMLElement>, edge = 'move') {
    if (event.button !== 0 || maximized || window.matchMedia('(max-width: 719px)').matches || (event.target as HTMLElement).closest('button')) return;
    event.preventDefault(); cleanup.current?.();
    const element = ref.current!; const x = event.clientX; const y = event.clientY; const original = { ...win.rect };
    let next = original; let frame = 0;
    const paint = () => { frame = 0; Object.assign(element.style, { left: `${next.x}px`, top: `${next.y}px`, width: `${next.width}px`, height: `${next.height}px` }); };
    const move = (pointer: PointerEvent) => {
      const dx = pointer.clientX - x; const dy = pointer.clientY - y;
      let rect: Rect = { ...original };
      if (edge === 'move') rect = { ...rect, x: rect.x + dx, y: rect.y + dy };
      else {
        if (edge.includes('e')) rect.width += dx;
        if (edge.includes('s')) rect.height += dy;
        if (edge.includes('w')) { const delta = Math.min(dx, original.width - app.minSize.width); rect.x += delta; rect.width -= delta; }
        if (edge.includes('n')) { const delta = Math.min(dy, original.height - app.minSize.height); rect.y += delta; rect.height -= delta; }
      }
      next = clampRect(rect, viewport, app.minSize);
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const finish = () => { dispose(); dispatch({ type: 'geometry', id: win.id, rect: next, viewport }); };
    const cancel = () => { next = original; paint(); dispose(); };
    const dispose = () => { cancelAnimationFrame(frame); element.classList.remove('manipulating'); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', finish); window.removeEventListener('pointercancel', cancel); cleanup.current = null; };
    cleanup.current = dispose; element.classList.add('manipulating');
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', finish); window.addEventListener('pointercancel', cancel);
  }
  function keyboard(event: TargetedKeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') { dispatch({ type: 'minimize', id: win.id }); event.stopPropagation(); }
    if (!event.altKey || !event.key.startsWith('Arrow') || maximized) return;
    event.preventDefault(); const rect = { ...win.rect }; const delta = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -20 : 20;
    if (event.shiftKey) { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') rect.width += delta; else rect.height += delta; }
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') rect.x += delta; else rect.y += delta;
    dispatch({ type: 'geometry', id: win.id, rect, viewport });
  }
  return <section ref={ref} class={`window ${active ? 'active' : ''} ${maximized ? 'maximized' : ''}`} data-window={win.id} data-state={win.state} role="region" aria-label={t("{name} window").replace("{name}", app.name)} tabIndex={-1} hidden={win.state === 'minimized'} style={{ left: win.rect.x, top: win.rect.y, width: win.rect.width, height: win.rect.height, zIndex }} onPointerDown={() => dispatch({ type: 'focus', id: win.id })} onFocusIn={() => !active && dispatch({ type: 'focus', id: win.id })} onKeyDown={keyboard}>
    <header class="titlebar" onPointerDown={start} onDblClick={event => !(event.target as HTMLElement).closest('button') && dispatch({ type: 'maximize', id: win.id })}>
      <span class="window-title"><Icon name={app.icon} /><span>{app.name.toLowerCase()}.app</span><span class="title-path">{win.path === '/' ? '~' : `~${win.path}`}</span></span>
      <div class="window-controls"><button aria-label={`${t("Minimize")} ${t(app.name)}`} onClick={() => dispatch({ type: 'minimize', id: win.id })}>−</button>{app.maximizable && <button aria-label={`${maximized ? t("Restore size of") : t("Maximize")} ${t(app.name)}`} onClick={() => dispatch({ type: 'maximize', id: win.id })}>{maximized ? '❐' : '□'}</button>}<button class="close-control" aria-label={`${t("Close")} ${t(app.name)}`} onClick={() => dispatch({ type: 'close', id: win.id })}>×</button></div>
    </header>
    <div class={`window-content content-${win.id}`}>{children}</div>
    <footer class="window-status"><span>{t(app.description)}</span><span>AntoñiOS</span></footer>
    {app.resizable && !maximized && ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'].map(edge => <div key={edge} aria-hidden="true" class={`resize-handle resize-${edge}`} onPointerDown={event => start(event, edge)} />)}
  </section>;
}


