<template>
    <el-card class="fileBlock">
        <span class="contentSpan omitted">{{fileName}}</span>
        <el-image :src="src" class="fileImg"></el-image>
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
            default:
                "https://assets.processon.com/chart_image/thumb/5ddf6d17e4b0b2fab73984e3.png"
        },
        fid: {
            type: Number,
            default: -1
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
}
.fileImg {
    border: 1px dashed grey;
    height: 150px;
    width: 200px;
}
</style>