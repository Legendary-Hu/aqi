<template>
    <div>
        <div class="banner">

        </div>
        <div class="transition">

        </div>
        <div>
            <el-divider content-position="center">意见反馈</el-divider>
            <el-form ref="feedBackForm" :model="form" label-width="80px">
                <el-form-item label="昵称" prop="name" required :rules="{required: true,message:'请填写昵称'}">
                    <el-input v-model="form.name" show-word-limit maxlength="10" placeholder="请问怎么称呼您？"/>
                </el-form-item>
                <el-form-item
                        prop="email"
                        label="邮箱"
                        :rules="[
                            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]"
                >
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="connect">
                    <el-input v-model="form.connect" show-word-limit maxlength="50" placeholder="您愿意保持沟通嘛？"/>
                </el-form-item>
                <el-form-item label="反馈内容" prop="content" required :rules="{required: true,message:'请填写反馈内容'}">
                    <el-input v-model="form.content" show-word-limit maxlength="500" type="textarea" rows="8"
                              placeholder="请填写反馈内容"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交反馈</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>

        </div>
    </div>


</template>

<script>
    import {post} from '../../network/request'
    export default {
        name: 'Feedback',
        data() {
            return {
                form: {
                    name: '',
                    email:'',
                    connect: '',
                    content: ''
                }
            }
        },

        methods: {
            onSubmit() {
                this.$refs.feedBackForm.validate(v => {
                    if (v) {
                        // 提交数据到后台
                        post('http://localhost:8000/aqi/form/',
                            this.form
                        ).then(res =>{
                            // console.log(res)
                            if (res.status==200){
                                this.$message({
                                    message: '提交成功！感谢您的反馈！',
                                    type: 'success'
                                })
                            }
                        })

                    }else {
                        this.$message.error('提交失败！');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .transition{
        width: 100%;
        height: 40px;
        background: #509D01;
    }
    .banner{
        width: 100%;
        height: 450px;
       background: url("../../assets/img/background/banner.jpg");
    }
</style>