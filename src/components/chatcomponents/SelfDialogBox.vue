<template>
    <div style="width: 100%; min-height: 30px; margin-bottom: 5px; float: right">
        <img
            draggable="false"
            class="horizontal-middle avatarImg"
            style="float: right"
            src="../../assets/self.png"
        />
        <div
            class="selfDialogDiv"
            style="display: inline-block; max-width: 100px; min-height: 20px; float: right ; margin-right: 15px;word-wrap: break-word;"
        >{{text}}</div>
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
    border: 1px solid grey;
    padding: 5px;
    border-radius: 3%;
}
</style>