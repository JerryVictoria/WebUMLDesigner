<template>
    <div id="diagramCanvas">
        <div
                id="visualEditor"
                @dragstart.stop="handleDragStart"
                @dragend.stop="handleDragEnd"
                @dragenter.stop="handleDragEnter"
                @dragover.stop="handleDragOver"
                @click="clickOutSide"
                @mouseenter.stop="mouseEnter"
                @mouseleave.stop="mouseLeave"
                @mousedown.stop="mouseDown"
        >
            <div id="canvas1">
                <div
                        v-for="item in $store.state.UML.nodes"
                        :key="item.id"
                        :id="item.id"
                        @contextmenu.prevent="showContextMenu(item.id, $event)"
                        style="z-index: 1"
                >
                    <Resizer
                            :key="item.id"
                            :id="item.id"
                            :style="{
                        left: item.styles.left + 'px',
                        top: item.styles.top + 'px',
                        zIndex:2
                    }"
                    >
                        <component :is="item.type" v-bind="item" :ref="item.id"></component>
                    </Resizer>
                </div>
                <svg id="svg" xmlns="http://www.w3.org/2000/svg"
                     version="1.1">
                    <!--
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        v-for="line in $store.state.UML.lines"
                        :key="line.lineId"
                        :style="line.lineSvgStyle"
                        :id="line.svgId"
                    >

                        <path
                            :d="line.linePath"
                            :style="line.lineStyle"
                            :id="line.lineId"
                            :marker-end="line.markerend"
                            :marker-start="line.markerstart"
                            v-clickoutside="clic(line.lineId)"
                            @click.stop="editline(line.Id)"
                            @contextmenu.prevent="showContextMenu(line.lineId, $event)"
                        />

                    </svg>
                -->
                    <defs>
                        <marker
                                id="arrow1"
                                markerUnits="strokeWidth"
                                markerHeight="11"
                                markerWidth="11"
                                viewBox="0 0 12 12"
                                refX="6"
                                refY="6"
                                orient="auto"
                        >
                            <path d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill:#000000"/>
                        </marker>
                        <marker
                                id="arrow2"
                                markerUnits="strokeWidth"
                                markerHeight="11"
                                markerWidth="11"
                                viewBox="0 0 12 12"
                                refX="6"
                                refY="6"
                                orient="auto"
                        >
                            <path d="M2,6 L10,2 L6,6 L10,10 L2,6" style="fill:#000000"/>
                        </marker>
                        <filter id="drop-shadow">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="2.2"/>
                            <feOffset dx="1" dy="12" result="offsetblur"/>
                            <feFlood flood-color="rgba(0,0,0,0.5)"/>
                            <feComposite in2="offsetblur" operator="in"/>
                            <feMerge>
                                <feMergeNode/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <path
                            v-for="line in $store.state.UML.lines"
                            :key="line.lineId"
                            :d="line.linePath"
                            :style="line.lineStyle"
                            :id="line.lineId"
                            :marker-end="line.markerend"
                            :marker-start="line.markerstart"
                            v-clickoutside="clic(line.lineId)"
                            @click.stop="editline(line.Id)"
                            @contextmenu.prevent="showContextMenu(line.lineId, $event)"
                    />
                </svg>
            </div>
        </div>
        <ContextMenu v-show="showMenu" style="zIndex:2" id="menu" @hide-menu="clickOutSide"></ContextMenu>
    </div>
</template>

