<template>
  <div class="app">
    <h1>父组件</h1>
    <!-- Suspense 等异步组件渲染时渲染一些额外内容 -->
    <Suspense>
      <!-- v-slot:defaut   存放要渲染的异步组件 -->
      <template v-slot:default>
        <Child/>
      </template>
      <!-- v-slot:fallback  存放异步组件没加载出来时的额外内容 -->
      <template v-slot:fallback>
        <h1>加载中。。。</h1>
      </template>
    </Suspense>
  </div>
</template>

<script>
// import Child from './compoents/Child.vue'  // 正常引入
import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(() =>import('./compoents/Child.vue'))  // 异步引入
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


