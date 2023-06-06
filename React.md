1. <a href="#babel_jx_jsx">babel 解析 jsx 语法工作流</a>
2. <a href="#react_xnyh">React 性能优化</a>
3. <a href="#react_ask_immutable">React 为什么要求 Immutabel</a>
4. <a href="#compare_hooks">useLayoutEffect 和 useLayout,useState 和 useReducer</a>
5. <a href="#pass_data">组件传值的方式</a>
6. <a href="#czzs_dom">操作真实 dom</a>
7. <a href="#father_invoke_child">父组件调用子组件的方法</a>
8. <a href="#hqzxdz">获取最新的值</a>

## <span id="babel_jx_jsx">babel 解析 jsx 语法工作流</span>

1. React.createElement(FunctionCounter,props),返回虚拟 dom{type:FunctionCounter,props}
2. 挂载 dom，type(props)

## <span id="react_xnyh">React 性能优化</span>

-   函数组件用 React.memo()包裹，默认情况下，父组件 rerender，子组件就会 rerender,被 React.memo()包裹后，组件的 props 没有发生改变,则不会 rerender
-   使用 useMemo 和 useCallback,可以减少计算消耗，也可以避免子组件不必要的 rerender

## <span id="react_ask_immutable">React 为什么要求 Immutabel</span>

-   出于性能考虑，react 比较 props 前后是否一致时只比较一层（shallowEqual），如果没有采用 immutable，可能会导致数据变化，ui 没有更新

## <span id="compare_hooks">useLayoutEffect 和 useLayout,useState 和 useReducer</span>

-   useLayoutEffect 不会阻塞浏览器渲染 ，在 dom 更新完成，浏览器绘制之前同步调用 effect（queueMicroTask），而 useLayout 会阻塞浏览器渲染，在浏览器渲染结束后执行(setTimeout)
-   useState 是一个特殊的 useReducer，useReducer 适合对一个状态有多种操作，useState 改变状态是直接调用 useState 返回的数组的第二项，传入新的值（累加器用 useState,计算器用 useReducer）

## <span id="pass_data">组件传值的方式</span>

-   props
-   context
-   状态管理器

## <span id="czzs_dom">操作真实 dom</span>

-   useRef 除了可以保存值之外，还可以用来操作 dom，想对 document.getElementById 要好

## <span id="father_invoke_child">父组件调用子组件的方法</span>

使用使用 ref，但是函数式组件没有 ref 属性（因为没有实例），通过 forwardRef 包裹一下就可以传 ref 属性了，另外，为了使得父组件不能随意更改子组件，我们可以使用 useImperativeHandle 给子组件定义暴露给父组件的方法

## <span id="hqzxdz">获取最新的值</span>

-   由于闭包，有时候并不能获得变量的最新值，我们可以使用 useRef 存值改值取值，获取最新的值，因为 useRef 返回的 ref 是单例的
