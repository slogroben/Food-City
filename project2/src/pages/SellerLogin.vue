<template>
<div class="body">
    <div class="box1">
        <h1>&emsp;商家登录</h1>
        <p style="position: absolute;top:60px;color: gray; margin: 0px 0px 0 30px;">还未开通店铺？<router-link active-class="lode" :to="{name:'sellerregister'}">开通店铺</router-link></p>
        <hr>
        <div class="phonebox">
            手机号码：<input v-model="phone" @blur="rephone" type="text"  placeholder="请输入手机号码" ref="phoneinput">
        </div>
        <div class="phoneErr">
            <span v-if="phoneflag=='null'">！手机号码为空</span>
            <span v-if="phoneflag=='error'">！手机号码格式错误</span>
            <span v-if="phoneflag=='noregister'">！该手机号码并未注册</span>
        </div>
        <div class="captchabox1">
            
            验证码&emsp;：<input v-model="captcha" @blur="recaptcha" class="captcha" type="text" placeholder="请输入验证码">
            <img src="http://localhost:8080/My/CaptchaServlet" class="captchaSent" alt="图片未加载" @click="reflash($event)">
            <!-- <button type="button" class="captchaSent" @click="sentcaptcha($event)">发送验证码</button> -->
        </div>
        <div class="captchaErr">
            <span v-if="captchaflag=='null'">！验证码为空</span>
            <span v-if="captchaflag=='error'">！验证码错误</span>
        </div>
        <div>
            <button class="register" v-show="!btnflag">登录</button>
            <button class="activeRegister" @click="login" v-show="btnflag">登录</button>
        </div>
        <div class="footbox">
            <input type="checkbox" @click="checkbox($event)" style="width: 13px;height: 13px;position: relative;top: 3px;  "/>
            <p style="font-size: 13px;display: inline;">已阅读并同意以下协议<a href="#">平台服务协议</a>、<a href="#">隐私权政策</a>、<a href="#">法律声明</a>、<a href="#">服务协议</a>、<a href="#">隐私权政策</a>、<a href="#">卖家服务协议</a>、<a href="#">消费者保障服务协议</a>、<a href="#">支付服务协议</a></p>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
    export default {
        name:'SellerRegister',
        data(){
            return{
                phone:'',
                captcha:'',
                checkflag:false,
                captchaflag:'',
                sentcaptchaflag:0,
                phoneflag:'',
                iscaptcha:false,
            }
        },
        computed:{
            btnflag(){
                if(this.phoneflag=='right'&this.captchaflag=='right'&this.checkflag){
                    return true
                }else{
                    return false
                }
            },
        },
        methods:{
            //登录
            login(){
                axios({
                    method:'get',
                    url:'http://localhost:8080/My/SellerLoginServlet?sellerphone='+this.phone,
                    })
                    .then(
                        response=>{
                            sessionStorage.setItem('seller',JSON.stringify(response.data))
                            this.$router.push({name:'sellerhome'})
                        },
                        error=>{
                            console.log(error);
                        }
                    )
            },
            //验证手机号
            rephone(){
                const re = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
                if(!re.test(this.phone)){
                    this.phoneflag='error'
                }
                else{
                    axios({
                        method:'get',
                        url:'http://localhost:8080/My/SellerIsRegisterServlet?sellerphone='+this.phone
                    }).then(
                        response=>{
                            if(response.data){
                                this.phoneflag='right'
                            }
                        },
                        error=>{
                            this.phoneflag='noregister'
                        }
                    )
                }
                if(!this.phone.trim()){
                    this.phoneflag='null'
                }
            },
            //校验验证码
            recaptcha(){
                this.getcaptcha()
            },
            //向服务器校验验证码
            getcaptcha(){
                axios({
                    method:'get',
                    url:'http://localhost:8080/My/getCaptchaServlet?captcha='+this.captcha,
                    withCredentials: true
                     }).then(
                    response=>{
                        if(response.data){
                            this.captchaflag='right'
                        }
                        else{
                            this.captchaflag='error'
                        }
                        if(!this.captcha.trim()){
                            this.captchaflag='null'
                        }
                    },
                    error=>{
                        console.log("验证码获取失败"+error.message);
                    }
                )
            },
            //刷新验证码
            reflash(event){
                let time=new Date().getTime()
                event.target.src="http://localhost:8080/My/CaptchaServlet?time="+time
            },
            //判断是否勾选协议
            checkbox(event){
                this.checkflag=event.target.checked
            },
            
            // 发送验证码
            // sentcaptcha(event){
            //     if(!this.phone.trim()){
            //         this.$refs.phoneinput.style.outline='3px solid red';
            //         setTimeout(() => {
            //             this.$refs.phoneinput.style.outline='';
            //         }, 2000);
            //         this.$refs.phoneinput.focus()
            //         this.$refs.phoneinput.blur()
            //         return
            //     }
            //     if(this.sentcaptchaflag==0){
            //         this.sentcaptchaflag=1
            //         let i = 0
            //         const timer=setInterval(() => {
            //         i+=1000
            //         event.target.innerHTML=`再次发送(${(60000-i)/1000})`
            //         event.target.style.color='gray'
            //         if(i>=60000){
            //             this.sentcaptchaflag=0
            //             localStorage.removeItem(this.phone)
            //             clearInterval(timer)
            //             event.target.innerHTML=`发送验证码`
            //             event.target.style.color='#2e58ff'
            //         }
            //     }, 1000+i);
            //         this.getcaptcha()
            //     }  
            // }
        },
        mounted(){
        }
    }
