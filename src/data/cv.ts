import type { Locale } from '../i18n/core';
import type { LocalizedText } from './professional/types';
import { publicProfessionalModel } from './professional/model';

export type CvFormat = 'pdf' | 'txt' | 'print';

export interface CvAsset {
  id: string;
  locale: Locale;
  format: CvFormat;
  publicPath: string;
  label: LocalizedText;
  status: 'APPROVED';
}

export const cvSupportingLine = 'Distributed Systems · Engineering Excellence · Applied AI';

const variant = publicProfessionalModel.cvVariants.find(item => item.primary);
if (!variant) throw new Error('Missing primary CV variant');

function pdfPath(locale: Locale): string {
  const asset = variant!.pdf[locale];
  if (asset.availability !== 'available' || !asset.path) throw new Error(`CV PDF (${locale}) is not approved`);
  return asset.path;
}

const text = (es: string, en: string): LocalizedText => ({ es, en });

export const cvAssets: CvAsset[] = [
  { id: 'cv-pdf-es', locale: 'es', format: 'pdf', publicPath: pdfPath('es'), label: text('CV — Español — PDF', 'CV — Spanish — PDF'), status: 'APPROVED' },
  { id: 'cv-pdf-en', locale: 'en', format: 'pdf', publicPath: pdfPath('en'), label: text('CV — Inglés — PDF', 'CV — English — PDF'), status: 'APPROVED' },
  { id: 'cv-print', locale: 'es', format: 'print', publicPath: '/cv/', label: text('CV imprimible', 'Printable CV'), status: 'APPROVED' },
  { id: 'cv-txt-es', locale: 'es', format: 'txt', publicPath: '/es/cv.txt', label: text('CV en texto — Español', 'Text CV — Spanish'), status: 'APPROVED' },
  { id: 'cv-txt-en', locale: 'en', format: 'txt', publicPath: '/en/cv.txt', label: text('CV en texto — Inglés', 'Text CV — English'), status: 'APPROVED' },
];
