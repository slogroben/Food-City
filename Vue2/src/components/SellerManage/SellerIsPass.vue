<template>
  <div>
    <el-table
            v-if="sellerList"
            :data="sellerList"
            stripe
            style="width: 100%">
            <el-table-column prop="shop_id" label="店铺id" width="70"></el-table-column>
            <el-table-column prop="shopname" label="店铺名称"></el-table-column>
            <el-table-column prop="area" label="店铺地址"></el-table-column>
            <el-table-column prop="address" label="详细地址"></el-table-column>
            <el-table-column prop="shoptype" label="店铺类型" width="80"></el-table-column>
            <el-table-column prop="state" label="营业状态" width="80"></el-table-column>
            <el-table-column prop="shopphone" label="店铺手机"></el-table-column>
            <el-table-column prop="worktime" label="营业时间"></el-table-column>
            <el-table-column prop="imgurl" label="上传图片">
                <template slot-scope="s">
                    <el-image
                        v-if="s.row.imgurl"
                        style="width: 100px; height: 100px"
                        fit="contain"
                        :src="img(s.row.imgurl)">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="店铺描述"></el-table-column>
            <el-table-column prop="sellerphone" label="店主手机"></el-table-column>
            <el-table-column label="是否通过审核">
                <template slot-scope="s">
                    <el-button type="text" size="small" @click="pass(s.row)">允许通过</el-button>
                    <el-button type="text" size="small" @click="reject(s.row)">拒绝通过</el-button>
                </template>
            </el-table-column>
        </el-table>
    <!-- <table>
        <tr>
            <th>店铺id</th>
            <th>店铺名称</th>
            <th>店铺地址</th>
            <th>详细地址</th>
            <th>店铺类型</th>
            <th>营业状态</th>
            <th>店铺手机</th>
            <th>营业时间</th>
            <th>上传图片</th>
            <th>店铺描述</th>
            <th>店主手机</th>
            <th>是否通过审核</th>
        </tr>
        <tr v-for="s in sellerList" :key="s.id">
            <td>{{s.shop_id}}</td>
            <td>{{s.shopname}}</td>
            <td>{{s.area}}</td>
            <td>{{s.address}}</td>
            <td>{{s.shoptype}}</td>
            <td>{{s.state}}</td>
            <td>{{s.shopphone}}</td>
            <td>{{s.worktime}}</td>
            <td>{{s.imgurl}}</td>
            <td>{{s.description}}</td>
            <td>{{s.sellerphone}}</td>
            <td>
                <button @click="pass(s)">允许通过</button>
                <button @click="reject(s)">拒绝通过</button>
            </td>
        </tr>
    </table> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
    name:'SellerIsPass',
    data(){
        return{
            sellerList:'',

        }
    },
    methods:{
            pass(s){
                axios({
                method:'get',
                url:'http://localhost:8080/My/AdminPassSellerServlet?shop_id='+s.shop_id
                })
                .then(
                    response=>{
                        this.sellerList=response.data
                        this.$router.go()
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },
            reject(s){
                axios({
                method:'get',
                url:'http://localhost:8080/My/AdminRejectSellerServlet?shop_id='+s.shop_id
                })
                .then(
                    response=>{
                        this.sellerList=response.data
                        this.$router.go()
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },
            getUser(){
                axios({
                method:'get',
                url:'http://localhost:8080/My/AdminFindSellerServlet?ispass='+'false'
                })
                .then(
                    response=>{
                        this.sellerList=response.data
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },  
            img(path){
                const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\shopImg\\','')
                return require('@/assets/shopImg/'+imgname)
            }      
    },
    mounted(){
        this.getUser()
    }
}
</script>

<style scoped>
table tr>th{
    border: 1px solid black;
    border-collapse: collapse;
}
table tr>td{
    border: 1px solid black;
    border-collapse: collapse;
}
</style>