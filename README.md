# 美食城项目介绍

## 关于本项目

基于Vue+Vuex+Axios+NodeJs+Express+MySQL的前后端分离在线订餐系统,

原本使用的是javaweb技术进行后端开发，后经过学习用nodejs重新写了后端接口。

## 前端架构

- 页面结构(H5,CSS3,原生JS)
- 框架(基于Vue脚手架:vue-cli)进行搭建
- 数据请求处理框架(Axios)
- Vue-Router进行路由处理
- Vuex进行公共数据与方法的存储

## 服务端架构

- 选用NodeJs进行后台开发
- Express中间件进行服务的配置，路由、请求的处理
  - 官网 http://www.expressjs.com.cn/
- Mysql中间件处理与数据库的"通信"
- Body-Parser中间件进行前端请求参数的获取
- 使用jwt对token进行加密
- multer中间件用于文件的上传与存储

## 数据库选取

- 采用MySQL进行相关数据库的设计与实现

## 目前项目已实现功能

1. 首页数据的展示
2. 购物车
3. 注册
4. 登录
5. 商品详情页
6. 商品搜索
7. 用户订单管理
8. 商家详情页
9. 商家搜索页
10. 商家发布，查询，修改，删除菜品
11. 商家管理订单
12. 管理员管理商家与用户

## 安装

已安装MySQL数据库，然后导入mysql文件夹下的mysql.sql文件

然后通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

打开Vue2文件夹，执行命令

```
npm install 或 cnpm install
npm run serve
```

最后打开nodejs文件夹，执行命令

```
cd .\myapp\ 
npm install 或 cnpm install
nodemon index.js
```

## 目录结构

Vue2文件夹下的主要文件

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

nodejs下的主要文件

```
nodejs
└─ myapp						//项目根目录
   ├─ config					//配置文件目录
   │  └─ mysqlConfig.js			//mysql连接配置项
   ├─ Controllers				//控制层,用于操作数据库
   │  ├─ AdminContoller.js		//管理员控制类
   │  ├─ DisheController.js		//菜品控制类
   │  ├─ OrderController.js		//订单控制类
   │  ├─ SellerController.js	//商家控制类
   │  └─ UserContoller.js		//用户控制类
   ├─ index.js					//后端主文件
   ├─ package-lock.json				
   ├─ package.json	
   ├─ routers					//路由接口匹配
   │  ├─ admin.js				//匹配管理员接口
   │  ├─ captcha.js				//匹配验证码接口
   │  ├─ dishe.js				//匹配菜品接口
   │  ├─ order.js				//匹配订单接口
   │  ├─ seller.js				//匹配商家接口
   │  └─ user.js				//匹配用户接口
   ├─ Services					//服务层，用于与视图层交互
   │  ├─ AdminService.js		//管理员服务类		
   │  ├─ DisheService.js		//菜品服务类
   │  ├─ OrderService.js		//订单服务类
   │  ├─ SellerService.js		//商家服务类
   │  └─ UserService.js			//用户服务类
   └─ util						//存放全局通用方法目录
      ├─ fileOperation.js		//文件操作方法
      ├─ getCaptch.js			//获取验证码方法
      ├─ getTime.js				//获取当前时间方法
      ├─ jwt.js					//jwt加密解密方法
      ├─ messageCode.js			//一些信息交互码
      └─ storagePath.js			//配置存储路径
```



```
.
├── README.md           
├── libs               		// 后台常用工具模块的封装，比如格式化事件、MD5加密等
├── route              		// 后台接口的编写目录
├── server.js          		// 后台服务的配置文件
├── webpack.config.js  		// webpack配置文件
├── index.html         		// 项目入口文件
├── package.json       		// 项目配置文件
├── src                		// 生产目录
│   ├── assets         		// css js 和图片资源
│   ├── components     		// 各种Vue组件
│   ├── store          		// vuex状态管理器
│   ├── App.vue        		// 项目中全局Vue
│   ├── main.js        		// Webpack 预编译入口
│   └── router.config.js    // vue路由配置文件
```