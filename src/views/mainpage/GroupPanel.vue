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
            <div v-show="activeIndex == '2'" class="centerDiv">
                <el-card class="box-card">
                    <el-button
                        class="createBtn"
                        icon="el-icon-circle-plus-outline"
                        @click="dialogVisible = true"
                    >新建团队</el-button>
                </el-card>
                <GroupInfo></GroupInfo>
                <GroupInfo></GroupInfo>
                <GroupInfo></GroupInfo>
                <GroupInfo></GroupInfo>
                <GroupInfo></GroupInfo>
                <GroupInfo></GroupInfo>
                <GroupInfo></GroupInfo>
                <!--TODO v-for-->
            </div>
            <div v-show="activeIndex == '3'" class="centerDiv">
                <!--TODO v-for-->
                <InvitationCard></InvitationCard>
                <InvitationCard></InvitationCard>
                <InvitationCard></InvitationCard>
                <InvitationCard></InvitationCard>
                <InvitationCard></InvitationCard>
                <InvitationCard></InvitationCard>
                <InvitationCard></InvitationCard>
            </div>
            <div v-show="activeIndex == '4'" class="centerDiv">
                <!--TODO v-for-->
                <div v-if="detailList" class="fileListPane">
                    <el-page-header @back="goBack" content="文件列表"></el-page-header>
                </div>
                <div v-else>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 1</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 2</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 3</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 4</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 5</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 1</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 2</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 3</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 4</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 5</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 1</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 2</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 3</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 4</el-button>
                    <el-button class="fileListBtn" @click="selectGroupFile()">group 5</el-button>
                </div>
            </div>
        </div>
        <div style="border-top: 1px solid #E4E7ED; height: 200px">
            <br />
            <span>联系我们……</span>
        </div>
        <el-dialog title="创建你的团队" :visible.sync="dialogVisible" width="30%">
            <el-form ref="groupform" :model="groupform" label-width="80px" style="width: 300px;">
                <el-form-item label="团队名称">
                    <el-input v-model="groupform.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createGroup">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import GroupInfo from "./GroupInfo.vue";
import InvitationCard from "./InvitationCard.vue";
export default {
    name: "GroupPanel",
    components: { GroupInfo, InvitationCard },
    data() {
        return {
            activeIndex: "1",
            dialogVisible: false,
            form: {
                name: "",
                type: "",
                group: ""
            },
            groupform: {
                name: ""
            },
            detailList: false
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
        },
        selectGroupFile() {
            this.detailList = true;
        },
        goBack() {
            this.detailList = false;
        },
        createGroup() {
            if (this.groupform.name == "") {
                this.$message({
                    message: "小组名不能为空！",
                    type: "warning"
                });
                this.dialogVisible = false;
                return;
            }
            var self = this;
            this.$axios
                .get("/createGroup", {
                    params: {
                        groupName: self.groupform.name,
                        uid: self.$store.state.UML.userId
                    }
                })
                .then(function(response) {
                    self.$message({
                        message: "创建成功！",
                        type: "success"
                    });
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
            this.dialogVisible = false;
        }
    }
};
</script>
<style scoped>
.groupmenu {
    height: 400px;
    width: 150px;
    min-width: 150px;
}
.detailContent {
    padding-top: 50px;
}
.createBtn {
    width: 200px;
    height: 150px;
    display: inline-block;
}
.fileListBtn {
    width: 180px;
    height: 130px;
    display: inline-block;
    margin: 10px 10px;
    font-size: 18px;
}
.box-card {
    width: 240px;
    height: 190px;
    display: inline-block;
    margin: 10px;
}
.fileListPane {
    padding: 30px 20px;
}
.centerDiv {
    height: 390px;
    overflow-y: auto;
    padding-top: 10px;
}
</style>