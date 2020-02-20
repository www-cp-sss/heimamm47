<template>
  <!-- 根节点 -->
  <div class="login_wrap">
    <div class="login_list">
      <div class="login_content">
        <div class="login_title">
          <ul>
            <li>
              <img src="./img/logo.png" alt />
            </li>
            <li>
              <div class="login_hmmm">黑马面面</div>
            </li>
            <li>|</li>
            <li>
              <div class="login_user">用户登录</div>
            </li>
          </ul>
        </div>
        <div id="form">
          <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm">
            <el-form-item prop="input1">
              <el-input placeholder="请输入内容" prefix-icon="el-icon-user" v-model="form.input1"></el-input>
            </el-form-item>
            <el-form-item prop="input2">
              <el-input
                show-password
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                v-model="form.input2"
              ></el-input>
            </el-form-item>
            <el-form-item prop="input3">
              <el-row>
                <el-col :span="17">
                  <el-input placeholder="请输入验证码" prefix-icon="el-icon-search" v-model="form.input3"></el-input>
                </el-col>
                <el-col :span="7">
                  <div class="login_img">
                    <img src="../login/img/code.png" alt />
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="type" class="agree">
              <!-- <el-checkbox-group > -->
              <el-checkbox class="el-checkbox_labol" v-model="form.type">
                我已阅读并知晓
                <el-link  :underline="false"  class="xieyi" type="primary" href="javascript:;">用户协议</el-link>和
                <el-link :underline="false" class="yinsi" type="primary" href="javascript:;">隐私条款</el-link>
              </el-checkbox>
              <!-- </el-checkbox-group> -->
            </el-form-item>
            <el-form-item>
              <el-button class="login_denglu" type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="login_zhuce" type="primary">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="login_bgc">
          <img src="./img/login_banner_ele.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../../api/login";
export default {
  data() {
    return {
      form: {
        input1: "",
        input2: "",
        input3: "",
        type: ""
      },
      rules: {
        // trigger : 判断条件  blur  离开勾选框的时候判断   change: 在勾选框中判断
        // message : 判断信息
        // required :
        input1: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度在11个字符", trigger: "change" }
        ],
        input2: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 16, message: "长度在8-16个字符", trigger: "change" }
        ],
        input3: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 8, max: 16, message: "请正确输入验证码", trigger: "change" }
        ],
        type: [
          {
            required: true,
            message: "请阅读协议",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log(login(this.form));
          login(this.form).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              alert("submit!");
            }
          });
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
.login_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  //    水平居中
  //  justify-content: space-around;
  // 高度居中
  align-items: center;
  .login_list {
    box-sizing: border-box;
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    margin-left: 73px;
  }
  .login_content {
    height: 100%;
    width: 100%;
    padding: 48px 41px 98px 42px;

    .login_title {
      margin-bottom: 29px;
      ul {
        display: flex;
        align-items: center;
        li {
          font-size: 24px;
          img {
            margin-right: 16px;
          }
          &:nth-child(3) {
            margin: 0 14px;
          }
          &:nth-child(1) {
            margin-left: 5px;
            margin-bottom: 2px;
          }
        }
      }
    }
    .login_img {
      height: 44px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .agree {
      display: flex;
      .el-checkbox_labol {
        display: flex;
        align-items: center;
        .xieyi,
        .yinsi {
          margin-bottom: 2px;
        }
      }
    }

    .login_denglu,
    .login_zhuce {
      width: 394px;
    }
  }
  .login_bgc {
    position: absolute;
    right: 73px;
    top: 174px;
  }
}
</style>