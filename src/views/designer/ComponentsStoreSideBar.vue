<template>
    <div id="asideBox">
        <div id="top">
            <input id="search" v-model="Search" type="text" placeholder="搜索">
            <button id="searchbutton">搜索</button>
        </div>
        <div id="menu" v-for="(item,index) in menuList" :key="item.name">
            <div style="display:block;width:100%;height:auto">
                <div class="oneMenu" @click="showToggle(item,index)">
                    <p v-bind:id="item.name">{{item.name}}</p>
                </div>
                <div v-show="item.isSubShow">
                    <div  v-for="subItem in item.subItems" :key="subItem.name" draggable="true"
                          @mouseenter="enter(subItem)"
                          @mouseleave="leave(subItem)"
                          @mousemove="moveBG(subItem.name)"
                          @dragstart.stop="MouseDragStart;leave(subItem,item)"
                          @dragend.stop="MouseDragEnd">
                        <div id="image">
                            <img v-bind:src="subItem.imgUrl" v-bind:id="subItem.name" />
                        </div>
                        <div v-show="subItem.issubShow" class="hover_con" id="positionStyle" v-bind:style="positionsty">
                            <img id="newimage" v-bind:src="subItem.imgUrl" v-bind:style="newimg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "components-store-side-bar",
        data(){
            return {
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
                menuList:[{
                    name: 'UML时序图',
                    isSubShow: false,
                    subItems: [
                        {
                            name: 'Object',
                            imgUrl: require('../../assets/icons/sequence/Object.png'),
                        },
                        {
                            name: 'Entity',
                            imgUrl: require('../../assets/icons/sequence/Entity.png'),
                        },
                        {
                            name: 'Control',
                            imgUrl: require('../../assets/icons/sequence/Control.png'),
                        },
                        {
                            name: 'Bind',
                            imgUrl: require('../../assets/icons/sequence/Bind.png'),
                        },
                        {
                            name: 'Timesignal',
                            imgUrl: require('../../assets/icons/sequence/Timesignal.png'),
                        },
                        {
                            name: 'Constraint',
                            imgUrl: require('../../assets/icons/sequence/Constraint.png'),
                        },
                        {
                            name: 'Activation',
                            imgUrl: require('../../assets/icons/sequence/Activation.png'),
                        },
                        {
                            name: 'Lifeline',
                            imgUrl: require('../../assets/icons/sequence/Lifeline.png'),
                        },
                        {
                            name: 'Delete',
                            imgUrl: require('../../assets/icons/sequence/Delete.png'),
                        },
                    ]
                },
                    {
                name:'UML状态图',
                isSubShow:false,
                subItems:[
                    {
                        name: 'state-object',
                        issubShow:false,
                        width:120,
                        height:90,
                        imgUrl: require('../../assets/icons/state/object.png'),
                    },
                    {
                        name: 'state-state',
                        width:120,
                        height:90,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/state.png'),
                    },
                    {
                        name: 'state-start',
                        width:60,
                        height:60,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/begin.png'),
                    },
                    {
                        name: 'state-end',
                        width:60,
                        height:60,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/end.png'),
                    },
                    {
                        name: 'state-streamEnd',
                        width:60,
                        height:60,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/streamEnd.png'),
                    },
                    {
                        name: 'state-history',
                        width:60,
                        height:60,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/history.png'),
                    },
                    {
                        name: 'state-detailedHistory',
                        width:60,
                        height:60,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/detailedHistory.png'),
                    },
                    {
                        name: 'state-msgSender',
                        width:170,
                        height:90,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/msgSender.png'),
                    },
                    {
                        name: 'state-msgReceiver',
                        width:170,
                        height:90,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/msgReceiver.png'),
                    },{
                        name: 'state-fork',
                        width:60,
                        height:60,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/fork.png'),
                    },
                    {
                        name: 'state-synchronizer',
                        width:140,
                        height:40,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/synchronizer.png'),
                    },{
                        name: 'state-container',
                        width:160,
                        height:130,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/container.png'),
                    },{
                        name: 'state-verticalLane',
                        width:135,
                        height:280,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/verticalLane.png'),
                    },{
                        name: 'state-horizontalLane',
                        width:280,
                        height:135,
                        issubShow:false,
                        imgUrl: require('../../assets/icons/state/horizontalLane.png'),
                    },





            ]
        }],
            }
        },
        methods:{
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
            leave(subitem,item){
                subitem.issubShow=false;
                this.name=subitem.name.split('-')[1];
                this.type=subitem.name.split('-')[1].charAt(0).toUpperCase() + subitem.name.split('-')[1].slice(1);
                this.w=subitem.width;
                this.h=subitem.height;
            },
            MouseDragStart(event){
                let resizer =event.target;
                //添加拖拽效果
                this.cursorToLeft = event.clientX - resizer.offset().left;
                this.cursorToTop = event.clientY - resizer.offset().top;

            },
            MouseDragEnd(event){
                //判断是否已在画布中
                //console.log("MouseDragEnd:X"+event.clientX+",Y: "+event.clientY)
                var side=document.getElementById("side");
                var canv=document.getElementById("canvas");
                var length=this.$store.state.UML.nodes.length;
                var newid;
                if(length!=0) {
                    newid = parseInt(this.$store.state.UML.nodes[length - 1].id) + 1 + '';
                }else{
                    newid='1';
                }
                console.log(newid);
                var e={
                    x:event.clientX,
                    y:event.clientY,
                }
                var c={
                    x: this.cursorToLeft,
                    y: this.cursorToTop,
                };
                var s={
                    x: side.getBoundingClientRect().left,
                    y: side.getBoundingClientRect().top,
                    l:side.offsetLeft,
                    t:side.offsetTop,
                    w:side.offsetWidth,
                }

                console.log(e);
                console.log(c);
                console.log(s);
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy";
                var addcom= {
                    id: newid,
                    type: this.type,
                    styles: {
                        width: this.w,
                        height: this.h,
                        left: event.clientX-100-s.w,
                        top: event.clientY-50,
                    },
                    properties: {
                        name: this.name,
                        propType: "multivalue"
                    }
                }
                this.$store.state.UML.nodes.push(addcom);
                //alert("tianjiacheng")
                console.log("clickOutSide");
                this.showMenu = false;
                console.log("*****************"+this.dragid);
            },
            moveBG:function(name){
                var menu=document.getElementById('side');
               var image=document.getElementById(name);
               console.log(name);
               //alert(image.offsetHeight);
               //alert(image.offsetWidth);
               var e={
                   w:image.offsetWidth,
                   h:image.offsetHeight,
               };
               var c={
                   x: image.getBoundingClientRect().left,
                   y: image.getBoundingClientRect().top,
               };
               //alert(name.toString().split('-')[0]);
               //alert(name);
               var newimage=document.getElementById("positionStyle");
               //console.log(menu.offsetWidth);
               //console.log(c.y);
               this.positionsty.left=menu.offsetWidth+'px';
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
    }
</script>

<style scoped>
    #asideBox{
        width:100%;
        display:block;
    }
    #menu{
        color:black;
        width:100%;
        display:flex;
        margin-left:5%;
    }
    #searchbutton{
        cursor: pointer;  /*鼠标悬停变小手*/
    }
    #image{
        display:inline-block;
        width:auto;
        height:45px;
        margin:0 1%;
        outline:none;
        float:left;
    }
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
</style>