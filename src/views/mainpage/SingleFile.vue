<template>
    <div class="fileBlock">
        <span class="contentSpan omitted">{{fileName}}</span>
        <el-image :src="src"></el-image>
    </div>
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
                "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        }
    }
};
</script>
<style scoped>
.fileBlock {
    display: inline-block;
    height: 200px;
    width: 300px;
    margin: 10px;
}
</style>