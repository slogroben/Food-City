<template>
  <div>
    <div>
        管理员账户：<input type="text" v-model="rootname">
        <br>
        管理员密码：<input type="password" v-model="rootpassword">
        <br>
        <button @click="rootLogin">登录</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:'AdminLogin',
        data(){
            return {
                rootname:'',
                rootpassword:''
            }
        }
        ,
        methods:{
            rootLogin(){
                axios({
                    method:'get',
                    url:'http://localhost:8080/My/AdminLoginServlet?rootname='+this.rootname+'&rootpassword='+this.rootpassword
                })
                .then(
                    response=>{
                        this.$router.push({name:'adminhome'})
                        console.log("登录成功");
                    },
                    error=>{
                        alert("账号或密码错误")
                        console.log("登录失败");
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>