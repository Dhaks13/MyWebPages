//decalring required variables
let num = 0;
let history = [];
let element;

//getting html document elements
const button1 = document.querySelector("#button1");
const text = document.querySelector("#text");

//initialize buttons
button1.onclick = roll;


//function for goTown
function roll() {
    num = Math.floor(Math.random()*101);
    for (var i = 0; i < history.length; i++){
        if(history[i] == num){
            return roll();
        }
    }
    history.push(num);
    text.innerText = "The Number is: " + num + "\n Numbers on Board:\n\n";
    updateColor(num);
}

function updateColor(int) {
    int=String("#num"+int);
    element=document.querySelector(int);
    element.style.color = "Green";
}
