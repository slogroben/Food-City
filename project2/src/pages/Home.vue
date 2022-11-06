<template>
  <div class="body">
    <Header></Header>
    <Top></Top>
    <CenterBox></CenterBox>
    <DishesList></DishesList>
    <SellerList></SellerList>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios'

import Header from '/src/components/home/Header'
import Top from '/src/components/home/Top'
import CenterBox from '/src/components/home/CenterBox'
import DishesList from '/src/components/home/DishesList'
import Footer from '/src/components/home/Footer'
import SellerList from '@/components/home/sellerList'
export default {
    name:'Home',
    components:{
    Header,
    Top,
    CenterBox,
    DishesList,
    Footer,
    SellerList
},
}
</script>

<style scoped>
.body{
    background-image: linear-gradient(#81b1d6, #f0f6b2);;
    height: auto;
    width: 100%;
    position:absolute;
    background-size:100% 100%;
}
</style>