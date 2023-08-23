<template>
  <div>
   数字：{{num}}
   <br>
   <button @click="num++">增加</button>
   <br>
   文字:{{str}}
   <br>
   <button @click="str+='!'">修改</button>
   <h4>姓名：{{person.name}}</h4>
   <button @click="person.name+='~'">名字改变</button>
   <h4>年龄：{{person.age}}</h4>
   <button @click="person.age++">年龄++</button>
   <h4>薪资：{{person.job.a.money}}K</h4>
   <button @click="person.job.a.money++">薪资++</button>
  </div>
</template>

<script>
import {reactive, ref, watch} from 'vue'
export default {
  name:'Demo',
  setup() {  
    let num = ref(0)
    let str = ref('你好')
    let person = ref({
      name:'张三',
      age:18,
      job:{
        a:{
          money:20
        }
      }
    })
    // 监视属性的 ref说明

    // 1.监视不同ref声明的普通数据（num）不能加.value，
    // 加了.value相当于直接监视一个数字或字符串，监视的应该是数据被ref加工后的响应式对象（ref对象）

    // watch(num.value,(newValue,oldValue) => {
    //   console.log(newValue,oldValue);
    // })

    // 上述代码相当于下面
    // watch(0,(newValue,oldValue) => {
    //   console.log(newValue,oldValue);
    // })

  // 2.用ref声明的复杂数据类型,声明时要加.value
  // .value的值proxy声明的复杂响应式数据,是要被监视的.不加.value不能实现监测
  watch(person.value,(newValue,oldValue) => {
    console.log(newValue,oldValue);
  })
    return {
      num,
      str,
      person
    }
  }

}
</script>

<style>

</style>