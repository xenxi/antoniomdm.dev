export interface Preferences { wallpaper: 'nebula' | 'midnight'; effects: boolean; sound: boolean; music: boolean; uiSounds: boolean }
export const defaults: Preferences = { wallpaper: 'midnight', effects: true, sound: true, music: true, uiSounds: false };
export const storageKey = 'antoniomdm-os:preferences:v2';
export function parsePreferences(value: string | null): Preferences {
  try {
    const data = JSON.parse(value ?? '{}');
    return { wallpaper: data.wallpaper === 'nebula' ? 'nebula' : 'midnight',
      effects: typeof data.effects === 'boolean' ? data.effects : true,
      sound: typeof data.sound === 'boolean' ? data.sound : true, music: typeof data.music === 'boolean' ? data.music : true, uiSounds: data.uiSounds === true };
  } catch { return { ...defaults }; }
}
