//     // let nextButton = document.createElement('button');
//     // nextButton.classList.add('control_button');
//     // let previousButton = document.createElement('button');
//     // previousButton.classList.add('control_button');

//     //let year = 2019;
//     //month 0-11
//     //let monthNum = 8;
// // class Days {
// //     constructor() {

// //     }
// // }

// // let body = document.querySelector('body');

// // class Month {
// //     constructor(year, monthNum) {
// //         this.year = year;
// //         this.month = monthNum;
// //         // this.self = this;
// //     }
// //     drawMonth() {
// //         // console.log(self);
// //         let container = document.createElement('div');
// //         let monthLabel = document.createElement('p');
// //         let tb = document.createElement('table');
    
// //         let firstDay = new Date(this.year, this.month, 1);
// //         let lastDay = new Date(this.year, this.month + 1, 0);

// //         let monthName = firstDay.toLocaleString('default', {month: 'long'});
// //         let weekDay;
        
// //         container.appendChild(monthLabel);  
// //         monthLabel.innerText = monthName;
// //         monthLabel.classList.add('month_label');
    
// //         container.appendChild(tb);
// //         // setting monday to be the first day
// //         (firstDay.getDay() === 0) ? weekDay = 6 : (weekDay = firstDay.getDay() - 1);
// //         let tr;
// //         for (let index = (-1) * weekDay + 1, day = 0; index <= lastDay.getDate(); index++, day++) {
// //             let td = document.createElement('td');
// //             td.classList.add('day');
// //             //console.log(td);

// //             if (((day ===  5) || (day ===  6)) && index > 0) {
// //                 td.classList.add('holiday');
// //             }
    
// //             if (!(day%7)) {
// //                 tr = document.createElement('tr');
// //                 tb.appendChild(tr);
// //                 day = 0;
// //             }
    
// //             if (index > 0) {
// //                 td.innerText = index; 
// //                 td.id = index;
// //             }
// //             tr.appendChild(td);
// //         }
// //         return container;
// //     }

// //     // addField(ul) {
// //     //     const entry_li = docuemtn.createElement('li');
// //     // }


// //     addEntry(target) {
// //         const li = document.createElement('li');
// //         const input = docuemtn.createElement('input');
// //         input.setAttribute('type', 'text');
// //         li.classList.add('entry_li');
// //         target.appendChild(li);
// //         li.appendChild(input);    
// //     }
    
// //     openDay() {
// //         let dayCont;
// //         const addEntryButton = document.createElement('button');
// //         addEntryButton.classList.add('add_entry');
// //         addEntryButton.innerText = 'Add entry';

// //         if (!(dayCont = document.querySelector('.day_container'))) {
// //             //console.log(entry_td);
// //             dayCont = document.createElement('div');
// //             dayCont.classList.add('day_container');
// //             body.appendChild(dayCont);
// //         } else {
// //             dayCont.innerHTML = '';
// //         }

// //         dayCont.appendChild(addEntryButton);

// //         const entry_td = document.createElement('table');
// //         entry_td.classList.add('entry_td');

// //         const entry_ul = document.createElement('ul');
// //         entry_ul.classList.add('entry_ul');

// //         dayCont.appendChild(entry_td);
// //         entry_td.appendChild(entry_ul);

// //         return entry_ul;
// //     }


// //     handleClick(e) {
// //         let entry_ul;
// //         const element = e.target;
// //         if (element.className === 'day') {
// //             entry_ul = this.openDay();
// //         } else if (element.className === 'add_entry') {
// //             console.log(element);
// //             this.addEntry(entry_ul);
// //         }
// //     }
// // }

// // class Year {
// //     constructor(year) {
// //         this.year = year;
// //     }
// //     drawYear() {
// //         //console.log(this);
// //         for (let i = 0; i < 12; i++) {
// //             let month = new Month(this.year, i);
// //             let monthCont = month.drawMonth();
// //             monthCont.classList.add('month');
// //             body.appendChild(monthCont);
// //             monthCont.addEventListener('click', e => month.handleClick(e));

// //         }
// //     }

// // }

// // let year = (new Year(2019)).drawYear();

// //-----------------

// class Day {
//     constructor(weekDayNum, dayNum, isWeekend) {
//         this.entryArr = [];
//         this.weekDayNum = weekDayNum;
//         this.dayNum = dayNum;
//         this.isWeekend = isWeekend;
//         //this.targetEl;
//     }

//     addEntry(entryData) {
//         //console.log(this);
//         this.entryArr.push(entryData);
//         drawContainer();
//     }
//     handleClick(e) {
//         if (e.target.className === 'delete_button') {
//             //console.log(e.target.classList);
//             this.deleteEntry(e.target);
//             tdrawContainer();
//         } else if (e.target.className === '.entry_li') {
//             this.updateEntry(e.target);
//             drawContainer();
//         }

//     }
//     deleteEntry(target) {
//         const id = target.parentNode.id;
//         this.entryArr.splice(id, 1);
//         console.log('delete');
//     }
//     updateEntry(target) {

//     }
//     // getEntry(index) {
//     //     if (this.entryArr.length !== 0) {
//     //         return this.entryArr.at(index);
//     //     }
//     // }
//     getEntryArr() {
//         return this.entryArr;
//     }
//     // getArrSize() {
//     //     return this.entryArr.length;
//     // }
// }

// const container = document.createElement('div');
// const inputField = document.createElement('input');
// const inputButton = document.createElement('button');
// let day = new Day(0, 16, false);
// let daysArr;

// inputField.setAttribute('type', 'text');
// inputField.classList.add('input_field');
// inputButton.classList.add('input_button');
// container.classList.add('container');
// inputButton.innerText = 'Add';

// body.appendChild(container);
// container.appendChild(inputField);
// container.appendChild(inputButton);


// //day.attachUiTo(container);
// inputButton.addEventListener('click', () => {
//     let val = inputField.value;
//     day.addEntry(val);   
// });


function drawContainer(obj) {
    let entryArr = 
    container.innerHTML = '';
    let table = document.createElement('table');
    let ul = document.createElement('ul');
    this.entryArr.forEach((entry, index) => {
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
    container.appendChild(table);
}

// container.addEventListener('click', e => day.handleClick(e));
   
//     // class Year {
//     //     constructor(year, monthArr) {
    
//     //     }
//     // }
//     // class Month {
//     //     constructor(year, month, dayCount, dayArr) {
//     //         this.year = year;
//     //         this.month = month;
//     //         this.dayCount = dayCount;
//     //         this.dayArr = dayArr
//     //     }
//     // }
    
//     // class Day {
//     //     constructor(data, day, weekDay) {
//     //         this.data = data;
//     //         this.day = day;
//     //         this.weekDay = weekDay;
//     //     }
//     //     getDayElement() {
    
//     //     }
//     // }
    
//     // let sept = new Month(year, monthNum);
//     // body.appendChild(sept.drawMonth());