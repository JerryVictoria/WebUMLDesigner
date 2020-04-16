<template>
    <div style="display: inline-block;">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button
                    v-if="$store.state.UML.userId == leaderId"
                    size="mini"
                    style="float: left; padding: 3px 0; color: red"
                    type="text"
                    icon="el-icon-close"
                    @click="deleteGroup"
                ></el-button>
                <span>团队名称：{{name}}</span>
                <el-button
                    v-if="$store.state.UML.userId == leaderId"
                    size="mini"
                    style="float: right; padding: 3px 0"
                    type="text"
                    icon="el-icon-plus"
                    @click="dialogVisible = true"
                >邀请</el-button>
                <!--TODO leader == user-->
            </div>
            <div class="list">
                <div class="text item">队长邮箱：{{leader}}</div>
                <div v-for="(item, index) in invitedMember" :key="index" class="text item">
                    <el-tooltip effect="dark" :content="item.userEmail" placement="right">
                        <div class="contentSpan omitted">
                            {{item.userName}}
                            <el-tag size="mini" type="success">已接受</el-tag>
                        </div>
                    </el-tooltip>
                </div>
                <div v-for="(item, index) in invitingMember" :key="index" class="text item">
                    <el-tooltip effect="dark" :content="item.userEmail" placement="right">
                        <div class="contentSpan omitted">
                            {{item.userName}}
                            <el-tag size="mini" type="info">未处理</el-tag>
                        </div>
                    </el-tooltip>
                </div>
            </div>
        </el-card>
        <el-dialog title="邀请新成员" :visible.sync="dialogVisible" width="30%">
            <el-select
                v-model="newMembers"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="输入你想邀请的成员邮箱"
            ></el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="inviteUser()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "GroupInfo",
    props: {
        name: {
            type: String,
            default: "undefine"
        },
        invitedMember: {
            type: Array
        },
        invitingMember: {
            type: Array
        },
        leader: {
            type: String
        },
        leaderId: {
            type: Number,
            default: -1
        },
        gid: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            dialogVisible: false,
            newMembers: []
        };
    },
    methods: {
        inviteUser() {
            var self = this;
            this.$axios
                .post("/inviteUser", {
                    gid: self.gid,
                    userEmailList: self.newMembers
                })
                .then(function(response) {
                    console.log(response.data);
                    self.newMembers = [];
                    self.$emit("refresh");
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });

            this.dialogVisible = false;
        },
        deleteGroup() {
            if (this.gid <= 0) {
                return;
            }
            var self = this;
            this.$axios
                .get("/deleteGroup", { params: { gid: self.gid } })
                .then(function(response) {
                    console.log("delete group res:", response.data);
                    if (response.data) {
                        self.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        self.$emit("refresh");
                    } else {
                        self.$message({
                            message: "出现错误",
                            type: "error"
                        });
                    }
                })
                .catch(function(error) {
                    console.log("error:", error);
                });
        }
    }
};
</script>
<style scoped>
.text {
    font-size: 12px;
}

.item {
    margin-bottom: 10px;
}

.list {
    overflow-y: auto;
    height: 100px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}

.box-card {
    width: 240px;
    height: 190px;
    display: inline-block;
    margin: 10px;
}
</style>