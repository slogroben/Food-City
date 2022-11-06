<template>
  <div>
    <el-table
      v-if="orderList"
      :data="orderList"
      style="width: 100%">
      <el-table-column width="180" label="图片">
        <template slot-scope="o">
            <el-image
                v-if="o.row.order_img1"
                style="width: 100px; height: 100px"
                :src="img(o.row.order_img1)"
                fit="cover">
            </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_title"
        width="180"
        label="菜品名">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="order_num"
        label="数量">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="o">
            <el-tag v-if="o.row.order_state=='nopay'" type="danger">未支付</el-tag>
            <el-tag v-if="o.row.order_state=='pay'">已支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="o">
            <el-button type="text" @click="del(o.row)">删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import qs from "qs"
    export default {
        name:'AllOrder',
        data(){
            return{
                orderList:'',
            }
        },
        methods:{
            getOrder(){
                let user_id=JSON.parse(sessionStorage.getItem("user")).id
                axios({
                    method:"get",
                    url:'http://localhost:8080/My/FindIDServlet?user_id='+user_id
                }).then(
                response=>{
                    this.orderList=response.data
                },
                error=>{
                    console.log(error);
                }
            )
            },
            img(path){
                const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\upload\\','')
                return require('@/assets/upload/'+imgname)
            },
            del(o){
                axios({
                    method:"post",
                    url:'http://localhost:8080/My/OrderDelServlet',
                    data:qs.stringify(o)
                }).then(
                response=>{
                    this.getOrder()
                },
                error=>{
                    console.log(error);
                }
            )
            }
        },
        mounted(){
            this.getOrder()
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