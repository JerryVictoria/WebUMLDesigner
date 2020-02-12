<template>
    <div
        class="startDiv"
        @click.stop="setEditingId"
        @mouseenter="enterline"
        @mouseleave="leaveline"
        @mousemove="Startdrawline"
        :style="{width: Math.min(this.width, this.height)*0.98 + 'px', height: Math.min(this.width, this.height)*0.98 + 'px'}"
        v-clickoutside="hideInputAndSave"
    ></div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Start",
    extends: CommonComponent,
    methods:{
        enterline(event){
            console.log("enterline");
            console.log(event.target.className);
            document.getElementsByClassName(event.target.className)[0].style.cursor="crosshair";
        },
        leaveline(){
            console.log("leaveline");
            //console.log(event.target.className);
            document.getElementsByClassName(event.target.className)[0].style.cursor="default";
            //document.getElementsByClassName("startDiv").style.cursor="default";

        },
        Startdrawline(){
            console.log("Startdrawline");
        },
        Enddrawline(){
            console.log("Enddrawline");
        },
    }
};
</script>
<style scoped>
.startDiv {
    border-radius: 50%;
    background-color: black;
}
</style>