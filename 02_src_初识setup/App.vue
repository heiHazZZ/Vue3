<template>
  <div>
    <h1>一个人</h1>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="sayHello">自我介绍</button><br>
    <button @click="test1">vue2读取setup中的属性方法</button>
    <button @click="test2">vue3的setup中读取vue2中的属性方法</button>
  </div>
</template>

<script>
import {h} from 'vue'
export default {
  name: 'App',
  data(){
    return {
      sex:'男'
    }
  },
  methods:{
    sayHi(){
      alert('欢迎学习')
    },
    test1(){
      console.log(this.name);
      console.log(this.age);
      console.log(this.sex);
      console.log(this.sayHello);
    }
  },
  // 此处只是测试一下setup，暂时不考虑响应式问题
  setup(){
    let name = '毛豆'
    let age = 9

    function sayHello(){
      alert(`你好啊，我叫${name},今年${age}岁了`)
    }
    function test2(){
      console.log(name);
      console.log(age);
      console.log(this.sex);
      console.log(this.sayHi);
    }
    // 返回一个对象（常用）
    return {
      name,
      age,
      sayHello,
      test2
    }
    // 返回一个函数（渲染函数）：函数里写的啥，页面就呈现啥，和模板已经没关系了
    // return () => h('h1','尚硅谷')
  }
}
</script>


