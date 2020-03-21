<template>
    <div>
        <ul class="contextmenu-ul">
            <li tabindex="-1" class="contextmenu-li" @click="deleteNode">
                <i class="el-icon-delete"></i>
                <span>删除</span>
            </li>
        </ul>
    </div>
</template>
<script>
    import html2canvas from "html2canvas";
    import canvg from "canvg";
    import * as qiniu from 'qiniu-js'
export default {
    name: "ContextMenu",
    methods: {
        deleteNode() {
            if (this.$store.state.editingId) {
                console.log(this.$store.state.editingId);
                this.$store.dispatch("removeNode", {
                    id: this.$store.state.editingId
                });
            }
            if (this.$store.state.lineEditId) {
                //alert(this.$store.state.lineEditId.substr(4));
                var id
                for(var i=0;i<this.$store.state.UML.lines.length;i++){
                    console.log(this.$store.state.UML.lines[i]);
                    console.log(this.$store.state.lineEditId);
                    if(this.$store.state.UML.lines[i].lineId==this.$store.state.lineEditId){
                        id=this.$store.state.UML.lines[i].lid
                        //alert(id)
                        break;
                    }
                }
                this.$store.dispatch("removeLine", {
                    id: id
                });
            }
            this.$emit("hide-menu");
            this.uploadFile()
        },
        dataURLToBlob(dataurl) {//ie 图片转格式
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type: mime})
        },
        uploadFile() {
            var key = this.$store.state.UML.UMLType + "_" + this.$store.state.UML.UMLId;
            this.$store.dispatch("getToken",{key:key});
            this.$store.dispatch("getRefreshTime",{});
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
                var url= "http://q76chphm1.bkt.clouddn.com/"+key+"?v="+this.$store.state.refreshTime;
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
                    scope: "uml:"+key
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
                        this.$store.dispatch("refreshPic",{url:url});
                    }
                })
            })
        },
    }
};
</script>
<style scoped>
.contextmenu-ul {
    position: fixed;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    width: 100px;
    height: 70px;
    padding: 5px 5px 5px 5px;
}
.contextmenu-li-hide {
    line-height: 24px;
    font-size: 16px;
    text-align: center;
    color: #909399;
    margin-left: 10px;
}
.contextmenu-li {
    line-height: 24px;
    font-size: 16px;
    text-align: center;
    list-style-type: none;
    width: 100%;
}
.contextmenu-li:focus,
.contextmenu-li:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
    cursor: pointer;
}
</style>