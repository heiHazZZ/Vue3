import {reactive,onMounted,onUnmounted} from 'vue'
export default function() {
  // 鼠标坐标相关数据
  let point = reactive({
    x:0,
    y:0
  })
  // 鼠标坐标相关方法
  function getPoint(event) {
   point.x = event.pageX
   point.y = event.pageY
   console.log(event.pageX,event.pageY);
  }
  // 鼠标坐标相关生命周期钩子
  onMounted(() =>{
    window.addEventListener('click',getPoint)
  })
  onUnmounted(() => {
    window.removeEventListener('click',getPoint)
  })

  return point
}
