<template>
    <div>
        <Map></Map>
        <div>

        </div>
        <TableList></TableList>
    </div>



</template>

<script>
    import Map from "./Map";
    import TableList from "../TableList/TableList";
    export default {
        name: "Index",
        components:{
            Map,
            TableList,
        }
    }
</script>

<style scoped>

</style>