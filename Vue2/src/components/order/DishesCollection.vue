<template>
  <div>
    <el-table
      v-if="disheslist"
      :data="disheslist"
      style="width: 100%">
      <el-table-column width="300" label="图片">
        <template slot-scope="d">
            <el-image
                v-if="d.row.dishes_img1"
                style="width: 100px; height: 100px"
                :src="img(d.row.dishes_img1)"
                @click="$emit('godishe',d.row)"
                fit="cover">
            </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="dishes_title"
        width="300"
        label="菜品名">
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="d">
            <el-button type="text" @click="cancel(d.row)">取消收藏</el-button>
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
        name:'DishesCollection',
        data(){
            return{
                disheslist:'',
                visible:false,
                order_id:''
            }
        },
        methods:{
            getDishesList(){
                server.getReq('/user/DishesCollectionAll').then(
                response=>{        
                    this.disheslist=response.data
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
            cancel(d){
                server.getReq('/user/DishesCollectionDel?dishes_id='+d.dishes_id)
                .then(
                    response=>{
                        if(response.data.state==this.$store.state.stateCode.success){
                            this.$message({
                                message: '取消收藏',
                                type: 'error'
                            });
                            this.getDishesList()
                        }
                    },
                    error=>{
                        console.log(error);
                    }
                )
            },
        },
        mounted(){
            this.getDishesList()
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