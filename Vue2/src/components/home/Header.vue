<template>
    <div class="header">
            <div class="header_left">
                    <div>
                        <i class="el-icon-map-location"></i>
                        城市
                    </div>
                    <div v-if="user">
                        <div>欢迎您！用户{{user.username}}</div>
                        <el-button type="text" @click="exitlogin">退出登录</el-button>
                    </div>
                    <div v-if="!user">
                            <router-link :to="{name:'userlogin'}">立即登录</router-link>
                            <router-link :to="{name:'userregister'}">注册</router-link>
                    </div>
            </div>
            <div class="header_right">
                <ul>
                    <div>
                        <router-link :to="{name:'homepage'}">
                            <label>
                                <i class="el-icon-discount"></i>
                                首页
                            </label>
                        </router-link>
                    </div>
                    <div>
                        <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <label style="color: #4e6ef2;">
                               <i class="el-icon-user"></i>
                                我的 
                            </label> 
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="myOrder">我的订单</el-dropdown-item>
                            <el-dropdown-item command="usermsg">账户信息</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>                        
                    </div>
                    <div>
                        <router-link :to="{name:'shopcart'}">
                            <label>
                                <i class="el-icon-shopping-cart-1"></i>
                                购物车
                            </label>
                        </router-link>
                    </div>  
                    <div>
                        <label>
                            <el-button type="text" @click="judgeType"><i class="el-icon-s-shop"></i>卖家中心</el-button>
                        </label>
                    </div>
                        
                </ul>
            </div>  
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
    export default {
        name:'Header',
        data(){
            return{
                dialogVisible:false,
            }
        },
        computed:{
            ...mapState(['seller','shopstate','userType']),
            user(){
                return this.$store.state.user
            }
        },
        methods:{
            handleCommand(command) {
                if(command=="myOrder"){
                    this.$router.push({name:'orderhome'})
                }
                if(command=="usermsg"){
                    if(!this.user){
                        this.$router.push({name:'userlogin'})
                    }
                   this.dialogVisible=true
                }
            },
            exitlogin(){
                localStorage.removeItem('token')
                this.$router.go()
            },
            judgeType(){
                if(this.user){
                    if(this.user.type==this.$store.state.userType.seller){
                        this.$router.push({name:'sellerhome'})                  
                    }
                    if(this.user.type==this.$store.state.userType.Normal){
                        this.$router.push({name:'sellerregister'})
                    }
                    if(this.user.type==this.$store.state.userType.root){
                        this.$message({
                            message:'管理员无需开店',
                            type:'waring'
                        })
                    }
                }else{
                    this.$router.push({name:'userlogin'})
                }
            }
        },
        mounted(){
            let token=localStorage.getItem('token')
            this.$store.dispatch('checkUser',token)
        }
    }
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: black;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.header{
    position: relative;
    left:0px;
    right: 0;
    top: -8px;
    display: inline-block;
    background-color: yellow;
    width: 100%;
    height: 40px;
}
.header_left{
    position: absolute;
    left: 20px;
    top: 12px;
    width: auto;
    height: 40px;
}
.header_right{
    position:relative;
    left: 70vw;
    top: -5px;
    width: auto;
    height: 40px;
}
.header div{
    display: inline-block;
    margin: 0px 10px 0px 10px;
    
}
button{
    border: none;
}
a{
    border-bottom:none ;
    text-decoration: none;
    color: black;
    color:#4e6ef2;
}
a:active{
    color: #4e6ef2;
}
.imgbox {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    position: relative;
    width: 178px;
    height: 178px;
    text-align:center;
    line-height:188px;
    font-size: 50px;
  }
.imgbox:hover {
    border-color: #409EFF;
  }
  .img{
    width: 178px;
    height: 178px;
  }
</style>