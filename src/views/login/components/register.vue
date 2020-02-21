<template>
  <div id="reg_zhuce">
    <!-- Form -->

    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog title="用户注册" center :visible.sync="dialogFormVisible" width="550px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="头像" :label-width="formLabelWidth" prop="touxiang">
          <el-upload
            class="touxiang"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="form.handlePictureCardPreview"
            :on-remove="form.handleRemove"
          >
            <i class="el-icon-plus"></i>
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
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.code" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="7">
              <div class="reg_code">
                <img src="../img/code.png" alt />
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
              <el-button class="reg_msg" plain>获取验证码</el-button>
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
        msg: "",
        touxiang:'',
      },
      formLabelWidth: "70px",
        //  dialogTableVisible: false,
        dialogFormVisible: false,
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
          { pattern:/0?(13|14|15|18|17)[0-9]{9}/, message: "长度在11个字符", trigger: "change" }
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
      }
    };
  },
  methods: {
    dialogFormVisibles() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(1);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
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
  .reg_msg {
    margin-left: 24px;
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