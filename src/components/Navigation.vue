<template>
    <view class="navigation" 
        :style="{'height':navHeight,'background':navBgcolor,'padding-top':navTop}">
        <text :style="{ 'color': txcolor}">首页</text>
    </view>
</template>

<script>
export default {
    props:{
        txcolor:{ type:String,default:'#fff'},
        navBgcolor:{ type:String,default:null}
    },
    data(){
        return{
            navHeight:0,
            navTop:0
        }
    },
    created(){
        let menuButtonObj = uni.getMenuButtonBoundingClientRect(),
            that=this;
        uni.getSystemInfo({
            success:function(res){
                let statusBarHeight = res.statusBarHeight,
                    navTop = menuButtonObj.top,
                    navHeight = statusBarHeight+menuButtonObj.height+(menuButtonObj.top- statusBarHeight)*2;
                that.navHeight= navHeight + 'px';
                that.navTop = navTop +'px';
            }
        })
    }
}
</script>

<style lang="scss">
    .navigation{
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>