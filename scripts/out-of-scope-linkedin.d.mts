export interface LinkedInInput { title: string; summary: string; canonicalUrl: string; locale?: 'es' | 'en'; text?: string }
export function linkedinUrl(canonicalUrl: string): string;
export function formatLinkedInPost(input: LinkedInInput): string;
export function linkedinDedupeKey(input: { canonicalUrl: string; publishedAt: string }): string;
