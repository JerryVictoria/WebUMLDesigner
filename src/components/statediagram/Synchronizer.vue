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
    extends: CommonComponent
};
</script>
<style scoped>
.blackDiv {
    background-color: black;
}
</style>