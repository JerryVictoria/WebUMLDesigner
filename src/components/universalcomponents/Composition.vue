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
            class="downRectDiv"
            :style="{
            width: this.width * 0.98 + 'px',
            height: this.height * 0.8 + 'px'
            }"
        >
            <div
                class="upRectDiv"
                :style="{
                    width: this.width * 0.35 + 'px',
                    height: this.height * 0.25 + 'px'
                }"
            >
                <el-select
                    v-model="compositionType"
                    placeholder="请选择"
                    size="mini"
                    style="width: 95%"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </div>
            <el-input
                class="contentSpan"
                v-model="condition"
                v-if="showInput && id == $store.state.editingId"
                size="mini"
                :autofocus="true"
                :style="{marginTop: this.height*0.1 + 'px'}"
            ></el-input>
            <span
                :style="{width: this.width*0.6+'px', marginTop: this.height*0.1 + 'px'}"
                v-else
                class="contentSpan"
                @click="handleNameClick"
            >{{condition}}</span>
        </div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Composition",
    extends: CommonComponent,
    data() {
        return {
            condition: "",
            compositionType: "",
            options: [
                { label: "Opt", value: "Opt" },
                { label: "Alt", value: "Alt" },
                { label: "Loop", value: "Loop" }
            ]
        };
    },
    mounted() {
        if (this.properties && this.properties.condition) {
            this.condition = this.properties.condition;
        }
        if (this.properties && this.properties.compositionType) {
            this.compositionType = this.properties.compositionType;
        }
    },
    watch: {
        properties: {
            deep: true,
            handler(prop) {
                this.condition = prop.condition;
                this.compositionType = prop.compositionType;
            }
        },
        condition(newCondition) {
            this.$store.dispatch("modifyNode", {
                nodeKey: "properties",
                key: "name",
                value: newCondition,
                id: this.id
            });
        },
        compositionType(newCompositionType) {
            this.$store.dispatch("modifyNode", {
                nodeKey: "properties",
                key: "compositionType",
                value: newCompositionType,
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
    border-right: 2px solid black;
    border-bottom: 2px solid black;
    background-color: white;
}
.downRectDiv {
    background-color: white;
    border: 2px solid black;
}
</style>