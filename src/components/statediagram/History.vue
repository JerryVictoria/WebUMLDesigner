<template>
    <div
        class="roundDiv"
        @click.stop="setEditingId"
        :style="{width: Math.min(this.width, this.height)*0.9 + 'px', height: Math.min(this.width, this.height)*0.9 + 'px'}"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="innerTextDiv"
            :style="{fontSize: Math.min(this.width, this.height)*0.9 + 'px'}"
        >H</div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "History",
    extends: CommonComponent,
    methods: {
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
.roundDiv {
    border-radius: 50%;
    border: 2px solid black;
    background: white;
}
.innerTextDiv {
    color: black;
}
</style>