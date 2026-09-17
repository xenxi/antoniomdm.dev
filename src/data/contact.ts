import type { Locale } from '../i18n/core';
import type { LocalizedText } from './professional/types';
import { publicProfessionalModel } from './professional/model';

export interface ContactInfo {
  displayName: string;
  location: LocalizedText;
  availability: LocalizedText;
  email: string;
  linkedin: string;
  github: string;
  website: string;
}

function availableUrl(id: string): string {
  const link = publicProfessionalModel.externalLinks.find(item => item.id === id);
  if (!link || link.availability !== 'available' || !link.url) throw new Error(`Contact link "${id}" is not available`);
  return link.url;
}

const emailUrl = availableUrl('email');

export const contactInfo: ContactInfo = {
  displayName: publicProfessionalModel.profile.name,
  location: publicProfessionalModel.profile.location,
  availability: publicProfessionalModel.profile.availability,
  email: emailUrl.replace(/^mailto:/, ''),
  linkedin: availableUrl('linkedin'),
  github: availableUrl('github'),
  website: availableUrl('website'),
};

export const contactMailto = `mailto:${contactInfo.email}`;

export const contactSummary = (locale: Locale): string => `${contactInfo.location[locale]} · ${contactInfo.availability[locale]}`;
