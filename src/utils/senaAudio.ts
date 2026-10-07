/**
 * Web Audio API synthesizer for SENA Institutional Anthem melody.
 * Safe, hermetic, runs in browser without external dependencies.
 */
class AnthemAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private onStepCallback: ((index: number) => void) | null = null;

  // Melody notes (Hymn of SENA in Bb Major, triumphant march tempo)
  private readonly notes = [
    { freq: 466.16, dur: 0.5 }, // Bb4
    { freq: 466.16, dur: 0.5 }, // Bb4
    { freq: 466.16, dur: 0.75 }, // Bb4
    { freq: 392.00, dur: 0.25 }, // G4
    { freq: 466.16, dur: 0.5 },  // Bb4
    { freq: 523.25, dur: 0.5 },  // C5
    { freq: 587.33, dur: 1.0 },  // D5
    { freq: 523.25, dur: 0.5 },  // C5
    { freq: 466.16, dur: 0.5 },  // Bb4
    { freq: 440.00, dur: 0.5 },  // A4
    { freq: 392.00, dur: 0.5 },  // G4
    { freq: 349.23, dur: 1.0 },  // F4
    { freq: 392.00, dur: 0.5 },  // G4
    { freq: 440.00, dur: 0.5 },  // A4
    { freq: 466.16, dur: 1.2 },  // Bb4
  ];

  public start(onStep: (index: number) => void, onComplete: () => void) {
    this.stop();
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.isPlaying = true;
    this.onStepCallback = onStep;

    let currentTime = this.ctx.currentTime + 0.1;
    let stepIndex = 0;

    this.notes.forEach((note, idx) => {
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Brass/triumphant timbre with slight harmonic richness
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, currentTime);

      gain.gain.setValueAtTime(0.001, currentTime);
      gain.gain.exponentialRampToValueAtTime(0.25, currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, currentTime + note.dur - 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(currentTime);
      osc.stop(currentTime + note.dur);

      const delayMs = (currentTime - this.ctx.currentTime) * 1000;
      window.setTimeout(() => {
        if (this.isPlaying && this.onStepCallback) {
          this.onStepCallback(stepIndex % 4);
        }
      }, Math.max(0, delayMs));

      currentTime += note.dur;
      stepIndex++;
    });

    const totalDurationMs = (currentTime - this.ctx.currentTime) * 1000;
    this.timer = window.setTimeout(() => {
      this.isPlaying = false;
      onComplete();
    }, totalDurationMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {
        // audio context closed
      }
      this.ctx = null;
    }
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const anthemEngine = new AnthemAudioEngine();
