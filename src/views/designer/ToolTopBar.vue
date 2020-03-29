<template>
    <div
            style="margin-bottom:1%;display: block;position:absolute;width:100%"
    >
        <div style="margin-top:1%">
            <el-breadcrumb
                    separator="/"
                    style="display:inline-flex;left:-1%;position:absolute;width:30%;margin: -1% 1% 0 1%"
            >
                <el-breadcrumb-item>
                    <el-tooltip content="返回上一级">
                        <el-button
                                @click="backToPerson"
                                round
                        >返回上一级
                        </el-button>
                    </el-tooltip>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <el-tooltip content="删除文件" placement="top">
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteFile"
                                   content="删除文件"></el-button>
                    </el-tooltip>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <el-tooltip content="下载文件" placement="top">
                        <el-button type="download" icon="el-icon-download" circle @click="saveFile"
                                   content="下载文件"></el-button>
                    </el-tooltip>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <el-color-picker
                    v-model="lcolor"
                    size="mini"
                    style="display:inline-flex;left:21%;position:absolute;width:3%;margin: -0.5% 1% 0 1%"
                    @change="linecolor"
            ></el-color-picker>
            <el-tooltip :content="fileName" placement="top">
                <el-input
                        style="display:inline-flex;left:65%;position:absolute;width:12%;margin: -1% 1% 0 1%"
                        v-model="fileName"
                ></el-input>
            </el-tooltip>
            <el-tooltip content="创建线条" placement="top">
                <el-button
                        round
                        id="createline"
                        @click="createline()"
                        style="display:inline-flex;left:24%;position:absolute;width:8%;margin: -1% 1% 0 1%"
                        v-show="create"
                >创建线条
                </el-button>
            </el-tooltip>
            <el-tooltip content="线条类型" placement="top">
                <el-select
                        id="lineType"
                        v-model="lineType"
                        placeholder="线条类型"
                        style="width: 8%;height: 40px;position:absolute;left:33%;margin: -1% 1% 0 1%"
                        @change="linetype(lineType)"
                >
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                        <el-image
                                :src="item.url"
                                style="width: 30px; height:30px;position:absolute;left:41.36%"
                        ></el-image>
                    </el-option>
                </el-select>
            </el-tooltip>
            <el-tooltip content="线宽" placement="top">
                <el-select
                        id="lineSize"
                        v-model="lineSize"
                        placeholder="线宽"
                        style="width: 6%;height: 40px;position:absolute;left:42%;margin: -1% 1% 0 1%"
                        @change="linesize(lineSize)"
                >
                    <el-option
                            v-for="item in sizeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    ></el-option>
                </el-select>
            </el-tooltip>
            <el-tooltip content="线条样式" placement="top">
                <el-select
                        id="lineStyle"
                        v-model="lineStyle"
                        placeholder="线条样式"
                        style="width: 15%;height: 40px;position:absolute;left:49%;margin: -1% 1% 0 1%"
                        @change="linestyle(lineStyle)"
                >
                    <el-option
                            v-for="item in styleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                        <el-image
                                :src="item.url"
                                style=" width: 160px;height:20px;position:absolute;left:10%"
                        ></el-image>
                    </el-option>
                </el-select>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
    import Diagram from "@/views/designer/DiagramCanvas";
    import html2canvas from "html2canvas";
    import canvg from "canvg";
    import * as qiniu from 'qiniu-js'

    export default {
        name: "tool-top-bar",
        data() {
            return {
                fileName: "default文件名",
                lcolor: "#409EFF",
                create: true,
                options: [
                    {
                        value: "直线",
                        label: "直线",
                        type: "straight",
                        url: require("../../assets/image/straight.png")
                    },
                    {
                        value: "折线",
                        label: "折线",
                        type: "orthogonal",
                        url: require("../../assets/image/orthogonal.png")
                    },
                    {
                        value: "曲线",
                        label: "曲线",
                        type: "curve",
                        url: require("../../assets/image/curve.png")
                    }
                ],
                sizeOptions: [
                    {
                        value: "1",
                        label: "1px"
                    },
                    {
                        value: "2",
                        label: "2px"
                    },
                    {
                        value: "3",
                        label: "3px"
                    },
                    {
                        value: "4",
                        label: "4px"
                    },
                    {
                        value: "5",
                        label: "5px"
                    },
                    {
                        value: "6",
                        label: "6px"
                    },
                    {
                        value: "8",
                        label: "8px"
                    },
                    {
                        value: "10",
                        label: "10px"
                    }
                ],
                styleOptions: [
                    {
                        value: "solid",
                        label: "solid",
                        dasharray: "0,0",
                        url: require("../../assets/image/solid.png")
                    },
                    {
                        value: "dashed",
                        label: "dashed",
                        dasharray: "10,10",
                        url: require("../../assets/image/dashed.png")
                    },
                    {
                        value: "dot",
                        label: "dot",
                        dasharray: "1,1",
                        url: require("../../assets/image/dot.png")
                    },
                    {
                        value: "dashdot",
                        label: "dashdot",
                        dasharray: "20,10,5,10",
                        url: require("../../assets/image/dashdot.png")
                    }
                ],
                lineType: "直线",
                lineSize: "3px",
                lineStyle: "solid",
                style: "",
                type: "",
                imageUrl: '',
                token: {},
                // 七牛云的上传地址,华东区
                domain: 'upload.qiniup.com',
                // 这是七牛云空间的外链默认域名
                qiniuaddr: 'q76chphm1.bkt.clouddn.com'
            };
        },
        mounted() {
            var style = "";
            switch (this.lineStyle) {
                case "solid":
                    style = "0,0";
                    break;
                case "dashed":
                    style = "10,10";
                    break;
                case "dot":
                    style = "2,2";
                    break;
                case "dashdot":
                    style = "20,10,5,10";
                    break;
            }
            this.$store.commit("setLineColor", {
                lineColor: this.lcolor
            });
            this.$store.commit("setLineSize", {
                lineSize: this.lineSize
            });
            this.$store.commit("setLineStyle", {
                lineStyle: style
            });
        },
        methods: {
            backToPerson() {
                //alert("PersonalPage")
                this.$router.push({name: "PersonalPage"});
            },
            deleteFile() {
                //alert("删除文件")
                var self = this;
                var userId = parseInt(self.$store.state.UML.userId)
                var fid = parseInt(self.$store.state.UML.UMLId)
                self.$axios
                    .get("/delFile", {
                        params: {
                            uid: userId,
                            fid: fid,
                        }
                    })
                    .then(function (response) {
                        //alert(response.data)
                        if (response.data) {
                            self.$message({
                                message: "文件删除成功",
                                type: "success"
                            });
                            self.$router.push({name: "PersonalPage"});
                        } else {
                            self.$message({
                                message: "文件删除失败",
                                type: "failure"
                            });
                        }
                    }).catch(function (error) {
                    console.log("error:" + error);
                })
            },
            goBack() {
                console.log("go back");
            },
            createline() {
                var diagram = Diagram;
                console.log("createline");
                this.$store.commit("setDrawLine", {drawLine: true});
                this.$store.commit("setLineEditId", {id: ""});
                this.$store.commit("setEditState", {editing: false});
                this.$store.commit("setEditId", {id: ""});
                diagram.methods.changeshowMenu();
                //this.create=false;
            },
            check() {
                this.create = true;
            },
            close() {
                this.create = true;
            },
            linecolor() {
                if (this.$store.state.lineEditId != "") {
                    console.log("linecolor" + this.lcolor);
                    console.log("lineid" + this.$store.state.lineEditId);
                    console.log(this.$store.state.UML.lines);
                    for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                        if (
                            this.$store.state.UML.lines[i].Id ==
                            this.$store.state.lineEditId
                        ) {
                            var line = this.$store.state.UML.lines[i];
                            console.log(line);
                        }
                    }
                    var style = {
                        stroke: this.lcolor,
                        strokeDasharray: line.lineStyle.strokeDasharray, //虚线之类的
                        strokeWidth: line.lineStyle.strokeWidth //固定几种
                    };
                    console.log(this.$store.state.lineEditId);
                    console.log(this.lcolor);
                    this.uploadFile();
                    this.$store.dispatch("modifyLine", {
                        lineKey: "lineStyle",
                        key: "stroke",
                        value: this.lcolor,
                        id: this.$store.state.lineEditId,
                        Line: line,
                        lineStyle: style
                    });
                    console.log(this.$store.state.UML.lines);
                }
                this.$store.commit("setLineColor", {
                    lineColor: this.lcolor
                });
            },
            linestyle(item) {
                var style = "";
                switch (item) {
                    case "solid":
                        style = "0,0";
                        break;
                    case "dashed":
                        style = "10,10";
                        break;
                    case "dot":
                        style = "2,2";
                        break;
                    case "dashdot":
                        style = "20,10,5,10";
                        break;
                }
                if (this.$store.state.lineEditId != "") {
                    console.log("linestyle" + this.style);
                    console.log("lineid" + this.$store.state.lineEditId);
                    for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                        if (
                            this.$store.state.UML.lines[i].Id ==
                            this.$store.state.lineEditId
                        ) {
                            var line = this.$store.state.UML.lines[i];
                            console.log(line);
                        }
                    }
                    var style1 = {
                        stroke: line.lineStyle.stroke,
                        strokeDasharray: style, //虚线之类的
                        strokeWidth: line.lineStyle.strokeWidth //固定几种
                    };
                    this.uploadFile();
                    this.$store.dispatch("modifyLine", {
                        lineKey: "lineStyle",
                        key: "strokeDasharray",
                        value: style,
                        id: this.$store.state.lineEditId,
                        Line: line,
                        lineStyle: style1
                    });
                }
                this.$store.commit("setLineStyle", {
                    lineStyle: style
                });
            },
            linesize(size) {
                if (this.$store.state.lineEditId != "") {
                    console.log("linesize:" + this.lineSize);
                    console.log("lineid" + this.$store.state.lineEditId);
                    for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                        if (
                            this.$store.state.UML.lines[i].Id ==
                            this.$store.state.lineEditId
                        ) {
                            var line = this.$store.state.UML.lines[i];
                            console.log(line);
                        }
                    }
                    var style = {
                        stroke: line.lineStyle.stroke,
                        strokeDasharray: line.lineStyle.strokeDasharray, //虚线之类的
                        strokeWidth: this.lineSize //固定几种
                    };
                    this.uploadFile();
                    this.$store.dispatch("modifyLine", {
                        lineKey: "lineStyle",
                        key: "strokeWidth",
                        value: size,
                        id: this.$store.state.lineEditId,
                        Line: line,
                        lineStyle: style
                    });
                }
                this.$store.commit("setLineSize", {
                    lineSize: size
                });
            },
            linetype() {
            },
            saveFile() {
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
                    // 图片触发下载
                    canvas.style.height = tempElem.style.height + 'px';
                    console.log(canvas.style);
                    let dom = document.body.appendChild(canvas);
                    let a = document.createElement('a');
                    dom.style.display = "none";
                    a.style.display = "none";
                    document.body.removeChild(dom);
                    let blob = this.dataURLToBlob(dom.toDataURL("image/png"));
                    a.setAttribute("href", URL.createObjectURL(blob));
                    a.setAttribute("download", this.$store.state.UML.UMLType + "_" + this.$store.state.UML.UMLI + ".png");
                    document.body.appendChild(a);
                    a.click();
                    URL.revokeObjectURL(blob);
                    document.body.removeChild(a);
                    treeContainnerElem.removeChild(tempElem)
                })
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
                    var url = "http://q76chphm1.bkt.clouddn.com/" + key + "?v=" + this.$store.state.refreshTime;
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
        },
        state: {
            editor: {
                toolList: [
                    //线条颜色
                    {
                        name: "lineColor",
                        label: "line color",
                        type: "dropdown-color-picker"
                    }
                    //线条宽度linewidth
                    //线条样式linedash
                    //线条类型linetype
                    //线条开端样式startarrow
                    //线条尾端样式endarrow
                ]
            }
        }
    };
</script>

<style>
    #lineType {
    }
</style>