import { addClass, deleteClass } from "./deleteAddClass.js";

const modal = document.getElementById('modal');
const logOutBtn = document.getElementById('logOutBtn');
const modalTitle = document.getElementById('modal-title');
const wrapper = document.getElementById('wrapper');

let count = 10;

const modalWork = () =>{
    setInterval(()=>{
        if(!count == 0) {
            modalTitle.innerHTML = `you will relocate to main page in ${--count} seconds`;
        }
    }, 1000);
}

logOutBtn.addEventListener('click', (event) => {
    addClass(wrapper, 'hide');
    deleteClass(modal, 'hide');
    modalWork();
    setTimeout(()=>{
        window.location.href = './../../index.html'
    }, 11000);
    localStorage.clear();
});