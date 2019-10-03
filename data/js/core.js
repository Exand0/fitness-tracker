const container = document.querySelector('.container');
const calendarCont = document.querySelector('.calendar_container');
const monthCont = document.querySelector('.month_container');
const monthTable = document.querySelector('.month_table');
const monthLabel = document.querySelector('.month_label');
const yearLabel = document.querySelector('.year_label');
const dayCont = document.querySelector('.day_container');
const dayEntries = document.querySelector('.day_entries');
const inputField = document.querySelector('.input_field');
const inputButton = document.querySelector('.input_button');
const workoutTable = document.querySelector('.workout_table');
const workoutInputArr = Array.from(document.querySelectorAll('.exercise_input'));

class Day {
    constructor(dayNum) {
        this.dayNum = dayNum,
        this.entryList = [];
    }
    addEntry(entryData) {
        this.entryList.push(entryData);
        console.log(this.entryList);
    }
    deleteEntry(target) {
        const id = target.parentNode.id;
        this.entryList.splice(id, 1);
    }
    updateEntry(position, value) {
        this.entryList.splice(position, 1, value);
    }
}

class WorkoutEntry {
    constructor() {
        this.exerciseName = 'None';
        this.restTime = 0;
        this.weightRepsArr = [];
    }
    addEntry(entryData) {
        this.exer.push(entryData);
        console.log(this.entryList);
    }
    deleteEntry(target) {
        const id = target.parentNode.id;
        this.entryList.splice(id, 1);
    }
    updateEntry(position, value) {
        this.entryList.splice(position, 1, value);
    }
}

let yearArr = Array(12);
for (let i = 0; i < 12; i++) {
    yearArr[i] = Array(31);
}
 

function gatherInput(inputElementsArr) {
    let weightRepArr = [];
    let entry = new WorkoutEntry;
    workoutInputArr.forEach(element => {
        if (element.classList.contains('exercise_name')) {
            entry.exerciseName = element.value;
        } else if (element.classList.contains('exercise_rest')) {
            entry.restTime = element.value;
        } else {
            weightRepArr.push(element.value);
        }
    });
    weightRepArr.reduce((previous, current, index, initArr) => {
        if (index % 2 === 0) {
            previous.push(initArr.slice(index, index + 2));
        } 
        return previous;   
    }, []);
    console.table(weightRepArr);
}
gatherInput(workoutInputArr);

// arr = [[1,2], [1,2], [1,2]];
// console.table(arr);

function drawTemplate() {
    workoutTable.innerHTML = '';
    let table = document.createElement('table');
    let ul = document.createElement('ul');
    day.entryList.forEach((entry, index) => {
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
    dayEntries.appendChild(table);
}

let calendar = {
    year: (new Date()).getFullYear(),
    monthNum: (new Date()).getMonth(),
    dayCache: '',
    indexCache: '',
    dayIsActive: false,
    setYear: function (year) {
        this.year = year;
    },
    getFirstDay: function () {
        return new Date(this.year, this.monthNum, 1);
    },
    getLastDay: function () {
        return new Date(this.year, this.monthNum + 1, 0);
    },
    getMonthName: function () {
        return this.getFirstDay().toLocaleString('default', { month: 'long' });
    },
    getDayCount: function () {
        return this.getLastDay().getDate();
    },
    setFirstWeekDay: function (day) {
        return ((this.getFirstDay().getDay() + 7 - day) % 7);
    },
    drawMonth: function () {
        monthTable.innerHTML = '';
        monthTable.id = this.monthNum;
        monthLabel.innerText = this.getMonthName();
        yearLabel.innerText = this.year;
        let tr;
        for (let index = (-1) * this.setFirstWeekDay(1) + 1, day = 0; index <= this.getDayCount(); index++ , day++) {
            let td = document.createElement('td');
            if (((day === 5) || (day === 6)) && index > 0) {
                td.classList.add('holiday');
            }
            if (!(day % 7)) {
                tr = document.createElement('tr');
                monthTable.appendChild(tr);
                day = 0;
            }
            if (index > 0) {
                td.classList.add('day');
                td.innerText = index;
                td.id = index;
            }
            tr.appendChild(td);
        }
        monthCont.appendChild(monthTable);
    },
    openDay: function (id) {
        let day;
        if (typeof (yearArr[this.monthNum][id]) !== 'object') {
            day = new Day(id);
            yearArr[this.monthNum ][id] = day;
        } else {
            day = yearArr[this.monthNum ][id];
        }
        dayEntries.innerHTML = '';
        //let table = document.createElement('table');
        let ul = document.createElement('ul');
        day.entryList.forEach((entry, index) => {
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
        dayEntries.appendChild(ul);
    },
    handleClick: function (e) {
        const className = e.target.className;
        let day = yearArr[this.monthNum][this.dayCache.id];
        if (className === 'delete_button') {
            day.deleteEntry(e.target);
            this.openDay(this.dayCache.id);
        } else if (className === 'entry_li') {
            this.indexCache = e.target.id;
            inputField.value = day.entryList[e.target.id];
            this.toggleButton();
        } else if (className === 'input_button') {
            day.addEntry(inputField.value);
            inputField.value = '';
            this.openDay(this.dayCache.id);
        } else if (className === 'update_button') {
            day.updateEntry(this.indexCache, inputField.value);
            this.toggleButton();
            inputField.value = '';
            indexCache = '';
            this.openDay(this.dayCache.id);
            // contains class
        } else if (e.target.classList.contains('day')) {
            if (!this.dayIsActive) {
                this.dayIsActive = true;
                e.target.classList.add('active');
                dayCont.classList.remove('inactive');  
            } else {
                if (this.dayCache.id != e.target.id) {
                    e.target.classList.add('active');
                    this.dayCache.classList.remove('active');   
                } else {
                    this.dayIsActive = false;
                    e.target.classList.remove('active');
                    dayCont.classList.add('inactive'); 
                }    
            }
            this.dayCache = e.target;
            this.openDay(this.dayCache.id);
        } else if (className === 'button_next month') {
            if (this.monthNum === 11) {
                this.monthNum = 0;
                this.year++;
            } else {
                this.monthNum++;
            }
            this.drawMonth();
        } else if (className === 'button_previous month') {
            if (this.monthNum === 0) {
                this.monthNum = 11;
                this.year--;
            } else {
                this.monthNum--;
            }
            this.drawMonth();
        } else if (className === 'button_next year') {
            this.year++;
            this.drawMonth();
        } else if (className === 'button_previous year') {
            this.year--;
            this.drawMonth();
        } else if (className === 'button_exercise_add') {
            console.log('test');
        }
    },
    toggleButton: function() {
        if (inputButton.className === 'update_button') {
            inputButton.innerText = 'Add';
        } else if (inputButton.className === 'input_button') {
            inputButton.innerText = 'Update';
        }
        inputButton.classList.toggle('input_button');
        inputButton.classList.toggle('update_button');
    
    }
}


container.addEventListener('click', e => calendar.handleClick(e));
calendar.drawMonth();

