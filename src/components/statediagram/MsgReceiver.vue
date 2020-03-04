<template>
    <div
        @click.stop="setEditingId"
        :style="{width: this.width*0.98 + 'px', height: this.height*0.98 + 'px', display: 'flex'}"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="rectDiv"
            :style="{width: this.width*0.9 + 'px', height: this.height*0.9 + 'px'}"
        >
            <el-input
                class="contentSpan"
                v-model="name"
                v-if="showInput && id == $store.state.editingId"
                size="mini"
                :autofocus="true"
                :style="{width: this.width*0.6+'px',marginTop: this.height*0.2 + 'px'}"
            ></el-input>
            <span
                :style="{width: this.width*0.6+'px', minHeight: this.height*0.6 + 'px', marginTop: this.height*0.2 + 'px'}"
                v-else
                class="contentSpan"
                @click="handleNameClick"
            >{{name}}</span>
        </div>
        <div
            class="triDiv"
            :style="{borderWidth: this.height*0.45+2 + 'px', marginLeft: -this.height*0.9-4 + 'px'}"
        >
            <div
                class="triWhiteDiv"
                :style="{borderWidth: this.height*0.45 + 'px', marginLeft: -this.height*0.45+2 + 'px', marginTop: -this.height*0.45 + 'px'}"
            ></div>
        </div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "MsgReceiver",
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
.rectDiv {
    border-top: 2px solid black;
    border-left: 2px solid black;
    border-bottom: 2px solid black;
    background: white;
}
.triDiv {
    width: 0;
    height: 0;
    border-right: solid black;
    border-top: solid transparent;
    border-bottom: solid transparent;
    border-left: solid transparent;
}
.triWhiteDiv {
    width: 0;
    height: 0;
    border-right: solid white;
    border-top: solid transparent;
    border-bottom: solid transparent;
    border-left: solid transparent;
}
</style>