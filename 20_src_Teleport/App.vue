<template>
  <div class="app">
    <h1>父组件</h1>
    <Child/>
  </div>
</template>

<script>
import Child from './compoents/Child.vue'
import { provide, reactive, ref, toRefs } from 'vue'
export default {
  name: 'App',
  components:{Child},
  setup() {
    return {
      
    }
  }
    
}
</script>
<style>
  .app {
    padding: 10px;
    background-color: gray;
  }
</style>


