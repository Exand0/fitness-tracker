const body = document.querySelector('body');
const inputField = document.querySelector('.input');
const inputButton = document.querySelector('.button_weight');
const entryList = document.createElement('ul');
entryList.classList.add('ulist_entries');
body.appendChild(entryList);

let valArr = [];

function handleInput(e) {
    if ((e.keyCode == "13") || (e.target.className == 'button_weight')) {
        const inputVal = inputField.value;
        addEntry(inputVal);
        displayEntries(inputVal);
    }
}

function addEntry(value) {
    valArr.push(value);
}

function createDeleteButton() {
    const delButton = document.createElement('button');
    delButton.classList.add('button_delete');
    delButton.innerText = 'Delete';
    return delButton;
}

function displayEntries(value) {
    entryList.innerHTML = '';
    valArr.forEach((value, pos) => {
        const li = document.createElement('li');
        li.id = pos;
        li.innerText = value;
        //console.log(li);
        li.classList.add('li_entry');
        entryList.appendChild(li);
        li.appendChild(createDeleteButton());
    });
    entryList.addEventListener('click', deleteEntry);
    //entryList.addEventListener('keydown', updateEntry);

}

// function updateEntry(element) {
//     if (element.target.className === 'li_entry') {
//         const id = element.target.parentNode.id;
//         //valArr.splice(id, 1, element.target.innerText);
//         displayEntries();
//         console.log(element.target.innerText);
//     }
// }

function deleteEntry(element) {
    //element.target.parentNode.removeChild(element.target);
    if (element.target.className === 'button_delete') {
        const id = element.target.parentNode.id;
        valArr.splice(id, 1);
        displayEntries();
    }
    // if (element.target.className === 'li_entry') {
    //     //console.log(element);
    //     element.target.setAttribute('contentEditable', 'true');
    // }
}

inputButton.addEventListener('click', handleInput);
document.addEventListener('keydown', handleInput);