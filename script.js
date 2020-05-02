
//adding classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//LOG IN SCREEN HTML
out = "<div id = 'new'>" +
"<h1>Form</h1>" +
"<div id='formContainer'>" +
"<div id='header'></div>"  +   
"<input type='email' placeholder='email' id='email'/>" +
"<input type='password' placeholder='password' id='password'/>" +
"<button onclick='signUp()' id='signUp'>Sign Up</button>" +
"<button onclick='signIn()' id='signIn'>Sign In</button>" +
"<button onclick='signOut()' id='signOut'>Sign Out</button>" +
"</div>" + 
"</div>";  

  //HTML TO CREATE CHECKLIST
var appPage = "<div class= 'container' id='in'>" +
"<div class='header'>" +
"<div class ='clear'>" + 
" <i class = 'fa fa-refresh'></i>"+ 
"</div>" + 
"<div id ='date'></div>"+
"</div> "+
"<div class ='content'>" +
"<ul id='list'>" +
"</ul>"+
"</div>"+
"<div class='add-to-do'>"+
"<i class='fa fa-plus-circle'></i>"+
"<input type='text' id='input' placeholder='Add a to-do'>"+
"</div>"+
"</div>"+
"<button onclick='signOut()' id='signOut'>Sign Out</button>";

 // Your web app's Firebase configuration
var firebaseConfig = 
{   apiKey: "AIzaSyD07cjEozPOtbkK3njWix3V8NLHyozzKXI",
    authDomain: "respawn-fc46f.firebaseapp.com",
    databaseURL: "https://respawn-fc46f.firebaseio.com",
    projectId: "respawn-fc46f",
    storageBucket: "respawn-fc46f.appspot.com",
    messagingSenderId: "143584174542",
    appId: "1:143584174542:web:010b1f589b66c282e1cb9f"
};

  // Initialize Firebase Authentication
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    alert("Signed Up!")}

function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    }

function signOut(){
    document.getElementById("in").innerHTML = out;
    auth.signOut();
    alert('Signed Out');
    }

auth.onAuthStateChanged(function(user){
    console.log("state change triggered");     
    const options = {weekday : "long", month:"short", day:"numeric"};
    const today = new Date();
    const email = user.email;
    const userDateKey = email+"date";
    const userDate = localStorage.getItem(userDateKey);

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1).getDate
    // getting tommorows date number
    future = tomorrow.getDate();
    // getting today's date number
    present = today.getDate();
    //present = 2;
 
    if(user){
        //var email = user.email;
        alert("Active User " + email)
        document.getElementById("new").innerHTML = appPage;

        //Selecting elements from to do list form
        const clear = document.querySelector(".clear");
        const dateElement = document.getElementById("date");
       // Where item lives
        const list = document.getElementById("list");
       //user input
        const input = document.getElementById("input");

        let LIST = [], 
        id = 0;

        // get item from local storage
        let data = localStorage.getItem(email);
       
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
        dateElement.innerHTML = today.toLocaleDateString("en-US", options);
             
        function addToDo(toDo, id, done, trash){
            if(trash){return};
             // Null for first time users
                if (userDate == null || userDate < present) {userDate = present};
//--------------------------------------------------------------------------------------------------
             //next line changes the local store date to the present for testing only - -
             //localStorage.setItem(userDateKey, present);

            //function triggered if stored date matches current date - changes stored current date to tommorow after the function runs can only be ran once a day
            if (userDate == present){
            console.log("I'm a coding");
            //This is where we uncross / change classes on list items
            DONE = UNCHECK;
            LINE = "";
            const item = `
            <li class="item">
            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}" >${toDo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
            </li>
             `;
          
             const position = "beforeend";
            list.insertAdjacentHTML(position, item);
          
//---------------------------------------------------------------------
            //comment out next line when testing (changing dates so code only runs once a day)
            localStorage.setItem(userDateKey, future);
//---------------------------------------------------------------------

                var i;
                for (i = 0; i< LIST.length; i++){
                    LIST[i].done = false;
                    localStorage.setItem(email, JSON.stringify(LIST));
                }  

                }else{
                    DONE = done ? CHECK : UNCHECK;
                    LINE = done ? LINE_THROUGH : "";

                    const item = `
                    <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}" >${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                    </li>
                    `;

                    const position = "beforeend";
                    list.insertAdjacentHTML(position, item);}
                }
        
        console.log("future: " + future);
        console.log("present: " + present);
        console.log("userDate: " + userDate);
        console.log("userDateKey: " + userDateKey);
        console.log("email: " + email);
        console.log(LIST);
        
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
                    // add item to local storage
                    localStorage.setItem(email, JSON.stringify(LIST));
                    id++;
                }
            input.value="";
            }
        });

        //complete toDo
        function completeToDo(element){
            //Checking the check box
            element.classList.toggle(CHECK);
            //Unchecking the check box
            element.classList.toggle(UNCHECK);
            //Crossing / Uncrossing the task
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
                // add item to local storage
                localStorage.setItem(email, JSON.stringify(LIST));
            });
                } else {
            alert("No Active User");
        }
    });
