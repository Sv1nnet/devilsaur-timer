/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
// eslint-disable-next-line func-names
import DinoTimer from './js/dinoTimer';

window.onload = function() {
  const dinoTitles = ['navy', 'pink', 'skyblue', 'green', 'yellow', 'red'];
  const dinos = dinoTitles.map(title => new DinoTimer(title));

  console.log(dinos);
  // const PREPARE = 'prepare';
  // const TIMEOVER = 'timeover';
  // const TIMEWARNING = 'time-warning';
  // const TURNEDOFF = 'turned-off';
  // const TIMERESP = 60000;
  // const TIMEPREP = 36000;

  // const dinoTitles = ['navy', 'pink', 'skyblue', 'green', 'yellow', 'red']
  // const dinos = {};

  // dinoTitles.forEach((title) => {
  //   const query = `.dino-${title}`;
  //   const mainContainer = document.querySelector(query);
  //   const initialState = {
  //     timers: {
  //       resp: TIMERESP,
  //       preparing: TIMEPREP,
  //     },
  //     state: {
  //       disabled: false,
  //       preparing: false,
  //       timeover: false,
  //       timeLaspPosition: 0,
  //       prevDeathTime: '--:--',
  //       deathTime: 0,
  //     },
  //   };

  //   dinos[title] = {};

  //   dinos[title].elements = {
  //     mainContainer,
  //     avatar: mainContainer.querySelector('.dino-avatar'),
  //     timer: mainContainer.querySelector('.timer'),
  //     time: mainContainer.querySelector('.timer').querySelector('.time'),
  //     timeSpan: mainContainer.querySelector('.timer').querySelector('.time').querySelector('span'),
  //     killTimeInput: mainContainer.querySelector('.kill-time'),
  //     startButton: mainContainer.querySelector('button'),
  //     timeLapse: mainContainer.querySelector('.timelapse'),
  //   };

  //   dinos[title].intervals = {
  //     respawnInterval: null,
  //     timeoverInterval: null,
  //   };

  //   dinos[title].timers = {
  //     resp: TIMERESP,
  //     preparing: TIMEPREP,
  //     startRespTimer() {
  //       dinos[title].elements.mainContainer.classList.remove(PREPARE);
  //       dinos[title].elements.mainContainer.classList.remove(TIMEOVER);
  //       dinos[title].elements.timeLapse.classList.remove(TIMEOVER);
  //       dinos[title].elements.mainContainer.classList.add(PREPARE);
  //       this.removeTimeWarning();
  //     },
  //     setHalfMinPrepColor() {
  //       dinos[title].elements.mainContainer.classList.add(TIMEWARNING);
  //     },
  //     removeTimeWarning() {
  //       dinos[title].elements.mainContainer.classList.remove(TIMEWARNING);
  //     },
  //     startPrepareTimer() {
  //       dinos[title].elements.mainContainer.classList.remove(TIMEOVER);
  //       dinos[title].elements.mainContainer.classList.add(PREPARE);
  //       dinos[title].elements.timeLapse.classList.add(TIMEOVER);
  //     },
  //     resetResp() {
  //       this.resp = TIMERESP;
  //     },
  //     resetPreparing() {
  //       this.preparing = TIMEPREP;
  //     },
  //   };

  //   dinos[title].state = {
  //     disabled: false,
  //     preparing: false,
  //     timeover: false,
  //     timeLaspPosition: 0,
  //     prevDeathTime: '--:--',
  //     deathTime: 0,
  //   };

  //   dinos[title].setTimeLeft = function () {
  //     this.timers
  //   };

  //   dinos[title].elements.avatar.addEventListener('click', function(e) {
  //     disableTimer(dinos[title]);
  //   });

  //   dinos[title].elements.startButton.addEventListener('click', function(e) {
  //     startTimer(dinos[title]);
  //   });
  // });

  // function validate(time) {

  // }

  // function startTimer(dino) {
  //   const animationStep = 200;
  //   const isTimeSetNow = dino.elements.killTimeInput.value === '--:--' || dino.elements.killTimeInput.value === dino.state.prevDeathTime || dino.elements.killTimeInput.value === '';
  //   const currentDate = new Date();

  //   let [hours, minutes] = dino.elements.killTimeInput.value.split(':');

  //   if (isTimeSetNow) {
  //     if (currentDate.getMinutes().toString().length < 2) {
  //       minutes = `0${currentDate.getMinutes()}`;
  //     } else {
  //       minutes = currentDate.getMinutes();
  //     }

  //     if (currentDate.getHours().toString().length < 2) {
  //       hours = `0${currentDate.getHours()}`;
  //     } else {
  //       hours = currentDate.getHours();
  //     }
  //   }

  //   const deathTime = `${hours}:${minutes}`;
  //   const deathDate = currentDate.toString()
  //     .split(' ')
  //     .map((datePiece) => {
  //       if (datePiece.includes(':')) return `${deathTime}:00`;
  //       return datePiece;
  //     })
  //     .join(' ');
  //   const timePassedMs = calculatePassedTimeMs(deathTime);

  //   dino.timers.resetResp();
  //   dino.timers.resetPreparing();

  //   dino.elements.mainContainer.classList.remove(TURNEDOFF);

  //   dino.state.disabled = false;

  //   clearInterval(dino.intervals.respawnInterval);
  //   clearInterval(dino.intervals.timeoverInterval);

  //   if (!isTimeSetNow) {
  //     dino.state.prevDeathTime = dino.elements.killTimeInput.value;
  //     dino.timers.resp -= timePassedMs;
  //   } else {
  //     dino.state.prevDeathTime = deathTime;
  //     dino.elements.killTimeInput.value = deathTime;
  //   }

  //   // if (isTimeSetNow) {
  //   //   dino.elements.timeSpan.innerText = '10:00';
  //   // } else {
  //   //   let minutesLeft = parseInt((dino.timers.resp / 60000), 10);
  //   //   let secondsLeft = parseInt(((dino.timers.resp % 600000) / 1000) - (minutesLeft * 60), 10);

  //   //   if (minutesLeft < 10) minutesLeft = `0${minutesLeft}`;
  //   //   if (secondsLeft < 10) secondsLeft = `0${secondsLeft}`;

  //   //   dino.elements.timeSpan.innerText = `${minutesLeft}:${secondsLeft}`;
  //   // }

  //   dino.intervals.respawnInterval = setInterval(function() {
  //     dino.timers.resp -= animationStep;

  //     dino.state.timeLaspPosition = 100 - (dino.timers.resp / TIMERESP * 100);
  //     dino.elements.timeLapse.style.left = `${dino.state.timeLaspPosition}%`;

  //     if (dino.timers.resp % 1000 === 0) {
  //       let minutesLeft = parseInt((dino.timers.resp / 60000), 10);
  //       let secondsLeft = parseInt(((dino.timers.resp % 600000) / 1000) - (minutesLeft * 60), 10);

  //       if (minutesLeft < 10) minutesLeft = `0${minutesLeft}`;
  //       if (secondsLeft < 10) secondsLeft = `0${secondsLeft}`;

  //       dino.elements.timeSpan.innerText = `${minutesLeft}:${secondsLeft}`;
  //     }

  //     if (!dino.state.preparing && dino.timers.resp <= 30000) {
  //       dino.timers.startPrepareTimer();
  //       dino.state.preparing = true;
  //       dino.timers.setHalfMinPrepColor();
  //     } else if (dino.state.preparing && dino.timers.resp > 30000) {
  //       dino.timers.removeHalfMinPrepColor();
  //     }

  //     if (dino.timers.resp <= 0) {
  //       clearInterval(dino.intervals.respawnInterval);

  //       dino.elements.timeLapse.style.left = '0%';
  //       dino.elements.timeLapse.classList.add(TIMEOVER);

  //       dino.timers.resetResp();
  //       dino.state.preparing = false;

  //       dino.timers.startRespTimer();
  //       dino.state.resp = true;

  //       dino.intervals.timeoverInterval = setInterval(function() {
  //         dino.timers.preparing -= animationStep;

  //         if (dino.timers.preparing % 1000 === 0) {
  //           let minutesLeft = parseInt((dino.timers.resp / 60000), 10);
  //           let secondsLeft = parseInt(((dino.timers.resp % 360000) / 1000) - (minutesLeft * 60), 10);

  //           if (minutesLeft < 10) minutesLeft = `0${minutesLeft}`;
  //           if (secondsLeft < 10) secondsLeft = `0${secondsLeft}`;

  //           dino.elements.timeSpan.innerText = `${minutesLeft}:${secondsLeft}`;
  //         }

  //         dino.state.timeLaspPosition = 100 - (dino.timers.preparing / TIMEPREP * 100);
  //         dino.elements.timeLapse.style.left = `${dino.state.timeLaspPosition}%`;
  //         if (dino.timers.preparing <= 0) {
  //           clearInterval(dino.intervals.timeoverInterval);

  //           dino.timers.resetPreparing();
  //           dino.state.resp = false;
  //         }
  //       }, animationStep);
  //     }
  //   }, animationStep);

  //   window.dino = dino;
  // }

  // function moveTimelapse(timelapse) {

  // }

  // function setTimerPrepare(dino) {

  // }

  // function setTimerTimeover(dino) {

  // }

  // function disableTimer(dino) {
  //   dino.elements.mainContainer.classList.toggle(TURNEDOFF);

  //   if (dino.state.disabled !== true) {
  //     dino.elements.timeLapse.style = '';
  //     dino.elements.time.style.color = '';
  //     dino.elements.timeSpan.innerText = '--:--';
  //     dino.elements.killTimeInput.value = '--:--';

  //     dino.state.disabled = true;
  //     dino.state.preparing = false;
  //     dino.state.timeover = false;

  //     dino.timers.resetResp();
  //     dino.timers.resetPreparing();

  //     clearInterval(dino.intervals.respawnInterval);
  //     clearInterval(dino.intervals.timeoverInterval);
  //   } else {
  //     dino.state.disabled = false;
  //   }
  // }

  // function calculatePassedTimeMs(time) {
  //   const [hoursStr, minutesStr] = time.split(':');
  //   const minutes = parseInt(minutesStr, 10);
  //   const hours = parseInt(hoursStr, 10);

  //   const [currentHoursStr, currentMinutesStr] = new Date().toString()
  //     .split(' ')
  //     .find(datePiece => datePiece.includes(':'))
  //     .split(':');

  //   const currentMinutes = parseInt(currentMinutesStr, 10);
  //   const currentHours = parseInt(currentHoursStr, 10);

  //   const timePassedMs = ((minutes + 16) >= 60 && (currentMinutes < minutes)) ? (((currentMinutes + 60) - minutes) * 60000) : ((currentMinutes - minutes) * 60000);

  //   return timePassedMs;
  // }
};
