<template>
  <div class="home">
    <Nav></Nav>
    <OnePostEdit></OnePostEdit>
  </div>
</template>

<script>
// @ is an alias to /src
import OnePostEdit from '@/components/OnePostEdit.vue'
import Nav from '@/components/Nav.vue'
export default {
  name: 'Post_edit',
  components: {
    OnePostEdit,
    Nav
  }
}
</script>
