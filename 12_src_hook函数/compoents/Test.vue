<template>
  <div>
    我是Test组件
    <h2>当前鼠标点击的坐标为:x:{{point.x}}y:{{point.y}}</h2>
  </div>
</template>

<script>
// 引入hooks中关于点击鼠标显示坐标的相关数据方法usePoint
import usePoint from '../hooks/usePoint'
export default {
  name:'Test',
  setup(){
    let point = usePoint()
    return {
      point
    }
  }

}
</script>

<style>

</style>