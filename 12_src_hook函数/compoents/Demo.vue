<template>
  <div>
   <h2>数字：{{num}}</h2>
   <button @click="num++">增加</button>
   <h2>当前鼠标点击的坐标为:x:{{point.x}}y:{{point.y}}</h2>
  </div>
</template>

<script>
import {onMounted, onUnmounted, reactive, ref} from 'vue'
// 引入hooks中关于点击鼠标显示坐标的相关数据方法usePoint
import usePoint from '../hooks/usePoint.js'
export default {
  name:'Demo',
  setup() {  
    let num = ref(0)
    let point = usePoint()
    return {
      num,
      point
    }
  },
}
</script>

<style>

</style>