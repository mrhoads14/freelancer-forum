/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

const state = {
  freelancers: []
};

// === FUNCTIONS ===
const makeRandFreelancer = () => {
  const nameIdx = Math.floor(Math.random() * NAMES.length);
  const occIdx = Math.floor(Math.random() * OCCUPATIONS.length);
  const randRate = PRICE_RANGE.min + Math.floor(
    Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min)
  );

  return {
    name: NAMES[nameIdx], occupation: OCCUPATIONS[occIdx], rate: randRate
  };
}

const getAvgRate = (freelancerArr) => {
  if(freelancerArr.length === undefined) return undefined;
  if(freelancerArr.length < 1) return 0;

  const totRate = freelancerArr.reduce((accum, curr) => {
    accum += curr.rate;
    return accum;
  }, 0);
  return totRate / freelancerArr.length;
}

const makeFreelanceRow = (freelancer) => {
  const newTr = document.createElement('tr');
  const tdName = document.createElement('td');
  tdName.innerText = freelancer.name;
  const tdOcc = document.createElement('td');
  tdOcc.innerText = freelancer.occupation;
  const tdRate = document.createElement('td');
  tdRate.innerText = `$${freelancer.rate}`;

  newTr.append(tdName);
  newTr.append(tdOcc);
  newTr.append(tdRate);
  return newTr;
}

const makeFreelanceTable = (freelancerArr) => {
  const newTbody = document.createElement('tbody');
  for(let i = 0; i < freelancerArr.length; i++) {
    newTbody.append(makeFreelanceRow(freelancerArr[i]));
  }
  return newTbody;
}

const renderFreelanceTable = (freelancerArr) => {
  const theTbody = makeFreelanceTable(freelancerArr);
  const theTable = document.querySelector('table');
  theTable.append(theTbody);
}

// === UPDATE DATA ===
for(let i = 0; i < NUM_FREELANCERS; i++) {
  state.freelancers.push(makeRandFreelancer());
}
state.avgRate = getAvgRate(state.freelancers);

console.log("the average rate: ", state.avgRate);


// === ADJUST UI ===
const theAvgRate = document.querySelector('#avg-rate');
theAvgRate.innerText = state.avgRate.toFixed(2);
renderFreelanceTable(state.freelancers);
