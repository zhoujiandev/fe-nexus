1. <a href="#babel_jx_jsx">babel 解析 jsx 语法工作流</a>
2. <a href="#react_xnyh">React 性能优化</a>
3. <a href="#react_ask_immutable">React 为什么要求 Immutabel</a>
4. <a href="#compare_hooks">useLayoutEffect 和 useLayout,useState 和 useReducer</a>
5. <a href="#pass_data">组件传值的方式</a>
6. <a href="#czzs_dom">操作真实 dom</a>
7. <a href="#father_invoke_child">父组件调用子组件的方法</a>
8. <a href="#hqzxdz">获取最新的值</a>
9. <a href="#dom_diff">获取最新的值</a>
10. <a href="#dom_key">key 的作用</a>
11. <a href="#hoc">高阶组件</a>
12. <a href="#18_differ_17">React18 和 React17 的区别</a>
13. <a href="#fiber">React Fiber</a>
14. <a href="#com_strict_mode">\<StrictMode\></a>
15. <a href="#create_portal">createPortal</a>
16. <a href="#flush_sync">flushSync</a>

## <span id="babel_jx_jsx">babel 解析 jsx 语法工作流</span>

1. React.createElement(FunctionCounter,props),返回虚拟 dom{type:FunctionCounter,props}
2. 挂载 dom，type(props)

## <span id="react_xnyh">React 性能优化</span>

- 函数组件用 React.memo()包裹，默认情况下，父组件 rerender，子组件就会 rerender,被 React.memo()包裹后，组件的 props 没有发生改变,则不会 rerender
- 使用 useMemo 和 useCallback,可以减少计算消耗，也可以避免子组件不必要的 rerender

## <span id="react_ask_immutable">React 为什么要求 Immutabel</span>

- 出于性能考虑，react 比较 props 前后是否一致时只比较一层（shallowEqual），如果没有采用 immutable，可能会导致数据变化，ui 没有更新

## <span id="compare_hooks">useLayoutEffect 和 useLayout,useState 和 useReducer</span>

### useEffect & useLayoutEffect

- useEffect 不会阻塞浏览器渲染，在浏览器绘制之后异步调用 effect，而 useLayoutEffect 会阻塞浏览器渲染，在 dom 更新完成后，浏览器渲染之前同步执行，总结：除非需要立即的反馈（比如测量元素的尺寸）用 useLayoutEffect,其余都用 useEffect

### useState & useReducer

- useState 是一个特殊的 useReducer，useReducer 适合对一个状态有多种操作，useState 改变状态是直接调用 useState 返回的数组的第二项，传入新的值（累加器用 useState,计算器用 useReducer）

## <span id="pass_data">组件传值的方式</span>

- props
- context
- 状态管理器

## <span id="czzs_dom">操作真实 dom</span>

- useRef 除了可以保存值之外，还可以用来操作 dom，想对 document.getElementById 要好

## <span id="father_invoke_child">父组件调用子组件的方法</span>

使用使用 ref，但是函数式组件没有 ref 属性（因为没有实例），通过 forwardRef 包裹一下就可以传 ref 属性了，另外，为了使得父组件不能随意更改子组件，我们可以使用 useImperativeHandle 给子组件定义暴露给父组件的方法

## <span id="hqzxdz">获取最新的值</span>

- 由于闭包，有时候并不能获得变量的最新值，我们可以使用 useRef 存值改值取值，获取最新的值，因为 useRef 返回的 ref 是单例的

## <span id="dom_diff">dom diff</span>

- 算法

  1.  生成 oldChildren 的映射
  2.  遍历 newChildren,根据 lastPlacedIndex 生成补丁包（patch）（标记了需要 MOVE 和 PLACEMENT 的节点）
  3.  删掉所有需要移动和删除的节点
  4.  执行补丁包

- 特点
  - 只对同级节点进行对比，如果 dom 节点跨层级移动，则 React 不会复用
  - 不同类型的元素会产出不同的结构，会销毁老结构，创建新结构
  - 可以通过 key 标识移动的元素

## <span id="dom_key">key 的作用</span>

- key 是元素的“身份证”，dom diff 的时候会根据 key 来标识元素，dom diff 只会比较同层级的元素，所以在列表渲染的时候给元素加上 key

## <span id="hoc">高阶组件</span>

- 传入一个组件，返回一个新组件，hoc 的写法和 render props 可以相互替换，在类组件中使用很多，现在都使用函数式组件，用的少
- 好处是可以实现组件代码的复用

## <span id="18_differ_17">React18 和 React17 的区别</span>

- 转化 jsx 语法，
  - 17 babel 转成 React.createElement,需要手动引入 React
  - 18 babel 转成 jsx 函数,不需要手动引入 React

## <span id="fiber">React Fiber</span>

- 相关概念

  - 没用 Fiber 的性能瓶颈，浏览器刷新频率为 60Hz,大概 16.6 毫秒渲染一次，而 js 线程和渲染线程是互斥的，如果 JS 线程执行任务时间超过 16.6ms 的话，会导致掉帧卡顿
  - 时间切片：把一个耗时任务切分成一个个小任务，分布在每一帧里的方式就叫时间切片
  - requestIdleCallback: 使开发者能够在不延迟关键事件（如动画和输入响应）的同时执行低优任务，一个任务就是最小单位，如果注册的任务执行时间过长，不会中断
  - 由于 requestIdleCallback 存在 1.兼容性问题 2.执行时间不可控 的问题，React 并没有使用 requestIdleCallback,而是自己实现了个类似的，里面把每帧时间定为 5ms

- Fiber 的作用
  - Fiber 是一个数据结构，为什么我们需要有这样一个数据结构，因为我们希望把构建 fiber 树的过程，或者说渲染的过程变成可中断，可暂停，可恢复的过程
  - 让自己的调和过程变成可被中断，适时的让出 CPU 执行权，让浏览器及时地响应用户的交互

## <span id="com_strict_mode">\<StrictMode \></span>

- 作用：发现 bugs,发现 deprecated apis
- 实现原理：调用两次 render 函数，调用两次 useEffect 中的 setup 函数和 cleanup 函数

## <span id="create_portal">createPortal</span>

- 作用：将组件渲染到指定的 dom 节点中去

## <span id="flush_sync">flushSync</span>

- 默认情况下，react 是异步批量更新，调用 flushSync 会立刻执行所传的 callback，然后立刻同步更新此时所堆积的 pendingUpdates
