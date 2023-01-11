<template>
  <div>
    <Header></Header>
    <Top></Top>
    <div class="tab" v-if="showdishesList">
        <el-table
            :data="showdishesList"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            @row-click="inter"
            >
            <el-table-column label="菜品图片" width="180">
                <template slot-scope="s">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="img(s.row.dishes_img1)"
                    fit="fill">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
            prop="dishes_title"
            label="菜品名"
            >
            </el-table-column>
            <el-table-column
            prop="dishes_price"
            sortable
            label="菜品价格">
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import Header from '@/components/home/Header';
import axios from 'axios'
import Top from '@/components/home/Top.vue';
import server from '@/utils/request';
export default {
    name: "DishesSearch",
    data(){
        return{
            dishesList:'',
            showdishesList:''
        }
    },
    components: { Header, Top },
    methods:{
        getDishesList(){
            server.getReq('/dishe/getAllDishe').then(
                response=>{
                    this.dishesList=response.data;
                    this.showdishesList=this.dishesList
                    let kw = this.$route.query.kw
                    this.showdishesList=this.showdishesList.filter(s=>{             
                    return s.dishes_title.indexOf(kw)!=(-1)
                })
                },
                error=>{
                    this.getDishesList()
                }
            )
        },
        img(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\upload\\','')
            return require('@/assets/upload/'+imgname)
        },
        inter(row, event, column){
            this.$router.push({
                name:'dishespage',
                query:row
            })
        }
    },
    mounted(){
        this.getDishesList()
    }
}
</script>

<style scoped>
.tab{
    margin: 0 125px 0 125px;
}
</style>