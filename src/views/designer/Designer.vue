<!--制图界面-->
<template>
    <div id="designer">
        <div id="top">
            mmmm
        </div>
        <div id="tool">
            <tool-top-bar></tool-top-bar>
        </div>
        <div id="bottom">
            <div id="side">
                <components-store-side-bar></components-store-side-bar>
            </div>
            <div id="canvas">
                <div style="display: flex">
                    <DiagramCanvas
                            style="display: inline-block; width: 2000px;"
                    ></DiagramCanvas>
                    <ChatPanel style="display: inline-block"></ChatPanel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ToolTopBar from "../designer/ToolTopBar.vue";
    import DiagramCanvas from "../designer/DiagramCanvas.vue";
    import ComponentsStoreSideBar from "../designer/ComponentsStoreSideBar.vue";
    import ChatPanel from "./ChatPanel.vue";
    export default {
        name: "Designer",
        components:{
            ToolTopBar,
            DiagramCanvas,
            ComponentsStoreSideBar,
            ChatPanel
        }
    }
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
        background-color: darkgrey;
        display:block;
    }
    #tool{
        width:100%;
        height:auto;
        background-color: grey;
        display:block;
    }
    #bottom{
        display:block;
    }
    #side{
        position:absolute;
        left:0;
        width:20%;
        height:800px;
        background-color: darkslategrey;
        display:inline-block;
        overflow:scroll;
    }
    #canvas{
        position:absolute;
        left:20%;
        width:80%;
        height:800px;
        display:inline-block;
        overflow:scroll;
    }
</style>