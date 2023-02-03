# 前端项目相关

## 项目依赖安装
```
npm install
```

### 项目启动
```
npm run serve
```

### 项目构建
```
npm run build
```

### 文件夹相关
```
Vue2
├─ public						//静态资源存储目录
├─ src							
│  ├─ App.vue					// 项目中全局Vue
│  ├─ assets					//静态资源存储目录
│  ├─ components				//组件存放目录
│  ├─ main.js					// Webpack 预编译入口
│  ├─ pages						//页面存放目录
│  ├─ router					// vue-router目录	
│  │  └─ index.js							
│  ├─ store						// vuex状态管理器
│  │  └─ index.js
│  └─ utils						//配置文件目录
│     ├─ imgPath.js				//图片路径配置
│     └─ request.js				//对axios的封装
└─ vue.config.js				//vue配置项
```