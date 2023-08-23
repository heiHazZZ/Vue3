<template>
  <div class="app">
    <h1>父组件</h1>
    <h2>{{name}}---{{price}}</h2>
 
  </div>
</template>

<script>
import { readonly,isReactive, isReadonly, isRef,provide, reactive, ref, toRefs, isProxy } from 'vue'
export default {
  name: 'App',
  components:{},
  setup() {
    let num = ref(0)
    let car = reactive({
      name:'奔驰',
      price:'40w'
    })
    let car1 = readonly(car)
    console.log(isRef(num));
    console.log(isReactive(car));
    console.log(isReadonly(car1));
    console.log(isProxy(car));
    console.log(isProxy(num));
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


