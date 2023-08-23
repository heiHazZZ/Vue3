<template>
<div>
  <button @click="isShow = true">点击弹窗</button>
  <!-- teleport 设置组件html结构移动到指定位置 -->
  <!-- 此处将结构移动到body上，保证不会撑开其他组件 -->
  <teleport to='body'>
    <div class="mask" v-if="isShow">
      <div class="dialog">
        <h3>我是一个弹窗</h3>
        <h4>内容1</h4>
        <h4>内容2</h4>
        <h4>内容3</h4>
        <h4>内容4</h4>
        <button @click="isShow = false">关闭弹窗</button>
      </div>
    </div>
  </teleport>
</div>
</template>

<script>
import { ref } from 'vue'
export default {
  name:'dialogg',
  setup() {
    let isShow = ref(false)
    return {
      isShow
    }
  }

}
</script>

<style scoped>
  .mask {
    position: absolute;
    top: 0;left: 0;bottom: 0;right: 0;
    background-color: rgba(0,0,0,.5);
  }
  .dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    width: 300px;
    height: 300px;
    background-color: green;
  }
</style>