<template>
     <div>
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
                        style="width: 100px; height: 100px"
                        fit="contain"
                        :src="img(s.row.imgurl)">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="店铺描述"></el-table-column>
            <el-table-column prop="sellerphone" label="店主手机"></el-table-column>
            <el-table-column label="是否通过审核">
                <template slot-scope="s">
                    <el-button type="text" size="small" @click="quitpass(s.row)">允许退出</el-button>
                    <el-button type="text" size="small" @click="quitreject(s.row)">拒绝退出</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-if="pageInfo.allpage"
            :current-page="pageInfo.page"
            @current-change="handleCurrentChange"
            @prev-click="prevPage"
            @next-click="nextPage"
            :page-size="pageInfo.size"
            background
            layout="total,prev, pager, next,jumper"
            :total="pageInfo.allpage">
        </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import server from '@/utils/request'
import { mapState } from 'vuex'
export default {
    name:'SellerQuit',
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
        quitpass(s){
            server.getReq('/admin/reSellerState?shopstate='+this.shopstate.quit+'&shop_id='+s.shop_id)
                .then(
                    response=>{
                        this.getSellerList()
                    },
                    error=>{
                        console.log(error);
                    }
                )
        },
        quitreject(s){
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
        getSellerList(){
                let offset=(this.pageInfo.page-1)*this.pageInfo.size
                server.getReq('/admin/getSellerIsQuit?limit='+this.pageInfo.size+'&offset='+offset)
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
            server.getReq('/admin/getSellerIsQuitNum')
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
        this.getSellerList()
        this.getSellerNum()
    }
}
</script>

<style scoped>

</style>