<template>
    <div
        @click.stop="setEditingId"
        :style="{width: this.width*0.95 + 'px', height: this.height*0.95 + 'px', display: 'flex'}"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="blackDiv"
            :style="{width: this.width*0.2 + 'px', height: this.height*0.9 + 'px', borderRadius: '50%'}"
        ></div>
        <div
            class="blackDiv"
            :style="{width: this.width*0.8 + 'px', height: this.height*0.9 + 'px', marginLeft: -this.width*0.1 + 'px'}"
        ></div>
        <div
            class="blackDiv"
            :style="{width: this.width*0.2 + 'px', height: this.height*0.9 + 'px', borderRadius: '50%', marginLeft: -this.width*0.1 + 'px'}"
        ></div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Synchronizer",
    extends: CommonComponent,
    methods:{
        getLineLeftPosition() {
            //calculate 中点
            console.log("leftpostion");
            var x = 0;
            var y = this.height * 0.49;
            return [{x, y}];
        },
        getLineRightPosition() {
            //calculate 中点
            var x = this.width * 0.98;
            var y = this.height * 0.49;
            return [{x, y}];
        },
        getLineTopPosition() {
            //calculate 中点
            var x = this.width * 0.49;
            var y = 0;
            return [{x, y}];
        },
        getLineBottomPosition() {
            //calculate 中点
            var x = this.width * 0.49;
            var y = this.height * 0.98;
            return [{x, y}];
        },
        getName() {
            //calculate 中点
            return "";
        },
    }
};
</script>
<style scoped>
.blackDiv {
    background-color: black;
}
</style>