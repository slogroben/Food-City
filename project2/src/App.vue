<template>
  <!-- <div id="app"> -->
    <!-- <router-link :to="{userregister}">user</router-link>
    <router-view></router-view> -->
    <!-- <UserRegister></UserRegister> -->
    <!-- <UserLogin></UserLogin> -->
    <!-- <SellerRegister></SellerRegister> -->
   <!-- <SellerRegisterMessage></SellerRegisterMessage> -->
   <!-- <SellerLogin></SellerLogin> -->
   <!-- <router-link to="/sellerlogin"></router-link>
   <router-view></router-view> -->
   <!-- <router-link :to="{name:'homepage'}"></router-link> -->
   <router-view></router-view>
   <!-- <AdminLogin></AdminLogin> -->
   <!-- <router-link to="/adminhome"></router-link>
   <router-view></router-view> -->
  <!-- </div> -->
</template>

<script>

import UserRegister from '/src/pages/UserRegister'
import UserLogin from '/src/pages/UserLogin'
import NameLogin from '/src/components/NameLogin'
import SellerRegister from '/src/pages/SellerRegister'
import SellerRegisterMessage from './pages/SellerRegisterMessage'
import SellerLogin from './pages/SellerLogin'
import AdminLogin from './pages/AdminLogin'





export default {
  name: 'App',
  components:{
    
    UserRegister,
    UserLogin,
    NameLogin,
    SellerRegister,
    SellerRegisterMessage,
    SellerLogin,
    AdminLogin,
    
}
}
</script>

<style scoped>

</style>
