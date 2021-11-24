<template>
  <div id="app">
    <router-view/>
  </div>
</template>


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
  max-width:100%;
  
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
  cursor: pointer;
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
