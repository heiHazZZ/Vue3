<template>
  <div>
    <h1>一个人</h1>
    <h2>姓名：{{person.name}}</h2>
    <h2>年龄：{{person.age}}</h2>
    <h2>工作：{{person.job.type}}</h2>
    <h2>薪资：{{person.job.salary}}</h2>
    <h2>爱好：{{person.hobby}}</h2>
    <h2>{{person.a.b.c}}</h2>
    <button @click="changeInfo">修改信息</button>
  </div>
</template>

<script>
import {h, reactive, ref} from 'vue'
export default {
  name: 'App',
  setup(){
    // reactive函数用于声明<对象类型>的响应式数据,结果为一个Proxy的实例对象
    let person = reactive({
      name:'张三',
      age:18,
      job:{
        type:'前端工程师',
        salary:'30k',
      },
      // reactive定义的为深层次的响应式数据
      a:{
        b:{
            c:666
        }
      },
      hobby:['抽烟','喝酒','烫头'],
    })
    function changeInfo(){
      person.name = '李四',
      person.age = 30,
      person.job.type = '后端工程师',
      person.job.salary = '40K',
      person.hobby = ['学习']
      person.a.b.c = 777
    }
    // 返回一个对象（常用）
    return {
      person,
      changeInfo
    }
  }
    
  }
</script>


