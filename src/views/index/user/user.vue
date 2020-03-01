<template>
  <div>
    <div class="sub_top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="form" @keyup.enter.native="onSubmit">
        <el-form-item label="用户名称" prop="username">
          <el-input class="sub_num" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="sub_name" v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select
            class="sub_zhuangtai"
            v-model="formInline.role_id"
            placeholder="请选择状态"
          >
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="resetForm">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="addBtn">新增用户</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="sub_bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色">
           <template slot-scope="scope">
            <span>{{scope.row.role}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.status===1">启用</span>
              <span v-else class="red">禁用</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button type="text" @click="btnEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="btnRemove(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <adduser ref="adduser"></adduser>
    <!-- <editbusiness ref="editbusiness"></editbusiness> -->
  </div>
</template>

<script>
import { userList, userStatus, userRemove } from "../../../api/user.js";
import adduser from "./components/adduser";
// import editbusiness from "./components/editbusiness";
export default {
  components: {
   adduser
    // editbusiness
  },
  data() {
    return {
      formInline: {
        username: "",
        email: "",
        role_id: "",
      },
      tableData: [],
      //当前的分页
      page: 1,
      // 分页的当前页
      size: 10,
      // 数据总量
      total: 0
    };
  },
  methods: {
    onSubmit() {
      userList({
        username: this.formInline.name,
        email: this.formInline.email,
        role_id: this.formInline.role_id,
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.items;
        this.page = +res.data.data.pagination.page;
        this.total = res.data.data.pagination.total;
        // return  res.data.data.items
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(val);
      this.page = 1;
      this.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    addBtn() {
      this.$refs.adduser.dialogVisibleForm = true;
    },
    changeStatus(item) {
      console.log(item);
      userStatus({
        id: item.id
      }).then(res => {
        console.log(res);
        this.getList(this.page);
      });
    },
    getList() {
      userList({
        page: this.page,
        limit: this.size
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.items;
        this.page = +res.data.data.pagination.page;
        this.total = res.data.data.pagination.total;
        // return  res.data.data.items
      });
    },
    // btnEdit(item) {
    //   this.$refs.editbusiness.ruleForm.eid = item.eid;
    //   this.$refs.editbusiness.ruleForm.name = item.name;
    //   this.$refs.editbusiness.ruleForm.short_name = item.short_name;
    //   this.$refs.editbusiness.ruleForm.jianjie = item.intro;
    //   this.$refs.editbusiness.ruleForm.beizhu = item.remark;
    //   this.$refs.editbusiness.ruleForm.id = item.id;
    //   this.$refs.editbusiness.formEdit = true;
    // },
    btnRemove(item, index) {
      this.$confirm("是否删除学科", "提示", {
        confirmButtonText: "确定",
        type: "warning"
      }).then(() => {
        userRemove({
          id: item.id
        }).then(res => {
          console.log(res);
          console.log(index);
          // console.log(this.getList());
          if (index == 0) {
            this.page = this.page - 1;
            this.getList();
          } else {
            this.getList();
          }
        });
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.getList();
    }
  },
  created() {
    this.getList(this.page);
  }
};
</script>

<style lang="less">
.sub_top {
  width: 1130px;
  height: 103px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 19px;
  .demo-form-inline {
    margin-left: 23px;
    font-size: 14px;
    color: #7a7c7f;
    .sub_num {
      width: 100px;
    }
    .sub_name {
      width: 149px;
    }
    .sub_chuangjian {
      width: 100px;
    }
    .sub_zhuangtai {
      width: 149px;
    }
  }
}
.sub_bottom {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  border-radius: 4px;
  overflow: hidden;
  th {
    text-align: center !important;
  }
  td {
    text-align: center !important;
  }
  .red {
    color: red;
  }
}
.fenye {
  width: 100%;
  height: 82px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>