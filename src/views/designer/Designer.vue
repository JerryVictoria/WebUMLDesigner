<template>
    <div id="designer">
        <el-container>
            <el-header id="tool">
                <tool-top-bar></tool-top-bar>
            </el-header>
            <el-container class="mainBody">
                <el-aside
                    id="side"
                    :style="{
                        width: 300 + ($store.state.UML.groupId > 0) * 100 + 'px'
                    }"
                >
                    <components-store-side-bar :height="$store.state.UML.groupId > 0 ? 110 : 400"></components-store-side-bar>
                    <ChatPanel v-if="$store.state.UML.groupId > 0" class="chatPanel"></ChatPanel>
                </el-aside>
                <el-main id="canvas" style="display: flex">
                    <DiagramCanvas
                        :minLeft="320 + ($store.state.UML.groupId > 0) * 100"
                        id="Diagram"
                        style="display: inline-block; width: 2000px;"
                    ></DiagramCanvas>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import ToolTopBar from "../designer/ToolTopBar.vue";
import DiagramCanvas from "../designer/DiagramCanvas.vue";
import ComponentsStoreSideBar from "../designer/ComponentsStoreSideBar.vue";
import ChatPanel from "./ChatPanel.vue";
import html2canvas from "html2canvas";
import canvg from "canvg";
import * as qiniu from "qiniu-js";
export default {
    name: "Designer",
    data() {
        return {};
    },
    mounted() {
        console.log("group?--", this.$store.state.UML.groupId > 0);
    },
    components: {
        ToolTopBar,
        DiagramCanvas,
        ComponentsStoreSideBar,
        ChatPanel
    },
    created(){
        window.addEventListener("beforeunload",this.test(),true)
        window.addEventListener("unload",this.test1(),true)
        window.addEventListener("load",this.test2(),true)
    },
    destroyed(){
        window.removeEventListener("beforeunload",this.test(),false)
        window.removeEventListener("unload",this.test1(),false)
        window.removeEventListener("load",this.test2(),false)
    },
    methods:{
        dataURLToBlob(dataurl) {//ie 图片转格式
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type: mime})
        },
        uploadFile() {
            console.log("uploadfile")
            var key = this.$store.state.UML.UMLType + "_" + this.$store.state.UML.UMLId;
            this.$store.dispatch("getToken", {key: key});
            this.$store.dispatch("getRefreshTime", {});
            //var url= "http://q76chphm1.bkt.clouddn.com/"+key
            // 最外层的容器
            const treeContainnerElem = document.getElementById('visualEditor');
            // 要导出div
            const treeElem = document.getElementById("canvas");
            //console.log(treeElem);
            // 从要导出的div克隆的临时div
            const tempElem = treeElem.cloneNode(true);
            tempElem.id = 'temp-tree';
            tempElem.className = 'fff';
            tempElem.style.width = treeElem.clientWidth + 'px';
            tempElem.style.height = treeElem.clientHeight + 'px';
            treeContainnerElem.appendChild(tempElem);
            //console.log(tempElem);
            // 在临时div上将svg都转换成canvas，并删除原有的svg节点
            const svgElem = tempElem.querySelectorAll("svg");
            console.log(svgElem);
            svgElem.forEach((node) => {
                var parentNode = node.parentNode;
                console.log(parentNode);
                var svg = node.outerHTML.trim();
                var canvas = document.createElement("canvas");
                canvg(canvas, svg);
                canvas.style.zIndex = 9;
                if (node.style.position) {
                    canvas.style.position += node.style.position;
                    canvas.style.left += node.style.left;
                    canvas.style.top += node.style.top;
                    canvas.style.zIndex = 0
                }
                parentNode.appendChild(canvas);
                parentNode.removeChild(node);
            });
            console.log(tempElem);
            html2canvas(treeContainnerElem, {
                useCORS: true // 允许CORS跨域
            }).then(canvas => {
                canvas.style.height = tempElem.style.height + 'px';
                let dom = document.body.appendChild(canvas);
                let a = document.createElement('a');
                dom.style.display = "none";
                a.style.display = "none";
                document.body.removeChild(dom);
                let blob = this.dataURLToBlob(dom.toDataURL("image/png"));
                var url = "http://qaxj3iums.bkt.clouddn.com/" + key + "?v=" + this.$store.state.refreshTime;
                //alert(url);
                var Token = this.$store.state.Token;
                let config = {
                    useCdnDomain: true,
                    region: qiniu.region.z0
                };
                let putExtra = {
                    fname: key,
                    params: {},
                    mimeType: ["image/png", "image/jpeg"]
                };
                let options = {
                    scope: "uml:" + key
                };
                let observable = qiniu.upload(blob, key, Token, putExtra, config);
                observable.subscribe({
                    next: (res) => {
                        // 主要用来展示进度
                        let total = res.total;
                        console.log("进度：" + parseInt(total.percent) + "% ")
                    },
                    error: (err) => {
                        // 失败报错信息
                        console.log(err)
                    },
                    complete: (res) => {
                        // 接收成功后返回的信息
                        //alert("上传成功");
                        console.log(res)
                        /*
                        this.$message({
                            message: "修改保存成功",
                            type: "success"
                        });
                        */
                        treeContainnerElem.removeChild(tempElem);
                        this.$store.dispatch("refreshPic", {url: url});
                    }
                })
            })
        },
        test(){
            console.log("test");
            //alert("test")
        },
        test1(){
            console.log("test1");
            //alert("test1")
        },
        test2(){
            console.log("test2");
            //alert("test2")
        }
    },

};
</script>
<style scoped>
#designer {
    overflow: auto;
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
}

#top {
    width: 100%;
    height: auto;
    display: block;
}

#tool {
    width: 100%;
    height: auto;
    margin-top: 1%;
    display: block;
}

#side {
    left: 0;
    display: inline;
    z-index: 1;
}

#canvas {
    display: inline;
    left: 20%;
    overflow: auto;
}
.chatPanel {
    display: inline-block;
    margin-left: 2px;
}
.mainBody {
    margin-top: -25px;
}
</style>
