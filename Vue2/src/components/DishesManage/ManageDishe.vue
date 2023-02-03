<template>
  <div>
    <div>
        <input type="text" style="width: 200px;height: 30px;"
                placeholder="根据名称查询"
                ref="keyword">
                <el-button v-if="!searchflag" style="margin: 0 0 0 10px;" type="primary" @click="search" slot="append" icon="el-icon-search">搜索</el-button>
                <el-button v-if="searchflag" @click="dropSeach" style="margin: 0 10px 0 10px;float: right;" type="danger" slot="append" icon="el-icon-close">清除搜索</el-button>
    </div>
        <el-table
            v-if="showDishesList"
            :data="showDishesList"
            stripe
            style="width: 100%">
            <el-table-column prop="dishes_title" :show-overflow-tooltip=true label="菜品标题" width="180"></el-table-column>
            <el-table-column prop="dishes_type" label="菜品类型" width="180"></el-table-column>
            <el-table-column label="菜品图1" width="180">
                <template slot-scope="d">
                    <div>
                        <img v-if="d.row.dishes_img1" :src="img(d.row.dishes_img1)" alt="图片未加载">
                    </div> 
                </template>  
            </el-table-column>
            <el-table-column prop="dishes_img2" label="菜品图2" width="180">
                <template slot-scope="d">
                    <div>
                        <img v-if="d.row.dishes_img2" :src="img(d.row.dishes_img2)" alt="图片未加载">
                    </div> 
                </template> 
            </el-table-column>
            <el-table-column prop="dishes_img3" label="菜品图3" width="180">
                <template slot-scope="d">
                    <div>
                        <img v-if="d.row.dishes_img3" :src="img(d.row.dishes_img3)" alt="图片未加载">
                    </div> 
                </template> 
            </el-table-column>
            <el-table-column prop="dishes_img4" label="菜品图4" width="180">
                <template slot-scope="d">
                    <div>
                        <img v-if="d.row.dishes_img4" :src="img(d.row.dishes_img4)" alt="图片未加载">
                    </div> 
                </template> 
            </el-table-column>
            <el-table-column prop="dishes_img5" label="菜品图5" width="180">
                <template slot-scope="d">
                    <div>
                        <img v-if="d.row.dishes_img5" :src="img(d.row.dishes_img5)" alt="图片未加载">
                    </div> 
                </template> 
            </el-table-column>
            <el-table-column prop="dishes_price" label="菜品单价"></el-table-column>
                <el-table-column prop="dishes_description" :show-overflow-tooltip=true  label="菜品描述"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope='scope' >
                <el-button type="text" size="small" @click="revise(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog
        v-if="thisDishes"
        :title="thisDishes.dishes_title"
        :visible.sync="revisevisable"
        width="500px">
        <el-form label-width="80px">
            <el-form-item label="菜品标题">
                <el-input v-model="thisDishes.dishes_title"></el-input>
            </el-form-item>
            <el-form-item label="菜品类型">
                <el-input v-model="thisDishes.dishes_type"></el-input>
            </el-form-item>
            <el-form-item label="菜品图1">
                <div>
                    <label>
                        <input ref="img1" type="file" @change="imgcharge($event)" :hidden="thisDishes.dishes_img1">
                        <img v-if="thisDishes.dishes_img1" :src="img(thisDishes.dishes_img1)" alt="图片未加载">
                    </label>
                </div>
            </el-form-item>
            <el-form-item label="菜品图2">
                <label>
                    <input ref="img2" type="file" @change="imgcharge($event)" :hidden="thisDishes.dishes_img2">
                    <img v-if="thisDishes.dishes_img2" :src="img(thisDishes.dishes_img2)" alt="图片未加载">
                </label>
            </el-form-item>
            <el-form-item label="菜品图3">
                <label>
                    <input ref="img3" type="file" @change="imgcharge($event)" :hidden="thisDishes.dishes_img3">
                    <img v-if="thisDishes.dishes_img3" :src="img(thisDishes.dishes_img3)" alt="图片未加载">
                </label>
            </el-form-item>
            <el-form-item label="菜品图4">
                <label>
                    <input ref="img4" type="file" @change="imgcharge($event)" :hidden="thisDishes.dishes_img4">
                    <img v-if="thisDishes.dishes_img4" :src="img(thisDishes.dishes_img4)" alt="图片未加载">
                </label>
            </el-form-item>
            <el-form-item label="菜品图5">
                <label>
                    <input ref="img5"  type="file" @change="imgcharge($event)" :hidden="thisDishes.dishes_img5">
                    <img v-if="thisDishes.dishes_img5" :src="img(thisDishes.dishes_img5)" alt="图片未加载">
                </label>
            </el-form-item>
            <el-form-item label="菜品单价">
                <el-input v-model="thisDishes.dishes_price"></el-input>
            </el-form-item>
            <el-form-item label="菜品描述">
                <el-input v-model="thisDishes.dishes_description"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="revisevisable = false">取消修改</el-button>
            <el-button type="primary" @click="saveRevise">保存修改</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { mapState } from 'vuex'
