<template>
    <div
        class="roundDiv"
        @click.stop="setEditingId"
        :style="{width: Math.min(this.width, this.height)*0.9 + 'px', height: Math.min(this.width, this.height)*0.9 + 'px'}"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="innerTextDiv"
            :style="{fontSize: Math.min(this.width, this.height)*0.75 + 'px'}"
        >H*</div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "DetailedHistory",
    extends: CommonComponent
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
    padding: 3px;
}
</style>