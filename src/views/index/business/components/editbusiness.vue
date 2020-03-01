<template>
  <el-dialog title="编辑企业" :visible.sync="formEdit" width="602px">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
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
      <el-button @click="formEdit = false">取 消</el-button>
      <el-button type="primary" @click="formEditBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { busEdit } from "../../../../api/business";
export default {
  data() {
    return {
      ruleForm: {
        eid: "",
        name: "",
        short_name: "",
        jianjie: "",
        beizhu: "",
        id: ""
      },
      formEdit: false,
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名字", trigger: "blur" }]
      }
    };
  },
  methods: {
    formEditBtn() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          busEdit(this.ruleForm).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.formEdit = false;
              this.$message.success("页面修改成功");
                this.$parent.getList();
            }else{
                this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("前两项不能为空");
        }
      });
    }
  }
};
</script>

<style>
</style>