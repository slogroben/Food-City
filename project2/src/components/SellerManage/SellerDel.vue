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
            <el-table-column label="上传图片">
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
            <el-table-column label="是否取消资格">
                <template slot-scope="s">
                    <el-button type="text" size="small" @click="del(s.row)">取消商家经营资格</el-button>
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
            <th>是否取消资格</th>
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
                <button @click="del(s)">取消商家经营资格</button>
            </td>
        </tr>
    </table> -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'SellerDel',
    data(){
        return{
            sellerList:'',
        }
    },
    methods:{
        del(s){
            axios({
                method:'get',
                url:'http://localhost:8080/My/AdminDelSellerServlet?shop_id='+s.shop_id
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
        getSeller(){
                axios({
                method:'get',
                url:'http://localhost:8080/My/AdminOperateSellerServlet'
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
        this.getSeller()
    }
}
</script>

<style scoped>

</style>