<template>
    <div id="app">
        <div
            id="visualEditor"
            @dragstart.stop="handleDragStart"
            @dragend.stop="handleDragEnd"
            @dragenter.stop="handleDragEnter"
            @dragover.stop="handleDragOver"
            @click="clickOutSide"
        >
            <div
                v-for="item in $store.state.UML.nodes"
                :key="item.id"
                @contextmenu.prevent="showContextMenu(item.id, $event)"
            >
                <Resizer
                    :key="item.id"
                    :id="item.id"
                    :style="{
                        left: item.styles.left + 'px',
                        top: item.styles.top + 'px'
                    }"
                >
                    <component :is="item.type" v-bind="item"></component>
                </Resizer>
            </div>
            <div  v-for="lines in $store.state.UML.lines"
                  :key="lines.id">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <line  :x1="lines.startposition.left" :y1="lines.startposition.top" :x2="lines.endpostion.left" :y2="lines.endpostion.top"
                           :style="lines.styles"
                    />
                </svg>
            </div>
        </div>
        <ContextMenu v-show="showMenu" id="menu" @hide-menu="clickOutSide"></ContextMenu>
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
            showMenu: false
            //ghost: null //拖拽的虚影（如果使用原生的虚影，在组件重叠的情况下，会有多余图像）
        };
    },
    methods: {
        showContextMenu(id, event) {
            console.log("showContextMenu");
            this.showMenu = true;
            var menu = $("#menu");
            menu.css("left", event.clientX);
            menu.css("top", event.clientY);
            menu.css("position", "fixed");
            this.$store.commit("setEditId", { id: id });
        },
        clickOutSide() {
            console.log("clickOutSide");
            this.$store.commit("setEditState", { editing: false });
            this.$store.commit("setEditId", { id: "" });
            this.showMenu = false;
        },
        handleDragStart(event) {
            console.log("handleDragStart")
            this.$store.state.canvasdrage=true;
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
        },
        handleDragEnd(event) {
            if (this.$store.state.canvasdrage) {
                console.log("handleDragEnd:" + this.cursorToLeft + "  " + this.cursorToTop);
                //更新图数据（vue数据驱动图像变化）
                this.$store.commit("modifyNode", {
                    nodeKey: "styles",
                    key: "left",
                    value: event.clientX - this.cursorToLeft,
                    id: this.$store.state.editingId
                });
                this.$store.commit("modifyNode", {
                    nodeKey: "styles",
                    key: "top",
                    value: event.clientY - this.cursorToTop,
                    id: this.$store.state.editingId
                });
                this.cursorToLeft = 0;
                this.cursorToTop = 0;
                /* if (this.ghost) {
                document.getElementById("visualEditor").removeChild(this.ghost);
                this.ghost = null;
            } */
            }
        },
        handleDragEnter(event) {
            if(this.$store.state.canvasdrage) {
                console.log("handleDragEnter");
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy";
            }
        },
        handleDragOver(event) {
            if (this.$store.state.canvasdrage) {
                var canv = document.getElementById("canvas");
                console.log("handleDragOver");
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy";
                this.$store.commit("moveNode", {
                    left: event.clientX - this.cursorToLeft,
                    top: event.clientY - this.cursorToTop,
                    id: this.$store.state.editingId
                });
            }
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#visualEditor {
    margin-top: 10px;
    width: 100%;
    height: 600px;
    border: 1px solid grey;
    background: url("../../assets/grid.png") repeat;

}
</style>
