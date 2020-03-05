<template>
    <div style="display: inline-block;">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>团队名称：{{name}}</span>
                <el-button
                    size="mini"
                    style="float: right; padding: 3px 0"
                    type="text"
                    icon="el-icon-plus"
                    @click="dialogVisible = true"
                >邀请</el-button>
            </div>
            <div class="list">
                <div v-for="o in 8" :key="o" class="text item">{{'队员 ' + o }}</div>
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
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
        member: {
            type: Array
        }
    },
    data() {
        return {
            dialogVisible: false,
            newMembers: []
        };
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