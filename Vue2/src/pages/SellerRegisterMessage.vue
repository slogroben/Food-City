<template>
      <div class="box1">
            <div>
                <h1 class="headermsg">填写门店信息</h1>
            </div>      
            <div class="msgList">
                <div>
                    <span>*</span>
                    <span>门店名称：</span>
                    <input type="text" v-model="shopname" placeholder="门店招牌上的名称，长度小于50">
                </div>
                    <div class="block">
                    <span>*</span>
                    <span>所在地区：</span>
                    <el-cascader
                        v-model="valuecity"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange"></el-cascader>
                </div>
                <div>
                    <span>&nbsp;</span>
                    <span>详细地址：</span>
                    <input type="text" v-model="address" placeholder="填写具体地址">
                </div>
                <div>
                    <span>*</span>
                    <span>门店品类：</span>
                    <el-select v-if="type" v-model="thistype" placeholder="请选择">
                        <el-option
                        v-for="item in type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span>*</span>
                    <span>营业状态：</span>
                    <label>
                        <input type="radio" name="operate" value="true" v-model="state">正在营业
                    </label>
                    <label>
                        <input type="radio" name="operate" value="false" v-model="state">尚未营业
                    </label>
                </div>
                <div>
                    <span>*</span>
                    <span>门店电话：</span>
                    <input type="text" v-model="phone" placeholder="请输入座机或者手机号">
                </div>
                <div>
                    <span>*</span>
                    <span>营业时间：</span> 
                    <el-time-select
                        v-model="worktime"
                        :picker-options="{
                            start: '00:00',
                            step: '1:00',
                            end: '24:00'
                        }"
                        placeholder="选择时间">
                    </el-time-select>
                </div>
                <div>
                    <span>*</span>
                    <span>上传图片：</span>
                    <input type="file" ref="file" accept="*.jpeg, *.png, *.jpg"/>
                    <div style="margin: 0 0 0 15px;">
                        <p style="font-size: 13px;"><span style="font-size: 14px;">友情提醒</span><br>
                            1、建议现场拍摄门店的门头图，合格门头图需包含商户名和地址信息。如门头图未体现地址信息，可上<br>
                            传商场楼层指示牌、广告宣传图、点餐条、官网分店介绍或营业执照等辅助信息&nbsp;<a href="#">查看示例图</a><br>
                            2、目前仅支持以下格式的图片：psd/jpg/jpeg/png/gif/webp/bmp/heif<br>
                            3、单张图片大小请控制在20M以内，否则可能提交失败
                        </p>
                    </div>    
                </div>
                <div>
                    <p style="display:block;"><i style="color: red;">&nbsp;&nbsp;&nbsp;</i>店铺描述：</p>
                    <textarea style="display: inline;" v-model="description" cols="78" rows="7"></textarea>
                </div>
                <br>
                <div>
                    <!-- <button v-show="!btnflag" class="upload">提交进入下一步</button> -->
                    <button v-show="true" class="activeupload" @click="submit">保存并提交</button>
                </div>
            </div>
    </div>
</template>

<script>
    import axios from "axios"
    import qs from 'qs'
    export default {
        
        name:'SellerRegisterMessage',
        data() {
            return {
                //数据
                shopname:'',
                area:'',
                address:'',
                thistype:'',
                state:'',
                phone:'',
                worktime:'',
                imgfile:'',
                description:'',
                //el-time
                valuecity:[],
                btnflag:false,
                province:[],
                type:[
                    {
                        value:'中餐',
                        label:'中餐'
                    },
                    {
                        value:'西餐',
                        label:'西餐'
                    },
                    {
                        value:'火锅',
                        label:'火锅'
                    },
                    {
                        value:'自助餐',
                        label:'自助餐'
                    }
                    ,
                    {
                        value:'甜品',
                        label:'甜品'
                    }
                    ,
                    {
                        value:'水果',
                        label:'水果'
                    }
                    ,
                    {
                        value:'小吃',
                        label:'小吃'
                    }
                    ],
                allcitys:'',
                allprovinces:'',
                options:[],
            }
        },
        computed:{
        },
        methods: {
            handleChange(value) {
                 this.area=value[0]+value[1]
            },
            option(){
                
                this.allprovinces.forEach(p => {
                    this.options.push({
                        value: p.name,
                        label: p.name,
                        children:this.city(p)
                    })

                });
            },
            city(p){
                let children=[]
                let flag=0
                let oldflag=0
                this.allcitys.forEach(c =>{
                            if(p.ProID==c.ProID){
                                flag++
                                children.push({
                                    value: c.name,
                                    label: c.name,
                                })
                            }
                            if(flag!=0&flag==oldflag){
                                return
                            }
                            oldflag=flag
                    })
                return children
            },
            submit(){
                var formData = new FormData()
                
                console.log(this.$route.params);
                const shopList={
                    shopname:this.shopname,
                    area:this.area,
                    address:this.address,
                    shoptype:this.thistype,
                    state:this.state,
                    shopphone:this.phone,
                    worktime:this.worktime,
                    imgurl:this.$refs.file.files[0],
                    description:this.description,
                    sellerphone:this.$route.query.phone,
                    ispass:'false',
                    shopstate:'review'
                }
                formData=shopList
                axios({
                    method:'post',
                    url:'http://localhost:8080/My/SellerRegisterServlet',
                    data:formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(
                    response=>{
                        this.$message({
                            message: '开通店铺成功，请登录',
                            type: 'success'
                        })
                        setTimeout(() => {
                            this.$router.push({
                                name:'sellerlogin'
                            })
                        }, 1500);                       
                    },
                    error=>{
                        console.log('请求失败');
                    }
                )
            }
        },
        mounted(){
            axios({
                method:'get',
                url:'http://localhost:8000/city.json',
            })
            .then(
                response=>{
                    this.allcitys=response.data                   
                },
                error=>{
                    console.log('请求失败'+error);
                }
            )
            axios({
                method:'get',
                url:'http://localhost:8000/province.json',
            })
            .then(
                response=>{
                    this.allprovinces=response.data
                    this.option()
                },
                error=>{
                    console.log(error);
                }
            )
        }
    }        
</script>

<style scoped>
.box1{
    position: relative;
}
.msgList{
    position:relative;
    left: 300px;
    top: 100px;
    width: 800px;
    height: 900px;
    background-color: blanchedalmond;
}
.msgList > div{
    margin: 30px 30px 30px 100px;
}
input[type="text"]{
    width: 500px;
    height: 30px;
}
.upload{
        position: absolute;
        left: 190px;
        width: 400px;
        height: 45px;
        border-radius: 30px 30px 30px 30px;
        background-color: #bdcefc;
        border-style:none;
        color: #edeef2;
}
.activeupload{
        position: absolute;
        left: 190px;
        width: 400px;
        height: 45px;
        border-radius: 30px 30px 30px 30px;
        background-color: #2e58ff;
        border-style:none;
        color: #edeef2;
}
.headermsg{
    position: absolute;
    left: 550px;
    background-color: #bdcefc;
}

</style>

<style>
/* el-upload */
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>