## 1、Webpack 工作流
1. 初始化参数，合并命令行参数和配置文件中的配置
2. 利用参数初始化 Compile 对象
3. 加载所有配置的插件，调用插件的 apply 方法
4. 调用 Compile 对象的 run 方法生成 Compilation 对象
5. 开始编译，找对所有的入口文件，同时找到所有的依赖，调用所有的 loader 对文件进行编译，递归此步骤，将所有的文件编译成一个个包含多个模块的 chunk，将 chunk 转化成文件加入到输出列表中，确定好输出内容后，调用 emitAssets 方法，根据 output 中配置的路径和文件名将文件写进磁盘

## 2、优化产物体积
-   压缩 js,压缩 css,压缩图片,移除没用到的 css
-   代码分割（配置多入口，懒加载，splitChunks）
-   treeShaking
