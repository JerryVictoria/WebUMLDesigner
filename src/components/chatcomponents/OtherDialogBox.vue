<template>
    <div style="width: 100%; min-height: 30px; margin-bottom: 5px; float: left">
        <span class="timeSpan">{{time}}</span>
        <img
            draggable="false"
            class="horizontal-middle avatarImg"
            style="float: left;"
            src="../../assets/other.png"
        />
        <div class="bubble">
            <div class="triDiv" style="display: inline-block; float: left; margin-left: 5px;"></div>
            <div
                class="otherDialogDiv"
                style="display: inline-block; max-width: 100px; min-height: 20px; float: left; word-wrap: break-word;"
            >{{text}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "OtherDialogBox",
    props: {
        text: String,
        time: {
            type: String,
            default: ""
        }
    }
};
</script>
<style scoped>
.otherDialogDiv {
    border: 1px solid #f2f6fc;
    background: #f2f6fc;
    padding: 5px;
    /* border-top-left-radius: 1em; */
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
    border-bottom-left-radius: 1em;
    font-size: 14px;
}
.triDiv {
    border-left: 5px solid transparent;
    border-right: 5px solid #f2f6fc;
    border-top: 5px solid #f2f6fc;
    border-bottom: 5px solid transparent;
}
.bubble {
    margin-top: 15px;
}
</style>