import {ReactiveControllerHost} from 'lit';

export type IntervalModeType = 'MANUAL' | 'AUTO';

export interface IntervalControllerConfig {
  callback?: () => void;
  mode?: IntervalModeType;
  timer?: number;
}

type CallbackFunction = () => void;

export class IntervalController {
  _host: ReactiveControllerHost;
  private _timerRef?: any;
  private _timer = 5000;

  _callback: CallbackFunction | null;

  private _mode: IntervalModeType = 'AUTO';

  constructor(host: ReactiveControllerHost, {callback, mode, timer}: IntervalControllerConfig) {
    (this._host = host).addController(this);
    this._mode = mode ?? this._mode;
    this._timer = timer ?? this._timer;
    this._callback = callback || null;
  }

  startInterval() {
    clearInterval(this._timer);
    if (this._callback) {
      this._callback();
      this._timerRef = setInterval(() => {
        this._callback && this._callback();
      }, this._timer);
    }
  }

  stopInterval() {
    clearInterval(this._timerRef);
  }

  hostConnected() {
    if (this._mode === 'AUTO') {
      this.startInterval();
    }
  }

  hostDisconnected() {
    clearInterval(this._timerRef);
  }
}
