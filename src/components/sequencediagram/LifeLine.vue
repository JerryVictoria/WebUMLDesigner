<template>
    <div @click.stop="setEditingId" v-clickoutside="hideInputAndSave">
        <div
            class="lifeline_head"
            :style="{width: this.width*0.98 + 'px', height: this.height*0.1 + 'px'}"
        >
            <el-input
                class="contentSpan"
                v-model="name"
                v-if="showInput && id == $store.state.editingId"
                size="mini"
                :autofocus="true"
            ></el-input>
            <span
                :style="{width: this.width*0.6+'px', height: this.height*0.05 + 'px', marginTop: this.height*0.01 + 'px'}"
                v-else
                class="contentSpan omitted"
                @click="handleNameClick"
            >{{name}}</span>
        </div>
        <div
            class="lifeline_body"
            :style="{width: this.width*0.49 + 'px', height: this.height*0.8 + 'px'}"
        ></div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Border",
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
            this.showInput = false;
            this.setEditStateFalse();
        }
    }
};
</script>
<style scoped>
.lifeline_head {
    border: 2px solid black;
    border-radius: 2%;
    background-color: white;
}
.lifeline_body {
    border-right: 2px dashed black;
}
</style>