<template>
    <div>
    <div v-if="loggedIn">Logged In</div>
    <div v-else>Please Log In
    </div>
    <button class="but" @click="signOut">Sign out</button>

    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
    export default {
        created(){
            firebase.auth().onAuthStateChanged(user=> {
                this.loggedIn = !!user;
                // if(user){
                //     this.loggedIn = true;
                
                // }else{
                //     this.logged = false;
                //                 }
            })
        },


        data() {
            return {
                loggedIn: false
            }
        },
        methods: { 
            async signOut(){
                try{
                const data = await firebase.auth().signOut();
                console.log(data);
                this.$router.replace({name: "login"})

                }catch(err){
                    console.log(err)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>