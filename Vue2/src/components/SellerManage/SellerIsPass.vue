<template>
  <div>
    <el-card>
        <el-table
            v-if="sellerList"
            :data="sellerList"
            stripe
            style="width: 100%">
            <el-table-column prop="shop_id" label="店铺id" width="70"></el-table-column>
            <el-table-column prop="shopname" label="店铺名称"></el-table-column>
            <el-table-column prop="area" label="店铺地址"></el-table-column>
            <el-table-column prop="address" label="详细地址"></el-table-column>
            <el-table-column prop="shoptype" label="店铺类型" width="80"></el-table-column>
            <el-table-column prop="state" label="营业状态" width="80"></el-table-column>
            <el-table-column prop="shopphone" label="店铺手机"></el-table-column>
            <el-table-column prop="worktime" label="营业时间"></el-table-column>
            <el-table-column prop="imgurl" label="上传图片">
                <template slot-scope="s">
                    <el-image
                        v-if="s.row.imgurl"
                        style="width: 100px; height: 90px"
                        fit="contain"
                        :src="img(s.row.imgurl)" alt="1">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="店铺描述"></el-table-column>
            <el-table-column prop="sellerphone" label="店主手机"></el-table-column>
            <el-table-column label="是否通过审核">
                <template slot-scope="s">
                    <el-button type="text" size="small" @click="pass(s.row)">允许通过</el-button>
                    <el-button type="text" size="small" @click="reject(s.row)">拒绝通过</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :current-page="pageInfo.page"
            @current-change="handleCurrentChange"
            @prev-click="prevPage"
            @next-click="nextPage"
            style="margin:30px 0 0 350px;"
            :page-size="pageInfo.size"
            background
            layout="total,prev, pager, next,jumper"
            :total="pageInfo.allpage">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import server from '@/utils/request';
import { mapState } from 'vuex';
export default {
    name:'SellerIsPass',
    data(){
        return{
            sellerList:'',
            pageInfo:{
                    page:1,
                    size:4,
                    allpage:9999
                }
        }
    },
    computed:{
        ...mapState(['shopstate'])
    },
    methods:{
            pass(s){
                server.getReq('/admin/reSellerState?shopstate='+this.shopstate.operate+'&shop_id='+s.shop_id)
                .then(
                    response=>{
                        this.getSellerList()
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },
            reject(s){
                server.getReq('/admin/reSellerState?shopstate='+this.shopstate.reject+'&shop_id='+s.shop_id)
                .then(
                    response=>{
                        this.getSellerList()
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },
            getSellerList(){
                let offset=(this.pageInfo.page-1)*this.pageInfo.size
                server.get('/admin/getSellerIsPass?limit='+this.pageInfo.size+'&offset='+offset)
                .then(
                    response=>{
                        this.sellerList=response.data
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },  
            img(path){
                const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\shopImg\\','')
                return require('@/assets/shopImg/'+imgname)
            },
            getSellerNum(){
                server.getReq('/admin/getSellerIsPassNum')
                .then(
                    response=>{
                        this.pageInfo.allpage=response.data.sellerNum
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },
            handleCurrentChange(page){
                this.pageInfo.page=page
                this.getSellerNum()
                this.getSellerList()
            },
            prevPage(page){
                this.pageInfo.page=page
            },
            nextPage(page){
                this.pageInfo.page=page
            }    
    },
    mounted(){
        this.getSellerNum()
        this.getSellerList()
    }
}
</script>

<style scoped>
table tr>th{
    border: 1px solid black;
    border-collapse: collapse;
}
table tr>td{
    border: 1px solid black;
    border-collapse: collapse;
}
</style>