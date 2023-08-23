<template>
  <div>
    <h2>名字捏</h2>
    姓：<input type="text" v-model="person.firstName">
    <br>
    名:<input type="text" v-model="person.lastName">
    <br>
    姓名：<input type="text" v-model="person.fullName">
  </div>
</template>

<script>
import { reactive,computed } from 'vue'
export default {
  name:'Demo',
  setup() {  
    let person = reactive({
      firstName:'张',
      lastName:'三'
    })
    // 添加计算属性

    // 1.计算属性简写形式，只有getter
    // person.fullName = computed(() => {
    //   return person.firstName + '-' + person.lastName
    // })

  // 2.计算属性完成写法
  person.fullName = computed({
    get() {
      return person.firstName + '-' + person.lastName
    },
    set(value) {
      let newArry = value.split('-'); // split() 将字符串以括号里的符号拆分为字符串
      person.firstName = newArry[0];
      person.lastName = newArry[1];
    }
  })
    return {
      person
    }
  }

}
</script>

<style>

</style>