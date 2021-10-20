<template>
  <div class="registraton">
    <div style="display:flex;padding:5px;justify-content: center;">
      <div style="margin:5px;">
        <h3>Log in:</h3>
        <LogIn></LogIn>
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