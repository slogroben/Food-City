<template>
  <div v-if="seller">
    <el-descriptions class="margin-top" title="店铺信息" :column="1" border>
        <template slot="extra">
            <div v-if="seller.ispass">
                <el-button type="danger" size="small" v-if="!btnflag" @click="quit" >申请退出</el-button>
                <el-button type="primary" size="small" v-if="btnflag" @click="cancelquit">取消退出</el-button>
            </div>
        </template>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-s-shop"></i>
            店铺名称
        </template>
        {{seller.shopname}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-s-unfold"></i>
            店铺类型
        </template>
        {{seller.shoptype}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-location-outline"></i>
            店铺地址
        </template>
        {{seller.area}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-office-building"></i>
            店铺详细地址
        </template>
        {{seller.address}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
             <i class="el-icon-alarm-clock"></i>
            店铺营业时间
        </template>
        {{seller.worktime}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-sell"></i>
            线下门店是否开业
        </template>
        <el-tag size="small">{{seller.state=="true" ? "是":"否"}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-notebook-2"></i>
            店铺描述
        </template>
        {{seller.description}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-notebook-2"></i>
            店铺状态
        </template>
        <div v-if="seller.ispass">
           <el-tag type="success">已入驻</el-tag>
           <br>
           <el-tag v-if="seller.shopstate==shopstate.operate" type="success">开业中</el-tag>
           <el-tag v-if="seller.shopstate==shopstate.isquit" type="danger">正在申请退出</el-tag>
           <el-tag v-if="seller.shopstate==shopstate.quit" type="danger">申请退出已经批准</el-tag>
        </div>
        <div v-if="!seller.ispass">
           <el-tag type="danger">未入驻</el-tag>
           <br>
           <el-tag v-if="seller.shopstate==shopstate.review" type="success">申请入驻审核中</el-tag>
           <el-tag v-if="seller.shopstate==shopstate.isquit" type="danger">正在申请退出</el-tag>
           <el-tag v-if="seller.shopstate==shopstate.quit" type="danger">申请退出已经批准</el-tag>
        </div>
        
        </el-descriptions-item>
    </el-descriptions>    
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { mapState } from 'vuex'
    export default {
        name:'MySellerManage',
        data(){
            return{
                
            }
        },
        computed:{
            btnflag(){
                if(this.seller.shopstate!=this.shopstate.isquit){
                    return false
                }
                else if(this.seller.shopstate===this.shopstate.isquit){
                    return true
                }
            },
            ...mapState(['seller','shopstate'])
        },
        methods:{
            quit(){
                axios({
                    method:'get',
                    url:'http://localhost:8080/My/SellerIsQuitServlet?shop_id='+this.seller.shop_id
                }).then(
                    response=>{
                        sessionStorage.setItem('seller',JSON.stringify(response.data))
                        this.seller=JSON.parse(sessionStorage.getItem('seller'))
                        this.$router.go()
                        
                    },
                    error=>{
                        console.log("请求失败");
                    }
                )
            },
            cancelquit(){
                axios({
                    method:'get',
                    url:'http://localhost:8080/My/SellerNoQuitServlet?shop_id='+this.seller.shop_id
                }).then(
                    response=>{
                        sessionStorage.setItem('seller',JSON.stringify(response.data) )
                        this.mysellermsg=JSON.parse(sessionStorage.getItem('seller'))
                        this.$router.go()
                    },
                    error=>{
                        console.log("请求失败");
                    }
                )
            },
            img(path){
                const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\shopImg\\','')
                return require('@/assets/shopImg/'+imgname)
            }
        },
        mounted(){
        }
    }
</script>

<style scoped>

</style>