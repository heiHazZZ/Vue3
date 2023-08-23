<template>
  <div>
    <h4>{{person}}</h4>
    <h4>数字：{{num.aa}}</h4>
    <button @click="num.aa++">数字++</button>
   <h4>姓名：{{person.name}}</h4>
   <button @click="person.name+='~'">名字改变</button>
   <h4>年龄：{{person.age}}</h4>
   <button @click="person.age++">年龄++</button>
   <h4>薪资：{{person.job.a.money}}K</h4>
   <button @click="person.job.a.money++">薪资++</button>
  </div>
</template>

<script>
import {reactive, shallowReactive, shallowRef} from 'vue'
export default {
  name:'Demo',
  setup() {  
    let person = shallowReactive({ // shallowReactive 声明的对象，只有第一层为响应式
      name:'张三',
      age:18,
      job:{
        a:{
          money:20
        }
      }
    })
    let num = shallowRef({ // shallowRef 声明普通数据时与ref没区别，声明复杂数据时，不是响应式
      aa:0
    })
    return {
      person,
      num
    }
  }

}
</script>

<style>

</style>