<template>
  <div>
    <Header></Header>
    <div>
        <div class="center_con clearfix">
		<div class="main_menu fl" v-if="imgList" >
            <div style="width: 350;height: 350px;" ref="imgbox" 
                @mouseover="mouseover" 
                @mousemove="imgmorebig">
               <el-image
                v-if="maximg"
                style="position: relative; width: 350px; height: 350px"
                :src="img(maximg)"
                fit="fill"
                slot="reference">
                </el-image> 
                <div class="bigmirr" ref="bigmirr" v-if="imgflag" @mouseout="mouseout"></div>
            </div>
            <div class="moreimgbox"  v-if="imgflag">
                <img ref="big"
                    class="bigimg"
                    :src="img(maximg)">
            </div>
            <div>
                <div  class="imgfoot" v-for="(i,index) in imgList" :key="index">
                    <el-image
                        v-if="i"
                        @mouseover="imgbig(i)"
                        style="width: 70px; height: 70px"
                        :src="img(i)"
                        fit="cover">
                    </el-image>
                </div>
            </div>
        </div>
		<div class="goods_detail_list fl">
			<h3>{{dishes.dishes_title}}</h3>
			<p>{{dishes.dishes_description}}</p>
			<div class="prize_bar">
				<div class="show_prize fl">￥<em>{{dishes.dishes_price}}</em></div>
			</div>
			<div>
				<div class="num_name fl">数量：</div>
				<div class="num_add fl">
                    <el-input-number v-model="order_num" size="small" @change="sumnum(o)" :min="1" :max="9999"></el-input-number>
				</div>
			</div>
			<div class="total">总价：<em>{{order_num*dishes.dishes_price}}</em></div>
			<div class="operate_btn">
				<button class="buy_btn" @click="topay">立即购买</button>
				<button @click="addshopcart(dishes)" class="add_cart">加入购物车</button>
                <el-button v-if="!collectionflag" @click="collection" style="padding:0; margin-left:10px ; width: 45px; height: 45px;" circle><i style="font-size: 30px;" class="el-icon-star-off"></i></el-button>
                <el-button v-if="collectionflag" @click="delCollection" style="background-color:yellow;padding:0; margin-left:10px ; width: 45px; height: 45px;" circle><i style="font-size: 30px;" class="el-icon-star-off"></i></el-button>
            </div>   
	    </div>
        <div class="shopmsg fl" v-if="seller">
            <h2 style="text-align: center;background-color: antiquewhite;">商家信息</h2>
                <el-image
                style="margin-left: 0px; width: 200px; height: 250px"
                :src="img1(seller.imgurl)"
                fit="fill"></el-image>
            <p style="text-align: center;color:grey;">{{seller.shopname}}</p>
            <el-button style="margin-left: 50px;" @click="sellerpage" type="warning" round>进入店铺</el-button>
        </div>
	</div>
    <div style="position: relative;left: 125px; top: 600px;width: 1182px;height: 100px;">
        <div style="position:absolute;width: 1182px;height: 80px;">
            <hr/>
            <p style="text-align: center;">评论区</p>
            <hr/>
        </div>
        <div>
            <div class="usermsg" style="position: absolute;top: 80px; width: 1182px;height: 80px;">
                <div class="userimg" style="float: left;margin:10px 50px 0px 50px;">
                    <img :src='img(maximg)' width="60px" height="60px" style="border-radius: 30px;">
                </div>
                <div>
                    <div class="username" style="margin: 10px 0 20px 0px;">
                        帅到被人砍
                    </div>
                    <div class="time" >
                        200001212121112
                    </div>
                </div>
            </div>
            <div class="comment" style="position: absolute;top:160px ;width: 1182px;height: 100px;">
                <p style="margin-left: 160px;font-size: 20px;">你在说阿萨飒飒啊飒飒啊啊飒飒飒飒飒飒飒飒飒飒撒阿萨飒飒飒飒飒飒撒阿萨飒飒飒飒飒飒飒飒飒飒什么屁话3，垃圾就是</p>
                <hr/>
            </div>
        </div>
        
    </div>
    </div>
    <el-dialog title="支付" :visible.sync="visible" center>
        <el-button plain>支付宝支付</el-button>
        <el-button plain>微信支付</el-button>
        <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="nopay">取 消</el-button>
            <el-button type="primary" @click="pay">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import Header from '@/components/home/Header'
