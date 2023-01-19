<template>
    <div class="body">
    <div class="box1">
                <br>
                <h1>&emsp;欢迎注册</h1>
                <p style="position: absolute;top:85px;color: gray; margin: 0px 0px 0 30px;">已经有账号了？<a class="lode" href="#/userlogin">登录</a></p>
                <br>
                <br>
                <div class="listbox" style="top:150px">用户名&emsp;：<input @blur="username($event)" type="text" placeholder="请输入用户名"></div>
                <div class="msgbox" style="top:193px">
                    <span class="rightmsg" v-if="usernameflag=='y'">√ 用户名正确</span>
                    <span class="errmsg" v-if="usernameflag=='n'">!请输入正确的用户名（由6到16位英文和数字组成）</span>
                </div>
                <div class="listbox" style="top:210px">密&emsp;码&emsp;：<input @blur="password($event)" v-model="spassword" type="password" placeholder="请输入密码"></div>
                <div class="msgbox" style="top:253px">
                    <span class="rightmsg" v-if="passwordflag=='y'">√ 密码格式正确</span>
                    <span class="errmsg" v-if="passwordflag=='n'">!密码需要以字母开头，由6~16个字母、数字和下划线组成</span>
                </div>
                <div class="listbox" style="top:270px">确认密码：<input @blur="rightpassword($event)" type="password" placeholder="请再次输入密码"></div>
                <div class="msgbox" style="top:313px">
                    <span class="rightmsg" v-if="rightpasswordflag=='y'">√ 密码一致</span>
                    <span class="errmsg" v-if="rightpasswordflag=='n'">!密码不一致</span>
                    <span class="errmsg" v-if="rightpasswordflag=='null'">!密码未填写</span>
                </div>
                <div class="listbox" style="top:330px">手机号码：<input @blur="phone($event)" type="text" placeholder="请输入手机号码"></div>
                <div class="msgbox" style="top:373px">
                    <span class="rightmsg" v-if="phoneflag=='y'">√ 手机号码正确</span>
                    <span class="errmsg" v-if="phoneflag=='n'">!请输入正确的手机号码</span>
                </div>
                <div class="yzbox1">
                    验证码&emsp;：<input @blur="captcha($event),getcaptcha($event)" class="yz" type="text" placeholder="请输入验证码">
                    <img :src=captchaUrl class="captchaSent" alt="图片未加载" @click="reflash($event)">
                </div>
                <div class="msgbox" style="top:433px">
                    <span class="rightmsg" v-if="captchaflag===this.$store.state.stateCode.success">√ 验证码正确</span>
                    <span class="errmsg" v-if="captchaflag===this.$store.state.stateCode.error">!验证码错误</span>
                    <span class="errmsg" v-if="captchaflag==='null'">!验证码为空</span>
                </div>
                <div>
                    <button class="register"  v-show="!btnflag">注册</button>
                    <button class="activeRegister" v-show="btnflag" @click="register">注册</button>
                </div>
                <div style="position: absolute;left: 50px;bottom: 40px;">
                    <input type="checkbox" @click="checkbox" style="width: 13px;height: 13px;position: relative;top: 3px;"/><p style="font-size: 13px;display: inline;">阅读并接受<a href="#">《用户协议》</a>及<a href="#">《隐私权保护声明》</a></p>
                </div>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import server from '@/utils/request'
