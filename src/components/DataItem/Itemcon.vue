<template>
    <div class="item">
        <div class="item-bg"><slot name="data-name"></slot></div>
        <div class="item-value">
            <slot name="data-value"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Itemcon",

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
        background: #43CE17;
    }
    .item-value{
        width: 60px;
        height: 32px;
        background: #DCE9ED;
    }

</style>