<template>
    <div
        class="borderDiv"
        @click.stop="setEditingId"
        :style="{width: this.width*0.98 + 'px', height: this.height*0.98 + 'px'}"
        v-clickoutside="hideInputAndSave"
    ></div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Container",
    extends: CommonComponent,
    methods: {
        setEditingId() {
            this.$store.commit("setEditId", { id: this.id });
            this.$store.commit("setEditState", { editing: false });
        },
        getLineLeftPosition(){
            //calculate 中点
            console.log("leftpostion")
            var x=0;
            var y=this.height*0.49
            return [{x,y}];
        },
        getLineRightPosition(){
            //calculate 中点
            var x=this.width*0.98;
            var y=this.height*0.49
            return [{x,y}];
        },
        getLineTopPosition(){
            //calculate 中点
            var x=this.width*0.49;
            var y=0
            return [{x,y}];
        },
        getLineBottomPosition(){
            //calculate 中点
            var x=this.width*0.49;
            var y=this.height*0.98
            return [{x,y}];
        },
        getName() {
            //calculate 中点
            return "";
        },
    }
};
</script>
<style scoped>
.borderDiv {
    border: 2px solid black;
    border-radius: 2%;
}
</style>