<template>
    <div class="panel">
        <div style="height: 500px; width: 100%; margin-top: 20px;">
            <SelfDialogBox :text="'self text text......y...a.....f..........'"></SelfDialogBox>
            <OtherDialogBox :text="'other text'"></OtherDialogBox>
            <SelfDialogBox :text="'self text'"></SelfDialogBox>
            <OtherDialogBox :text="'other text text.........g.....gfdf.......df........'"></OtherDialogBox>
            <SelfDialogBox :text="'self text'"></SelfDialogBox>
            <OtherDialogBox :text="'other text'"></OtherDialogBox>
        </div>
        <hr />
        <div style="margin-top: 20px; display: flex; ">
            <el-input placeholder="请输入……"></el-input>
            <el-button primary>发送</el-button>
        </div>
    </div>
</template>
<script>
import SelfDialogBox from "../../components/chatcomponents/SelfDialogBox.vue";
import OtherDialogBox from "../../components/chatcomponents/OtherDialogBox.vue";
export default {
    name: "ChatPanel",
    components: {
        SelfDialogBox,
        OtherDialogBox
    }
};
</script>
<style scoped>
.panel {
    margin-top: 10px;
    width: 100%;
    height: 600px;
    border: 1px solid grey;
    padding: 0px 10px 0px 10px;
}
</style>
