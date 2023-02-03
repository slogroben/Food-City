<template>
  <div>
    <div class="top">
        <div>
            <el-button style="margin: 0 0 0 10px;" type="primary" @click="open" slot="append" icon="el-icon-plus">新增</el-button>
        </div>
        <div class="top-right">
            <input type="text" style="width: 200px;height: 30px;"
                placeholder="根据用户名查询"
                ref="keyword">
            <el-button v-if="!searchflag" style="margin: 0 0 0 10px;" type="primary" @click="search" slot="append" icon="el-icon-search">搜索</el-button>
            <el-button v-if="searchflag" @click="dropSeach" style="margin: 0 10px 0 10px;float: right;" type="danger" slot="append" icon="el-icon-close">清除搜索</el-button>
        </div>
    </div>
    <div>
    <el-card class="box-card">
        <el-table
            v-if="showuserList"
            :data="showuserList"
            stripe
            style="width: 100%">
            <el-table-column prop="id" label="用户ID" width="180"></el-table-column>
            <el-table-column prop="id" label="头像" width="180">
                <template slot-scope="u"> 
                    <el-avatar :src="avatarImg(u.row)"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="账户名" width="180"></el-table-column>
            <el-table-column prop="password" label="密码" width="180"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column label="操作" width="290px">
            <template slot-scope='scope' >
                <el-button type="primary" icon="el-icon-s-order" size="small" @click="showOrder(scope.row)">查看订单</el-button>
                <el-button type="warning" icon="el-icon-edit" size="small"  @click="revise(scope.row)">修改</el-button>
                <el-button type="danger" icon="el-icon-circle-close" size="small" @click="del(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    
        <el-pagination
            :current-page="pageInfo.page"
            @current-change="handleCurrentChange"
            @prev-click="prevPage"
            @next-click="nextPage"
            :page-size="pageInfo.size"
            style="margin:30px 0 0 350px;"
            background
            layout="total,prev, pager, next,jumper"
            :total="pageInfo.allpage">
        </el-pagination>
    </el-card>
        <!-- 修改账户 -->
        <el-dialog
        title="修改账户信息"
        :visible.sync="revisevisable"
        :before-close="handleclose1"
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
        <el-form-item label="上传图片">
            <div>
                <label>
                    <i class="imgbox el-icon-plus" ref="restartbox"></i>
                    <input type="file" ref="reimg" @change="reshowImg" style="display: none;">
                    <img class="img"  ref="repic" src="" style="display:none">
                </label>
            </div>
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
        <!--新增用户-->  
        <el-dialog
        title="添加新用户"
        :visible.sync="addDialog"
        :before-close="handleclose2"
        width="50%">
        <el-form label-width="80px">
            <el-form-item label="账户名">
                <el-input v-model="newUser.username"></el-input>
            </el-form-item>
            <el-form-item label="账户密码">
                <el-input v-model="newUser.password"></el-input>
            </el-form-item>
            <el-form-item label="用户号码">
                <el-input v-model="newUser.phone"></el-input>
            </el-form-item>
            <el-form-item label="上传图片">
                <div>
                    <label>
                        <i class="imgbox el-icon-plus" ref="startbox"></i>
                        <input type="file" ref="img" @change="showImg" style="display: none;">
                        <img class="img"  ref="pic" src="" style="display:none">
                    </label>
                </div>
            </el-form-item>
            <el-form-item label="用户类型">
                <el-radio-group v-model="newUser.type" size="mini">
                    <el-radio  label="2" border size="medium">普通用户</el-radio>
                    <el-radio  label="1" border size="medium">商家</el-radio>
                    <el-radio  label="0" border size="medium">超级管理员</el-radio>
                </el-radio-group>
                
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialog = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
        </el-dialog>    
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import server from '@/utils/request'
import { mapState } from 'vuex'
import imgPath from '@/utils/imgPath'
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
                searchflag:false,
                pageInfo:{
                    page:1,
                    size:6,
                    allpage:9999
                },
                addDialog:false,
                newUser:{
                    username:'',
                    password:'',
                    phone:'',
                    imgurl:'',
                    type:'2',
                },
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
                let keyword=this.$refs.keyword.value
                if(!keyword.trim()){
                    this.$message({
                        message:'请输入搜索字段',
                        type:'error'
                    })
                    return
                }
                this.searchflag=true
                this.pageInfo.page=1
                let offset=(this.pageInfo.page-1)*this.pageInfo.size
                
                server.getReq('/admin/getKeyUserPart?limit='+this.pageInfo.size+'&offset='+offset+'&keyword='+keyword)
                .then(
                    response=>{
                        this.pageInfo.allpage=response.data.num
                        this.showuserList=response.data.data
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },
            revise(user){
                 this.revisevisable=true
                 this.thisUser=user         
            },
            saveRevise(){
                this.revisevisable = false
                let formdata=new FormData()
                if(this.thisUser.reimgurl)
                for (const key in this.thisUser) {
                    if (Object.hasOwnProperty.call(this.thisUser, key)) {
                        formdata.append(key,this.thisUser[key]) 
                    }
                }
                server.postReq('/admin/reUser',formdata,{
                        'Content-Type': 'multipart/form-data'
                    })
                .then(
                    response=>{
                        this.getAllUserPart()
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
                        this.$message({
                            message:'删除用户成功',
                            type:"success"
                        })
                        this.getAllUserPart()
                    },
                    error=>{
                        console.log(error);
                    }
                )             
            },
            handleCurrentChange(page){
                this.pageInfo.page=page
                if(!this.searchflag){
                    this.getUserNum()
                    this.getAllUserPart()
                }else{
                    this.search()
                }
                
            },
            handleclose1(){
                this.thisUser=''
                this.$refs.restartbox.style.display='block'
                this.$refs.repic.style.display='none'
                this.$refs.repic.src=''
                this.revisevisable=false
            },
            handleclose2(){
                this.newUser={
                    username:'',
                    password:'',
                    phone:'',
                    imgurl:'',
                    type:'2',
                }
                this.$refs.startbox.style.display='block'
                this.$refs.pic.style.display='none'
                this.$refs.pic.src=''
                this.addDialog=false
            },
            prevPage(page){
                this.pageInfo.page=page
            },
            nextPage(page){
                this.pageInfo.page=page
            },
            open(){
                this.addDialog=true
            },
            addUser(){
                if(!this.newUser.username.trim()){
                    this.$message({
                        message:'用户名不能为空',
                        type:'error'
                    })
                    return
                }
                if(!this.newUser.password.trim()){
                    this.$message({
                        message:'密码不能为空',
                        type:'error'
                    })
                    return
                }
                if(!this.newUser.phone.trim()){
                    this.$message({
                        message:'电话号码不能为空',
                        type:'error'
                    })
                    return
                }
                let formData=new FormData()
                for (const t in this.newUser) {
                    if (Object.hasOwnProperty.call(this.newUser, t)) {
                        formData.append(t,this.newUser[t])
                    }
                }
                server.postReq('/admin/addUser',formData,{
                        'Content-Type': 'multipart/form-data'
                    })
                .then(
                    response=>{
                        this.addDialog=true
                        this.$message({
                            message:'新增用户成功',
                            type:'success'
                        })
                        this.getUserNum()
                        this.getAllUserPart()
                    },
                    error=>{

                    }
                )
            },
            showImg(){
                let reader=new FileReader()
                let img=this.$refs.img.files[0]
                this.$refs.startbox.style.display='none'
                reader.readAsDataURL(img)
                reader.onload=()=>{
                    this.$refs.pic.style.display='block'
                    this.$refs.pic.src=reader.result
                    this.newUser.imgurl=img
                }
            },
            reshowImg(){
                let reader=new FileReader()
                let img=this.$refs.reimg.files[0]
                this.$refs.restartbox.style.display='none'
                reader.readAsDataURL(img)
                reader.onload=()=>{
                    this.$refs.repic.style.display='block'
                    this.$refs.repic.src=reader.result
                    this.thisUser.reimgurl=img
                }
            },
            dropSeach(){
                this.searchflag=false
                this.pageInfo.page=1
                this.$refs.keyword.value=''
                this.getUserNum()
                this.getAllUserPart()
                
            },
            avatarImg(u){
                console.log(u);
                if(u.imgurl){
                    return imgPath.userImg(u.imgurl)
                }
                else{
                    return this.circleUrl
                }
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
.top{
    margin: 10px 0 10px 0;
}
.top>div{
    display: inline-block;
}
.top-right{
    position: relative;
    left: 750px;
}
.imgbox {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    position: relative;
    width: 178px;
    height: 178px;
    text-align:center;
    line-height:188px;
    font-size: 50px;
  }
.imgbox:hover {
    border-color: #409EFF;
  }
  .img{
    width: 178px;
    height: 178px;
  }
</style>