<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login/SignUp</router-link> |
      <router-link to="/logout">Log Out</router-link> | 
      <div class="dropdown">
        <a class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          {{}}
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item red" href="#">Delete your account</a></li>
        </ul>
      </div>
    </div>
    <img class="logo" alt="Vue logo" src="../src/assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: rgb(255, 255, 255) !important;
}
img {
  object-fit: cover;
  
}
.logo{
  width: 80%;
  max-width: 400px;
}
.butn-group {
  display:flex;
  flex-wrap: wrap;
}
.red{
  color:red !important;
}
.dropdown {
  width:10px;
}
.btn {
  margin:5px;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
@import'~bootstrap/dist/css/bootstrap.css'
</style>
