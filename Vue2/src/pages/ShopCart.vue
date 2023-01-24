<template>
    <div>
        <Header></Header>
        <div class="buycar">
            <div class="cart-header">
                <div class="cart-header-content">
                    <p>
                    <i class="el-icon-shopping-cart-full" style="color:#ff6700; font-weight: 600;">
                    </i>
                    我的购物车
                    </p>
                    <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
                </div>
            </div>
        </div>
        <div class="tab" v-if="orderList.length!=0">
            <el-table
            ref="multipleTable"
            :data="orderList"
            tooltip-effect="dark"
            style="left: 125px;top: 40px;width: 1200px;margin: 0px 0px 0 0;">
            <el-table-column
            label="选择"
            width="55">
            <template slot-scope="o">
                <input type="checkbox" @click="cbox($event,o.row)" :checked="o.row.isChecked">
            </template>
            </el-table-column>
            <el-table-column
            width="150">
            <template slot-scope="o">
                <el-image
                style="width: 70px; height: 80px"
                :src="img(o.row.order_img1)"
                fit="cover"></el-image>
            </template>
            </el-table-column>
            <el-table-column
            label="商品名"
            width="400">
            <template slot-scope="o">
                <p style="font-size: 38;font-weight: 500;color: #ff6700;">{{ o.row.order_title }}</p>
            </template>
            </el-table-column>
            <el-table-column
            prop="order_price"
            label="单价"
            show-overflow-tooltip>
            <template slot-scope="o">
                {{ o.row.order_price+'元' }}
            </template>
            </el-table-column>
            <el-table-column
            label="数量"
            width="200px"
            >
            <template slot-scope="o" style="">
                <el-input-number v-model="o.row.order_num" size="mini" @change="sumnum(o.row)" :min="1" :max="10"></el-input-number>
            </template>
            </el-table-column>
            <el-table-column
            label="小计"
            show-overflow-tooltip>
            <template slot-scope="o">
                <div style="color: #ff6700;">
                    {{ o.row.order_price*o.row.order_num+'元'}}
                </div>
            </template>
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="o">
                <el-popconfirm
                confirm-button-text='确定'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                @confirm="del(o.row)"
                title="确定移除该商品吗？"
                >
                    <el-button slot="reference" type="danger" icon="el-icon-close" circle></el-button>
                </el-popconfirm>
            </template>
            </el-table-column>
        </el-table>
            <div class="buycarfooter">
                <ul>
                    <li>
                        <label v-if="!checkedflag">
                            <input type="checkbox" :checked=false @click="allchecked">
                            <span>全选</span>
                        </label>
                        <label v-if="checkedflag">
                            <input type="checkbox" :checked=true @click="noallchecked">
                            <span>取消全选</span>
                        </label>
                    </li>
                    <li><button @click="choosedel">删除商品</button></li>
                    <li></li>
                    <li></li>
                    <li>已选<i v-if="orderList">{{choosenum()}}</i>件商品</li>
                    <li>合计：￥{{allmoney()}}</li>
                    <li>
                        <button class="gobuy" @click="gobuy">去结算</button>
                    </li>
                </ul>
            </div>
            <div style="height: 20px;width: 100%;"></div>
        </div>
        <div v-if="orderList.length==0">
            <el-empty description="还没有添加商品到购物车，可以继续看看哦" :image-size="200"></el-empty>
        </div>
    </div>
</template>

