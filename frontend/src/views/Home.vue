<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <AllThreads></AllThreads>
  </div>
</template>

<script>
// @ is an alias to /src
import AllThreads from '@/components/AllThreads.vue'

export default {
  name: 'Home',
  components: {
    AllThreads
  }
}
</script>
