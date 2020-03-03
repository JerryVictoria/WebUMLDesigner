<template>
    <div>
        <div style="display: flex">
            <el-menu :default-active="activeIndex" class="personmenu" @select="handleSelect">
                <el-menu-item index="1">
                    <i class="el-icon-document"></i>
                    <span slot="title">新建文件</span>
                </el-menu-item>
                <el-menu-item index="2" onclick="getfile()">
                    <i class="el-icon-menu"></i>
                    <span slot="title">个人文件</span>
                </el-menu-item>
            </el-menu>
            <div
                    class="detailContent"
                    v-if="activeIndex == '1'"
                    style="width: 300px; margin: 10px auto"
            >
                <el-form ref="form" :model="form" label-width="80px" style="width: 300px;">
                    <el-form-item label="文件名称">
                        <el-input v-model="form.fileName"></el-input>
                    </el-form-item>
                    <el-form-item label="UML类型">
                        <el-select v-model="form.fileType" placeholder="请选择UML类型">
                            <el-option label="类图" value="CLASS_DIAGRAM"></el-option>
                            <el-option label="顺序图" value="SEQUENCE_DIAGRAM"></el-option>
                            <el-option label="组件图" value="COMPONENT_DIAGRAM"></el-option>
                            <el-option label="状态图" value="STATE_DIAGRAM"></el-option>
                            <el-option label="用例图" value="USECASE_DIAGRAM"></el-option>
                            <el-option label="部署图" value="DEPLOYMENT_DIAGRAM"></el-option>
                            <el-option label="实体关系图" value="ER_DIAGRAM"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="float: right; margin-left: 5px" @click="resetForm()">清空</el-button>
                        <el-button style="float: right" type="primary" @click="newfile">创建</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else >
                <!--
                个人文件
                -->
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
        name: "PersonalPanel",
        data() {
            return {
                activeIndex: "1",
                form: {
                    fileName: "",
                    fileType: "",
                    fileID:"",
                },
                userID:"",
                userEmail:""
            };
        },
        mounted() {
            this.userID=this.$route.params.userID;
            this.userEmail=this.$route.params.userEmail;
            console.log(this.userID+" "+this.userEmail);
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
                this.form.fileName = "";
                this.form.fileType = "";
            },
            newfile() {
                console.log(this.userID);
                //@TODO 参数变化，弹框，要求输入名字，选择类型
                var self = this;
                self.$axios
                    .get("/createFile", {
                        params: {
                            uid: this.userID,
                            fileName: this.form.fileName,
                            fileType: this.form.fileType
                        }
                    })
                    .then(function(response) {
                        console.log("success:"+response);
                        self.$message({
                            message: "创建成功",
                            type: "success"
                        });

                        self.$router.push({ name: "Designer",params:{userID:self.userID,userEmail:self.userEmail,fileName:self.form.fileName,fileType:self.form.fileType} });
                    })
                    .catch(function(error) {
                        console.log("error:" + error);
                    });
            },
            getfile() {
                console.log("getfile");
            }
        }
    };
</script>
<style scoped>
    .personmenu {
        height: 400px;
        width: 150px;
    }
    .detailContent {
        padding-top: 50px;
    }
</style>