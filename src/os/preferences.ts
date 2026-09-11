export interface Preferences { wallpaper: 'nebula' | 'midnight'; effects: boolean; sound: boolean; music: boolean; uiSounds: boolean }
export const defaults: Preferences = { wallpaper: 'nebula', effects: true, sound: false, music: false, uiSounds: false };
export const storageKey = 'antoniomdm-os:preferences:v1';
export function parsePreferences(value: string | null): Preferences {
  try {
    const data = JSON.parse(value ?? '{}');
    return { wallpaper: data.wallpaper === 'midnight' ? 'midnight' : 'nebula',
      effects: typeof data.effects === 'boolean' ? data.effects : true,
      sound: data.sound === true, music: data.music === true, uiSounds: data.uiSounds === true };
  } catch { return { ...defaults }; }
}
