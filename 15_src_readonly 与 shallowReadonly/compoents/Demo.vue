<template>
  <div>
    <h4>{{person}}</h4>
    <!-- <h4>数字：{{num.aa}}</h4> -->
    <!-- <button @click="num.aa++">数字++</button> -->
   <h4>姓名：{{person.name}}</h4>
   <button @click="person.name+='~'">名字改变</button>
   <h4>年龄：{{person.age}}</h4>
   <button @click="person.age++">年龄++</button>
   <h4>薪资：{{person.job.a.money}}K</h4>
   <button @click="person.job.a.money++">薪资++</button>
  </div>
</template>

<script>
import {reactive, readonly, shallowReactive, shallowReadonly, shallowRef} from 'vue'
export default {
  name:'Demo',
  setup() {  
    let person = reactive({ 
      name:'张三',
      age:18,
      job:{
        a:{
          money:20
        }
      }
    })
    // person = readonly(person)        // readonly 设置响应式数据深层次只读
    person = shallowReadonly(person)   // shallowReadonly 设置响应式数据浅层次只读
    return {
      person,
      // num
    }
  }

}
</script>

<style>

</style>