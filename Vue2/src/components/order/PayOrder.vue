<template>
  <div>
    <el-table
      v-if="orderList"
      :data="orderList"
      style="width: 100%">
      <el-table-column width="150" label="图片">
        <template slot-scope="o">
            <el-image
                v-if="o.row.order_img1"
                style="width: 100px; height: 100px"
                :src="img(o.row.order_img1)"
                @click="$emit('godishe',o.row)"
                fit="cover">
            </el-image>
        </template>
      </el-table-column>
        <el-table-column
          width="180"
          label="菜品名">
          <template slot-scope="o">
            <div @click="$emit('godishe',o.row)">{{o.row.order_title}}</div>
        </template>
        </el-table-column>
      <el-table-column
        prop="order_price"
        sortable
        label="价格">
      </el-table-column>
      <el-table-column
        prop="order_num"
        width="50"
        label="数量">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="o">
            <el-tag v-if="o.row.order_state==$store.state.orderState.Pay">已支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="下单时间"
        sortable
        width="160">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="o">
            <div v-if="o.row.order_state==$store.state.orderState.Pay">
                <li>
                    <el-button size="mini" type="warning" @click="finish(o.row)">立即收货</el-button>
                </li>
                <li></li>
                <li>
                    <el-button size="mini" type="danger" @click="del(o.row)">取消订单</el-button>
                </li>  
            </div> 
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
        name:'PayOrder',
        data(){
            return{
                orderList:'',
            }
        },
        methods:{
            getOrder(){
                let state=this.$store.state.orderState.Pay
                let token=localStorage.getItem('token')
                server.getReq('/order/find?state='+state)
                .then(
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
                server.getReq('/order/delete?order_id='+o.order_id)
                .then(
                response=>{
                  this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getOrder()
                    this.getOrder()
                },
                error=>{
                    console.log(error);
                }
            )
            },
            finish(o){
                let state=this.$store.state.orderState.finish
                server.getReq('/order/restate?order_id='+o.order_id+'&state='+state)
                .then(
                    response=>{
                        this.$message({
                            message: '收货成功',
                            type: 'success'
                        });
                        this.getOrder()
                        this.visible=false
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