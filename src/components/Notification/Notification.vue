<template>
    <el-button
            plain
            @click="open1">
        成功
    </el-button>
</template>

<script>
    export default {
        name: "Notification",
        methods: {
            open1() {
                this.$notify({
                    title: '成功',
                    message: '这是一条成功的提示消息',
                    type: 'success'
                });
            }
        }
    }
</script>

<style scoped>

</style>