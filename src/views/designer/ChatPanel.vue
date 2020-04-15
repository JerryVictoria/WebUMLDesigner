<template>
    <el-card class="panel">
        <div slot="header">
            <span>聊天群组</span>
        </div>
        <div style="padding:10px 2px; margin-top:-20px;">
            <div
                id="contentDiv"
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
                <component
                    v-for="(item, index) in content"
                    :key="index"
                    :is="
                        $store.state.UML.userId == item.uid
                            ? 'SelfDialogBox'
                            : 'OtherDialogBox'
                    "
                    :text="item.chatContent"
                    :time="item.chatTime"
                ></component>
            </div>
            <div
                style="margin-top: 10px; display: flex; border-top: 1px solid #E4E7ED; padding-top:6px;"
            >
                <el-input placeholder="请输入……" v-model="message" @keyup.enter.native="sendMessage"></el-input>
                <el-button
                    style="margin-left: 5px;"
                    icon="el-icon-s-promotion"
                    type="primary"
                    round
                    @click="sendMessage"
                ></el-button>
            </div>
        </div>
    </el-card>
</template>
<script>
import SelfDialogBox from "../../components/chatcomponents/SelfDialogBox.vue";
import OtherDialogBox from "../../components/chatcomponents/OtherDialogBox.vue";
import $ from "jquery";
export default {
    name: "ChatPanel",
    components: {
        SelfDialogBox,
        OtherDialogBox
    },
    data() {
        return {
            content: [],
            message: "",
            wsUrl: "ws://localhost:8084/websocket/" /**172.19.241.250 */
        };
    },
    created() {
        // 页面创建生命周期函数
        this.initWebSocket();
    },
    mounted() {
        this.scrollToBottom();
    },
    destroyed: function() {
        // 离开页面生命周期函数
        this.websocketclose();
    },
    methods: {
        scrollToBottom() {
            var children = $("#contentDiv").children();
            //console.log(children.length);
            var h = 0;
            for (var i = 0; i < children.length; i++) {
                h = h + $(children[i]).height();
            }
            //console.log(h);
            $("#contentDiv").scrollTop(h);
        },
        sendMessage() {
            if (this.message == "") {
                return;
            }
            var msg = JSON.stringify({
                gid: this.$store.state.UML.groupId,
                uid: this.$store.state.UML.userId,
                fid: this.$store.state.UML.UMLId,
                chatTime: this.getFullTime(),
                chatContent: this.message
            });
            console.log("send msg:", msg);
            this.websock.send(msg);
            this.message = "";
        },
        getChatContent() {
            //axios
        },
        initWebSocket: function() {
            // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
            var msg = JSON.stringify({
                gid: this.$store.state.UML.groupId,
                uid: this.$store.state.UML.userId,
                fid: this.$store.state.UML.UMLId
            });
            console.log(this.wsUrl + msg);
            this.websock = new WebSocket(this.wsUrl + msg);
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onclose = this.websocketclose;
        },
        websocketonopen: function() {
            console.log("WebSocket连接成功");
        },
        websocketonerror: function(e) {
            console.log("WebSocket连接发生错误");
        },
        websocketonmessage: function(e) {
            console.log(e.data); // console.log(e);
            this.content.push($.parseJSON(e.data));
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
        websocketclose: function(e) {
            console.log("connection closed (" + e + ")");
            console.log(e);
        },
        getFullTime() {
            let date = new Date(), //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                Y = date.getFullYear() + "",
                M =
                    date.getMonth() + 1 < 10
                        ? "0" + (date.getMonth() + 1)
                        : date.getMonth() + 1,
                D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
                h =
                    date.getHours() < 10
                        ? "0" + date.getHours()
                        : date.getHours(),
                m =
                    date.getMinutes() < 10
                        ? "0" + date.getMinutes()
                        : date.getMinutes(),
                s =
                    date.getSeconds() < 10
                        ? "0" + date.getSeconds()
                        : date.getSeconds();
            return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
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
