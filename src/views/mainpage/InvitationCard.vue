<template>
    <el-card class="box-card">
        <el-tooltip effect="dark" :content="groupName" placement="right">
            <span class="contentSpan omitted">团队名称：{{groupName}}</span>
        </el-tooltip>
        <el-tooltip effect="dark" :content="leader" placement="right">
            <span class="contentSpan omitted">队长：{{leader}}</span>
        </el-tooltip>
        <div style="margin-top:20px;">
            <el-button size="mini" icon="el-icon-check" type="success">接受</el-button>
            <el-button size="mini" icon="el-icon-delete" type="danger">拒绝</el-button>
        </div>
    </el-card>
</template>
<script>
export default {
    name: "InvitationCard",
    props: {
        groupName: {
            type: String,
            default: "group name stub"
        },
        leader: {
            type: String,
            default: "leader name stub"
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