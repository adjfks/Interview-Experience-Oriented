<!-- START doctoc -->

<!-- END doctoc -->

# js相关

## 核心

### 1.闭包及其应用 ？

[【JavaScript修炼】闭包和虽死犹存的函数](https://blog.csdn.net/laplacepoisson/article/details/124662698)

## DOM

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

## Vue

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
