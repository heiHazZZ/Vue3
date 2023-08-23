<template>
  <div>
    <h2>{{person.book}}</h2>
    <h4>作者：{{person.name}}</h4>
    <h4>{{address}}</h4>
    <slot name="abc"/>
    <button @click="test">点击传递数据</button>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name:'Demo',
  props:['address'], // 接收父组件传递过来的属性
  emits:['hello'],
  // setup(props,context) 两个参数
  // props 为组件外部传递过来，且组件内部声明接收了的属性
  // context 上下文对象
  setup(props,context) {  // setup在beforeCreated之前运行
    console.log(props);
    console.log(context);
    console.log(context.attrs); // 组件外部传递过来，但没有在组件内部用peops声明的属性
    console.log(context.slots); // 组件的插槽
    console.log(context.emit); // 绑定到组件身上的自定义事件
    let person = reactive({
      book:'葵花宝典',
      name:'张三'
    })
    function test() {
      context.emit('hello',666)
    }
    return {
      person,
      test
    }
  }

}
</script>

<style>

</style>