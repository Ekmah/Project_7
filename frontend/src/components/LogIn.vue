<template>
    <div>
        <form @submit.prevent="Submit">
            <div class="form-group">
                <label for="email_adress">Email adress:<span class="error-color" v-if="error_val=='user'"><br>Email incorrect</span></label>
                <input class="form-control" id="email_adress" v-model="email_adress" type="email" required><br>
                <label for="password">Password:<span class="error-color" v-if="error_val=='password'"><br>Password incorrect</span></label>
                <input class="form-control" id="password" v-model="password" type="password" required><br>
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
            error_val:""
        }
    },
    methods: {
        Submit(){
            const self = this;
            let payload = {
                "email_adress": this.email_adress,
                "password": this.password
            }
            http.post("auth/login", payload)
            .then(response => {
                console.log(response)
                let token = response.data.token
                let id = response.data.userId
                let role = response.data.role
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('id', id)
                sessionStorage.setItem('role', role)
                this.$store.commit('insert_token', token)
                this.$router.push({name: "Home"})
            })
            .catch(function (error) {
                if (error.response.data.error == "mdp incorrect") {
                    self.error_val = "password"
                } else if (error.response.data.error == "user not found") {
                    self.error_val = "user"
                }
            })
        }
    }
}
</script>

<style>
.error-color{
    color:red!important
}

</style>