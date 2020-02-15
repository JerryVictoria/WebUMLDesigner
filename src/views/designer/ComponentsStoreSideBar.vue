<template>
    <div id="asideBox">
        <div id="top">
            <el-input placeholder="请输入内容" v-model="Search" class="input" id="search" type="text" >
                <el-button slot="append" icon="el-icon-search" id="searchbutton" type="primary" @click="searchimg"></el-button>
            </el-input>
        </div>
        <div id="sidemenu">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="搜索结果" name="1" v-show="searchresult">
                        <div  v-for="(item,index) in searchList" :key="item.name" :name="index" draggable="true"
                              @mouseenter="enter(item)"
                              @mouseleave="leave(item)"
                              @mousemove="moveBG(item.name)"
                              @dragstart.stop="MouseDragStart(item)"
                              @dragend.stop="MouseDragEnd">
                            <div id="searchresult" class="image">
                                <img v-bind:src="item.imgUrl" v-bind:id="item.name" class="img"/>
                            </div>
                            <div v-show="item.issubShow" class="hover_con" v-bind:style="positionsty">
                                <img  v-bind:src="item.imgUrl" v-bind:style="newimg" />
                            </div>
                        </div>
                    </el-collapse-item>
                <el-collapse-item v-for="item in menuList" :key="item.name" :title="item.name">
                        <div  v-for="subItem in item.subItems" :key="subItem.name" draggable="true"
                              @mouseenter="enter(subItem)"
                              @mouseleave="leave(subItem)"
                              @mousemove="moveBG(subItem.name)"
                              @dragstart.stop="MouseDragStart(subItem);"
                              @dragend.stop="MouseDragEnd">
                            <div class="image">
                                <img v-bind:src="subItem.imgUrl" v-bind:id="subItem.name" class="img"/>
                            </div>
                            <div v-show="subItem.issubShow" class="hover_con" v-bind:style="positionsty">
                                <img  v-bind:src="subItem.imgUrl" v-bind:style="newimg" />
                            </div>
                        </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "components-store-side-bar",
        data(){
            return {
                cdrag:false,
                ldrag:false,
                scrollheight:0,
                activeNames: ['1'],
                searchresult:false,
                Search:'',
                imgURL:'',
                type:'',
                name:'',
                w:'',
                h:'',
                cursorToLeft:0,
                cursorToRight:0,
                newimg:{
                    width:'150px',
                    height:'150px',
                    margin:'15px 15px'
                },
                positionsty:{
                    width:'180px',
                    height:'180px',
                    background:'white',
                    position:'fixed',
                    border:'solid 1px grey',
                    borderradius:'30px',
                    top:'',
                    left:''
                },
                menuList:[
                    {
                name:'UML状态图',
                isSubShow:false,
                subItems:[
                    {
                        name: 'state-object',
                        Cname: '对象',
                        issubShow:false,
                        width:120,
                        height:90,
                        imgUrl: require('../../assets/icons/state/object.png'),
                    },
                    {
                        name: 'state-state',
                        width:120,
                        height:90,
                        Cname: '状态',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/state.png'),
                    },
                    {
                        name: 'state-start',
                        width:60,
                        height:60,
                        Cname: '开始',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/begin.png'),
                    },
                    {
                        name: 'state-end',
                        width:60,
                        height:60,
                        Cname: '结束',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/end.png'),
                    },
                    {
                        name: 'state-streamEnd',
                        width:60,
                        height:60,
                        Cname: '流终止',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/streamEnd.png'),
                    },
                    {
                        name: 'state-history',
                        width:60,
                        height:60,
                        Cname: '历史',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/history.png'),
                    },
                    {
                        name: 'state-detailedHistory',
                        width:60,
                        height:60,
                        Cname: '详细历史',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/detailedHistory.png'),
                    },
                    {
                        name: 'state-msgSender',
                        width:170,
                        height:90,
                        Cname: '发送信号',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/msgSender.png'),
                    },
                    {
                        name: 'state-msgReceiver',
                        width:170,
                        height:90,
                        Cname: '接收信号',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/msgReceiver.png'),
                    },{
                        name: 'state-fork',
                        width:60,
                        height:60,
                        Cname: '分支',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/fork.png'),
                    },
                    {
                        name: 'state-synchronizer',
                        width:140,
                        height:40,
                        Cname: '同步',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/synchronizer.png'),
                    },{
                        name: 'state-container',
                        width:160,
                        height:130,
                        Cname: '容器',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/container.png'),
                    },{
                        name: 'state-verticalLane',
                        width:135,
                        height:280,
                        Cname: '泳道（垂直）',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/verticalLane.png'),
                    },{
                        name: 'state-horizontalLane',
                        width:280,
                        height:135,
                        Cname: '泳道（水平）',
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/horizontalLane.png'),
                    },
                ]},
                    {
                        name: 'UML时序图',
                        isSubShow: false,
                        subItems: [
                            {
                                name: 'Object',
                                Cname: 'Object',
                                issubShow:false,
                                width:120,
                                height:90,
                                imgUrl: require('../../assets/icons/sequence/Object.png'),
                            },
                            {
                                name: 'Entity',
                                Cname: 'Object',
                                issubShow:false,
                                width:120,
                                height:90,
                                imgUrl: require('../../assets/icons/sequence/Entity.png'),
                            },
                            {
                                name: 'Control',
                                Cname: 'Object',
                                issubShow:false,
                                width:120,
                                height:90,
                                imgUrl: require('../../assets/icons/sequence/Control.png'),
                            },
                            {
                                name: 'Bind',
                                Cname: 'Object',
                                issubShow:false,
                                width:120,
                                height:90,
                                imgUrl: require('../../assets/icons/sequence/Bind.png'),
                            },
                            {
                                name: 'Timesignal',
                                Cname: 'Object',
                                issubShow:false,
                                width:120,
                                height:90,
                                imgUrl: require('../../assets/icons/sequence/Timesignal.png'),
                            },
                            {
                                name: 'Constraint',
                                Cname: 'Object',
                                issubShow:false,
                                width:120,
                                height:90,
                                imgUrl: require('../../assets/icons/sequence/Constraint.png'),
                            },
                            {
                                name: 'Activation',
                                Cname: 'Object',
                                issubShow:false,
                                width:120,
                                height:90,
                                imgUrl: require('../../assets/icons/sequence/Activation.png'),
                            },
                            {
                                name: 'Lifeline',
                                Cname: 'Object',
                                issubShow:false,
                                width:120,
                                height:90,
                                imgUrl: require('../../assets/icons/sequence/Lifeline.png'),
                            },
                            {
                                name: 'Delete',
                                Cname: 'Object',
                                issubShow:false,
                                width:120,
                                height:90,
                                imgUrl: require('../../assets/icons/sequence/Delete.png'),
                            },
                        ]
                    },
                    {
                        name: 'UML用例图',
                        isSubShow: false,
                        subItems: [{
                            name: 'state-object',
                            Cname: '对象',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/state/object.png'),
                        },]
                    },
                    {
                        name: 'UML类图',
                        isSubShow: false,
                        subItems: [{
                            name: 'class-simple',
                            Cname: '简单类',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/class/simple.png'),
                        },{
                            name: 'class-interfaceandclass',
                            Cname: '接口和类',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/class/interfaceandclass.png'),
                        },{
                            name: 'class-class',
                            Cname: '类',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/class/class.png'),
                        },{
                            name: 'class-activity',
                            Cname: '活动类',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/class/activity.png'),
                        },{
                            name: 'class-multiple',
                            Cname: '多例类',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/class/multiple.png'),
                        },{
                            name: 'class-interface',
                            Cname: '接口',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/class/interface.png'),
                        },{
                            name: 'class-constraint',
                            Cname: '约束',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/class/constraint.png'),
                        },{
                            name: 'class-port',
                            Cname: '端口',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/class/port.png'),
                        },]
                    },
                    {
                        name: 'UML部署图',
                        isSubShow: false,
                        subItems: [{
                            name: 'state-object',
                            Cname: '对象',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/state/object.png'),
                        },]
                    },
                    {
                        name: 'UML组件图',
                        isSubShow: false,
                        subItems: [{
                            name: 'state-object',
                            Cname: '对象',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/state/object.png'),
                        },]
                    },
                    {
                        name: '实体关系图',
                        isSubShow: false,
                        subItems: [{
                            name: 'state-object',
                            Cname: '对象',
                            issubShow:false,
                            width:120,
                            height:90,
                            imgUrl: require('../../assets/icons/state/object.png'),
                        },]
                    },
                ],
                searchList:[]
            }
        },
        methods:{
            searchimg(){
                var imgname=this.Search;
                for(var i=0;i<this.menuList.length;i++){
                    for(var j=0;j<this.menuList[i].subItems.length;j++){
                        if(this.menuList[i].subItems[j].Cname.indexOf(imgname.toString())!=-1){
                            //console.log(this.menuList[i].subItems[j]);
                            this.searchList.push(this.menuList[i].subItems[j]);
                            this.searchresult=true;
                        }
                    }
                }
            },
            handleChange(val) {
                console.log(val);
            },
            showToggle:function(item,ind){
                this.menuList.forEach(i=>{
                    if(i.isSubShow !==this.menuList[ind].isSubShow){
                        i.isSubShow=false;
                    }
                });
                item.isSubShow=!item.isSubShow;
                console.log(item.name);
            },
            enter(item){
                item.issubShow=true;
            },
            leave(subitem){
                console.log(subitem.Cname);
                subitem.issubShow=false;
                this.name=subitem.name.split('-')[1];
                this.type=subitem.name.split('-')[1].charAt(0).toUpperCase() + subitem.name.split('-')[1].slice(1);
                this.w=subitem.width;
                this.h=subitem.height;
            },
            MouseDragStart(subItem){
                console.log("MouseDragStart");
                this.cdrag=this.$store.state.canvasdrage;
                this.$store.state.canvasdrage=false;
                this.ldrag=this.$store.state.linedrag;
                this.$store.state.linedrag=false;
                console.log("this.$store.state.canvasdrage:"+this.$store.state.canvasdrage);
                this.leave(subItem);
            },
            MouseDragEnd(event){
                console.log("MouseDragEnd");
                //判断是否已在画布中
                console.log(this.cdrag);
                var canv=document.getElementById("canvas").childNodes[0];
                var length=this.$store.state.UML.nodes.length;
                var side=document.getElementById("side");
                var newid;
                if(length!=0) {
                    newid = parseInt(this.$store.state.UML.nodes[length - 1].id) + 1 + '';
                }else{
                    newid='1';
                }
                console.log("newid:"+newid);
                var c={
                    l:canv.offsetLeft+canv.clientLeft,
                    t:canv.offsetTop+canv.clientTop,
                };
                var e={
                    x:event.clientX,
                    y:event.clientY,
                }
                if(e.x>0&&e.y>0){
                    console.log("画布内");
                    console.log(document.documentElement.scrollTop);
                    console.log(e);
                    console.log(c);
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "copy";
                    var addcom= {
                        id: newid,
                        type: this.type,
                        styles: {
                            width: this.w,
                            height: this.h,
                            left: e.x-this.w/2,
                            top: e.y+document.documentElement.scrollTop,
                        },
                        properties: {
                            name: this.name,
                            propType: "multivalue"
                        }
                    }
                    console.log(e);
                    this.$store.state.UML.nodes.push(addcom);
                    //alert("tianjiacheng");
                };
                this.$store.state.canvasdrage=this.cdrag;
                this.$store.state.linedrag=this.ldrag;
                console.log("this.$store.state.canvasdrage:"+this.$store.state.canvasdrage);
                this.showMenu = false;
            },
            moveBG(name){
                var canvas=document.getElementById('canvas');
                var image=document.getElementById(name);
               console.log(name);
               //alert(image.offsetHeight);
               //alert(image.offsetWidth);
               var c={
                   x: image.getBoundingClientRect().left,
                   y: image.getBoundingClientRect().top,
               };
               //alert(name.toString().split('-')[0]);
               //alert(name);
               //console.log(menu.offsetWidth);
               //console.log(c.y);
               this.positionsty.left=canvas.childNodes[0].offsetLeft+'px';
               this.positionsty.top=c.y+'px';
               //this.newimg.left=c.x+'px';
               //this.newimg.right=c.y+'px';
               //alert(c.y);
               //alert(image.getBoundingClientRect().left);
               //alert(image.getBoundingClientRect().right);
               //alert(image.getBoundingClientRect().top);
               //alert(image.getBoundingClientRect().bottom);
            }
        },
        watch:{
            Search:function(){
                if(this.Search==''){
                    while(this.searchList.length!=0){
                        this.searchList.pop();
                    }
                    console.log(this.searchList);
                    this.searchresult=false;
                }
            },
        },
    }
</script>

<style scoped>
    #top{
        margin-top: 15px;
        margin-bottom: 15px;
        margin-left:2%;
        margin-right:2%;
    }
    #asideBox{
        width:100%;
        display:block;
    }
    #sidemenu{
        margin-left:5%;
        overflow:auto;
        margin-bottom: 5%;
        height:600px;
    }
    #searchbutton{
        cursor: pointer;  /*鼠标悬停变小手*/
    }
    .image{
        display:inline-block;
        width:auto;
        height:50px;
        margin:0 2% 2% 0;
        outline:none;
        float:left;
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