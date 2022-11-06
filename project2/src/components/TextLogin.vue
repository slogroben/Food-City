<template>
    <div class="userloginbox">
        <div class="listbox">
            手机号&emsp;：<input type="text" placeholder="请输入手机号">
        </div>
        <div class="yzbox1">
				验证码&emsp;：<input class="yz" type="text" placeholder="请输入验证码">
				<button type="button" class="yzcode">发送验证码</button>
		</div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
input{
    width: 300px;
    height: 38px;
    border:1px solid #ffffff ;
    background-color: #ffffff;
    opacity: 1;
    /* border-radius: 7px 7px 7px 7px; */
}
input:focus{
    outline:1px solid;
    border-color: #2e58ff;
}
.userloginbox{
    position: absolute;
    top: 130px;
    margin: 0 30px 0 30px;
}
.listbox{
    margin: 20px 0 30px 0;
}
.yzbox1{
    position: relative;
}

.yzcode{
        display: block;
        position: absolute;
        text-align: center;
        right: 0px;
        top: 7px;
        width: 100px;
        height: 30px;
        font-size: 17px;
        line-height: 16px;
        color: #4e6ef2;
        border: 0;
        border-left: 1px solid grey;
        background-color: #fff;
        cursor: pointer;
        z-index: 100;
}
</style>