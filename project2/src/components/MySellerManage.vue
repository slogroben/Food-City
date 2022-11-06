<template>
  <div>
    <el-descriptions class="margin-top" title="店铺信息" :column="1" border>
        <template slot="extra">
            <div v-if="mysellermsg.ispass=='true'">
                <el-button type="danger" size="small" v-if="!btnflag" @click="quit" >申请退出</el-button>
                <el-button type="primary" size="small" v-if="btnflag" @click="cancelquit">取消退出</el-button>
            </div>
        </template>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-s-shop"></i>
            店铺名称
        </template>
        {{mysellermsg.shopname}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-s-unfold"></i>
            店铺类型
        </template>
        {{mysellermsg.shoptype}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-location-outline"></i>
            店铺地址
        </template>
        {{mysellermsg.area}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-office-building"></i>
            店铺详细地址
        </template>
        {{mysellermsg.address}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
             <i class="el-icon-alarm-clock"></i>
            店铺营业时间
        </template>
        {{mysellermsg.worktime}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-sell"></i>
            线下门店是否开业
        </template>
        <el-tag size="small">{{mysellermsg.state=="true" ? "是":"否"}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-notebook-2"></i>
            店铺描述
        </template>
        {{mysellermsg.description}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-notebook-2"></i>
            店铺状态
        </template>
        <div v-if="mysellermsg.ispass=='true'">
           <el-tag type="success">已入驻</el-tag>
           <br>
           <el-tag v-if="mysellermsg.shopstate==='operate'" type="success">开业中</el-tag>
           <el-tag v-if="mysellermsg.shopstate==='isquit'" type="danger">正在申请退出</el-tag>
           <el-tag v-if="mysellermsg.shopstate==='quit'" type="danger">申请退出已经批准</el-tag>
        </div>
        <div v-if="mysellermsg.ispass=='false'">
           <el-tag type="danger">未入驻</el-tag>
           <br>
           <el-tag v-if="mysellermsg.shopstate==='review'" type="success">申请入驻审核中</el-tag>
           <el-tag v-if="mysellermsg.shopstate==='isquit'" type="danger">正在申请退出</el-tag>
           <el-tag v-if="mysellermsg.shopstate==='quit'" type="danger">申请退出已经批准</el-tag>
        </div>
        
        </el-descriptions-item>
    </el-descriptions>    
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
    export default {
        name:'MySellerManage',
        data(){
            return{
                mysellermsg:'',
            }
        },
        computed:{
            btnflag(){
                if(this.mysellermsg.shopstate!='isquit'){
                    return false
                }
                else if(this.mysellermsg.shopstate==='isquit'){
                    return true
                }
            }
        },
        methods:{
            quit(){
                axios({
                    method:'get',
                    url:'http://localhost:8080/My/SellerIsQuitServlet?shop_id='+this.mysellermsg.shop_id
                }).then(
                    response=>{
                        sessionStorage.setItem('seller',JSON.stringify(response.data))
                        this.mysellermsg=JSON.parse(sessionStorage.getItem('seller'))
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
                    url:'http://localhost:8080/My/SellerNoQuitServlet?shop_id='+this.mysellermsg.shop_id
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
            },
            getmysellermsg(){
                axios({
                    method:'get',
                    url:'http://localhost:8080/My/SellerIDFindServlet?shop_id='+this.mysellermsg.shop_id,
                    })
                    .then(
                        response=>{
                            sessionStorage.setItem('seller',JSON.stringify(response.data))
                        },
                        error=>{
                            console.log(error);
                        }
                    )
            }
        },
        mounted(){
            this.mysellermsg=JSON.parse(sessionStorage.getItem('seller'))
            this.getmysellermsg()
        }
    }
</script>

<style scoped>

</style>