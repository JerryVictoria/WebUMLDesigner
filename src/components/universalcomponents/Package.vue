<template>
    <div
        @click.stop="setEditingId"
        :style="{
            width: this.width * 0.98 + 'px',
            height: this.height * 0.98 + 'px'
        }"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="upRectDiv"
            :style="{
            width: this.width * 0.4 + 'px',
            height: this.height * 0.1 + 'px'
            }"
        ></div>
        <div
            class="downRectDiv"
            :style="{
            width: this.width * 0.98 + 'px',
            height: this.height * 0.8 + 'px'
            }"
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
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Package",
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
.upRectDiv {
    border-left: 2px solid black;
    border-right: 2px solid black;
    border-top: 2px solid black;
    background-color: white;
}
.downRectDiv {
    background-color: white;
    border: 2px solid black;
}
</style>