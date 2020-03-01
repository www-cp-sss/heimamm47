<template>
  <el-dialog title="新增企业" :visible.sync="dialogVisibleForm" width="602px">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      @keyup.enter.native="dialogVisible"
    >
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="ruleForm.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="ruleForm.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="jianjie">
        <el-input v-model="ruleForm.jianjie"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="beizhu">
        <el-input v-model="ruleForm.beizhu"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleForm = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { busAdd } from "../../../../api/business";
export default {
  data() {
    return {
      ruleForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      dialogVisibleForm: false,
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名字", trigger: "blur" }]
      }
    };
  },
  methods: {
    dialogVisible() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          busAdd(
            // rid: this.ruleForm.rid,
            // name: this.ruleForm.name,
            // short_name: this.ruleForm.short_name,
            // intro: this.ruleForm.intro,
            // remark: this.ruleForm.remark,
            this.ruleForm
          ).then(res => {
              this.$message.success('新增成功!');
              this.$refs.ruleForm.resetFields();
              this.dialogVisibleForm = false;
              this.$parent.getList();
            console.log(res);
          });
        } else {
           this.$message.error('新增失败!');
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>