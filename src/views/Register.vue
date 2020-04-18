<template>
    <div>
        <div v-if="error" class="error">{{error.message}}</div>
        <form @submit.prevent="pressed">
        <div class="email">
            <input type="email" v-model="email" placeholder="email">
        </div>
        <div class="password">
            <input type="text" v-model="password" placeholder="password">
        </div>    
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
    export default {
        methods: {
            async pressed(){
                try{
                const user =  firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                alert('submitted')
                console.log(user)
                this.$router.replace({name: "secret"});
                
            } catch(err){
                console.log(err)
            }
        },
        data() {
            return {
                email: "",
                password: '',
                error: '',
            }
        }
    }
    }
</script>

<style lang="scss" scoped>
.error {
    color: red;
    font-size: 18px;
}
input {
    width: 400px;
    padding: 30px;
    margin: 20px;
    font-size: 21px;
}
button {
    width: 400 px;
    height: 75 px;
    font-size: 100%;
}
    
    </style>