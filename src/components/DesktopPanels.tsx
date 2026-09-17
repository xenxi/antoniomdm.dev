import { useLocale } from '../i18n/context';
import PixelInvader from './PixelInvader';

export function DesktopStatus() {
  const { t } = useLocale();
  return <aside class="system-panel desktop-status" aria-label={t('System status')}>
    <PixelInvader />
    <div class="system-panel-body">
      <strong class="system-panel-title">{t('EVERYTHING WORKS.')}</strong>
      <span class="system-panel-subtitle">{t("Don't ask why...")}</span>
      <span class="system-panel-meta"><span class="status-dot" aria-hidden="true" />SYSTEM STATUS: PROBABLY FINE</span>
    </div>
  </aside>;
}

export function DesktopHint() {
  const { t } = useLocale();
  return <aside class="system-panel desktop-hint" aria-label={t('Desktop tips')}>
    <p class="system-panel-command"><span class="terminal-prompt" aria-hidden="true">&gt;_</span><span>{t('Open an application...')}</span><kbd>Ctrl + K</kbd></p>
    <small class="system-panel-help">{t('Alt + arrows: move · Alt + Shift + arrows: resize · Esc: minimize')}</small>
  </aside>;
}
