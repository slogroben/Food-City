<template>
    <div>
        <Header></Header>
        <div class="buycar">
            <div class="buycartop">
            <h2>全部商品 <span>数量：{{orderList.length}}</span></h2> 
            </div>
            <div class="buycarheader">
                <ul>
                    <li>选择</li>
                    <li>图片</li>
                    <li>商品信息</li>
                    <li>单价</li>
                    <li>数量</li>
                    <li>金额</li>
                    <li>操作</li>
                </ul>
            </div>
            <el-empty description="暂无菜品" v-if="orderList.length==0"></el-empty>
            <div class="buycargoods" v-for="(o,index) in orderList" :key="index">   
                <ul>
                    <li>
                        <input type="checkbox" @click="cbox($event,index)" :checked="o.isChecked">
                    </li>
                    <li>
                        <el-image
                            v-if="o.order_img1"
                            style="width: 80px; height: 80px"
                            fit="contain"
                            :src="img(o.order_img1)">
                        </el-image>
                    </li>
                    <li>{{o.order_title}}</li>
                    <li>{{o.order_price}}</li>
                    <li>
                        <div style="margin: 0 0 100px 0;"> 
                            <el-input-number v-model="o.order_num" size="small" @change="sumnum(o)" :min="1" :max="9999"></el-input-number>
                        </div>
                        <!-- <button @click="decnum(o,$event)" :disabled='o.order_num<=1'>-</button>
                        <input @blur="sumnum(o)" style="width: 40px;height: 30px;" type="text"  v-model="o.order_num">
                        <button @click="addnum(o)">+</button> -->
                    </li>
                    <li>{{o.order_price*o.order_num}}</li>
                    <li>
                        <button @click="del(o)">删除</button>
                    </li>
                </ul>
            </div>
            <div class="buycarfooter">
                <ul>
                    <li>
                        <div v-if="!checkedflag">
                            <i>&emsp;&emsp;&nbsp;</i>
                            <input type="checkbox" :checked=false @click="allchecked">
                            <span>全选</span>
                        </div>
                        <div v-if="checkedflag">
                            <i>&emsp;&emsp;&nbsp;</i>
                            <input type="checkbox" :checked=true @click="noallchecked">
                            <span>取消全选</span>
                        </div>
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
        </div>
    </div>
</template>

<script>
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import axios from 'axios';
import qs from 'qs'
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
    methods:{
        del(order){
            let token=localStorage.getItem('token')
            axios({
                method:'post',
                url:'http://localhost:8080/order/delete?order_id='+order.order_id,
                headers:{
                'Authorization':token?'Bearer '+token:null,
            }
            }).then(
            response=>{
                this.updateOrder()
            },
            error=>{
                console.log(error);
            }
        )
        },
        choosedel(){
            console.log(this.orderList);
            let delList=this.orderList.filter(o => {
                   return o.isChecked==true
            })
            delList.forEach(o=>{
                this.del(o)
            })
        },
        // getorderList(){
        //     let user_id=JSON.parse(sessionStorage.getItem("user")).id
        //     axios({
        //         method:'get',
        //         url:'http://localhost:8080/My/FindNoSumServlet?user_id='+user_id
        //     }).then(
        //         response=>{
        //             this.orderList=response.data
        //             this.orderList.forEach(o => {
        //                 o.isChecked=false
        //             })
        //         },
        //         error=>{
        //             console.log(error);
        //         }
        //     )            
        // },
        cbox(event,index){
            this.orderList[index].isChecked=event.target.checked
            this.orderList.forEach(o => {
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
            this.$mount()
        },
        allchecked(){
            this.checkedflag=!this.checkedflag
            this.checkednum=this.orderList.length
            this.orderList.forEach(o => {
                o.isChecked=true
            })
            this.$mount()         
        },
        noallchecked(){
           this.checkedflag=!this.checkedflag
           this.orderList.forEach(o => {
                o.isChecked=false
            })
            this.$mount()  
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
            axios({
                method:'put',
                url:'http://localhost:8080/order/change?order_id='+id+'&order_num='+num,
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
.buycar{
    position: relative;
    left: 125px;
    background-color: wheat;
    width: 1200px;
    margin: 30px 0px;
}
.buycartop{
    position: relative;
    left: 50px;
}
.buycarheader{
    position: relative;
    border-top: 1px solid gray;
    left: 50px;
    width: 1100px;
    height: 40px;
    border-bottom: 1px solid gray;
}
.buycarheader ul li{
    display: inline-block;
    list-style: none;
    width: 145px;
    height: 30px;
}
.buycargoods{
    position: relative;
    left: 50px;
    width: 1100px;
    height: 100px;
}
.buycargoods ul li{
    display: inline-block;
    list-style: none;
    width: 145px;
    height: 100px;
}
.buycarfooter{
    position: relative;
    top: 10px;
    
    border: 1px solid black;
    background-color: #E5E5E5;
}
.buycarfooter ul li{
    display: inline-block;
    list-style: none;
    width: 160px;
    height: 20px;
}
.gobuy{
    position: absolute;
    right: 0;top: 0;  
    width: 100px;
    height: 56px;
    background-color:#9999;
    border-style: none;
}
</style>