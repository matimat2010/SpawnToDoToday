
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


  // Initialize Firebase Authentication and Database
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
//   let account = {
//     name: email.value,
//     list: []
// }
//   console.log(db.collection('users').doc(account.name))

function signUp(){

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    let account= {
        name: email.value,
        list: []
        }
    
    //Create Object with email as name and empty array list on sign up
    db.collection('users').doc(email.value).set
        ({ 
        name: email.value,
        list: []
        });

    alert("Signed Up!")}

function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    }



//Sign Out Button Function
function signOut(){
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

    document.getElementById("in").innerHTML = out;
    auth.signOut();
    alert('Signed Out');
    }

auth.onAuthStateChanged(function(user){
  
    //HTML TO CREATE CHECKLIST
    n = "<div class= 'container' id='in'>" +
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
    
    console.log("state change triggered"); 

    if(user){
        var users = firebase.auth().currentUser.email;
        //console.log(users);
        var email = user.email;


//----------------------


        alert("Active User " + users)

        document.getElementById("new").innerHTML = n;
        
        //Selecting elements from to do list form
        const clear = document.querySelector(".clear");
        const dateElement = document.getElementById("date");
        const list = document.getElementById("list");
        const input = document.getElementById("input");

        //adding classes
        const CHECK = "fa-check-circle";
        const UNCHECK = "fa-circle-thin";
        const LINE_THROUGH = "lineThrough";

        let LIST = [], 
        id = 0;

        // get item from local storage
        let data = localStorage.getItem(users);

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
                    localStorage.setItem(email, JSON.stringify(LIST));
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
                localStorage.setItem(email, JSON.stringify(LIST));
            });


        
    } else {
            alert("No Active User");
        }
 
    });
