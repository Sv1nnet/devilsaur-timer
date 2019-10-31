/* eslint-disable no-underscore-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/*
 *
 * 1) Disabling timer
 * 2) Start await timer:
 *   a) from current time
 *   b) from time was set by user
 * 3) Count time left
 * 4) Start respawn timer:
 *   a) from current time
 *   b) from time was set by user
 */
const AWATING = 'awaiting';
const PREPARING = 'preparing';
const TIMEWARNING = 'time-warning';
const TURNED_OFF = 'turned-off';
const WAITING_TIME_IN_MS = 300000;
const SPAWN_TIME_IN_MS = 300000;

class DinoTimer {
  constructor(title) {
    const query = `.dino-${title}`;
    const mainContainer = document.querySelector(query);

    // HTML elements
    this.elements = {
      mainContainer,
      avatar: mainContainer.querySelector('.dino-avatar'),
      timer: mainContainer.querySelector('.timer'),
      time: mainContainer.querySelector('.timer').querySelector('.time'),
      timeSpan: mainContainer.querySelector('.timer').querySelector('.time').querySelector('span'),
      killTimeInput: mainContainer.querySelector('.kill-time'),
      startButton: mainContainer.querySelector('button'),
      timeLapse: mainContainer.querySelector('.timelapse'),
    };

    // Intervals for counting time
    this.intervals = {
      waitingInterval: null,
      spawnInterval: null,
    };

    // Time left
    this.timers = {
      awaiting: 0,
      spawning: 0,
    };

    this.state = {
      disabled: false,
      awaiting: false,
      spawning: false,
      preparing: false,
      timeLapsePosition: 0,
      prevDeathTime: '--:--',
      deathTime: 0,
    };

    this.elements.avatar.addEventListener('click', (e) => {
      this.disableTimer();
    });

    this.elements.startButton.addEventListener('click', (e) => {
      this.startTimer();
    });
  }

  setAwaitingStatus(awaitingTimeInMs) {
    this.state.awaiting = true;
    this.timers.awaiting = awaitingTimeInMs;

    this.state.spawning = false;
  }

  setSpawningStatus(spawnTime) {
    this.state.spawning = true;
    this.timers.spawning = spawnTime;

    this.state.awaiting = false;
  }

  setTimeLeft() {
    // this.timers
  }

  validate(time) {

  }

  startTimer() {
    // debugger;
    const animationStep = 200;
    const currentDate = new Date();
    const dateNowInMs = currentDate.getTime();
    const isTimeSetNow = this.elements.killTimeInput.value === '--:--' || this.elements.killTimeInput.value === this.state.prevDeathTime || this.elements.killTimeInput.value === '';

    const deathTime = this._getDeathTime(currentDate, isTimeSetNow);
    const timePassedInMs = DinoTimer._getTimePassedInMs(deathTime);

    const awaitingTimeInMs = dateNowInMs + WAITING_TIME_IN_MS;

    this.resetTimer();

    // If death time is current time then set it into view. Otherwise calculate how much time left and set corresponding time
    if (isTimeSetNow) {
      this.state.prevDeathTime = deathTime.timeStr;
      this.elements.killTimeInput.value = deathTime.timeStr;
      this.elements.timeSpan.innerText = '05:00';

      this.setAwaitingStatus(awaitingTimeInMs);
    } else {
      this.state.prevDeathTime = this.elements.killTimeInput.value;

      // If time passed less then wating time then set awating time otherwise set spawn time
      this.setAwaitingStatus(awaitingTimeInMs - timePassedInMs);
      if (timePassedInMs > WAITING_TIME_IN_MS) {
        this.setSpawningStatus(awaitingTimeInMs + SPAWN_TIME_IN_MS - timePassedInMs);
      }
    }
// debugger;
    this._setWaitingInterval(animationStep);
    // console.log(this);
  }