<script>
    import Class from "../../components/classdiagram/Class.vue";
    import Interface from "../../components/classdiagram/Interface.vue";
    import Constraint from "../../components/classdiagram/Constraint.vue";

    import Character from "../../components/usecasediagram/Character.vue";
    import Container from "../../components/usecasediagram/Container.vue";
    import UseCase from "../../components/usecasediagram/UseCase.vue";

    import LifeLine from "../../components/sequencediagram/LifeLine.vue";
    import Activation from "../../components/sequencediagram/Activation.vue";
    import Delete from "../../components/sequencediagram/Delete.vue";

    import Start from "../../components/statediagram/Start.vue";
    import End from "../../components/statediagram/End.vue";
    import Object from "../../components/statediagram/Object.vue";
    import State from "../../components/statediagram/State.vue";
    import StreamEnd from "../../components/statediagram/StreamEnd.vue";
    import History from "../../components/statediagram/History.vue";
    import DetailedHistory from "../../components/statediagram/DetailedHistory.vue";
    import MsgSender from "../../components/statediagram/MsgSender.vue";
    import MsgReceiver from "../../components/statediagram/MsgReceiver.vue";
    import Fork from "../../components/statediagram/Fork.vue";
    import Synchronizer from "../../components/statediagram/Synchronizer.vue";
    import VerticalLane from "../../components/statediagram/VerticalLane.vue";
    import HorizontalLane from "../../components/statediagram/HorizontalLane.vue";

    import DiagramComponent from "../../components/deploymentdiagram/DiagramComponent.vue";
    import Node from "../../components/deploymentdiagram/Node.vue";

    import ComponentInterface from "../../components/componentdiagram/ComponentInterface.vue";

    import Entity from "../../components/erdiagram/Entity.vue";
    import Attribute from "../../components/erdiagram/Attribute.vue";
    import Relationship from "../../components/erdiagram/Relationship.vue";

    import Package from "../../components/universalcomponents/Package.vue";
    import Comment from "../../components/universalcomponents/Comment.vue";
    import Composition from "../../components/universalcomponents/Composition.vue";

    import Resizer from "../../components/Resizer.vue";
    import ContextMenu from "../../components/ContextMenu.vue";
    import $ from "jquery";

    export default {
        name: "DiagramCanvas",
        props: {
            minLeft: {
                type: Number,
                default: 320
            },
            minTop: {
                type: Number,
                default: 70
            }
        },
        components: {
            Class,
            Interface,
            Constraint,
            Character,
            Container,
            UseCase,
            LifeLine,
            Activation,
            Delete,
            Start,
            End,
            Object,
            State,
            StreamEnd,
            History,
            DetailedHistory,
            MsgSender,
            MsgReceiver,
            Fork,
            Synchronizer,
            VerticalLane,
            HorizontalLane,
            DiagramComponent,
            Node,
            ComponentInterface,
            Entity,
            Attribute,
            Relationship,
            Package,
            Comment,
            Composition,
            Resizer,
            ContextMenu
        },
        data() {
            return {
                cursorToLeft: 0, //拖动的鼠标位置距离父div的距离
                cursorToTop: 0,
                showMenu: false,
                mousedown: false,
                //ghost: null //拖拽的虚影（如果使用原生的虚影，在组件重叠的情况下，会有多余图像）
                EStartX: 0,
                EStartY: 0,
                eStartW: 0,
                eStartH: 0,
                eStartX: 0,
                eStartY: 0,
                eEndX: 0,
                eEndY: 0,
                eEndW: 0,
                eEndH: 0,
                lineStartX: 0,
                lineStartY: 0,
                lineEndX: 0,
                lineEndY: 0,
                linenumber: 0,
                lineType: "",
                lineText: "",
                From: "",
                To: "",
                lineStartA: "",
                lineStartD: "",
                lineEndA: "",
                lineEndD: "",
                svgLeft: 0,
                svgTop: 0,
                svgWid: 0,
                svgHei: 0,
                fromlist: [],
                tolist: [],
                lineList: [],
                linePath: "",
                lineType: this.$store.state.lineType,
                lineStyle: this.$store.state.lineStyle,
                lineColor: this.$store.state.lineColor,
                lineSize: this.$store.state.lineSize,
            };
        },
        mounted() {
            var self = this;
            /*
            this.$axios
                .get("/getAllLineByFid", { params: { fid: self.fid } })
                .then(function(response) {
                    console.log("getAllLineByFid");
                    console.log(response.data);
                    self.$store.commit("setUMLLines", {
                        lineList: response.data
                    });
                    console.log(self.$store.state.UML.lines);
                })
                .catch(function(error) {
                    console.log("error:", error);
                });
            this.$axios
                .get("/getAllNodeByFid", { params: { fid: self.fid } })
                .then(function(response) {
                    console.log(response.data);
                    self.$store.commit("setUMLNodes", {
                        nodeList: response.data
                    });
                    self.$store.commit("setGroupId", { groupId: self.gid });
                    self.$store.commit("setUMLId", { id: self.fid });
                    self.$store.commit("setUMLType", {
                        type: self.fileType
                    });
                    if (self.gid > 0) {
                        self.$store.dispatch("openGroupEditMode");
                    }
                })
                .catch(function(error) {
                    console.log("error:", error);
                });
                */
        },
        methods: {
            showContextMenu(id, event) {
                console.log(id);
                var menu = $("#menu");
                this.showMenu = true;
                menu.css("left", event.clientX);
                menu.css("top", event.clientY);
                menu.css("position", "fixed");
                console.log("showContextMenu");
                this.showMenu = true;
                if ((id + "").substring(0, 1) == "l") {
                    console.log("line:" + id);
                    this.$store.commit("setLineEditId", {id: id});
                } else {
                    console.log("node:" + id);
                    this.$store.commit("setEditId", {id: id});
                }
            },
            clickOutSide() {
                if(this.$store.state.lineEditId==""){
                    this.lineType=this.$store.state.lineType;
                    this.lineStyle=this.$store.state.lineStyle;
                    this.lineColor=this.$store.state.lineColor;
                    this.lineSize=this.$store.state.lineSize;
                }
                console.log("clickOutSide");
                this.$store.commit("setEditState", {editing: false});
                this.$store.commit("setEditId", {id: ""});
                this.$store.commit("setLineEditState", {lineEditing: false});
                this.$store.commit("setLineEditId", {id: ""});
                this.showMenu = false;
                const treeElem = document.getElementById("canvas1");
                const svgElem = treeElem.querySelectorAll("path");
                console.log(svgElem);
                svgElem.forEach(node => {
                    //console.log(node.childNodes[1].id);
                    node.style.filter = "";
                });
                this.$store.state.lineType=this.lineType
                this.$store.state.lineStyle=this.lineStyle
                this.$store.state.lineColor=this.lineColor
                this.$store.state.lineSize=this.lineSize
            },
            handleDragStart(event) {
                console.log("handleDragStart");
                //拖拽UML节点
                if (this.$store.state.editingId != "") {
                    console.log("handleDragStartid");
                    this.$store.state.canvasdrage = true;
                    event.dataTransfer.effectAllowed = "copyMove";
                    let resizer = $(event.target);
                    /*
                        console.log("resizer.offset().left:"+resizer.offset().left);
                        console.log("resizer.offset().top:"+resizer.offset().top);
                        console.log("event.clientX:"+event.clientX);
                        console.log("event.clientY:"+event.clientY);
                        */
                    this.cursorToLeft = event.clientX - resizer.offset().left;
                    this.cursorToTop = event.clientY - resizer.offset().top;
                    console.log(this.cursorToLeft, this.cursorToTop);
                    /* this.ghost = resizer.clone()[0];
                        this.ghost.style.position = "absolute";
                        this.ghost.style.left = "-2000px";
                        this.ghost.style.top = "0px";
                        document.getElementById("visualEditor").appendChild(this.ghost);
                        //console.log(this.ghost);
                        //这个方法和电脑的缩放比例还有点关系，之后最好修改
                        event.dataTransfer.setDragImage(
                            this.ghost,
                            this.cursorToLeft,
                            this.cursorToTop
                        ); */
                    event.dataTransfer.setDragImage(resizer.clone()[0], 0, 0);
                    for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                        //console.log(this.$store.state.UML.lines[i].from)
                        //console.log(this.$store.state.UML.lines[i].to)
                        if (
                            parseInt(this.$store.state.UML.lines[i].from) ==
                            this.$store.state.editingId
                        ) {
                            this.fromlist.push(this.$store.state.UML.lines[i]);
                        }
                        if (
                            parseInt(this.$store.state.UML.lines[i].to) ==
                            this.$store.state.editingId
                        ) {
                            this.tolist.push(this.$store.state.UML.lines[i]);
                        }
                    }
                }
            },
            handleDragEnd(event) {
                console.log("handleDragEnd");
                if (this.$store.state.canvasdrage) {
                    console.log(
                        "handleDragEnd:" +
                        this.cursorToLeft +
                        "  " +
                        this.cursorToTop
                    );
                    console.log(event.clientX - this.cursorToLeft);
                    console.log(event.clientY - this.cursorToTop);
                    //更新图数据（vue数据驱动图像变化）
                    this.$store.dispatch("modifyNode", {
                        nodeKey: "styles",
                        key: "left",
                        value: Math.max(
                            event.clientX - this.cursorToLeft,
                            this.minLeft
                        ),
                        id: this.$store.state.editingId
                    });
                    this.$store.dispatch("modifyNode", {
                        nodeKey: "styles",
                        key: "top",
                        value: Math.max(
                            event.clientY - this.cursorToTop,
                            this.minTop
                        ),
                        id: this.$store.state.editingId
                    });
                    //console.log(this.lineList)
                    for (var i = 0; i < this.lineList.length; i++) {
                        console.log(this.lineList[i]);
                        this.$store.dispatch("modifyLine", {
                            lineKey: "startPosition",
                            key: "",
                            value: this.lineList[i].startPosition,
                            id: this.lineList[i].Id,
                            Line: this.lineList[i],
                            lineStyle: this.lineList[i].lineStyle
                        });
                        this.$store.dispatch("modifyLine", {
                            lineKey: "endPosition",
                            key: "",
                            value: this.lineList[i].endPosition,
                            id: this.lineList[i].Id,
                            Line: this.lineList[i],
                            lineStyle: this.lineList[i].lineStyle
                        });
                        this.$store.dispatch("modifyLine", {
                            lineKey: "linePath",
                            key: "",
                            value: this.lineList[i].linePath,
                            id: this.lineList[i].Id,
                            Line: this.lineList[i],
                            lineStyle: this.lineList[i].lineStyle
                        });
                    }
                    this.cursorToLeft = 0;
                    this.cursorToTop = 0;
                    /* if (this.ghost) {
                            document.getElementById("visualEditor").removeChild(this.ghost);
                            this.ghost = null;
                        } */
                    this.fromlist = [];
                    this.tolist = [];
                    this.lineList = [];
                    this.clickOutSide();
                }
            },
            handleDragEnter(event) {
                console.log("handleDragEnter");
                if (this.$store.state.canvasdrage) {
                    console.log("handleDragEnter");
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "copy";
                }
            },
            handleDragOver(event) {
                //console.log("handleDragOver");
                if (this.$store.state.canvasdrage) {
                    var canv = document.getElementById("canvas");
                    console.log("handleDragOver");
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "copy";
                    this.$store.commit("moveNode", {
                        left: Math.max(
                            event.clientX - this.cursorToLeft,
                            this.minLeft
                        ),
                        top: Math.max(
                            event.clientY - this.cursorToTop,
                            this.minTop
                        ),
                        id: this.$store.state.editingId
                    });
                    this.lineList = [];
                    for (var i = 0; i < this.fromlist.length; i++) {
                        console.log(this.fromlist[i]);
                        this.moveLine(
                            this.fromlist[i].from,
                            this.fromlist[i].to,
                            this.fromlist[i].lineStyle.strokeWidth,
                            this.fromlist[i].Id,
                            this.fromlist[i].relationType
                        );
                    }
                    for (var j = 0; j < this.tolist.length; j++) {
                        console.log(this.tolist[j]);
                        this.moveLine(
                            this.tolist[j].from,
                            this.tolist[j].to,
                            this.tolist[j].lineStyle.strokeWidth,
                            this.tolist[j].Id,
                            this.tolist[j].relationType
                        );
                    }
                }
            },
            //@TODO 删除栏showMenu变为false
            changeshowMenu() {
                console.log("changeshowMenu");
                this.showMenu = false;
                console.log(this.showMenu);
            },
            editline(item) {
                console.log("editline" + item);
                if(this.$store.state.lineEditId==""){
                    this.lineType=this.$store.state.lineType
                    this.lineStyle=this.$store.state.lineStyle
                    this.lineColor=this.$store.state.lineColor
                    this.lineSize=this.$store.state.lineSize
                }
                this.$store.commit("setLineEditState", {lineEditing: true});
                this.$store.commit("setLineEditId", {id: item});
                //console.log(this.$store.state.editingId);
                //console.log(this.$store.state.lineEditId);
                var line = document.getElementById("line" + item);
                const treeElem = document.getElementById("canvas1");
                const svgElem = treeElem.querySelectorAll("path");
                //console.log(svgElem);
                svgElem.forEach(node => {
                    if (node.id == "line" + item) {
                        node.style.filter = "url(#drop-shadow)";
                    } else {
                        node.style.filter = "";
                    }
                });
                //顶部工具栏显示该线条的样式
                for(var i=0;i<this.$store.state.UML.lines.length;i++){
                    if(this.$store.state.UML.lines[i].lineId==("line" + item)){
                        console.log(this.$store.state.UML.lines[i])
                        var type,style,color,size;
                        type=this.$store.state.UML.lines[i].relationType
                        style=this.$store.state.UML.lines[i].lineStyle.strokeDasharray
                        color=this.$store.state.UML.lines[i].lineStyle.stroke
                        size=this.$store.state.UML.lines[i].lineStyle.strokeWidth
                        this.$store.commit("setLinePro",{
                            type:type,
                            style:style,
                            color:color,
                            size:size
                        })
                        //console.log(this.$store.state)
                    }
                }
            },
            mouseEnter() {
                if (this.$store.state.drawLine) {
                    var cav1 = document.getElementById("visualEditor");
                    cav1.style.cursor = "crosshair";
                }
            },
            mouseLeave() {
                if (this.$store.state.drawLine) {
                    console.log("鼠标箭头还原");
                    document.getElementById("visualEditor").style.cursor =
                        "default";
                }
            },
            mouseUp(event) {
                if (
                    this.$store.state.drawLine &&
                    this.mousedown &&
                    this.$store.state.editingId == ""
                ) {
                    //console.log("lineUp:"+this.$store.state.drawLine+":"+this.$store.state.editingId);
                    var e = {
                        x: event.clientX,
                        y: event.clientY
                    };
                    var left = 0,
                        top = 0,
                        right = 0,
                        bottom = 0,
                        x = 0,
                        y = 0;
                    var target = event.target;
                    var target1 = target;
                    while (target.getAttribute("id") == null) {
                        console.log(target.getAttribute("id"));
                        target = target.parentNode;
                        if (
                            target.getAttribute("id") == "visualEditor" ||
                            target.getAttribute("id") == "svg"
                        ) {
                            break;
                        }
                    }
                    console.log(target);
                    var targetId = target.getAttribute("id");
                    if (
                        target.getAttribute("id") != "visualEditor" &&
                        target.getAttribute("id") != "svg"
                    ) {
                        x = $(target1).offset().left;
                        y = $(target1).offset().top;
                        left = this.$refs[targetId + ""][0].getLineLeftPosition();
                        right = this.$refs[targetId + ""][0].getLineRightPosition();
                        top = this.$refs[targetId + ""][0].getLineTopPosition();
                        bottom = this.$refs[
                        targetId + ""
                            ][0].getLineBottomPosition();
                        this.To = targetId + "";
                        this.eEndX = x;
                        this.eEndY = y;
                        this.eEndW = right[0].x;
                        this.eEndH = right[0].y * 2;
                        //八种情况:上(3)、下(3)、中(2)
                        this.judgeAndGetPosition();
                    }
                    document.getElementById("svg").removeChild(document.getElementById("line" + this.linenumber));
                    if (this.$store.state.lineType == "straight") {
                        this.linePath =
                            "M" +
                            this.lineStartX +
                            " " +
                            this.lineStartY +
                            " L " +
                            this.lineEndX +
                            " " +
                            this.lineEndY;
                    }
                    if (this.$store.state.lineType == "orthogonal") {
                        var x1, y1, x2, y2;
                        if (this.svgWid > this.svgHei) {
                            x1 = (this.lineStartX + this.lineEndX) / 2;
                            x2 = x1;
                            y1 = this.lineStartY;
                            y2 = this.lineEndY;
                        } else {
                            x1 = this.lineStartX;
                            x2 = this.lineEndX;
                            y1 = (this.lineStartY + this.lineEndY) / 2;
                            y2 = y1;
                        }
                        this.linePath =
                            "M" +
                            this.lineStartX +
                            " " +
                            this.lineStartY +
                            " L " +
                            x1 +
                            " " +
                            y1 +
                            " L " +
                            x2 +
                            " " +
                            y2 +
                            " L " +
                            this.lineEndX +
                            " " +
                            this.lineEndY;
                    }
                    if (this.$store.state.lineType == "curve") {
                        var x1, y1, x2, y2;
                        x1 = (this.lineStartX + this.lineEndX) / 2;
                        x2 = x1;
                        y1 = this.lineStartY;
                        y2 = this.lineEndY;
                        this.linePath =
                            "M" +
                            this.lineStartX +
                            " " +
                            this.lineStartY +
                            " C " +
                            x1 +
                            " " +
                            y1 +
                            " " +
                            x2 +
                            " " +
                            y2 +
                            " " +
                            this.lineEndX +
                            " " +
                            this.lineEndY;
                        console.log("linePath:" + this.linePath);
                    }
                    this.mousedown = false;
                    this.$store.commit("setDrawLine", {drawLine: false});
                    //console.log("mouseUp");
                    //console.log("鼠标箭头还原");
                    document.getElementById("visualEditor").style.cursor =
                        "default";
                    var newline = {
                        Id: this.linenumber + "",
                        lid: 0,
                        lineId: "line" + this.linenumber,
                        relationType: this.$store.state.lineType,
                        from: this.From,
                        to: this.To,
                        text: this.lineText,
                        markerend: "url(#arrow1)",
                        markerstart: "url(#arrow2)",
                        linePath: this.linePath,
                        startPosition: {
                            left: this.lineStartX,
                            top: this.lineStartY,
                            //arrow:this.lineStartA,
                            direction: this.lineStartD
                        },
                        endPosition: {
                            left: this.lineEndX,
                            top: this.lineEndY,
                            //arrow:this.lineEndA,
                            direction: this.lineEndD
                        },
                        lineStyle: {
                            stroke: this.$store.state.lineColor,
                            strokeDasharray: this.$store.state.lineStyle,
                            strokeWidth: this.$store.state.lineSize,
                            fill: "none"
                        },
                    };
                    console.log(newline);
                    //this.$store.commit("addLine", newline);
                    this.$store.dispatch("addLine", newline);
                    //console.log(this.$store.state.UML.lines);
                    this.lineStartX = 0;
                    this.lineStartY = 0;
                    this.lineEndX = 0;
                    this.lineEndY = 0;
                    this.mousedown = false
                    document.body.removeEventListener("mousemove", this.drawLine);
                    document.body.removeEventListener("mouseup", this.mouseUp);
                }
                this.clickOutSide();
            },
            mouseDown(event) {
                if (
                    this.$store.state.drawLine &&
                    this.$store.state.editingId == ""
                ) {
                    var e = {
                        x: event.clientX,
                        y: event.clientY
                    };
                    var left = 0,
                        top = 0,
                        right = 0,
                        bottom = 0,
                        x = 0,
                        y = 0;
                    var target = event.target;
                    var target1 = target;
                    while (target.getAttribute("id") == null) {
                        console.log(target.getAttribute("id"));
                        target = target.parentNode;
                        if (
                            target.getAttribute("id") == "visualEditor" ||
                            target.getAttribute("id") == "svg"
                        ) {
                            break;
                        }
                    }
                    console.log(target);
                    var targetId = target.getAttribute("id");
                    if (
                        target.getAttribute("id") != "visualEditor" &&
                        target.getAttribute("id") != "svg"
                    ) {
                        //console.log($(target1).offset().top);
                        //console.log($(target1).offset().left);
                        console.log(
                            this.$refs[targetId + ""][0].getLineLeftPosition()
                        );
                        console.log(
                            this.$refs[targetId + ""][0].getLineRightPosition()
                        );
                        console.log(
                            this.$refs[targetId + ""][0].getLineTopPosition()
                        );
                        console.log(
                            this.$refs[targetId + ""][0].getLineBottomPosition()
                        );
                        x = $(target1).offset().left;
                        y = $(target1).offset().top;
                        left = this.$refs[targetId + ""][0].getLineLeftPosition();
                        right = this.$refs[targetId + ""][0].getLineRightPosition();
                        top = this.$refs[targetId + ""][0].getLineTopPosition();
                        bottom = this.$refs[
                        targetId + ""
                            ][0].getLineBottomPosition();
                        this.From = targetId + "";
                        this.eStartW = right[0].x;
                        this.eStartH = bottom[0].y;
                        console.log();
                        this.eStartX = x;
                        this.eStartY = y;
                    }
                    document.body.addEventListener("mousemove", this.drawLine);
                    //console.log (document.getElementById("visualEditor"));
                    this.mousedown = true;
                    //console.log("linedown");
                    var cav1 = document.getElementById("canvas1");
                    var svg = document.getElementById("svg");
                    var c = {
                        x: cav1.offsetLeft,
                        y: cav1.offsetTop
                    };
                    //console.log(c.x);
                    //console.log(c.y);
                    this.EStartX = e.x - c.x;
                    this.EStartY = e.y - c.y;
                    this.linenumber = this.$store.state.UML.lines.length + 1;
                    /*console.log("Estartx:"+this.EStartX);
                    console.log("Estarty:"+this.EStartY);
                    var svg = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg"
                    );
                    svg.id = "svg" + this.linenumber;
                    svg.position = "absolute";
                    */
                    var line = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );
                    line.id = "line" + this.linenumber;
                    /*
                   var def = document.createElementNS(
                       "http://www.w3.org/2000/svg",
                       "def"
                   );
                   var startmarker = document.createElementNS(
                       "http://www.w3.org/2000/svg",
                       "marker"
                   );
                   var startpath = document.createElementNS(
                       "http://www.w3.org/2000/svg",
                       "path"
                   );
                   var endmarker = document.createElementNS(
                       "http://www.w3.org/2000/svg",
                       "marker"
                   );
                   var endpath = document.createElementNS(
                       "http://www.w3.org/2000/svg",
                       "path"
                   );

                   startpath.setAttribute("d", "M2,6 L10,2 L6,6 L10,10 L2,6");
                   startpath.setAttribute("style", "fill:#000000");
                   endpath.setAttribute("d", "M2,2 L10,6 L2,10 L6,6 L2,2");
                   endpath.setAttribute("style", "fill:#000000");
                   startmarker.setAttribute("id", "arrow2");
                   startmarker.setAttribute("markerHeight", "11");
                   startmarker.setAttribute("markerWidth", "11");
                   startmarker.setAttribute("viewBox", "0 0 12 12");
                   startmarker.setAttribute("refX", "6");
                   startmarker.setAttribute("refY", "6");
                   startmarker.setAttribute("orient", "auto");
                   endmarker.setAttribute("id", "arrow1");
                   endmarker.setAttribute("markerHeight", "11");
                   endmarker.setAttribute("markerWidth", "11");
                   endmarker.setAttribute("viewBox", "0 0 12 12");
                   endmarker.setAttribute("refX", "6");
                   endmarker.setAttribute("refY", "6");
                   endmarker.setAttribute("orient", "auto");
                   startmarker.append(startpath);
                   endmarker.append(endpath);
                   def.append(startmarker);
                   def.append(endmarker);
                   */
                    svg.appendChild(line);
                    /*
                    svg.appendChild(def);
                    svg.appendChild(line);
                    console.log(svg);
                    */
                }
            },
            //直线
            drawStraight(newline, event) {
                this.linePath =
                    "M" +
                    this.lineStartX +
                    " " +
                    this.lineStartY +
                    " L " +
                    this.lineEndX +
                    " " +
                    this.lineEndY;
                console.log("linePath:" + this.linePath);
                newline.setAttribute("d", this.linePath);
            },
            //折线
            drawOrthogonal(newline, event) {
                var x1, y1, x2, y2;
                if (this.svgWid > this.svgHei) {
                    x1 = (this.lineStartX + this.lineEndX) / 2;
                    x2 = x1;
                    y1 = this.lineStartY;
                    y2 = this.lineEndY;
                } else {
                    x1 = this.lineStartX;
                    x2 = this.lineEndX;
                    y1 = (this.lineStartY + this.lineEndY) / 2;
                    y2 = y1;
                }
                this.linePath =
                    "M" +
                    this.lineStartX +
                    " " +
                    this.lineStartY +
                    " L " +
                    x1 +
                    " " +
                    y1 +
                    " L " +
                    x2 +
                    " " +
                    y2 +
                    " L " +
                    this.lineEndX +
                    " " +
                    this.lineEndY;
                console.log("linePath:" + this.linePath);
                newline.setAttribute("d", this.linePath);
            },
            //曲线
            drawCurve(newline, typeevent) {
                var x1, y1, x2, y2;
                x1 = (this.lineStartX + this.lineEndX) / 2;
                x2 = x1;
                y1 = this.lineStartY;
                y2 = (this.lineStartY + this.lineEndY) / 2;
                this.linePath =
                    "M" +
                    this.lineStartX +
                    " " +
                    this.lineStartY +
                    " C " +
                    x1 +
                    " " +
                    y1 +
                    " " +
                    x2 +
                    " " +
                    y2 +
                    " " +
                    this.lineEndX +
                    " " +
                    this.lineEndY;
                console.log("linePath:" + this.linePath);
                newline.setAttribute("d", this.linePath);
            },
            drawLine(event) {
                //画线
                console.log(this.$store.state.drawLine);
                console.log(this.mousedown);
                console.log(this.$store.state.lineType);
                if (
                    this.$store.state.drawLine &&
                    this.mousedown &&
                    this.$store.state.editingId == ""
                ) {
                    //console.log("linemove")
                    document.body.addEventListener("mouseup", this.mouseUp);
                    var cav1 = document.getElementById("canvas1");
                    var c = {
                        x: cav1.offsetLeft,
                        y: cav1.offsetTop
                    };
                    var e = {
                        x: event.clientX,
                        y: event.clientY
                    };
                    var lineId = "line" + this.linenumber;
                    var newline = document.getElementById(lineId);
                    var type;
                    newline.setAttribute("marker-start", "url(#arrow2");
                    newline.setAttribute("marker-end", "url(#arrow1");
                    newline.setAttribute(
                        "style",
                        "stroke:" +
                        this.$store.state.lineColor +
                        ";stroke-width:" +
                        this.$store.state.lineSize +
                        ";stroke-dasharray:" +
                        this.$store.state.lineStyle +
                        ";zIndex:3;fill:none"
                    );
                    this.lineStartX = this.EStartX
                    this.lineStartY = this.EStartY
                    this.lineEndX = e.x - c.x
                    this.lineEndY = e.y - c.y
                    this.svgWid = this.lineEndX > this.lineStartX ? (this.lineEndX - this.lineStartX) : (this.lineStartX - this.lineEndX)
                    this.svgHei = this.lineEndY > this.lineStartY ? (this.lineEndY - this.lineStartY) : (this.lineStartY - this.lineEndY)
                    console.log("__________________________________")
                    console.log(e)
                    console.log(c)
                    /*
                    //左上
                    //newsvg.style.border = "solid 1px red";
                    if (e.x < this.EStartX && e.y < this.EStartY) {
                        type = "topleft";
                        newsvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                        newsvg.setAttribute("version", "1.1");
                        newsvg.style.width = this.EStartX - e.x + 22;
                        newsvg.style.height = this.EStartY - e.y + 22;
                        //newsvg.style.border = "solid 1px red";
                        newsvg.style.position = "absolute";
                        newsvg.style.left = e.x - 11 + "";
                        newsvg.style.top =
                            e.y + document.documentElement.scrollTop - 11 + "";
                        this.lineStartX = this.EStartX - e.x + 11;
                        this.lineStartY = this.EStartY - e.y + 11;
                        this.lineEndX = 11;
                        this.lineEndY = 11;
                        this.svgLeft = newsvg.style.left;
                        this.svgTop = newsvg.style.top;
                    }
                    //左下
                    if (e.x < this.EStartX && e.y > this.EStartY) {
                        type = "underleft";
                        newsvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                        newsvg.setAttribute("version", "1.1");
                        newsvg.style.width = this.EStartX - e.x + 22;
                        newsvg.style.height = e.y - this.EStartY + 22;
                        newsvg.style.position = "absolute";
                        newsvg.style.left = e.x - 11 + "";
                        newsvg.style.top =
                            this.EStartY +
                            document.documentElement.scrollTop -
                            11 +
                            "";

                        this.lineStartX = this.EStartX - e.x + 11;
                        this.lineStartY = 11;
                        this.lineEndX = 11;
                        this.lineEndY = e.y - this.EStartY + 11;
                        this.svgLeft = newsvg.style.left;
                        this.svgTop = newsvg.style.top;
                    }
                    //右上
                    if (e.x > this.EStartX && e.y < this.EStartY) {
                        type = "topright";
                        newsvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                        newsvg.setAttribute("version", "1.1");
                        newsvg.style.width = e.x - this.EStartX + 22;
                        newsvg.style.height = this.EStartY - e.y + 22;newsvg.style.position = "absolute";
                        newsvg.style.left = this.EStartX - 11 + "";
                        newsvg.style.top =
                            e.y + document.documentElement.scrollTop - 11 + "";
                       this.lineStartX = 11;
                        this.lineStartY = this.EStartY - e.y + 11;
                        this.lineEndX = e.x - this.EStartX + 11;
                        this.lineEndY = 11;
                        this.svgLeft = newsvg.style.left;
                        this.svgTop = newsvg.style.top;
                    }
                    //右下
                    if (e.x > this.EStartX && e.y > this.EStartY) {
                        type = "underright";
                       newsvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                        newsvg.setAttribute("version", "1.1");
                        //newsvg.style.border = "solid 1px red";
                        newsvg.style.width = e.x - this.EStartX + 22;
                        newsvg.style.height = e.y - this.EStartY + 22;
                        newsvg.style.position = "absolute";
                        newsvg.style.left = this.EStartX - 11 + "";
                        newsvg.style.top =
                            this.EStartY +
                            document.documentElement.scrollTop -
                            11 +
                            "";
                        this.lineStartX = 11;
                        this.lineStartY = 11;
                        this.lineEndX = e.x - this.EStartX + 11;
                        this.lineEndY = e.y - this.EStartY + 11;
                        this.svgLeft = newsvg.style.left;
                        this.svgTop = newsvg.style.top;
                    }
                    */
                    if (this.$store.state.lineType == "straight") {
                        this.drawStraight(newline, event);
                    }
                    if (this.$store.state.lineType == "orthogonal") {
                        this.drawOrthogonal(newline, event);
                    }
                    if (this.$store.state.lineType == "curve") {
                        this.drawCurve(newline, type, event);
                    }
                }
            },
            clic(item) {
                console.log(item);
            },
            dataURLToBlob(dataurl) {
                //ie 图片转格式
                var arr = dataurl.split(","),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type: mime});
            },
            //判断两个节点的相对位置
            judgeAndGetPosition() {
                if (this.eEndY + this.eEndH < this.eStartY) {
                    //上
                    this.top()
                    /*
                    if (this.eEndX + this.eEndW < this.eStartX) {
                        this.topLeft();
                    } else {
                        if (this.eEndX > this.eStartX + this.eStartW) {
                            this.topRight();
                        } else {
                            this.topMiddle();
                        }
                    }
                    */
                } else {
                    /*
                        console.log(this.eEndY)
                        console.log(this.eStartY + this.eStartH)
                        console.log(this.eEndY > (this.eStartY + this.eStartH))
                        */
                    if (this.eEndY > this.eStartY + this.eStartH) {
                        //下
                        this.under()
                        /*
                        if (this.eEndX + this.eEndW < this.EStartX) {
                            //下左
                            console.log("下左");
                            this.underLeft();
                        } else {
                            if (this.eEndX > this.eStartX + this.eStartW) {
                                //下右
                                console.log("下右");
                                this.underRight();
                            } else {
                                //下中
                                console.log("下中");
                                this.underMiddle();
                            }
                        }
                        */
                    } else {
                        //中
                        if (this.eEndX + this.eEndW < this.eStartX) {
                            //中左
                            console.log("中左");
                            this.middleLeft();
                        } else {
                            if (this.eEndX > this.eStartX + this.eStartW) {
                                //中右
                                console.log("中右");
                                this.middleRight();
                            } else {
                                console.log("出现重叠");
                            }
                        }
                    }
                }
            },
            top() {
                var cav1 = document.getElementById("canvas1");
                var c = {
                    x: cav1.offsetLeft,
                    y: cav1.offsetTop
                };
                this.lineStartX =
                    this.eStartX +
                    this.eStartW * 0.5 - c.x
                this.lineStartY =
                    this.eStartY - c.y
                this.lineEndX =
                    this.eEndX +
                    this.eEndW * 0.5 - c.x
                this.lineEndY = this.eEndY + this.eEndH - c.y;
            },
            under() {
                var cav1 = document.getElementById("canvas1");
                var c = {
                    x: cav1.offsetLeft,
                    y: cav1.offsetTop
                };
                this.lineStartX =
                    this.eStartX +
                    this.eStartW * 0.5 - c.x
                this.lineStartY =
                    this.eStartY + this.eStartH - c.y
                this.lineEndX =
                    this.eEndX +
                    this.eEndW * 0.5 - c.x
                this.lineEndY = this.eEndY - c.y
            },
            /*左上
            topLeft() {
                console.log("左上");
                this.svgLeft = this.eEndX + this.eEndW;
                this.svgTop = this.eEndY + this.eEndH * 0.5;
                this.svgWid = this.eStartX + this.eStartW * 0.5 - this.svgLeft;
                this.svgHei = this.eStartY - this.svgTop;
                this.lineStartX = parseInt(this.$store.state.lineSize) * 3;
                this.lineStartY = parseInt(this.$store.state.lineSize) * 3;
                this.lineEndX =
                    this.svgWid - parseInt(this.$store.state.lineSize) * 3;
                this.lineEndY =
                    this.svgHei - parseInt(this.$store.state.lineSize) * 3;
                console.log(this.svgLeft);
                console.log(this.svgTop);
            },
            //中上
            topMiddle() {
                console.log("上中");
                if (
                    this.eEndX + this.eEndW * 0.5 <
                    this.eStartX + this.eStartW * 0.5
                ) {
                    //中左
                    console.log("中左");
                    this.svgLeft = this.eEndX;
                    this.svgTop = this.eEndY + this.eEndH;
                    this.svgWid = this.eStartX + this.eStartW - this.svgLeft;
                    this.svgHei = this.eStartY - this.svgTop;
                    this.lineStartX =
                        this.eStartX +
                        this.eStartW * 0.5 +
                        parseInt(this.$store.state.lineSize) * 3 -
                        this.svgLeft;
                    this.lineStartY =
                        this.svgHei - parseInt(this.$store.state.lineSize) * 3;
                    this.lineEndX =
                        this.eEndX +
                        this.eEndW * 0.5 +
                        parseInt(this.$store.state.lineSize) * 3 -
                        this.svgLeft;
                    this.lineEndY = parseInt(this.$store.state.lineSize) * 3;
                } else {
                    if (
                        this.eEndX + this.eEndW * 0.5 >
                        this.eStartX + this.eStartW * 0.5
                    ) {
                        //中右
                        console.log("中右");
                        this.svgLeft = this.eStartX;
                        this.svgTop = this.eEndY + this.eEndH;
                        this.svgWid = this.eEndX + this.eEndW - this.svgLeft;
                        this.svgHei = this.eStartY - this.svgTop;
                        this.lineStartX =
                            this.eStartX +
                            this.eStartW * 0.5 +
                            parseInt(this.$store.state.lineSize) * 3 -
                            this.svgLeft;
                        this.lineStartY =
                            this.svgHei - parseInt(this.$store.state.lineSize) * 3;
                        this.lineEndX =
                            this.eEndX +
                            this.eEndW * 0.5 +
                            parseInt(this.$store.state.lineSize) * 3 -
                            this.svgLeft;
                        this.lineEndY = parseInt(this.$store.state.lineSize) * 3;
                    } else {
                        //中中
                        console.log("中中");
                        this.svgLeft = this.eEndX;
                        this.svgTop = this.eEndY + this.eEndH;
                        this.svgWid = this.eEndW;
                        this.svgHei = this.eStartY - this.svgTop;
                        this.lineStartX =
                            this.eStartX +
                            this.eStartW * 0.5 +
                            parseInt(this.$store.state.lineSize) * 3 -
                            this.svgLeft;
                        this.lineStartY =
                            this.svgHei - parseInt(this.$store.state.lineSize) * 3;
                        this.lineEndX =
                            this.eEndX +
                            this.eEndW * 0.5 +
                            parseInt(this.$store.state.lineSize) * 3 -
                            this.svgLeft;
                        this.lineEndY = parseInt(this.$store.state.lineSize) * 3;
                    }
                }
            },
            //右上
            topRight() {
                console.log("上右");
                this.svgLeft = this.eStartX + this.eStartW * 0.5;
                this.svgTop = this.eEndY + this.eEndH * 0.5;
                this.svgWid = this.eEndX - this.svgLeft;
                this.svgHei = this.eStartY - this.svgTop;
                this.lineStartX = parseInt(this.$store.state.lineSize) * 3;
                this.lineStartY =
                    this.svgHei - parseInt(this.$store.state.lineSize) * 2;
                this.lineEndX =
                    this.svgWid - parseInt(this.$store.state.lineSize) * 3;
                this.lineEndY = parseInt(this.$store.state.lineSize) * 3;
            },
            //左下
            underLeft() {
                console.log("左下");
                this.svgLeft = this.eEndX + this.eEndW;
                this.svgTop = this.eStartY + this.eStartH;
                this.svgWid = this.eStartX + this.eStartW * 0.5 - this.svgLeft;
                this.svgHei = this.eEndY + this.eEndH * 0.5 - this.svgTop;
                this.lineStartX =
                    this.svgWid - parseInt(this.$store.state.lineSize) * 3;
                this.lineStartY = parseInt(this.$store.state.lineSize) * 2;
                this.lineEndX = parseInt(this.$store.state.lineSize) * 3;
                this.lineEndY =
                    this.svgHei - parseInt(this.$store.state.lineSize) * 2;
                console.log(this.svgLeft);
                console.log(this.svgTop);
            },
            //中下
            underMiddle() {
                console.log("下中");
                if (
                    this.eEndX + this.eEndW * 0.5 <
                    this.eStartX + this.eStartW * 0.5
                ) {
                    //中左
                    console.log("中左");
                    this.svgLeft = this.eEndX;
                    this.svgTop = this.eStartY + this.eStartH;
                    this.svgWid = this.eStartX + this.eStartW - this.svgLeft;
                    this.svgHei = this.eEndY - this.svgTop;
                    this.lineStartX =
                        this.eStartX + this.eStartW * 0.5 - this.svgLeft;
                    this.lineStartY = parseInt(this.$store.state.lineSize) * 3;
                    this.lineEndY =
                        this.svgHei - parseInt(this.$store.state.lineSize) * 3;
                    this.lineEndX =
                        this.eEndX +
                        this.eEndW * 0.5 +
                        parseInt(this.$store.state.lineSize) -
                        this.svgLeft;
                } else {
                    if (
                        this.eEndX + this.eEndW * 0.5 >
                        this.eStartX + this.eStartW * 0.5
                    ) {
                        //中右
                        console.log("中右");
                        this.svgLeft = this.eStartX;
                        this.svgTop = this.eStartY + this.eStartH;
                        this.svgWid = this.eEndX + this.eEndW - this.svgLeft;
                        this.svgHei = this.eEndY - this.svgTop;
                        this.lineStartX =
                            this.eStartX +
                            this.eStartW * 0.5 +
                            parseInt(this.$store.state.lineSize) * 3 -
                            this.svgLeft;
                        this.lineStartY = parseInt(this.$store.state.lineSize) * 3;
                        this.lineEndX =
                            this.eEndX +
                            this.eEndW * 0.5 +
                            parseInt(this.$store.state.lineSize) * 3 -
                            this.svgLeft;
                        this.lineEndY =
                            this.svgHei - parseInt(this.$store.state.lineSize) * 3;
                    } else {
                        //中中
                        console.log("中中");
                        this.svgLeft =
                            this.eEndX - parseInt(this.$store.state.lineSize) * 2;
                        this.svgTop = this.eStartY + this.eStartH;
                        this.svgWid = this.eEndW;
                        this.svgHei = this.eEndY - this.svgTop;
                        this.lineStartX =
                            this.eStartW * 0.5 + this.eStartX - this.svgLeft;
                        this.lineStartY = parseInt(this.$store.state.lineSize) * 2;
                        this.lineEndX =
                            this.eEndW * 0.5 + this.eEndX - this.svgLeft;
                        this.lineEndY =
                            this.svgHei - parseInt(this.$store.state.lineSize) * 3;
                    }
                }
            },
            //右下
            underRight() {
                console.log("右下");
                this.svgLeft = this.eStartX + this.eStartW * 0.5;
                this.svgTop = this.eStartY + this.eStartH;
                this.svgWid = this.eEndX - this.svgLeft;
                this.svgHei = this.eEndY + this.eEndH * 0.5 - this.svgTop;
                this.lineStartX = parseInt(this.$store.state.lineSize) * 3;
                this.lineStartY = parseInt(this.$store.state.lineSize) * 3;
                this.lineEndX =
                    this.svgWid - parseInt(this.$store.state.lineSize) * 3;
                this.lineEndY =
                    this.svgHei - parseInt(this.$store.state.lineSize) * 2;
            },
            */
            //左中
            middleLeft() {
                var cav1 = document.getElementById("canvas1");
                var c = {
                    x: cav1.offsetLeft,
                    y: cav1.offsetTop
                };
                console.log("左中");
                this.lineStartX =
                    this.eStartX -
                    parseInt(this.$store.state.lineSize) * 3 - c.x
                this.lineStartY =
                    this.eStartY +
                    this.eStartH * 0.5 -
                    parseInt(this.$store.state.lineSize) -
                    c.y
                this.lineEndX =
                    this.eEndX +
                    this.eEndW +
                    parseInt(this.$store.state.lineSize) * 3 -
                    c.x
                this.lineEndY =
                    this.eEndY +
                    this.eEndH * 0.5 +
                    parseInt(this.$store.state.lineSize) -
                    c.y
            },
            //右中
            middleRight() {
                console.log("右中");
                var cav1 = document.getElementById("canvas1");
                var c = {
                    x: cav1.offsetLeft,
                    y: cav1.offsetTop
                };
                this.lineStartX = this.eStartX + this.eStartW -
                    parseInt(this.$store.state.lineSize) * 3 - c.x
                this.lineStartY = this.eStartY + this.eStartH * 0.5 +
                    parseInt(this.$store.state.lineSize) - c.y
                this.lineEndX =
                    this.eEndX -
                    parseInt(this.$store.state.lineSize) * 3 -
                    c.x
                this.lineEndY =
                    this.eEndY +
                    this.eEndH * 0.5 -
                    parseInt(this.$store.state.lineSize) * 3 -
                    c.y
            },
            //@TODO 节点组件出现重叠时如何画线
            //线条随节点移动而移动
            moveLine(fromid, toid, lineSize, id, relationType) {
                var startLeft, startTop, startWidth, startHeight;
                var endLeft, endTop, endWidth, endHeight;
                var start, end;
                //console.log("moveline:"+fromid+":"+toid);
                start = document.getElementById(fromid).childNodes[0];
                end = document.getElementById(toid).childNodes[0];
                startLeft = $(start).offset().left;
                startTop = $(start).offset().top;
                startWidth = this.$refs[fromid + ""][0].getLineRightPosition()[0].x;
                startHeight = this.$refs[fromid + ""][0].getLineBottomPosition()[0]
                    .y;
                endLeft = $(end).offset().left;
                endTop = $(end).offset().top;
                endWidth = this.$refs[toid + ""][0].getLineRightPosition()[0].x;
                endHeight = this.$refs[toid + ""][0].getLineBottomPosition()[0].y;
                if (endTop + endHeight < startTop) {
                    //上
                    console.log("shang")
                    console.log(startTop)
                    console.log(endTop + endHeight)
                    this.moveTop(startLeft,
                        startTop,
                        startWidth,
                        startHeight,
                        endLeft,
                        endTop,
                        endWidth,
                        endHeight,
                        lineSize,
                        id,
                        relationType)
                    /*
                    if (endLeft + endWidth < startLeft) {
                        console.log("左上");
                        this.moveTopLeft(
                            startLeft,
                            startTop,
                            startWidth,
                            startHeight,
                            endLeft,
                            endTop,
                            endWidth,
                            endHeight,
                            lineSize,
                            id,
                            relationType
                        );
                    }
                    else {
                        if (endLeft > startLeft + startWidth) {
                            console.log("右上");
                            this.moveTopRight(
                                startLeft,
                                startTop,
                                startWidth,
                                startHeight,
                                endLeft,
                                endTop,
                                endWidth,
                                endHeight,
                                lineSize,
                                id,
                                relationType
                            );
                        } else
                            {
                            console.log("上中");
                            this.moveTopMiddle(
                                startLeft,
                                startTop,
                                startWidth,
                                startHeight,
                                endLeft,
                                endTop,
                                endWidth,
                                endHeight,
                                lineSize,
                                id,
                                relationType
                            );
                        }
                    }
                    */
                } else {
                    if (endTop > startTop + startHeight) {
                        //下
                        console.log("下")
                        this.moveUnder(startLeft,
                            startTop,
                            startWidth,
                            startHeight,
                            endLeft,
                            endTop,
                            endWidth,
                            endHeight,
                            lineSize,
                            id,
                            relationType)
                        /*
                        if (endLeft + endWidth < startLeft) {
                            //下左
                            console.log("下左");
                            this.moveUnderLeft(
                                startLeft,
                                startTop,
                                startWidth,
                                startHeight,
                                endLeft,
                                endTop,
                                endWidth,
                                endHeight,
                                lineSize,
                                id,
                                relationType
                            );
                        }
                        else {
                            if (endLeft > startLeft + startWidth) {
                                //下右
                                console.log("下右");
                                this.moveUnderRight(
                                    startLeft,
                                    startTop,
                                    startWidth,
                                    startHeight,
                                    endLeft,
                                    endTop,
                                    endWidth,
                                    endHeight,
                                    lineSize,
                                    id,
                                    relationType
                                );
                            } else {
                                //下中
                                console.log("下中");
                                this.moveUnderMiddle(
                                    startLeft,
                                    startTop,
                                    startWidth,
                                    startHeight,
                                    endLeft,
                                    endTop,
                                    endWidth,
                                    endHeight,
                                    lineSize,
                                    id,
                                    relationType
                                );
                            }
                        }
                        */
                    } else {
                        //中
                        console.log("中")
                        if (endLeft + endWidth < startLeft) {
                            //中左
                            console.log("中左");
                            this.moveMiddleLeft(
                                startLeft,
                                startTop,
                                startWidth,
                                startHeight,
                                endLeft,
                                endTop,
                                endWidth,
                                endHeight,
                                lineSize,
                                id,
                                relationType
                            );
                        } else {
                            if (endLeft > startLeft + startWidth) {
                                //中右
                                console.log("中右");
                                this.moveMiddleRight(
                                    startLeft,
                                    startTop,
                                    startWidth,
                                    startHeight,
                                    endLeft,
                                    endTop,
                                    endWidth,
                                    endHeight,
                                    lineSize,
                                    id,
                                    relationType
                                );
                            } else {
                                console.log("出现重叠");
                            }
                        }
                    }
                }
            },
            /*
            moveTopLeft(
                startLeft,
                startTop,
                startWidth,
                startHeight,
                endLeft,
                endTop,
                endWidth,
                endHeight,
                linesize,
                id,
                relationType
            ) {
                console.log(relationType);
                var svgLeft, svgTop, svgWidth, svgHeight;
                var lineSX, lineSY, lineEX, lineEY;
                svgLeft = endLeft + endWidth;
                svgTop = endTop + endHeight * 0.5;
                svgWidth = startLeft + startWidth * 0.5 - svgLeft;
                svgHeight = startTop - svgTop;
                lineSX = parseInt(linesize) * 3;
                lineSY = parseInt(linesize) * 3;
                lineEX = svgWidth - parseInt(linesize) * 3;
                lineEY = svgHeight - parseInt(linesize) * 3;
                var linePath;
                if (relationType == "straight") {
                    linePath =
                        "M" + lineSX + " " + lineSY + " L " + lineEX + " " + lineEY;
                }
                if (relationType == "orthogonal") {
                    var x1, y1, x2, y2;
                    if (svgWidth > svgHeight) {
                        x1 = (lineSX + lineEX) / 2;
                        x2 = x1;
                        y1 = lineSY;
                        y2 = lineEY;
                    } else {
                        x1 = lineSX;
                        x2 = lineEX;
                        y1 = (lineSY + lineEY) / 2;
                        y2 = y1;
                    }
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " L " +
                        x1 +
                        " " +
                        y1 +
                        " L " +
                        x2 +
                        " " +
                        y2 +
                        " L " +
                        lineEX +
                        " " +
                        lineEY;
                }
                if (relationType == "curve") {
                    var x1, y1, x2, y2;
                    x1 = (lineSX + lineEX) / 2;
                    x2 = x1;
                    y1 = lineSY;
                    y2 = lineEY;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " C " +
                        x1 +
                        " " +
                        y1 +
                        " " +
                        x2 +
                        " " +
                        y2 +
                        " " +
                        lineEX +
                        " " +
                        lineEY;
                }
                var startPosition = {
                    left: lineSX,
                    top: lineSY
                };
                var endPosition = {
                    left: lineEX,
                    top: lineEY
                };
                var lineSvgStyle = {
                    position: "absolute",
                    left: svgLeft,
                    top: svgTop,
                    width: svgWidth,
                    height: svgHeight
                };
                var line;
                for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                    if (this.$store.state.UML.lines[i].Id == id) {
                        line = this.$store.state.UML.lines[i];
                    }
                }
                line.startPosition = startPosition;
                line.endPosition = endPosition;
                line.lineSvgStyle = lineSvgStyle;
                line.linePath = linePath;
                this.lineList.push(line);
                console.log("moveLine:" + id);
                console.log(this.lineList);
                this.$store.commit("moveLine", {
                    startPosition: startPosition,
                    endPosition: endPosition,
                    lineSvgStyle: lineSvgStyle,
                    linePath: linePath,
                    id: id
                });
            },
            moveTopRight(
                startLeft,
                startTop,
                startWidth,
                startHeight,
                endLeft,
                endTop,
                endWidth,
                endHeight,
                linesize,
                id,
                relationType
            ) {
                console.log("上右");
                var svgLeft, svgTop, svgWidth, svgHeight;
                var lineSX, lineSY, lineEX, lineEY;
                var linePath;
                svgLeft = startLeft + startWidth * 0.5;
                svgTop = endTop + endHeight * 0.5;
                svgWidth = endLeft - svgLeft;
                svgHeight = startTop - svgTop;
                lineSX = parseInt(linesize) * 3;
                lineSY = svgHeight - parseInt(linesize) * 2;
                lineEX = svgWidth - parseInt(linesize) * 3;
                lineEY = parseInt(linesize) * 3;
                if (relationType == "straight") {
                    linePath =
                        "M" + lineSX + " " + lineSY + " L " + lineEX + " " + lineEY;
                }
                if (relationType == "orthogonal") {
                    var x1, y1, x2, y2;
                    if (svgWidth > svgHeight) {
                        x1 = (lineSX + lineEX) / 2;
                        x2 = x1;
                        y1 = lineSY;
                        y2 = lineEY;
                    } else {
                        x1 = lineSX;
                        x2 = lineEX;
                        y1 = (lineSY + lineEY) / 2;
                        y2 = y1;
                    }
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " L " +
                        x1 +
                        " " +
                        y1 +
                        " L " +
                        x2 +
                        " " +
                        y2 +
                        " L " +
                        lineEX +
                        " " +
                        lineEY;
                }
                if (relationType == "curve") {
                    var x1, y1, x2, y2;
                    x1 = (lineSX + lineEX) / 2;
                    x2 = x1;
                    y1 = lineSY;
                    y2 = lineEY;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " C " +
                        x1 +
                        " " +
                        y1 +
                        " " +
                        x2 +
                        " " +
                        y2 +
                        " " +
                        lineEX +
                        " " +
                        lineEY;
                }
                var startPosition = {
                    left: lineSX,
                    top: lineSY
                };
                var endPosition = {
                    left: lineEX,
                    top: lineEY
                };
                var lineSvgStyle = {
                    position: "absolute",
                    left: svgLeft,
                    top: svgTop,
                    width: svgWidth,
                    height: svgHeight
                };
                var line;
                for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                    if (this.$store.state.UML.lines[i].Id == id) {
                        line = this.$store.state.UML.lines[i];
                    }
                }
                line.startPosition = startPosition;
                line.endPosition = endPosition;
                line.lineSvgStyle = lineSvgStyle;
                line.linePath = linePath;
                this.lineList.push(line);
                console.log(this.lineList);
                console.log("moveLine:" + id);
                this.$store.commit("moveLine", {
                    startPosition: startPosition,
                    endPosition: endPosition,
                    lineSvgStyle: lineSvgStyle,
                    linePath: linePath,
                    id: id
                });
            },
            moveTopMiddle(
                startLeft,
                startTop,
                startWidth,
                startHeight,
                endLeft,
                endTop,
                endWidth,
                endHeight,
                linesize,
                id,
                relationType
            ) {
                var svgLeft, svgTop, svgWidth, svgHeight;
                var lineSX, lineSY, lineEX, lineEY;
                var linePath;
                console.log("上中");
                if (endLeft + endWidth * 0.5 < startLeft + startWidth * 0.5) {
                    //中左
                    console.log("中左");
                    svgLeft = endLeft;
                    svgTop = endTop + endHeight;
                    svgWidth = startLeft + startWidth - svgLeft;
                    svgHeight = startTop - svgTop;
                } else {
                    if (endLeft + endWidth * 0.5 > startLeft + startWidth * 0.5) {
                        //中右
                        console.log("中右");
                        svgLeft = startLeft;
                        svgTop = endTop + endHeight;
                        svgWidth = endLeft + endWidth - svgLeft;
                        svgHeight = startTop - svgTop;
                    } else {
                        //中中
                        console.log("中中");
                        svgLeft = endLeft;
                        svgTop = endTop + endHeight;
                        svgWidth = endWidth;
                        svgHeight = startTop - svgTop;
                    }
                }
                lineSX =
                    startLeft + startWidth * 0.5 + parseInt(linesize) * 3 - svgLeft;
                lineSY = svgHeight - parseInt(linesize) * 3;
                lineEX =
                    endLeft + endWidth * 0.5 + parseInt(linesize) * 3 - svgLeft;
                lineEY = parseInt(linesize) * 3;
                if (relationType == "straight") {
                    linePath =
                        "M" + lineSX + " " + lineSY + " L " + lineEX + " " + lineEY;
                }
                if (relationType == "orthogonal") {
                    var x1, y1, x2, y2;
                    if (svgWidth > svgHeight) {
                        x1 = (lineSX + lineEX) / 2;
                        x2 = x1;
                        y1 = lineSY;
                        y2 = lineEY;
                    } else {
                        x1 = lineSX;
                        x2 = lineEX;
                        y1 = (lineSY + lineEY) / 2;
                        y2 = y1;
                    }
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " L " +
                        x1 +
                        " " +
                        y1 +
                        " L " +
                        x2 +
                        " " +
                        y2 +
                        " L " +
                        lineEX +
                        " " +
                        lineEY;
                }
                if (relationType == "curve") {
                    var x1, y1, x2, y2;
                    x1 = (lineSX + lineEX) / 2;
                    x2 = x1;
                    y1 = lineSY;
                    y2 = lineEY;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " C " +
                        x1 +
                        " " +
                        y1 +
                        " " +
                        x2 +
                        " " +
                        y2 +
                        " " +
                        lineEX +
                        " " +
                        lineEY;
                }
                var startPosition = {
                    left: lineSX,
                    top: lineSY
                };
                var endPosition = {
                    left: lineEX,
                    top: lineEY
                };
                var lineSvgStyle = {
                    position: "absolute",
                    left: svgLeft,
                    top: svgTop,
                    width: svgWidth,
                    height: svgHeight
                };
                var line;
                for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                    if (this.$store.state.UML.lines[i].Id == id) {
                        line = this.$store.state.UML.lines[i];
                    }
                }
                line.startPosition = startPosition;
                line.endPosition = endPosition;
                line.lineSvgStyle = lineSvgStyle;
                line.linePath = linePath;
                this.lineList.push(line);
                console.log(this.lineList);
                console.log("moveLine:" + id);
                this.$store.commit("moveLine", {
                    startPosition: startPosition,
                    endPosition: endPosition,
                    lineSvgStyle: lineSvgStyle,
                    linePath: linePath,
                    id: id
                });
            },
            moveUnderLeft(
                startLeft,
                startTop,
                startWidth,
                startHeight,
                endLeft,
                endTop,
                endWidth,
                endHeight,
                linesize,
                id,
                relationType
            ) {
                var svgLeft, svgTop, svgWidth, svgHeight;
                var lineSX, lineSY, lineEX, lineEY;
                var linePath;
                svgLeft = endLeft + endWidth;
                svgTop = startTop + startHeight;
                svgWidth = startLeft + startWidth * 0.5 - svgLeft;
                svgHeight = endTop + endHeight * 0.5 - svgTop;
                lineSX = svgWidth - parseInt(linesize) * 3;
                lineSY = parseInt(linesize) * 2;
                lineEX = parseInt(linesize) * 3;
                lineEY = svgHeight - parseInt(linesize) * 2;
                if (relationType == "straight") {
                    linePath =
                        "M" + lineSX + " " + lineSY + " L " + lineEX + " " + lineEY;
                }
                if (relationType == "orthogonal") {
                    var x1, y1, x2, y2;
                    if (svgWidth > svgHeight) {
                        x1 = (lineSX + lineEX) / 2;
                        x2 = x1;
                        y1 = lineSY;
                        y2 = lineEY;
                    } else {
                        x1 = lineSX;
                        x2 = lineEX;
                        y1 = (lineSY + lineEY) / 2;
                        y2 = y1;
                    }
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " L " +
                        x1 +
                        " " +
                        y1 +
                        " L " +
                        x2 +
                        " " +
                        y2 +
                        " L " +
                        lineEX +
                        " " +
                        lineEY;
                }
                if (relationType == "curve") {
                    var x1, y1, x2, y2;
                    x1 = (lineSX + lineEX) / 2;
                    x2 = x1;
                    y1 = lineSY;
                    y2 = lineEY;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " C " +
                        x1 +
                        " " +
                        y1 +
                        " " +
                        x2 +
                        " " +
                        y2 +
                        " " +
                        lineEX +
                        " " +
                        lineEY;
                }
                var startPosition = {
                    left: lineSX,
                    top: lineSY
                };
                var endPosition = {
                    left: lineEX,
                    top: lineEY
                };
                var lineSvgStyle = {
                    position: "absolute",
                    left: svgLeft,
                    top: svgTop,
                    width: svgWidth,
                    height: svgHeight
                };
                var line;
                for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                    if (this.$store.state.UML.lines[i].Id == id) {
                        line = this.$store.state.UML.lines[i];
                    }
                }
                line.startPosition = startPosition;
                line.endPosition = endPosition;
                line.lineSvgStyle = lineSvgStyle;
                line.linePath = linePath;
                this.lineList.push(line);
                console.log(this.lineList);
                console.log("moveLine:" + id);
                this.$store.commit("moveLine", {
                    startPosition: startPosition,
                    endPosition: endPosition,
                    lineSvgStyle: lineSvgStyle,
                    linePath: linePath,
                    id: id
                });
            },
            moveUnderRight(
                startLeft,
                startTop,
                startWidth,
                startHeight,
                endLeft,
                endTop,
                endWidth,
                endHeight,
                lineSize,
                id,
                relationType
            ) {
                var svgLeft, svgTop, svgWidth, svgHeight;
                var lineSX, lineSY, lineEX, lineEY;
                var linePath;
                console.log("右下");
                svgLeft = startLeft + startWidth * 0.5;
                svgTop = startTop + startHeight;
                svgWidth = endLeft - svgLeft;
                svgHeight = endTop + endHeight * 0.5 - svgTop;
                lineSX = parseInt(lineSize) * 3;
                lineSY = parseInt(lineSize) * 3;
                lineEX = svgWidth - parseInt(lineSize) * 3;
                lineEY = svgHeight - parseInt(lineSize) * 2;
                if (relationType == "straight") {
                    linePath =
                        "M" + lineSX + " " + lineSY + " L " + lineEX + " " + lineEY;
                }
                if (relationType == "orthogonal") {
                    var x1, y1, x2, y2;
                    if (svgWidth > svgHeight) {
                        x1 = (lineSX + lineEX) / 2;
                        x2 = x1;
                        y1 = lineSY;
                        y2 = lineEY;
                    } else {
                        x1 = lineSX;
                        x2 = lineEX;
                        y1 = (lineSY + lineEY) / 2;
                        y2 = y1;
                    }
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " L " +
                        x1 +
                        " " +
                        y1 +
                        " L " +
                        x2 +
                        " " +
                        y2 +
                        " L " +
                        lineEX +
                        " " +
                        lineEY;
                }
                if (relationType == "curve") {
                    var x1, y1, x2, y2;
                    x1 = (lineSX + lineEX) / 2;
                    x2 = x1;
                    y1 = lineSY;
                    y2 = lineEY;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " C " +
                        x1 +
                        " " +
                        y1 +
                        " " +
                        x2 +
                        " " +
                        y2 +
                        " " +
                        lineEX +
                        " " +
                        lineEY;
                }
                var startPosition = {
                    left: lineSX,
                    top: lineSY
                };
                var endPosition = {
                    left: lineEX,
                    top: lineEY
                };
                var lineSvgStyle = {
                    position: "absolute",
                    left: svgLeft,
                    top: svgTop,
                    width: svgWidth,
                    height: svgHeight
                };
                var line;
                for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                    if (this.$store.state.UML.lines[i].Id == id) {
                        line = this.$store.state.UML.lines[i];
                    }
                }
                line.startPosition = startPosition;
                line.endPosition = endPosition;
                line.lineSvgStyle = lineSvgStyle;
                line.linePath = linePath;
                this.lineList.push(line);
                console.log(this.lineList);
                console.log("moveLine:" + id);
                this.$store.commit("moveLine", {
                    startPosition: startPosition,
                    endPosition: endPosition,
                    lineSvgStyle: lineSvgStyle,
                    linePath: linePath,
                    id: id
                });
            },
            moveUnderMiddle(
                startLeft,
                startTop,
                startWidth,
                startHeight,
                endLeft,
                endTop,
                endWidth,
                endHeight,
                lineSize,
                id,
                relationType
            ) {
                var svgLeft, svgTop, svgWidth, svgHeight;
                var lineSX, lineSY, lineEX, lineEY;
                var linePath;
                console.log("下中");
                if (endLeft + endWidth * 0.5 < startLeft + startWidth * 0.5) {
                    //中左
                    console.log("中左");
                    svgLeft = endLeft;
                    svgTop = startTop + startHeight;
                    svgWidth = startLeft + startWidth - svgLeft;
                    svgHeight = endTop - svgTop;
                } else {
                    if (endLeft + endWidth * 0.5 > startLeft + startWidth * 0.5) {
                        //中右
                        console.log("中右");
                        svgLeft = startLeft;
                        svgTop = startTop + startHeight;
                        svgWidth = endLeft + endWidth - svgLeft;
                        svgHeight = endTop - svgTop;
                    } else {
                        //中中
                        console.log("中中");
                        svgLeft = endLeft - parseInt(lineSize) * 2;
                        svgTop = startTop + startHeight;
                        svgWidth = endWidth;
                        svgHeight = endTop - svgTop;
                    }
                }
                lineSX = startLeft + startWidth * 0.5 - svgLeft;
                lineSY = parseInt(lineSize) * 3;
                lineEY = svgHeight - parseInt(lineSize) * 3;
                lineEX = endLeft + endWidth * 0.5 + parseInt(lineSize) - svgLeft;
                if (relationType == "straight") {
                    linePath =
                        "M" + lineSX + " " + lineSY + " L " + lineEX + " " + lineEY;
                }
                if (relationType == "orthogonal") {
                    var x1, y1, x2, y2;
                    if (svgWidth > svgHeight) {
                        x1 = (lineSX + lineEX) / 2;
                        x2 = x1;
                        y1 = lineSY;
                        y2 = lineEY;
                    } else {
                        x1 = lineSX;
                        x2 = lineEX;
                        y1 = (lineSY + lineEY) / 2;
                        y2 = y1;
                    }
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " L " +
                        x1 +
                        " " +
                        y1 +
                        " L " +
                        x2 +
                        " " +
                        y2 +
                        " L " +
                        lineEX +
                        " " +
                        lineEY;
                }
                if (relationType == "curve") {
                    var x1, y1, x2, y2;
                    x1 = (lineSX + lineEX) / 2;
                    x2 = x1;
                    y1 = lineSY;
                    y2 = lineEY;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " C " +
                        x1 +
                        " " +
                        y1 +
                        " " +
                        x2 +
                        " " +
                        y2 +
                        " " +
                        lineEX +
                        " " +
                        lineEY;
                }
                var startPosition = {
                    left: lineSX,
                    top: lineSY
                };
                var endPosition = {
                    left: lineEX,
                    top: lineEY
                };
                var lineSvgStyle = {
                    position: "absolute",
                    left: svgLeft,
                    top: svgTop,
                    width: svgWidth,
                    height: svgHeight
                };
                var line;
                for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                    if (this.$store.state.UML.lines[i].Id == id) {
                        line = this.$store.state.UML.lines[i];
                    }
                }
                line.startPosition = startPosition;
                line.endPosition = endPosition;
                line.lineSvgStyle = lineSvgStyle;
                line.linePath = linePath;
                this.lineList.push(line);
                console.log(this.lineList);
                console.log("moveLine:" + id);
                this.$store.commit("moveLine", {
                    startPosition: startPosition,
                    endPosition: endPosition,
                    lineSvgStyle: lineSvgStyle,
                    linePath: linePath,
                    id: id
                });
            },
    */
            moveTop(startLeft,
                    startTop,
                    startWidth,
                    startHeight,
                    endLeft,
                    endTop,
                    endWidth,
                    endHeight,
                    linesize,
                    id,
                    relationType) {
                var lineSX, lineSY, lineEX, lineEY, linePath
                var cav1 = document.getElementById("canvas1");
                var c = {
                    x: cav1.offsetLeft,
                    y: cav1.offsetTop
                };
                var x1, y1, x2, y2;
                lineSX =
                    startLeft + startWidth * 0.5 - c.x;
                lineSY = startTop - c.y;
                lineEX =
                    endLeft + endWidth * 0.5 - c.x;
                lineEY = endHeight + endTop - c.y;
                if (relationType == "straight") {
                    linePath =
                        "M" + lineSX + " " + lineSY + " L " + lineEX + " " + lineEY;
                }
                if (relationType == "orthogonal") {
                    x1 = lineSX;
                    x2 = lineEX;
                    y1 = (lineSY + lineEY) / 2;
                    y2 = y1;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " L " +
                        x1 +
                        " " +
                        y1 +
                        " L " +
                        x2 +
                        " " +
                        y2 +
                        " L " +
                        lineEX +
                        " " +
                        lineEY;
                }
                if (relationType == "curve") {
                    x1 = lineSX;
                    x2 = lineEX;
                    y1 = (lineSY + lineEY) / 2;
                    y2 = y1;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " C " +
                        x1 +
                        " " +
                        y1 +
                        " " +
                        x2 +
                        " " +
                        y2 +
                        " " +
                        lineEX +
                        " " +
                        lineEY;
                }
                var startPosition = {
                    left: lineSX,
                    top: lineSY
                };
                var endPosition = {
                    left: lineEX,
                    top: lineEY
                };
                var line;
                for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                    if (this.$store.state.UML.lines[i].Id == id) {
                        line = this.$store.state.UML.lines[i];
                    }
                }
                line.startPosition = startPosition;
                line.endPosition = endPosition;
                line.linePath = linePath;
                this.lineList.push(line);
                console.log(this.lineList);
                console.log("moveLine:" + id);
                this.$store.commit("moveLine", {
                    startPosition: startPosition,
                    endPosition: endPosition,
                    linePath: linePath,
                    id: id
                });
            },
            moveUnder(startLeft,
                      startTop,
                      startWidth,
                      startHeight,
                      endLeft,
                      endTop,
                      endWidth,
                      endHeight,
                      linesize,
                      id,
                      relationType) {
                var lineSX, lineSY, lineEX, lineEY, linePath
                var cav1 = document.getElementById("canvas1");
                var c = {
                    x: cav1.offsetLeft,
                    y: cav1.offsetTop
                };
                var x1, y1, x2, y2;
                lineSX = startLeft + startWidth * 0.5 - c.x;
                lineSY = startTop + startHeight + parseInt(linesize) * 3 - c.y;
                lineEY = endTop - parseInt(linesize) * 3 - c.y;
                lineEX = endLeft + endWidth * 0.5 + parseInt(linesize) - c.x;
                if (relationType == "straight") {
                    linePath =
                        "M" + lineSX + " " + lineSY + " L " + lineEX + " " + lineEY;
                }
                if (relationType == "orthogonal") {
                    x1 = lineSX;
                    x2 = lineEX;
                    y1 = (lineSY + lineEY) / 2;
                    y2 = y1;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " L " +
                        x1 +
                        " " +
                        y1 +
                        " L " +
                        x2 +
                        " " +
                        y2 +
                        " L " +
                        lineEX +
                        " " +
                        lineEY;
                }
                if (relationType == "curve") {
                    x1 = lineSX;
                    x2 = lineEX;
                    y1 = (lineSY + lineEY) / 2;
                    y2 = y1;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " C " +
                        x1 +
                        " " +
                        y1 +
                        " " +
                        x2 +
                        " " +
                        y2 +
                        " " +
                        lineEX +
                        " " +
                        lineEY;
                }
                var startPosition = {
                    left: lineSX,
                    top: lineSY
                };
                var endPosition = {
                    left: lineEX,
                    top: lineEY
                };
                var line;
                for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                    if (this.$store.state.UML.lines[i].Id == id) {
                        line = this.$store.state.UML.lines[i];
                    }
                }
                line.startPosition = startPosition;
                line.endPosition = endPosition;
                line.linePath = linePath;
                this.lineList.push(line);
                console.log(this.lineList);
                console.log("moveLine:" + id);
                this.$store.commit("moveLine", {
                    startPosition: startPosition,
                    endPosition: endPosition,
                    linePath: linePath,
                    id: id
                });
            },
            moveMiddleLeft(startLeft,
                           startTop,
                           startWidth,
                           startHeight,
                           endLeft,
                           endTop,
                           endWidth,
                           endHeight,
                           linesize,
                           id,
                           relationType) {
                var lineSX, lineSY, lineEX, lineEY;
                var linePath;
                var cav1 = document.getElementById("canvas1");
                var c = {
                    x: cav1.offsetLeft,
                    y: cav1.offsetTop
                };
                var x1, y1, x2, y2;
                lineSX = startLeft - parseInt(linesize) * 3 - c.x;
                lineSY = startTop + startHeight * 0.5 - parseInt(linesize) - c.y;
                lineEX = endLeft + endWidth + parseInt(linesize) * 3 - c.x;
                lineEY = endTop + endHeight * 0.5 + parseInt(linesize) - c.y;
                if (relationType == "straight") {
                    linePath =
                        "M" + lineSX + " " + lineSY + " L " + lineEX + " " + lineEY;
                }
                if (relationType == "orthogonal") {
                    x1 = lineSX;
                    x2 = lineEX;
                    y1 = (lineSY + lineEY) / 2;
                    y2 = y1;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " L " +
                        x1 +
                        " " +
                        y1 +
                        " L " +
                        x2 +
                        " " +
                        y2 +
                        " L " +
                        lineEX +
                        " " +
                        lineEY;
                }
                if (relationType == "curve") {
                    x1 = lineSX;
                    x2 = lineEX;
                    y1 = (lineSY + lineEY) / 2;
                    y2 = y1;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " C " +
                        x1 +
                        " " +
                        y1 +
                        " " +
                        x2 +
                        " " +
                        y2 +
                        " " +
                        lineEX +
                        " " +
                        lineEY;
                }
                var startPosition = {
                    left: lineSX,
                    top: lineSY
                };
                var endPosition = {
                    left: lineEX,
                    top: lineEY
                };
                var line;
                for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                    if (this.$store.state.UML.lines[i].Id == id) {
                        line = this.$store.state.UML.lines[i];
                    }
                }
                line.startPosition = startPosition;
                line.endPosition = endPosition;
                line.linePath = linePath;
                this.lineList.push(line);
                console.log(this.lineList);
                console.log("moveLine:" + id);
                this.$store.commit("moveLine", {
                    startPosition: startPosition,
                    endPosition: endPosition,
                    linePath: linePath,
                    id: id
                });
            },
            moveMiddleRight(startLeft,
                            startTop,
                            startWidth,
                            startHeight,
                            endLeft,
                            endTop,
                            endWidth,
                            endHeight,
                            lineSize,
                            id,
                            relationType) {
                var lineSX, lineSY, lineEX, lineEY
                var linePath;
                var cav1 = document.getElementById("canvas1");
                var c = {
                    x: cav1.offsetLeft,
                    y: cav1.offsetTop
                };
                var x1, y1, x2, y2;
                lineSX = startLeft + startWidth - c.x
                lineSY = startTop + startHeight * 0.5 - c.y;
                lineEX = endLeft - parseInt(lineSize) * 3 - c.x;
                lineEY = endTop + endHeight * 0.5 - parseInt(lineSize) * 3 - c.y;
                if (relationType == "straight") {
                    linePath =
                        "M" + lineSX + " " + lineSY + " L " + lineEX + " " + lineEY;
                }
                if (relationType == "orthogonal") {
                    x1 = lineSX;
                    x2 = lineEX;
                    y1 = (lineSY + lineEY) / 2;
                    y2 = y1;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " L " +
                        x1 +
                        " " +
                        y1 +
                        " L " +
                        x2 +
                        " " +
                        y2 +
                        " L " +
                        lineEX +
                        " " +
                        lineEY;
                }
                if (relationType == "curve") {
                    x1 = lineSX;
                    x2 = lineEX;
                    y1 = (lineSY + lineEY) / 2;
                    y2 = y1;
                    linePath =
                        "M" +
                        lineSX +
                        " " +
                        lineSY +
                        " C " +
                        x1 +
                        " " +
                        y1 +
                        " " +
                        x2 +
                        " " +
                        y2 +
                        " " +
                        lineEX +
                        " " +
                        lineEY;
                }
                var startPosition = {
                    left: lineSX,
                    top: lineSY
                };
                var endPosition = {
                    left: lineEX,
                    top: lineEY
                };
                var line;
                for (var i = 0; i < this.$store.state.UML.lines.length; i++) {
                    if (this.$store.state.UML.lines[i].Id == id) {
                        line = this.$store.state.UML.lines[i];
                    }
                }
                line.startPosition = startPosition;
                line.endPosition = endPosition;
                line.linePath = linePath;
                this.lineList.push(line);
                this.$store.commit("moveLine", {
                    startPosition: startPosition,
                    endPosition: endPosition,
                    linePath: linePath,
                    id: id
                });
            }
        }
    };
</script>

<style>
    #diagramCanvas {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #visualEditor {
        width: 100%;
        height: 600px;
        border: 1px solid #e4e7ed;
        background: url("../../assets/grid.png") repeat;
        z-index: 0;
    }

    #svg {
        width: 100%;
        height: 600px;
        z-index: 0;
    }
</style>
