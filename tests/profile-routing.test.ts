import { describe, expect, it } from 'vitest';
import { appForPath, desktopApplications, launcherApplications } from '../src/os/registry';
import { profileSections, profileSectionForPath } from '../src/os/profile-sections';
import { windowReducer, initialState } from '../src/os/window-manager';
import { basePath, localizedPath, translator } from '../src/i18n/core';
import { spanish } from '../src/i18n/es';

describe('A3 Profile document contract', () => {
  it('opens Overview at home and maps each translated section to one Profile instance', () => {
    expect(appForPath('/')).toBe('about');
    let state = initialState;
    for (const locale of ['es', 'en'] as const) for (const section of profileSections) {
      const path = basePath(localizedPath(section.path, locale));
      expect(appForPath(path)).toBe('about');
      expect(profileSectionForPath(path).id).toBe(section.id);
      expect(spanish[section.name]).toBeTruthy();
      state = windowReducer(state, { type: 'open', id: appForPath(path)!, path, viewport: { width: 1440, height: 874 } });
      expect(state.openWindows).toHaveLength(1);
      expect(state.openWindows[0].path).toBe(section.path);
    }
  });
  it('separates Architecture, AI Lab and Contact while keeping utilities in the launcher', () => {
    expect(appForPath('/architecture/')).toBe('architecture');
    expect(appForPath('/ai/')).toBe('lab');
    expect(appForPath('/contact/')).toBe('contact');
    expect(desktopApplications).toHaveLength(8);
    expect(launcherApplications).toHaveLength(9);
    for (const app of launcherApplications) {
      expect(spanish[app.name]).toBeTruthy();
      expect(translator('es')(app.description)).toBeTruthy();
    }
  });
});
