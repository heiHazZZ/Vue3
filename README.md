### 一、Vue3带来了什么

#### 1.性能的提升

- 打包大小减少41%	

- 初次渲染快55%，更新渲染快133%

- 内存减少54%

  ......

#### 2.源码的升级

- 使用Proxy代替defineproperty实现响应式

- 重写虚拟DOM的实现和Tree-Shaking

  ......

#### 3.拥抱TypeScript

- Vue3可以更好的支持TypeScript

#### 4.新的特性

1.composition API（组合API）

- setup配置

- ref与reactive

- watch与watchEffect

- provide与inject

  ......

2.新的内置组件

- fragment
- Teleport
- Suspense

3.其他改变

- 新的生命周期钩子

- data选项应始终被声明为一个函数

- 移除keyCode支持作为v-on的修饰符

  ......

### 二、创建Vue3.0工程

#### 1.使用vue-cli创建

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue -V
vue --version
## 安装或升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

#### 2.使用vite创建

官方文档：https://cn.vitejs.dev/

vite官网：https://vitejs.cn/

- 什么是vite？——新一代前端构架工具
- 优势如下：

  - 开发环境中，无需打包操作，可快速的冷启动
  - 轻量快捷的热重载（HMP）
  - 真正的按需编译，不在等待整个应用编译完成

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

### 三、常用 Composlition API

#### 1.拉开序幕的setup

- 理解：Vue3.0中一个新的配置项，值为一个函数
- setup是所有Composlition API（组合API）“表演的舞台”
- 组件中所有用到的：数据、方法等等，均要配置在setup中
- setup函数的两种返回值：
  - 返回一个对象，则对象中的属性、方法，在模板中均可直接使用。（重点关注！）
  - 若返回一个渲染函数，则可以自定义函数内容
- 注意点：
  - 尽量不要与Vue2.x配置混用
    - vue2.x配置（data、methos、computed...）中可以访问到setup中的属性、方法
    - 但在setup中不能访问到Vue2.x配置（data、methods、computed...）
    - 如果有重名，setup优先
  - setup不能是一个async函数，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性（后期也可以返回一个Promise实例，但需要Suspense和异步组件配合）

#### 2.ref函数

- 作用：定义一个响应式数据
- 语法：`const xxx = ref(initValue)`
  - 创建一个包含响应式数据的引用对象（reference对象，简称ref对象）
  - JS中操作数据：`xxx.value`
  - 模板中读取数据：不需要.value，直接`<div>{{xxx}}</div>`
- 备注：
  - 接受的数据可以是：基本类型，也可以是对象类型
  - 基本类型的数据：响应式依然是靠`object.defineProperty()`的`get`与`set`完成的
  - 对象类型的数据：内部“求助”了Vue3.0中的一个新函数——`reactive`函数（reactive函数实现了Proxy函数）

#### 3.reactive函数

- 作用：定义一个对象类型的响应式数据（基本类型不要用它，要用ref函数）
- 语法：`const 代理对象 = reactive(源对象)`接收一个对象（或数组），返回一个代理对象（Proxy的实例对象，简称proxy对象）
- reactive定义的响应式数据是“深层次的”
- 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据进行操作

#### 4.Vue3.0中的响应式原理

##### Vue2.x 的响应式

