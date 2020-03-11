<template>
    <div>
        <ul class="contextmenu-ul">
            <li tabindex="-1" class="contextmenu-li" @click="deleteNode">
                <i class="el-icon-delete"></i>
                <span>删除</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "ContextMenu",
    methods: {
        deleteNode() {
            if (this.$store.state.editingId) {
                console.log(this.$store.state.editingId);
                this.$store.dispatch("removeNode", {
                    id: this.$store.state.editingId
                });
            }
            if (this.$store.state.lineEditId) {
                console.log(this.$store.state.lineEditId);
                this.$store.commit("removeLine", {
                    id: this.$store.state.lineEditId
                });
            }
            this.$emit("hide-menu");
        }
    }
};
</script>
<style scoped>
.contextmenu-ul {
    position: fixed;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    width: 100px;
    height: 70px;
    padding: 5px 5px 5px 5px;
}
.contextmenu-li-hide {
    line-height: 24px;
    font-size: 16px;
    text-align: center;
    color: #909399;
    margin-left: 10px;
}
.contextmenu-li {
    line-height: 24px;
    font-size: 16px;
    text-align: center;
    list-style-type: none;
    width: 100%;
}
.contextmenu-li:focus,
.contextmenu-li:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
    cursor: pointer;
}
</style>