
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD07cjEozPOtbkK3njWix3V8NLHyozzKXI",
    authDomain: "respawn-fc46f.firebaseapp.com",
    databaseURL: "https://respawn-fc46f.firebaseio.com",
    projectId: "respawn-fc46f",
    storageBucket: "respawn-fc46f.appspot.com",
    messagingSenderId: "143584174542",
    appId: "1:143584174542:web:010b1f589b66c282e1cb9f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();


  function signUp(){

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert("Signed Up!")
  }

  function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    
  }

  function signOut(){
      auth.signOut();
      alert('Signed Out');
  }

  auth.onAuthStateChanged(function(user){
        if(user){
            var email = user.email;
            alert("Active User " + email)
            window.location.assign("todo.html")

        } else {
            alert("No Active User");
        }


  });