</script>

<style scoped>
.body{
    background: url('@/assets/background/9.jpg');
    height: 100%;
    width: 100%;
    position:absolute;
    background-size:100% 100%;
}
.box1{
    position: relative;
    float: right;
    width: 450px;
    height: 380px;
    top: 80px;
    background:rgba(255, 255, 255, 0.8);
    border-radius: 20px 20px 20px 20px;
}
.register{
    position: absolute;
    margin: 0 30px 0 30px;
    bottom: 100px;
    width: 390px;
    height: 45px;
    border-radius: 30px 30px 30px 30px;
    background-color: #bdcefc;
    border-style:none;
    color: #edeef2;
}
.activeRegister{
    position: absolute;
    margin: 0 30px 0 30px;
    bottom: 100px;
    width: 390px;
    height: 45px;
    border-radius: 30px 30px 30px 30px;
    background-color: #2e58ff;
    border-style:none;
    color: #edeef2;
}
.box1 input[type="text"]{
    width: 300px;
    height: 38px;
    border:1px solid #ffffff ;
    background-color: #ffffff;
    /* border-radius: 7px 7px 7px 7px; */
}
.box1 input[type="text"]:focus{
    outline:2px solid #4e6ef2;
}
p{
    font-size: 15px;
}
.captchabox1{
    position: relative;
    top: 80px;
    margin: 0px 30px 0 30px;
}

.captchaSent{
        display: block;
        position: absolute;
        text-align: center;
        right: 10px;
        bottom: 7px;
        width: 120px;
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
a{
    border-bottom:none ;
    text-decoration: none;
    color:#4e6ef2;
}
a:active{
    color: #4e6ef2;
}
.footbox{
    position: absolute;
    margin: 0px 30px 0 30px;
    bottom: 20px;
}
.phonebox{
    position: absolute;
    top: 110px;
    margin: 0px 30px 0 30px;
}
.phoneErr{
    position: absolute;
    top: 150px;
    margin: 0 30px 0 108px ;
    
}
span{
    font-size: 13px;
    color: red;
}
.captchaErr{
    position: absolute;
    top: 212px;
    margin: 0 30px 0 108px ;
}
</style>