- 实现原理：

  - 对象类型：通过`object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）

  - 数组类型：通过重写更新数据的一系列方法来实现拦截（对数组的变更方法进行了包裹）

    ```javascript
    Object.defineProperty(data,'count',{
    	get(){},
    	set(){}
    })
    ```

- 存在问题：

  - 新增属性、删除属性，界面不会更新
  - 直接通过下标修改数组，界面不会自动更新

##### vue3.0的响应式

- 实现原理：

  - 通过Proxy（代理）：拦截对象中任意属性的变化，包括：属性的读写、属性的添加、属性的删除等

  - 通过Reflect（反射）：对被代理对象的属性进行操作

    ```js
    new Proxy(data,{
    	// 拦截读取属性
    	get (target,propName){
    		return Reflect.get(target,propName)
    	},
        // 拦截设置属性值或添加新属性
        set(target,propName,value){
            return Reflct.set(target,propName,value)
    	},
        // 拦截删除属性
        deleteProperty(target,propName){
            return Reflect.defineProperty(target,propName)
        }
    })
    ```
    

#### 5.reactive对比ref

- 从定义数据角度对比：
  - ref用来定义：基本类型数据
  - reactive用来定义：对象（或数组）类型数据
  - 备注：ref也可以用来定义对象（或数组）类型数据，它内部会自动通过reactive转为代理对象
- 从原理角度对比：
  - ref通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）
  - reactive通过Proxy来实现响应式（数据劫持），并通过Reflect操作源对象内部的数据
- 从使用角度对比：
  - ref定义的数据：操作数据需要`.value`，读取数据时模板中直接读取不需要.value
  - reactive定义的数据：操作数据与读取数据：均不需要`.value`

#### 6.setup的两个注意点

- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefine
- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性
  - context：上下对象
    - attrs：值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性，相当于`this.$attrs`
    - slots：收到的插槽内容，相当于`this.$sloat`
    -  emit：分发自定义事件的函数，相当于`this.$emit`

#### 7.计算属性与监视属性

- computed函数

  - 与vue2中computed配置功能一致

  - 写法

    ```js
    // 1.引入 computed函数
    import {computed} from 'vue'
    
    setup() {
        ...
        //2.添加计算属性
        
        // 2.1 计算属性简写
        let fullName = computed(() => {
            return person.firstName + '-' + person.lastName
        })
        
        // 2.2计算属性完整写法
        let fullName = computed({
            get() {
              return person.firstName + '-' + person.lastName
            },
            set(value) {
              let newArry = value.split('-');
              person.firstName = newArry[0];
              person.lastName = newArry[1];
            }
            })
    }
    ```

- watch监视属性

  - 与Vue2中watch配置功能一致

  - 两个注意点

    - 监视reactive定义的响应式数据时：oldValue无法正常获取、强制开了深度监视（deep配置失效）

    - 监视reactive定义的响应式数据中的某个普通属性时：deep配置有效，oldValue可以获取；某个复杂属性：deep配置有效，oldValue无法获取

      ```js
      // 引入 watch 函数
      import {watch} from 'vue' 
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
          watch(num,(newValue,oldValue) => {
            console.log(newValue,oldValue);
          },{immediate:true})
      
          // 2.监视多个ref定义的响应式数据
          // 数据放在数组里，newValue 和 oldValue 变成了数组形式存放数据
          watch([num,str],(newValue,oldValue) => {
            console.log(newValue,oldValue);
          },{immediate:true})
      
          // 3.监视reactive定义的一个响应式数据里的全部属性
          // 注意：此处无法正常获取oldValue，获取到的还是newValue
          // 注意：强制开启了深度监视（deep配置无效）
          watch(person,(newValue,oldValue) => {
            console.log(newValue,oldValue);
          },{deep:false}) // 此处depp配置无效
      
          // 4.监视reactive定义的一个响应式数据里的一个属性
          // 监视里面的一个属性,必须写成 ()=> 形式 ，否则无法监视 
          // 可以正常获取newValue 和 oldValue
          watch(() => person.age,(newValue,oldValue) => {
            console.log(newValue,oldValue);
          })
      
          // 5.监视reactive定义的一个响应式数据里的多个属性
          // 将多个属性写在数组里
          watch([() => person.name,() => person.age],(newValue,oldValue) => {
            console.log(newValue,oldValue);
          })
      
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
      ```


- watchEffect函数

  - watch的套路是：既要指明监视的属性，也要指明监视的回调

  - watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性

  - watchEffect有点像computed：

    - 但computed注重计算出来的值（回调函数的返回值），所以必须要写返回值

    - 而watchEffect注重的是过程（回调函数的函数体），所以不用写返回值

      ```js
        watchEffect(() => {
            const x1 = num.value;
            const x2 = person.job.a.money; // 使用了num 和 person.jon.a.money 就会监视这两个属性
            console.log('watchEffect配置的回调执行了');
          })
      ```

#### 8.生命周期

<img src="https://cn.vuejs.org/assets/lifecycle.16e4c08e.png" style="zoom:40%;" />

- Vue3与Vue2生命周期钩子改变
  - `beforeDestory`改名为`beforeUmounted`
  - `destroyed`改名为`unmounted`
- Vue3.0提供了Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下
  - `beforeCreated` ===> `setup`
  - `created` =========> `setup`
  - `beforeMount` =====> `onBeforeMount`
  - `mounted` =========> `onMoounted`
  - `beforeUpdate` =====> `onBeforeUpdate`
  - `updated` ==========> `onUpdated`
  - `beforeUnmount` ====> `onBeforeUnmount`
  - `unmounted` ========> `onUnmounted`

#### 9.自定义hook函数

- 什么是hook？——本质时一个函数，把setup函数中使用的Composition API进行了封装
- 类似于Vue2.x中的mixin
- 自定义hook的优势：复用代码，让setup中的逻辑更清除易懂

#### 10.toRef

- 作用：创建一个ref对象，其value值指向另一个对象中的某个属性
- 语法：`const name = toref(person,'name')`
- 应用：要将响应式对象中的某个属性单独提供给外部使用
- 扩展：toRefs 与 toRefs 功能一致，但可以批量创建多个ref对象，语法：`torefs(person)`



### 四、其他 Composition API

#### 1.shallowReactive 与 shallowRef

- shallowReactive：只处理对象外层属性的响应式（浅响应式）
- shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理
- 使用场景
  - 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ===> shallowReactive
  - 如果有一个对象数据，后续功能不会修改对象中的属性，而是生成新的对象来替换 ===> shallowRef

#### 2.readonly 与 shallowReadonly

- readonly:让一个响应式数据变为只读的（深层次只读）
- shallowReadonly：让一个响应式数据变为只读的（浅层次只读）
- 使用场景：不希望数据被修改时

#### 3.toRaw 与 markRaw

- toRow：
  - 作用：将一个由`reactive`生成的响应式数据转为普通对象
  - 使用场景：用于读取响应式对象对应的普通对象，对普通对象的所有操作，不会引起页面更新
- markRaw
  - 作用：标记一个对象，使其永远不会成为响应式对象
  - 使用场景：
    - 有些值不应该被设置为响应式的，例如复杂的第三方类库等
    - 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能

#### 4.customRef

- 作用：创建一个自定义的ref，并对其依赖项和更新触发进行显示控制

- 实现一个自定义ref并添加防抖

  ```js
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
  ```

#### 5.provied 与 inject

- 作用：实现祖与后代组件间通信

- 套路：父组件有一个provied选项来提供数据，后代组件有一个inject选项来开始使用这些数据

- 具体写法

  - 父组件中：

    ```js
    set() {
    	...
    	let car = reactive({name:'奔驰',price:'40w'})
    	provied('car',car)
    	...
    }
    ```

  - 后代组件中：

    ```js
    setup() {
    	...
    	const car = inject('car')
    	return{
    		car
    	}
    	...
    }
    ```

#### 6.响应式数据判断

- isRef：检查一个值是否为一个ref对象
- isReactive：检查一个对象是否由reacrive创建的响应式代理
- isReadonly：检查一个对象是否由readonly创建只读代理
- isProxy：检查一个对象是否由reactive或者readonly方法创建的代理

### 五、Composition API 的优势

- options API 存在的问题：使用传统OptionsAPI中，新僧或者修改一个需求，就需要分别在data，methods，computed里修改
- Composition API 的优势：可以更加优雅的组织代码，函数。让相关功能的代码更加有序的组织在一起
- 注：组合式API的实现依靠hook函数

### 六、新的组件

#### 1.Fragment

- 在Vue2中：组件必须有一个根标签
- 在Vue3中：组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素中
- 好处：减少标签层级，减小内存占用

#### 2.Teleport

- 定义：Teleport是一种能够将我们的组件html结构移动到指定位置的技术

  ```js
  <teleport to="移动位置">
      <div v-if="isShow" class="mask">
          <div class="dialog">
              <h1>弹窗</h1>
          </div>
      </div>
  </teleport>
  ```


#### 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'
    const Child = defineAsyncComponent(() =>import('./compoents/Child.vue'))  // 异步引入
    ```

  - ​	使用`Suspense`包裹组件，并配置好 `default` 与 `fallback`

    ```js
    <template>
      <div class="app">
        <h1>父组件</h1>
        <!-- Suspense 等异步组件渲染时渲染一些额外内容 -->
        <Suspense>
          <!-- v-slot:defaut   存放要渲染的异步组件 -->
          <template v-slot:default>
            <Child/>
          </template>
          <!-- v-slot:fallback  存放异步组件没加载出来时的额外内容 -->
          <template v-slot:fallback>
            <h1>加载中。。。</h1>
          </template>
        </Suspense>
      </div>
    </template>
    ```


