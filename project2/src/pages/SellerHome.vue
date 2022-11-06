<template>
  <div>
    <el-menu
        class="el-menu-vertical-demo"
        @select="handleSelect"
        style="width: 200px;height: 600px;"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">我的店铺</el-menu-item>
        <el-menu-item index="err" v-if="seller.shopstate=='review'" disabled>审核中</el-menu-item>
        <el-menu-item index="err" v-if="seller.shopstate=='reject'" disabled>入驻被拒绝</el-menu-item>
        <el-menu-item index="err" v-if="seller.shopstate=='quit'" disabled>已经退出入驻</el-menu-item>
        <el-menu-item index="err" v-if="seller.shopstate=='isquit'" disabled>退出申请中</el-menu-item>
        <el-submenu index="2" v-if="seller.shopstate=='operate'">
          <template slot="title">菜品管理</template>
          <el-menu-item index="2-1">发布菜品</el-menu-item>
          <el-menu-item index="2-2">管理菜品</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="rightbox">
        <router-view></router-view>
      </div>
    
  </div>
</template>

<script>
export default {
    name:'SellerHome',
    data(){
      return{
          seller:''
      }
    },
    methods:{
      handleSelect(key, keyPath) {
        if(key=='1'){
          this.$router.push({name:'mysellermanage'})
        }
        if(key=='2-1'){
          this.$router.push({name:'pushdishe'})
        }
        if(key=='2-2'){
          this.$router.push({name:'managedishe'})
        }
      }
    },
    mounted(){
      this.seller=JSON.parse(sessionStorage.getItem('seller'))
    }
    
}
</script>

<style scoped>
.rightbox{
  position: absolute;
  width: 900px;
  height: 600px;
  top: 10px;
  left: 230px;
}
</style>