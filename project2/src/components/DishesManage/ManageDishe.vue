<template>
  <div>
    <div>
        <input type="text" v-model="keyword">
        <button @click="search">搜索</button>
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
                <el-button type="text" size="small" @click="del(scope.row.dishes_id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog
        v-if="thisDishes"
        :title="thisDishes.dishes_title"
        :visible.sync="revisevisable"
        width="30%">
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
                        <input  type="file" @change="imgcharge($event,1)" ref="img1" :hidden="thisDishes.dishes_img1==''? false:true">
                        <img v-if="thisDishes.dishes_img1" :src="img(thisDishes.dishes_img1)" alt="图片未加载">
                    </label>
                </div>
            </el-form-item>
            <el-form-item label="菜品图2">
                <label>
                    <input type="file" @change="imgcharge($event,2)" ref="img2" :hidden="thisDishes.dishes_img2==''? false:true">
                    <img v-if="thisDishes.dishes_img2" :src="img(thisDishes.dishes_img2)" alt="图片未加载">
                </label>
            </el-form-item>
            <el-form-item label="菜品图3">
                <label>
                    <input type="file" @change="imgcharge($event,3)" ref="img3" :hidden="thisDishes.dishes_img3==''? false:true">
                    <img v-if="thisDishes.dishes_img3" :src="img(thisDishes.dishes_img3)" alt="图片未加载">
                </label>
            </el-form-item>
            <el-form-item label="菜品图4">
                <label>
                    <input type="file" @change="imgcharge($event,4)" ref="img4" :hidden="thisDishes.dishes_img4==''? false:true">
                    <img v-if="thisDishes.dishes_img4" :src="img(thisDishes.dishes_img4)" alt="图片未加载">
                </label>
            </el-form-item>
            <el-form-item label="菜品图5">
                <label>
                    <input  type="file" @change="imgcharge($event,5)" ref="img5" :hidden="thisDishes.dishes_img5==''? false:true">
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
    <!-- <table>
        <tr>
            <th>菜品标题</th>
            <th>菜品类型</th>
            <th>菜品图1</th>
            <th>菜品图2</th>
            <th>菜品图3</th>
            <th>菜品图4</th>
            <th>菜品图5</th>
            <th>菜品单价</th>
            <th>菜品描述</th>
            <th>操作</th>
        </tr>
        <tr v-for="(d,index) in showDishesList" :key="index">
            <td>
                <p v-show="!d.isEdit">{{d.dishes_title}}</p>
                <input v-show="d.isEdit" type="text" v-model="d.dishes_title"/>
            </td>
            <td>
                <p v-show="!d.isEdit">{{d.dishes_type}}</p>
                <input v-show="d.isEdit" type="text" v-model="d.dishes_type"/>
            </td>
            <td>
                <p v-if="d.dishes_img1==''&!d.isEdit">暂无图片</p>
                <p v-show="!d.isEdit">{{d.dishes_img1}}</p>
                <input v-show="d.isEdit" type="file"/>
            </td>
            <td>
                <p v-if="d.dishes_img2==''&!d.isEdit">暂无图片</p>
                <p v-show="!d.isEdit">{{d.dishes_img2}}</p>
                <input v-show="d.isEdit" type="file"/>
            </td>
            <td>
                <p v-if="d.dishes_img3==''&!d.isEdit">暂无图片</p>
                <p v-show="!d.isEdit">{{d.dishes_img3}}</p>
                <input v-show="d.isEdit" type="file"/>
            </td>
            <td>
                <p v-if="d.dishes_img4==''&!d.isEdit">暂无图片</p>
                <p v-show="!d.isEdit">{{d.dishes_img4}}</p>
                <input v-show="d.isEdit" type="file"/>
            </td>
            <td>
                <p v-if="d.dishes_img5==''&!d.isEdit">暂无图片</p>
                <p v-show="!d.isEdit">{{d.dishes_img5}}</p>
                <input v-show="d.isEdit" type="file"/>
            </td>
            <td>
                <p v-show="!d.isEdit">{{d.dishes_price}}</p>
                <input v-show="d.isEdit" type="text" v-model="d.dishes_price"/>
            </td>
            <td>
                <p v-show="!d.isEdit">{{d.dishes_description}}</p>
                <input v-show="d.isEdit" type="text" v-model="d.dishes_description"/>
            </td>
            <td>
                <button v-show="!d.isEdit" @click="reviseDishes(d,index)">修改菜品</button>
                <button v-show="d.isEdit" @click="saveDishes(d,index)">保存修改</button>
                <button @click="del(d.dishes_id)">删除菜品</button>
            </td>
        </tr>
    </table> -->
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    name:'ManageDishe',
    data(){
        return {
            dishesList:'',
            showDishesList:'',
            keyword:'',
            revisevisable:false,
            thisDishes:'',
            oldDishes:'',
            newDishes:'',
            
        }
    },
    computed:{
        shop_id(){
            let seller=JSON.parse(sessionStorage.getItem('seller'))
            return seller.shop_id
        },
    },    
    methods:{
        getDishesList(){
            axios({
                method:'get',
                url:'http://localhost:8080/My/DishesFindAllServlet?shop_id='+this.shop_id
            }).then(
                response=>{
                    this.dishesList=response.data
                    this.showDishesList=this.dishesList
                    this.showDishesList.forEach(d => {
                                d.isEdit=false
                                return 
                            });
                },
                error=>{
                    console.log("请求失败");
                }
            )
        },
        revise(dishes){
                 this.revisevisable=true
                 this.oldDishes=dishes
                 this.thisDishes=dishes    
                 this.newDishes=dishes     
            },
        saveRevise(){
            let formData = new FormData()
            formData=this.thisDishes
            axios({
                method:'post',
                url:'http://localhost:8080/My/DishesReviseServlet',
                data:formData,
                headers: {
                        'Content-Type': 'multipart/form-data'
                    }
            }).then(
                response=>{
                    this.revisevisable = false
                },
                error=>{
                    console.log(error);
                }
            )   
            this.$mount()             
        },
        // reviseDishes(d,index){
        //     if(this.showDishesList[index].dishes_id==d.dishes_id){
        //         this.showDishesList[index].isEdit=!d.isEdit
        //     }
        //     this.$mount()
        // },
        // saveDishes(d,index){
        //     console.log(d);
        //     if(this.showDishesList[index].dishes_id==d.dishes_id){
        //         this.showDishesList[index].isEdit=!d.isEdit
        //         axios({
        //             method:'post',
        //             url:'http://localhost:8080/My/DishesReviseServlet',
        //             data:qs.stringify(d),
        //         })
        //         .then(
        //             response=>{
        //                 console.log(d);
        //                 console.log("修改成功");
        //             },
        //             error=>{
        //                 console.log(error);
        //             }
        //         )
        //     }
        //     this.$mount()
        // },
        del(dishes_id){
            axios({
                method:'get',
                url:'http://localhost:8080/My/DishesDelServlet?dishes_id='+dishes_id,
            })
            .then(
                response=>{
                    this.getDishesList()
                },
                error=>{
                    console.log(error);
                }
            )
            this.getDishesList()
            this.$mount()
        },
        search(){
            this.showDishesList=this.dishesList
            this.showDishesList=this.showDishesList.filter(d=>{
                return d.dishes_title.indexOf(this.keyword)!==(-1)           
            })
        },
        img(path){
            const imgname=path.replace('D:\\study\\myproject\\project1\\src\\assets\\upload\\','')
            return require('@/assets/upload/'+imgname)
        },
        imgcharge(event,num){
            if(num==1){
                this.thisDishes.dishes_img1=this.$refs.img1.files[0]
            }
            if(num==2){
                this.thisDishes.dishes_img2=this.$refs.img2.files[0]
            }
            if(num==3){
                this.thisDishes.dishes_img3=this.$refs.img3.files[0]
            }
            if(num==4){
                this.thisDishes.dishes_img4=this.$refs.img4.files[0]
            }
            if(num==5){
                this.thisDishes.dishes_img5=this.$refs.img5.files[0]
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