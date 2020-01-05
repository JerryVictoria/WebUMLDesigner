<template>
    <div
        class="borderDiv"
        @click.stop="setEditingId"
        :style="{width: this.width*0.9 + 'px', height: this.height*0.98 + 'px'}"
        v-clickoutside="hideInputAndSave"
    ></div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Activation",
    extends: CommonComponent
};
</script>
<style scoped>
.borderDiv {
    border: 2px solid black;
    border-radius: 2%;
    background-color: white;
}
</style>