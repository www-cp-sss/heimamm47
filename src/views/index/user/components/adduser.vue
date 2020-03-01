<template>
  <el-dialog title="新增用户" :visible.sync="dialogVisibleForm" width="602px">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      @keyup.enter.native="dialogVisible"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select class="sub_zhuangtai" v-model="formInline.role_id" placeholder="请选择状态">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select class="sub_zhuangtai" v-model="formInline.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark">
        <el-input v-model="ruleForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleForm = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { userAdd } from "../../../../api/user";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      dialogVisibleForm: false,
      rules: {
           // 用户名
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { max: 6, message: "长度在1-6个字符", trigger: "change" }
        ],
           // 邮箱
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
        role_id:[{
             required: true, message: '请选择角色', trigger: 'change' 
      }]
      }
    };
  },
  methods: {
    dialogVisible() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          userAdd(
            // rid: this.ruleForm.rid,
            // name: this.ruleForm.name,
            // short_name: this.ruleForm.short_name,
            // intro: this.ruleForm.intro,
            // remark: this.ruleForm.remark,
            this.ruleForm
          ).then(res => {
            this.$message.success("新增成功!");
            this.$refs.ruleForm.resetFields();
            this.dialogVisibleForm = false;
            this.$parent.getList();
            console.log(res);
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

<style>
</style>