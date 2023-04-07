<template>
    <div>
        <!-- tabs标签页 -->
        <el-tabs type="border-card">
            <!-- 个人信息修改 -->
            <el-tab-pane label="修改个人信息">
                <div style="margin: 0px;padding: 50px;width: 400px;">
                    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                        <el-form-item label="用户头像:">
                            <!-- class里面写样式，:action是执行上传动作的后台接口，action必选参数，上传的地址 -->
                            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="formLabelAlign.avatar" :src="formLabelAlign.avatar" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="用户名:">
                            <el-input v-model="formLabelAlign.username"></el-input>
                        </el-form-item>
                        <el-form-item label="真实姓名:">
                            <el-input v-model="formLabelAlign.realName"></el-input>
                        </el-form-item>
                        <el-form-item label="性别:">
                            <el-radio v-model="formLabelAlign.gender" label="0">男</el-radio>
                            <el-radio v-model="formLabelAlign.gender" label="1">女</el-radio>
                        </el-form-item>
                        <el-form-item label="手机号:">
                            <el-input v-model="formLabelAlign.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱:">
                            <el-input v-model="formLabelAlign.email"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="个性签名">
                            <el-input v-model="formLabelAlign.signature"></el-input>
                        </el-form-item> -->
                        <el-form-item>
                            <el-button type="primary" @click="reviseUserinfoByUserid">保存</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <!-- 用户密码修改界面 -->
            <el-tab-pane label="修改密码">
                <div style="margin: 0px;padding: 50px;height:700px;width: 400px;">
                    <el-form :label-position="labelPosition" label-width="80px" :model="revisepassword" :rules="rules"
                        class="demo-ruleForm">
                        <el-form-item label="原密码:" prop="oldPass">
                            <el-input type="password" v-model="revisepassword.oldPass"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="newPass">
                            <el-input type="password" v-model="revisepassword.newPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="revisepassword.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="reviseUserPass">确认修改</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>

</template>

<script>
import store from '@/store';
import userinfoApi from '@/api/userinfo'

export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                var validata = this.vailUserPass().then((result) => {
                    // console.log(result);
                })
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.revisepassword.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            labelPosition: 'left',
            revisepassword: {
                oldPass: '',
                newPass: '',
                checkpass: '',
            },
            rules: {
                oldPass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },
            formLabelAlign: [],
            userid: store.getters.id,
            username:store.getters.name,
            userpassword: store.getters.password,
        };
    },
    // 初始化时调用
    created() {
        // 调用查询用户信息
        this.selectUserInfoByUserid();
    },
    mounted() {
        setTimeout(() => {
            // this.vailUserPass();
            //这里就写你要执行的语句即可，先让数据库的数据加载进去数组中，你再从数组中取值就好了
        }, 800)
    },
    methods: {
        //  根据当前登录用户查询用户信息
        async selectUserInfoByUserid() {
            // 获取用户id
            let params = {
                userid: this.userid,
            }
            // 发送查询请求
            let res = await userinfoApi.getUserInfoByUserid(params);
            if (res.success) {
                const { data } = res;
                console.log(data);
                this.formLabelAlign = JSON.parse(JSON.stringify(data));
            }
        },
        // 修改当前用户信息
        async reviseUserinfoByUserid() {
            // 需要传递的参数
            let params = {
                userid: this.userid,
                avatar: this.formLabelAlign.avatar,
                username: this.formLabelAlign.username,
                realname: this.formLabelAlign.realName,
                phone: this.formLabelAlign.phone,
                email: this.formLabelAlign.email,
                gender: this.formLabelAlign.gender,
                signature: this.formLabelAlign.signature,
            }
            let res = await userinfoApi.reviseUserinfoByUserid(params);
            if (res.success) {
                this.selectUserInfoByUserid();
                alert("用户信息修改成功!")
            } else {
                alert("用户信息修改失败!")
            }
        },
        // 修改用户密码信息
        async reviseUserPass() {
            let params = {
                username:this.username,
                newPass: this.revisepassword.newPass,
            }
            console.log(params);
            let res = await userinfoApi.reviseUserPass(params);
            if (res.success) {
                alert("密码修改成功!")
            }
        },
        // 头像上传成功后操作
        handleAvatarSuccess(res, file) {
            this.formLabelAlign.imageUrl = URL.createObjectURL(file.raw);
        },
        // 头像上传之前操作
        beforeAvatarUpload(file) {
            const isimg = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isimg) {
                this.$message.error('上传头像图片只能是 png 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isimg && isLt2M;
        },
        // 用户密码验证
        async vailUserPass() {
            var valiresult
            let params = {
                oldPass: this.revisepassword.oldPass,
                userPass: this.userpassword,
            }
            let res = await userinfoApi.vailUserPass(params);
            if (res.data == true) {
                valiresult = res.data
            } else {
                valiresult = res.data
            }
            return valiresult
        }
    }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>