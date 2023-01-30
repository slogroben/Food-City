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
            <el-table-column label="上传图片">
                <template slot-scope="s">
                    <el-image
                        v-if="s.row.imgurl"
                        style="width: 100px; height: 90px"
                        fit="contain"
                        :src="img(s.row.imgurl)">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="店铺描述"></el-table-column>
            <el-table-column prop="sellerphone" label="店主手机"></el-table-column>
            <el-table-column label="是否取消资格">
                <template slot-scope="s">
                    <el-button type="text" size="small" @click="del(s.row)">取消商家经营资格</el-button>
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
import axios from 'axios'
import server from '@/utils/request'
import { mapState } from 'vuex'
export default {
    name:'SellerDel',
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
        del(s){
            server.getReq('/admin/delSeller?shop_id='+s.shop_id)
                .then(
                    response=>{
                        this.$message({
                            message:'取消商家资格成功',
                            type:"success"
                        })
                        this.getSellerNum()
                        this.getSellerList()
                    },
                    error=>{
                        console.log(error);
                    }
                )
        },
        getSellerList(){
                let offset=(this.pageInfo.page-1)*this.pageInfo.size
                server.getReq('/admin/getOperateShop?limit='+this.pageInfo.size+'&offset='+offset)
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
            server.getReq('/admin/getOperateShopNum')
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