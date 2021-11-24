<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login/SignUp</router-link> |
      <router-link to="/logout">Log Out</router-link>
      <a v-if="connected_user" class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        &nbsp;|&nbsp;{{user.username}}
      </a>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li><div class="dropdown-item red" @click="DeleteUser()">Delete Account</div></li>
      </ul>
      
    </div>
    <img class="logo" alt="Groupomania logo" src="../../src/assets/logo.png">
    
  </div>
</template>
<script>
import http from "../http"
export default {
    name: "Nav",
    data(){
        return {
          user: "",
          connected_user: "",
        }
    },
    methods: {
      getUser(){
        this.connected_user = sessionStorage.getItem('id')
        http.get(`/auth/user/${sessionStorage.getItem('id')}`)
        .then(response => {
          this.user = response.data[0]
        })
      },
      DeleteUser(){
        http.delete(`/auth/user/${sessionStorage.getItem('id')}/${sessionStorage.getItem('role')}`)
        .then(() => {
          this.$router.push({name: "LogOut"})
        })
      },
    },
    beforeMount(){
      this.getUser();
    }
}
</script>