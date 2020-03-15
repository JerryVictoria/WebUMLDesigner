<template>
    <div style="margin-bottom:1%;display: block;position:absolute;width:100%">
        <div style="margin-top:1%">
            <el-breadcrumb
                separator="/"
                style="display:inline-flex;left:2%;position:absolute;width:20%"
            >
                <el-breadcrumb-item>返回个人页面</el-breadcrumb-item>
                <el-breadcrumb-item>删除</el-breadcrumb-item>
                <i class="el-icon-download" @click="saveFile"></i>
                <el-breadcrumb-item>下载</el-breadcrumb-item>
            </el-breadcrumb>
            <el-color-picker
                v-model="lcolor"
                size="mini"
                style="display:inline-flex;left:16%;position:absolute;width:3%;margin: -0.5% 1% 0 1%"
                @change="linecolor"
            ></el-color-picker>
            <el-tooltip :content="fileName" placement="top">
                <el-input
                    style="display:inline-flex;left:60%;position:absolute;width:12%;margin: -1% 1% 0 1%"
                    v-model="fileName"
                ></el-input>
            </el-tooltip>
            <el-tooltip content="创建线条" placement="top">
                <el-button
                    round
                    id="createline"
                    @click="createline()"
                    style="display:inline-flex;left:19%;position:absolute;width:8%;margin: -1% 1% 0 1%"
                    v-show="create"
                >创建线条</el-button>
            </el-tooltip>
            <el-tooltip content="线条类型" placement="top">
                <el-select
                    id="lineType"
                    v-model="lineType"
                    placeholder="线条类型"
                    style="width: 8%;height: 40px;position:absolute;left:28%;margin: -1% 1% 0 1%"
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
                            style="width: 30px; height:30px;position:absolute;left:36.36%"
                        ></el-image>
                    </el-option>
                </el-select>
            </el-tooltip>
            <el-tooltip content="线宽" placement="top">
                <el-select
                    id="lineSize"
                    v-model="lineSize"
                    placeholder="线宽"
                    style="width: 6%;height: 40px;position:absolute;left:37%;margin: -1% 1% 0 1%"
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
                    style="width: 15%;height: 40px;position:absolute;left:44%;margin: -1% 1% 0 1%"
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
            lineSize: "1px",
            lineStyle: "solid",
            style: "",
            type: ""
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
        goBack() {
            console.log("go back");
        },
        createline() {
            var diagram = Diagram;
            console.log("createline");
            this.$store.commit("setDrawLine", { drawLine: true });
            this.$store.commit("setLineEditId", { id: "" });
            this.$store.commit("setEditState", { editing: false });
            this.$store.commit("setEditId", { id: "" });
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
                    stroke: this.lcolor,
                    strokeDasharray: line.lineStyle.strokeDasharray, //虚线之类的
                    strokeWidth: line.lineStyle.strokeWidth //固定几种
                };
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
                    stroke: this.lcolor,
                    strokeDasharray: line.lineStyle.strokeDasharray, //虚线之类的
                    strokeWidth: line.lineStyle.strokeWidth //固定几种
                };
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
        linetype() {},
        saveFile(){
            // 最外层的容器
            const treeContainnerElem = document.getElementById('Diagram')
            // 要导出div
            const treeElem = document.getElementById("visualEditor")
            // 从要导出的div克隆的临时div
            const tempElem = treeElem.cloneNode(true)
            tempElem.id = 'temp-tree'
            tempElem.className = 'fff'
            tempElem.style.width = treeElem.clientWidth + 'px'
            tempElem.style.height = treeElem.clientHeight + 'px'
            treeContainnerElem.appendChild(tempElem)

            // 在临时div上将svg都转换成canvas，并删除原有的svg节点
            const svgElem = tempElem.querySelectorAll("svg");
            svgElem.forEach((node) => {
                var parentNode = node.parentNode;
                var svg = node.outerHTML.trim();
                var canvas = document.createElement("canvas");
                canvg(canvas, svg);
                canvas.style.zIndex = 9
                if (node.style.position) {
                    canvas.style.position += node.style.position;
                    canvas.style.left += node.style.left;
                    canvas.style.top += node.style.top;
                }
                parentNode.removeChild(node);
                parentNode.appendChild(canvas);
            });


            html2canvas(treeContainnerElem, {
                useCORS: true // 允许CORS跨域
            }).then(canvas => {
                // 图片触发下载
                /*
                const img = canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,", "");
                const finalImageSrc = "data:image/jpeg;base64," + img;
                const aElem = document.createElement('a')
                document.body.appendChild(aElem)
                aElem.href = finalImageSrc
                // 设置下载标题
                aElem.download = "chart.jpg"
                aElem.click()
                */
                this.imgmap = canvas.toDataURL()
                console.log(999, this.imgmap)
                if (window.navigator.msSaveOrOpenBlob) {
                    var bstr = atob(this.imgmap.split(',')[1])
                    var n = bstr.length
                    var u8arr = new Uint8Array(n)
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n)
                    }
                    var blob = new Blob([u8arr])
                    window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png')
                } else {
                    // 这里就按照chrome等新版浏览器来处理
                    const a = document.createElement('a')
                    document.body.appendChild(a)
                    a.href = this.imgmap
                    a.setAttribute('download', this.$store.state.UML.UMLType+"_"+this.$store.state.UML.UMLId)
                    a.click()
                    document.body.removeChild(a)
                }
                treeContainnerElem.removeChild(tempElem)
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