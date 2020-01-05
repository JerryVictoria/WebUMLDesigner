<template>
    <div
        @click.stop="setEditingId"
        :style="{width: this.width*0.9 + 'px', height: this.height*0.98 + 'px'}"
        v-clickoutside="hideInputAndSave"
    >
        <img
            draggable="false"
            :style="{maxWidth: this.width*0.9 + 'px', maxHeight: this.height*0.9 + 'px', display: 'block'}"
            src="../../assets/delete.png"
        />
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Delete",
    extends: CommonComponent
};
</script>
<style scoped>
</style>