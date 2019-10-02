const container = document.querySelector('.container');
const calendarCont = document.querySelector('.calendar_container');
const monthCont = document.querySelector('.month_container');
const monthTable = document.querySelector('.month_table');
const monthLabel = document.querySelector('.month_label');
const yearLabel = document.querySelector('.year_label');
const dayCont = document.querySelector('.day_container');
const inputField = document.querySelector('.input_field');
const inputButton = document.querySelector('.input_button');

let yearArr = Array(12);

for (let i = 0; i < 12; i++)  {
    yearArr[i] = Array(31);
}

let indexCache;





function toggleButton() {
    if (inputButton.className === 'update_button') {
        inputButton.innerText = 'Add';
    } else if (inputButton.className === 'input_button') {
        inputButton.innerText = 'Update';
    }
    inputButton.classList.toggle('input_button');
    inputButton.classList.toggle('update_button');

}

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

let calendar = {
    year: (new Date()).getFullYear(),
    monthNum: (new Date()).getMonth(),
    dayCache: 0,
    setYear: function(year) {
        this.year = year;
    },
    getFirstDay: function() {
        return new Date(this.year, this.monthNum - 1, 1);
    },
    getLastDay: function() {
        return new Date(this.year, this.monthNum, 0);
    },
    getMonthName: function() {
        return this.getFirstDay().toLocaleString('default', {month: 'long'});
    },
    getDayCount: function() {
        return this.getLastDay().getDate();
    },
    setFirstWeekDay: function (day) {
        return ((this.getFirstDay().getDay() + 7 - day) % 7);
    },
    initMontArr: function() {
        const days = this.getDayCount();
        monthArr = Array(days);
    },
    drawMonth: function () {
        //this.initMontArr();
        monthTable.innerHTML = '';
        monthTable.id = this.monthNum;
        monthLabel.innerText = this.getMonthName();
        yearLabel.innerText = (new Date).getFullYear();
        let tr;
        for (let index = (-1) * this.setFirstWeekDay(1) + 1, day = 0; index <= this.getDayCount(); index++, day++) {
            let td = document.createElement('td');
            if (((day ===  5) || (day ===  6)) && index > 0) {
                td.classList.add('holiday');
                //monthObj.dayArr[index - 1].isWeekend = true;
            }
            if (!(day%7)) {
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
        //console.log(yearArr[this.monthNum]);
        if (typeof (yearArr[this.monthNum - 1][id]) !== 'object' ) {
            day = new Day(id);
            yearArr[this.monthNum - 1][id] = day;
        } else {
            day = yearArr[this.monthNum - 1][id];
        }
        //this.dayCache = day;
        dayCont.innerHTML = '';
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
        dayCont.appendChild(table);
    },
    handleClick: function(e) {
        const className = e.target.className;
        let day = yearArr[this.monthNum - 1][this.dayCache];
        if (className === 'delete_button') {
            day.deleteEntry(e.target);
            this.openDay(this.dayCache);
        } else if (className === 'entry_li') {
            //indexCache = e.target.id;
            //let val = day.getEntry(indexCache);
            inputField.value = day.entryList[e.target.id];
            toggleButton();
        } else if (className === 'input_button') {
            //let day = yearArr[this.monthNum - 1][this.dayCache];
            day.addEntry(inputField.value);
            inputField.value = '';
            console.log(yearArr);
            this.openDay(this.dayCache);
        } else if (className === 'update_button') {
            day.updateEntry(indexCache, inputField.value);
            toggleButton();
            inputField.value = '';
            indexCache = '';
            this.openDay(e.target);
        // contains class
        } else if (e.target.classList.contains('day')) {
            this.dayCache = e.target.id;
            this.openDay(this.dayCache);
        } else if (className === 'button_next') {
            if (calendar.monthNum === 12) {
                calendar.monthNum = 1;
                calendar.year++;
            } else {
                calendar.monthNum++;
            }
            this.drawMonth();
        } else if (className === 'button_previous') {
            if (calendar.monthNum === 1) {
                calendar.monthNum = 12;
                calendar.year--;
            } else {
                calendar.monthNum--;
            }
            calthis.endar.drawMonth();
        }
    }
}


container.addEventListener('click', e => calendar.handleClick(e));
calendar.drawMonth();

