<template>
    <div>
        bla bla bla,<br> 
        <form @submit.prevent="onSubmit">
            <input id="email_adress" v-model="email_adress" type="email">
            <input id="password" v-model="password" type="password">
            <button type="submit">submit</button>
        </form>
        <button @click.prevent="aaa" :class="{zoom:isvalid}" class="">zefuyz</button>
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
        onSubmit(){
            let payload = {
                "email_adress": this.email_adress,
                "password": this.password
            }
            http.post("auth/login", payload)
            .then(response => {
                let token = response.data.token
                sessionStorage.setItem('token', token)
                this.$store.commit('insert_token', token)
            })
        }
    }
}
</script>

<style>

</style>