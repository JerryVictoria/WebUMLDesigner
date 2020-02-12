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
                    id: "29",
                    type: "Attribute",
                    styles: {
                        width: 200,
                        height: 100,
                        left: 100,
                        top: 100
                    },
                    properties: {
                        name: "attribute",
                        propType: "multivalue"
                    }
                },
                {
                    id: "30",
                    type: "Relationship",
                    styles: {
                        width: 200,
                        height: 100,
                        left: 100,
                        top: 300
                    },
                    properties: {
                        name: "relationship",
                        isWeak: true
                    }
                },
                {
                    id: "31",
                    type: "Package",
                    styles: {
                        width: 200,
                        height: 100,
                        left: 400,
                        top: 100
                    },
                    properties: {
                        name: "package"
                    }
                },
                {
                    id: "32",
                    type: "Comment",
                    styles: {
                        width: 200,
                        height: 100,
                        left: 400,
                        top: 200
                    },
                    properties: {
                        name: "comment"
                    }
                },
                {
                    id: "33",
                    type: "Composition",
                    styles: {
                        width: 250,
                        height: 120,
                        left: 400,
                        top: 300
                    },
                    properties: {
                        compositionType: "Opt",
                        condition: "condition"
                    }
                }
            ],
            lines: [{
                id: "1",
                relationType: "xbrokrn",
                fromId: "29",
                toId: "30",
                startposition:{
                    left:0,
                    top:0,
                    arrow:"",
                },
                endpostion:{
                    left:250,
                    top:250,
                    arrow:"",
                },
                styles: {
                    stroke:"rgb(255,0,0)",
                    strokeDasharray:"5,5", //虚线之类的
                    strokeWidth:"10", //固定几种
                }
            },
                {
                    id: "2",
                    relationType: "xbrokrn",
                    fromId: "29",
                    toId: "30",
                    startposition:{
                        left:10,
                        top:10,
                        arrow:"",
                    },
                    endpostion:{
                        left:200,
                        top:200,
                        arrow:"",
                    },
                    styles: {
                        stroke:"rgb(255,0,0)",
                        strokeDasharray:"1,1", //虚线之类的
                        strokeWidth:"2", //固定几种
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
        //专门用于移动结点[移动的过程]
        moveNode(state, params) {
            for (var i = 0, l = state.UML.nodes.length; i < l; i++) {
                if (state.UML.nodes[i].id == params.id) {
                    state.UML.nodes[i].styles.left = params.left;
                    state.UML.nodes[i].styles.top = params.top;
                    console.log("move node");
                    break;
                }
            }
        },
        //修改节点数据
        modifyNode(state, params) {
            console.log("modifyNode", params);
            //TODO如果修改数值和上一次一样，记录为未修改
            var modifiedFlag = false;
            for (var i = 0, l = state.UML.nodes.length; i < l; i++) {
                if (state.UML.nodes[i].id == params.id) {
                    if (
                        state.UML.nodes[i][params.nodeKey][params.key] !=
                        params.value
                    ) {
                        modifiedFlag = true;
                        state.UML.nodes[i][params.nodeKey][params.key] =
                            params.value;
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
                    var arr =
                        state.UML.nodes[i]["properties"][params.contentType];
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
                        var arr =
                            state.UML.nodes[i]["properties"][
                                params.contentType
                            ];
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].propId == params.propId) {
                                arr[j].modifier = params.modifier;
                                arr[j].dataType = params.dataType;
                                arr[j].name = params.name;
                                if (params.contentType == "functions") {
                                    arr[j].params = params.params ?
                                        params.params :
                                        "";
                                }
                                return;
                            }
                        }
                    } else {
                        var arrOrigin =
                            state.UML.nodes[i]["properties"][
                                params.originContentType
                            ];
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