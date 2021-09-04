class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector.replace('#', '');
    this.targetDate = targetDate;

    this.init();
    this.start();
  }

  init() {
    document
      .querySelector('body')
      .insertAdjacentHTML('afterbegin', this.createMarkup());
    this.refs = {
      valueDays: document.querySelector('[data-value="days"]'),
      valueHours: document.querySelector('[data-value="hours"]'),
      valueMins: document.querySelector('[data-value="mins"]'),
      valueSecs: document.querySelector('[data-value="secs"]'),
    };
    const time = this.getTimeComponents(0);
    this.updateClockRender(time);
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = this.targetDate - Date.now();
      if (currentTime <= 0) {
        clearInterval(this.intervalId);
        return;
      }
      const time = this.getTimeComponents(currentTime);

      this.updateClockRender(time);
    }, 1000);
  }

  createMarkup() {
    return `<div class="timer" id="${this.selector}">
      <div class="field">
        <span class="value" data-value="days"></span>
        <span class="label">Days</span>
      </div>

      <div class="field">
        <span class="value" data-value="hours"></span>
        <span class="label">Hours</span>
      </div>

      <div class="field">
        <span class="value" data-value="mins"></span>
        <span class="label">Minutes</span>
      </div>

      <div class="field">
        <span class="value" data-value="secs"></span>
        <span class="label">Seconds</span>
      </div>
    </div>`;
  }

  updateClockRender({ days, hours, mins, secs }) {
    this.refs.valueDays.textContent = days;
    this.refs.valueHours.textContent = hours;

    this.refs.valueMins.textContent = mins;
    this.refs.valueSecs.textContent = secs;
  }

  getTimeComponents(time) {
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 1, 2022'),
});

const timer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Jun 13, 2022'),
});
