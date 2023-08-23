<template>
  <div class="son">
    <h1>孙组件</h1>
    <h2>{{car.name}}---{{car.price}}</h2>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name:'Son',
  setup() {
    let car = inject('car')  // 接收父组件传递过来的数据
    return {
      car
    }
  }
}
</script>

<style>
  .son {
    background-color: aqua;
    padding: 10px;
  }
</style>