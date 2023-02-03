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
                    <input type="file" ref="img" @change="showImg" max="5" multiple>
                    <span v-for=" (img,index) in dishes.dishes_imgs" :key="index">
                        <img :src= img.url>
                    </span>
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
            ...mapState(['seller','stateCode'])
        },
        methods:{
            submitdishe(){
                if(!this.dishes.dishes_title){
                    this.$message({
                        message:'菜品名不能为空',
                        type:'error'
                    })
                    return
                }
                if(!this.dishes.dishes_type){
                    this.$message({
                        message:'菜品类型不能为空',
                        type:'error'
                    })
                    return
                }
                if(!this.dishes.dishes_price){
                    this.$message({
                        message:'菜品价格不能为空',
                        type:'error'
                    })
                    return
                }
                if(!this.dishes.dishes_description){
                    this.$message({
                        message:'菜品描述不能为空',
                        type:'error'
                    })
                    return
                }
                if(!this.dishes.dishes_imgs){
                    this.$message({
                        message:'菜品图片不能为空',
                        type:'error'
                    })
                    return
                }
                let formData=new FormData()
                let dishes={
                    dishes_title:this.dishes.dishes_title,
                    dishes_type:this.dishes.dishes_type,
                    dishes_price:this.dishes.dishes_price-0,
                    dishes_description:this.dishes.dishes_description,
                    shop_id:this.seller.shop_id,
                }
                for (const i of this.dishes.dishes_imgs) {
                    formData.append('dishes_imgs',i)
                }
                for (const key in dishes) {
                    if (Object.hasOwnProperty.call(dishes, key)) {
                        formData.append(key,dishes[key])
                    }
                }
                server.postReq('/seller/pushDishe',formData,{
                        'Content-Type': 'multipart/form-data'
                    })
                .then(
                    response=>{
                        if(response.data.state==this.stateCode.success){
                            this.$message({
                                message: '提交菜品成功',
                                type: 'success'
                            })
                            this.$mount()
                            setTimeout(() => {
                                //初始化
                                this.dishes={
                                    dishes_title:'',
                                    dishes_type:'',
                                    dishes_price:'',
                                    dishes_description:'',
                                    dishes_imgs:'',
                                }
                                this.$refs.img.files=null
                            }, 1500);
                        }
                    },
                    error=>{
                        console.log("请求失败");
                    }
                )
            },
            showImg(){
                this.dishes.dishes_imgs=this.$refs.img.files
            }
        }
    }
</script>

<style scoped>

</style>