import server from '@/utils/request'
export default {
    name: "DishesPage",
    data() {
        return {
            dishes: "",
            seller: "",
            order_num:1,
            imgList:'',
            maximg:'',
            imgflag:'',
            visible:false,
            collectionflag:false
        };
    },
    methods: {
        getSeller() {
            server.getReq("/seller/getSellerByID?shop_id=" + this.dishes.shop_id)
            .then(response => {
                this.seller = response.data;
            }, error => {
                console.log(error);
            });
        },
        sellerpage() {
            this.$router.push({ name: "sellerpage", query: this.seller });
        },
        addshopcart(dishes) {
            dishes.order_state=this.$store.state.orderState.shopCart
            dishes.dishes_num=this.order_num
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
        img(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\upload\\','')
            return require('@/assets/upload/'+imgname)
        },
        img1(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\shopImg\\','')
            return require('@/assets/shopImg/'+imgname)
        },
        imgbig(img){
            this.imgflag=false
            this.maximg=img
        },
        imgmorebig(){
            let bigmirr = this.$refs.bigmirr
            let big = this.$refs.big
            let imgbox =this.$refs.imgbox

            let mouseX=event.pageX
            let mouseY=event.pageY

            let boxX=imgbox.offsetLeft
            let boxY=imgbox.offsetTop

            let x =mouseX-boxX
            let y =mouseY-boxY

            let moveX=event.pageX-bigmirr.offsetWidth/2
            let moveY=event.pageY-bigmirr.offsetHeight/2

            bigmirr.style.left=moveX+"px"
            bigmirr.style.top=moveY+"px"
            
            
            if( moveX <= 45+bigmirr.offsetWidth/2){
                bigmirr.style.left = 45+bigmirr.offsetWidth/2 +"px";
            }else if( moveX >= 45+imgbox.offsetWidth-bigmirr.offsetWidth/2){
                bigmirr.style.left = 45+imgbox.offsetWidth-bigmirr.offsetWidth/2+"px"
            }

            if( moveY <= bigmirr.offsetHeight/2-35){
                bigmirr.style.top =bigmirr.offsetHeight/2-35+'px';
            }else if( moveY >= imgbox.offsetWidth-bigmirr.offsetHeight+45){
                bigmirr.style.top = imgbox.offsetWidth-bigmirr.offsetHeight+45+"px"
            }
            
            big.style.left=-2*(moveX)+"px"
            big.style.top=-2*(moveY)+"px"
        },
        mouseover(){
            this.imgflag=true
        },
        mouseout(){
            this.imgflag=false
        },
        restate(id,state){
            server.getReq('/order/restate?order_id='+id+'&state='+state)
            .then(
                response=>{
                    console.log(response.data);            
                },
                error=>{
                    this.restate()
                }
            )
        },
        addbuy(state){
                let dishes=this.dishes
                dishes.order_state=state
                dishes.dishes_num=this.order_num
                return this.$store.dispatch('addOrder',dishes)
        },
        topay(){
            if(localStorage.getItem('token')){this.visible=true}
            else{
                this.$router.push({name:'userlogin'})
            }
            
        },
        nopay(){
            let state=this.$store.state.orderState.noPay
            this.addbuy(state)
            .then(
                response=>{
                    this.$message({
                        message: '未支付',
                        type: 'error'
                        });
                    setTimeout(() => {
                        this.$router.push({
                            name:'orderhome'
                        })  
                    }, 1500);
                }
            )

        },
        pay(){
            let state=this.$store.state.orderState.Pay
            this.addbuy(state)
            .then(
                response=>{
                    this.$message({
                        message: '支付成功',
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$router.push({
                            name:'orderhome'
                        })  
                    }, 1500);
                }
            )
        },
        collection(){
            server.getReq('/user/DishesCollection?dishes_id='+this.dishes.dishes_id+'&dishes_title='+this.dishes.dishes_title+'&dishes_img1='+this.dishes.dishes_img1)
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
            server.getReq('/user/DishesCollectionDel?dishes_id='+this.dishes.dishes_id)
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
            server.getReq('/user/DishesCollectionState?dishes_id='+this.dishes.dishes_id)
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
        this.dishes = this.$route.query;
        this.imgList = [
            this.dishes.dishes_img1,
            this.dishes.dishes_img2,
            this.dishes.dishes_img3,
            this.dishes.dishes_img4,
            this.dishes.dishes_img5,
        ]
        this.maximg=this.imgList[0]
        this.getSeller();
        this.collectionState();
    },
    components: { Header }
}
</script>
<style scoped> 
li{
    list-style: none;
}
.main_menu{
    margin: 0 100px 0 125px;
	width:350px;
    height:400px;
}
.imgfoot{
    display: inline-block;
}
.imgfoot :hover{
    outline:1px solid;
    border-color: #2e58ff;
}
.bigimg{
    position: absolute;
    left: 0;
    top: 0; 
    width: 1260px; 
    height: 1260px;
}
.bigmirr{
    position: absolute;
    left: 0;
    top: 0;
    width: 175px;
    height: 175px;
    opacity: 0.3;
    z-index: 99;
    background-color: gray;
}
.moreimgbox{
    position: absolute;
    top:50px;
    left: 520px;
    width: 420px;
    height: 420px;
    overflow: hidden;
    z-index: 9999;
}
.goods_detail_list{
    width:430px;
    height:350px;
}
.goods_detail_list h3{
    font-size:24px;
    line-height:24px;
    color:#666;
    font-weight:normal;
}
.goods_detail_list p{
    color:#666;
    line-height:40px;
}
.prize_bar{
    height:72px;
    background-color:#fff5f5;
    line-height:72px;
}
.prize_bar .show_prize{
    font-size:20px;
    color:#ff3e3e;
    padding-left:20px
}
.prize_bar .show_pirze em{
    font-style:normal;
    font-size:36px;
    padding-left:10px
}
.prize_bar .show_unit{
    padding-left: 150px;
}
.total{
    height: 35px;
    line-height: 55px;
    margin-top: 25px;
    /*background: yellow;*/
}
.total em{
    font-style:normal;
    color:#ff3e3e;
    font-size:18px
}
.operate_btn{
    height:40px;
    margin-top:35px;
    /* font-size:0; */
    position:relative;
}
.operate_btn .buy_btn,.operate_btn .add_cart{
    display:inline-block;
    width:178px;
    height:38px;
    border:1px solid #c40000;
    font-size:14px;
    color:#c40000;
    line-height:38px;
    text-align:center;
    background-color:#ffeded;
}
.operate_btn .add_cart{
    background-color:#c40000;
    color:#fff;
    margin-left:10px;
    position:relative;
    z-index:10;
}
.shopmsg{
    width: 200px;
    height: 420px;
    border: 1px solid rgb(184, 217, 108);
    margin-left: 100px; 
}
.fl{
  float:left;
}
.fr{
  float:right;
}
</style>