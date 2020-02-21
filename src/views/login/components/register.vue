<template>
  <div id="reg_zhuce">
    <!-- Form -->

    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog title="用户注册" center :visible.sync="dialogFormVisible" width="550px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="头像" :label-width="formLabelWidth" prop="touxiang">
          <el-upload
            class="avatar-uploader touxiang"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="form.handleAvatarSuccess"
            :before-upload="form.beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="form.dialogVisible" size="tiny">
            <img width="100%" :src="form.dialogImageUrl" alt />
          </el-dialog>
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
        <el-form-item label="密码" show-password :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" auto-complete="off"></el-input>
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
                :disabled="btnDisabled"
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
export default {
  data() {
    return {
      // form表单
      form: {
        dialogImageUrl: "",
        dialogVisible: false,
        name: "",
        email: "",
        phone: "",
        password: "",
        delivery: false,
        type: [],
        code: "",
        msg: ""
      },
      formLabelWidth: "70px",
      //  dialogTableVisible: false,
      dialogFormVisible: false,
      // 验证规则
      rules: {
        name: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { max: 6, message: "长度在1-6个字符", trigger: "change" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "change" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "长度在11个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 8, max: 16, message: "长度在8-16个字符", trigger: "change" }
        ],
        code: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 8, message: "请正确输入验证码", trigger: "change" }
        ],
        msg: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 8, message: "请正确输入验证码", trigger: "change" }
        ]
      },
      // 获取图形码
      picUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 获取头像
      imageUrl: "",
      // 获取验证码
      btnDisabled: false,
      // 倒计时
      shijian: 0
    };
  },
  methods: {
    // 确认的点击事件
    dialogFormVisibles() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(1);
          this.$axios({
            url: "/register" + "&" + Math.random() * 99,
            method: "post",
            withCredentials: true
          }).then(res => {
            //成功回调
            console.log(res);
          });
          this.$axios({
            url: "/uploads",
            method: "post",
            data: { image: this.imageUrl }
          }).then(res => {
            //成功回调
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 图形码的点击事件
    getRandomCode() {
      // 利用时间戳刷新验证码
      this.$refs.reg_code_picUrl.src =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + "&" + Date.now();
    },
    huoquCode() {
      this.btnDisabled = true;
      this.shijian = 60;
      let tiemr = setInterval(() => {
        if (this.shijian != 0) {
          this.shijian--;
        } else {
          clearInterval(tiemr);
          this.btnDisabled = false;
        }
      }, 1000);
      console.log(this.form.code,this.form.phone)
      this.$axios({
        url:"/sendsms",
        method: "post",
        data: {
           code: this.form.code ,
          phone:this.form.phone
        },
        withCredentials: true
      }).then(res => {
        //成功回调
        console.log(res);
      });
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
.touxiang {
  display: flex;
  justify-content: center;
  margin: 26px 0 28px 0;
  .el-upload--picture-card {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    .el-icon-plus {
      line-height: 100px;
    }
  }
}
</style>