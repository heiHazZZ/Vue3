<template>
  <div>
   <h2>数字：{{num}}</h2>
   <button @click="num++">增加</button>
  </div>
</template>

<script>
import {onMounted,onBeforeMount, reactive, ref, watch, watchEffect, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue'
export default {
  name:'Demo',
  setup() {  
    let num = ref(0)
    // 通过组合式API的形式去使用声明周期钩子
    console.log('---setup---');
    onBeforeMount(() => {
      console.log('---onBeforeMount---');
    })
    onMounted(() => {
      console.log('---onMounted---');
    })
    onBeforeUpdate(() => {
      console.log('---onBeforeUpdate---');
    })
    onUpdated(() => {
      console.log('---onUpdated---');
    })
    onBeforeUnmount(() => {
      console.log('---onBeforeUnmount---');
    })
    onUnmounted(() => {
      console.log('---onUnmounted---');
    })
    return {
      num,
    }
  },
  // 通过配置项形式使用生命周期钩子
  // #region
  beforeCreate() {
    console.log('---beforeCreate---');
  },
  created() {
    console.log('---created---');
  },
  beforeMount() {
    console.log('---beforeMount---');
  },
  mounted() {
    console.log('---mounted---');
  },
  beforeUpdate() {
    console.log('---beforeUpdate---');
  },
  updated() {
    console.log('---updated---');
  },
  // 卸载
  beforeUnmount() {
    console.log('---beforeUnmount---');
  },
  unmounted() {
    console.log('---unmounted---');
  },
  // #endregion
}
</script>

<style>

</style>