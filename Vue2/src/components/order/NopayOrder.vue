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
        
        label="价格">
      </el-table-column>
      <el-table-column
        prop="order_num"
        width="50"
        label="数量">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="o">
            <el-tag v-if="o.row.order_state==$store.state.orderState.noPay" type="danger">未支付</el-tag>
            <el-tag v-if="o.row.order_state==$store.state.orderState.Pay">已支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="下单时间"
        width="160">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="o">
            <div v-if="o.row.order_state==$store.state.orderState.noPay">
                <li>
                    <el-button size="mini" type="success" @click="topay(o.row)">立即支付</el-button>
                </li>
                <li> </li>
                <li>
                    <el-button size="mini" type="danger" @click="del(o.row,'取消成功')">取消订单</el-button>
                </li> 
            </div> 
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="支付" :visible.sync="visible" center>
        <el-button plain>支付宝支付</el-button>
        <el-button plain>微信支付</el-button>
        <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="nopay">取 消</el-button>
            <el-button type="primary" @click="pay">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import qs from "qs"
import server from '@/utils/request'
    export default {
        name:'NopayOrder',
        data(){
            return{
                orderList:'',
                visible:false,
                order_id:''
            }
        },
        methods:{
            getOrder(){
                let state=this.$store.state.orderState.noPay
                server.getReq('/order/find?state='+state).then(
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
                                message: '取消订单成功',
                                type: 'success'
                            });
                    this.getOrder()
                },
                error=>{
                    console.log(error);
                }
            )
            },
            topay(o){
                this.order_id=o.order_id
                this.visible=true
            },
            nopay(){
                this.visible=false
            },
            pay(){
                let state=this.$store.state.orderState.Pay
                server.getReq('/order/restate?order_id='+this.order_id+'&state='+state)
                .then(
                    response=>{
                        this.$message({
                            message: '支付成功',
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