import server from '@/utils/request'
export default {
    name:'ManageDishe',
    data(){
        return {
            dishesList:'',
            keyword:'',
            showDishesList:'',
            revisevisable:false,
            thisDishes:'',
            searchflag:""
        }
    },
    computed:{
        ...mapState(['seller']),
    },    
    methods:{
        getDishesList(){
            server.getReq('/seller/getMyDishes')
            .then(
                response=>{
                    this.dishesList=response.data
                    this.showDishesList=this.dishesList
                },
                error=>{
                    console.log("请求失败");
                }
            )
        },
        revise(dishes){
                 this.revisevisable=true
                 this.thisDishes=dishes
            },
        saveRevise(){
            let formData = new FormData()
            let dishe=this.thisDishes
            for (const key in dishe) {
                if(key.includes('dishes_img')){
                    let index=key.replace('dishes_img','')
                    let file=this.$refs[`img${index}`].files[0]
                    if(file){
                        if(!(dishe[key]===null)){
                            formData.append('oldpic',dishe[key])
                        }
                        formData.append(key,file)
                    }else{
                        formData.append(key,dishe[key])
                    }
                }else{
                    formData.append(key,dishe[key])
                }
            }
            server.postReq('/seller/reDishe',formData,{
                        'Content-Type': 'multipart/form-data'
                    }
                ).then(
                response=>{
                    this.revisevisable = false
                    this.$message({
                        message:'修改成功',
                        type:'success'
                    })
                },
                error=>{
                    this.revisevisable = false
                    this.$message({
                        message:'修改失败,出现未知错误',
                        type:'error'
                    })
                }
            )   
            this.getDishesList()            
        },
        del(dishe){
            server.postReq('/seller/deleteDishe',dishe)
            .then(
                response=>{
                    this.getDishesList()
                },
                error=>{
                    console.log(error);
                }
            )
            this.getDishesList()
        },
        search(){
            this.searchflag=true
            this.showDishesList=this.dishesList.filter(d=>{
                return d.dishes_title.indexOf(this.$refs.keyword.value)!==(-1)           
            })
        },
        dropSeach(){
            this.searchflag=false
            this.$refs.keyword.value=''
            this.getDishesList()
        },
        img(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\upload\\','')
            return require('@/assets/upload/'+imgname)
        },
        imgcharge(event,num){
            let reads=new FileReader()
            reads.readAsDataURL(event.target.files[0])
            reads.onload=(e)=>{
                event.target.parentNode.children[1].src=reads.result
            }
        }
    },
    mounted(){
        this.getDishesList()
    }
}
</script>

<style scoped>
input{
    width: 100px;
}
img{
    width: 100px;
    height: 100px;
}
</style>