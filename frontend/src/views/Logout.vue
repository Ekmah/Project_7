<template>
  <div class="home">
  </div>
</template>

<script>

export default {
  name: 'LogOut',
  methods: {
    isConnected() {
      if (!sessionStorage.getItem('token') && !sessionStorage.getItem('id')) {
        this.$router.push({name: "Login"})
      }
    },
    logout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id');
      this.isConnected()
    }
  },
  beforeMount(){
    this.isConnected()
    this.logout()
  },
}
</script>
