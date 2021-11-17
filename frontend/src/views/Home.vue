<template>
  <div class="home">
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
