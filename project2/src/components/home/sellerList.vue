<template>
  <div>
        <div class="line1">
            <div class="line_left">
                <ul>
                    <li style="font-size: 25px;color: white;">热门商家</li>
                    <li style="font-size: 14px;">为你甄选最适合的</li>
                </ul>
            </div>
            <div class="line_right">
                <label @click="more">
                    <ul>
                        <li style="font-size: 20px;">更多</li>
                        <li style="font-size: 25px;">>></li>
                    </ul>
                </label>
            </div>
        </div>
        
        <div class="list1" v-loading="loading" element-loading-text="拼命加载中">
            <div class="list_content" v-for="(s, index) in showSellerList" :key="index" @click="sellermsg(s)">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img :src="img(s.imgurl)" class="image">
                <div style="padding: 14px;">
                    <span>{{s.shopname}}</span>
                    <div class="bottom clearfix">
                    <el-button type="text" class="button">进入店铺</el-button>
                    </div>
                </div>
                </el-card>
            </div>          
        </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'sellerList',
    data(){
        return {
            loading:true
        }
    },
    computed:{
        showSellerList(){
            let data=this.$store.state.sellerList
            if(data.length>10){
                data.splice(10,data.length-10)
            }
            this.loading=false
            return data
        }
    },
    methods:{
        // getSellerList(){
        //     axios({
        //         method:'get',
        //         url:"http://localhost:8080/seller/getAllSeller"
        //     }).then(
        //         response=>{
        //             this.sellerList=response.data;
        //             this.showSellerList=this.sellerList
        //             if(this.showSellerList.length>10){
        //                 this.showSellerList.splice(10,this.showSellerList.length-10)
        //             }
        //             this.loading=false
        //         },
        //         error=>{
        //             this.getSellerList()
        //         }
        //     )
        // },
        sellermsg(s){
            this.$router.push({
                name:'sellerpage',
                query:s
            })
        },
        img(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\shopImg\\','')
            return require('@/assets/shopImg/'+imgname)
        },
        more(){
            this.$router.push({
                name:'shopsearch',
                query:{
                    kw:''
                }
            }  
            )
        }
    },
    mounted(){
        this.$store.dispatch('getSellerList')
    }
}
</script>

<style scoped>
.line1{
    position: relative;
    left: 125px;
    background-color: rgb(188, 30, 30);
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
.list_msg ul li{
    list-style: none;
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