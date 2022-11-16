<template>
  <div>
    <div>
        <input type="text" ref="keyword" placeholder="根据用户名查询">
        <button @click="search">搜索</button>
        <el-table
            v-if="showuserList"
            :data="showuserList"
            stripe
            style="width: 60%">
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
                    <el-tag v-if="o.row.order_state=='nosum'" type="warning">未结算</el-tag>
                    <el-tag v-if="o.row.order_state=='nopay'" type="danger">未支付</el-tag>
                    <el-tag v-if="o.row.order_state=='pay'">已支付</el-tag>
                </template>
            </el-table-column>
        </el-table>
        </el-dialog>       
        <!-- <table>
            <tr>
                <th>用户ID</th>
                <th>账户名</th>
                <th>密码</th>
                <th>手机号</th>
                <th>操作</th>
            </tr>
            <tr v-for="(u,index) in showuserList" :key="index">
                <td>
                    <i>{{u.id}}</i>
                </td>
                <td>
                    <input type="text" v-show="u.isEdit" v-model="u.username" style="width: 100px;" >
                    <i v-show="!u.isEdit">{{u.username}}</i>
                </td>
                <td>
                    <input type="text" v-show="u.isEdit" v-model="u.password" style="width: 120px;overflow: hidden;" >
                    <i v-show="!u.isEdit">{{u.password}}</i>
                </td>
                <td>
                    <input type="text" v-show="u.isEdit" v-model="u.phone" style="width: 80px;" >
                    <i v-show="!u.isEdit">{{u.phone}}</i>
                </td>
                <td>
                    <button  v-show="!u.isEdit" @click="revise(u,index)">开启修改</button>
                    <button  v-show="u.isEdit" @click="saveRevise(u,index)">保存修改</button>
                    <button @click="del(u.id)">删除</button>
                </td>
            </tr>
        </table> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
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
            }
        },
        methods:{
            getUser(){
                axios({
                method:'get',
                url:'http://localhost:8080/My/AdminFindUserServlet'
                })
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
                console.log(this.thisUser);
                this.revisevisable = false
                axios({
                    method:'post',
                    url:'http://localhost:8080/My/AdminReviseUserServlet',
                    data:qs.stringify(this.thisUser),
                })
                .then(
                    response=>{
                        console.log(this.thisUser);
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
                axios({
                    method:'get',
                    url:'http://localhost:8080/My/IDFindAllServlet?user_id='+user.id,
                })
                .then(
                    response=>{
                        this.orderList=response.data
                        console.log(response.data);
                    },
                    error=>{
                        console.log(error);
                    }
                )   
            },
            // revise(value,index){
            //     if(this.showuserList[index].id==value.id){
            //         this.showuserList[index].isEdit=!value.isEdit
            //     }
            //     this.$mount()
            //     // this.reviseflag=true
            //     // let id=event.target.parentNode.parentNode.children[0].innerText
            // },
            // saveRevise(value,index){
            //     if(this.showuserList[index].id==value.id){
            //         this.showuserList[index].isEdit=!value.isEdit
            //     }
            //     axios({
            //         method:'post',
            //         url:'http://localhost:8080/My/AdminReviseUserServlet',
            //         data:qs.stringify(value),
            //     })
            //     .then(
            //         response=>{
            //             this.$router.go()
            //         },
            //         error=>{
            //             console.log(error);
            //         }
            //     )                  
            // },
            del(id){
                axios({
                    method:'get',
                    url:'http://localhost:8080/My/AdminDelUserServlet?id='+id+'',
                })
                .then(
                    response=>{
                        this.$router.go()
                    },
                    error=>{
                        console.log(error);
                    }
                )             
            }

        },
        mounted(){
            this.getUser()
        }
    }
</script>

<style scoped>
li{
    list-style: none;
}
</style>