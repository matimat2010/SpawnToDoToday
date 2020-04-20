
//Selecting elements from to do list form
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const lsit = document.getElementById("list");
const input = document.getElementById("input");

//Classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST = [], id = 0;

// get item from local storage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set id
    loadList(LIST); //load list to ui
} else {
    LIST = [];
    id = 0;
}

// load items to ui
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//show date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash){
if(trash){return};

const DONE = done ? CHECK : UNCHECK;
const LINE = done ? LINE_THROUGH : "";

const item = `
                <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}" >${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                </li>
            `;

const position = "beforeend";

list.insertAdjacentHTML(position, item);

}

// addToDo("test");

//add an item to the todo list
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        //if the input is not empty
        if(toDo){
            addToDo(toDo, id, false, false);
           //adding items to array
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            // add item from local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
         }
         input.value="";
    }
});


addToDo("Coffee", 1, false, true);

//complete toDo
function completeToDo(element){
element.classList.toggle(CHECK);
element.classList.toggle(UNCHECK);
element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

LIST[element.id].done = LIST[element.id].done ? false : true;

}

// remove todo

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
            completeToDo(element);
    }else if(elementJob == "delete"){
            removeToDo(element);
    }
    // add item from local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});