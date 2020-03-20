<template>
    <div>
        <div style="display: flex">
            <el-menu
                :default-active="activeIndex"
                class="personmenu"
                @select="handleSelect"
            >
                <el-menu-item index="1">
                    <i class="el-icon-document"></i>
                    <span slot="title">新建文件</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">个人文件</span>
                </el-menu-item>
            </el-menu>
            <div
                class="detailContent"
                v-if="activeIndex == '1'"
                style="width: 300px; margin: 10px auto"
            >
                <el-form
                    ref="form"
                    :model="form"
                    label-width="80px"
                    style="width: 300px;"
                >
                    <el-form-item label="文件名称">
                        <el-input v-model="form.UMLName"></el-input>
                    </el-form-item>
                    <el-form-item label="UML类型">
                        <el-select
                            v-model="form.UMLType"
                            placeholder="请选择UML类型"
                        >
                            <el-option
                                label="类图"
                                value="CLASS_DIAGRAM"
                            ></el-option>
                            <el-option
                                label="顺序图"
                                value="SEQUENCE_DIAGRAM"
                            ></el-option>
                            <el-option
                                label="组件图"
                                value="COMPONENT_DIAGRAM"
                            ></el-option>
                            <el-option
                                label="状态图"
                                value="STATE_DIAGRAM"
                            ></el-option>
                            <el-option
                                label="用例图"
                                value="USECASE_DIAGRAM"
                            ></el-option>
                            <el-option
                                label="部署图"
                                value="DEPLOYMENT_DIAGRAM"
                            ></el-option>
                            <el-option
                                label="实体关系图"
                                value="ER_DIAGRAM"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            style="float: right; margin-left: 5px"
                            @click="resetForm()"
                            >清空</el-button
                        >
                        <el-button
                            style="float: right"
                            type="primary"
                            @click="newfile"
                            >创建</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
            <div class="centerDiv" v-else>
                <SingleFile
                    v-for="item in fileList"
                    :key="item.fid"
                    :fileName="item.fileName"
                    :fid="item.fid"
                    :fileType="item.fileType"
                    :src="item.refreshTime"
                    :gid="-1"
                ></SingleFile>
            </div>
        </div>
        <PageFooter></PageFooter>
    </div>
</template>
<script>
import SingleFile from "./SingleFile.vue";
import PageFooter from "../PageFooter.vue";
export default {
    name: "PersonalPanel",
    components: { SingleFile, PageFooter },
    data() {
        return {
            activeIndex: "1",
            form: {
                UMLName: "",
                UMLType: ""
            },
            fileList: [],
            imgsrc:"http://q76chphm1.bkt.clouddn.com/",
        };
    },
    mounted() {
        this.getFileList();
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
        resetForm() {
            this.form.UMLName = "";
            this.form.UMLType = "";
        },
        newfile() {
            var self = this;
            //console.log("personal:"+self.$store.state.UML.userId);
            self.$axios
                .get("/createFile", {
                    params: {
                        uid: self.$store.state.UML.userId,
                        fileName: self.form.UMLName,
                        fileType: self.form.UMLType
                    }
                })
                .then(function(response) {
                    console.log("success:" + response);
                    self.$message({
                        message: "创建成功",
                        type: "success"
                    });
                    self.$store.commit("setUMLId", { id: response.data });
                    self.$store.commit("setGroupId", { groupId: -1 });
                    self.$store.commit("setUMLName", {
                        name: self.form.UMLName
                    });
                    self.$store.commit("setUMLType", {
                        type: self.form.UMLType
                    });
                    //清空Nodes
                    self.$store.commit("setUMLNodes", {
                        nodeList: []
                    });
                    //TODO清空lines
                    //console.log(self.$store.state.UML.UMLId);
                    //console.log(self.$store.state.UML.UMLName);
                    //console.log(self.$store.state.UML.UMLType);
                    self.$router.push({ name: "Designer" });
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
        },
        getFileList() {
            console.log("getfile");
            var self = this;
            this.$axios
                .get("/getAllFilePicByUid", {
                    params: {
                        uid: self.$store.state.UML.userId
                    }
                })
                .then(function(response) {
                    console.log(response.data);
                    self.fileList = response.data;
                    for(var i=0;i<self.fileList.length;i++){
                        var imgsrc="http://q76chphm1.bkt.clouddn.com/"+self.fileList[i].fileType+"_"+self.fileList[i].fid+"?v="+self.fileList[i].refreshTime;
                        self.fileList[i].refreshTime=imgsrc;
                    }
                    console.log(response.data)
                })
                .catch(function(error) {
                    console.log("error", error);
                });
        }
    }
};
</script>
<style scoped>
.personmenu {
    height: 400px;
    width: 150px;
    min-width: 150px;
}
.detailContent {
    padding-top: 50px;
}
.centerDiv {
    height: 390px;
    overflow-y: auto;
    padding-top: 10px;
}
</style>
