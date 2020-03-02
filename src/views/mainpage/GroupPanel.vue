<template>
    <div>
        <div style="display: flex">
            <el-menu :default-active="activeIndex" class="groupmenu" @select="handleSelect">
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
            <div
                class="detailContent"
                v-show="activeIndex == '1'"
                style="width: 300px; margin: 10px auto"
            >
                <el-form ref="form" :model="form" label-width="80px" style="width: 300px;">
                    <el-form-item label="文件名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="UML类型">
                        <el-select v-model="form.type" placeholder="请选择UML类型">
                            <el-option label="类图" value="CLASS_DIAGRAM"></el-option>
                            <el-option label="顺序图" value="SEQUENCE_DIAGRAM"></el-option>
                            <el-option label="组件图" value="COMPONENT_DIAGRAM"></el-option>
                            <el-option label="状态图" value="STATE_DIAGRAM"></el-option>
                            <el-option label="用例图" value="USECASE_DIAGRAM"></el-option>
                            <el-option label="部署图" value="DEPLOYMENT_DIAGRAM"></el-option>
                            <el-option label="实体关系图" value="ER_DIAGRAM"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="协作者">
                        <el-select v-model="form.group" placeholder="请选择协助小组">
                            <el-option label="group stub" value="group"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="float: right; margin-left: 5px" @click="resetForm()">清空</el-button>
                        <el-button style="float: right" type="primary" @click="onSubmit">创建</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="border-top: 1px solid #E4E7ED; height: 200px">
            <br />
            <span>联系我们……</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "GroupPanel",
    data() {
        return {
            activeIndex: "1",
            form: {
                name: "",
                type: "",
                group: ""
            }
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            this.activeIndex = key;
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        onSubmit() {},
        resetForm() {
            this.form.name = "";
            this.form.type = "";
            this.form.group = "";
        }
    }
};
</script>
<style scoped>
.groupmenu {
    height: 400px;
    width: 150px;
}
.detailContent {
    padding-top: 50px;
}
</style>