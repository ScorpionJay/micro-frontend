<template>
  <div class="menu-container">
    <!-- 菜单
    <ul>
      <li>
        <router-link to="/">首页</router-link>
      </li>
      <li>
        <router-link to="/about">关于</router-link>
      </li>
    </ul>-->

    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2" @click="fnLink('/')">
          <i class="el-icon-menu"></i>
          <span slot="title">
            首页
            <!--<router-link to="/">首页</router-link>-->
          </span>
        </el-menu-item>
        <el-menu-item index="3" @click="fnLink('/about')">
          <i class="el-icon-document"></i>
          <span slot="title">
            关于
            <!-- <router-link to="/about">关于</router-link> -->
          </span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    data: null
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    fnLink(path) {
      console.log("link", path);
      this.$router.push({ path });
    }
  }
};
</script>

<style lang="less" scoped>
.menu-container {
  position: fixed;
  left: 0;
  top: 64px;
  bottom: 0;
  width: 201px;
  // background-color: #eee;
  // width: 140px;
}

.el-menu-item.is-active {
  color: #409eff !important;
}
</style>
