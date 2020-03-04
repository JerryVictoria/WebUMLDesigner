<template>
    <div
        class="objectDiv"
        @click.stop="setEditingId"
        :style="{minWidth: this.width*0.95 + 'px', minHeight: this.height*0.9 + 'px'}"
        v-clickoutside="hideInputAndSave"
    >
        <el-input
            class="contentSpan"
            v-model="name"
            v-if="showInput && id == $store.state.editingId"
            size="mini"
            :autofocus="true"
            :style="{marginTop: this.height*0.2 + 'px'}"
        ></el-input>
        <span
            :style="{width: this.width*0.6+'px', marginTop: this.height*0.2 + 'px'}"
            v-else
            class="contentSpan"
            @click="handleNameClick"
        >{{name}}</span>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "State",
    extends: CommonComponent,
    data() {
        return {
            name: ""
        };
    },
    watch: {
        properties: {
            deep: true,
            handler(prop) {
                this.name = prop.name;
            }
        },
        name(newName) {
            this.$store.dispatch("modifyNode", {
                nodeKey: "properties",
                key: "name",
                value: newName,
                id: this.id
            });
        }
    },
    methods: {
        hideInputAndSave() {
            this.showInput = false;
            this.setEditStateFalse();
        }
    }
};
</script>
<style scoped>
.objectDiv {
    border: 2px solid black;
    background-color: white;
    border-radius: 25%;
}
</style>