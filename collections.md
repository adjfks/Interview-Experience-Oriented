<!-- START doctoc -->

<!-- END doctoc -->

# js相关

## 👀核心

### 1.闭包及其应用 ？

[【JavaScript修炼】闭包和虽死犹存的函数](https://blog.csdn.net/laplacepoisson/article/details/124662698)

## 👀DOM

### 1.直接绑定和事件监听有哪些区别？

- 直接绑定对于一个事件只能有**一个处理函数**，再次绑定会覆盖处理函数。事件监听对于同一事件可以有**多个处理函数。**
- 只有**html元素、document对象，window对象**可以使用直接绑定；监听器除那三个还可以是**任何其他支持事件的对象**，如[XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest).
- 事件监听可以通过第三个参数（配置对象Options或布尔值useCapture,默认为false）**指定事件监听器的触发阶段（冒泡或捕获）。**

补充：

- click 事件的运行顺序在 [mousedown](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mousedown_event) 和 [mouseup](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseup_event) 事件之后。
- [mdn关于兼容性的封装](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E5%85%BC%E5%AE%B9%E6%80%A7)

### 2.节流(throttle)防抖 (debounce)

- debounce: 事件触发时，相应函数延迟一会才执行。当密集触发时函数执行会被一直延迟。应用：输入框发送请求。
- throttle: 事件触发时，节流函数会按照一定频率执行事件处理函数。

[手撕源码系列 —— lodash 的 debounce 与 throttle](https://zhuanlan.zhihu.com/p/91110334)

# 框架

## 👀Vue

### 1. vue组件通信方式？

[官方文档事件总线](https://v3.cn.vuejs.org/guide/migration/events-api.html#%E4%BA%8B%E4%BB%B6%E6%80%BB%E7%BA%BF)

**总述：一共有7、8种方式**

- props
- \$emit / \$on
- \$children / \$parent
- \$attrs / $listeners
- ref
- $root
- eventbus
- vuex

其中在vue3中\$on/\$parent/$listeners这些api已经被废除

事件api的废除使得eventbus实现起来不是很方便，可以通过引入第三方实现了事件触发器接口的库，例如 [mitt](https://github.com/developit/mitt) 或 [tiny-emitter](https://github.com/scottcorgan/tiny-emitter)。

\$children的替代可以使用$refs。

\$listeners废弃后直接通过$attrs就可以访问添加在组件上的事件监听器。

**根据组件关系阐述**

- **父子组件**

- props / emit / $parent / ref / $attrs(爷孙之间透穿属性)

- **兄弟组件**

- $parent / $root / eventbus / vuex

- **跨层级组件**

- vuex / eventbus / provide / inject

### 2. v-if 和 v-for 哪个优先级高？

思路

- 结论
- 为什么，细节
- 场景
- 总结拔高

这个问题在官方文档中其实有[详细描述](https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%BF%85%E8%A6%81)。

1. 在vue2中，v-for的优先级高于v-if。而vue3中，v-if的优先级高于v-for。
2. 一般有两种情况可能会这样做
- 为了过滤一个列表中的项目，`v-for="user in users" v-if="user.isActive"`，推荐直接使用计算属性做列表过滤。
- 为了避免渲染本应该被隐藏的列表，`v-for="user in users" v-if="shouldShowUsers"`，这种情况应该把`v-if`放到父容器上。
3. 平时在实践中一定要避免v-for和v-if同时出现在一个元素上。
4. 在vue2中，两者放在一起输出的渲染函数是先执行循环，在循环里判段；vue3中是先判断再决定是否循环。

```javascript
// vue3
return function render(_ctx, _cache) {
  with (_ctx) {
    const { createCommentVNode: _createCommentVNode, renderList: _renderList, Fragment: _Fragment, openBlock: _openBlock, createElementBlock: _createElementBlock, toDisplayString: _toDisplayString, createElementVNode: _createElementVNode } = _Vue
    return (_openBlock(), _createElementBlock(_Fragment, null, [
      _createCommentVNode(" 过滤列表中项目 "),
      _createCommentVNode(" 过滤列表中项目 "),
      _createCommentVNode(" 浏览器控制台会报错：Uncaught TypeError: Cannot read properties of undefined (reading 'isActive') "),
      _createCommentVNode(" <div id=\"app\">\n      <div v-for=\"item in items\" :key=\"item.id\" v-if=\"item.isActive\">\n        {{ item.name }}\n      </div>\n    </div> "),
      _createCommentVNode(" 避免渲染应该被隐藏的列表 "),
      _createElementVNode("div", _hoisted_1, [
        shouldShowUsers
          ? (_openBlock(true), _createElementBlock(_Fragment, { key: 0 }, _renderList(items, (item) => {
              return (_openBlock(), _createElementBlock("div", { key: item.id }, _toDisplayString(item.name), 1 /* TEXT */))
            }), 128 /* KEYED_FRAGMENT */))
          : _createCommentVNode("v-if", true)
      ])
    ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
  }
}
// vue2
(function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('div',{attrs:{"id":"app"}},_l((items),function(item){return (shouldShowUsers)?_c('div',{key:item.id},[_v("\n        "+_s(item.name)+"\n      ")]):_e()}),0)])}
})
```



### 3.[面试官：说说你对vue的理解? ](https://github.com/febobo/web-interview/issues/1)

- vue是什么？
  
  - Vue.js（/vjuː/，或简称为Vue）是一个用于创建用户界面的开源JavaScript框架，也是一个创建**单页应用**的Web应用框架。
  
  - Vue所关注的核心是MVC模式中的**视图层**，同时，它也能方便地**获取数据更新**，并通过组件内部特定的方法实现视图与模型的交互

- vue的核心特性：
  
  - 数据驱动MVVM：三层
  
  - 指令系统
    
    - 带有 v- 前缀的特殊属性作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM
    
    - 常用的指令
  
  - 组件化
    
    - 把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式
    
    - 降低整个系统的耦合度
    
    - 调试方便
    
    - 提高可维护性

- vue与传统开发区别：
  
  - vue通过操作数据来操作界面事件，不操作DOM
  
  - DOM的变化是数据变化导致的，即DOM与数据绑定。





### 4.[面试官：Vue3.0的设计目标是什么？做了哪些优化?](https://github.com/febobo/web-interview/issues/45)

更小、更快、更友好、优化方案。

- 更小
  
  - `Vue3`移除一些不常用的 `API`
  
  - 引入`tree-shaking`，可以将无用模块“剪辑”，仅打包需要的，使打包的整体体积变小了

- 更快：主要体现在编译方面：
  
  - diff算法优化
  - 静态提升
  - 事件监听缓存
  - SSR优化

- 更友好：composition API
  
  - 很多类似的第三方库，我们只需要调用即可，不必关注实现过程，开发效率大大提高.
  
  - `VUE3`是基于`typescipt`编写的，可以享受到自动的类型定义提示

- 优化方案
  
  - `vue3`从很多层面都做了优化，可以分成三个方面：
    
    - 源码
    - 性能
    - 语法 API
  
  - 源码
    
    - 将不同的模块拆分到`packages` 目录下面不同的子目录中，使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读、理解和更改所有模块源码，提高代码的可维护性
    
    - 一些 `package`（比如 `reactivity` 响应式库）是可以独立于 `Vue` 使用的
  
  - 性能
    
    - 体积优化
    
    - 编译优化
    
    - 数据劫持优化











# 👀浏览器

## 1.你知道哪些跨页面通信的方式呢？

[面试官：前端跨页面通信，你知道哪些方法？ - 掘金](https://juejin.cn/post/6844903811232825357)

- 广播模式：Broadcast Channe / Service Worker / LocalStorage + StorageEvent
- 共享存储模式：Shared Worker / IndexedDB / cookie
- 口口相传模式：window.open + window.opener
- 基于服务端：Websocket / Comet / SSE 等

**同源页面**

- **Broadcast Channel**
  
  - 它允许同源的不同浏览器窗口，Tab页，frame或者 iframe 下的不同文档之间相互通信。
  
  ```javascript
  var bc = new BroadcastChannel('internal_notification');
  bc.postMessage('New listening connected!');
  ```

- **Service Worker**

    在 Service Worker 中监听了`message`事件，获取页面（从 Service Worker 的角度叫 client）发送的信息。然后通过`self.clients.matchAll()`获取当前注册了该 Service Worker 的所有页面，通过调用每个client（即页面）的`postMessage`方法，向页面发送消息。这样就把从一处（某个Tab页面）收到的消息通知给了其他页面。

- **LocalStorage**

当前页面使用的storage被其他页面修改时会触发StorageEvent事件，该事件对象上有5个只读的属性：`key newValue oldValue storageArea url`

- **Shared Worker**

- **IndexedDB**

- **window.open + window.opener**

**非同源页面**

- **iframe**

使用一个用户不可见的 **iframe **作为“桥”。由于 iframe 与父页面间可以通过指定`origin`来忽略同源限制，因此可以在每个页面中嵌入一个 iframe （例如：`http://sample.com/bridge.html`），而这些 iframe 由于使用的是一个 url，因此属于同源页面，其通信方式可以复用上面第一部分提到的各种方式。

# CSS

## 👀基础

### 1.块级元素和行内元素

- 块级元素会独占一行，其宽度自动填满其父元素宽度  ，行内元素不会独占一行，相邻的行内元素会排列在同一行里，直到一行排不下，才会换行，其宽度随元素的内容而变化。

- 块级元素可以设置 width, height属性，行内元素设置width, height无效。

- 块级元素可以设置margin 和 padding.行内元素上下margin 和 上下padding无效。

- 块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素。
