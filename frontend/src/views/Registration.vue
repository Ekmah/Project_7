<template>
  <div class="registraton">
    <div style="display:flex;padding:5px;justify-content: center;max-height:340px">
      <div style="margin:5px;">
        <h3>Log in:</h3>
        <LogIn></LogIn>
      </div>
      <div style="align-items:center;justify-content:center; width:50px;display:flex;flex-direction: column;">
        <span style="width:1px; height:45%; background-color: black"></span>
        <span>or</span>
        <span style="width:1px; height:45%; background-color: black"></span>
      </div>
      <div style="margin:5px;">
        <h3>Sign up:</h3>
        <SignUp></SignUp>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SignUp from '@/components/Signup.vue'
import LogIn from '@/components/LogIn.vue'

export default {
  name: 'Home',
  components: {
    LogIn,
    SignUp
  }
}
</script>