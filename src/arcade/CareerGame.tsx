import { lazy, Suspense } from 'preact/compat';
import type { ArcadeProps } from './contract';
import { useLocale } from '../i18n/context';
import { worldCopy } from './world-copy';

const NativeArcade = lazy(() => import('./NativeArcade'));
const ExistingCareerGame = lazy(() => import('./ExistingCareerGame'));

/** Temporary rollout boundary; each host loads only its own implementation.
 * Frontera temporal de despliegue; cada host carga solo su implementación. */
export default function CareerGame(props: ArcadeProps) {
  const { locale } = useLocale();
  const native = typeof window !== 'undefined' && new URLSearchParams(location.search).get('nativeArcade') === '1';
  return <Suspense fallback={<p role="status">{worldCopy.loading[locale]}</p>}>
    {native ? <NativeArcade {...props} /> : <ExistingCareerGame {...props} />}
  </Suspense>;
}
