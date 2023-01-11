<template>
   <router-view></router-view>
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
