export const profileSections = [
  { id: 'overview', name: 'Overview', path: '/profile/' },
  { id: 'experience', name: 'Experience', path: '/experience/' },
  { id: 'competencies', name: 'Competencies', path: '/profile/competencies/' },
  { id: 'achievements', name: 'Achievements', path: '/profile/achievements/' },
  { id: 'languages', name: 'Languages', path: '/profile/languages/' },
  { id: 'cv', name: 'CV', path: '/cv/' },
] as const;
export function profileSectionForPath(path: string) {
  return profileSections.find(section => section.path === path) ?? profileSections[0];
}
