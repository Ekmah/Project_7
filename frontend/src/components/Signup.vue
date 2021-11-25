<template>
    <div>
        <form @submit.prevent="Submit">
            <div class="form-group">
                <label for="username_signup">Username:</label>
                <input class="form-control" id="username_signup" v-model="username" type="text" required><br>
                <label for="email_adress_signup">Email adress:<span class="error-color" v-if="error_val=='email'"><br>Email adress already used.</span></label>
                <input class="form-control" id="email_adress_signup" v-model="email_adress" type="email" required><br>
                <label for="password_signup">Password:<span class="error-color" v-if="error_val=='password'"><br>Password incorrect:<br>is at least 8 character<br>has at least 1 digit<br>has no spaces</span></label>
                <input class="form-control" id="password_signup" v-model="password" type="password" required><br>
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
            error_val:"",
        }
    },
    methods: {
        Submit(){
            const self = this;
            let payload = {
                "username": this.username,
                "email_adress": this.email_adress,
                "password": this.password
            }
            http.post("auth/signup", payload)
            .then(response => {
                console.log(response)
                let token = response.data.token
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('id', response.data.userId)
                sessionStorage.setItem('role', response.data.role)
                this.$store.commit('insert_token', token)
                this.$router.push({name: "Home"})
            })
            .catch(function (error_resp) {
                console.log(error_resp.response.data.error)
                if (error_resp.response.data.error == 'email used') {
                    console.log(self)
                    self.error_val = 'email'
                } else if (error_resp.response.data.error == 'erronous password') {
                    self.error_val = 'password'
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