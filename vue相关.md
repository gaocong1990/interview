## 说说你对vue的理解
Vue.是一个用于创建用户界面的开源JavaScript框架，也是一个创建单页应用的Web应用框架。Vue核心特性：`MVVM`（Model-View-ViewModel)、双向绑定
- Model：模型层，负责处理业务逻辑以及和服务器端进行交互
- View：视图层：负责将数据模型转化为UI展示出来，可以简单的理解为HTML页面
- ViewModel：视图模型层，用来连接Model和View，是Model和View之间的通信桥梁

## Vue和React对比
1. 核心思想不同：
  - Vue的核心思想是尽可能的降低前端开发的门槛，是一个灵活易用的渐进式双向绑定的MVVM框架。
  - React的核心思想是声明式渲染和组件化、单向数据流，React既不属于MVC也不属于MVVM架构。
2. 组件写法上不同
  - Vue的组件写法是通过template的方式
  - React使用jsx的方式
3. Diff算法不同
  - React主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。Vue 使用双向指针，边对比，边更新DOM
  - Vue的Diff算法采用边对比边更新DOM的策略，可以减少内存开销、降低性能损耗，并提供更快的用户体验。这种策略与Vue的响应式系统相结合，可以让Vue在数据变化时更加高效地更新视图。
  - React选择将Diff结果放到patch中，再一次性更新到DOM上，主要是为了实现批量更新、跨平台兼容性、可预测性以及与Fiber架构的兼容性。这种策略与React的设计原则和目标相一致，可以提高React应用的性能和可维护性。
4. 响应式原理不同
  - React主要是通过setState()方法来更新状态，状态更新之后，组件也会重新渲染。
  - vue会遍历data数据对象，使用Object.definedProperty()将每个属性都转换为getter和setter，每个Vue组件实例都有一个对应的watcher实例，在组件初次渲染的时候会记录组件用到了那些数据，当数据发生改变的时候，会触发setter方法，并通知所有依赖这个数据的watcher实例调用update方法去触发组件的compile渲染方法，进行渲染数据。


## 为什么不建议使用index作为节点的key？
假如我们在一组节点的首部添加了一个新节点，使用index作为key，diff算法通过key判断是相同类型的节点之后，会进行进一步的比较，把其内容进行更改，这样就会造成这一组的节点都被更新了，最后一个节点还被当做新节点创建了，这样会造成很大的性能浪费，因此不建议使用index作为key

## SSR解决了什么问题，有做过SSR吗，怎么做的
SSR解决方案，后端渲染出完整的首屏的dom结构返回，前端拿到的内容包括首屏及完整spa结构，应用激活后依然按照spa方式运行。
SSR主要解决了以下两种问题：**SEO**和**首屏呈现渲染**
缺点：
- 复杂度：整个项目的复杂度，更多的与构建配置和部署相关的要求
- 库的支持性，代码兼容。浏览器端特定的代码只能在某些生命周期钩子中使用， 只有beforeCreate 和 created 会在服务器端渲染(SSR)过程中被调用；一些外部库可能需要特殊处理才能在服务端渲染的应用中运行。
- 更高的服务端负载：做好缓存和降级

有时候如果页面的数据不变，可以考虑SSG（Static Site Generation代表的是静态站点生成），在构建的时候直接把结果页面输出html
静态站点生成的优缺点
优点
- 减轻服务器压力，可以把生成的静态资源（html）放到CDN上，合理利用缓存
- 有利于SEO，由于html已经提前生成好，不需要服务端和客户端去渲染

缺点
- 只适用于静态数据，对于经常改动的数据，需要每次重新生成页面。

## 虚拟DOM：Virtual DOM
`虚拟DOM`是一个用来描述真实DOM的对象，本质是对象。
我们用 JavaScript 对象来表示 DOM 节点，使用对象的属性记录节点的类型、属性、子节点等。对象的基本属性：tagName/props/children，形成树形结构。
Diff算法是一种对比算法，主要是对比旧的虚拟DOM和新的虚拟DOM，找出发生更改的节点，并只更新这些接地那，而不更新未发生变化的节点，从而准确的更新DOM，减少操作真实DOM的次数，提高性能。
> Vue diff算法的主要思路
```javascript
  let oldStartIdx = 0 // 旧头索引
  let newStartIdx = 0 // 新头索引
  let oldEndIdx = oldCh.length - 1 // 旧尾索引
  let newEndIdx = newCh.length - 1 // 新尾索引
  let oldStartVnode = oldCh[0] // oldVnode的第一个child
  let oldEndVnode = oldCh[oldEndIdx] // oldVnode的最后一个child
  let newStartVnode = newCh[0] // newVnode的第一个child
  let newEndVnode = newCh[newEndIdx] // newVnode的最后一个child
```
> while循环主要处理了以下五种情景：
> 1. 当`oldStartVnode === newStartVnode`，直接 patchVnode ，同时`oldStartIdx++; newStartIdx++`
> 2. 当`oldEndVnode === newEndVnode`，直接 patchVnode ，同时`oldEndIdx--; newEndIdx--`
> 3. 当`oldStartVnode === newEndVnode`，这时候在 patchVnode 后，还需要将`oldStartVnode`移动到 `oldEndVnode` 的后面，同时`oldStartIdx++; newEndIdx--`
> 4. 当`oldEndVnode === newStartVnode`，这时候在 patchVnode 后，还需要将`oldEndVnode`移动到 `oldStartVnode` 的前面，同时`oldStartIdx--; newEndIdx++`
> 5. 如果都不满足以上四种情形，那说明没有相同的节点可以复用，则会分为以下两种情况：
>   - 从旧的 VNode 为 key 值，对应 index 序列为 value 值的哈希表中找到与 newStartVnode 一致 key 的旧的 VNode 节点，再进行patchVnode，同时将这个真实 dom移动到 oldStartVnode 对应的真实 dom 的前面
>   - 调用 createElm 创建一个新的 dom 节点放到当前 newStartIdx 的位置

## Vue实例挂载的过程
1. new Vue的时候调用会调用_init方法
  - 定义\$set、\$get 、\$delete、\$watch 等方法
  - 定义 \$on、\$off、\$emit、\$off等事件
  - 定义 _update、\$forceUpdate、\$destroy生命周期
2. 调用$mount进行页面的挂载
3. 挂载的时候主要是通过mountComponent方法
4. 定义updateComponent更新函数
5. 执行render生成虚拟DOM
6. _update将虚拟DOM生成真实DOM结构，并且渲染到页面中

## vue生命周期
![image](https://static.vue-js.com/44114780-3aca-11eb-85f6-6fac77c0c9b3.png)

## v-if和v-for为什么不建议一起使用？
1. v-for优先级高于v-if，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
2. 在外层嵌套template进行v-if判断，然后在内部进行v-for循环
3. 如果条件出现在循环内部，可通过计算属性computed提前过滤掉那些不需要显示的项


## 为什么data属性是一个函数而不是一个对象？
防止多个组件实例对象之间共用一个data，产生数据污染。采用函数的形式，initData时会将其作为工厂函数都会返回全新data对象