  _setWaitingInterval(animationStep) {
    
    // if ((this.timers.awaiting + SPAWN_TIME_IN_MS - Date.now()) <= 0) return;
    this.intervals.waitingInterval = setInterval(() => {
      const currentTimeInMs = Date.now();
      const timeLeftInMs = this.timers.awaiting - currentTimeInMs;

      // this.timers.awaiting -= animationStep;

      this._moveTimeLapse(timeLeftInMs, WAITING_TIME_IN_MS);
      this._updateTimeLeft(timeLeftInMs, WAITING_TIME_IN_MS);

      // If waiting time less than 30s then set time color warning
      if (!this.state.preparing && (this.timers.awaiting - currentTimeInMs) <= 30000) {
        this._setPreparingStatus();
      } else if (this.state.preparing && (this.timers.awaiting - currentTimeInMs) > 30000) {
        // this.timers.removeHalfMinPrepColor();
      }

      if ((this.timers.awaiting - currentTimeInMs) <= 0) {
        // console.log(this.timers.awaiting)
        // console.log(this.timers.awaiting - currentTimeInMs)
        // console.log('(this.timers.awaiting - currentTimeInMs)')
        clearInterval(this.intervals.waitingInterval);

        // this.timers.resetResp();
        // this.state.preparing = false;

        // this.timers.startRespTimer();
        // this.state.preparing = true;

        this._setSpawnInterval(animationStep);
      }
    }, animationStep);
  }

  _setSpawnInterval(animationStep) {
    // this.elements.timeLapse.style.left = '0%';
    // this.elements.timeLapse.classList.add(PREPARING);
    const spawningTimeInMs = this.timers.awaiting + SPAWN_TIME_IN_MS;
    this.setSpawningStatus(spawningTimeInMs);
    this._setSpawningStyle(spawningTimeInMs);

    this.intervals.spawnInterval = setInterval(() => {
      const currentTimeInMs = Date.now();
      const timeLeftInMs = this.timers.spawning - currentTimeInMs;

      this._moveTimeLapse(timeLeftInMs, SPAWN_TIME_IN_MS);
      this._updateTimeLeft(timeLeftInMs, SPAWN_TIME_IN_MS);

      if ((this.timers.spawning - currentTimeInMs) <= 0) {
        clearInterval(this.intervals.spawnInterval);
        this.elements.timeSpan.innerText = '00:00';
        // this.timers.resetPreparing();
        // this.state.preparing = false;
      }
    }, animationStep);
  }

  _moveTimeLapse(timeLeftInMs, totalTimeInMs, debug) {
    if (debug) debugger;
    this.state.timeLapsePosition = 100 - (timeLeftInMs / totalTimeInMs * 100);
    // console.log(this.state.timeLapsePosition)
    this.elements.timeLapse.style.left = `${this.state.timeLapsePosition}%`;
  }

  _updateTimeLeft(timeLeftInMs, totalTimeInMs, debug) {
    if (debug) debugger;
    let minutesLeft = parseInt((timeLeftInMs / 60000), 10);
    let secondsLeft = parseInt(((timeLeftInMs % totalTimeInMs) / 1000) - (minutesLeft * 60), 10);

    if (minutesLeft < 10) minutesLeft = `0${minutesLeft < 0 ? 5 : minutesLeft}`;
    if (secondsLeft < 10) secondsLeft = `0${secondsLeft < 0 ? 0 : secondsLeft}`;

    this.elements.timeSpan.innerText = `${minutesLeft}:${secondsLeft}`;
    // }
  }

  resetTimer() {
    const initialState = DinoTimer.INITIAL_STATE;

    for (const timerField in this.timers) {
      this.timers[timerField] = initialState.timers[timerField];
    }

    for (const stateField in this.state) {
      this.state[stateField] = initialState.state[stateField];
    }

    this.elements.mainContainer.classList.remove(AWATING);
    this.elements.mainContainer.classList.remove(PREPARING);
    this.elements.mainContainer.classList.remove(TURNED_OFF);
    this.elements.timeLapse.classList.remove(PREPARING);

    for (const interval in this.intervals) {
      clearInterval(this.intervals[interval]);
    }
  }

