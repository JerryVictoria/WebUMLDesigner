<template>
    <div id="designer">
        <el-container>
            <el-header id="top">
                mmmm
            </el-header>
            <el-divider></el-divider>
            <el-header id="tool">
                <tool-top-bar></tool-top-bar>
            </el-header>
            <el-container>
                <el-aside id="side" style="width:20%;">
                    <components-store-side-bar></components-store-side-bar>
                </el-aside>
                <el-main id="canvas" style="display: flex">
                    <DiagramCanvas id="Diagram" style="display: inline-block; width: 2000px;"
                    ></DiagramCanvas>
                    <ChatPanel style="display: inline-block"></ChatPanel>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import ToolTopBar from "../designer/ToolTopBar.vue";
    import DiagramCanvas from "../designer/DiagramCanvas.vue";
    import ComponentsStoreSideBar from "../designer/ComponentsStoreSideBar.vue";
    import ChatPanel from "./ChatPanel.vue";

    export default {
        name: "Designer",
        data() {
            return {
            }
        },
        components: {
            ToolTopBar,
            DiagramCanvas,
            ComponentsStoreSideBar,
            ChatPanel

        }
    };
</script>
<style scoped>
    #designer {
        overflow: auto;
        width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        top: 0;
    }

    #top {
        width: 100%;
        height: auto;
        display: block;
    }

    #tool {
        width: 100%;
        height: auto;
        display: block;
    }

    #side {
        left: 0;
        height: 700px;
        display: inline;
        z-index: 1;
    }

    #canvas {
        display: inline;
        left: 20%;
        width: 80%;
        height: 800px;
        overflow: auto;
    }
</style>
