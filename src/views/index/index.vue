<template>
  <el-container class="index_container">
    <el-header class="index_head">
      <div class="left">
        <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse=!isCollapse"></i>
        <img src="./img/logo.png" alt />
        <span class="index_title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="touxiangUrl" alt />
        <span class="index_userName">{{username}},您好</span>
        <el-button type="primary" class="exit" @click="btnExit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="index_aside">
        <el-menu
          router
          :default-active="this.$router.path"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="index_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import { MessageBox } from 'element-ui';
import { info, layout } from "./../../api/index";
import { removeToken } from "../../utilis/token";
// import {getToken} from './../../utilis/token'
export default {
  data() {
    return {
      username: "",
      touxiangUrl: "",
      isCollapse: true
    };
  },
  methods: {
    btnExit() {
      this.$confirm("确定退出黑马面面吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          layout().then(res => {
            if (res.data.code == 200) {
              this.$message.success("退出成功!");
              removeToken();
              this.$router.push("/");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  created() {
    info().then(res => {
      console.log(res);
      this.username = res.data.data.username;
      this.touxiangUrl = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    });
  }
};
</script>

<style lang="less">
.index_container {
  height: 100%;
}
.index_head {
  float: left;
  .left {
    float: left;
    display: flex;
    align-items: center;
    height: 100%;
    i {
      font-size: 24px;
    }
    img {
      margin: 0 11px 0 22px;
    }
    .index_title {
      font-size: 22px;
      color: #49a1ff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    height: 100%;
    float: right;
    img {
      width: 43px;
      height: 43px;
    }
    .index_userName {
      margin: 0 38px 0 9px;
      font-size: 14px;
    }
    .exit {
      text-align: center;
    }
  }
}
.index_aside {
}
.index_main {
  background-color: green;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>