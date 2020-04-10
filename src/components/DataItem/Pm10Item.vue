<template>
    <div class="item">
        <div v-if="pm10<=35" style="background: #43CE17" class="item-bg">PM10</div>
        <div v-else-if="pm10<=75" style="background: #EFDC31" class="item-bg">PM10</div>
        <div v-else-if="pm10<=115" style="background: #FFAA00" class="item-bg">PM10</div>
        <div v-else-if="pm10<=150" style="background: #FF401A" class="item-bg">PM10</div>
        <div v-else-if="pm10<=250" style="background: #800080" class="item-bg">PM10</div>
        <div v-else style="background: #9C0A4E" class="item-bg">PM10</div>
        <div class="item-value">{{pm10}}</div>
    </div>
</template>

<script>
    export default {
        name: "Pm10Item",
        props:{
            pm10:{
                default: 0
            }
        }
    }
</script>

<style scoped>
    .item{
        width: 60px;
        height: 56px;
    }
    .item-bg{
        width: 60px;
        height: 24px;
        font-size: 16px;
        text-align: center;
        line-height: 24px;
        color: #E9EEF3;
    }
    .item-value{
        width: 60px;
        height: 32px;
        font-size: 16px;
        color: #7f878c;
        text-align: center;
        line-height: 32px;
        background: #DCE9ED;
    }

</style>