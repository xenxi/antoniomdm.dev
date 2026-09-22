# Google AdSense

## Español

### Alcance y arquitectura

La monetización está limitada a los artículos individuales de Out of Context (`/blog/<slug>/` y `/en/blog/<slug>/`). La landing del blog y todo el portfolio permanecen sin unidades publicitarias. Auto Ads debe permanecer desactivado en AdSense.

La integración separa tres responsabilidades:

1. **Verificación del sitio:** `AdSenseLoader.astro` añade una única copia del loader oficial en `OutOfScopeLayout` cuando el client ID es válido. Esto incluye la landing del blog para que Google pueda detectar el código, pero no crea allí una unidad.
2. **Autorización del inventario:** `public/ads.txt` publica exactamente `google.com, pub-2673939834159464, DIRECT, f08c47fec0942fa0` en la raíz del dominio.
3. **Renderizado:** `AdSlot.astro` sólo crea el `<ins class="adsbygoogle">` cuando el flag está activo y tanto el client ID como el slot del artículo son válidos.

El artículo contiene una sola instancia semántica `article-end`. A partir de 1180 px, CSS Grid mantiene el texto en 740 px y coloca esa instancia en una columna lateral de 260–280 px, separada por 60 px y con `position: sticky`. Por debajo del breakpoint, el mismo nodo aparece después del contenido y antes de las acciones. No existen dos unidades ocultadas alternativamente.

### Variables

| Variable | Valor de producción actual | Función |
| --- | --- | --- |
| `PUBLIC_ADS_ENABLED` | `false` | Feature flag de las unidades. |
| `PUBLIC_ADS_CLIENT_ID` | `ca-pub-2673939834159464` | Habilita el loader de verificación si el formato es válido. |
| `PUBLIC_ADS_ARTICLE_SLOT_ID` | vacío | Pendiente de crear la unidad publicitaria. |

Las tres se configuran como GitHub Repository Variables. El client y el slot son identificadores públicos, no secretos. El workflow acepta el flag desactivado y el slot vacío.

### Consentimiento y privacidad

El consentimiento propio de GA4 (`antonios-analytics-consent`) sigue controlando sólo Analytics. No se interpreta como consentimiento publicitario ni se comparte con AdSense.

Antes de activar `PUBLIC_ADS_ENABLED`, hay que crear y publicar en **AdSense → Privacidad y mensajes → Reglamentos europeos** el mensaje de la CMP certificada de Google para `antoniomdm.dev`. El loader permanece en el layout de Out of Context porque la CMP de Google y las etiquetas publicitarias usan esa infraestructura. No se añade un segundo banner casero. Si se habilita Consent Mode desde la CMP de Google, hay que revisar su configuración junto a los valores por defecto actuales de GA4; no se debe convertir automáticamente la elección de Analytics en una elección de publicidad.

### Activación y comprobación

1. Desplegar con `PUBLIC_ADS_ENABLED=false`, el client ID real y el slot vacío.
2. Comprobar `https://antoniomdm.dev/ads.txt` y elegir en AdSense la verificación mediante ads.txt. También puede comprobarse que el loader está presente en el HTML de `https://antoniomdm.dev/blog/`.
3. Publicar el mensaje europeo de la CMP de Google antes de servir unidades.
4. Cuando el sitio esté verificado y listo, crear en AdSense una única unidad display responsive para artículos y copiar su ID real a `PUBLIC_ADS_ARTICLE_SLOT_ID`.
5. Mantener Auto Ads desactivado y cambiar `PUBLIC_ADS_ENABLED` a `true` sólo después de desplegar la variable del slot.
6. Verificar con las herramientas del navegador que cada artículo tiene un loader y un `<ins>`, mientras la landing y el portfolio no tienen `<ins>`.

Las pruebas locales usan una configuración simulada sólo para inspeccionar HTML estático; no contactan con Google. En producción, no se deben hacer clics propios ni generar impresiones artificiales. Para una comprobación segura, inspeccionar el DOM, las peticiones y el panel de diagnóstico de AdSense.

