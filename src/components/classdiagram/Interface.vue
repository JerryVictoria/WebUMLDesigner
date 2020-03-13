<template>
    <div
        class="borderDiv"
        @click.stop="setEditingId"
        :style="{width: this.width*0.98 + 'px', height: this.height*0.95 + 'px'}"
        v-clickoutside="hideInputAndSave"
    >
        <el-input
            class="contentSpan"
            v-model="name"
            v-if="showInput && id == $store.state.editingId"
            size="mini"
            :autofocus="true"
            :style="{marginTop: this.height*0.2 + 'px'}"
            @focus="saveOriginValue"
            @blur="submitChange"
        ></el-input>
        <span
            :style="{width: this.width*0.7+'px', height: this.height*0.5 + 'px', marginTop: this.height*0.2 + 'px'}"
            v-else
            class="contentSpan"
            @click="handleNameClick"
        >{{name}}</span>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Interface",
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
