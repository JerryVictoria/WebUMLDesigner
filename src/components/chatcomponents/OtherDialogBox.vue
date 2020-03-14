<template>
    <div style="width: 100%; min-height: 30px; margin-bottom: 5px; float: left">
        <img
            draggable="false"
            class="horizontal-middle avatarImg"
            style="float: left; margin-right: 15px;"
            src="../../assets/other.png"
        />
        <div
            class="otherDialogDiv"
            style="display: inline-block; max-width: 100px; min-height: 20px; float: left; word-wrap: break-word;"
        >{{text}}</div>
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
    border: 1px dashed gainsboro;
    padding: 5px;
    border-radius: 3%;
}
</style>