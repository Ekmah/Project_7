<template>
  <div class="home">
    <Nav></Nav>
    <AllThreads></AllThreads>
  </div>
</template>

<script>
// @ is an alias to /src
import AllThreads from '@/components/AllThreads.vue'
import Nav from '@/components/Nav.vue'
export default {
  name: 'Home',
  components: {
    AllThreads,
    Nav
  }
}
</script>
