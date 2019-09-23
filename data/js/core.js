const container = document.querySelector('.container');
const outputCont = document.createElement('div');
const calendarCont = document.createElement('div');
const inputField = document.createElement('input');
const inputButton = document.createElement('button');
inputButton.classList.add('input_button');
calendarCont.classList.add('calendar_container')
outputCont.classList.add('output_container');
inputButton.innerText = 'Add';

container.appendChild(inputField);
container.appendChild(inputButton);
container.appendChild(outputCont);
container.appendChild(calendarCont);


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

let day = new Day(1, 2);

container.addEventListener('click', e => handleClick(e));
let indexCache;

function drawOutput() {
    outputCont.innerHTML = '';
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
    outputCont.appendChild(table);
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
    if (e.target.className === 'delete_button') {
        //console.log(e.target.classList);
        day.deleteEntry(e.target);
    } else if (e.target.className === 'entry_li') {
        indexCache = e.target.id;
        let  val = day.getEntry(indexCache);
        inputField.value = val;
        toggleButton();
    } else if (e.target.className === 'input_button') {
        day.addEntry(inputField.value);
        inputField.value = '';
    } else if (e.target.className === 'update_button') {
        day.updateEntry(indexCache, inputField.value);
        toggleButton();
        inputField.value = '';
        indexCache = '';
    }
    drawOutput();
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
            // const day = new Day(1, i);
            // day.getDay() ? 
            this.dayArr.push(new Day(1, i));
        }
    }
}

function drawMonth() {

    const monthCont = document.createElement('div');
    let monthLabel = document.createElement('p');
    let tb = document.createElement('table');

    monthCont.appendChild(monthLabel);  
    monthCont.appendChild(tb);
    monthLabel.innerText = month.monthName;
    monthLabel.classList.add('month_label');

    let tr;
    for (let index = (-1) * month.firstWeekDay + 1, day = 0; index <= month.dayCount; index++, day++) {
        let td = document.createElement('td');
        td.classList.add('day');

        if (((day ===  5) || (day ===  6)) && index > 0) {
            td.classList.add('holiday');
            month.dayArr[index].isWeekend = true;
        }

        if (!(day%7)) {
            tr = document.createElement('tr');
            tb.appendChild(tr);
            day = 0;
        }

        if (index > 0) {
            td.innerText = index; 
            td.id = index;
        }
        tr.appendChild(td);
    }
    return monthCont;
}

let month = new Month(2019, 9);

month.firstWeekDay = 1;
drawOutput();
month.buildMonth();
calendarCont.appendChild(drawMonth());

// class Month {
//     constructor(year, monthNum) {
//         this.year = year;
//         this.month = monthNum;
//     }

//     // addField(ul) {
//     //     const entry_li = docuemtn.createElement('li');
//     // }

//     addEntry(target) {
//         const li = document.createElement('li');
//         const input = docuemtn.createElement('input');
//         input.setAttribute('type', 'text');
//         li.classList.add('entry_li');
//         target.appendChild(li);
//         li.appendChild(input);    
//     }
    
//     openDay() {
//         let dayCont;
//         const addEntryButton = document.createElement('button');
//         addEntryButton.classList.add('add_entry');
//         addEntryButton.innerText = 'Add entry';

//         if (!(dayCont = document.querySelector('.day_container'))) {
//             //console.log(entry_td);
//             dayCont = document.createElement('div');
//             dayCont.classList.add('day_container');
//             body.appendChild(dayCont);
//         } else {
//             dayCont.innerHTML = '';
//         }

//         dayCont.appendChild(addEntryButton);

//         const entry_td = document.createElement('table');
//         entry_td.classList.add('entry_td');

//         const entry_ul = document.createElement('ul');
//         entry_ul.classList.add('entry_ul');

//         dayCont.appendChild(entry_td);
//         entry_td.appendChild(entry_ul);

//         return entry_ul;
//     }


//     handleClick(e) {
//         let entry_ul;
//         const element = e.target;
//         if (element.className === 'day') {
//             entry_ul = this.openDay();
//         } else if (element.className === 'add_entry') {
//             console.log(element);
//             this.addEntry(entry_ul);
//         }
//     }
// }