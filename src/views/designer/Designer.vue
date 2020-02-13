<template>
    <div id="designer">
        <el-header  id="top">
            mmmm
        </el-header >
        <el-divider></el-divider>
        <el-header id="tool">
            <tool-top-bar></tool-top-bar>
        </el-header>
            <el-aside id="side" style="width:20%;">
                <components-store-side-bar></components-store-side-bar>
            </el-aside>
        <el-main id="canvas" style="display: flex">
            <DiagramCanvas id="Diagram" style="display: inline-block; width: 2000px;"
            ></DiagramCanvas>
            <ChatPanel style="display: inline-block"></ChatPanel>
        </el-main>
    </div>
</template>
<script>
    import ToolTopBar from "../designer/ToolTopBar.vue";
    import DiagramCanvas from "../designer/DiagramCanvas.vue";
    import ComponentsStoreSideBar from "../designer/ComponentsStoreSideBar.vue";
    import ChatPanel from "./ChatPanel.vue";
    export default {
        name: "Designer",
        components: {
            ToolTopBar,
            DiagramCanvas,
            ComponentsStoreSideBar,
            ChatPanel

        }
    };
</script>
<style scoped>
    #designer{
        width:100%;
        position:absolute;
        left:0;
        top:0;
    }
    #top{
        width:100%;
        height:auto;
        display:block;
    }
    #tool{
        width:100%;
        height:auto;
        display:block;
    }
    #side{
        position:fixed;
        left:0;
        width:20%;
        height:700px;
        background-color: white;
        display:inline-block;
        z-index:1;
    }
    #canvas{
        position:fixed;
        left:20%;
        width:80%;
        height:800px;
        overflow-x:scroll;
        overflow-y:scroll;
    }
</style>
