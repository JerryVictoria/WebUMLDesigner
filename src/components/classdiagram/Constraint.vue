<template>
    <div
        @click.stop="setEditingId"
        :style="{width: this.width*0.98 + 'px', height: this.height*0.95 + 'px', display: 'flex'}"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="constraintDiv"
            :style="{width: this.width*0.15 + 'px', fontSize: this.height*0.3 + 'px', marginTop: this.height*0.3 + 'px'}"
        >{</div>
        <div :style="{width: this.width*0.6}">
            <el-input
                class="contentSpan"
                v-model="name"
                v-if="showInput && id == $store.state.editingId"
                size="mini"
                :autofocus="true"
                @focus="saveOriginValue"
                @blur="submitChange"
                :style="{width: this.width*0.6 + 'px', marginTop: this.height*0.3 + 'px'}"
            ></el-input>
            <span
                :style="{width: this.width*0.6 + 'px', height: this.height*0.5 + 'px', marginTop: this.height*0.3 + 'px'}"
                v-else
                class="contentSpan"
                @click="handleNameClick"
            >{{name}}</span>
        </div>
        <div
            class="constraintDiv"
            :style="{width: this.width*0.15 + 'px', fontSize: this.height*0.3 + 'px', marginTop: this.height*0.3 + 'px'}"
        >}</div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Constraint",
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
        }
    }
};
</script>
<style scoped>
.constraintDiv {
    color: black;
    transform: scale(1, 1.5);
}
</style>
