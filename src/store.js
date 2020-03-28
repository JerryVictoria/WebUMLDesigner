import Vue from "vue";
import Vuex from "vuex";
import axios from './httpConfig/url_config'
import html2canvas from "html2canvas";
import canvg from "canvg";
import * as qiniu from 'qiniu-js'
Vue.use(Vuex);

export default new Vuex.Store({
    //store对象
    state: {
        canvasdrage: false,
        sidedrag: false,
        linedrag: false,
        editing: false, //是否正在处于编辑状态（禁用其他功能）
        editingId: "", //当前编辑组件（显示功能）
        lineEditing: false,
        drawLine: false,
        lineType: "",
        lineStyle: "",
        lineColor: "",
        lineSize: "",
        lineSA: "",
        lineEA: "",
        lineEditId: "",
        Token: "",
        refreshTime: 0,
        autoId: 100, // max of all TODO init
        UML: {
            //mock data
            UMLType: "USECASE_DIAGRAM",
            UMLId: "",
            UMLName: "",
            userId: "",
            groupId: "",
            nodes: [],
            lines: [],

        },
        histories: [] //循环队列实现
    },
    mutations: {
        setuserId(state, params) {
            state.UML.userId = params.id;
            console.log(("store:" + state.UML.userId));
        },
        setUMLId(state, params) {
            state.UML.UMLId = params.id;
        },
        setGroupId(state, params) {
            state.UML.groupId = params.groupId;
        },
        setUMLName(state, params) {
            state.UML.UMLName = params.name;
        },
        setUMLType(state, params) {
            state.UML.UMLType = params.type;
        },
        //初始化图数据/多人协作同步图数据
        setUML(state, params) {},
        setUMLNodes(state, params) {
            state.UML.nodes = [];
            var nodes = params.nodeList;
            for (var i = 0; i < nodes.length; i++) {
                state.UML.nodes.push({
                    id: nodes[i].nid,
                    type: nodes[i].nodeType,
                    styles: {
                        left: nodes[i].nodeStyle.styleLeft,
                        top: nodes[i].nodeStyle.styleTop,
                        width: nodes[i].nodeStyle.styleWidth,
                        height: nodes[i].nodeStyle.styleHeight
                    },
                    properties: nodes[i].properties
                });
            }
        },
        setUMLLines(state, params) {
            state.UML.lines = [];
            var lines = params.lineList;
            for (var i = 0; i < lines.length; i++) {
                state.UML.lines.push({
                    Id: lines[i].lineId,
                    lid: lines[i].lid,
                    svgId: "svg" + lines[i].lineId,
                    lineId: "line" + lines[i].lineId,
                    relationType: lines[i].relationType,
                    from: lines[i].fromId + "",
                    to: lines[i].toId + "",
                    text: lines[i].text,
                    markerstart: 'url(#arrow2)',
                    markerend: 'url(#arrow1)',
                    lineList: lines[i].lineList,
                    startPosition: {
                        left: parseInt(lines[i].startPosition.lpLeft),
                        top: parseInt(lines[i].startPosition.lpTop),
                        direction: "",
                    },
                    endPosition: {
                        left: parseInt(lines[i].endPosition.lpLeft),
                        top: parseInt(lines[i].endPosition.lpTop),
                        direction: ""
                    },
                    lineStyle: {
                        stroke: lines[i].lineStyle.stroke,
                        strokeDasharray: lines[i].lineStyle.strokeDasharray, //虚线之类的
                        strokeWidth: lines[i].lineStyle.strokeWidth //固定几种
                    },
                    lineSvgStyle: {
                        position: lines[i].lineSvgStyle.svgPosition,
                        width: lines[i].lineSvgStyle.svgWidth,
                        height: lines[i].lineSvgStyle.svgHeight,
                        left: lines[i].lineSvgStyle.svgLeft,
                        top: lines[i].lineSvgStyle.svgTop,
                    },
                });
            }
        },
        setDrawLine(state, params) {
            //console.log("setEditState");
            state.drawLine = params.drawLine;
        },
        setEditState(state, params) {
            //console.log("setEditState");
            state.editing = params.editing;
        },
        setEditId(state, params) {
            console.log("setEditId", params);
            state.editingId = params.id;
        },
        setLineEditState(state, params) {
            //console.log("setEditState");
            state.lineEditing = params.lineEditing;
        },
        setLineEditId(state, params) {
            console.log("setLineEditId", params);
            state.lineEditId = params.id;
        },
        //初始化线条颜色
        setLineColor(state, params) {
            console.log("setLineColor", params);
            state.lineColor = params.lineColor;
        },
        //初始化线条类型
        setLineType(state, params) {
            console.log("setLineType", params);
            state.lineType = params.lineType;
        },
        //初始化线条样式
        setLineStyle(state, params) {
            console.log("setLineStyle", params);
            state.lineStyle = params.lineStyle;
        },
        //初始化线条宽度
        setLineSize(state, params) {
            console.log("setLineSize", params);
            state.lineSize = params.lineSize;
        },
        //初始化线条开端样式
        setLineSA(state, params) {
            console.log("setLineSA", params);
            state.lineSA = params.lineSA;
        },
        //初始化线条终端样式
        setLineEA(state, params) {
            console.log("setLineEA", params);
            state.lineEA = params.lineEA;
        },
        setToken(state, params) {
            state.Token = params.Token;
            //alert("setToken"+state.Token);
        },
        setRefreshTime(state, params) {
            state.refreshTime = params.refreshTime;
            //alert("setToken"+state.Token);
        },
        //增加节点数据
        addNode(state, params) {
            //console.log("params:"+state.UML.nodes);
            state.UML.nodes.push(params);
        },
        //增加线条数据
        addLine(state, params) {
            state.UML.lines.push(params);
            console.log("lineslength" + state.UML.lines.length);
        },
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
        removeLine(state, params) {
            for (var i = 0; i < state.UML.lines.length; i++) {
                if (state.UML.lines[i].lid == params.id) {
                    state.UML.lines.splice(i, 1);
                    //alert("down")
                    break;
                }
            }
        },
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
                    if (params.key instanceof Array) {
                        for (var j = 0, keylen = params.key.length; j < keylen; j++) {
                            if (state.UML.nodes[i][params.nodeKey][params.key[j]] != params.value[j]) {
                                modifiedFlag = true;
                                state.UML.nodes[i][params.nodeKey][params.key[j]] = params.value[j];
                            }
                        }
                    } else {
                        if (state.UML.nodes[i][params.nodeKey][params.key] != params.value) {
                            modifiedFlag = true;
                            state.UML.nodes[i][params.nodeKey][params.key] = params.value;
                        }
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
        //增加类节点属性
        addClassNodeProp(state, params) {
            console.log("addClassNodeProp");
            var addProps = i => {
                if (params.contentType == "functions") {
                    state.UML.nodes[i]["properties"][params.contentType].push({
                        modifier: params.modifier,
                        dataType: params.dataType,
                        name: params.name,
                        params: params.params ? params.params : "",
                        vid: params.vid
                    });
                } else {
                    state.UML.nodes[i]["properties"][params.contentType].push({
                        modifier: params.modifier,
                        dataType: params.dataType,
                        name: params.name,
                        vid: params.vid
                    });
                }
            };
            for (var i = 0, l = state.UML.nodes.length; i < l; i++) {
                if (state.UML.nodes[i].id == params.id) {
                    addProps(i);
                    return;
                }
            }
        },
        //删除类节点属性
        deleteClassNodeProp(state, params) {
            console.log("deleteClassNodeProp");
            for (var i = 0, l = state.UML.nodes.length; i < l; i++) {
                if (state.UML.nodes[i].id == params.id) {
                    var arr = state.UML.nodes[i]["properties"][params.contentType];
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j].vid == params.vid) {
                            arr.splice(j, 1);
                            return;
                        }
                    }
                }
            }
        },
        //修改类节点属性
        changeClassNodeProp(state, params) {
            console.log("changeClassNodeProp");
            var addProps = i => {
                if (params.contentType == "functions") {
                    state.UML.nodes[i]["properties"][params.contentType].push({
                        modifier: params.modifier,
                        dataType: params.dataType,
                        name: params.name,
                        params: params.params ? params.params : "",
                        vid: params.vid
                    });
                } else {
                    state.UML.nodes[i]["properties"][params.contentType].push({
                        modifier: params.modifier,
                        dataType: params.dataType,
                        name: params.name,
                        vid: params.vid
                    });
                }
            };
            for (var i = 0, l = state.UML.nodes.length; i < l; i++) {
                if (state.UML.nodes[i].id == params.id) {
                    if (params.originContentType == params.contentType) {
                        //相同则直接修改属性
                        var arr = state.UML.nodes[i]["properties"][params.contentType];
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].vid == params.vid) {
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
                        var arrOrigin =
                            state.UML.nodes[i]["properties"][params.originContentType];
                        //删除
                        for (j = 0; j < arrOrigin.length; j++) {
                            if (arrOrigin[j].vid == params.vid) {
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
        modifyLine(state, param) {
            //alert("modifyLine:"+state.UML.lines.length);
            //console.log("modifyline", param);
            //TODO如果修改数值和上一次一样，记录为未修改
            var modifiedFlag = false;
            for (var i = 0, l = state.UML.lines.length; i < l; i++) {
                //console.log("for:" + state.UML.lines[i][param.lineKey]);
                //console.log(state.UML.lines[i].line);
                //alert(param.id+":"+state.UML.lines[i].Id);
                if (state.UML.lines[i].Id == param.id) {
                    if (param.key === '') {
                        //alert(param.key);
                        if (state.UML.lines[i][param.lineKey] != param.value) {
                            modifiedFlag = true;
                            state.UML.lines[i][param.lineKey] = param.value;
                        }
                        break;
                    } else {
                        //alert("lineKey:" + state.UML.lines[i][param.lineKey][param.key]);
                        //alert(param.value);
                        if (state.UML.lines[i][param.lineKey][param.key] != (param.value + "")) {
                            console.log(state.UML.lines[i]);
                            state.UML.lines[i][param.lineKey][param.key] = (param.value + "");
                            modifiedFlag = true;
                        }
                        break;
                    }
                }
                //console.log("for");
                //break;
            }
            //TODO历史记录
            if (!modifiedFlag) {
                console.log("no line change");
                return;
            }
        },
        //修改历史数组
        changeHistories(state, params) {},
        //后退
        backward(state) {},
        //前进
        forward(state) {},
    },
    actions: {
        addNode({
            commit,
            state
        }, params) {
            //alert(state.UML.userId);
            axios.post("/addNode", {
                    uid: state.UML.userId,
                    gid: state.UML.groupId ? state.UML.groupId : -1,
                    fid: state.UML.UMLId,
                    nodeType: params.type,
                    styles: params.styles,
                    props: params.properties
                })
                .then(function (response) {
                    var node = {
                        id: response.data,
                        type: params.type,
                        styles: params.styles,
                        properties: params.properties,
                    }
                    commit("addNode", node);
                }).catch(function (error) {
                    console.log("error:" + error);
                })
        },
        modifyNode({
            commit
        }, params) {
            var keys = [];
            var values = [];
            if (params.key instanceof Array) {
                keys = params.key;
            } else {
                keys.push(params.key);
            }
            if (params.value instanceof Array) {
                values = params.value;
            } else {
                values.push(params.value);
            }
            console.log(keys, values);
            axios.post("/updateNode", {
                    nid: params.id,
                    nodeKey: params.nodeKey,
                    key: keys,
                    value: values
                })
                .then(function (response) {
                    commit("modifyNode", params);
                }).catch(function (error) {
                    console.log("error:" + error);
                })
        },
        removeNode({
            commit,
            state
        }, params) {
            axios.get("/delNode", {
                    params: {
                        fid: state.UML.UMLId,
                        nid: params.id
                    }
                })
                .then(function (response) {
                    commit("removeNode", params);
                }).catch(function (error) {
                    console.log("error:" + error);
                })
        },
        addClassNodeProp({
            commit
        }, params) {
            axios.post("/addVarAndFunc", {
                nid: params.id,
                modifier: params.modifier,
                dataType: params.dataType,
                name: params.name,
                params: params.params,
                flag: (params.contentType == 'functions') ? 1 : 0
            }).then(function (response) {
                params.vid = response.data;
                console.log(params);
                commit("addClassNodeProp", params);
            }).catch(function (error) {
                console.log("error:" + error);
            })
        },
        changeClassNodeProp({
            commit
        }, params) {
            axios.post("/upDateVarAndFunc", {
                nid: params.id,
                vid: params.vid,
                modifier: params.modifier,
                dataType: params.dataType,
                name: params.name,
                params: params.params,
                flag: (params.contentType == 'functions') ? 1 : 0
            }).then(function (response) {
                commit("changeClassNodeProp", params);
            }).catch(function (error) {
                console.log("error:" + error);
            })
        },
        deleteClassNodeProp({
            commit
        }, params) {
            axios.get("/delVarAndFUnc", {
                params: {
                    nid: params.id,
                    vid: params.vid,
                }
            }).then(function (response) {
                commit("deleteClassNodeProp", params);
            }).catch(function (error) {
                console.log("error:" + error);
            })
        },
        removeLine({
            commit,
            state
        }, params) {
            var fid = parseInt(state.UML.UMLId)
            var lid = parseInt(params.id)
            //alert("dispatch "+fid+":"+lid)
            axios.get("/delLine", {
                    params: {
                        fid: fid,
                        lid: lid
                    }
                })
                .then(function (response) {
                    commit("removeLine", params);
                }).catch(function (error) {
                    console.log("error:" + error);
                })
        },
        addLine({
            commit,
            state
        }, params) {
            axios.post("/addLine", {
                    uid: state.UML.userId,
                    gid: state.UML.groupId ? state.UML.groupId : -1,
                    fid: state.UML.UMLId,
                    lineId: parseInt(params.Id),
                    relationType: params.relationType,
                    fromId: params.from,
                    toId: params.to,
                    text: params.text,
                    markerStart: "url(#arrow2)",
                    markerEnd: "url(#arrow1)",
                    lineList: params.lineList,
                    startPosition: params.startPosition,
                    endPosition: params.endPosition,
                    lineStyle: params.lineStyle,
                    lineSvgStyle: params.lineSvgStyle,
                })
                .then(function (response) {
                    //alert(response);
                    params.lid = response.data
                    commit("addLine", params);
                }).catch(function (error) {
                    console.log("error:" + error);
                })
        },
        modifyLine({
            commit
        }, params) {
            //params.lineStyle.key=params.Line.value;
            axios.post("/updateLine", {
                    lineId: parseInt(params.Line.Id),
                    lid: params.Line.lid,
                    relationType: params.Line.relationType,
                    fromId: params.Line.from,
                    toId: params.Line.to,
                    text: params.Line.text,
                    markerStart: "url(#arrow2)",
                    markerEnd: "url(#arrow1)",
                    lineList: params.Line.lineList,
                    startPosition: params.Line.startPosition,
                    endPosition: params.Line.endPosition,
                    lineStyle: params.lineStyle,
                    lineSvgStyle: params.Line.lineSvgStyle,
                })
                .then(function (response) {
                    var change = {
                        lineKey: params.lineKey,
                        key: params.key,
                        value: params.value,
                        id: params.id
                    }
                    commit("modifyLine", change);
                }).catch(function (error) {
                    console.log("error:" + error);
                })
        },
        async getRefreshTime({
            commit,
            state
        }, params) {
            //alert("getRefreshTime"+parseInt(state.UML.UMLId));
            var id = parseInt(state.UML.UMLId)
            await axios.get("/getRefreshTime", {
                    params: {
                        fid: id,
                    }
                })
                .then(function (response) {
                    var RefreshTime = {
                        refreshTime: response.data
                    }
                    //alert(response.data);
                    commit("setRefreshTime", RefreshTime);
                }).catch(function (error) {
                    console.log("error:" + error);
                })
        },
        async getToken({
            commit
        }, params) {
            //alert(params.key);
            await axios.post("/getToken", {
                    key: params.key
                })
                .then(function (response) {
                    var token = {
                        Token: response.data
                    }
                    //alert(token);
                    commit("setToken", token);
                }).catch(function (error) {
                    console.log("error:" + error);
                })
        },
        async refreshPic({
            commit
        }, params) {
            //alert(params.url);
            await axios.post("/refreshPic", {
                    url: params.url
                })
                .then(function (response) {

                }).catch(function (error) {
                    console.log("error:" + error);
                })
        },
    },
});