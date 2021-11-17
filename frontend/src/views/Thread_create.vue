<template>
  <div class="home">
    <OneThreadCreate></OneThreadCreate>
  </div>
</template>

<script>
// @ is an alias to /src
import OneThreadCreate from '@/components/OneThreadCreate.vue'

export default {
  name: 'Thread_create',
  components: {
    OneThreadCreate
  }
}
</script>
