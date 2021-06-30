import {showAlertMessage} from './alertMessage.js';
import {addClass, deleteClass} from './deleteAddClass.js';

const emailInput = document.getElementById('emailInput');
const userNameInput = document.getElementById('userNameInput');
const passwordInput = document.getElementById('passwordInput');
const registButton = document.getElementById('registButton');
const loginButton = document.getElementById('loginButton');
const errorBlock = document.getElementById('error');
const nontification = document.getElementById('nontification');
const showModalWindowBtn = document.getElementById('show_modal_window');
const closoNontificationBtn = document.getElementById('close_nontification');
const modalWindow = document.getElementById('modalWindow');
const loadLoginSpinner = document.getElementById('loadLoginSpinner');
const loadRegisterSpinner = document.getElementById('loadRegisterSpinner');
const modalOverlay = document.getElementById('modal_overlay');
const userData = new Set();
const closeModalWindowBtn = document.getElementById('closeModalWindowBtn');
const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

function clearInput() {
    let inputName = userNameInput.value;
    let inputEmail = emailInput.value;
    let password = passwordInput.value;
    inputName, inputEmail, password = '';
};

document.addEventListener('keyup', (event) => {
    if(event.keyCode === 27) {
        deleteClass(modalWindow, 'show');
        deleteClass(modalOverlay, 'show');
        addClass(modalWindow, 'fade')
        clearInput();
    }
});

setTimeout(()=> {
    deleteClass(nontification, 'fade');
    addClass(nontification, 'show')
}, 3000);

showModalWindowBtn.addEventListener('click', ()=>{
    addClass(modalWindow, 'show');
    addClass(modalOverlay, 'show');
});

closeModalWindowBtn.addEventListener('click', ()=>{
    deleteClass(modalWindow, 'show');
    deleteClass(modalOverlay, 'show');
    addClass(modalWindow, 'fade')
    clearInput();
});

closoNontificationBtn.addEventListener('click', ()=> {
    addClass(nontification, 'fade');
});

// vital1996@mail.ru
// vital1996
// minsk2020

function regist({name, email, password}){
    return new Promise((resolve, reject)=>{
        fetch('https://tms-task.herokuapp.com/users/register', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {
            'Content-type' : 'application/json; charset=utf-8'
            }
        })
        .then(((responce)=>{
            responce.json().then((body)=>{
                if(!responce.ok) {
                    return reject(body)
                } else {
                    return resolve(body)
                }
            })
        }))
    })
};

registButton.addEventListener('click', ()=>{   
    const name = userNameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;
    deleteClass(loadRegisterSpinner, 'hidden');
    
    regist({name, email, password})
    .then((body)=>{
        const token = body.token;
        const userName = body.user.name;
        userData.add(body);
        localStorage.setItem('token', token);
        localStorage.setItem('name', userName);
        window.location.href = './../../app.html';
    })
    .catch((error)=>{
        showAlertMessage(error.message);
    })
    .finally(()=>{
        addClass(loadRegisterSpinner, 'hidden');
    })
});



function login({name, email, password}){
    return new Promise((resolve, reject)=>{
        fetch('https://tms-task.herokuapp.com/users/login', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-type' : 'application/json; charset=utf-8'
            }
        })
        .then((responce)=>{
            responce.json().then((body)=>{
                if(!responce.ok) {
                    return reject(body)
                } else {
                    return resolve(body)
                }
            })
        })
       
    })
};

loginButton.addEventListener('click', ()=>{
    const name = userNameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;
    deleteClass(loadLoginSpinner, 'hidden');

    login({password, name, email})
    .then(body=>{
        const token = body.token;
        const userName = body.user.name;
        userData.add(body);
        errorBlock.style.display = 'none';
        console.log(body);
        localStorage.setItem('token', token);
        localStorage.setItem('name', userName);    
        window.location.href = './../../app.html';
    })
    .catch(error => {
        showAlertMessage(error.message);
    })
    .finally(()=>{
        addClass(loadLoginSpinner, 'hidden');
    })
});

closoNontificationBtn.addEventListener('click', ()=> {
    deleteClass(nontification, 'show');
    addClass(nontification, 'fade');
})