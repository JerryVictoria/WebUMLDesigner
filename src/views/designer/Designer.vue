<template>
    <div id="designer">
        <el-container>
            <el-header id="tool">
                <tool-top-bar></tool-top-bar>
            </el-header>
            <el-container class="mainBody">
                <el-aside
                    id="side"
                    :style="{
                        width: 300 + ($store.state.UML.groupId > 0) * 100 + 'px'
                    }"
                >
                    <components-store-side-bar
                        :height="$store.state.UML.groupId > 0 ? 110 : 400"
                    ></components-store-side-bar>
                    <ChatPanel
                        v-if="$store.state.UML.groupId > 0"
                        class="chatPanel"
                    ></ChatPanel>
                </el-aside>
                <el-main id="canvas" style="display: flex">
                    <DiagramCanvas
                        id="Diagram"
                        style="display: inline-block; width: 2000px;"
                    ></DiagramCanvas>
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
        return {};
    },
    mounted() {
        console.log("group?--", this.$store.state.UML.groupId > 0);
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
    margin-top: 1%;
    display: block;
}

#side {
    left: 0;
    display: inline;
    z-index: 1;
}

#canvas {
    display: inline;
    left: 20%;
    overflow: auto;
}
.chatPanel {
    display: inline-block;
    margin-left: 2px;
}
.mainBody {
    margin-top: -25px;
}
</style>
