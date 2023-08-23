<template>
  <div>
    <h4>{{person}}</h4>
   <h4>姓名：{{name}}</h4>
   <button @click="name+='~'">名字改变</button>
   <h4>年龄：{{age}}</h4>
   <button @click="age++">年龄++</button>
   <h4>薪资：{{job.a.money}}K</h4>
   <button @click="job.a.money++">薪资++</button>
  </div>
</template>

<script>
import {reactive,toRef,toRefs,watch} from 'vue'
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
    // toRef 将一个复杂响应式数据中的某个属性单独提供给外部使用
    // 它会创建一个ref对象，把.value里数据变成这个ref对象

    // toRefs 将一个复杂数据类型拆开第一层体提供给外部
    console.log(toRefs(person));
    return {
      person,
      // name:toRef(person,'name'),
      // age:toRef(person,'age'),
      // money:toRef(person.job.a,'money')

      ...toRefs(person)
    }
  }

}
</script>

<style>

</style>