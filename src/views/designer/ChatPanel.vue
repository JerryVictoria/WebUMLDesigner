<template>
    <el-card class="panel">
        <div slot="header">
            <span>聊天群组</span>
        </div>
        <div style="padding:10px 2px; margin-top:-20px;">
            <div
                style="padding:2px 10px; height: 230px; width: 100%; margin-top: 10px; overflow-y: auto;"
            >
                <SelfDialogBox :text="'self text text......y...a.....f..........'"></SelfDialogBox>
                <OtherDialogBox :text="'other text'"></OtherDialogBox>
                <SelfDialogBox :text="'self text'"></SelfDialogBox>
                <OtherDialogBox
                    :text="
                    'other text text...sdfdsfdsf..sdfsfd....g.....gfdf..sfgfgfg.....df....dfgdfgdfg....'
                "
                ></OtherDialogBox>
                <SelfDialogBox :text="'self text'"></SelfDialogBox>
                <OtherDialogBox :text="'other text'"></OtherDialogBox>
                <!--
                <template v-for>
                    if id == self
                    <component :is="SelfDialogBox"></component>
                    else
                    <component :is="OtherDialogBox"></component>
                </template>
                -->
            </div>
            <div
                style="margin-top: 10px; display: flex; border-top: 1px solid #E4E7ED; padding-top:6px;"
            >
                <el-input placeholder="请输入……"></el-input>
                <el-button
                    style="margin-left: 5px;"
                    icon="el-icon-s-promotion"
                    type="primary"
                    round
                ></el-button>
            </div>
        </div>
    </el-card>
</template>
<script>
import SelfDialogBox from "../../components/chatcomponents/SelfDialogBox.vue";
import OtherDialogBox from "../../components/chatcomponents/OtherDialogBox.vue";
export default {
    name: "ChatPanel",
    components: {
        SelfDialogBox,
        OtherDialogBox
    },
    data() {
        return {
            content: [
                { id: "me", text: "", time: "" },
                { id: "other", text: "", time: "" }
            ]
        };
    },
    methods: {
        getChatContent() {
            //axios
        }
    }
};
</script>
<style scoped>
.panel {
    width: 93%;
    height: 380px;
    padding: 0px 10px 0px 10px;
    background: white;
}
</style>
