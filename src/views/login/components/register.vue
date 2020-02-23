<template>
  <div id="reg_zhuce">
    <!-- Form -->

    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog title="用户注册" center :visible.sync="dialogFormVisible" width="550px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
          <el-upload
            v-model="form.avatar"
            name="image"
            class="avatar-uploader"
            :action="avatarUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" show-password auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.code" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="7">
              <div class="reg_code">
                <img :src="picUrl" alt @click="getRandomCode" ref="reg_code_picUrl" />
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="msg">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.msg" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="7">
              <el-button
                :disabled="shijian != 0"
                class="reg_msg"
                plain
                @click="huoquCode"
              >{{shijian==0?'获取用户验证码':'请'+shijian+'s后重新发送'}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入封装的axios
import { sendUrl, register } from "../../../api/register";
export default {
  data() {
    return {
      // form表单
      form: {
        // 用户名
        name: "",
        // 邮箱
        email: "",
        // 手机号
        phone: "",
        // 密码
        password: "",
        // 属性
        type: [],
        // 图形码
        code: "",
        // 验证码
        msg: "",
        // 头像地址
        avatar: ""
      },
      // 头像的请求地址
      avatarUrl:
        process.env.VUE_APP_URL + "/uploads" + "&" + Math.random() * 99,
      imageUrl: "",
      // 表单的宽度
      formLabelWidth: "70px",
      //  dialogTableVisible: false,
      // 是否显示注册框
      dialogFormVisible: false,
      // 验证规则
      rules: {
        // 头像
        avatar: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        // 姓名
        name: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { max: 6, message: "长度在1-6个字符", trigger: "change" }
        ],
        // 邮箱
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "change" }
        ],
        // 手机
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "长度在11个字符",
            trigger: "change"
          }
        ],
        // 密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 8, max: 16, message: "长度在8-16个字符", trigger: "change" }
        ],
        // 图形码
        code: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          {len:4, message: "请正确输入验证码", trigger: "change" }
        ],
        // 验证码
        msg: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len:4, message: "请正确输入验证码", trigger: "change" }
        ]
      },
      // 获取图形码
      picUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 获取验证码
      // btnDisabled: false,
      // 倒计时
      shijian: 0
    };
  },
  methods: {
    // 确认的点击事件
     //要找到表单对象（就先要给表单加ref属性）
    dialogFormVisibles() {
      this.$refs.form.validate(valid => {
        if (valid) {
          register({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.code
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("注册成功!");
              this.dialogFormVisible = false;
              this.$refs.form.resetFields();
              this.imageUrl = "";
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    // 图形码的点击事件
    getRandomCode() {
      // 利用时间戳刷新验证码
      this.$refs.reg_code_picUrl.src =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + "&" + Date.now();
    },
    // 时间封装
    getTime(time) {
      this.btnDisabled = true;
      this.shijian = time;
      let tiemr = setInterval(() => {
        if (this.shijian != 0) {
          this.shijian--;
        } else {
          clearInterval(tiemr);
          // this.btnDisabled = false;
        }
      }, 1000);
    },
    // 获取验证码
    huoquCode() {
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        return this.$message.error("手机号码不正确");
      }
      if (this.form.code.length != 4) {
        return this.$message.error("验证码格式不正确");
      }
      this.getTime(60);
      sendUrl({
        code: this.form.code,
        phone: this.form.phone
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("您的验证码为" + res.data.data.captcha);
        } else {
          this.getTime(0);
          this.getRandomCode();
          this.$message.error(res.data.message);
        }
      });
    },
    // 
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.form.avatar = res.data.file_path;
      this.$refs.form.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {}
};
</script>

<style lang="less">
.el-dialog__wrapper {
  .el-dialog--center {
    height: 650px;
    margin-top: 0 !important;
    .el-dialog__body {
      padding: 0;
      margin-right: 27px;
    }
  }
  .reg_code {
    width: 100%;
    height: 39px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.el-dialog__header {
  background: linear-gradient(to right, #01c5fb, #1495fd);
  padding: 10px 10px 10px !important;
  .el-dialog__title {
    font-size: 17px;
    color: white;
  }
}
.avatar-uploader {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px !important;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>