<script>
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import axios from 'axios';
import qs from 'qs'
import server from '@/utils/request';
export default {
    name:'ShopCart',
    data(){
        return{
            checkednum:0,
            checkedflag:false
        }
    },
    components:{
        Header,
        Footer
    },
    computed:{
        user(){
            return this.$store.state.user
        },
        orderList(){
            return this.$store.state.shopcart
        }
    },
    watch:{
        checkednum(){
            let btn=document.querySelector('.gobuy')
            if(this.checkednum!=0){   
                btn.style.backgroundColor='#ff6700'
            }else{
                btn.style.backgroundColor='#e0e0e0'
            }
            
        }
    },
    methods:{
        del(order){
            server.getReq('/order/delete?order_id='+order.order_id).then(
            response=>{
                this.updateOrder()
                this.checkedflag=false
            },
            error=>{
                console.log(error);
            }
        )
        },
        choosedel(){
            let delList=this.orderList.filter(o => {
                   return o.isChecked==true
            })
            delList.forEach(o=>{
                this.del(o)
            })
        },
        cbox(event,order){
            this.orderList.forEach(o => {
                if(o==order){
                    o.isChecked=event.target.checked
                }
                if(o.isChecked){
                    this.checkednum=this.checkednum+1
                }
            })
            if(this.checkednum==this.orderList.length){
                this.checkedflag=true
            }
            else{
                this.checkedflag=false
                this.checkednum=0
            }
        },
        allchecked(){
            this.checkedflag=!this.checkedflag
            this.orderList.forEach(o => {
                o.isChecked=true
            })   
            this.checkednum=this.orderList.length     
        },
        noallchecked(){
           this.checkedflag=!this.checkedflag
           this.orderList.forEach(o => {
                o.isChecked=false
            })
            this.checkednum=0
        },
        allmoney(){
            let sum=0
            for(let i=0;i<this.orderList.length;i++){
                if(this.orderList[i].isChecked){
                    sum=sum+this.orderList[i].order_price*this.orderList[i].order_num
                }
            }
            return sum
        },
        getnum(id,num){
            let token=localStorage.getItem('token')
            server({
                method:'put',
                url:'/order/change?order_id='+id+'&order_num='+num,
                headers:{
                'Authorization':token?'Bearer '+token:null,
            }
            }).then(
                response=>{

                },
                error=>{
                    console.log(error);
                }
            )
        },
        sumnum(o){
            o.order_num=o.order_num-0
            this.getnum(o.order_id,o.order_num)
            if(o.order_num<=1){
                return
            }
        },
        choosenum(){
            let sum=0
            this.orderList.forEach(o => {
               if(o.isChecked){
                    sum=sum+o.order_num
               }
            })
            return sum
        },
        gobuy(){
            let chooseList=this.orderList.filter(o=>{
                return o.isChecked==true
            })
            if(!chooseList.length){
                this.$message({
                        message: '还未选择菜品',
                        type: 'error'
                    });
            }
            else{
                this.$router.push({
                name:'settlehome',
                query:{
                    list:JSON.stringify(chooseList) 
                        }
                })
            }
        },
        godishe(o){
            server.getReq('/dishe/getDisheByDisheID?dishes_id='+o.dishes_id)
            .then(
                response=>{
                    // console.log(response.data);
                    this.$router.push({
                        name:'dishespage',
                        query:response.data
                    })
                }
            )
        }
        ,
        img(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\upload\\','')
            return require('@/assets/upload/'+imgname)
        },
        updateOrder(){
            let token=localStorage.getItem('token')
            this.$store.dispatch('getOrderList',token)
        }
    },
    mounted(){
        this.updateOrder()
    }
}
</script>

<style scoped>
body{
    background-color: #757575;
}
.buycar{
    position: relative;
    left: 125px;
    width: 1200px;
    margin: 20px 0px 0 0;
    /* border-top: 1px solid; */
}
.cart-header{
    border-bottom:2px solid #ff6700;
}
.cart-header p{
    font-size: 28px;
    /* line-height: 58px; */
    /* float: left; */
    font-weight: 400;
    color: #424242;
    margin: 0 0 0 0;
}
.cart-header span{
    color: #757575;
    font-size: 12px;
    /* float: left; */
    height: 20px;
    line-height: 20px;
    margin-top: 18px;
    margin-left: 15px;
}
.tab{
    background-color: #f5f5f5;
    height: 700px
}
.buycarfooter{
    width: 1200px;
    height: 56px;
    margin: 70px 0 70px 125px;
    background-color: #FFFFFF;
}
.buycarfooter ul{
    padding: 0 0 0 9px;
}
.buycarfooter li{
    display: inline-block;
    list-style: none;
    width: 160px;
    height: 20px;
    margin-top:0px;
}
.gobuy{
    height: 56px;
    width: 200px;
    text-align: center;
    font-size: 18px;
    margin-left: 30px;
    background: #e0e0e0;
    color: #b0b0b0;
    border: none;
}
</style>