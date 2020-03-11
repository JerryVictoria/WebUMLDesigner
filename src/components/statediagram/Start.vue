<template>
    <div
        class="startDiv"
        @click.stop="setEditingId"
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
    }
};
</script>
<style scoped>
.startDiv {
    border-radius: 50%;
    background-color: black;
}
</style>