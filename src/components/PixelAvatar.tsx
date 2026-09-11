import { useLocale } from '../i18n/context';

// Original, code-native 16-bit identity. All colors come from the Aura tokens.
export default function PixelAvatar() {
  const { t } = useLocale();
  return <figure class="pixel-portrait">
    <span class="machine-badge">{t('IT WORKS ON MY MACHINE')}</span>
    <svg viewBox="0 0 128 136" role="img" aria-label={t('Original pixel avatar: developer with dark hair and rectangular glasses')} shape-rendering="crispEdges">
      <path class="pixel-shadow" d="M8 126h112v5H8z M20 119h88v7H20z" />
      <path class="pixel-chair" d="M76 75h32v5h5v42H75z" />
      <path class="pixel-hair-dark" d="M35 22h8V12h12V7h20v5h13v8h10v12h7v24h-7v12H86v9H41V66H28V53h-6V34h7V22z" />
      <path class="pixel-hair-light" d="M35 24h9V16h11v-5h13v8H55v12H41v14H30V32h5z M85 22h9v11h5v13h-8V32h-6z" />
      <path class="pixel-skin" d="M40 45h12v8h12v5h26v25H80v10H53V83H40z M35 60h7v13h-7z" />
      <path class="pixel-skin-shadow" d="M81 59h9v24H80v10H65v-9h14v-7h6z M49 73h8v4h-8z" />
      <path class="pixel-glasses" d="M36 57h24v3h8v-3h26v15H67v-9h-7v9H36z" />
      <path class="pixel-lens" d="M41 61h14v7H41z M72 61h16v7H72z" />
      <path class="pixel-hair-dark" d="M57 80h16v3H57z" />
      <path class="pixel-shirt" d="M45 91h36v5h13v27H29v-20h7v-7h9z" />
      <path class="pixel-shirt-light" d="M45 91h11l7 9-8 7-10-10z M69 91h12v6l-9 10-9-7z" />
      <path class="pixel-tie" d="M59 99h8v6h-2l5 17H56l5-17h-2z" />
      <path class="pixel-skin" d="M30 111h13v11H30z M84 111h12v11H84z" />
      <path class="pixel-laptop-edge" d="M9 101h60l9 26H18z M9 127h74v4H9z" />
      <path class="pixel-laptop" d="M12 104h54l7 20H20z" />
      <image href="/favicon.svg" x="25" y="104" width="32" height="20" />
      <path class="pixel-mug-shadow" d="M93 105h19v4h9v14h-10v5H93z M112 113v6h5v-6z" fill-rule="evenodd" />
      <path class="pixel-mug" d="M92 106h18v19H92z" />
      <path class="pixel-glasses" d="M96 111h10v2H96z M97 115h8v2h-8z M98 119h6v2h-6z" />
      <path class="pixel-steam" d="M98 96h2v6h-2z M104 91h2v9h-2z" />
    </svg>
    <figcaption>{t('GOOD CODE / BETTER COFFEE')}</figcaption>
  </figure>;
}