export default {
    name:"UserRegister",
    data(){
        return {
            usernameflag:'',
            passwordflag:'',
            rightpasswordflag:'',
            phoneflag:'',
            captchaflag:'',
            checkboxflag:false,
            spassword:'',
            userList:{
                username:'',
                password:'',
                phone:'',
                captcha:''
            },
            clickflag:0
        }
    },
    computed:{
        btnflag(){
            if(this.usernameflag=='y'&&this.passwordflag=='y'&&this.rightpasswordflag=='y'&&this.phoneflag=='y'&&this.captchaflag==''&&this.checkboxflag){
                return true
            }
            else{
                return false
            }
        },
        captchaUrl(){
            console.log(server.getUri()+'captcha/img');
            return server.getUri()+'captcha/img'
        }
    },
    methods:{
        username(event){
            const re=/^[a-zA-z][a-zA-Z0-9]{6,16}$/
            if(re.test(event.target.value)){
                this.userList.username=event.target.value
                this.usernameflag='y'
            }
            else{
                this.usernameflag='n'
            }
            
        },
        password(event){
            const re=/^[a-zA-Z]\w{6,16}$/
            if(re.test(event.target.value)){
                this.passwordflag='y'
            }
            else{
                this.passwordflag='n'
            }
        },
        rightpassword(event){
            if(this.spassword==''){
                this.rightpasswordflag='null'
                return
            }
            if(this.spassword===event.target.value){
                this.userList.password=event.target.value
                this.rightpasswordflag='y'
            }
            else{
                this.rightpasswordflag='n'
            }
        },
        phone(event){
            const re=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            if(re.test(event.target.value)){
                this.userList.phone=event.target.value            
                this.phoneflag='y'
            }
            else{
                this.phoneflag='n'
            }
        },
        captcha(event){
            this.userList.captcha=event.target.value
        },
        checkbox(event){
            this.checkboxflag=event.target.checked
        },
        register(){
            if(this.clickflag===0){
                this.clickflag=1
                server.getReq({
                    method:'post',
                    url:'http://localhost:8080/My/UserRegisterServlet', 
                    data:qs.stringify(this.userList)
                }).then(
                    response=>{
                        // this.$store.commit('RegisterJoup',response.data)
                        this.clickflag=0
                        
                        this.$message({
                            message: '注册成功，请登录',
                            type: 'success'
                        })
                        setTimeout(() => {
                            this.$router.push({name:'userlogin'})
                        }, 1500); 
                        
                    },
                    error=>{
                        console.log('请求失败'+error.message);
                        this.clickflag=0
                    }
                )
            }

        },
        reflash(event){
                let time=new Date().getTime()
                event.target.src=this.captchaUrl+'?time='+time
            },
        getcaptcha(){
                if(!this.userList.captcha.trim()){
                    this.captchaflag='null'
                    return
                }
                server.getReq('/captcha/verify?captcha='+this.userList.captcha).then(
                    response=>{
                        if(response.data){
                            this.captchaflag=response.data.state
                        }
                    },
                    error=>{
                        console.log("验证码获取失败"+error.message);
                    }
                )
            }
    }
}
</script>

<!-- <style>
body{
    background-color:black;
}
</style> -->
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
    height: 600px;
    top: 80px;
    background:rgba(255, 255, 255, 0.8);
    border-radius: 20px 20px 20px 20px;
}
.register{
    position: absolute;
    left: 20px;
    bottom: 80px;
    width: 400px;
    height: 45px;
    border-radius: 30px 30px 30px 30px;
    background-color: #bdcefc;
    border-style:none;
    color: #edeef2;
}
.activeRegister{
    position: absolute;
    left: 20px;
    bottom: 80px;
    width: 400px;
    height: 45px;
    border-radius: 30px 30px 30px 30px;
    background-color: #2e58ff;
    border-style:none;
    color: #edeef2;
}
.box1 input{
    width: 300px;
    height: 38px;
    border:1px solid #ffffff ;
    background-color: #ffffff;
    opacity: 1;
    /* border-radius: 7px 7px 7px 7px; */
}
.box1 input:focus{
    outline:1px solid;
    border-color: #2e58ff;
}
p{
    font-size: 15px;
}
.yzbox1{
    position: relative;
    top:245px;
    margin: 0px 0px 0 30px;
}

.captchaSent{
        display: block;
        position: absolute;
        text-align: center;
        right: 50px;
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
.msgbox{
    position: absolute;
    font-size: 12px;
    margin: 0px 0px 0 110px;
}
.rightmsg{
    color: rgb(34, 192, 34);
}
.errmsg{
    color: red;
}
.listbox{
    position: absolute;
    margin: 0px 0px 0 30px;
}
</style>