<template>
  <Demo address="清华大学出版社" @hello="sayHelloMsg">
    <template v-slot:abc>
      <h4>西安市灞桥区</h4>
    </template>
  </Demo>
</template>

<script>
import Demo from './compoents/Demo.vue'
export default {
  name: 'App',
  components:{Demo},
  setup(){
    function sayHelloMsg(value) {
      alert('收到了子组件传递过来的内容:' + value);
    }
    return {
      sayHelloMsg
    }
  }
    
  }
</script>


