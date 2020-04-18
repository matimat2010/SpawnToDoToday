<template>
    <div>
        Login
        <form @submit.prevent="pressed">
        <div class="login">
            <input type="email" placeholder="login" v-model="email"/>
        </div>
           <div class="password">
            <input type="password" placeholder="password" v-model="password"/>
        </div>
        <button type="submit">Login</button>
        </form>
        <div v-if="error" class="error">{{error.message}}</div>
        <span>Need an account? click here to <router-link to="/register">register</router-link></span>
        </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    data(){
      return{
          emial: '',
          password: '',
          error:'',
      } 
    },
    methods: {
       async pressed() {
           try {
           const val = firebase.auth().signInWithEmailAndPassword(this.email, this.password)
           console.log(val);
           this.$router.replace({name: "secret"})
           } catch(err) {
            console.log(err)
           }        
        }
    }
}
</script>

<style lang="scss" scoped>
</style> 