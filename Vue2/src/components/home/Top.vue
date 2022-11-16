<template>
    <div class="top">
        <div class="log">
            <img src="../../../public/img/logo/logo_long.png" width="200px" height="100px" alt="图片未加载">
        </div>
        <div class="select">
            <el-select style="width: 80px;" v-model="searchflag" >
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </div>
        <div class="search">
            <div v-if="searchflag=='dishes'">
                <input class="search_input" type="text" placeholder="搜索美食名称" ref="disheskw">
                <el-button class="search_btn" type="primary" icon="el-icon-search" @click="dishesSearch">搜索</el-button>
            </div>
            <div v-if="searchflag=='shop'">
                <input class="search_input" type="text" placeholder="搜索店铺名称" ref="shopkw">
                <el-button class="search_btn" type="primary" icon="el-icon-search" @click="shopSearch">搜索</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Top',
        data(){
            return{
                options:[
                    {
                        label:"菜品",
                        value:"dishes"
                    },
                    {
                        label:"店铺",
                        value:"shop"
                    }
                ],
                searchflag:'dishes'
            }
        },
        methods:{
            dishesSearch(){
                if(!this.$refs.disheskw.value.trim()){
                    alert("关键字不能为空")
                    return
                }
                else{
                    this.$router.push({
                        name:'dishessearch',
                        query:{
                            kw:this.$refs.disheskw.value
                        }
                    })
                }

            },
            shopSearch(){
                if(!this.$refs.shopkw.value.trim()){
                    alert("关键字不能为空")
                    return
                }
                else{
                    this.$router.push({
                        name:'shopsearch',
                        query:{
                            kw:this.$refs.shopkw.value
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
.top{
    position: relative;
    left: 125px;
    background-color: transparent;
    width: 1200px;
    height: 100px;
}
.log{
    position:absolute;
    left: 50px;
    background-color: aliceblue;
    width: 200px;
    height: 100px;
    overflow: hidden;
}
.search{
    position:absolute;
    right: 300px;
    top: 40px;
}
.search_input{
    display: inline;
    width: 400px;
    height: 40px;
    border-radius:7px 7px 7px 7px;
}
.search_btn{
    text-align: center;
    margin: 0 0 0 10px;
    width: 100px;
    height: 46px;
    border-radius:7px 7px 7px 7px;
}
.select{
    float: left;
    margin: 45px 0 0 280px;
}
</style>