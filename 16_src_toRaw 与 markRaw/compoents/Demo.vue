<template>
  <div>
    <h4>{{person}}</h4>
    <h4>数字：{{num}}</h4>
    <button @click="num++">数字++</button>
   <h4>姓名：{{name}}</h4>
   <button @click="name+='~'">名字改变</button>
   <h4>年龄：{{age}}</h4>
   <button @click="age++">年龄++</button>
   <h4>薪资：{{job.a.money}}K</h4>
   <button @click="job.a.money++">薪资++</button>
   <h4 v-show="car">车辆信息：{{car}}</h4>
   <button @click="addCart">添加车辆信息</button>
   <button @click="car.name+= '!'">车名改</button>
   <button @click="car.money++">车价改</button>
  </div>
</template>

<script>
import {ref,reactive, toRaw, toRefs,markRaw} from 'vue'
export default {
  name:'Demo',
  setup() {  
    let num = ref(0)
    let person = reactive({ 
      name:'张三',
      age:18,
      job:{
        a:{
          money:20
        }
      },
      car:{}
    })
    // console.log(toRaw(person)); // toRow 将reactive响应式数据转为普通类型

    function addCart() {
      let car = {name:'奔驰',money:40}
      person.car = markRaw(car)  // markRaw 标记一个对象，让他不能成为响应式
    }
    return {
      person,
      ...toRefs(person),  // 后添加的car数据如果采用toRefs页面不会更新该数据
      num,
      addCart
    }
  }

}
</script>

<style>

</style>