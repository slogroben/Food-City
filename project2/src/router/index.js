import VueRouter from 'vue-router' 

import Home from '/src/pages/Home'
import UserRegister from '/src/pages/UserRegister'
import UserLogin from '/src/pages/UserLogin'
import SellerRegister from '/src/pages/SellerRegister'
import SellerRegisterMessage from '/src/pages/SellerRegisterMessage'
import SellerLogin from '/src/pages/SellerLogin'
import AdminHome from '/src/pages/AdminHome'
import AdminLogin from '/src/pages/AdminLogin'

import UserManage from '/src/components/UserManage'
import DishesSearch from '/src/pages/DishesSearch'
import ShopSearch from '/src/pages/ShopSearch'
import SellerManage from '/src/components/SellerManage'
import SellerDel from '/src/components/SellerManage/SellerDel'
import SellerIsPass from '/src/components/SellerManage/SellerIsPass'
import SellerQuit from '/src/components/SellerManage/SellerQuit'
import SellerHome from '/src/pages/SellerHome'
import SellerPage from '/src/pages/SellerPage'
import DishesPage from '/src/pages/DishesPage'
import ShopCart from '/src/pages/ShopCart'
import OrderHome from '/src/pages/OrderHome'


import SettleHome from '/src/pages/SettleHome'
import MySellerManage from '/src/components/MySellerManage'
import PushDishe from '/src/components/DishesManage/PushDishe'
import ManageDishe from '/src/components/DishesManage/ManageDishe'


const router = new VueRouter({
    routes:[
        //首页
        {
            name:"homepage",
            path:"/",
            component:Home,
        },
        //用户注册
        {
            name:"userregister",
            path:"/userregister",
            component:UserRegister,
            meta:{
                title:'美食城用户注册'
            }
        },
        //用户登录
        {
            name:"userlogin",
            path:"/userlogin",
            component:UserLogin,
            meta:{
                title:'美食城用户登录'
            }
        },
        ,
        //菜品搜索界面
        {
            name:"dishessearch",
            path:"/dishessearch",
            component:DishesSearch,
            meta:{
                title:'菜品搜索结果'
            }
        },,
        //商家搜索界面
        {
            name:"shopsearch",
            path:"/shopsearch",
            component:ShopSearch,
            meta:{
                title:'商家搜索结果'
            }
        },
        //购物车界面
        {
            name:"shopcart",
            path:"/shopcart",
            component:ShopCart,
            meta:{
                isAuth:true,
                title:'我的购物车'
            }
        },
        //订单界面
        {
            name:"orderhome",
            path:"/orderhome",
            component:OrderHome,
            meta:{
                isAuth:true,
                title:'我的订单'
            }
        },
        //结算界面
        {
            name:"settlehome",
            path:"/settlehome",
            component:SettleHome,
            meta:{
                isAuth:true,
                title:'订单结算'
            }
        },
        //商家注册
        {
            name:"sellerregister",
            path:"/sellerregister",
            component:SellerRegister,
        },
        //商家登录
        {
            name:"sellerlogin",
            path:"/sellerlogin",
            component:SellerLogin,
        },
        //商家审核
        {
            name:"sellerregistermessage",
            path:"/sellerregistermessage",
            component:SellerRegisterMessage,
        },
        //商家信息界面
        {
            name:"sellerpage",
            path:"/sellerpage",
            component:SellerPage,
        },
        //菜品信息界面
        {
            name:"dishespage",
            path:"/dishespage",
            component:DishesPage,
        },
        //管理员登录
        {
            name:"adminlogin",
            path:"/adminlogin",
            component:AdminLogin,
        },
        //管理员界面
        {
            name:"adminhome",
            path:"/adminhome",
            component:AdminHome,
            meta:{
                title:'欢迎您！管理员'
            },
            children:[
                {
                    name:"usermanage",
                    path:"/usermanage",
                    component:UserManage,
                },
                {
                    name:"sellermanage",
                    path:"/sellermanage",
                    component:SellerManage,
                    children:[
                        {
                            name:"sellerisPass",
                            path:"sellerisPass",
                            component:SellerIsPass,
                        },
                        {
                            name:"sellerquit",
                            path:"sellerquit",
                            component:SellerQuit,
                        },
                        {
                            name:"sellerdel",
                            path:"sellerdel",
                            component:SellerDel,
                        },
                    ]
                }    
            ]
        },
        //卖家中心
        {
            name:"sellerhome",
            path:"/sellerhome",
            component:SellerHome,
            children:[
                {
                    name:"mysellermanage",
                    path:"mysellermanage",
                    component:MySellerManage,
                },
                {
                    name:"pushdishe",
                    path:"pushdishe",
                    component:PushDishe,
                },
                {
                    name:"managedishe",
                    path:"managedishe",
                    component:ManageDishe,
                },
            ]
        }
    ]
})

// router.beforeEnter((to,from,next)=>{
//     let user=JSON.parse(sessionStorage.getItem('user')) 
//     console.log("我在守卫");
//     if(to.meta.isAuth){
//         if(user){
//             next()
//         }
//         else{
//             next({name:'userlogin'})
//         }
//     }
//     else{
//         next()
//     }

// })
router.beforeEach((to,from,next)=>{
    let user=JSON.parse(sessionStorage.getItem('user')) 
    if(to.meta.isAuth){
        if(user){
            next()
        }
        else{
            next({name:'userlogin'})
        }
    }
    else{
        next()
    }
})
router.afterEach((to,from)=>{
    document.title=to.meta.title || "欢迎来到美食城！！！"
})
export default router