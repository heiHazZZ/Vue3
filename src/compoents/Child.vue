<template>
  <div class="child">
    <h1>子组件</h1>
    <h4>{{num}}</h4>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name:'Child',
  components:{},
  // 使用异步组件和Susponse 后setup可以是async函数
  async setup() {
    let num = ref(0)
    let p = new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve(num)
      }, 3000);
    })
    return await p
  }
  

}
</script>

<style>
  .child {
    background-color: yellow;
    padding: 10px;
  }
</style>