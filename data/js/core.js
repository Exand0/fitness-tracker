const container = document.querySelector('.container');
const calendarCont = document.querySelector('.calendar_container');
const monthCont = document.querySelector('.month_container');
const calendarTable = document.querySelector('.calendar_table');
const monthLabel = document.querySelector('.month_label');
const dayCont = document.querySelector('.day_container');

let yearArr = [];

class Day {
    constructor(weekDayNum, dayNum, isWeekend = false) {
        this.entryArr = [];
        this.weekDayNum = weekDayNum;
        this.dayNum = dayNum;
        this.isWeekend = isWeekend;
    }
    addEntry(entryData) {
        this.entryArr.push(entryData);
    }
    deleteEntry(target) {
        const id = target.parentNode.id;
        this.entryArr.splice(id, 1);
    } 
    updateEntry(position, value) {
        this.entryArr.splice(position, 1, value);
    }
    getEntry(position) {
        return this.entryArr[position];
    }
    getEntryArr() {
        return this.entryArr;
    }
}

//let day = new Day(1, 2);

container.addEventListener('click', e => handleClick(e));
let indexCache;
let dayCache;

function openDay() {
    dayCont.innerHTML = '';
    let table = document.createElement('table');
    let ul = document.createElement('ul');
    let entryArr = day.getEntryArr();
    entryArr.forEach((entry, index) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.classList.add('delete_button');
        li.classList.add('entry_li');
        li.innerText = entry;
        li.id = index;
        ul.appendChild(li);  
        li.appendChild(button);
    });
    table.appendChild(ul);
    dayCont.appendChild(table);

}


function toggleButton() {
    if (inputButton.className === 'update_button') {
        inputButton.innerText = 'Add';
    } else if (inputButton.className === 'input_button') {
        inputButton.innerText = 'Update';
    }
    inputButton.classList.toggle('input_button');
    inputButton.classList.toggle('update_button');

}

function handleClick(e) {
    const className = e.target.className;
    if (className === 'delete_button') {
        day.deleteEntry(e.target);
    } else if (className === 'entry_li') {
        indexCache = e.target.id;
        let  val = day.getEntry(indexCache);
        inputField.value = val;
        toggleButton();
    } else if (className === 'input_button') {
        day.addEntry(inputField.value);
        inputField.value = '';
    } else if (className === 'update_button') {
        day.updateEntry(indexCache, inputField.value);
        toggleButton();
        inputField.value = '';
        indexCache = '';
    } else if (className === 'day') {
        dayCache = e.target.id;

    }
    openDay(e.target);

}

class Month {
    constructor(year, monthNum) {
        this.year = year;
        this.monthNum = monthNum;
        this.firstDay = new Date(this.year, this.monthNum - 1, 1);
        this.lastDay = new Date(this.year, this.monthNum, 0);
        this._firstWeekDay;
        this.dayArr = [];
    }
    set firstWeekDay(day) {
        this._firstWeekDay = ((this.firstDay.getDay() + 7 - day) % 7);
    }
    get firstWeekDay() {
        return this._firstWeekDay;
    }
    get monthName() {
        return this.firstDay.toLocaleString('default', {month: 'long'});
    }
    get dayCount() {
        return this.lastDay.getDate();
    }
    buildMonth() {
        for (let i = 1; i <= this.dayCount; i++ ) {
            this.dayArr.push(new Day(1, i));
        }
    }
}

function drawMonth(monthObj) {
    monthLabel.innerText = monthObj.monthName;
    let tr;
    for (let index = (-1) * monthObj.firstWeekDay + 1, day = 0; index <= monthObj.dayCount; index++, day++) {
        let td = document.createElement('td');
        td.classList.add('day');

        if (((day ===  5) || (day ===  6)) && index > 0) {
            td.classList.add('holiday');

            monthObj.dayArr[index - 1].isWeekend = true;
        }

        if (!(day%7)) {
            tr = document.createElement('tr');
            calendarTable.appendChild(tr);
            day = 0;
        }

        if (index > 0) {
            td.innerText = index; 
            td.id = index;
        }
        tr.appendChild(td);
    }
}

// function drawYear(year) {
//     for (let i = 1; i <= 1; i++) {
//         let month = new Month(year, i);    
//         month.buildMonth(); 
//         month.firstWeekDay = 1; 
//         yearArr.push(month);
//         drawMonth(month);  
//     }
// }


let month = new Month(2019, 9)
month.buildMonth();
month.firstWeekDay = 1;
drawMonth(month);


//drawYear(2019);
