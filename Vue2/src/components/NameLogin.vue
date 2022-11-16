<template>
        <div class="userloginbox">
            <div class="listbox">
                用户名&emsp;：<input type="text" placeholder="请输入用户名">
            </div>
            <div>
                密&emsp;码&emsp;：<input type="password" placeholder="请输入密码">
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
</style>