Referencias oficiales: [gestión y verificación de sitios](https://support.google.com/adsense/answer/12131223), [guía de ads.txt](https://support.google.com/adsense/answer/12171612), [mensajes para reglamentos europeos](https://support.google.com/adsense/answer/10961068) e [integración con IAB TCF](https://support.google.com/adsense/answer/9804260).

## English

### Scope and architecture

Monetization is limited to individual Out of Context articles (`/blog/<slug>/` and `/en/blog/<slug>/`). The blog landing and the entire portfolio remain free of ad units. Auto Ads must remain disabled in AdSense.

The integration separates three responsibilities:

1. **Site verification:** `AdSenseLoader.astro` adds one copy of the official loader to `OutOfScopeLayout` when the client ID is valid. This includes the blog landing so Google can detect the code, but it does not create an ad unit there.
2. **Inventory authorization:** `public/ads.txt` publishes exactly `google.com, pub-2673939834159464, DIRECT, f08c47fec0942fa0` at the domain root.
3. **Rendering:** `AdSlot.astro` creates the `<ins class="adsbygoogle">` only when the flag is enabled and both the client ID and article slot are valid.

The article contains one semantic `article-end` instance. From 1180 px upwards, CSS Grid keeps the text at 740 px and places that instance in a 260–280 px side column with a 60 px gap and `position: sticky`. Below the breakpoint, the same node appears after the content and before the actions. There are no two units alternately hidden with CSS.

### Variables

| Variable | Current production value | Purpose |
| --- | --- | --- |
| `PUBLIC_ADS_ENABLED` | `false` | Ad-unit feature flag. |
| `PUBLIC_ADS_CLIENT_ID` | `ca-pub-2673939834159464` | Enables the verification loader when its format is valid. |
| `PUBLIC_ADS_ARTICLE_SLOT_ID` | empty | Pending creation of the ad unit. |

Configure all three as GitHub Repository Variables. The client and slot are public identifiers, not secrets. The workflow supports a disabled flag and an empty slot.

### Consent and privacy

The existing GA4 consent (`antonios-analytics-consent`) continues to control Analytics only. It is not interpreted as advertising consent or shared with AdSense.

Before enabling `PUBLIC_ADS_ENABLED`, create and publish the certified Google CMP message for `antoniomdm.dev` under **AdSense → Privacy & messaging → European regulations**. The loader remains in the Out of Context layout because Google's CMP and ad tags use that infrastructure. No second custom banner is added. If Consent Mode is enabled from Google's CMP, review its configuration alongside GA4's existing defaults; never automatically turn an Analytics choice into an advertising choice.

### Activation and verification

1. Deploy with `PUBLIC_ADS_ENABLED=false`, the real client ID, and an empty slot.
2. Check `https://antoniomdm.dev/ads.txt` and select ads.txt verification in AdSense. You can also confirm that the loader exists in the HTML of `https://antoniomdm.dev/blog/`.
3. Publish Google's European CMP message before serving ad units.
4. Once the site is verified and ready, create one responsive display unit for articles in AdSense and copy its real ID to `PUBLIC_ADS_ARTICLE_SLOT_ID`.
5. Keep Auto Ads disabled and change `PUBLIC_ADS_ENABLED` to `true` only after deploying the slot variable.
6. Use browser developer tools to confirm that each article has one loader and one `<ins>`, while the landing and portfolio have no `<ins>`.

Local tests use simulated configuration only to inspect static HTML; they do not contact Google. In production, never click your own ads or generate artificial impressions. Safely verify the DOM, network requests, and the AdSense diagnostics panel instead.

Official references: [site management and verification](https://support.google.com/adsense/answer/12131223), [ads.txt guide](https://support.google.com/adsense/answer/12171612), [European regulations messages](https://support.google.com/adsense/answer/10961068), and [IAB TCF integration](https://support.google.com/adsense/answer/9804260).
