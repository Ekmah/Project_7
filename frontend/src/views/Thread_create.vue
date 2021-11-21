<template>
  <div class="home">
    <Nav></Nav>
    <OneThreadCreate></OneThreadCreate>
  </div>
</template>

<script>
// @ is an alias to /src
import OneThreadCreate from '@/components/OneThreadCreate.vue'
import Nav from '@/components/Nav.vue'
export default {
  name: 'Thread_create',
  components: {
    OneThreadCreate,
    Nav
  }
}
</script>
