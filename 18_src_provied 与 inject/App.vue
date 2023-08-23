<template>
  <div class="app">
    <h1>父组件</h1>
    <h2>{{name}}---{{price}}</h2>
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
    let car = reactive({
      name:'奔驰',
      price:'40w'
    })
    provide('car',car) // parvied 实现父孙组件间数据传递。父子也可以传递，但没必要。孙组件利用inject接收数据
    return {
      ...toRefs(car)
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


