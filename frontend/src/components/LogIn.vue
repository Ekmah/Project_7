<template>
    <div>
        <form @submit.prevent="Submit">
            <div class="form-group">
                <label for="email_adress">Email adress:</label>
                <input class="form-control" id="email_adress" v-model="email_adress" type="email"><br>
                <label for="password">Password:</label>
                <input class="form-control" id="password" v-model="password" type="password"><br>
                <button class="btn btn-success" type="submit">submit</button>
            </div>
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
                let role = response.data.role
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('id', id)
                sessionStorage.setItem('role', role)
                this.$store.commit('insert_token', token)
                this.$router.push({name: "Home"})
            })
        }
    }
}
</script>

<style>

</style>