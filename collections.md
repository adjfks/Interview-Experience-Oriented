<!-- START doctoc -->

<!-- END doctoc -->

# 👏js相关

## 👀基础

### 1.js单线程,为什么？

js单线程，原因避免dom渲染冲突

### 2.js数据类型？

- 基本类型：Undefined，Boolean，String，Number，Null，Symbol,BigInt

- 引用类型：Object (Array,Date,RegExp,Function)

### 3.创建对象的几种方式？

```javascript
var o1 = {name:'abcd01'};
var o2 = new Object({name:'abcdo2'});
function M(name) {
    this.name=name;
}
var o3 = new M('abcdo3');
var p={name:'abcdp'};
var o4 = Object.create(p);
// ps:o4创建了一个原型，o4.__proto__===p
```

## 👀核心

### 1.闭包及其应用 ？

[【JavaScript修炼】闭包和虽死犹存的函数](https://blog.csdn.net/laplacepoisson/article/details/124662698)

### 2.谈谈javascript作用域链？

 [【JavaScript修炼】变量对象与作用域链_前端corner的博客-CSDN博客](https://blog.csdn.net/laplacepoisson/article/details/124658971)

当执行一段JavaScript代码（全局代码或函数）时，JavaScript引擎会创建为其创建一个执行上下文（Execution Context），在页面加载后会首先创建一个全局的执行上下文，每遇到函数调用就会创建一个执行上下文并压入执行上下文栈中。作用域链的作用是用于解析标识符，当执行上下文被创建后，js引擎进入执行上下文，用arguments、命名参数和该函数中的所有局部变量创建一个变量对象，然后激活对象，将变量对象添加到当前的执行上下文中。然后利用函数内部的[[Scopes]]属性初始化作用域链，将当前执行上下文的激活对象添加到作用域链的最前端。

函数的[[Scopes]]属性是在函数定义时就确定的，因为javascript的作用域是词法作用域。

### 3.如何理解JavaScript原型链？

JavaScript中的每个对象都有一个prototype属性，我们称之为原型，而原型的值也是一个对象，因此它也有自己的原型，这样就串联起来了一条原型链，原型链的链头是Object,它的prototype比较特殊，值为null。

原型链的作用是用于对象继承，函数A的原型属性(prototype property)是一个对象，当这个函数被用作构造函数来创建实例时，该函数的原型属性将被作为原型赋值给所有对象实例，比如我们新建一个数组，数组的方法便从数组的原型上继承而来。

当访问对象的一个属性时, 首先查找对象本身, 找到则返回; 若未找到, 则继续查找其原型对象的属性(如果还找不到实际上还会沿着原型链向上查找, 直至到根). 只要没有被覆盖的话, 对象原型的属性就能在所有的实例中找到，若整个原型链未找到则返回undefined。

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

# 👏框架

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

# 👏浏览器

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

# 👏前端工程化

## 👀Webpack

### 1.babel的转译过程？以ES6代码转译为ES5代码为例。

1. ES6代码输入。

2. babylon进行解析得到AST。

3. plugin用babel-traverse遍历AST转译，得到新的AST树。

4. 用babel-generator通过AST树生成ES5代码。

### 2.babel如何处理async错误捕获转换的？

### 3. 什么是模块化？

- 模块化就是为了减少系统耦合度，提高内聚，减少资源循环依赖，增强系统框架设计。
- 让开发者便于维护,同时也让逻辑相同的部分可复用
- 模块化开发：针对js、css，以**功能**或**业务**为单元组织代码。js方面解决独立作用域、依赖管理、api暴露、按需加载与执行、安全合并等问题，css方面解决依赖管理、组件内部样式管理等问题。

## 👀Git

### 1.了解常见的commit的命名规范吗？

```javascript
 'feat', // 新功能 feature：产品、技术需求、技术优化等功能开发
 'fix', // 一个错误修复
 'refactor', // 重构(既不增加新功能，也不是修复bug)
 'docs', // 仅文档更改
 'test', // 添加缺失的测试或更正现有的测试
 'chore', // 文档、辅助工具等的修改
 'style', // 不影响代码含义的更改（空白，格式，缺少分号等）
 'perf', // 改进性能的代码更改
 'revert', // 回退

 // eg: 'feat: 添加了图表功能'
```

# 👏网络

### 1. 谈谈cookie, sessionStorage 和localStorage之间的区别.

- `localStorage` **持久化**的本地存储，除非主动删除数据，否则数据是永远不会过期的。
- `sessionStorage` 不是一种持久化的本地存储，仅仅是**会话级别的存储**
- `cookie` Web Storage的概念和cookie相似，区别是它是为了更大容量 存储设计的。 HTTP协议是无状态的协议。一旦数据交换完毕，客户端与服务器端的连接就会关 闭，再次交换数据需要建立新的连接。这就意味着服务器无法从连接上跟踪会话， `Cookie`就是这样的一种机制。它可以弥补`HTTP`协议无状态的不足。在Session出现之前 ，基本上所有的网站都采用Cookie来跟踪会话。Cookie实际上是一小段的文本信息。客 户端请求服务器，如果服务器需要记录该用户状态，就使用response向客户端浏览器颁 发一个Cookie。客户端浏览器会把Cookie保存起来。当浏览器再请求该网站时，浏览 器把请求的网址连同该Cookie一同提交给服务器。服务器检查该Cookie，以此来辨认用户状态 。服务器还可以根据需要修改Cookie的内容。 Cookie的大小是受限的，并且每次你请求 一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，另外cookie还需要 指定作用域，不可以跨域调用。Cookie在客户端是由浏览器来管理的，浏览器能够保证 Google只会操作Google的Cookie而不会操作Baidu的Cookie，从而保证用户的隐私安 全。 除此之外，Web Storage拥有setItem,getItem,removeItem,clear等方法， 不像cookie需要前端开发者自己封装setCookie，getCookie。 但是 **Cookie也是不可 以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而 Web Storage仅仅是为了在本地“存储”数据而生**





- UDP和TCP区别讲一下
- 跨域的几种实现方式
- 网站的本地缓存
- TCP/IP 四层模型 、OSI七层模型、每一层的有哪些常见的协议
- TCP 与 UDP 的区别
- TCP 的 三次握手与四次挥手（为什么是三次？ 为什么是四次？）
- TCP 的 流量控制与拥塞控制
- TCP 可靠传输
- TCP 滑动窗口
- HTTP 的请求方法
- GET 与 POST的区别
- HTTP 常见的请求头
- HTTP 状态码
- HTTP 报文格式
- HTTP1.0 、HTTP1.1 、HTTP 2.0
- HTTP 与 HTTPS 的区别 、HTTPS的握手过程
- HTTPS中的三个随机数是如何生成会话密钥的
- HTTP 缓存：强缓存与协商缓存
- 进程、线程
- 进程之间的通信方式
- 线程的哪些资源共享？哪些资源不共享
- 死锁







# 👏CSS

## 👀基础

### 1.块级元素和行内元素

- 块级元素会独占一行，其宽度自动填满其父元素宽度  ，行内元素不会独占一行，相邻的行内元素会排列在同一行里，直到一行排不下，才会换行，其宽度随元素的内容而变化。

- 块级元素可以设置 width, height属性，行内元素设置width, height无效。

- 块级元素可以设置margin 和 padding.行内元素上下margin 和 上下padding无效。

- 块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素。

### 2. CSS 中类 (classes) 和 ID 的区别？

1. 书写上的差别：class名用“.”号开头来定义，id名用“#”号开头来定义；
2. 调用上的区别：在同一个html网页页面中class是可以被多次调用的（在不同的地方）。 而id名作为标签的身份则是唯一的，id在页面中只能出现一次。 在js脚本中经常会用到id来修改一个标签的属性
3. id作为元素的标签，用于区分不同结构和内容，而class作为一个样式， 它可以应用到任何结构和内容上。
4. 在布局思路上，一般坚持这样的原则：id是先确定页面的结构和内容，然后再为 它定义样式：而class相反，它先定义好一类样式，然后再页面中根据 需要把类样式应用到不同的元素和内容上面。
5. 在实际应用时，class更多 的被应用到文字版块以及页面修饰等方面，而id更多地被用来实现宏伟布局和设计 包含块，或包含框的样式。

### 3.请问 “resetting” 和 “normalizing” CSS 之间的区别？你会如何选择，为什么？

- `Normalize` 相对「平和」，注重通用的方案，重置掉该重置的样式，保留有用的 `user agent` 样式， 同时进行一些 `bug` 的修复，这点是 `reset` 所缺乏的。
- `Reset` 相对「暴力」，不管你有没有用，统统重置成一样的效果，且影响的范围很大， 讲求跨浏览器的一致性。
- `Normalize.css`是一种CSS reset的替代方案。它们的`区别`有：
1. Normalize.css 保护了有价值的 默认值，Reset通过为几乎所有的元素施加默认样式，强行使得元素有相同的 视觉效果。相比之下，Normalize.css保持了许多默认的浏览器样式。这就意味着 你不用再为所有公共的排版元素重新设置样式。当一个元素在不同的浏览器中有不同 的默认值时，Normalize.css会力求让这些样式保持一致并尽可能与现代标准相符合。
2. Normalize.css 修复了浏览器的bug，它修复了常见的桌面端和移动端浏 览器的bug。这往往超出了Reset所能做到的范畴。关于这一点，Normalize.css修复 的问题包含了HTML5元素的显示设置、预格式化文字的font-size问题、在IE9中SVG 的溢出、许多出现在各浏览器和操作系统中的与表单相关的bug。
3. Normalize.css 不会让你的调试工具变的杂乱
4. Normalize.css 是模块化的
5. Normalize.css 拥有详细的文档 选择Normalize.css ，主要是 reset.css为几乎所有的元素施加默认样式，所 以需要对所有公共的排版元素重新设置样式，这是一件很麻烦的工作。

### 4.浮动及其工作原理？

float属性定义了元素是否浮动及在哪个方向浮动，在CSS中任何元素都可以浮动，且浮动元素会生成一个块级框，而不论它本身是何种元素。并且盒子的宽度不在伸展，而是根据盒子里面的内容的宽度来确定。浮动属性会使得浮动的元素脱离文档流，所以文档的普通流中的块框会表现的像浮动框不存在一样。

### 5. block，inline和inline-block的概念以及区别？

- 首先这是display中的三个属性值，用于设置元素的类型。元素类型在HTML5之前分为两种分 别是块级元素（ block-level elements）和内联元素（ inline elements）。

- 当display的属性值被设置为block时，元素会以块级元素（ block-level elements）显示， 而设置为inline时会以内联元素（ inline elements）显示。

- display:block 元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满 其父元素宽度。 block元素可以设置width,height属性。块级元素即使设置了宽度,仍然是独占一行。 block元素可以设置margin和padding属性。

- display:inline inline元素不会独 占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素 的内容而变化。 inline元素设置width,height属性无效。 inline元素**竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果**，其余方向可以。

- display:inline-block 简单来说就是将**对象呈现为inline对象**，但是对象的**内容作为block对象呈现。** 比如我们可以给一个a元素设置`display:inline-block`属性值，使其既具有block的宽度高度特性又具有inline的同行特性。**属性为inline-block元素之间的空格或者换行在浏览器上会是一个空白的间隙**。 且IE6和7是不支持这个属性的，需要通过*display:inline;*zoom:1做hack处理。

### 6.请解释 CSS sprites，以及你要如何在页面或网站中实现它。

- 通常被意译为“CSS图像拼合”或“CSS贴图定位”，也叫雪碧图，精灵图。 CSS Sprites就是把网页中一些背景图片整合到一张图片文件中， 再利用CSS的`“background-image”，“background- repeat”，“background-position”` 的组合进行背景定位，`background-position`可以用数字精确定位出背景图片的位置。 

- 优点：当页面加载时，不是加载每个单独图片，而是一次加载整个组合图片。这是一个了不起的改进， 它大大减少了HTTP请求的次数，减轻服务器压力，同时缩短了悬停加载图片所需要的时间延迟， 使效果更流畅，不会停顿。 

- 缺点：做图像拼合的时候很麻烦。

### 7.如何让一个div上下左右居中？

（1）`position:absolute;left:50%;top:50%; transform:translate(-50%,-50%);`

（2）`position:absolute;left:0;top:0;bottom:0;right:0; margin:auto;`

（3）`width:200px;height:200px;border: 1px solid red;background:#99f;position:absolute;left:50%;top:50%; margin-left:-100px;margin- top:-100px`

# 👏html

## 👀基础

### 1.script, script async 和 script defer之间的区别？

- `defer`使得browsers延迟脚本的执行，直到文档的载入和解析完成并可以操 作（在onload事件触发前），加上 defer 等于在页面完全在入后再执行，相 当于 window.onload ，但应用上比 window.onload 更灵活！
- `async` 属性规定一旦脚本可用，则会异步执行。所以async使得browsers可以尽快地执行脚本，而 不用在下载脚本时阻塞文档解析（异步）。在不支持async的browsers中，通过动态创 建script元素并把它插入文档中，来实现脚本的异步载入和执行。 **若两个属性同在，会忽略defer而遵从async。**

### 2.为什么css样式的位置一般在head中而js的样式则是在body中？那有没有其他例外情况？

- 因为这和需要的加载顺序有关，CSS放在头部会先被加载，因为css样式表规定了网页总体 样式，而js一般是在其他内容加载完成之后起作用的，所以一般加载在尾部。

- head 内的 JavaScript 需要执行结束才开始渲染 body，如果有多个外连接脚本放在head中，那 么，当加载脚本时会阻塞页面的渲染，也就是常说的空白。而 CSS 应当写在 head 中，以 避免页面元素由于样式缺失造成瞬间的白页或者给用户闪烁感。 例外是：
1. 个别特殊JS，比如用于调试的基础脚本（部署时未必有）、性能日志之类，必须放在尽量最前的位置。
2. 一些需要在body之前加载的js文件，`html5-shim`脚本必须在body之前加载。
3. 渐进式渲染中也需 要先加载js。

### 3. html5中有哪些新的标签?

首先HTML5的特点是更加简洁以及更加语义化，html5中新 增的标签有如：`nav，header，footer，artical，section，aside，canvas， details，mark，audio，video。`

### 4.iframe有那些优缺点？

只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改。

缺点：阻塞页面onload事件

搜索引擎无法检索这种页面，不利于SEO

会影响页面的并行加载

解决方案：使用JS动态给iframe的src加载页面内容

### 5.:before和::before区别?

单冒号(:)是css2的写法

双冒号(::)用于CSS3。作用是一样的。

加分项：

配合`content`一起使用，不会出现在DOM中，所以不能JS控制，仅仅用于css渲染，通常用于 hover激活
