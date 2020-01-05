<template>
    <div
        v-clickoutside="hideInputAndSave"
        class="useCaseDiv"
        @click.stop="setEditingId"
        :style="{minWidth: this.width*0.7 + 'px', minHeight: this.height*0.6 + 'px'}"
    >
        <el-input
            class="contentSpan"
            v-model="name"
            v-if="showInput && id == $store.state.editingId"
            :style="{width: this.width*0.6 + 'px', minHeight: this.height*0.2 + 'px', marginTop: this.height*0.1 + 'px'}"
            size="mini"
            :autofocus="true"
        ></el-input>
        <span
            v-else
            @click="handleNameClick"
            class="contentSpan"
            :style="{width: this.width*0.6+'px', height: this.height*0.3 + 'px', marginTop: this.height*0.1 + 'px'}"
        >{{name}}</span>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "UseCase",
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
            this.$store.commit("modifyNode", {
                nodeKey: "properties",
                key: "name",
                value: newName,
                id: this.id
            });
        }
    },
    methods: {
        hideInputAndSave() {
            console.log("hideInputAndSave");
            this.showInput = false;
            this.setEditStateFalse();
        }
    }
};
</script>
<style scoped>
.useCaseDiv {
    border: 2px solid black;
    border-radius: 50%;
    padding: 10px;
    background-color: white;
}
</style>