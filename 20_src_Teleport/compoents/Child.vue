<template>
  <div class="child">
    <h1>子组件</h1>
    <Son/>
  </div>
</template>

<script>
import Son from '../compoents/Son.vue'
export default {
  name:'Child',
  components:{Son}

}
</script>

<style>
  .child {
    background-color: yellow;
    padding: 10px;
  }
</style>