<template>
    <div>
        <div>
            <el-form ref="form" :model="dishes" label-width="80px">
                <el-form-item label="菜品标题">
                    <el-input v-model="dishes.dishes_title"></el-input>
                </el-form-item>
                <el-form-item label="菜品类型">
                    <el-select v-model="dishes.dishes_type" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜品图">
                    <input type="file" ref="img" multiple>
                </el-form-item>
                <el-form-item label="菜品单价">
                    <el-input v-model="dishes.dishes_price"></el-input>
                </el-form-item>
                <el-form-item label="菜品描述">
                    <el-input v-model="dishes.dishes_description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitdishe">提交菜品</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import server from '@/utils/request'
import { mapState } from 'vuex'
    export default {
        name:'PushDishe',
        data(){
            return{
                dishes:{
                    dishes_title:'',
                    dishes_type:'',
                    dishes_price:'',
                    dishes_description:'',
                    dishes_imgs:'',
                },
                 options: [{
                            value: '中餐',
                            label: '中餐'
                            }, 
                            {
                            value: '西餐',
                            label: '西餐'
                            }, 
                            {
                            value: '火锅',
                            label: '火锅'
                            }, 
                            {
                            value: '自助餐',
                            label: '自助餐'
                            }, 
                            {
                            value: '烧烤',
                            label: '烧烤'
                            }, 
                            {
                            value: '水果',
                            label: '水果'
                            }],
                subflag:false
            }
        },
        computed:{
            ...mapState(['seller'])
        },
        methods:{
            submitdishe(){
                let imgs=this.$refs.img.files
                let pics=[]
                for (const i of imgs) {
                    pics.push(i)
                }
                console.log(pics);
                let formData=new FormData()
                let dishes={
                    dishes_title:this.dishes.dishes_title,
                    dishes_type:this.dishes.dishes_type,
                    dishes_imgs:pics,
                    dishes_price:this.dishes.dishes_price-0,
                    dishes_description:this.dishes.dishes_description,
                    shop_id:this.seller.shop_id,
                }
                formData=dishes
                server.post('/seller/pushDishe',pics)
                .then(
                    response=>{
                        console.log("请求成功"+response.data);
                        this.$message({
                            message: '提交菜品成功',
                            type: 'success'
                        })
                        this.$mount()
                        setTimeout(() => {
                            this.$router.go()
                        }, 1500);
                    },
                    error=>{
                        console.log("请求失败");
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>