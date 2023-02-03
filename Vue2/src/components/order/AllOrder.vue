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
            <el-tag v-if="o.row.order_state==$store.state.orderState.noPay" type="danger">未支付</el-tag>
            <el-tag v-if="o.row.order_state==$store.state.orderState.Pay">已支付</el-tag>
            <el-tag v-if="o.row.order_state==$store.state.orderState.finish" type="info">已收货</el-tag>
            <el-tag v-if="o.row.order_state==$store.state.orderState.Evaluated" type="success">已评价</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="下单时间"
        sortable
        width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="o">
            <div v-if="o.row.order_state==$store.state.orderState.noPay">
                <li>
                    <el-button size="mini" type="success" @click="topay(o.row)">立即支付</el-button>
                </li>
                <li></li>
                <li>
                    <el-button size="mini" type="danger" @click="del(o.row,'取消成功')">取消订单</el-button>
                </li> 
            </div>
            <div v-if="o.row.order_state==$store.state.orderState.Pay">
                <li>
                    <el-button size="mini" type="warning" @click="finish(o.row)">立即收货</el-button>
                </li>
                <li></li>
                <li>
                    <el-button size="mini" type="danger" @click="del(o.row)">取消订单</el-button>
                </li>  
            </div>
            <div v-if="o.row.order_state==$store.state.orderState.finish">
              <li>
                  <el-button size="mini" type="primary" @click="toComment(o.row)">评价一下</el-button>
              </li>
              <li> </li>
              <li>
                <el-button size="mini" type="danger" @click="del(o.row)">不评价</el-button>
              </li> 
            </div> 
            <div v-if="o.row.order_state==$store.state.orderState.Evaluated">
                <el-button size="mini" type="danger" @click="del(o.row,'删除记录成功')">删除记录</el-button>
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
    <el-dialog
      title="发表评价"
      :visible.sync="commentflag"
      width="600px"
      :before-close="handleBeforeClose"
      v-if="this.chooseOrder">
      <el-card :body-style="{ padding: '0px' }" >
        <img style="float: left;" :src="img(this.chooseOrder.order_img1)" class="image" width="100px" height="100px">
        <div style="padding: 14px;margin: 0px 20px 0 100px;">
          <div style="font-weight: 500; font-size: 20px;">{{this.chooseOrder.order_title}}</div>
          <br/>
          <time class="time">{{ this.chooseOrder.time }}</time>
        </div>
      </el-card>
      <br/>
      <div>
        <span style="font-weight: 600;font-size: 20px;">商品得分</span>
        <el-rate
            v-model="score"
            show-text>
        </el-rate>
        <!-- <div>
          <i class="el-icon-star-off" @load="chooseStar($event)"  @mouseenter="chooseStar($event)" style="font-size: 50px;" v-for=" num in 5 " :key="num"></i>
          <span style="margin-left: 10px;,font-weight: 600;font-size: 20px;">{{this.score+'分'}}</span>
        </div>   -->
      </div>
      <div>
        <p style="font-weight: 600;font-size: 20px;">商品评价</p>
        <textarea v-model="comment" style="resize: none;" cols="73" maxlength="100" rows="11"  placeholder="谈谈你的看法吧！">
        </textarea>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentflag = false">取 消</el-button>
        <el-button type="primary" @click="toEvaluated()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import qs from "qs"
import server from '@/utils/request'
    export default {
        name:'AllOrder',
        data(){
            return{
                orderList:'',
                visible:false,
                order_id:'',
                commentflag:false,
                chooseOrder:'',
                percentage:100,
                score:0,
                comment:''
            }
        },
        methods:{
            getOrder(){
                server.getReq('/order/findAll').then(
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
            del(o,message){
                message=message?message:'删除成功'
                server.getReq('/order/delete?order_id='+o.order_id)
                .then(
                response=>{
                    if(response.data.state==this.$store.state.stateCode.success){
                            this.$message({
                                message: message,
                                type: 'error'
                            });
                            this.getOrder()
                        }
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
            },
            toComment(o){
              this.commentflag=true
              this.chooseOrder=o
            },
            sumScore(percentage){
              this.score=(percentage*5)/100
              return this.score
            },
            chooseStar(e){
              let nodeList=e.target.parentNode.childNodes
              //初始化
              nodeList.forEach((n,index)=>{
                  n.style.color=''
              })
              nodeList.forEach((n,index,nodeList) => {
                  if(n==e.target){
                    this.score=index+1
                    return
                  }
              })
              nodeList.forEach((n,index)=>{
                if(index<=this.score-1){
                  n.style.color='yellow'
                }
              })
            },
            toEvaluated(){
              if(this.score==0){
                this.$message({
                    message: '还未对商品进行打分',
                    type: 'error'
                });
                return
              }
              if(this.comment==''){
                this.$message({
                    message: '还未对商品进行评论',
                    type: 'error'
                });
                return
              }
              let {dishes_id,order_id}=this.chooseOrder
              let data={
                score:this.score,
                comment:this.comment,
                dishes_id,
                order_id,
                state:this.$store.state.orderState.Evaluated,
              }
              server.postReq('/user/AddComment',data)
              .then(
                response=>{
                  this.$message({
                      message: '评论成功',
                      type: 'success'
                  });
                  this.score=0,
                  this.comment=''
                  this.getOrder()
                  this.commentflag=false
                },
                error=>{
                  console.log(error);
                }
              )
            },
            handleBeforeClose(){
              this.commentflag=false
              this.score=0
              this.comment=""
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