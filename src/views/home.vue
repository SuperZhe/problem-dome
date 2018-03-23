<template>
  <div class="home">
    <name :answer="data"></name>
  </div>
</template>

<script>
import name from '../components/HelloWorld.vue'
export default {
  name: 'home',
  data () {
    return {
      data: 'home'
    }
  },
  components: {name}
}
</script>

<style lang="scss">

</style>
