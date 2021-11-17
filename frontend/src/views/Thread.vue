<template>
  <div class="home">
    <OneThread></OneThread>
  </div>
</template>

<script>
// @ is an alias to /src
import OneThread from '@/components/OneThread.vue'

export default {
  name: 'Thread',
  components: {
    OneThread
  }
}
</script>
