
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import firebase from "firebase/app";

Vue.prototype.$axios=axios;
Vue.config.productionTip = false

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyCEtKq6k2-51NhGxO8eSrPWQE2fiARICOQ",
  authDomain: "todotoday-ec437.firebaseapp.com",
  databaseURL: "https://todotoday-ec437.firebaseio.com",
  projectId: "todotoday-ec437",
  storageBucket: "todotoday-ec437.appspot.com",
  messagingSenderId: "40460683148",
  appId: "1:40460683148:web:442c3f44b3e478f3c778a9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app; 

firebase.auth().onAuthStateChanged(user=> {
  console.log(user);
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
      }).$mount('#app')
  }
})


