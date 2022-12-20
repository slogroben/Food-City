<template>
  <div>
        <div class="line1">
            <div class="line_left">
                <ul>
                    <li style="font-size: 25px;color: white;">猜你喜欢</li>
                    <li style="font-size: 14px;">为你甄选最适合的</li>
                </ul>
            </div>
            <div class="line_right">
                <label @click="more">
                    <ul>
                        <li style="font-size: 18px;">更多</li>
                        <li style="font-size: 20px;">>></li>
                    </ul>   
                </label>
                
            </div>
        </div>
        
        <div class="list1" v-loading="loading" element-loading-text="拼命加载中" v-if="showdishesList">
            <div class="list_content" v-for="(d,index) in showdishesList" :key="index" @click="dishespage(d)">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img :src="img(d.dishes_img1)" v-if="d.dishes_img1" class="image">
                <div style="padding: 14px;">
                    <span>{{d.dishes_title}}</span>
                    <div class="bottom clearfix">
                    <el-button type="text" class="button" @click.stop="addshopcart(d,$event)" :loading="btnloading">加入购物车</el-button>
                    </div>
                </div>
                </el-card>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from "qs"
export default {
    name:'DishesList',
    data(){
        return{
            // dishesList:'',
            // showdishesList:'',
            loading:true,
            btnloading:false
        }
    },
    computed:{
        showdishesList(){
            let data=this.$store.state.dishesList
            if(data.length>10){
                data.splice(10,data.length-10)
            }
            this.loading=false
            return data
        },
        user(){
                return this.$store.state.user
            }
    },
    methods:{
        dishespage(d){
            this.$router.push({name:'dishespage',query:d})
        },
        img(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\upload\\','')
            return require('@/assets/upload/'+imgname)
        },
        addshopcart(dishes,event) {
            if (this.user) {
                let order = {
                    order_title: dishes.dishes_title,
                    order_img1: dishes.dishes_img1,
                    order_price: dishes.dishes_price*1,
                    order_num: 1,
                    user_id: this.user.id,
                };
                axios({
                    method: "post",
                    url: "http://localhost:8080/order/add",
                    data: qs.stringify(order)
                }).then(response => {
                    console.log(response);
                    this.$message({
                        message: '加入购物车成功',
                        type: 'success'
                    });
                }, error => {
                    console.log(error);
                });
            }
            else{
                this.$router.push({name:'userlogin'})
            }
        },
        more(){
            this.$router.push({
                name:'dishessearch',
                query:{
                    kw:''
                }
            }  
            )
        }
    },
    mounted(){
        this.$store.dispatch('getDisheList')
    }
}
</script>

<style scoped>
.line1{
    position: relative;
    left: 125px;
    background-color: coral;
        outline: 1px solid gray;
    width: 1200px;
    height: 40px;
    border-radius: 3px 3px 0px 0px;
}
.line1 div ul li{
    display: inline;
    list-style: none;
    
}
.line_right{
    position: absolute;
    right: 0px;
    bottom: -10px;
}
.list1{
    position: relative;
    left: 125px;
    /* background-color:darkgray; */
    width: 1200px;
    height: 600px;

}
.list_content{
    position: relative;
    margin: 30px 17.5px 30px 17.5px;
    float: left;
    width: 200px;
    height: 220px;
    
}
.type {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
   height: 200px;
   width: 200px;
   display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>