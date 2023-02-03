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
          <el-tag v-if="o.row.order_state==$store.state.orderState.finish" type="info">已收货</el-tag>
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
          <div v-if="o.row.order_state==$store.state.orderState.finish">
              <li>
                  <el-button size="mini" type="primary" @click="toComment(o.row)">评价一下</el-button>
              </li>
              <li> </li>
              <li>
                <el-button size="mini" type="danger" @click="del(o.row)">不评价</el-button>
              </li> 
          </div>  
        </template>
      </el-table-column>
    </el-table>
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
        <div>
          <el-rate
            v-model="score"
            show-text>
          </el-rate>
          <!-- <i class="el-icon-star-off" @load="chooseStar($event)"  @mouseenter="chooseStar($event)" style="font-size: 50px;" v-for=" num in 5 " :key="num"></i>
          <span style="margin-left: 10px;,font-weight: 600;font-size: 20px;">{{this.score+'分'}}</span> -->
        </div>  
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
        name:'FinishOrder',
        data(){
            return{
                orderList:'',
                commentflag:false,
                chooseOrder:'',
                percentage:100,
                score:0,
                comment:''
            }
        },
        methods:{
            getOrder(){
                let state=this.$store.state.orderState.finish
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