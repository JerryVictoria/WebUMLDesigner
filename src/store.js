import Vue from "vue";
import Vuex from "vuex";
import axios from './httpConfig/url_config'

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
        drawLine:false,
        lineType:"",
        lineStyle:"",
        lineColor:"",
        lineSize:"",
        lineSA:"",
        lineEA:"",
        lineEditId: "",
        autoId: 100, // max of all TODO init
        UML: {
            //mock data
            UMLType: "CLASS_DIAGRAM",
            UMLId: "",
            UMLName: "",
            userId: "",
            groupId: "",
            nodes: [
                /*
              {
                id: "29",
                type: "Attribute",
                styles: {
                  width: 200,
                  height: 100,
                  left: 350,
                  top: 415
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
                              left: 400,
                              top: 500
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
                              left: 600,
                              top: 300
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
                              left: 600,
                              top: 400
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
                              left: 600,
                              top: 500
                          },
                          properties: {
                              compositionType: "Opt",
                              condition: "condition"
                          }
                      }
                       */
            ],
            lines: [
                {
                    Id:"1",
                    svgId: "svg1",
                    lineId: "line1",
                    relationType: "xbrokrn",
                    from: "29",
                    to: "30",
                    text: "",
                    markerstart:'url(#arrow2)',
                    markerend:'url(#arrow1)',
                    lineList:[[10,200],[20,200],[20,100],[300,100]],
                    startPosition: {
                        left: 10,
                        top: 200,
                        direction: "",
                    },
                    endPosition: {
                        left: 300,
                        top: 100,
                        direction: ""
                    },
                    lineStyle: {
                        stroke: "#409EFF",
                        strokeDasharray: "20,10,5,10", //虚线之类的
                        strokeWidth: "3px" //固定几种
                    },
                    lineSvgStyle:{
                        position:'absolute',
                        width:"311px",
                        height:"311px",
                        left:"317px",
                        top:"191px",
                    }
                }
            ],

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
        //增加节点数据
        addNode(state, params) {
            //console.log("params:"+state.UML.nodes);
            state.UML.nodes.push(params);
        },
        //增加线条数据
        addLine(state, params) {
            console.log(params);
            state.UML.lines.push(params);
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
                if (state.UML.lines[i].Id == params.id) {
                    state.UML.lines.splice(i, 1);
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
                        var arrOrigin =
                            state.UML.nodes[i]["properties"][params.originContentType];
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
        modifyLine(state, param) {
            //console.log("modifyline", param);
            //TODO如果修改数值和上一次一样，记录为未修改
            var modifiedFlag = false;
            for (var i = 0, l = state.UML.lines.length; i < l; i++) {
                console.log("for:"+state.UML.lines[i][param.lineKey]);
                console.log(state.UML.lines[i].line);
                console.log(param.id);
                if (state.UML.lines[i].Id == param.id) {
                    if (param.key === '') {
                        if (state.UML.lines[i][param.lineKey] != param.value) {
                            modifiedFlag = true;
                            state.UML.lines[i][param.lineKey] = param.value;
                        }
                        break;
                    } else {
                        alert("lineKey:"+state.UML.lines[i][param.lineKey][param.key]);
                        alert(param.value);
                        if (state.UML.lines[i][param.lineKey][param.key] != (param.value + "")) {
                            console.log(state.UML.lines[i]);
                            state.UML.lines[i][param.lineKey][param.key] = (param.value + "");
                            modifiedFlag = true;
                        }
                        break;
                    }
                }
                //console.log("for");
                break;
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
            var keys = params.key instanceof Array ? params.key : [].push(params.key);
            var values = params.value instanceof Array ? params.value : [].push(params.value);
            axios.get("/updateNode", {
                    params: {
                        nid: params.id,
                        nodeKey: params.nodeKey,
                        key: keys,
                        value: values
                    }
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
        addLine({
                    commit,
                    state
                }, params) {
            axios.post("/addLine", {
                uid: state.UML.userId,
                gid: state.UML.groupId ? state.UML.groupId : -1,
                fid: state.UML.UMLId,
                lineId:parseInt(params.Id),
                relationType:params.relationType,
                fromId:params.from,
                toId:params.to,
                text:params.text,
                markerStart:"url(#arrow2)",
                markerEnd:"url(#arrow1)",
                lineList:params.lineList,
                startPosition:params.startPosition,
                endPosition:params.endPosition,
                lineStyle:params.lineStyle,
                lineSvgStyle:params.lineSvgStyle,
            })
                .then(function (response) {
                    commit("addLine", params);
                }).catch(function (error) {
                console.log("error:" + error);
            })
        },
        modifyLine({
                       commit
                   }, params) {
            axios.get("/updateLine", {
                params: {
                    //@TODO
                    lineId:parseInt(params.Id),
                    relationType:params.relationType,
                    fromId:params.from,
                    toId:params.to,
                    text:params.text,
                    markerStart:"url(#arrow2)",
                    markerEnd:"url(#arrow1)",
                    lineList:params.lineList,
                    startPosition:params.startPosition,
                    endPosition:params.endPosition,
                    lineStyle:params.lineStyle,
                    lineSvgStyle:params.lineSvgStyle,
                }
            })
                .then(function (response) {
                    commit("modifyNode", params);
                }).catch(function (error) {
                console.log("error:" + error);
            })
        },
    }
});