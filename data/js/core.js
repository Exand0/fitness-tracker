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
const workoutOutput = document.querySelector('.workout_output');

class Day {
    constructor(dayNum) {
        this.dayNum = dayNum,
        this.entryList = [];
    }
    addEntry(entryData) {
        this.entryList.push(entryData);
    }
    deleteEntry(target) {
        const id = target.parentNode.parentNode.id;
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
        let entryType = typeof (yearArr[this.monthNum][id]);
        if (entryType !== 'object' || entryType === 'undefined' || yearArr[this.monthNum][id] === null) {
            day = new Day(id);
            yearArr[this.monthNum ][id] = day;
        } else {
            day = yearArr[this.monthNum ][id];

        }
        workoutOutput.innerHTML = '';
        day.entryList.forEach((entryArr, index) => {
            const row = document.createElement('tr');
            const deleteButton = document.createElement('button');
            const updateButton = document.createElement('button');
            row.id = index;
            deleteButton.innerText = 'Delete';
            deleteButton.classList.add('delete_button'); 

            updateButton.innerText = 'Update';
            updateButton.classList.add('update_button');

            entryArr.forEach((val, ind) => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.value = val;
                switch(ind) {
                    case 0:
                        input.classList.add('exercise_name', 'exercise_input');
                        break;
                    case 1:
                        input.classList.add('exercise_rest', 'exercise_input');
                        break;
                    default:
                        if(ind % 2 === 0) {
                            input.classList.add('exercise_weight', 'exercise_input');
                        } else {
                            input.classList.add('exercise_reps', 'exercise_input'); 
                        }
                        break;
                }
                td.appendChild(input);
                row.appendChild(td);
            });
            const td = document.createElement('td');
            td.appendChild(deleteButton);
            td.appendChild(updateButton);
            row.appendChild(td);
            workoutOutput.appendChild(row);
        });
    },
    toggleButton: function() {
        if (inputButton.className === 'update_button') {
            inputButton.innerText = 'Add';
        } else if (inputButton.className === 'input_button') {
            inputButton.innerText = 'Update';
        }
        inputButton.classList.toggle('input_button');
        inputButton.classList.toggle('update_button');
    
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
            indexCache = '';
            this.openDay(this.dayCache.id);
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
        } else if (e.target.classList.contains('button_exercise_add')) {
            day.addEntry(this.gatherInput());
            this.openDay(this.dayCache.id);
            window.localStorage.setItem('yearArr', JSON.stringify(yearArr));
        }
    },
    gatherInput: function(workoutInputArr) {
        entryArr = [];
        workoutInputArr.forEach(element => {
                entryArr.push(element.value);
                element.value = '';
        });
        return entryArr;
    }
}

container.addEventListener('click', e => calendar.handleClick(e));
calendar.drawMonth();

