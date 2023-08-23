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
    let person = reactive({
      name:'张三',
      age:18,
      job:{
        a:{
          money:20
        }
      }
    })
    // 监视属性

    // 1.监视单个ref定义的响应式数据
    // watch(num,(newValue,oldValue) => {
    //   console.log(newValue,oldValue);
    // },{immediate:true})

    // 2.监视多个ref定义的响应式数据
    // 数据放在数组里，newValue 和 oldValue 变成了数组形式存放数据
    // watch([num,str],(newValue,oldValue) => {
    //   console.log(newValue,oldValue);
    // },{immediate:true})

    // 3.监视reactive定义的一个响应式数据里的全部属性
    // 注意：此处无法正常获取oldValue，获取到的还是newValue
    // 注意：强制开启了深度监视（deep配置无效）
    // watch(person,(newValue,oldValue) => {
    //   console.log(newValue,oldValue);
    // },{deep:false}) // 此处depp配置无效

    // 4.监视reactive定义的一个响应式数据里的一个属性
    // 监视里面的一个属性,必须写成 ()=> 形式 ，否则无法监视 
    // 可以正常获取newValue 和 oldValue
    // watch(() => person.age,(newValue,oldValue) => {
    //   console.log(newValue,oldValue);
    // })

    // 5.监视reactive定义的一个响应式数据里的多个属性
    // 将多个属性写在数组里
    // watch([() => person.name,() => person.age],(newValue,oldValue) => {
    //   console.log(newValue,oldValue);
    // })

    // 6.监视reactive定义的一个响应式数据里的复杂属性
    // 监视里面的复杂数据，要开启depp深层监视，否则无法监视到
    // 此处的oldValue也无法获取到
    watch(() =>person.job,(newValue,oldValue) => {
      console.log(newValue,oldValue);
    },{deep:true}) 
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