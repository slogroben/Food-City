<template>
    <div class="body">
        <div class="box1">
            <h1>&emsp;欢迎登录</h1>
            <p style="position: absolute;top:40px;color: gray; margin: 0px 0px 0 30px;">还未注册？<a class="lode" href="#/userregister">注册</a></p>
            <hr>
            <div class="logincharge" v-show="chooseflag">
                <p class="userlogin" style="left: 100px;top:-20px;" @click="userlogin()">账号登录</p>
                <p class="textlogin" style="left: 250px;top:-20px;" @click="textlogin()">短信登录</p>
            </div>
            <div class="logincharge" v-show="!chooseflag">
                <p class="textlogin" style="left: 100px;top:-20px;" @click="userlogin()">账号登录</p>
                <p class="userlogin" style="left: 250px;top:-20px;" @click="textlogin()">短信登录</p>
            </div>
            <div class="userloginbox" v-show="chooseflag">
                <div class="listbox">
                    用户名&emsp;：<input type="text" placeholder="请输入用户名" v-model="username">
                </div>
                <div>
                    密&emsp;码&emsp;：<input type="password" placeholder="请输入密码" v-model="password">
                </div>
                <div>
                    <button class="login" v-show="namebtnflag">登录</button>
                    <button class="activelogin" @click="namelogin" v-show="!namebtnflag">登陆</button>
                </div>
            </div>
            <div class="userloginbox" v-show="!chooseflag">
                <div class="listbox">
                    手机号&emsp;：<input type="text" placeholder="请输入手机号">
                </div>
                <div class="yzbox1">
                    验证码&emsp;：<input class="yz" type="text" placeholder="请输入验证码">
                    <button type="button" class="yzcode">发送验证码</button>
                </div>
                <div>
                    <button class="login" v-show="textbtnflag">登录</button>
                    <button class="activelogin" @click="textlogin" v-show="!textbtnflag">登录</button>
                </div>
            </div>
            <div class="forgetpsw">
                <a href="#" style="float: right;font-size: 15px;">忘记密码?</a>
            </div>
            <div class="checkdiv">
                <input type="checkbox" @click="checkbox($event)" style="width: 13px;height: 13px;position: relative;top: 3px;"/><p style="font-size: 13px;display: inline;">阅读并接受<a href="#">《用户协议》</a>及<a href="#">《隐私权保护声明》</a></p>
            </div>
        </div>
    </div>
</template>

<script>
axios.interceptors.response.use(function (response) {
    const {authorization}=response.headers
    authorization&&localStorage.setItem('token',authorization)
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
import axios from 'axios'
import qs from 'qs'
    export default {
        name:"UserLogin",
        data(){
            return {
                chooseflag:true,
                username:'',
                password:'',
                checkflag:'',
                clickflag:0,
                loginmsg:{
                    username:'',
                    password:'',
                },
                background_img:require('@/assets/background/1.jpg')
            }
        },
        computed:{
            namebtnflag(){
                if(this.username!=''&this.password!=''&this.checkflag==true){
                    return false
                }
                else{
                    return true
                }
            },
            textbtnflag(){
                return true
            }
        },
        methods:{
            textlogin(){
                this.chooseflag=false
                
            },
            userlogin(){
                this.chooseflag=true
            },
            namelogin(){
                this.loginmsg.username=this.username
                this.loginmsg.password=this.password
                if(this.clickflag==0){
                    axios({
                        method:'post',
                        url:'http://localhost:8080/user/login',
                        data:qs.stringify(this.loginmsg),
                    }).then(
                        response=>{
                            this.$router.push({
                                name:'homepage'
                            })
                        },
                        error=>{
                            console.log("请求失败"+error.message);
                        }
                    )
                }
            },
            checkbox(event){
                this.checkflag=event.target.checked
            },
            
        }
    }
</script>

<style scoped>
.body{
    background: url('@/assets/background/1.jpg');
    height: 100%;
    width: 100%;
    position:absolute;
    background-size:100% 100%;
}
.box1{
    position: relative;
    left: 900px;
    width: 450px;
    height: 390px;
    top: 80px;
    background:rgba(255, 255, 255, 0.8);
    border-radius: 20px 20px 20px 20px;
}
.login{
    position: absolute;
    bottom: -80px;
    width: 390px;
    height: 45px;
    border-radius: 30px 30px 30px 30px;
    background-color: #bdcefc;
    border-style:none;
    color: #edeef2;
}
.activelogin{
    position: absolute;
    bottom: -80px;
    width: 390px;
    height: 45px;
    border-radius: 30px 30px 30px 30px;
    background-color: #2e58ff;
    border-style:none;
    color: #edeef2;
}
p{
    font-size: 15px;
}

a{
    border-bottom:none ;
    text-decoration: none;
    color:#4e6ef2;
}
a:active{
    color: #4e6ef2;
}
.checkdiv{
    position: absolute;
    bottom: 20px;
    left: 80px;
    margin: 0 30px 0 0;
}
.logincharge{
    position: relative;
}
.logincharge p{
    position: absolute;
    font-size: 20px;			
}

.userlogin{
    color: black;
    border-bottom:3px solid #4e6ef2;
}
.textlogin{
    color: grey;
    border-bottom:3px solid transparent;
}
.forgetpsw{
    position: absolute;
    right: 0;
    bottom: 100px;
    margin: 0 40px 0 0 ;
}
input{
    width: 300px;
    height: 38px;
    border:1px solid #ffffff ;
    background-color: #ffffff;
    opacity: 1;
    /* border-radius: 7px 7px 7px 7px; */
}
input:focus{
    outline:1px solid;
    border-color: #2e58ff;
}
.userloginbox{
    position: absolute;
    top: 120px;
    margin: 0 30px 0 30px;
}
.listbox{
    margin: 20px 0 30px 0;
}
.yzcode{
        display: block;
        position: absolute;
        text-align: center;
        right: 0px;
        bottom: 7px;
        width: 100px;
        height: 30px;
        font-size: 17px;
        line-height: 16px;
        color: #4e6ef2;
        border: 0;
        border-left: 1px solid grey;
        background-color: #fff;
        cursor: pointer;
        z-index: 100;
}
</style>