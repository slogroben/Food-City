<template>
    <div class="center_content">
        <!-- <div class="kind"></div> -->
        <div class="swper" v-if="imgList">
            <el-carousel :interval="4000" height="400px">
                <el-carousel-item  v-for="(i,index) in imgList" :key="index">
                    <el-image
                        style="width: 850px; height:400px "
                        :src="i"
                        fit="fill">
                    </el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
        
        <div class="userlogin">
            <div v-if="!user">
                <div>
                    <el-avatar style="margin:40px 0 0 80px;" :size="70" :src="circleUrl"></el-avatar>
                </div>
                <div style="margin:0px 0 0 100px;">
                    <p>Hi!</p>
                    <p>用户</p>
                </div>
                <div class="loginbox">
                    <button @click="login">登录</button>
                    <button @click="register">注册</button>
                </div>
            </div>
            <div v-if="user">
                <div class="headerimg">
                    <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="usernamebox">
                    <p style="color:white">Hi!</p>
                    <p style="font-weight: 900;color:white;font-family: STXinwei;">{{user.username}}</p>
                </div>
                <div>
                    <div class="boxmin" @click="$router.push({name:'shopcart'})">
                        <p>{{num.shopCart}}</p>
                        <el-button type="text">购物车</el-button>
                    </div>
                    <div class="boxmin" @click="$router.push({name:'orderhome',params:{first:'1',activeName:'1-2'}})">
                        <p>{{num.noPay}}</p>
                        <el-button type="text">待支付</el-button>
                    </div>
                    <div class="boxmin" @click="$router.push({name:'orderhome',params:{first:'1',activeName:'1-3'}})">
                        <p>{{num.Pay}}</p>
                        <el-button type="text">已支付</el-button>
                    </div>
                </div>
                <div>
                    <div class="iconbox">
                        <label @click="$router.push({name:'orderhome',params:{first:'2',activeName:'2-1'}})">
                            <i class="el-icon-star-off"></i>
                            <p>菜品收藏</p>
                        </label>
                    </div>
                    <div class="iconbox">
                        <label @click="$router.push({name:'orderhome'})">
                            <i class="el-icon-food"></i>
                            <p>我的订单</p>
                        </label>
                    </div>
                    <div class="iconbox">
                        <label @click="$router.push({name:'orderhome',params:{first:'2',activeName:'2-2'}})">
                            <i class="el-icon-s-shop"></i>
                            <p>店铺收藏</p>
                        </label>
                    </div>
                    <div class="iconbox">
                        <label @click="myMoney">
                            <i class="el-icon-wallet"></i>
                            <p>我的钱包</p>
                        </label>
                    </div>
                </div>
                <div>
                    <div class="text">
                        <h4 style="color:white"><i class="el-icon-chat-dot-square"></i>今日语录</h4>
                        <div v-if="textflag" @click="getText">
                            <p v-if="text" style="color:white;font-family: STKaiti;">{{text}}</p>
                            <p v-if="!text" style="color:red;font-family: STKaiti;">加载错误，请检查网络</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import server from '@/utils/request'
    export default {
        name:'CenterBox',
        data(){
            return {
                text:'',
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                imgList:'',
                textflag:false,
            }
        },
        computed:{
            user(){
                if(this.$store.state.user){
                    this.getText()
                    this.$store.dispatch('getOrderNum')
                }
                return this.$store.state.user
            },
            num(){
                return this.$store.state.num
            },
            boxflag(){
                if(this.$store.state.user){
                    return true
                }
                return false     
            }
        }
        ,
        methods:{
            login(){
                this.$router.push({name:'userlogin'})
            },
            register(){
                this.$router.push({name:'userregister'})
            },
            getText(){
                axios({
                    method:'get',
                    url:'https://api.mcloc.cn/words'
                }).then(
                    response=>{
                        this.text=response.data
                        this.textflag=true
                    },
                    error=>{
                        this.text=false
                        this.textflag=true
                    }
                )
            },
            myMoney(){
                this.$message({
                        message: '功能未实现，敬请期待',
                        type: 'error'
                    });
            }
        },
        mounted(){
            this.imgList=[
                require("@/assets/swip/1.jpg"),
                require("@/assets/swip/2.jpg"),
                require("@/assets/swip/3.jpg"),
                require("@/assets/swip/4.jpg"),
                require("@/assets/swip/5.jpg"),
                require("@/assets/swip/6.jpg"),
            ]
            
        }
    }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<style scoped>
li{
    list-style: none;
    display: inline-block;
}
.center_content{
    background-image: url('@/assets/background/9.jpg');
    height: 100%;
    width: 100%;
    background-size:100% 100%;
    position: relative;
    left: 125px;
    width: 1200px;
    height: 600px;
    border-radius: 30px 30px 0px 0px;
}
/* .kind{
    position: absolute;
    left: 25px;
    top: 100px;
    background-color: bisque;
    width: 250px;
    height: 400px;
} */
.swper{
    position: absolute;
    left: 25px;
    top: 100px;
    box-shadow:3px 0 8px -4px #ffffff;
    width: 850px;
    height: 400px;
}
.userlogin{
    background-image: url('@/assets/background/8.jpg');
    height: 100%;
    width: 100%;
    background-size:100% 100%;
    position: absolute;
    right: 25px;
    top: 100px;
    /* color: white; */
    background-color:khaki;
    width: 250px;
    height: 400px;
} 
.usernamebox{
    position: absolute;
    display:inline-block;
    top: 10px;
    left: 90px;
}
.headerimg{
    position: absolute;
    top: 30px;
    left: 30px;
}
.loginbox{
    position: absolute;
    bottom: 50px;
}
.loginbox button{
    font-size: 20px;
    font-weight: 500;
    border: none;
    margin: 20px 25px 10px 25px;
    border-radius: 7px 7px 7px 7px;
    width: 200px;
    height: 50px;
}
.loginbox button:hover{
    background-color: gray;
}
.boxmin{
    width: 50px;
    height: 65px;
    margin: 120px 15px 0 17px;
    float: left;
}
.boxmin p{
    text-align: center;
    color: red;
    margin: 0 0 0 0;
    font-size: 20px;
    font-weight: 800;
}
.iconbox{
    width: 60px;
    height: 60px;
    margin: 20px 0 0 2px;
    float: left;
}
.iconbox i{
    font-size: 40px;
    margin: 0  10px 0 10px ;
}
.iconbox p{
    font-size: 12px;
    margin: 0  0 0 5px ;
}
.iconbox:hover{
    color: crimson;
}
.text{
    position: absolute;
    top: 260px;
    margin: 0 0 0 10px ;
}
</style>