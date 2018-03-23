<template>
  <div class="item">
    <name :answer="data"></name>
  </div>
</template>

<script>
import name from '../components/HelloWorld.vue'
export default {
  name: 'item',
  data () {
    return {
      data: 'item'
    }
  },
  components: {name}
}
</script>

<style lang="scss">

</style>
