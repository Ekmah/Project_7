<template>
    <div>
        <form @submit.prevent="Submit">
            <div class="form-group">
                <label for="username_signup">Username:</label>
                <input class="form-control" id="username_signup" v-model="username" type="text"><br>
                <label for="email_adress_signup">Email adress:</label>
                <input class="form-control" id="email_adress_signup" v-model="email_adress" type="email"><br>
                <label for="password_signup">Password:</label>
                <input class="form-control" id="password_signup" v-model="password" type="password"><br>
                <button class="btn btn-success" type="submit">submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import http from "../http"
export default {
    name: "SignUp",
    data(){
        return {
            isvalid:false,
            username:"",
            email_adress:"",
            password:"",
        }
    },
    methods: {
        Submit(){
            let payload = {
                "username": this.username,
                "email_adress": this.email_adress,
                "password": this.password
            }
            http.post("auth/signup", payload)
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