import axios from "axios";

document.addEventListener('DOMContentLoaded', () => {
    const assistance = document.querySelector('#confirm-assistance');
    if(assistance){
        assistance.addEventListener('submit', confirmAssistance);
    }
});

function confirmAssistance(e){
    e.preventDefault();
    const btn = document.querySelector('#confirm-assistance input[type="submit"]');
    let actionInput = document.querySelector('#actionInput').value;
    const message = document.querySelector('.message');

    //Clean the previous response
    while(message.firstChild){
        message.removeChild(message.firstChild);
    }

    //Obtain the value 'cancel' or 'confirm' on the hidden
    const data = {
        actionInput
    }

    console.log(this.action);
    axios.post(this.action, data)
    .then(response => {
        
        if(actionInput == 'confirm'){
            // Modify the elements of the button
            document.querySelector('#actionInput').value = 'cancel';
            btn.value = 'Cancel';
            btn.classList.remove('btn-blue');
            btn.classList.add('btn-red');
        }else{
            // Modify the elements of the button
            document.querySelector('#actionInput').value = 'confirm';
            btn.value = 'Yes';
            btn.classList.remove('btn-red');
            btn.classList.add('btn-blue');
        }
        //Show a message
        message.appendChild(document.createTextNode(response.data));

    })
}