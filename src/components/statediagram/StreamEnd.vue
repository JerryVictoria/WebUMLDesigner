<template>
    <div
        class="roundDiv"
        @click.stop="setEditingId"
        :style="{width: Math.min(this.width, this.height)*0.9 + 'px', height: Math.min(this.width, this.height)*0.9 + 'px'}"
        v-clickoutside="hideInputAndSave"
    >
        <img
            draggable="false"
            :style="{maxWidth: this.width*0.9 + 'px', maxHeight: this.height*0.9 + 'px', display: 'block'}"
            src="../../assets/history.png"
        />
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "StreamEnd",
    extends: CommonComponent
};
</script>
<style scoped>
.roundDiv {
    background: white;
}
</style>