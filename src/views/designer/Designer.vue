<template>
    <div>
        <div style="display: flex">
            <DiagramCanvas
                style="display: inline-block; width: 2000px;"
            ></DiagramCanvas>
            <ChatPanel style="display: inline-block"></ChatPanel>
        </div>
    </div>
</template>
<script>
import DiagramCanvas from "./DiagramCanvas.vue";
import ChatPanel from "./ChatPanel.vue";
export default {
    name: "Designer",
    components: {
        DiagramCanvas,
        ChatPanel
    }
};
</script>
