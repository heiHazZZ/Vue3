<template>
  <div>
    <h1>一个人</h1>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <h2>工作：{{job.type}}</h2>
    <h2>薪资：{{job.salary}}</h2>
    <button @click="changeInfo">修改信息</button>
  </div>
</template>

<script>
import {h, ref} from 'vue'
export default {
  name: 'App',
  setup(){
    // ref()函数可以定义基本类型和对象类型的<响应式数据>，结果为一个refImpl的实例对象，称为引用对象
    let name = ref('毛豆')
    let age = ref(9)
    let job = ref({
      type:'前端工程师',
      salary:'30k'
    })

    function changeInfo(){
      // 修改数据时，必须 <数据名称.value>
      name.value = '小谭',
      age.value = 18,
      // 对象类型的数据的.value值为一个reactive函数实现的Proxy的实例对象
      job.value.type = '老师',
      job.value.salary = '10K'
      console.log(name);
      console.log(job.value);
    }
    // 返回一个对象（常用）
    return {
      name,
      age,
      job,
      changeInfo,
    }
  }
}
</script>


