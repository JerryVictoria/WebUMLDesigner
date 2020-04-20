<template>
    <div id="asideBox">
        <div id="top">
            <el-input placeholder="请输入内容" v-model="Search" class="input" id="search" type="text">
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    id="searchbutton"
                    type="primary"
                    @click="searchimg"
                ></el-button>
            </el-input>
        </div>
        <div id="sidemenu" :style="{height: height+'px'}">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="搜索结果" name="1" v-show="searchresult">
                    <div
                        v-for="(item,index) in searchList"
                        :key="item.name"
                        :name="index"
                        draggable="true"
                        @mouseenter="enter(item)"
                        @mouseleave="leave(item)"
                        @mousemove="moveBG(item.name)"
                        @dragstart.stop="MouseDragStart(item)"
                        @dragend.stop="MouseDragEnd"
                    >
                        <div id="searchresult" class="image">
                            <img v-bind:src="item.imgUrl" v-bind:id="item.name" class="img" />
                        </div>
                        <div v-show="item.issubShow" class="hover_con" v-bind:style="positionsty">
                            <img v-bind:src="item.imgUrl" v-bind:style="newimg" />
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item
                    v-for="item in menuList"
                    :key="item.name"
                    :title="item.name"
                    v-show="item.value==UMLType||item.value==universal"
                >
                    <div
                        v-for="subItem in item.subItems"
                        :key="subItem.name"
                        draggable="true"
                        @mouseenter="enter(subItem)"
                        @mouseleave="leave(subItem)"
                        @mousemove="moveBG(subItem.name)"
                        @dragstart.stop="MouseDragStart(subItem);"
                        @dragend.stop="MouseDragEnd"
                    >
                        <div class="image">
                            <img v-bind:src="subItem.imgUrl" v-bind:id="subItem.name" class="img" />
                        </div>
                        <div
                            v-show="subItem.issubShow"
                            class="hover_con"
                            v-bind:style="positionsty"
                        >
                            <img v-bind:src="subItem.imgUrl" v-bind:style="newimg" />
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import html2canvas from "html2canvas";
    import canvg from "canvg";
    import * as qiniu from 'qiniu-js'
