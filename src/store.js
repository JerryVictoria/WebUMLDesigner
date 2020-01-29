import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    //store对象
    state: {
        editing: false, //是否正在处于编辑状态（禁用其他功能）
        editingId: "", //当前编辑组件（显示功能）
        autoId: 100, // max of all TODO init
        UML: {
            //mock data
            UMLType: "CLASS_DIAGRAM",
            UMLId: "",
            userId: "",
            groupId: "",
            nodes: [{
                    id: "1", //唯一
                    type: "Class",
                    styles: {
                        width: 200,
                        height: 200,
                        left: 100,
                        top: 200
                    },
                    properties: {
                        className: "someClass1",
                        classType: "abstract", // e.g. abstract
                        variables: [{
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
                        functions: [{
                            modifier: "public",
                            dataType: "int",
                            name: "func",
                            params: "int count"
                        }]
                    }
                },
                {
                    id: "2", //唯一
                    type: "Class",
                    styles: {
                        width: 200,
                        height: 200,
                        left: 100,
                        top: 500
                    },
                    properties: {
                        className: "someClass2",
                        classType: "normal",
                        variables: [{
                                modifier: "public",
                                dataType: "boolean",
                                name: "var1",
                                propId: 0
                            },
                            {
                                modifier: "public",
                                dataType: "char",
                                name: "var2",
                                propId: 1
                            }
                        ], // mock data
                        functions: [{
                            modifier: "public",
                            dataType: "int",
                            name: "func",
                            params: "int count",
                            propId: 0
                        }]
                    }
                },
                {
                    id: "3",
                    type: "Character",
                    styles: {
                        width: 100,
                        height: 100,
                        left: 800,
                        top: 200
                    },
                    properties: {
                        name: "character1"
                    }
                },
                {
                    id: "4",
                    type: "Character",
                    styles: {
                        width: 100,
                        height: 100,
                        left: 500,
                        top: 50
                    },
                    properties: {
                        name: "character2"
                    }
                },
                {
                    id: "5",
                    type: "Container",
                    styles: {
                        width: 300,
                        height: 500,
                        left: 500,
                        top: 200
                    },
                    properties: {}
                },
                {
                    id: "6",
                    type: "UseCase",
                    styles: {
                        width: 160,
                        height: 60,
                        left: 520,
                        top: 240
                    },
                    properties: {
                        name: "usercase1"
                    }
                },
                {
                    id: "7",
                    type: "LifeLine",
                    styles: {
                        width: 160,
                        height: 500,
                        left: 920,
                        top: 240
                    },
                    properties: {
                        name: "life1"
                    }
                },
                {
                    id: "8",
                    type: "Activation",
                    styles: {
                        width: 40,
                        height: 200,
                        left: 980,
                        top: 340
                    },
                    properties: {}
                },
                {
                    id: "9",
                    type: "Interface",
                    styles: {
                        width: 200,
                        height: 100,
                        left: 980,
                        top: 100
                    },
                    properties: {
                        name: "interface"
                    }
                },
                {
                    id: "10",
                    type: "Start",
                    styles: {
                        width: 50,
                        height: 40,
                        left: 1180,
                        top: 340
                    },
                    properties: {}
                },
                {
                    id: "11",
                    type: "End",
                    styles: {
                        width: 50,
                        height: 40,
                        left: 1180,
                        top: 440
                    },
                    properties: {}
                },
                {
                    id: "12",
                    type: "Object",
                    styles: {
                        width: 150,
                        height: 40,
                        left: 1380,
                        top: 440
                    },
                    properties: {
                        name: "object"
                    }
                },
                {
                    id: "13",
                    type: "State",
                    styles: {
                        width: 150,
                        height: 40,
                        left: 1380,
                        top: 240
                    },
                    properties: {
                        name: "state"
                    }
                },
                {
                    id: "14",
                    type: "StreamEnd",
                    styles: {
                        width: 40,
                        height: 40,
                        left: 1180,
                        top: 540
                    },
                    properties: {}
                },
                {
                    id: "15",
                    type: "History",
                    styles: {
                        width: 40,
                        height: 40,
                        left: 1180,
                        top: 640
                    },
                    properties: {}
                },
                {
                    id: "16",
                    type: "DetailedHistory",
                    styles: {
                        width: 40,
                        height: 40,
                        left: 1180,
                        top: 740
                    },
                    properties: {}
                },
                {
                    id: "17",
                    type: "MsgSender",
                    styles: {
                        width: 200,
                        height: 50,
                        left: 1580,
                        top: 140
                    },
                    properties: {
                        name: "msg sender"
                    }
                },
                {
                    id: "18",
                    type: "MsgReceiver",
                    styles: {
                        width: 200,
                        height: 50,
                        left: 1580,
                        top: 200
                    },
                    properties: {
                        name: "msg receiver"
                    }
                },
                {
                    id: "19",
                    type: "Fork",
                    styles: {
                        width: 100,
                        height: 50,
                        left: 1580,
                        top: 280
                    },
                    properties: {}
                },
                {
                    id: "20",
                    type: "Synchronizer",
                    styles: {
                        width: 150,
                        height: 30,
                        left: 1580,
                        top: 380
                    },
                    properties: {}
                },
                {
                    id: "21",
                    type: "VerticalLane",
                    styles: {
                        width: 150,
                        height: 300,
                        left: 1580,
                        top: 480
                    },
                    properties: {
                        name: "vertical lane"
                    }
                },
                {
                    id: "22",
                    type: "HorizontalLane",
                    styles: {
                        width: 300,
                        height: 150,
                        left: 1380,
                        top: 580
                    },
                    properties: {
                        name: "horizontal lane"
                    }
                },
                {
                    id: "23",
                    type: "Constraint",
                    styles: {
                        width: 200,
                        height: 150,
                        left: 20,
                        top: 20
                    },
                    properties: {
                        name: "constraint"
                    }
                },
                {
                    id: "24",
                    type: "Delete",
                    styles: {
                        width: 30,
                        height: 30,
                        left: 250,
                        top: 100
                    },
                    properties: {}
                },
                {
                    id: "25",
                    type: "DiagramComponent",
                    styles: {
                        width: 170,
                        height: 130,
                        left: 310,
                        top: 110
                    },
                    properties: {
                        name: "component",
                        isInstance: true
                    }
                },
                {
                    id: "26",
                    type: "Node",
                    styles: {
                        width: 170,
                        height: 130,
                        left: 310,
                        top: 250
                    },
                    properties: {
                        name: "node",
                        isInstance: true
                    }
                },
                {
                    id: "27",
                    type: "ComponentInterface",
                    styles: {
                        width: 170,
                        height: 130,
                        left: 310,
                        top: 450
                    },
                    properties: {
                        name: "component interface"
                    }
                }
            ],
            lines: [{
                id: "",
                relationType: "",
                fromId: "",
                toId: "",
                styles: {
                    color: "",
                    lineType: "", //虚线之类的
                    lineThickness: "", //固定几种
                    left: 0,
                    top: 0
                }
            }]
        },
        histories: [] //循环队列实现
    },
    mutations: {
        //初始化图数据/多人协作同步图数据
        setUML(state, params) {},
        //增加节点数据
        addNode(state, params) {},
        //增加线条数据
        addLine(state, params) {},
        //删除节点数据
        removeNode(state, params) {
            for (var i = 0; i < state.UML.nodes.length; i++) {
                if (state.UML.nodes[i].id == params.id) {
                    state.UML.nodes.splice(i, 1);
                    break;
                }
            }
        },
        //删除线条数据
        removeLine(state, params) {},
        //修改节点数据
        modifyNode(state, params) {
            console.log("modifyNode", params);
            //TODO如果修改数值和上一次一样，记录为未修改
            var modifiedFlag = false;
            for (var i = 0, l = state.UML.nodes.length; i < l; i++) {
                if (state.UML.nodes[i].id == params.id) {
                    if (state.UML.nodes[i][params.nodeKey][params.key] != params.value) {
                        modifiedFlag = true;
                        state.UML.nodes[i][params.nodeKey][params.key] = params.value;
                    }
                    break;
                }
            }
            //TODO历史记录
            if (!modifiedFlag) {
                console.log("no change");
                return;
            }
        },
        //删除类节点属性
        deleteClassNodeProp(state, params) {
            for (var i = 0, l = state.UML.nodes.length; i < l; i++) {
                if (state.UML.nodes[i].id == params.id) {
                    var arr = state.UML.nodes[i]["properties"][params.contentType];
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j].propId == params.propId) {
                            arr.splice(j, 1);
                            return;
                        }
                    }
                }
            }
        },
        //修改类节点属性
        changeClassNodeProp(state, params) {
            var addProps = i => {
                if (params.contentType == "functions") {
                    state.UML.nodes[i]["properties"][params.contentType].push({
                        modifier: params.modifier,
                        dataType: params.dataType,
                        name: params.name,
                        params: params.params ? params.params : "",
                        propId: state.autoId
                    });
                } else {
                    state.UML.nodes[i]["properties"][params.contentType].push({
                        modifier: params.modifier,
                        dataType: params.dataType,
                        name: params.name,
                        propId: state.autoId
                    });
                }
                state.autoId++;
            };
            for (var i = 0, l = state.UML.nodes.length; i < l; i++) {
                if (state.UML.nodes[i].id == params.id) {
                    if (params.addFlag) {
                        //新增属性
                        addProps(i);
                        return;
                    }
                    if (params.originContentType == params.contentType) {
                        //相同则直接修改属性
                        var arr = state.UML.nodes[i]["properties"][params.contentType];
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].propId == params.propId) {
                                arr[j].modifier = params.modifier;
                                arr[j].dataType = params.dataType;
                                arr[j].name = params.name;
                                if (params.contentType == "functions") {
                                    arr[j].params = params.params ? params.params : "";
                                }
                                return;
                            }
                        }
                    } else {
                        var arrOrigin = state.UML.nodes[i]["properties"][params.originContentType];
                        //删除
                        for (j = 0; j < arrOrigin.length; j++) {
                            if (arrOrigin[j].propId == params.propId) {
                                arrOrigin.splice(j, 1);
                            }
                        }
                        //增加
                        addProps(i);
                    }
                }
            }
        },
        //修改线条数据
        modifyLine(state, params) {},
        //修改历史数组
        changeHistories(state, params) {},
        //后退
        backward(state) {},
        //前进
        forward(state) {},
        setEditState(state, params) {
            //console.log("setEditState");
            state.editing = params.editing;
        },
        setEditId(state, params) {
            console.log("setEditId", params);
            state.editingId = params.id;
        }
    },
    actions: {}
});