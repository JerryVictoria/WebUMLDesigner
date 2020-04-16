<template>
    <el-card class="fileBlock">
        <div @click="handleClick">
            <span class="contentSpan omitted">
                {{ fileName }}
                <el-tag size="mini" type="info">
                    {{
                    types[fileType]
                    }}
                </el-tag>
            </span>
            <el-button
                style="margin-left:-30px; margin-top: -20px; padding: 0; font-size: 10px;"
                type="text"
                @click.stop="deleteFile"
            >删除</el-button>
            <el-image :src="src" class="fileImg"></el-image>
        </div>
    </el-card>
</template>
<script>
export default {
    name: "SingleFile",
    props: {
        fileName: {
            type: String,
            default: "undefine"
        },
        src: {
            type: String,
            default: "undefine"
        },
        fid: {
            type: Number,
            default: -1
        },
        fileType: {
            type: String,
            default: "CLASS_DIAGRAM"
        },
        gid: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            types: {
                CLASS_DIAGRAM: "类图",
                SEQUENCE_DIAGRAM: "顺序图",
                COMPONENT_DIAGRAM: "组件图",
                STATE_DIAGRAM: "状态图",
                USECASE_DIAGRAM: "用例图",
                DEPLOYMENT_DIAGRAM: "部署图",
                ER_DIAGRAM: "实体关系图"
            }
        };
    },
    methods: {
        handleClick() {
            var self = this;
            this.$axios
                .get("/getAllLineByFid", { params: { fid: self.fid } })
                .then(function(response) {
                    console.log("getAllLineByFid");
                    console.log(response.data);
                    self.$store.commit("setUMLLines", {
                        lineList: response.data
                    });
                    console.log(self.$store.state.UML.lines);
                })
                .catch(function(error) {
                    console.log("error:", error);
                });
            this.$axios
                .get("/getAllNodeByFid", { params: { fid: self.fid } })
                .then(function(response) {
                    console.log(response.data);
                    self.$store.commit("setUMLNodes", {
                        nodeList: response.data
                    });
                    self.$store.commit("setGroupId", { groupId: self.gid });
                    self.$store.commit("setUMLId", { id: self.fid });
                    self.$store.commit("setUMLType", {
                        type: self.fileType
                    });
                    if (self.gid > 0) {
                        self.$store.dispatch("openGroupEditMode");
                    }
                    self.$router.push({ name: "Designer" });
                })
                .catch(function(error) {
                    console.log("error:", error);
                });
        },
        deleteFile() {
            var self = this;
            if (this.gid <= 0) {
                this.$axios
                    .get("/delFile", {
                        params: {
                            uid: self.$store.state.UML.userId,
                            fid: self.fid
                        }
                    })
                    .then(function(response) {
                        console.log("del file res1:", response.data);
                        if (response.data) {
                            self.$message({
                                message: "删除成功！",
                                type: "success"
                            });
                            self.$emit("refreshFileList");
                        } else {
                            self.$message({
                                message: "出现错误！",
                                type: "error"
                            });
                        }
                    })
                    .catch(function(error) {
                        console.log("error:", error);
                    });
            } else {
                this.$axios
                    .get("/deleteFileByGroup", {
                        params: {
                            gid: self.gid,
                            fid: self.fid
                        }
                    })
                    .then(function(response) {
                        console.log("del file res2:", response.data);
                        if (response.data) {
                            self.$message({
                                message: "删除成功！",
                                type: "success"
                            });
                            self.$emit("refreshFileList");
                        } else {
                            self.$message({
                                message: "出现错误！",
                                type: "error"
                            });
                        }
                    })
                    .catch(function(error) {
                        console.log("error:", error);
                    });
            }
        }
    }
};
</script>
<style scoped>
.fileBlock {
    display: inline-block;
    height: 220px;
    width: 300px;
    margin: 10px;
    cursor: pointer;
}
.fileBlock:hover {
    box-shadow: 0 2px 12px 0 rgba(254, 255, 203, 0.212);
}
.fileImg {
    border: 1px dashed grey;
    height: 150px;
    width: 200px;
}
</style>