export default {
    name: "components-store-side-bar",
    props: {
        height: {
            type: Number
        }
    },
    mounted() {
        this.UMLType = this.$store.state.UML.UMLType;
        //console.log(this.UMLType);
    },
    data() {
        return {
            universal: "UNIVERSAL_DIAGRAM",
            UMLType: "",
            cdrag: false,
            ldrag: false,
            scrollheight: 0,
            activeNames: ["1"],
            searchresult: false,
            Search: "",
            imgURL: "",
            type: "",
            name: "",
            w: "",
            h: "",
            cursorToLeft: 0,
            cursorToRight: 0,
            prop: " ",
            newimg: {
                width: "150px",
                height: "150px",
                margin: "15px 15px"
            },
            positionsty: {
                width: "180px",
                height: "180px",
                background: "white",
                position: "fixed",
                border: "solid 1px grey",
                borderradius: "30px",
                top: "",
                left: ""
            },
            menuList: [
                {
                    name: "UML状态图",
                    value: "STATE_DIAGRAM",
                    isSubShow: false,
                    subItems: [
                        {
                            name: "state-object",
                            Cname: "对象",
                            issubShow: false,
                            width: 120,
                            height: 90,
                            imgUrl: require("../../assets/icons/state/object.png"),
                            properties: {
                                name: "object"
                            }
                        },
                        {
                            name: "state-state",
                            width: 120,
                            height: 90,
                            Cname: "状态",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/state.png"),
                            properties: {
                                name: "state"
                            }
                        },
                        {
                            name: "state-start",
                            width: 60,
                            height: 60,
                            Cname: "开始",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/begin.png"),
                            properties: {}
                        },
                        {
                            name: "state-end",
                            width: 60,
                            height: 60,
                            Cname: "结束",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/end.png"),
                            properties: {}
                        },
                        {
                            name: "state-streamEnd",
                            width: 60,
                            height: 60,
                            Cname: "流终止",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/streamEnd.png"),
                            properties: {}
                        },
                        {
                            name: "state-history",
                            width: 60,
                            height: 60,
                            Cname: "历史",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/history.png"),
                            properties: {}
                        },
                        {
                            name: "state-detailedHistory",
                            width: 60,
                            height: 60,
                            Cname: "详细历史",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/detailedHistory.png"),
                            properties: {}
                        },
                        {
                            name: "state-msgSender",
                            width: 170,
                            height: 90,
                            Cname: "发送信号",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/msgSender.png"),
                            properties: {
                                name: "msg sender"
                            }
                        },
                        {
                            name: "state-msgReceiver",
                            width: 170,
                            height: 90,
                            Cname: "接收信号",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/msgReceiver.png"),
                            properties: {
                                name: "msg receiver"
                            }
                        },
                        {
                            name: "state-fork",
                            width: 60,
                            height: 60,
                            Cname: "分支",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/fork.png"),
                            properties: {}
                        },
                        {
                            name: "state-synchronizer",
                            width: 140,
                            height: 40,
                            Cname: "同步",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/synchronizer.png"),
                            properties: {}
                        },
                        {
                            name: "state-verticalLane",
                            width: 135,
                            height: 280,
                            Cname: "泳道（垂直）",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/verticalLane.png"),
                            properties: {
                                name: "vertical lane"
                            }
                        },
                        {
                            name: "state-horizontalLane",
                            width: 280,
                            height: 135,
                            Cname: "泳道（水平）",
                            issubShow: false,
                            imgUrl: require("../../assets/icons/state/horizontalLane.png"),
                            properties: {
                                name: "horizontal lane"
                            }
                        }
                    ]
                },
                {
                    name: "UML顺序图",
                    value: "SEQUENCE_DIAGRAM",
                    isSubShow: false,
                    subItems: [
                        {
                            name: "Sequence-Activation",
                            Cname: "激活",
                            issubShow: false,
                            width: 40,
                            height: 200,
                            imgUrl: require("../../assets/icons/sequence/Activation.png"),
                            properties: {}
                        },
                        {
                            name: "Sequence-LifeLine",
                            Cname: "生命线",
                            issubShow: false,
                            width: 160,
                            height: 500,
                            imgUrl: require("../../assets/icons/sequence/Lifeline.png"),
                            properties: {
                                name: "life1"
                            }
                        },
                        {
                            name: "Sequence-Delete",
                            Cname: "删除",
                            issubShow: false,
                            width: 30,
                            height: 30,
                            imgUrl: require("../../assets/icons/sequence/Delete.png"),
                            properties: {}
                        }
                    ]
                },
                {
                    name: "UML用例图",
                    value: "USECASE_DIAGRAM",
                    isSubShow: false,
                    subItems: [
                        {
                            name: "Usecase-Character",
                            Cname: "角色",
                            issubShow: false,
                            width: 100,
                            height: 100,
                            imgUrl: require("../../assets/icons/usecase/Character.png"),
                            properties: {
                                name: "character"
                            }
                        },
                        {
                            name: "Usecase-Container",
                            Cname: "容器",
                            issubShow: false,
                            width: 300,
                            height: 500,
                            imgUrl: require("../../assets/icons/usecase/Container2.png"),
                            properties: {}
                        },
                        {
                            name: "Usecase-UseCase",
                            Cname: "用例",
                            issubShow: false,
                            width: 160,
                            height: 60,
                            imgUrl: require("../../assets/icons/usecase/UseCase.png"),
                            properties: {
                                name: "usercase1"
                            }
                        }
                    ]
                },
                {
                    name: "UML类图",
                    value: "CLASS_DIAGRAM",
                    isSubShow: false,
                    subItems: [
                        /*{
                            name: 'Class-Simple',
                            Cname: '简单类',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/Class/Simple.png'),
                        },{
                            name: 'Class-Interfaceandclass',
                            Cname: '接口和类',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/Class/Interfaceandclass.png'),
                        },*/
                        {
                            name: "Class-Class",
                            Cname: "类",
                            issubShow: false,
                            width: 200,
                            height: 200,
                            imgUrl: require("../../assets/icons/class/Class.png"),
                            properties: {
                                className: "someClass",
                                classType: "abstract", // e.g. abstract
                                variables: [
                                    {
                                        modifier: "public",
                                        dataType: "boolean",
                                        name: "var1"
                                    },
                                    {
                                        modifier: "public",
                                        dataType: "char",
                                        name: "var2"
                                    }
                                ], // mock data
                                functions: [
                                    {
                                        modifier: "public",
                                        dataType: "int",
                                        name: "func",
                                        params: "int count"
                                    }
                                ]
                            }
                        },
                        /*{
                            name: 'Class-Activity',
                            Cname: '活动类',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/Class/Activity.png'),
                        },{
                            name: 'Class-Multiple',
                            Cname: '多例类',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/Class/Multiple.png'),
                        },
                        */ {
                            name: "Class-Interface",
                            Cname: "接口",
                            issubShow: false,
                            width: 200,
                            height: 100,
                            imgUrl: require("../../assets/icons/class/Interface.png"),
                            properties: {
                                name: "interface"
                            }
                        },
                        {
                            name: "Class-Constraint",
                            Cname: "约束",
                            issubShow: false,
                            width: 200,
                            height: 150,
                            imgUrl: require("../../assets/icons/class/Constraint.png"),
                            properties: {
                                name: "constraint"
                            }
                        }
                    ]
                },
                {
                    name: "UML部署图",
                    value: "DEPLOYMENT_DIAGRAM",
                    isSubShow: false,
                    subItems: [
                        {
                            name: "Deployment-Node",
                            Cname: "节点",
                            issubShow: false,
                            width: 170,
                            height: 130,
                            imgUrl: require("../../assets/icons/deployment/Node.png"),
                            properties: {
                                name: "node",
                                isInstance: true
                            }
                        },
                        {
                            name: "Deployment-DiagramComponent",
                            Cname: "实例化组件",
                            issubShow: false,
                            width: 170,
                            height: 130,
                            imgUrl: require("../../assets/icons/deployment/DiagramComponent.png"),
                            properties: {
                                name: "component",
                                isInstance: true
                            }
                        }
                    ]
                },
                {
                    name: "UML组件图",
                    value: "COMPONENT_DIAGRAM",
                    isSubShow: false,
                    subItems: [
                        {
                            name: "Component-ComponentInterface",
                            Cname: "接口",
                            issubShow: false,
                            width: 120,
                            height: 90,
                            imgUrl: require("../../assets/icons/component/ComponentInterface.png"),
                            properties: {
                                name: "component interface"
                            }
                        }
                    ]
                },
                {
                    name: "实体关系图",
                    value: "ER_DIAGRAM",
                    isSubShow: false,
                    subItems: [
                        {
                            name: "Er-Entity",
                            Cname: "实体",
                            issubShow: false,
                            width: 120,
                            height: 90,
                            imgUrl: require("../../assets/icons/er/Entity.png"),
                            properties: {
                                name: "entity",
                                isWeak: false
                            }
                        },
                        {
                            name: "Er-Attribute",
                            Cname: "属性",
                            issubShow: false,
                            width: 120,
                            height: 90,
                            imgUrl: require("../../assets/icons/er/Attribute.png"),
                            properties: {
                                name: "attribute",
                                isWeak: false
                            }
                        },
                        {
                            name: "Er-Relationship",
                            Cname: "关系",
                            issubShow: false,
                            width: 120,
                            height: 90,
                            imgUrl: require("../../assets/icons/er/Relationship.png"),
                            properties: {
                                name: "relationship",
                                isWeak: false
                            }
                        }
                    ]
                },
                {
                    name: "UML通用图",
                    value: "UNIVERSAL_DIAGRAM",
                    isSubShow: false,
                    subItems: [
                        {
                            name: "Universal-Package",
                            Cname: "包",
                            issubShow: false,
                            width: 120,
                            height: 90,
                            imgUrl: require("../../assets/icons/universal/Package.png"),
                            properties: {
                                name: "package"
                            }
                        },
                        {
                            name: "Universal-Composition",
                            Cname: "组合片段",
                            issubShow: false,
                            width: 200,
                            height: 150,
                            imgUrl: require("../../assets/icons/universal/Composition.png"),
                            properties: {
                                name: "composition"
                            }
                        },
                        {
                            name: "Universal-Comment",
                            Cname: "注释",
                            issubShow: false,
                            width: 120,
                            height: 90,
                            imgUrl: require("../../assets/icons/universal/Comment.png"),
                            properties: {
                                name: "comment"
                            }
                        }
                    ]
                }
            ],
            searchList: []
        };
    },
    methods: {
        searchimg() {
            var imgname = this.Search;
            for (var i = 0; i < this.menuList.length; i++) {
                for (var j = 0; j < this.menuList[i].subItems.length; j++) {
                    if (
                        this.menuList[i].subItems[j].Cname.indexOf(
                            imgname.toString()
                        ) != -1
                    ) {
                        //console.log(this.menuList[i].subItems[j]);
                        this.searchList.push(this.menuList[i].subItems[j]);
                        this.searchresult = true;
                    }
                }
            }
        },
        handleChange(val) {
            console.log(val);
        },
        showToggle: function(item, ind) {
            this.menuList.forEach(i => {
                if (i.isSubShow !== this.menuList[ind].isSubShow) {
                    i.isSubShow = false;
                }
            });
            item.isSubShow = !item.isSubShow;
            console.log(item.name);
        },
        enter(item) {
            item.issubShow = true;
        },
        leave(subitem) {
            console.log(subitem.Cname);
            subitem.issubShow = false;
            this.name = subitem.name.split("-")[1];
            this.type =
                subitem.name
                    .split("-")[1]
                    .charAt(0)
                    .toUpperCase() + subitem.name.split("-")[1].slice(1);
            this.w = subitem.width;
            this.h = subitem.height;
            this.prop = subitem.properties;
        },
        MouseDragStart(subItem) {
            console.log("MouseDragStart");
            this.cdrag = this.$store.state.canvasdrage;
            this.$store.state.canvasdrage = false;
            this.ldrag = this.$store.state.linedrag;
            this.$store.state.linedrag = false;
            console.log(
                "this.$store.state.canvasdrage:" + this.$store.state.canvasdrage
            );
            this.leave(subItem);
        },
        MouseDragEnd(event) {
            console.log("MouseDragEnd");
            //判断是否已在画布中
            console.log(this.cdrag);
            var canv = document.getElementById("canvas").childNodes[0];
            var length = this.$store.state.UML.nodes.length;
            var side = document.getElementById("side");
            var newid;
            if (length != 0) {
                newid =
                    parseInt(this.$store.state.UML.nodes[length - 1].id) +
                    1 +
                    "";
            } else {
                newid = "1";
            }
            console.log("newid:" + newid);
            var canv = document.getElementById("canvas").childNodes[0];
            var c = {
                l: canv.offsetLeft + canv.clientLeft,
                t: canv.offsetTop + canv.clientTop
            };
            var e = {
                x: event.clientX,
                y: event.clientY
            };
            if (e.x > 0 && e.y > 0) {
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy";
                var addcom = {
                    id: newid,
                    type: this.type,
                    styles: {
                        width: this.w,
                        height: this.h,
                        left: e.x - this.w / 2,
                        top: e.y + document.documentElement.scrollTop
                    },
                    properties: this.prop
                };
                console.log(addcom);
                this.$store.dispatch("addNode", addcom);
                //this.$store.state.UML.nodes.push(addcom);
                //alert("tianjiacheng");
            }
            this.$store.state.canvasdrage = this.cdrag;
            this.$store.state.linedrag = this.ldrag;
            //console.log("this.$store.state.canvasdrage:"+this.$store.state.canvasdrage);
            //console.log("this.$store.state.UML.nodes:"+this.$store.state.UML.nodes);
            this.showMenu = false;
        },
        moveBG(name) {
            var canvas = document.getElementById("canvas");
            var image = document.getElementById(name);
            console.log(name);
            //alert(image.offsetHeight);
            //alert(image.offsetWidth);
            var c = {
                x: image.getBoundingClientRect().left,
                y: image.getBoundingClientRect().top
            };
            //alert(name.toString().split('-')[0]);
            //alert(name);
            //console.log(menu.offsetWidth);
            //console.log(c.y);
            this.positionsty.left = canvas.childNodes[0].offsetLeft + "px";
            this.positionsty.top = c.y + "px";
            //this.newimg.left=c.x+'px';
            //this.newimg.right=c.y+'px';
            //alert(c.y);
            //alert(image.getBoundingClientRect().left);
            //alert(image.getBoundingClientRect().right);
            //alert(image.getBoundingClientRect().top);
            //alert(image.getBoundingClientRect().bottom);
        },
    },
    watch: {
        Search: function() {
            if (this.Search == "") {
                while (this.searchList.length != 0) {
                    this.searchList.pop();
                }
                console.log(this.searchList);
                this.searchresult = false;
            }
        }
    }
};
</script>

