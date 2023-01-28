<template>
  <div>
    <div>
        <input type="text" ref="keyword" placeholder="根据用户名查询">
        <button @click="search">搜索</button>
        <el-table
            v-if="showuserList"
            :data="showuserList"
            stripe
            style="width: 100%">
            <el-table-column prop="id" label="用户ID" width="180"></el-table-column>
            <el-table-column prop="username" label="账户名" width="180"></el-table-column>
            <el-table-column prop="password" label="密码" width="180"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column label="操作" width="180">
            <template slot-scope='scope' >
                <el-button type="text" size="small" @click="showOrder(scope.row)">查看订单</el-button>
                <el-button type="text" size="small"  @click="revise(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :current-page="pageInfo.page"
            @current-change="handleCurrentChange"
            @prev-click="prevPage"
            @next-click="nextPage"
            :page-size="pageInfo.size"
            background
            layout="total,prev, pager, next,jumper"
            :total="pageInfo.allpage">
        </el-pagination>
        <!-- 修改账户 -->
        <el-dialog
        title="修改账户信息"
        :visible.sync="revisevisable"
        width="30%">
        <el-form label-width="80px">
        <el-form-item label="账户名">
            <el-input v-model="thisUser.username"></el-input>
        </el-form-item>
        <el-form-item label="账户密码">
            <el-input v-model="thisUser.password"></el-input>
        </el-form-item>
        <el-form-item label="用户号码">
            <el-input v-model="thisUser.phone"></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="revisevisable = false">取消修改</el-button>
            <el-button type="primary" @click="saveRevise">保存修改</el-button>
        </span>
        </el-dialog>
        <!-- 订单信息 -->
        <el-dialog :title="'用户'+thisUser.username+'的订单'" :visible.sync="ordervisable">
        <el-table :data="orderList" v-if="orderList">
            <el-table-column property="order_id" label="订单ID" width="150"></el-table-column>
            <el-table-column property="order_title" label="菜品名称" width="200"></el-table-column>
            <el-table-column property="order_price" label="单价"></el-table-column>
            <el-table-column property="order_num" label="数量" width="150"></el-table-column>
            <el-table-column property="order_state" label="订单状态" width="100">
                <template slot-scope="o">
                    <el-tag v-if="o.row.order_state==orderState.shopCart" type="warning">未结算</el-tag>
                    <el-tag v-if="o.row.order_state==orderState.noPay" type="danger">未支付</el-tag>
                    <el-tag v-if="o.row.order_state==orderState.Pay">已支付</el-tag>
                    <el-tag v-if="o.row.order_state==orderState.finish" type="info">已完成</el-tag>
                    <el-tag v-if="o.row.order_state==orderState.Evaluated" type="success">已评价</el-tag>
                </template>
            </el-table-column>
        </el-table>
        </el-dialog>       
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import server from '@/utils/request'
import { mapState } from 'vuex'
    export default {
        name:'UserManage',
        data(){
            return{
                userList:'',
                showuserList:'',
                reviseflag:false,
                revisevisable:false,
                thisUser:'',
                ordervisable:false,
                orderList:'',
                pageInfo:{
                    page:1,
                    size:8,
                    allpage:9999
                }
            }
        },
        computed:{
            ...mapState(['orderState'])
        },
        methods:{
            getUserNum(){
                server.getReq('/admin/getAllUserNum')
                .then(
                    response=>{
                        this.pageInfo.allpage=response.data.userNum
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },
            getAllUserPart(){
                let offset=(this.pageInfo.page-1)*this.pageInfo.size
                server.getReq('/admin/getAllUserPart?limit='+this.pageInfo.size+'&offset='+offset)
                .then(
                    response=>{
                        this.userList=response.data
                        this.showuserList=this.userList
                        this.showuserList.forEach(u => {
                            u.isEdit=false
                            return 
                        });
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },
            getUser(){
                server.getReq('/admin/getAllUser')
                .then(
                    response=>{
                        this.userList=response.data
                        this.showuserList=this.userList
                        this.showuserList.forEach(u => {
                            u.isEdit=false
                            return 
                        });
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },
            search(){
                console.log(this.$refs.keyword.value);
                this.showuserList=this.userList
                this.showuserList=this.showuserList.filter(u=>{               
                    return u.username.indexOf(this.$refs.keyword.value)!=(-1)
                })
            },
            revise(user){
                 this.revisevisable=true
                 this.thisUser=user         
            },
            saveRevise(){
                this.revisevisable = false
                server.postReq('/admin/reUser',this.thisUser)
                .then(
                    response=>{
                        this.getAllUserPart()
                        // this.$router.go()
                    },
                    error=>{
                        console.log(error);
                    }
                )                  
            },
            showOrder(user){
                this.ordervisable=true
                this.thisUser=user 
                server.getReq('/admin/getUserOrder?user_id='+user.id)
                .then(
                    response=>{
                        this.orderList=response.data
                    },
                    error=>{
                        console.log(error);
                    }
                )   
            },
            del(id){
                server.get('/admin/delUser?user_id='+id)
                .then(
                    response=>{
                        this.getAllUserPart()
                    },
                    error=>{
                        console.log(error);
                    }
                )             
            },
            handleCurrentChange(page){
                this.pageInfo.page=page
                this.getUserNum()
                this.getAllUserPart()
            },
            prevPage(page){
                this.pageInfo.page=page
            },
            nextPage(page){
                this.pageInfo.page=page
            }
        },
        mounted(){
            this.getUserNum()
            this.getAllUserPart()
        }
    }
</script>

<style scoped>
li{
    list-style: none;
}
</style>