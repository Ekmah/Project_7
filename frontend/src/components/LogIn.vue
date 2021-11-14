<template>
    <div>
        <form @submit.prevent="Submit">
            <label for="email_adress">Email adress:</label>
            <input id="email_adress" v-model="email_adress" type="email"><br>
            <label for="password">Password:</label>
            <input id="password" v-model="password" type="password"><br>
            <button type="submit">submit</button>
        </form>
        <!-- <button @click.prevent="aaa" :class="{zoom:isvalid}" class="">zefuyz</button> -->
    </div>
</template>

<script>
import http from "../http"
export default {
    name: "LogIn",
    data(){
        return {
            isvalid:false,
            email_adress:"",
            password:"",
        }
    },
    methods: {
        Submit(){
            let payload = {
                "email_adress": this.email_adress,
                "password": this.password
            }
            http.post("auth/login", payload)
            .then(response => {
                let token = response.data.token
                let id = response.data.userId
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('id', id)
                this.$store.commit('insert_token', token)
                this.$router.push({name: "Home"})
            })
        }
    }
}
</script>

<style>

</style>