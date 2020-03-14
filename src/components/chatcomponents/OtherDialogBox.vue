<template>
    <div style="width: 100%; min-height: 30px; margin-bottom: 5px; float: left">
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
        text: String
    }
};
</script>
<style scoped>
.otherDialogDiv {
    border: 1px solid #f2f6fc;
    background: #f2f6fc;
    padding: 5px;
    border-radius: 3%;
    /* border-top-left-radius: 1em; */
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
    border-bottom-left-radius: 1em;
}
.triDiv {
    border-left: 5px solid transparent;
    border-right: 5px solid #f2f6fc;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
}
.bubble {
    margin-top: 15px;
}
</style>