<template>
    <el-card class="fileBlock">
        <div @click="handleClick">
            <span class="contentSpan omitted">{{fileName}}</span>
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
            default:
                "https://assets.processon.com/chart_image/thumb/5ddf6d17e4b0b2fab73984e3.png"
        },
        fid: {
            type: Number,
            default: -1
        }
    },
    methods: {
        handleClick() {
            var self = this;
            this.$axios
                .get("/getAllNodeByFid", { params: { fid: self.fid } })
                .then(function(response) {
                    console.log(response.data);
                    self.$store.commit("setUMLNodes", {
                        nodeList: response.data
                    });
                    self.$router.push({ name: "Designer" });
                })
                .catch(function(error) {
                    console.log("error:", error);
                });
            this.$axios
                .get("/getAllLineByFid", { params: { fid: self.fid } })
                .then(function(response) {
                    console.log(response.data);
                    //TODO
                    //self.$store.commit("setUMLLines", response.data);
                })
                .catch(function(error) {
                    console.log("error:", error);
                });
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