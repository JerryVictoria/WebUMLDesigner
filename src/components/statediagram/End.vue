<template>
    <div
        class="endDiv"
        @click.stop="setEditingId"
        :style="{width: Math.min(this.width, this.height)*0.9 + 'px', height: Math.min(this.width, this.height)*0.9 + 'px'}"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="endDivInside"
            :style="{width: Math.min(this.width, this.height)*0.6 + 'px', height: Math.min(this.width, this.height)*0.6 + 'px'}"
        ></div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "End",
    extends: CommonComponent
};
</script>
<style scoped>
.endDiv {
    border-radius: 50%;
    background-color: white;
    border: 2px solid black;
    position: relative;
}
.endDivInside {
    border-radius: 50%;
    background-color: black;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
</style>