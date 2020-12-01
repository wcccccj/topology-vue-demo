# topology-demo

基于topology + elemenu-ui + vue-cli的topology编辑器（仅供学习参考使用）

目前功能巨简单，参考了几个vue写的关于topology的demo整合在一起，改成自己熟悉的样子。
会持续维护，添加topology上的API实现

## 技术选型
- Vue-Cli
- Topology
- Element-ui

## 思路
大体的架子还是参照其他做得比较优秀的demo拽过来的，然后按照布局分了一下组件，方便按组件去开发。主要是操作canvas的对象，把canvas传到每个组件，组件自行操作（原理就是操作同一个应用地址的对象），或者emit去回调父组件的方法。官方Le5le的例子使用Nuxt写的，用Vuex去通知父组件调用哪些方法，因为我这里不想引入vuex就去掉了换成现在这种。目前还没遇到什么问题，如果有什么更好的做法欢迎指导一下。

## Usage
## 项目运行
```
npm i
npm run serve
```

### 项目构建
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## 常见问题
### 为什么App.vue下padding: 50px
这里是为了测试一个topology的bug，拖动左边组件到画布时，页面会回弹到一个位置。
因为我们把他当组件放进项目里时，不一定是一个单独的界面，很可能作为dialog或者container包裹的组件，所以这个bug还是会有点影响的。正常情况下可以去掉

# 运行截图
![](https://i.loli.net/2020/11/27/MzoFGJUeibgpd7w.jpg)