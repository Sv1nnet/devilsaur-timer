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
};
