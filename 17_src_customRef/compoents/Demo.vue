<template>
  <div>
    <h4>数字：{{num}}</h4>
    <button @click="num++">数字++</button>
  </div>
</template>

<script>
import {ref,reactive, toRaw, toRefs,markRaw, customRef} from 'vue'
export default {
  name:'Demo',
  setup() {  
    // 自定义一个ref——名为：myRef
    function myRef(value,dealy) {
      let timer
      return customRef((track,trigger)=> {
        return {
          get(){
            track() // 让get除初次渲染页面外也能调用，不加track()修改数据页面不更新
            return value
          },
          set(newValue) {
            clearTimeout(timer)   // 给set添加防抖功能
            timer = setTimeout(()=>{
              value = newValue
              trigger()  // 让Vue重新解析模板
            },dealy)
          }
        }
      })
    }
    let num = myRef(0,1000)
    return {
      num,
    }
  }

}
</script>

<style>

</style>