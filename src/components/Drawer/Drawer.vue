

<el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
    点我打开Drawer
</el-button>

<el-drawer
        :title="title"
        :visible.sync="drawer"
        :direction="rtl"
        :before-close="handleClose">
    <span>{{message}}</span>
</el-drawer>

<script>
    export default {
        data() {
            return {
                drawer: false,
                title:'系统提醒',
                direction: 'rtl',
                message: '我来啦'
            };
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    };
</script>