<template>
  <div class="son">
    <h1>孙组件</h1>
    <Dialog/>
  </div>
</template>

<script>
import Dialog from './Dialog.vue'
export default {
  name:'Son',
  components:{Dialog},
  setup() {
    return {
      
    }
  }
}
</script>

<style>
  .son {
    background-color: aqua;
    padding: 10px;
  }
</style>