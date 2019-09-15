//const body = document.querySelector('body');
let container = document.createElement('div');
body.appendChild(container);

let date = new Date();
let year = date.getFullYear();
let monthName = date.toLocaleString('default', {month: 'long'});
let monthNum = date.getMonth();
let today = date.getDate();
let currentDay = new Date(year, monthNum, 1);
let lastDay = new Date(year, monthNum + 1, 0);

let nextButton = document.createElement('button');
nextButton.classList.add('control_button');
let previousButton = document.createElement('button');
previousButton.classList.add('control_button');

let monthLabel = document.createElement('p');
monthLabel.innerText = monthName;
monthLabel.classList.add('month_label');
container.appendChild(monthLabel);

let tb = document.createElement('table');
container.appendChild(tb);
let weekDay;

// Making Monday first day of the week
(currentDay.getDay() === 0) ? weekDay = 6 : (weekDay = currentDay.getDay() - 1);

// Beginning of the month is current day - day of the week
for (let index = (-1) * weekDay + 1, week = 0, day = 0; index <= lastDay.getDate(); index++, week++, day++) {

    let td = document.createElement('td');
    td.classList.add('day');
    if (((day ===  5) || (day ===  6)) && index > 0) {
        td.classList.add('holiday');
    }

    if (!(day%7)) {
        tr = document.createElement('tr');
        tb.appendChild(tr);
        day = 0;
    }

    if (index > 0) {
        td.innerText = index; 
    }
    tr.appendChild(td);
}
class Year {
    constructor(year, monthArr) {

    }
}
class Month {
    constructor(month, dayCount, dayArr) {
        
    }
}

class Day {
    constructor(data) {
        this.data = data;
    }
}