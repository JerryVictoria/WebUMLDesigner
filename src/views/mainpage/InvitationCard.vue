<template>
    <el-card class="box-card">
        <el-tooltip effect="dark" :content="groupName" placement="right">
            <span class="contentSpan omitted">团队名称：{{groupName}}</span>
        </el-tooltip>
        <el-tooltip effect="dark" :content="leader" placement="right">
            <span class="contentSpan omitted">队长：{{leader}}</span>
        </el-tooltip>
        <div style="margin-top:20px;">
            <el-button size="mini" icon="el-icon-check" type="success" @click="acceptInvitation">接受</el-button>
            <el-button size="mini" icon="el-icon-delete" type="danger" @click="rejectInvitation">拒绝</el-button>
        </div>
    </el-card>
</template>
<script>
export default {
    name: "InvitationCard",
    props: {
        gid: {
            type: Number,
            default: -1
        },
        groupName: {
            type: String,
            default: "group name stub"
        },
        leader: {
            type: String,
            default: "leader name stub"
        }
    },
    methods: {
        acceptInvitation() {
            var self = this;
            this.$axios
                .get("/acceptInvite", {
                    params: {
                        gid: self.gid,
                        uid: self.$store.state.UML.userId
                    }
                })
                .then(function(response) {
                    self.$message({
                        message: "已拒绝！",
                        type: "success"
                    });
                    self.$emit("refresh");
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
            //TODO emit
        },
        rejectInvitation() {
            var self = this;
            this.$axios
                .get("/rejectInvite", {
                    params: {
                        gid: self.gid,
                        uid: self.$store.state.UML.userId
                    }
                })
                .then(function(response) {
                    self.$message({
                        message: "已拒绝！",
                        type: "success"
                    });
                    self.$emit("refresh");
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
            //TODO emit
        }
    }
};
</script>
<style scoped>
.box-card {
    width: 240px;
    max-height: 160px;
    height: 160px;
    display: inline-block;
    margin: 10px;
}
</style>