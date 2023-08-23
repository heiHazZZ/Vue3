<template>
  <div>
    <Demo v-if="isShow" />
    <button @click="isShow = !isShow">挂卸载子组件</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import Demo from './compoents/Demo.vue'
export default {
  name: 'App',
  components:{Demo},
  setup(){
    let isShow = ref(true)
    return {
      isShow
    }
  }
    
  }
</script>


