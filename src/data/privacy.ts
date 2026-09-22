import type { Locale } from '../i18n/core';

export interface PrivacySection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface PrivacyCopy {
  title: string;
  description: string;
  eyebrow: string;
  introduction: string;
  updatedLabel: string;
  updated: string;
  contents: string;
  back: string;
  controlsTitle: string;
  controlsIntroduction: string;
  analyticsControl: string;
  advertisingControl: string;
  advertisingUnavailable: string;
  sections: PrivacySection[];
}

export const PRIVACY_UPDATED = '2026-09-22';

export const privacyPath = (locale: Locale): string =>
  locale === 'en' ? '/en/privacy/' : '/privacy/';

export const privacyCanonical = (locale: Locale): string =>
  `https://antoniomdm.dev${privacyPath(locale)}`;

export const privacyCopy: Record<Locale, PrivacyCopy> = {
  es: {
    title: 'Política de privacidad',
    description:
      'Cómo antoniomdm.dev trata los datos, usa Google Analytics y muestra publicidad de Google AdSense, y cómo gestionar el consentimiento.',
    eyebrow: 'ANTONIOMDM.DEV / PRIVACIDAD',
    introduction:
      'Esta política explica, de forma proporcionada a un portfolio y blog personal, qué datos pueden tratarse al visitar antoniomdm.dev y qué decisiones puedes tomar. El portfolio AntoñiOS y la publicación Out of Context comparten esta política, aunque la publicidad sólo puede aparecer en artículos individuales de Out of Context.',
    updatedLabel: 'Última actualización',
    updated: '22 de septiembre de 2026',
    contents: 'En esta página',
    back: 'Volver a AntoñiOS',
    controlsTitle: 'Configuración de privacidad',
    controlsIntroduction:
      'Las preferencias de medición y publicidad se gestionan por separado. Cambiar una no modifica automáticamente la otra.',
    analyticsControl: 'Configurar analítica',
    advertisingControl: 'Configuración de privacidad y cookies',
    advertisingUnavailable:
      'La configuración publicitaria se habilita cuando la CMP de Google está disponible y resulta aplicable a tu visita.',
    sections: [
      {
        id: 'responsable',
        title: 'Responsable del sitio',
        paragraphs: [
          'El responsable de antoniomdm.dev es Antonio Díaz Moreno. Este es un sitio personal, no una web operada por una sociedad ni por un equipo con delegado de protección de datos.',
          'Puedes usar el correo público indicado al final de esta política para consultas sobre privacidad y para ejercer tus derechos.',
        ],
      },
      {
        id: 'naturaleza',
        title: 'Finalidad y naturaleza del sitio',
        paragraphs: [
          'antoniomdm.dev presenta un portfolio profesional, proyectos, experiencias interactivas y la publicación técnica Out of Context. No crea cuentas de usuario, no ofrece compras y no incluye formularios que envíen datos personales al responsable.',
          'La información se trata para entregar y proteger el sitio, conservar en tu navegador las preferencias funcionales que elijas, entender el uso del sitio cuando autorizas la analítica, mostrar publicidad en los espacios previstos cuando esté habilitada y responder si contactas por correo.',
        ],
      },
      {
        id: 'datos',
        title: 'Datos que pueden tratarse',
        paragraphs: [
          'Según cómo uses el sitio y las decisiones de consentimiento que tomes, pueden intervenir estas categorías:',
        ],
        bullets: [
          'Datos técnicos necesarios para solicitar y entregar una página, como dirección IP, fecha y hora, URL solicitada y cabeceras del navegador. El sitio se publica como contenido estático mediante GitHub Pages.',
          'Preferencias y progreso guardados localmente en tu navegador, como apariencia, audio o partidas de Arcade. Estos datos funcionales no se envían al responsable.',
          'La elección de consentimiento analítico guardada en el almacenamiento local del navegador.',
          'Datos de medición limitados descritos en el apartado de Google Analytics, sólo después de aceptar expresamente.',
          'Datos publicitarios que Google y los partners mostrados por su CMP puedan tratar cuando se carga AdSense, de acuerdo con tu elección y con la configuración aplicable.',
          'La dirección, el contenido y los metadatos de tu mensaje si decides escribir por correo.',
        ],
      },
      {
        id: 'analytics',
        title: 'Google Analytics 4',
        paragraphs: [
          'El sitio usa Google Analytics 4 (GA4) únicamente después de un consentimiento analítico explícito. Rechazar la medición impide que se descargue la etiqueta de GA4; aceptar la carga sólo en HTTPS y en antoniomdm.dev o www.antoniomdm.dev.',
          'La implementación envía la ruta sin consulta ni fragmento, el título, el idioma y eventos limitados sobre navegación e interacciones. No envía texto introducido por visitantes, correo electrónico, User ID, identificadores propios de sesión, UUID, marcas de tiempo personalizadas ni la URL completa de enlaces externos. Las señales de Google y de personalización publicitaria están desactivadas para esta medición.',
          'Puedes rechazar, aceptar, retirar y volver a conceder este consentimiento. Al retirarlo, el sitio detiene nuevos eventos, actualiza el estado analítico a denegado y elimina las cookies de GA accesibles desde antoniomdm.dev. La retirada no borra automáticamente información que Google ya hubiera recibido antes de ese momento.',
        ],
      },
      {
        id: 'adsense',
        title: 'Google AdSense y publicidad',
        paragraphs: [
          'Los artículos individuales de Out of Context pueden mostrar una unidad publicitaria mediante Google AdSense. El portfolio AntoñiOS y la portada de Out of Context no contienen unidades publicitarias.',
          'Cuando la publicidad está habilitada, Google puede seleccionar y entregar anuncios, medir su rendimiento, limitar su frecuencia, prevenir fraude y cumplir obligaciones aplicables. Según tu consentimiento, la región, la configuración de AdSense y la disponibilidad, Google puede servir publicidad personalizada, no personalizada o limitada. Los anuncios no personalizados pueden seguir necesitando almacenamiento para funciones como seguridad, frecuencia o medición.',
          'Google es el proveedor publicitario integrado directamente por el repositorio. Otros proveedores de tecnología publicitaria sólo podrán intervenir conforme a la configuración vigente de AdSense y se identifican en el mensaje o en la lista de partners de la CMP de Google; esa lista puede cambiar y no se reproduce aquí para no dejar información desactualizada.',
        ],
      },
      {
        id: 'cmp',
        title: 'CMP de Google y dos consentimientos distintos',
        paragraphs: [
          'Para la publicidad se utiliza la plataforma de gestión del consentimiento de Google, Privacy & Messaging, compatible con los requisitos aplicables en el EEE, Reino Unido y Suiza. La CMP presenta las opciones y comunica las señales correspondientes a Google y a los partners publicitarios mostrados en ella.',
          'El control propio de antoniomdm.dev gestiona exclusivamente Google Analytics. La CMP de Google gestiona la publicidad. No existe una unificación técnica entre ambos sistemas: aceptar o rechazar Analytics no equivale a aceptar o rechazar publicidad, ni al contrario.',
        ],
      },
      {
        id: 'almacenamiento',
        title: 'Cookies, almacenamiento local e identificadores',
        paragraphs: [
          'El sitio usa almacenamiento local o de sesión para funciones solicitadas por el visitante: preferencias de AntoñiOS, progreso de Arcade, estado temporal de partidas y la elección sobre Analytics. Estas funciones pueden seguir operando sin enviar esos valores al responsable.',
          'Tras aceptar Analytics, GA4 puede establecer cookies de medición. AdSense, la CMP de Google y los partners autorizados pueden utilizar cookies, almacenamiento local, identificadores y tecnologías equivalentes conforme a las opciones mostradas y a la normativa aplicable. Puedes borrar el almacenamiento desde el navegador, aunque perderás preferencias o progreso guardado y el sitio podrá volver a pedirte una decisión.',
        ],
      },
      {
        id: 'base-juridica',
        title: 'Base jurídica',
        paragraphs: [
          'La analítica opcional y, cuando resulte exigible, el almacenamiento o la personalización publicitaria se basan en tu consentimiento. Puedes retirarlo en cualquier momento sin que ello afecte a la licitud del tratamiento anterior.',
          'La entrega técnica, la seguridad y la integridad del sitio responden al interés legítimo de publicar y proteger antoniomdm.dev. Si escribes por correo, el mensaje se trata para atender tu solicitud; según su contenido, la base será adoptar medidas a petición tuya o el interés legítimo en responder y conservar la conversación necesaria.',
          'Dentro de la CMP, Google y cada partner indican las finalidades y bases aplicables —consentimiento o, cuando proceda, interés legítimo— y permiten gestionar las opciones disponibles.',
        ],
      },
      {
        id: 'gestion',
        title: 'Retirar o modificar el consentimiento',
        paragraphs: [
          'Usa los controles de esta página para volver a abrir la configuración analítica y, cuando la API de la CMP esté disponible, el mensaje de privacidad y cookies de Google. El control publicitario utiliza la función oficial de revocación de Google; antoniomdm.dev no borra artesanalmente las cookies de la CMP.',
          'También puedes limitar o borrar cookies y almacenamiento desde el navegador. Esta acción es independiente de las opciones registradas por cada proveedor y puede hacer que vuelvan a mostrarse los avisos de consentimiento.',
        ],
      },
      {
        id: 'conservacion',
        title: 'Conservación',
        paragraphs: [
          'Las preferencias funcionales, las partidas y la elección analítica permanecen en tu navegador hasta que las sustituyas o borres. Los mensajes de correo se conservan mientras sea necesario para responder y gestionar la conversación o posibles responsabilidades.',
          'Los datos técnicos de entrega, Analytics, AdSense y la CMP se conservan conforme a la configuración y las políticas de GitHub o Google aplicables en cada momento. El repositorio no permite justificar un plazo único y exacto para esos proveedores, por lo que esta política no inventa uno. Puedes solicitar información sobre un caso concreto mediante el contacto indicado.',
        ],
      },
      {
        id: 'transferencias',
        title: 'Proveedores y transferencias internacionales',
        paragraphs: [
          'El sitio se entrega mediante GitHub Pages y usa servicios de Google para Analytics, AdSense y la CMP. GitHub, Google y los partners publicitarios que elijas pueden tratar información fuera del Espacio Económico Europeo o permitir acceso desde otros países.',
          'Cuando corresponde, estos proveedores describen en sus propias políticas los mecanismos usados para las transferencias internacionales, como decisiones de adecuación o cláusulas contractuales tipo. Los enlaces de referencia aparecen al final de esta política.',
        ],
      },
      {
        id: 'derechos',
        title: 'Tus derechos',
        paragraphs: [
          'Cuando el RGPD resulte aplicable, puedes solicitar acceso a tus datos personales, su rectificación o supresión, oponerte al tratamiento, pedir su limitación y solicitar la portabilidad cuando corresponda. También puedes retirar un consentimiento ya otorgado.',
          'Para ejercer estos derechos, escribe al correo indicado y explica qué solicitas. Puede ser necesario pedir información razonable para comprobar que la solicitud corresponde a la persona afectada. Parte de la medición agregada puede no permitir identificar a un visitante concreto.',
        ],
      },
      {
        id: 'reclamacion',
        title: 'Reclamaciones',
        paragraphs: [
          'También tienes derecho a presentar una reclamación ante la autoridad de protección de datos correspondiente a tu lugar de residencia, trabajo o a la posible infracción. En España, la autoridad es la Agencia Española de Protección de Datos (AEPD).',
        ],
      },
      {
        id: 'contacto',
        title: 'Contacto y referencias',
        paragraphs: [
          'Para consultas de privacidad o para ejercer derechos, utiliza el correo público del portfolio. Puedes consultar además las políticas de Google, GitHub y la información que muestra la CMP antes de tomar una decisión.',
          'Esta política se revisará si cambian los servicios o el modo en que se tratan los datos. La fecha visible al inicio indica la última actualización.',
        ],
      },
    ],
  },
  en: {
    title: 'Privacy policy',
    description:
      'How antoniomdm.dev processes data, uses Google Analytics and displays Google AdSense advertising, and how to manage consent.',
    eyebrow: 'ANTONIOMDM.DEV / PRIVACY',
    introduction:
      'This policy explains, in a way proportionate to a personal portfolio and blog, what data may be processed when visiting antoniomdm.dev and what choices you can make. The AntoñiOS portfolio and the Out of Context publication share this policy, although advertising may only appear on individual Out of Context articles.',
    updatedLabel: 'Last updated',
    updated: '22 September 2026',
    contents: 'On this page',
    back: 'Back to AntoñiOS',
    controlsTitle: 'Privacy settings',
    controlsIntroduction:
      'Measurement and advertising preferences are managed separately. Changing one does not automatically change the other.',
    analyticsControl: 'Analytics settings',
    advertisingControl: 'Privacy and cookie settings',
    advertisingUnavailable:
      'Advertising settings become available when Google’s CMP is loaded and applies to your visit.',
    sections: [
      {
        id: 'controller',
        title: 'Site controller',
        paragraphs: [
          'The controller of antoniomdm.dev is Antonio Díaz Moreno. This is a personal site, not a website operated by a company or by a team with a data protection officer.',
          'You can use the public email address at the end of this policy for privacy questions and to exercise your rights.',
        ],
      },
      {
        id: 'nature',
        title: 'Purpose and nature of the site',
        paragraphs: [
          'antoniomdm.dev presents a professional portfolio, projects, interactive experiences and the technical publication Out of Context. It does not create user accounts, offer purchases or include forms that send personal data to the controller.',
          'Information is processed to deliver and protect the site, keep functional preferences you choose in your browser, understand use of the site when you allow analytics, display advertising in the intended locations when enabled, and reply if you make contact by email.',
        ],
      },
      {
        id: 'data',
        title: 'Data that may be processed',
        paragraphs: [
          'Depending on how you use the site and the consent choices you make, the following categories may be involved:',
        ],
        bullets: [
          'Technical data needed to request and deliver a page, such as IP address, date and time, requested URL and browser headers. The site is published as static content through GitHub Pages.',
          'Preferences and progress stored locally in your browser, such as appearance, audio or Arcade saves. This functional data is not sent to the controller.',
          'Your analytics consent choice stored in the browser’s local storage.',
          'The limited measurement data described in the Google Analytics section, only after explicit acceptance.',
          'Advertising data that Google and the partners shown by its CMP may process when AdSense loads, in accordance with your choice and the applicable configuration.',
          'The address, content and metadata of your message if you choose to send an email.',
        ],
      },
      {
        id: 'analytics',
        title: 'Google Analytics 4',
        paragraphs: [
          'The site uses Google Analytics 4 (GA4) only after explicit analytics consent. Rejecting measurement prevents the GA4 tag from downloading; accepting loads it only over HTTPS on antoniomdm.dev or www.antoniomdm.dev.',
          'The implementation sends the path without query parameters or fragments, the page title, language and limited navigation and interaction events. It does not send visitor-entered text, email addresses, User ID, first-party session identifiers, UUIDs, custom timestamps or the full URL of external links. Google signals and advertising-personalisation signals are disabled for this measurement.',
          'You can reject, accept, withdraw and grant this consent again. On withdrawal, the site stops new events, updates the analytics state to denied and removes GA cookies accessible from antoniomdm.dev. Withdrawal does not automatically erase information that Google had already received before that point.',
        ],
      },
      {
        id: 'adsense',
        title: 'Google AdSense and advertising',
        paragraphs: [
          'Individual Out of Context articles may display one advertising unit through Google AdSense. The AntoñiOS portfolio and the Out of Context landing page do not contain advertising units.',
          'When advertising is enabled, Google may select and deliver ads, measure performance, limit frequency, prevent fraud and meet applicable obligations. Depending on your consent, region, AdSense configuration and availability, Google may serve personalised, non-personalised or limited ads. Non-personalised ads may still require storage for functions such as security, frequency or measurement.',
          'Google is the advertising provider integrated directly by the repository. Other advertising technology providers may only participate according to the current AdSense configuration and are identified in the Google CMP message or partner list; that list can change and is not reproduced here so that this page does not become outdated.',
        ],
      },
      {
        id: 'cmp',
        title: 'Google CMP and two separate consents',
        paragraphs: [
          'Advertising uses Google’s Privacy & Messaging consent management platform, compatible with the applicable requirements in the EEA, the United Kingdom and Switzerland. The CMP presents the options and communicates the relevant signals to Google and the advertising partners shown within it.',
          'The first-party antoniomdm.dev control manages Google Analytics only. Google’s CMP manages advertising. The two systems are not technically unified: accepting or rejecting Analytics is not the same as accepting or rejecting advertising, and vice versa.',
        ],
      },
      {
        id: 'storage',
        title: 'Cookies, local storage and identifiers',
        paragraphs: [
          'The site uses local or session storage for visitor-requested features: AntoñiOS preferences, Arcade progress, temporary game state and the Analytics choice. These features can operate without sending those values to the controller.',
          'After Analytics is accepted, GA4 may set measurement cookies. AdSense, Google’s CMP and authorised partners may use cookies, local storage, identifiers and equivalent technologies according to the options shown and applicable law. You can clear browser storage, although you will lose saved preferences or progress and the site may ask for a decision again.',
        ],
      },
      {
        id: 'legal-basis',
        title: 'Legal basis',
        paragraphs: [
          'Optional analytics and, where required, advertising storage or personalisation rely on your consent. You may withdraw it at any time without affecting the lawfulness of processing before withdrawal.',
          'Technical delivery, security and site integrity rely on the legitimate interest in publishing and protecting antoniomdm.dev. If you send an email, the message is processed to handle your request; depending on its content, the basis is taking steps at your request or the legitimate interest in replying and keeping the necessary conversation.',
          'Within the CMP, Google and each partner state the applicable purposes and bases—consent or, where available, legitimate interest—and let you manage the options provided.',
        ],
      },
      {
        id: 'management',
        title: 'Withdraw or change consent',
        paragraphs: [
          'Use the controls on this page to reopen the analytics settings and, when the CMP API is available, Google’s privacy and cookie message. The advertising control uses Google’s official revocation function; antoniomdm.dev does not manually delete CMP cookies.',
          'You can also limit or clear cookies and storage through your browser. This action is separate from the options recorded by each provider and may cause consent notices to appear again.',
        ],
      },
      {
        id: 'retention',
        title: 'Retention',
        paragraphs: [
          'Functional preferences, saves and the analytics choice remain in your browser until you replace or clear them. Email messages are kept for as long as needed to reply and manage the conversation or potential responsibilities.',
          'Technical delivery, Analytics, AdSense and CMP data are retained according to the relevant GitHub or Google settings and policies in force. The repository does not justify one exact period for those providers, so this policy does not invent one. You can request information about a specific case using the contact details below.',
        ],
      },
      {
        id: 'transfers',
        title: 'Providers and international transfers',
        paragraphs: [
          'The site is delivered through GitHub Pages and uses Google services for Analytics, AdSense and the CMP. GitHub, Google and advertising partners you choose may process information outside the European Economic Area or allow access from other countries.',
          'Where required, these providers describe the mechanisms used for international transfers in their own policies, such as adequacy decisions or standard contractual clauses. Reference links appear at the end of this policy.',
        ],
      },
      {
        id: 'rights',
        title: 'Your rights',
        paragraphs: [
          'Where the GDPR applies, you may request access to your personal data, rectification or erasure, object to processing, request restriction and ask for portability where applicable. You may also withdraw consent you previously gave.',
          'To exercise these rights, write to the email address below and explain your request. Reasonable information may be required to verify that the request relates to the person concerned. Some aggregated measurement may not allow a specific visitor to be identified.',
        ],
      },
      {
        id: 'complaints',
        title: 'Complaints',
        paragraphs: [
          'You also have the right to lodge a complaint with the data protection authority for your place of residence, work or the alleged infringement. In Spain, the authority is the Spanish Data Protection Agency (AEPD).',
        ],
      },
      {
        id: 'contact',
        title: 'Contact and references',
        paragraphs: [
          'For privacy questions or to exercise your rights, use the public portfolio email. You can also read Google’s and GitHub’s policies and the information shown by the CMP before making a choice.',
          'This policy will be reviewed if the services or the way data is processed change. The date shown at the beginning is the latest update.',
        ],
      },
    ],
  },
};
