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
                @focus="saveOriginValue"
                @blur="submitChange"
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
            name: "",
            originValue: ""
        };
    },
    watch: {
        properties: {
            deep: true,
            handler(prop) {
                this.name = prop.name;
            }
        }
    },
    methods: {
        hideInputAndSave() {
            this.showInput = false;
            this.setEditStateFalse();
        },
        saveOriginValue() {
            this.originValue = this.name;
        },
        submitChange() {
            if (this.originValue == this.name) {
                return;
            }
            this.$store.dispatch("modifyNode", {
                nodeKey: "properties",
                key: "name",
                value: this.name,
                originValue: this.originValue,
                id: this.id
            });
        },
        getName() {
            //calculate 中点
            return "";
        },
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