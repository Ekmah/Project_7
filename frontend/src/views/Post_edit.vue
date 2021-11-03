<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <OnePostEdit></OnePostEdit>
  </div>
</template>

<script>
// @ is an alias to /src
import OnePostEdit from '@/components/OnePostEdit.vue'

export default {
  name: 'Post_edit',
  components: {
    OnePostEdit
  }
}
</script>
