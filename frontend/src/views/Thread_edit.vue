<template>
  <div class="home">
    <OneThreadEdit></OneThreadEdit>
  </div>
</template>

<script>
// @ is an alias to /src
import OneThreadEdit from '@/components/OneThreadEdit.vue'

export default {
  name: 'Thread_edit',
  components: {
    OneThreadEdit
  }
}
</script>