### 七、其他

#### 1.全局API的转移

- Vue2.x 有许多全局API和配置

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton',{
        data() => ({
        	count:0
    	}),
        template:'<button @click="count++">Clicked {{count}} times</button>'
    })
    // 注册全局指令
    Vue.directive('focus',{
        inserted:el => el.focus()
    })
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局API，即：`Vue.xxx`调整到应用实例 `app` 上

    | 2.x 全局API (Vue)        | 3.x  实例API (app)          |
    | ------------------------ | --------------------------- |
    | Vue.config.xxx           | app.config.xxx              |
    | Vue.config.productionTip | 移除                        |
    | Vue.component            | app.component               |
    | Vue.directive            | app.directive               |
    | Vue.mixin                | app.mixin                   |
    | Vue.use                  | app.use                     |
    | Vue.prototype            | app.config.globalProperties |

#### 2.其他改变

- data选项应始终被声明为一个函数

- 过度类名的改变：

  - Vue2.x写法

    ```
    .v-enter,
    .v-leave-to {
    	opacity:0;
    }
    .v-leave,
    .v-enter-to {
    	opcaity:1;
    }
    ```

  - Vue3.x 写法

    ```
    .v-enter-from,
    .v-leave-to {
    	opacity:0;
    }
    
    .v-leave-from,
    .v-enter-to {
    	opacity:1;
    }
    ```

- 移除KeyCode作为v-on的修饰符，同时也不再支持`config.keyCodes`

- 移除`v-on.native`修饰符

  - 父组件中绑定事件

    ```js
    <my-component 
    	v-on:close="handleComponentEvent"
        v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```
    <script>
    	export default {
    		emits:['close']
    	}
    </script>
    ```

- 移除过滤器（fliter）

  - 过滤器虽然看起来很方便，但他需要一个自定义语法，打破大括号内表达式是“只是JavaScript”的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替代过滤器