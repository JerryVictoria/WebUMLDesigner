# WebUMLDesigner
UML图的web版编辑器，2020NJU毕设

# Web UML Design

## 项目结构

vue+springboot

## 功能

### 前后端交互相关

- 1、登录注册
- 2、小组生成
- 3、读取数据生成可视化区域
- 4、读取数据生成组件库
- 5、保存图像结构数据和下载jpg
- 6、多人协作

## 数据结构

### UML图例节点node数据

```js
{
    id: ""
    type : "" // e.g. class
    style : {
        width : 0, 
        hight : 0,
        positionX : 0,
        positionY : 0,
    },
    properties : {	// 各个组件不一样，这里以类图里的类举例
        className: "",
        type: "", // e.g. abstract
        variables: [{type: "", name: ""}]
        functions: [{type: "", name: ""}]
    }
}
```

### UML图例线条line数据

```js
{
    id: ""
    type: ""	// relation type
    fromId: "",
    toId: "",
    style:{
       color: "",
       lineType: "", //虚线之类的
       lineThickness: "", //固定几种
    },
     
}
```

### 一个完整UML图的数据结构（读取和保存）

```java
class UML{
    private UMLType type;
    private String id;
    private User user;
    private Group group;
    private ArrayList<Node> nodes;
    private ArrayList<Line> lines;
}
```

### UML组件库

```js
class UMLComponents{
    private UMLType type;
    private ArrayList<Component> components;
}
```

### UML组件Component结构定义

```java
class Component{
    private String name; //e.g. 类
    private String className; // e.g. component-class-diagram-class
}
```

```css
.component-class-diagram-class{
    background-image: url(./icon/class-diagram-class.png);
}
```

### UMLType

```java
CLASS_DIAGRAM
SEQUENCE_DIAGRAM
STATE_DIAGRAM
USECASE_DIAGRAM
DEPLOYMENT_DIAGRAM
COMPONENT_DIAGRAM
ER_DIAGRAM
```

