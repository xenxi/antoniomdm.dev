import { useLocale } from '../i18n/context';

export default function PixelAvatar() {
  const { t } = useLocale();
  return <figure class="pixel-portrait">
    <span class="machine-badge">{t('IT WORKS ON MY MACHINE')}</span>
    <img src="/images/identity/antonio-profile.png" width="1408" height="1117" alt={t('Pixel portrait: developer with glasses and a blue sweater working at a laptop')} decoding="async" />
    <figcaption>{t('GOOD CODE / BETTER COFFEE')}</figcaption>
  </figure>;
}
