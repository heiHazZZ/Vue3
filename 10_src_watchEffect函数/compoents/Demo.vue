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
import {reactive, ref, watch, watchEffect} from 'vue'
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
    // watchEffect函数
    // 作用：监视属性   不指明监视哪个属性，监视的回调中用到哪个属性，就监视哪个属性
    // 注：watchEffect 会一上来就执行一次
    watchEffect(() => {
      const x1 = num.value;
      const x2 = person.job.a.money; // 使用了num 和 person.jon.a.money 就会监视这两个属性
      console.log('watchEffect配置的回调执行了');
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