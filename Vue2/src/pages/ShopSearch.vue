<template>
  <div>
    <Header></Header>
    <Top @getSellerList="getSellerList"></Top>
    <div class="tab" v-if="showSellerList">
        <el-table
            :data="showSellerList"
            style="width: 100%"
            @row-click="inter"
            >
            <el-table-column label="商店图片" width="180">
                <template slot-scope="s">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="img(s.row.imgurl)"
                    fit="fill">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
            prop="shopname"
            label="店铺名"
            >
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import Header from '@/components/home/Header'
import axios from 'axios'
import Top from '@/components/home/Top.vue'
import server from '@/utils/request'
export default {
    name: "ShopSearch",
    data(){
        return{
            sellerList:'',
            showSellerList:''
        }
    },
    components: { Header, Top },
    methods:{
        getSellerList(){
            server.getReq('/seller/getAllSeller').then(
                response=>{
                    this.sellerList=response.data;
                    this.showSellerList=this.sellerList
                    let kw = this.$route.query.kw
                    this.showSellerList=this.showSellerList.filter(s=>{             
                        return s.shopname.indexOf(kw)!=(-1)
                    })
                },
                error=>{
                    this.getSellerList()
                }
            )
        },
         inter(row, event, column){
            this.$router.push({
                name:'sellerpage',
                query:row
            })
        },
        img(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\shopImg\\','')
            return require('@/assets/shopImg/'+imgname)
        }
    },
    mounted(){
        this.getSellerList()
    }
}
</script>

<style scoped>
.tab{
    margin: 0 125px 0 125px;
}
</style>