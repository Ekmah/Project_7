<template>
  <div class="home">
    <Nav></Nav>
    <OneThreadEdit></OneThreadEdit>
  </div>
</template>

<script>
// @ is an alias to /src
import OneThreadEdit from '@/components/OneThreadEdit.vue'
import Nav from '@/components/Nav.vue'
export default {
  name: 'Thread_edit',
  components: {
    OneThreadEdit,
    Nav
  }
}
</script>
