
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