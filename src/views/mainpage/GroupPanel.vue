<template>
    <div>
        <el-container>
            <el-aside>
                <el-menu
                    default-active="1"
                    class="groupmenu"
                    @open="handleOpen"
                    @close="handleClose"
                >
                    <el-menu-item index="1">
                        <i class="el-icon-document"></i>
                        <span slot="title">新建文件</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">创建团队</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-message"></i>
                        <span slot="title">查看邀请</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-folder"></i>
                        <span slot="title">团队文件</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main></el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    name: "GroupPanel"
};
</script>
<style scoped>
.groupmenu {
    height: 500px;
    width: 150px;
}
</style>