import {addClass, deleteClass} from './deleteAddClass.js';
import {showAlertMessage} from './alertMessage.js';


const userName = localStorage.getItem('name');
const token = localStorage.getItem('token');
const craeteTaskBtn = document.getElementById('craeteTaskBtn');
const container = document.getElementById('container');
const errorBox = document.getElementById('errorBox');
const taskNameInput = document.getElementById('taskNameInput');
const parent = document.getElementById('parent');
const description_task = document.getElementById('description_task');
const taskContainer = document.getElementById('task_container');
const meeetPerson = document.getElementById('meeet_person');
const taskDescription = document.getElementById('task_description');
const removeTaskCkeckBox = document.getElementById('remove_task_ckeck_box');
const removeTaskBtn = document.getElementById('remove_task_btn');
const buttonBlock = document.getElementById('buttons_block');
const mainTaskContainer = document.getElementById('main_task_container');


meeetPerson.innerHTML = `Hello, ${userName}`;

if(!token) {
    window.location.href = './../../index.html'
};

function createTask({name, description}) {
    return new Promise((resolve, reject)=>{
        fetch('https://tms-task.herokuapp.com/tasks', {
            method: 'POST',
            body: JSON.stringify({name, description}),
            headers: {
            'Content-type' : 'application/json; charset=utf-8',
            'Authorization': `Bearer ${token}`,
            }
        })
        .then((responce)=>{
            responce.json().then((body)=>{
                if(!responce.ok) {
                    console.log(body);
                    return reject(body);
                } else {
                    return resolve(body);
                }
            })
        })
    })
};

craeteTaskBtn.addEventListener('click', ()=>{
    const name = taskNameInput.value;
    const description = description_task.value;
    createTask({name, description})
    .then(body=>{
        errorBox.innerHTML = '';  
        errorBox.style.display = 'none';
        deleteClass(mainTaskContainer, 'hide');
        taskContainer.innerHTML = `${body.name}`;
        deleteClass(buttonBlock, 'hide');

        taskContainer.addEventListener('click', ()=> {
            taskDescription.classList.toggle('hide');
            taskDescription.innerHTML = `${body.description}`
        })
    })
    .catch( error=>{
        showAlertMessage(error.message);
    })
});

function checkBox() {
    if(removeTaskCkeckBox.checked) {
        taskContainer.style.textDecoration = 'line-through';
    } else {
        taskContainer.style.textDecoration = 'none';
    }
};

removeTaskCkeckBox.addEventListener('input', checkBox);

removeTaskBtn.addEventListener('click', ()=> {
    // let name = taskNameInput.length;
    let name = taskNameInput;

    let description = description_task.value;
    name.innerText = ``;
    description = '';
    addClass(mainTaskContainer, 'hide');
    addClass(buttonBlock, 'hide');    
})