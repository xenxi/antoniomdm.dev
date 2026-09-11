# Annex A — Flutter audit

**LEGACY / NOT PART OF PRODUCTION BUILD. Flutter was not modernized.**

All original source/assets moved unchanged to `legacy/flutter`: android, ios, lib, test, web, assets, .metadata, analysis_options.yaml, pubspec.yaml and pubspec.lock. No asset or widget was deleted. Identical-content moves retain Git traceability. The root workflow and README are replaced by the new architecture's equivalents. No commits or pushes were made.

## SDK/API compatibility

Pubspec constrains Dart to `>=2.16.0-134.1.beta <3.0.0`; lockfile requires `>=2.18.0 <3.0.0` and Flutter `>=3.0.0`. Metadata records beta revision `628f0e3f3a01d6e6b5fd8c2d7b8f0d58883b6673`; CI uses an unpinned beta channel. An exact deployed Flutter version cannot be established from these files. Source is already largely null-safe. Revival would require reviewing old TextTheme names, canLaunch/launch, bootstrap, service worker and all dependency constraints. No blanket upgrade was run.

## Dependency table

Resolved versions are from the original lockfile. Target “native” or “none” describes the new production implementation, not an updated Flutter package. All original dependency records remain archived.

| Dependency | Current | Target | Breaking boundary | Action | Reason |
|---|---|---|---|---|---|
| Flutter / Dart | beta / <3 | Astro 7.3.2 + TypeScript | Widgets → semantic HTML/island | REPLACE | SEO, real URLs, web performance |
| fluro | 2.0.4 | Astro + History API | Widget/hash navigation → real paths | REPLACE | No router package needed |
| flutter_bloc / bloc | 8.1.1 / 8.1.0 | Typed reducer | Engine/window actions | REPLACE | Common lifecycle |
| flutter_hooks | 0.18.5+1 | Preact 10.29.8 hooks | DOM lifecycles | REPLACE | New renderer |
| github | 9.9.0 | Content Collections | Runtime API removed | REPLACE | Static content, no browser token |
| just_audio | 0.9.31 | HTMLAudioElement/Web Audio | Explicit gesture, disposal | REPLACE | Native optional sound |
| animate_do | 3.0.2 | CSS | Short, reduced-motion effects | REPLACE | No animation runtime |
| animated_text_kit | 4.2.2 | Static text + CSS | No typewriter-blocked text | REPLACE | LCP and readability |
| font_awesome_flutter | 10.3.0 | Owned SVG icon family | One 24px grid | REPLACE | Consistent identity |
| cupertino_icons | 1.0.5 | None | Platform icon style retired | REMOVE | Avoid unused font |
| dartz | 0.10.1 | TS/native promises | No mechanical Option/Either port | REPLACE | Explicit small state |
| equatable | 2.0.5 | None | Immutable reducer values | REMOVE | No runtime equality package |
| intl | 0.18.0 | Intl.DateTimeFormat | Browser-local clock | REPLACE | Native localization |
| url_launcher | 6.1.8 | HTML anchors | Native URL/download behavior | REPLACE | Accessible real links |
| bloc_test | 9.1.0 | Vitest | Production state transitions | REPLACE | Test final model |
| flutter_test / mocktail | SDK / 0.3.0 | Vitest + Playwright | Browser/no-JS/network tests | REPLACE | Test final product |
| flutter_lints | 2.0.1 | ESLint + Astro check | TS/Astro rules | REPLACE | Lint final architecture |

No KEEP/UPDATE Flutter runtime packages are necessary because no Flutter code executes in the product. Rebuilding it for reference requires its own SDK upgrade and checks, outside the main pipeline.

## Asset classification

| Original asset | Class | Treatment |
|---|---|---|
| img/bg_03.png (9.82 MB) | REUSE IN NEW WEB | 1600px WebP wallpaper, CSS hue/opacity; original retained |
| img/bg_02.jpg | ARCADE ASSET | WebP only requested behind ENTER |
| audio/arcade_01.mp3 (2.18 MB) | AUDIO | Copied unchanged, requested by explicit Play |
| img/arcade.png, arcade_without_buttons.png | ARCADE ASSET | Preserved; not shipped into initial graph |
| img/arcade_btn.png, arcade_btn_pressed.png | ARCADE ASSET | Original lossless sprites preserved |
| img/animate_bg_01.gif, animate_bg_02.gif | ARCADE ASSET | Preserved; not shipped |
| img/bg_01.jpg, bg_05.jpg | ARCADE ASSET | Preserved; not needed in desktop |
| img/bg_04.jpg, bg_06.jpg, bg_07.jpg | OBSOLETE for new direction | Preserved as references |
| fonts/arcade.ttf, neon.ttf, Lady_Radical.ttf, edunline.ttf | UNKNOWN reuse/provenance | Preserved; new site uses system fonts |
| web/icons/*, favicon.png | OBSOLETE branding | Preserved; new owned favicon/social card |

Original asset/audio licenses are not documented in the repository; confirm provenance before extending use. Reuse was limited to assets already present, with traceability. The visual-reference image mentioned in the brief was not supplied among the two attached texts; no such image was claimed as inspected.

## Legacy quality gates

| Check | Result | Reason |
|---|---|---|
| flutter --version | NOT RUN | No legacy SDK update attempted |
| flutter pub get | NOT RUN | Original lockfile preserved |
| flutter analyze | NOT RUN | Outside final architecture |
| flutter test | NOT RUN | Original tests retained as reference |
| flutter build web | NOT RUN | No Flutter product shipped |

Production checks are recorded in M1_DELIVERY.md and quality/summary.json.
