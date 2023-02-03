<template>
  <div>
    <div ref="chart1" class="chart1">

    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import server from '@/utils/request'
import { mapState } from 'vuex'
export default {
    name:'OrderData',
    data(){
        return{
            option:{
                title: {
                    text: '订单状态分布',
                    subtext: '来自数据库',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                    name: '详细数据',
                    type: 'pie',
                    radius: '50%',
                    data: [],
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
                }
        }
    },
    computed:{
        ...mapState(['user','orderState'])
    },
    methods:{
        getOrderNum(){
            let myechart1=echarts.init(this.$refs.chart1)
            server.getReq('/order/getOrderStateNum?shop_id='+this.user.shop_id)
            .then(
                response=>{
                    this.option.series[0].data.push({value:response.data[this.orderState.shopCart],name:'购物车中'})
                    this.option.series[0].data.push({value:response.data[this.orderState.noPay],name:'未支付'})
                    this.option.series[0].data.push({value:response.data[this.orderState.Pay],name:'已支付'})
                    this.option.series[0].data.push({value:response.data[this.orderState.finish],name:'已完成'})
                    this.option.series[0].data.push({value:response.data[this.orderState.Evaluated],name:'已评论'})
                    this.option&&myechart1.setOption(this.option)
                },
                error=>{
                    console.log(error);
                }
            )
        }
    },
    updated(){
        this.getOrderNum()
    },
    mounted(){
        this.getOrderNum()
    }
}
</script>

<style scoped>
.chart1{
    width: 90vw;
    height: 70vh;
}
</style>