  _setPreparingStatus() {
    this.state.preparing = true;

    this.elements.mainContainer.classList.remove(PREPARING);
    this.elements.timeLapse.classList.remove(PREPARING);
    this.elements.mainContainer.classList.add(AWATING);
  }

  _setSpawningStyle() {
    this.state.spawning = true;

    this.elements.mainContainer.classList.remove(AWATING);
    this.elements.timeLapse.classList.add(PREPARING);
    this.elements.mainContainer.classList.add(PREPARING);
  }

  _getDeathTime(currentDate, isTimeSetNow) {
    const serverHours = currentDate.getUTCHours() + 2;

    let [hours, minutes] = this.elements.killTimeInput.value.split(':');

    if (isTimeSetNow) {
      if (currentDate.getMinutes().toString().length < 2) {
        minutes = `0${currentDate.getMinutes()}`;
      } else {
        minutes = currentDate.getMinutes();
      }

      if ((serverHours) >= 24) {
        hours = `0${serverHours % 24}`;
      } else if (serverHours < 10) {
        hours = `0${serverHours}`;
      } else {
        hours = serverHours;
      }
      // if (currentDate.getHours().toString().length < 2) {
      //   hours =  `0${currentDate.getHours()}`;
      // } else {
      //   hours = currentDate.getHours();
      // }
    }

    const deathTime = `${hours}:${minutes}`;
    // const deathDate = currentDate.toString()
    //   .split(' ')
    //   .map((datePiece) => {
    //     if (datePiece.includes(':')) return `${deathTime}:00`;
    //     return datePiece;
    //   })
    //   .join(' ');

    return { timeStr: deathTime, date: currentDate };
  }

  disableTimer() {
    this.timers.awaiting = 0;
    this.spawning = 0;

    for (const interval in this.intervals) {
      clearInterval(this.intervals[interval]);
    }

    this.state.awaiting = false;
    this.state.spawning = false;
    this.state.preparing = false;
    this.state.timeLapsePosition = 0;
    this.state.prevDeathTime = '--:--';
    this.state.deathTime = 0;

    this.elements.timeSpan.innerText = '--:--';
    this.elements.killTimeInput.value = '--:--';

    this.elements.timeLapse.style.left = '0%';

    if (this.state.disabled !== true) {
      this.state.disabled = true;

      this.elements.mainContainer.classList.add(TURNED_OFF);
      this.elements.mainContainer.classList.remove(PREPARING);
      this.elements.timeLapse.classList.remove(PREPARING);
    } else {
      this.elements.mainContainer.classList.remove(TURNED_OFF);
      this.state.disabled = false;
    }
  }

  static get INITIAL_STATE() {
    return {
      timers: {
        awaiting: 0,
        spawning: 0,
      },
      state: {
        disabled: false,
        awaiting: false,
        spawning: false,
        timeLapsePosition: 0,
        prevDeathTime: '--:--',
        deathTime: 0,
      },
    };
  }

  static _getTimePassedInMs(time) {
    const [hoursStr, minutesStr] = time.timeStr.split(':');
    const minutes = parseInt(minutesStr, 10);
    const hours = parseInt(hoursStr, 10);

    const [currentHoursStr, currentMinutesStr] = time.date.toString()
      .split(' ')
      .find(datePiece => datePiece.includes(':'))
      .split(':');

    const currentMinutes = parseInt(currentMinutesStr, 10);
    const currentHours = parseInt(currentHoursStr, 10);

    const timePassedInMs = ((minutes + 16) >= 60 && (currentMinutes < minutes)) ? (((currentMinutes + 60) - minutes) * 60000) : ((currentMinutes - minutes) * 60000);

    return timePassedInMs;
  }
}

export default DinoTimer;
