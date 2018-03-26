<template>
  <hello-world :answer="name" ></hello-world>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
export default {
  components: {HelloWorld},
  name:'score',
  data () {
    return {
      name:'score',
    }
  },
}
</script>
