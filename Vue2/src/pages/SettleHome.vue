<template>
  <div>
    <div>
        <Header></Header>
        <p>确认订单信息</p>
        <hr>
        <div class="buycarheader">
        <el-table
            v-if="settleList"
            :data="settleList"
            stripe
            show-summary
            style="width: 100%">
            <el-table-column label="图片" width="180">   
                <template slot-scope="o">
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="img(o.row.order_img1)"
                        fit="fill">
                    </el-image>    
                </template>                  
            </el-table-column>
            <el-table-column prop="order_title" label="商品名" width="280"></el-table-column>
            <el-table-column label="单价（单位：元）">
                <template slot-scope="o">
                    {{o.row.order_price+'元'}}
                </template>
            </el-table-column>
            <el-table-column prop="order_num" label="数量">
                <template slot-scope="o">
                    {{o.row.order_num}}
                </template>
            </el-table-column>
            <el-table-column prop="sum" label="总价（单位：元）" width="150px">
                <template slot-scope="o">
                    {{o.row.order_price*o.row.order_num}}
                </template>
            </el-table-column>
        </el-table>            
        <el-button style="float: right;margin:20px 20px 0 0 ;" @click="topay" type="primary">去支付</el-button>  
        </div>
        <el-dialog title="支付" :visible.sync="visible" center>
            <el-button plain>支付宝支付</el-button>
            <el-button plain>微信支付</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="nopay">取 消</el-button>
                <el-button type="primary" @click="pay">确 定</el-button>
            </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import axios from 'axios';
import qs from "qs"
import server from '@/utils/request';
export default {
  components: { Header, Footer },
    name:'SettleHome',
    data(){
        return{
           settleList:"",
           sum:0,
           visible:false
        }
    },
    methods:{
        img(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\upload\\','')
            return require('@/assets/upload/'+imgname)
        },
        restate(id,restate){
                let token=localStorage.getItem('token')
                server.getReq('/order/restate?order_id='+id+'&state='+restate)
                .then(
                    response=>{          
                    },
                    error=>{
                        this.restate()
                    }
                )
        },
        topay(){
            this.visible=true
        },
        nopay(){
            let restate=this.$store.state.orderState.noPay
            this.settleList.forEach(s=>{
                this.restate(s.order_id,restate)
            })
            this.visible = false
            this.$message({
                message: '未支付',
                type: 'error'
                });
            setTimeout(() => {
                        this.$router.push({
                            name:'orderhome'
                        })  
                    }, 1000);
        },
        pay(){
            let restate=this.$store.state.orderState.Pay
            this.settleList.forEach(s=>{
                this.restate(s.order_id,restate)
            })
            this.visible = false
            this.$message({
                message: '支付成功',
                type: 'success'
            });
            setTimeout(() => {
                        this.$router.push({
                            name:'orderhome'
                        })  
                    }, 1000);
        },
    },
    mounted(){
        this.settleList=JSON.parse(this.$route.query.list)
        this.settleList.forEach(s=>{
                s.sum=s.order_price*s.order_num
                this.sum=this.sum+s.sum
            })
    }
}
</script>

<style scoped>
ul li{
    list-style: none;
    display: inline-block;
    margin: 0px 50px 0 50px;
}
.buycarheader{
    margin: 0 125px 0 125px;
}
</style>