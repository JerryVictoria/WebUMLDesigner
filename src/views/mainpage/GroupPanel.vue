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
                            <el-option
                                v-for="(item, index) in groupList"
                                :key="index"
                                :label="item.groupName"
                                :value="item.gid"
                            ></el-option>
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
                <transition-group name="list">
                    <GroupInfo
                        v-for="item in groupList"
                        :key="'gid:'+item.gid"
                        :name="item.groupName"
                        :invitedMember="item.invitedUserList"
                        :invitingMember="item.invitingUserList"
                        :leader="item.captainEmail"
                        :leaderId="item.captainId"
                        :gid="item.gid"
                        @refresh="getAllGroup()"
                    ></GroupInfo>
                </transition-group>
                <!--TODO v-for-->
            </div>
            <div v-show="activeIndex == '3'" class="centerDiv">
                <InvitationCard
                    v-for="(item, index) in invitationList"
                    :key="index"
                    :gid="item.gid"
                    :groupName="item.groupName"
                    :leader="item.captainEmail"
                    @refresh="getAllInvitation()"
                ></InvitationCard>
            </div>
            <div v-show="activeIndex == '4'" class="centerDiv">
                <!--TODO v-for-->
                <div v-if="detailList" class="fileListPane">
                    <el-page-header @back="goBack" content="文件列表"></el-page-header>
                    <transition-group name="list-complete">
                        <SingleFile
                            v-for="item in fileList"
                            :key="item.fid"
                            :fileName="item.fileName"
                            :fid="item.fid"
                            :fileType="item.fileType"
                            :gid="selectGid"
                            @refreshFileList="selectGroupFile(selectGid)"
                        ></SingleFile>
                    </transition-group>
                </div>
                <div v-else>
                    <el-button
                        v-for="(item, index) in groupList"
                        :key="index"
                        class="fileListBtn"
                        @click="selectGroupFile(item.gid)"
                    >{{item.groupName}}</el-button>
                </div>
            </div>
        </div>
        <PageFooter></PageFooter>
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
import SingleFile from "./SingleFile.vue";
import PageFooter from "../PageFooter.vue";
export default {
    name: "GroupPanel",
    components: { GroupInfo, InvitationCard, SingleFile, PageFooter },
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
            detailList: false,
            groupList: [],
            invitationList: [],
            fileList: [],
            selectGid: -1
            /*
                gid: 2
                groupId: null
                groupName: "test2"
                invitedUidList: Array(1)
                invitedUserNameList: Array(1)
                invitingUidList: Array(0)
                invitingUserNameList: Array(0)
                fidList: Array(0)
                captainId: 18
                captainEmail: (...) 
                */
        };
    },
    mounted() {
        this.getAllGroup();
        this.getAllInvitation();
    },
    methods: {
        getAllGroup() {
            var self = this;
            this.$axios
                .get("/getAllGroupByUid", {
                    params: {
                        uid: self.$store.state.UML.userId
                    }
                })
                .then(function(response) {
                    console.log(
                        "getAllGroupByUid:",
                        self.$store.state.UML.userId,
                        response.data
                    );
                    self.groupList = response.data;
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
        },
        getAllInvitation() {
            var self = this;
            this.$axios
                .get("/getAllInvitingGroupByUid", {
                    params: {
                        uid: self.$store.state.UML.userId
                    }
                })
                .then(function(response) {
                    console.log(response.data);
                    self.invitationList = response.data;
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
        },
        handleSelect(key, keyPath) {
            this.activeIndex = key;
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        onSubmit() {
            var self = this;
            //console.log("personal:"+self.$store.state.UML.userId);
            self.$axios
                .get("/createFileByGroup", {
                    params: {
                        gid: self.form.group,
                        fileName: self.form.name,
                        fileType: self.form.type
                    }
                })
                .then(function(response) {
                    console.log("success:" + response.data);
                    self.$message({
                        message: "创建成功",
                        type: "success"
                    });
                    self.$store.commit("setUMLId", { id: response.data });
                    self.$store.commit("setUMLName", {
                        name: self.form.name
                    });
                    self.$store.commit("setUMLType", {
                        type: self.form.type
                    });
                    self.$store.commit("setGroupId", {
                        groupId: self.form.group
                    });
                    //清空Nodes
                    self.$store.commit("setUMLNodes", {
                        nodeList: []
                    });
                    //清空lines
                    self.$store.commit("setUMLLines", {
                        lineList: []
                    });
                    self.$store.dispatch("openGroupEditMode");
                    self.$router.push({ name: "Designer" });
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
        },
        resetForm() {
            this.form.name = "";
            this.form.type = "";
            this.form.group = "";
        },
        selectGroupFile(gid) {
            console.log("selectGroupFile gid:", gid);
            this.selectGid = gid;
            var self = this;
            this.$axios
                .get("/getAllFileByGid", {
                    params: {
                        gid: gid
                    }
                })
                .then(function(response) {
                    console.log(response.data);
                    self.fileList = response.data;
                    console.log("fileList:", self.fileList);
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
            this.detailList = true;
        },
        goBack() {
            this.detailList = false;
            this.selectGid = -1;
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
                    console.log("create group res:", response.data);
                    if (response.data > 0) {
                        self.$message({
                            message: "创建成功！",
                            type: "success"
                        });
                        self.getAllGroup();
                    } else {
                        self.$message({
                            message: "组名已存在，创建失败！",
                            type: "error"
                        });
                    }
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
            this.groupform.name = "";
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
.list-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
}
.list-enter, .list-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
.list-leave-active {
    position: absolute;
}
.list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
.list-complete-leave-active {
    position: absolute;
}
</style>