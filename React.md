## 1、babel 解析 jsx 语法工作流

1. React.createElement(FunctionCounter,props),返回虚拟 dom{type:FunctionCounter,props}
2. 挂载 dom，type(props)

## 2、性能优化

-   函数组件用 React.memo()包裹，默认情况下，父组件 rerender，子组件就会 rerender,被 React.memo()包裹后，组件的 props 没有发生改变,则不会 rerender
-   使用 useMemo 和 useCallback,可以减少计算消耗，也可以避免子组件不必要的 rerender

## 3、react 为什么要求 immutabel?

-   出于性能考虑，react 比较 props 前后是否一致时只比较一层（shallowEqual），如果没有采用 immutable，可能会导致数据变化，ui 没有更新

## 4、useLayoutEffect 和 useLayout,useState 和 useReducer

-   useLayoutEffect 的第一个参数在渲染之前执行，而 useLayout 得第一个参数在渲染之后执行，(setTimeout,queueMicroTask)
-   useState 是一个特殊的 useReducer，useReducer 适合对一个状态有多种操作，useState 改变状态是直接调用 useState 返回的数组的第二项，传入新的值（累加器用 useState,计算器用 useReducer）

## 5、组件传值的方式
- props
- context
- 状态管理器
