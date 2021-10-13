<template>
  <div class="about">
    <h1>This is an about page</h1>
    <LogIn></LogIn>
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from '@/components/LogIn.vue'

export default {
  name: 'Home',
  components: {
    LogIn
  }
}
</script>