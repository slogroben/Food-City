<template>
  <div>
    <Header></Header>
    <div style="margin:0 125px 0 125px;outline: 1px solid gray;">
        <el-descriptions title="店铺信息">
            <el-descriptions-item label="店铺名称">{{seller.shopname}}</el-descriptions-item>
            <el-descriptions-item label="店铺地址">{{seller.area}}</el-descriptions-item>
            <el-descriptions-item label="店铺详细地址">{{seller.address}}</el-descriptions-item>
            <el-descriptions-item label="店铺手机号码">
            {{seller.shopphone}}
            </el-descriptions-item>
            <el-descriptions-item label="店铺类型">
                <el-tag size="small">{{seller.shoptype}}</el-tag>
            </el-descriptions-item>
        </el-descriptions>
        <div>
            <el-button v-if="!collectionflag" @click="collection" style="padding:0; margin-left:10px ; width: 45px; height: 45px;" circle><i style="font-size: 30px;" class="el-icon-star-off"></i></el-button>
            <el-button v-if="collectionflag" @click="delCollection" style="background-color:yellow;padding:0; margin-left:10px ; width: 45px; height: 45px;" circle><i style="font-size: 30px;" class="el-icon-star-off"></i></el-button>
        </div>
    </div>
    <div class="swip" v-if="dishes.length!=0">
        <el-carousel v-if="dishes" :interval="5000" arrow="always" type="card" height="400px" width="200px">
            <el-carousel-item v-for="d in dishes" :key="d.dishes_id" >
                    <el-image
                        @click="dishespage(d)"
                        style="width: 100%; height: 100%"
                        :src="img(d.dishes_img1)"
                        fit="fill">
                    </el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="dishesList">
        <h3>店铺商品</h3>
        <el-empty v-if="dishes.length==0" description="该商家还未发布商品哦"></el-empty>
        <div class="dishes" v-for="(d,index) in dishes" :key="index" @click="dishespage(d)">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img :src="img(d.dishes_img1)" class="image">
                <div style="padding: 14px;">
                    <span>{{d.dishes_title}}</span>
                    <div class="bottom clearfix">
                        <p class="type">{{d.dishes_title}}</p>
                        <el-button @click.stop="addshopcart(d)" type="text" class="carbutton">加入购物车</el-button>
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
import Header from '@/components/home/Header'
import server from '@/utils/request'
    export default {
    name: "SellerPage",
    data() {
        return {
            seller: "",
            dishes: "",
            collectionflag:false,
        };
    },
    methods: {
        getDishes() {
            server.getReq("/dishe/getDisheByID?shop_id=" + this.seller.shop_id).then(response => {
                this.dishes = response.data;
                if(this.dishes.length>10){
                    this.dishes.splice(10,this.dishes.length-10)
                }
                this.dishes.forEach(d => {
                    this.imgList==d.dishes_img1
                });
            }, error => {
                console.log(error);
            });
        },
        dishespage(d) {
            this.$router.push({ name: "dishespage", query: d });
        },
        img(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\upload\\','')
            return require('@/assets/upload/'+imgname)
        },
        img1(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\shopImg\\','')
            return require('@/assets/shopImg/'+imgname)
        },
        addshopcart(dishes) {
            dishes.order_state=this.$store.state.orderState.shopCart
            this.$store.dispatch('addOrder',dishes)
            .then(
                response => {
                    this.$message({
                        message: '加入购物车成功',
                        type: 'success'
                    });
                    this.$store.dispatch('getOrderNum')
                },
                error => {
                if(error.response.data.errCode==this.$store.state.stateCode.tokenOutTime){
                    this.$router.push({name:'userlogin'})
                }
            });
        },
        collection(){
            server.getReq('/user/ShopCollection?shop_id='+this.seller.shop_id+'&shopname='+this.seller.shopname+'&imgurl='+this.seller.imgurl)
            .then(
                response=>{
                    if(response.data.state==this.$store.state.stateCode.success){
                        this.$message({
                            message: '收藏成功',
                            type: 'success'
                        });
                        this.collectionflag=true
                    }
                },
                error=>{
                    console.log(error);
                }
            )
        },
        delCollection(){
            server.getReq('/user/ShopCollectionDel?shop_id='+this.seller.shop_id)
            .then(
                response=>{
                    if(response.data.state==this.$store.state.stateCode.success){
                        this.$message({
                            message: '取消收藏',
                            type: 'error'
                        });
                        this.collectionflag=false
                    }
                },
                error=>{
                    console.log(error);
                }
            )
        }
        ,
        collectionState(){
            server.getReq('/user/ShopCollectionState?shop_id='+this.seller.shop_id)
            .then(
                response=>{
                    if(response.data.state==this.$store.state.stateCode.success){
                        this.collectionflag=true
                    }
                    if(response.data.state==this.$store.state.stateCode.error){
                        this.collectionflag=false
                    }          
                },
                error=>{
                    console.log(error);
                }
            )
        }
    },
    mounted() {
        this.seller = this.$route.query;
        this.getDishes();
        this.collectionState()
    },
    components: { Header }
}
</script>

<style>

  

</style>

<style scoped>
li{
    list-style: none;
}
.dishes{
    margin: 20px 20px 20px 20px ;
    display: inline-block;
    width: 200px;
    height: 200px;
}
.type {
    font-size: 13px;
    color: #999;
    margin-top: 0;
}
.image {
    width: 200px;
    height: 200px;
    display: block;
}
.dishesList{
    margin: 20px 125px 20px 125px;
    height: 640px;
}
.carbutton {
    padding: 0;
    float: right;
}
.swip{
    margin: 20px 125px 20px 125px;
}
.bottom {
    margin-top: 13px;
    line-height: 12px;
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