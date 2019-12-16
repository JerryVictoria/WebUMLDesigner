# Web UML Design

UML图的web版编辑器，2020NJU毕设

## 项目结构

vue+springboot

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
        variables: [{modifier: "", dataType: "", name: ""}]
        functions: [{modifier: "", dataType: "", name: ""}]
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
export { Components }
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

## 数据库

对象：用户、组、图、图例组件、组件属性、线条







