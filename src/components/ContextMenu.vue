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
    import html2canvas from "html2canvas";
    import canvg from "canvg";
    import * as qiniu from 'qiniu-js'
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
                //alert(this.$store.state.lineEditId.substr(4));
                var id;
                for(var i=0;i<this.$store.state.UML.lines.length;i++){
                    console.log(this.$store.state.UML.lines[i]);
                    console.log(this.$store.state.lineEditId);
                    if(this.$store.state.UML.lines[i].lineId==this.$store.state.lineEditId){
                        id=this.$store.state.UML.lines[i].lid
                        //alert(id)
                        //alert(this.$store.state.UML.lines[i].Id);
                        console.log(document.getElementById(this.$store.state.UML.lines[i].Id))
                        break;
                    }
                }
                this.$store.dispatch("removeLine", {
                    id: id
                });
            }
            this.$emit("hide-menu");
        },
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