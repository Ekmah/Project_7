<template>
  <div class="home">
    <Nav></Nav>
    <OneThread></OneThread>
  </div>
</template>

<script>
// @ is an alias to /src
import OneThread from '@/components/OneThread.vue'
import Nav from '@/components/Nav.vue'
export default {
  name: 'Thread',
  components: {
    OneThread,
    Nav
  }
}
</script>
