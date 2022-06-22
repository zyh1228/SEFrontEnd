# 软件工程大作业前端

基于官方适配的threejs-miniprogram 兼容three.j框架

修改兼容Three.js 官方提供的ObjLoader.js

## 使用方法

1. 通过 npm 安装

```shell
npm install --save threejs-miniprogram
```

2. 安装完成之后在微信开发者工具中点击构建npm

3. 修改`app.js`中后端的地址(第26行)

```javascript
globalData: {
    height:0,width:0,
    HOST: '127.0.0.1:8000'  // 修改为正确地址
},
```
