# Web UML Design

UML图的web版编辑器，2020NJU毕设

## 项目结构

vue+springboot

### 前端项目结构

```
┃
┃━━━ node_modules  //npm install 后的所有依赖
┃
┃━━━ public  //不用使用
┃
┃━━━ src
┃     ┃
┃     ┃━━━ assets 资源文件
┃     ┃       ┃━━━ icons 组件图标
┃     ┃       ┗━━━ images 其余图片
┃     ┃━━━ components 组件.vue
┃     ┃       ┃━━━ classdiagram 类图组件
┃     ┃       ┃━━━ componentdiagram 组件图组件
┃     ┃       ┃━━━ deploymentdiagram 部署图组件
┃     ┃       ┃━━━ erdiagram 实体关系图组件
┃     ┃       ┃━━━ sequencediagram 顺序图组件
┃     ┃       ┃━━━ statediagram 状态图组件
┃     ┃       ┃━━━ usecasediagram 用例图组件
┃     ┃       ┃━━━ Resizer.vue 拖拽效果组件
┃     ┃       ┃━━━ CommonComponent.vue 图例父组件（通用功能）
┃     ┃       ┃
┃     ┃       ┃━━━ ContextMenu.vue 右键菜单（删除等）
┃     ┃       ┃
┃     ┃       ┃━━━ line 线条组件
┃     ┃       ┃━━━ toolbar 工具栏组件，包括保存、打开、历史功能等
┃     ┃       ┗━━━ ComponentsStore.js 组件库定义数据
┃     ┃━━━ style 存放通用css文件
┃     ┃━━━ const.js 通用变量（和后端一致）
┃     ┃━━━ views 页面.vue文件
┃     ┃       ┃━━━ designer
┃     ┃       ┃        ┃━━━ Designer.vue 负责组合组件
┃     ┃       ┃        ┃━━━ ComponentsStoreSideBar.vue
┃     ┃       ┃        ┃━━━ ToolTopBar.vue
┃     ┃       ┃        ┗━━━ DiagramCanvas.vue
┃     ┃       ┃━━━ Login.vue
┃     ┃       ┗━━━ MainPage.vue
┃     ┃━━━ App.vue 主页面
┃     ┃━━━ main.js vue挂载入口
┃     ┃━━━ router.js 路由配置
┃     ┗━━━ store.js vuex配置
┃━━━ package.json 依赖配置
┗━━━ README.md
```

## 功能

### 前后端交互相关

- 1、登录注册
- 2、小组生成
- 3、读取数据生成可视化区域
  - 协同合作也是后台传来数据进行更新可视化区域
- 4、读取数据生成组件库 vs. 读取js文件生成组件库（纯前端）
  - 图例组件库搜索功能
  - 图例组件分类
- 5、保存图像结构数据和下载jpg
- 6、多人协作

### 前端功能

- 1、拖拽图例组件
  - 从图例组件库到可视化
  - 可视化拖拽
- 2、修改组件样式和属性
  - 样式：大小、位置、颜色、字体
  - 属性：文本
- 3、组件关联线条
  - 样式：粗细、颜色
  - 属性：关系类型（<=决定=>线条样式类型）
- 4、其他
  - 文本框组件
  - 撤销与前进

## 数据结构

### UML图例节点node数据

```js
{
    id: "",
    type : "", // e.g. class
    styles : {
        width : 0, 
        height : 0,
        left : 0,
        top : 0,
    },
    properties : {	// 各个组件不一样，这里以类图里的类举例
        className: "",
        classType: "", // e.g. abstract
        variables: [{modifier: "", dataType: "", name: "", propId: ""}],
        functions: [{modifier: "", dataType: "", name: "", params: "", propId: ""}]
    }
}
```

#### properties定义

```js
// 1 用例图(3)
// type: 1.1 character, 1.2 usercase
properties: {
    name: ""
}
// type: 1.3 border/container
properties: {}

// 2 状态图(14)
// type: 2.1 object, 2.2 state, 2.8 msgSender, 2.9 msgReceiver, 2.11 synchronizer, 2.13 verticalLane, 2.14 horizontalLane
properties: {
    name: ""
}
// type: 2.3 begin, 2.4 end, 2.5 streamEnd, 2.6 history, 2.7 detailedHistory, 2.10 fork, 2.12 container
properties: {}

// 3 类图(2+)
// type: 3.1 class
properties : {
   className: "",
   classtype: "", // e.g. abstract
   variables: [{modifier: "", dataType: "", name: "", propId: ""}],
   functions: [{modifier: "", dataType: "", name: "", params: "", propId: ""}]
}
// type: 3.2 interface 3.3 constraint
properties: {
    name: ""
}
//活动类、多例类、端口(啥玩意?)

// 4 顺序图(2+)
// type: 4.1 lifeline 4.4 constraint
properties: {
    name: ""
}
// type: 4.2 activation 4.3 delete
properties: {}
//对象、实体、控制、绑定、时间信号（啥玩意？）

// 5 部署图（4）
// type: 5.1 component, 5.2 node
properties: {
    name: "",
    isInstance: false
}
// type: 5.3 object, 5.4 constraint
properties: {
    name: ""
}

// 6 组件图(3)
// type: 6.1 component, 6.2 node, 6.3 interface
properties: {
    name: ""
}

// 7 ER图(3+)
// type: 7.1 entity, 7.3 relationship
properties: {
    name: "",
    isWeak: false
}
// type: 7.2 attribute
properties: {
    name: "",
    propType: "" //children, key, multivalue
}
//概化、全部概化（啥玩意？）

// 8 通用图例
// type: 8.1 package(属性1或2个?) 8.3 comment 8.4 text
properties: {
    name: ""
}
// type: 8.2 composition(是通用吗?)
properties: {
    compositionType: "" // Opt/Alt/Loop
    condition: ""
}
```

