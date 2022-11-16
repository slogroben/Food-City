<template>
    <div class="bottom">
            <hr>
            <div class="bottom_left">
                <ul>
                    <li style="font-size: 14px;">&copy;2077 美食城版权所有 </li>
                    <li>京IICPP证888号京ICP备12123423号-1</li>
                    <li>广播电视节目制作经营不许可证（京）字第023489号</li>
                    <li>互联网药品信息服务资格证 (京)-开发性-4342-1212</li>
                    <li>医疗器械网络交易服务第三方平台备案：</li>
                    <li>号（京）网械平台备字[2077]第00004</li>
                    <li>平台EQDI不许可证</li>
                    <li>药品医疗器械网络信息服务备没案编号：1214</li>
                </ul>
            </div>
            <div class="bottom_right">
                <ul>
                    <li>京公网安备 11000002002052号</li>
                    <li><img src="" alt="图片未加载"></li>
                    <li><img src="" alt="图片未加载"></li>
                    <li><img src="" alt="图片未加载"></li>
                </ul>
                <router-link :to="{name:'adminlogin'}">我是管理员</router-link>
            </div>
    </div>
</template>

<script>
    export default {
        name:'Footer',
    }
</script>

<style scoped>
.bottom{
    color: white;
    background-image: url('@/assets/background/11.jpg');
    height: 100%;
    width: 100%;
    background-size:100% 100%;
    position: relative;
    margin: 0 125px 0 125px;
    background-color:bisque;
    width: 1200px;
    height: 200px;
    margin-top: 0;
}
.bottom_left ul li{
    list-style: none;
    font-size: 13px;
}
.bottom_right ul li{
    list-style: none;
    font-size: 13px;
}
.bottom_left{
    position: absolute;
}
.bottom_right{
    position: absolute;
    right: 200px;
}
</style>