## 1、Webpack工作流
1. 初始化参数，合并命令行参数和配置文件中的配置
2. 利用参数初始化Compile对象
3. 加载所有配置的插件，调用插件的apply方法
4. 调用Compile对象的run方法生成Compilation对象
5. 开始编译，找对所有的入口文件，同时找到所有的依赖，调用所有的loader对文件进行编译，递归此步骤，将所有的文件编译成一个个包含多个模块的chunk，将chunk转化成文件加入到输出列表中，确定好输出内容后，调用emitAssets方法，根据output中配置的路径和文件名将文件写进磁盘

## 2、优化产物体积
- 压缩js,压缩css,压缩图片,移除没用到的css
- 代码分割（配置多入口，懒加载，splitChuns）
- treeShaking