### UML图例线条line数据

```js
{
    id: ""
    relationType: ""	// relation type
    fromId: "", //实现的时候可能需要重新考虑
    toId: "",
    styles:{
       color: "",
       lineType: "", //虚线之类的
       lineThickness: "", //固定几种
       left: 0,
       top: 0
    },
     
}
```

### 一个完整UML图的数据结构（读取和保存）

```java
class UML{
    private UMLType type;
    private String UMLId;
    private User user;
    private Group group;
    private ArrayList<Node> nodes;
    private ArrayList<Line> lines;
}
```

### UML组件库

方法1、数据库存组件

```js
class UMLComponents{
    private UMLType type;
    private ArrayList<Component> components;
}
```

方法2、前端js存组件

```js
var ComponentsStore = [
    {
    	UMLType: "CLASS_DIAGRAM",
        Components: [
            {}
        ]
	},
    {
     	UMLType: "SEQUENCE_DIAGRAM",
        Components: [
            {}
        ]
    }
]
export { ComponentsStore }
```

### UML组件Component结构定义


方法1、java版本
```java
class Component{
    private String name; //e.g. 类
    private String className; // e.g. component-class-diagram-class
}
```
方法2、js版本

```js
{
    name: "class",
    className: "component-class-diagram-class"
}
```

css使用

```css
.component-class-diagram-class{
    background-image: url(./icon/class-diagram-class.png);
}
```

### UMLType

```java
enum UMLType{
    CLASS_DIAGRAM,
    SEQUENCE_DIAGRAM,
    STATE_DIAGRAM,
    USECASE_DIAGRAM,
    DEPLOYMENT_DIAGRAM,
    COMPONENT_DIAGRAM,
    ER_DIAGRAM,
}
```

### DataType

```java
enum DataType{
    BYTE,
    SHORT,
    INT,
    LONG,
    DOUBLE,
    FLOAT,
    CHAR,
    BOOLEAN
}
```

### Modifier

```java
enum Modifier{
    PUBLIC,
    PROTECTED,
    DEFAULT,
    PRIVATE
}
```

### Vuex.store设计

```js
import vuex from "vuex";
Vue.use(vuex);
var store = new vuex.Store({
    //store对象
    state: {
        editing: false, //是否正在处于编辑状态（禁用其他功能）
        editingId: "", //当前编辑组件（显示功能）
        UML: {
            UMLType: "",
            UMLId: "",
            userId: "",
            groupId: "",
            nodes:[{
                id: "",
                type: "",
                styles: {},
                properties: {}
            }],
            lines:[{
                id: "",
                relationType: "", 
                fromId: "",
                toId: "",
                styles: {
                    color: "",
                    lineType: "", //虚线之类的
                    lineThickness: "", //固定几种
                }
            }]
        },
        histories: []//循环队列实现
    },
    mutations: {
        //初始化图数据/多人协作同步图数据
        setUML(state, params){
            
        },
        //增加节点数据
        addNode(state, params){
            
        },
        //增加线条数据
        addLine(state, params){
            
        },
        //删除节点数据
        removeNode(state, params){
            
        },
        //删除线条数据
        removeLine(state, params){
            
        },
        //修改节点数据
        modifyNode(state, params){
            
        },
        //删除类节点属性
        deleteClassNodeProp(state, params){
            
        },
        //修改类节点属性（需要分辨类型是否切换）
        changeClassNodeProp(state, params){
            
        }
        //修改线条数据
        modifyLine(state, params){
            
        },
        //修改历史数组
        changeHistories(state, params){
            
        },
        //后退
        backward(state){
            
        },
        //前进
        forward(state){
            
        },
        setEditState(state, params){
            
        },
    	setEditId(state, params) {
            
        }
    }
});

```

## 数据库

对象：用户、组、图、图例组件、组件属性、线条







data

```js
{
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
                        variables: [
                            {
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
                        functions: [
                            {
                                modifier: "public",
                                dataType: "int",
                                name: "func",
                                params: "int count",
                                propId: 0
                            }
                        ]
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
                },
                {
                    id: "28",
                    type: "Entity",
                    styles: {
                        width: 200,
                        height: 100,
                        left: 100,
                        top: 100
                    },
                    properties: {
                        name: "entity",
                        isWeak: true
                    }
                }
```

