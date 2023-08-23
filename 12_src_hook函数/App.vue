<template>
  <div>
    <Demo v-if="isShow" />
    <button @click="isShow = !isShow">挂卸载子组件</button>
    <br>
    <Test/>
  </div>
</template>

<script>
import { ref } from 'vue'
import Demo from './compoents/Demo.vue'
import Test from './compoents/Test.vue'
export default {
  name: 'App',
  components:{Demo,Test},
  setup(){
    let isShow = ref(true)
    return {
      isShow
    }
  }
    
  }
</script>


