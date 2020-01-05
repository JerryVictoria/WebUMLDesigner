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
        }
    }
};
</script>
<style scoped>
.borderDiv {
    border: 2px solid black;
    border-radius: 2%;
}
</style>