<template>
  <div>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">会员管理</el-menu-item>
        <el-submenu index="2">
          <template slot="title">商家管理</template>
          <el-menu-item index="2-1">商家入驻申请</el-menu-item>
          <el-menu-item index="2-2">商家退出申请</el-menu-item>
          <el-menu-item index="2-3">取消商家经营资格</el-menu-item>
        </el-submenu>
      </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name:'AdminHome',
    data(){
      return{

      }
    },
    methods:{
      handleSelect(key, keyPath) {
        if(key=='1'){
          this.$router.push({name:'usermanage'})
        }
        if(key=='2-1'){
          this.$router.push({name:'sellerisPass'})
        }
        if(key=='2-2'){
          this.$router.push({name:'sellerquit'})
        }
        if(key=='2-3'){
          this.$router.push({name:'sellerdel'})
        }
      }
    }
    
}
</script>

<style scoped>

</style>