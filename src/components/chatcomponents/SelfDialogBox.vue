<template>
    <div style="width: 100%; min-height: 30px; margin-bottom: 5px; float: right">
        <img
            draggable="false"
            class="horizontal-middle avatarImg"
            style="float: right"
            src="../../assets/self.png"
        />
        <div class="bubble">
            <div class="triDiv" style="display: inline-block; float: right; margin-right: 5px;"></div>
            <div
                class="selfDialogDiv"
                style="display: inline-block; max-width: 100px; min-height: 20px; float: right ;word-wrap: break-word;"
            >{{text}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "SelfDialogBox",
    props: {
        text: String
    }
};
</script>
<style scoped>
.selfDialogDiv {
    border: 1px solid #c0c4cc;
    padding: 5px;
    border-top-left-radius: 1em;
    /* border-top-right-radius:2em; */
    border-bottom-right-radius: 1em;
    border-bottom-left-radius: 1em;
}
.triDiv {
    border-left: 5px solid #c0c4cc;
    border-right: 5px solid transparent;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
}
.bubble {
    margin-top: 15px;
}
</style>