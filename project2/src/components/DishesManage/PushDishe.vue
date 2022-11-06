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
                <el-form-item label="菜品图1">
                    <input type="file" ref="img1">
                </el-form-item>
                <el-form-item label="菜品图2">
                    <input type="file" ref="img2">
                </el-form-item>
                <el-form-item label="菜品图3">
                    <input type="file" ref="img3">
                </el-form-item>
                <el-form-item label="菜品图4">
                    <input type="file" ref="img4">
                </el-form-item>
                <el-form-item label="菜品图5">
                    <input type="file" ref="img5">
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
            <!-- <div>
                菜品标题：<input type="text" v-model="dishes_title"/>
            </div>
            <div>
                菜品类型：<input type="text" v-model="dishes_type"/>
            </div>
            <div>
                菜品图：<input type="file"/>
            </div>
            <div>
                菜品单价：<input type="text" v-model="dishes_price"/>
            </div>
            <div>
                菜品描述：<textarea rows="4px" cols="70px" v-model="dishes_description"></textarea>
            </div>
            <div>
                <button @click="submitdishe">提交菜品</button>
            </div> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
    export default {
        name:'PushDishe',
        data(){
            return{
                dishes:{
                    dishes_title:'',
                    dishes_type:'',
                    dishes_price:'',
                    dishes_description:'',
                    dishes_img1:'',
                    dishes_img2:'',
                    dishes_img3:'',
                    dishes_img4:'',
                    dishes_img5:'',
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
            shop_id(){
                let seller=JSON.parse(sessionStorage.getItem('seller'))
                return seller.shop_id
            }
        },
        methods:{
            submitdishe(){
                let formData=new FormData()
                let dishes={
                    dishes_title:this.dishes.dishes_title,
                    dishes_type:this.dishes.dishes_type,
                    dishes_img1:this.$refs.img1.files[0],
                    dishes_img2:this.$refs.img2.files[0],
                    dishes_img3:this.$refs.img3.files[0],
                    dishes_img4:this.$refs.img4.files[0],
                    dishes_img5:this.$refs.img5.files[0],
                    dishes_price:this.dishes.dishes_price-0,
                    dishes_description:this.dishes.dishes_description,
                    shop_id:this.shop_id,
                }
                formData=dishes
                axios({
                    method:'post',
                    // url:'http://localhost:8080/My/DishesAddServlet',
                    url:'http://localhost:8080/My/DishesAddServlet',
                    data:formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(
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