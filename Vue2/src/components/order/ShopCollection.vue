<template>
  <div>
    <el-table
      v-if="shoplist"
      :data="shoplist"
      style="width: 100%">
      <el-table-column width="300" label="图片">
        <template slot-scope="d">
            <el-image
                v-if="d.row.imgurl"
                style="width: 100px; height: 100px"
                :src="img1(d.row.imgurl)"
                @click="$emit('goshop',d.row)"
                fit="cover">
            </el-image>
        </template>
      </el-table-column>
      <el-table-column
        width="300"
        label="店铺名">
        <template slot-scope="s">
            <div @click="$emit('goshop',s.row)">{{s.row.shopname}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="d">
            <el-button type="text" @click="cancel(d.row)">取消收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import qs from "qs"
import server from '@/utils/request'
    export default {
        name:'ShopCollection',
        data(){
            return{
                shoplist:'',
                visible:false,
                order_id:''
            }
        },
        methods:{
            getShopList(){
                server.getReq('/user/ShopCollectionAll').then(
                response=>{     
                    this.shoplist=response.data
                },
                error=>{
                    console.log(error);
                }
            )
            },
            img1(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\shopImg\\','')
            return require('@/assets/shopImg/'+imgname)
            },
            cancel(d){
                server.getReq('/user/ShopCollectionDel?shop_id='+d.shop_id)
                .then(
                    response=>{
                        if(response.data.state==this.$store.state.stateCode.success){
                            this.$message({
                                message: '取消收藏成功',
                                type: 'success'
                            });
                            this.getShopList()
                        }
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },
        },
        mounted(){
            this.getShopList()
        }
    }
</script>

<style scoped>
li{
    list-style: none;
    display: inline-block;
    margin: 0 10px 0 0;
}
.order{
    border: 1px solid black;
    margin: 10px 0 0 0;
}
</style>