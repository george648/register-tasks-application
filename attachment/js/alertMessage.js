const alertMessage = document.getElementById('alertMessage');


export const showAlertMessage = (message) =>{
    const alertTextMessage = alertMessage.querySelector('div');
    alertMessage.classList.remove('fade');
    alertMessage.classList.add('show');
    alertTextMessage.innerHTML = `${message}`;
};