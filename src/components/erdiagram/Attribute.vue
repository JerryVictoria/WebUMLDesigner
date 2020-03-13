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
            :class="{
                roundDiv: true,
                childrenType: this.propType == 'children',
                keyType: this.propType == 'key',
                multiType: this.propType == 'multivalue'
            }"
            :style="{
                width: this.width * 0.96 + 'px',
                height: this.height * 0.96 + 'px'
            }"
        >
            <div :style="{ marginTop: this.height * 0.2 + 'px' }">
                <div v-if="showInput && id == $store.state.editingId">
                    <el-select v-model="propType" placeholder="请选择" size="mini" style="width: 65%">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input
                        class="contentSpan"
                        v-model="name"
                        size="mini"
                        :autofocus="true"
                        style="width: 65%"
                        @focus="saveOriginValue"
                        @blur="submitChange"
                    ></el-input>
                </div>
                <span
                    :style="{
                        width: this.width * 0.8 + 'px',
                        height: this.height * 0.5 + 'px'
                    }"
                    v-else
                    class="contentSpan"
                    @click="handleNameClick"
                >{{ name }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Attribute",
    extends: CommonComponent,
    data() {
        return {
            name: "",
            propType: "",
            options: [
                { label: "派生", value: "children" },
                { label: "键值", value: "key" },
                { label: "多选", value: "multivalue" }
            ],
            originValue: ""
        };
    },
    mounted() {
        if (this.properties && this.properties.propType) {
            this.propType = this.properties.propType;
        }
    },
    watch: {
        properties: {
            deep: true,
            handler(prop) {
                this.name = prop.name;
                this.propType = prop.propType;
            }
        },
        propType(newPropType) {
            if (newPropType == undefined) {
                return;
            }
            this.$store.dispatch("modifyNode", {
                nodeKey: "properties",
                key: "propType",
                value: newPropType,
                id: this.id
            });
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
.roundDiv {
    border-radius: 50%;
    background-color: white;
}
.childrenType {
    border: 2px dashed black;
}
.keyType {
    border: 2px solid black;
}
.multiType {
    border-color: black;
    border-style: double;
    border-width: 2px;
}
</style>
