export interface TimerInterface {
  clear: () => void;
  pause: () => void;
  resume: () => void;
}

export class Timer implements TimerInterface {
  cb: () => void;
  delay: number;

  timerId?: number;
  start: number;
  remaining: number;

  constructor(cb: () => void, delay: number) {
    this.cb = cb;
    this.delay = delay;

    this.start = delay;
    this.remaining = delay;

    this.resume();
  }

  clear = () => {
    window.clearTimeout(this.timerId);
  };

  pause = () => {
    window.clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  };

  resume = () => {
    this.start = Date.now();
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.cb, this.remaining);
  };
}
