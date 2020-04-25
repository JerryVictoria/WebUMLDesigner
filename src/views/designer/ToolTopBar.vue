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
            <el-tooltip content="文件名" placement="top">
                <el-input
                        style="display:inline-flex;left:64%;position:absolute;width:10%;margin: -1% 1% 0 1%"
                        v-model="fileName"
                >
                    <i slot="suffix" class="el-input__icon el-icon-circle-check" v-show="modifyFN" @click="checkFileName"></i>
                    <i slot="suffix" class="el-input__icon el-icon-circle-close" v-show="modifyFN" @click="closeFileName"></i>
                </el-input>
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
                            :value="item.type"
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
                        style="width: 14%;height: 40px;position:absolute;left:49%;margin: -1% 1% 0 1%"
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
            <el-image
                        style="display:inline-flex;position:absolute;left:77%;top:51%;width:6%;z-index:1;background-color: white"
                        :src="startImg"
                >
                </el-image>
            <el-tooltip content="连线起点" placement="top">
                    <el-select
                            id="startPoint"
                            v-model="lineStartPoint"
                            style="position:absolute;left:75%;position:absolute;width:10%;margin: -1% 1% 0 1%;z-index:0"
                            @change="startPoint(lineStartPoint)"
                    >
                        <el-option
                                v-for="item in endOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                            <el-image
                                    :src="item.url"
                                    style="width: 120px; height:30px;position:absolute;left:6%"
                            ></el-image>
                        </el-option>
                    </el-select>
                </el-tooltip>
            <el-image
                    style="display:inline-flex;position:absolute;left:88%;top:51%;width:6%;z-index:1;background-color: white"
                    :src="endImg"
            >
            </el-image>
            <el-tooltip content="连线终点" placement="top">
                <el-select
                        id="startPoint"
                        v-model="lineEndPoint"
                        style="display:inline-flex;left:86%;position:absolute;width:10%;margin: -1% 1% 0 1%;z-index:0"
                        @change="endPoint(lineEndPoint)"

                >
                    <el-option
                            v-for="item in startOptions"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value"
                    >
                        <el-image
                                :src="item.url"
                                style="width: 120px; height:30px;position:absolute;left:6%"
                        >
                        </el-image>
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
                fileName: "",
                oldFileName:"",
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
                startOptions: [
                    {
                        value: "(#arrow11)",
                        number:1,
                        label:"11",
                        url: require("../../assets/icons/toolbar/11.png")
                    },
                    {
                        value: "(#arrow5)",
                        number:2,
                        label: "5",
                        url: require("../../assets/icons/toolbar/5.png")
                    },
                    {
                        value: "(#arrow1)",
                        number:3,
                        label: "1",
                        url: require("../../assets/icons/toolbar/1.png")
                    },
                    {
                        value: "(#arrow3)",
                        number:4,
                        label: "3",
                        url: require("../../assets/icons/toolbar/3.png")
                    },
                    {
                        value: "(#arrow15)",
                        number:5,
                        label: "15",
                        url: require("../../assets/icons/toolbar/15.png")
                    },
                    {
                        value: "(#arrow13)",
                        number:6,
                        label: "13",
                        url: require("../../assets/icons/toolbar/13.png")
                    },
                    {
                        value: "(#arrow17)",
                        number:7,
                        label: "17",
                        url: require("../../assets/icons/toolbar/17.png")
                    },
                    {
                        value: "(#arrow21)",
                        number:8,
                        label: "21",
                        url: require("../../assets/icons/toolbar/21.png")
                    },
                    {
                        value: "(#arrow19)",
                        number:9,
                        label: "19",
                        url: require("../../assets/icons/toolbar/19.png")
                    },
                    {
                        value: "(#arrow9)",
                        number:10,
                        label: "9",
                        url: require("../../assets/icons/toolbar/9.png")
                    },
                    {
                        value: "(#arrow7)",
                        number:11,
                        label: "7",
                        url: require("../../assets/icons/toolbar/7.png")
                    },
                ],
                endOptions: [
                    {
                        value: "(#arrow12)",
                        label: "12",
                        url: require("../../assets/icons/toolbar/12.png")
                    },
                    {
                        value: "(#arrow6)",
                        label: "6",
                        url: require("../../assets/icons/toolbar/6.png")
                    },
                    {
                        value: "(#arrow2)",
                        label: "2",
                        url: require("../../assets/icons/toolbar/2.png")
                    },
                    {
                        value: "(#arrow4)",
                        label: "4",
                        url: require("../../assets/icons/toolbar/4.png")
                    },
                    {
                        value: "(#arrow16)",
                        label: "16",
                        url: require("../../assets/icons/toolbar/16.png")
                    },
                    {
                        value: "(#arrow14)",
                        label: "14",
                        url: require("../../assets/icons/toolbar/14.png")
                    },
                    {
                        value: "(#arrow18)",
                        label: "18",
                        url: require("../../assets/icons/toolbar/18.png")
                    },
                    {
                        value: "(#arrow22)",
                        label: "22",
                        url: require("../../assets/icons/toolbar/22.png")
                    },
                    {
                        value: "(#arrow20)",
                        label: "20",
                        url: require("../../assets/icons/toolbar/20.png")
                    },
                    {
                        value: "(#arrow10)",
                        label: "10",
                        url: require("../../assets/icons/toolbar/10.png")
                    },
                    {
                        value: "(#arrow8)",
                        label: "8",
                        url: require("../../assets/icons/toolbar/8.png")
                    },
                ],
                startImg:require('../../assets/icons/toolbar/11.png'),
                endImg:require('../../assets/icons/toolbar/12.png'),
                markerStart:"url(#arrow11)",
                markerEnd:"url(#arrow12)",
                lineType: "直线",
                lineSize: "3px",
                lineStyle: "solid",
                lineStartPoint:"",
                lineEndPoint:"",
                style: "",
                type: "",
                imageUrl: '',
                token: {},
                // 七牛云的上传地址,华东区
                domain: 'upload.qiniup.com',
                // 这是七牛云空间的外链默认域名
                qiniuaddr: 'q92yn5po6.bkt.clouddn.com',
                modifyFN:false
            };
        },
        computed: {
            linePro() {
                return this.$store.state.lineEditId;
            },
            modifyFileName(){
                return this.fileName;
            }
        },
        watch: {
            $router(to, from) {
                console.log("_____________________________________")
                console.log(to);
                console.log(from);
                console.log("_____________________________________")
                /*
                if(from.path=="/designer"){
                    this.uploadFile();
                }
                */
            },
            linePro: function () {
                this.lcolor = this.$store.state.lineColor;
                this.lineType = this.$store.state.lineType;
                var style;
                switch (this.$store.state.lineStyle) {
                    case "0,0": {
                        style = "solid"
                        break
                    }
                    case "10,10": {
                        style = "dashed"
                        break
                    }
                    case "1,1": {
                        style = "dot"
                        break
                    }
                    case "20,10,5,10": {
                        style = "dashdot"
                        break
                    }
                }
                this.lineStyle = style;
                this.lineSize = this.$store.state.lineSize
                this.MarkerStart=this.$store.state.markerStart
                this.MarkerEnd=this.$store.state.markerEnd
                var sp=this.$store.state.markerStart.substr(10);
                if(sp.length==2){
                    sp=sp.substr(0,1);
                }else{
                    sp=sp.substr(0,2);
                }
                var ep=this.$store.state.markerEnd.substr(10);
                if(ep.length==2){
                    ep=ep.substr(0,1);
                }else{
                    ep=ep.substr(0,2);
                }
                this.startImg = require('../../assets/icons/toolbar/'+sp+'.png');
                this.endImg= require('../../assets/icons/toolbar/'+ep+'.png');
                console.log(this.lcolor)
                console.log(this.lineType)
                console.log(this.lineSize)
                console.log(this.lineStyle)
            },
            modifyFileName:function(){
                if(this.oldFileName!=this.fileName){
                    this.modifyFN=true;
                }
            },
            deep: true //对象内部属性的监听，关键。
        },
        mounted() {
            this.fileName=this.$store.state.UML.UMLName;
            this.oldFileName=this.fileName;
            this.modifyFN=false;
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
            this.$store.commit("setLineType", {
                lineType: "straight"
            });
            this.$store.commit("setMarkerEnd", {
                ep: "url(#arrow12)"
            });
            this.$store.commit("setLineEA", {
                endPoint: require('../../assets/icons/toolbar/12.png')
            });
            this.$store.commit("setMarkerStart", {
                sp: "url(#arrow11)"
            });
            this.$store.commit("setLineSA", {
                startPoint: require('../../assets/icons/toolbar/11.png')
            });
            this.$store.commit("setDrawLine", {drawLine: false});
            console.log(this.$store.state)
        },
        methods: {
            backToPerson() {
                //alert("PersonalPage")
                this.$router.push({name: "PersonalPage"});
            },
            deleteFile() {
                //alert("删除文件")
                var self = this;
                var gid=parseInt(self.$store.state.UML.groupId)
                var userId = parseInt(self.$store.state.UML.userId)
                var fid = parseInt(self.$store.state.UML.UMLId)
                if (gid <= 0) {
                    this.$axios
                        .get("/delFile", {
                            params: {
                                uid: userId,
                                fid: fid
                            }
                        })
                        .then(function(response) {
                            console.log("del file res1:", response.data);
                            if (response.data) {
                                self.$message({
                                    message: "删除成功！",
                                    type: "success"
                                });
                                self.$router.push({ name: "PersonalPage" });
                            } else {
                                self.$message({
                                    message: "出现错误！",
                                    type: "error"
                                });
                            }
                        })
                        .catch(function(error) {
                            console.log("error:", error);
                        });
                } else {
                    this.$axios
                        .get("/deleteFileByGroup", {
                            params: {
                                gid: gid,
                                fid: fid
                            }
                        })
                        .then(function(response) {
                            console.log("del file res2:", response.data);
                            if (response.data) {
                                self.$message({
                                    message: "删除成功！",
                                    type: "success"
                                });
                                self.$router.push({ name: "PersonalPage" });
                            } else {
                                self.$message({
                                    message: "出现错误！",
                                    type: "error"
                                });
                            }
                        })
                        .catch(function(error) {
                            console.log("error:", error);
                        });
                }
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
                    var line
                    for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                        if (
                            this.$store.state.UML.lines[i].Id ==
                            this.$store.state.lineEditId
                        ) {
                            line = this.$store.state.UML.lines[i];
                            console.log(line);
                        }
                    }
                    var style = {
                        stroke: this.lcolor,
                        strokeDasharray: line.lineStyle.strokeDasharray, //虚线之类的
                        strokeWidth: line.lineStyle.strokeWidth,//固定几种
                        fill: "none"
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
                    var line
                    for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                        if (
                            this.$store.state.UML.lines[i].Id ==
                            this.$store.state.lineEditId
                        ) {
                            line = this.$store.state.UML.lines[i];
                            console.log(line);
                        }
                    }
                    var style1 = {
                        stroke: line.lineStyle.stroke,
                        strokeDasharray: style, //虚线之类的
                        strokeWidth: line.lineStyle.strokeWidth, //固定几种
                        fill: "none"
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
                    var line
                    for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                        if (
                            this.$store.state.UML.lines[i].Id ==
                            this.$store.state.lineEditId
                        ) {
                            line = this.$store.state.UML.lines[i];
                            console.log(line);
                        }
                    }
                    var style = {
                        stroke: line.lineStyle.stroke,
                        strokeDasharray: line.lineStyle.strokeDasharray, //虚线之类的
                        strokeWidth: this.lineSize, //固定几种
                        fill: "none"
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
            linetype(lineType) {
                console.log("lineType：" + lineType)
                if (this.$store.state.lineEditId != "") {
                    console.log("linestyle" + this.style);
                    console.log("lineid" + this.$store.state.lineEditId);
                    var line
                    for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                        if (
                            this.$store.state.UML.lines[i].Id ==
                            this.$store.state.lineEditId
                        ) {
                            line = this.$store.state.UML.lines[i];
                            console.log(line);
                        }
                    }
                    var x1, y1, x2, y2
                    var lineStartX = line.startPosition.left
                    var lineStartY = line.startPosition.top
                    var lineEndX = line.endPosition.left
                    var lineEndY = line.endPosition.top
                    var linePath
                    if (lineType == "orthogonal") {
                        x1 = lineStartX
                        x2 = lineEndX
                        y1 = (lineStartY + lineEndY) / 2
                        y2 = y1
                        linePath = "M" + lineStartX + " " + lineStartY + " L " + x1 + " " + y1 + " L " + x2 + " " + y2 + " L " + lineEndX + " " + lineEndY
                    }
                    if (lineType == "straight") {
                        linePath = "M" + lineStartX + " " + lineStartY + " L " + lineEndX + " " + lineEndY

                    }
                    if (lineType == "curve") {
                        //@TODO
                        var x1, y1, x2, y2
                        x1 = lineStartX
                        x2 = lineEndX
                        y1 = (lineStartY + lineEndY) / 2
                        y2 = y1
                        linePath = "M" + lineStartX + " " + lineStartY + " C " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + lineEndX + " " + lineEndY
                        console.log("linePath:" + linePath)
                    }
                    line.linePath = linePath
                    line.relationType = lineType
                    this.$store.dispatch("modifyLine", {
                        lineKey: "relationType",
                        key: "",
                        value: lineType,
                        id: this.$store.state.lineEditId,
                        Line: line,
                        lineStyle: line.lineStyle
                    });

                    this.$store.dispatch("modifyLine", {
                        lineKey: "linePath",
                        key: "",
                        value: linePath,
                        id: this.$store.state.lineEditId,
                        Line: line,
                        lineStyle: line.lineStyle
                    });
                }
                this.$store.commit("setLineType", {
                    lineType: lineType
                });
            },
            startPoint(startPoint){
                console.log("startPoint:"+startPoint);
                var sp=startPoint.substr(7);
                if(sp.length==2){
                    sp=sp.substr(0,1);
                }else{
                    sp=sp.substr(0,2);
                }
                //console.log("startPoint")
                if (this.$store.state.lineEditId != "") {
                    console.log("lineid" + this.$store.state.lineEditId);
                    console.log(this.$store.state.UML.lines);
                    var line
                    for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                        if (
                            this.$store.state.UML.lines[i].Id ==
                            this.$store.state.lineEditId
                        ) {
                            line = this.$store.state.UML.lines[i];
                            console.log(line);
                        }
                    }
                    var style = {
                        stroke: line.lineStyle.stroke,
                        strokeDasharray: line.lineStyle.strokeDasharray, //虚线之类的
                        strokeWidth: line.lineStyle.strokeWidth,//固定几种
                        fill: "none"
                    };
                    line.markerstart="url"+startPoint;
                    console.log(line);
                    this.$store.dispatch("modifyLine", {
                        lineKey: "markerstart",
                        key: "",
                        value: "url"+startPoint,
                        id: this.$store.state.lineEditId,
                        Line: line,
                        lineStyle: style
                    });
                    console.log(this.$store.state.UML.lines);
                }
                this.$store.commit("setMarkerStart", {
                    sp: "url"+startPoint
                });
                this.$store.commit("setLineSA", {
                    endPoint: require('../../assets/icons/toolbar/'+sp+'.png')
                });
                console.log("this.$store.state.endPoint:"+this.$store.state.endPoint)
                console.log("this.$store.state.startPoint:"+this.$store.state.markerStart)
                this.startImg=require('../../assets/icons/toolbar/'+sp+'.png');
            },
            endPoint(endPoint){
                var ep=endPoint.substr(7);
                if(ep.length==2){
                    ep=ep.substr(0,1);
                }else{
                    ep=ep.substr(0,2);
                }
                console.log("endPoint")
                if (this.$store.state.lineEditId != "") {
                    console.log("lineid" + this.$store.state.lineEditId);
                    console.log(this.$store.state.UML.lines);
                    var line
                    for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                        if (
                            this.$store.state.UML.lines[i].Id ==
                            this.$store.state.lineEditId
                        ) {
                            line = this.$store.state.UML.lines[i];
                            console.log(line);
                        }
                    }
                    var style = {
                        stroke: line.lineStyle.stroke,
                        strokeDasharray: line.lineStyle.strokeDasharray, //虚线之类的
                        strokeWidth: line.lineStyle.strokeWidth,//固定几种
                        fill: "none"
                    };
                    line.markerend="url"+endPoint;
                    console.log(line);
                    this.$store.dispatch("modifyLine", {
                        lineKey: "markerend",
                        key: "",
                        value: "url"+endPoint,
                        id: this.$store.state.lineEditId,
                        Line: line,
                        lineStyle: style
                    });
                    console.log(this.$store.state.UML.lines);
                }
                this.$store.commit("setMarkerEnd", {
                    ep: "url"+endPoint
                });
                this.$store.commit("setLineEA", {
                    endPoint: require('../../assets/icons/toolbar/'+ep+'.png')
                });
                console.log("this.$store.state.endPoint:"+this.$store.state.endPoint)
                console.log("this.$store.state.endPoint:"+this.$store.state.markerEnd)
                this.endImg=require('../../assets/icons/toolbar/'+ep+'.png');
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
            checkFileName(){
                if(this.fileName==""){
                    this.$message({
                        message: "文件名不能为空",
                        type: "fail"
                    });
                }else{
                    this.oldFileName=this.fileName
                    this.$axios
                        .get("/updateFile", {
                            params: {
                                fid: this.$store.state.UML.UMLId,
                                fileName: this.fileName,
                                fileType: this.$store.state.UML.UMLType
                            }
                        })
                        .then(function(response) {
                            this.$store.commit("setUMLName",{
                                name:this.fileName
                            })
                            this.$message({
                                message: "文件名修改成功",
                                type: "success"
                            });
                        })
                        .catch(function(error) {
                            console.log("error:" + error);
                        });
                    this.modifyFN=false;

                    console.log("checkFileName")
                }
            },
            closeFileName(){
                this.fileName=this.oldFileName
                this.modifyFN=false
                console.log("closeFileName")
            }
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