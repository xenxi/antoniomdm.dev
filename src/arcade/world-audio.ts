export type WorldSound = 'step-outside' | 'step-inside' | 'open' | 'close' | 'locked';

/** Short, locally synthesized foley. No downloads, loops or background playback. */
export class WorldAudio {
  private context?: AudioContext;
  private sources = new Set<AudioScheduledSourceNode>();
  private foot = 0;
  private lastStep = -Infinity;
  private enabled = false;

  setEnabled(enabled: boolean) { this.enabled = enabled; if (!enabled) this.stop(); }
  unlock() {
    if (!this.enabled) return;
    try {
      this.context ??= new AudioContext();
      if (this.context.state === 'suspended') void this.context.resume().catch(() => {});
    } catch { /* Sound is optional on browsers without Web Audio. */ }
  }
  play(kind: WorldSound) {
    if (!this.enabled) return;
    this.unlock();
    const ctx = this.context;
    if (!ctx || ctx.state !== 'running') return;
    const now = ctx.currentTime;
    if (kind.startsWith('step')) {
      if (now - this.lastStep < .1) return;
      this.lastStep = now;
      const indoor = kind === 'step-inside';
      this.noise(now, .065, indoor ? 650 : 1500, indoor ? .045 : .035);
      this.tone(now, .07, (indoor ? 155 : 110) + (this.foot++ % 2) * 18, 55, .04);
    } else if (kind === 'open') {
      this.noise(now, .045, 2200, .07); // latch
      this.tone(now + .04, .24, 180, 310, .025); // hinge
      this.noise(now + .1, .19, 800, .018);
    } else if (kind === 'close') {
      this.noise(now, .1, 800, .07);
      this.tone(now, .13, 100, 48, .09);
      this.noise(now + .07, .035, 2400, .05);
    } else {
      this.noise(now, .045, 2600, .055);
      this.noise(now + .09, .045, 2000, .045);
      this.tone(now, .1, 130, 85, .03);
    }
  }
  private voice(source: AudioScheduledSourceNode, end: number, nodes: AudioNode[]) {
    this.sources.add(source);
    source.onended = () => { this.sources.delete(source); source.disconnect(); nodes.forEach(node => node.disconnect()); };
    source.stop(end);
  }
  private tone(start: number, duration: number, from: number, to: number, volume: number) {
    const ctx = this.context!, source = ctx.createOscillator(), gain = ctx.createGain();
    source.type = 'triangle'; source.frequency.setValueAtTime(from, start); source.frequency.exponentialRampToValueAtTime(to, start + duration);
    gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(volume, start + .005); gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    source.connect(gain).connect(ctx.destination); source.start(start); this.voice(source, start + duration, [gain]);
  }
  private noise(start: number, duration: number, frequency: number, volume: number) {
    const ctx = this.context!, buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate), data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
    source.buffer = buffer; filter.type = 'lowpass'; filter.frequency.value = frequency;
    gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(volume, start + .004); gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    source.connect(filter).connect(gain).connect(ctx.destination); source.start(start); this.voice(source, start + duration, [filter, gain]);
  }
  stop() {
    this.sources.forEach(source => { try { source.stop(); } catch { /* Already ended. */ } });
    this.sources.clear();
  }
  dispose() { this.enabled = false; this.stop(); void this.context?.close().catch(() => {}); this.context = undefined; }
}