<style scoped>
#top {
    margin-top: 20px;
    margin-bottom: 15px;
    margin-left: 2%;
    margin-right: 2%;
}

#asideBox {
    width: 100%;
    display: block;
}

#sidemenu {
    margin-left: 5%;
    overflow-y: auto;
    margin-bottom: 5%;
    height: 150px;
}

#searchbutton {
    cursor: pointer; /*鼠标悬停变小手*/
}

.image {
    display: inline-block;
    width: auto;
    height: 50px;
    margin: 0 2% 2% 0;
    outline: none;
    float: left;
}

.img {
    display: block;
    width: 45px;
    height: 45px;
    flex-wrap: wrap;
}

/*
    #Object{
        display:flex;
        width:50px;
        height:34px;
        flex-wrap:wrap;
    }
    #Entity{
        display:flex;
        width:34px;
        height:34px;
        flex-wrap:wrap;
    }
    #Control{
        display:flex;
        width:34px;
        height:36px;
        flex-wrap:wrap;
    }
    #Bind {
        display: flex;
        width: 34px;
        height: 34px;
        flex-wrap: wrap;
    }
    #Timesignal{
        display:flex;
        width:34px;
        height:34px;
        flex-wrap:wrap;
    }
    #Constraint{
        display:flex;
        width:34px;
        height:34px;
        flex-wrap:wrap;
    }
    #Activation{
        display:flex;
        width:34px;
        height:34px;
        flex-wrap:wrap;
    }
    #Lifeline{
        display:flex;
        width:34px;
        height:34px;
        flex-wrap:wrap;
    }
    #Delete{
        display:block;
        width:45px;
        height:45px;
    }
    #state-object{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-state{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-start{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-end{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-streamEnd{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-history{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-detailedHistory{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-msgSender{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-msgReceiver{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-fork{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-synchronizer{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-container{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-verticalLane{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    #state-horizontalLane{
        display:block;
        width:45px;
        height:45px;
        flex-wrap:wrap;
    }
    */
</style>