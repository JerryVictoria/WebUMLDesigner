<template>
    <div
        @click.stop="setEditingId"
        :style="{width: this.width*0.98 + 'px', height: this.height*0.98 + 'px'}"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="componentImgDiv"
            :style="{width: this.width*0.8 + 'px', height: this.height*0.95 + 'px', marginLeft: Math.min(30, this.width*0.15) + 'px'}"
        >
            <div
                v-if="showInput && id == $store.state.editingId"
                :style="{marginTop: this.height * 0.25 + 'px', paddingLeft: Math.min(30, this.width*0.3) + 'px', width: this.width*0.6 + 'px'}"
            >
                <el-checkbox v-model="isInstance">实例化</el-checkbox>
                <el-input
                    class="contentSpan"
                    style="width:100%"
                    v-model="name"
                    size="mini"
                    :autofocus="true"
                    @focus="saveOriginValue"
                    @blur="submitChange"
                ></el-input>
            </div>
            <span
                :style="{width: this.width*0.6+'px', height: this.height*0.5 + 'px', marginTop: this.height * 0.25 + 'px', marginLeft: Math.min(30, this.width*0.15) + 'px'}"
                v-else
                :class="{'contentSpan omitted': true, 'underline': isInstance}"
                @click="handleNameClick"
            >{{name}}</span>
        </div>
        <div
            class="leftDiv"
            :style="{width: Math.min(60, this.width*0.3) + 'px', height: this.height * 0.2 + 'px', marginTop: -this.height * 0.8 + 'px'}"
        ></div>
        <div
            class="leftDiv"
            :style="{width: Math.min(60, this.width*0.3) + 'px', height: this.height * 0.2 + 'px',marginTop: this.height * 0.1 + 'px'}"
        ></div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "DiagramComponent",
    extends: CommonComponent,
    data() {
        return {
            name: "",
            isInstance: false,
            originValue: ""
        };
    },
    watch: {
        properties: {
            deep: true,
            handler(prop) {
                this.name = prop.name;
                this.isInstance = prop.isInstance;
            }
        },
        isInstance(isInstance) {
            this.$store.dispatch("modifyNode", {
                nodeKey: "properties",
                key: "isInstance",
                value: isInstance,
                id: this.id
            });
        }
    },
    mounted() {
        if (this.properties && this.properties.isInstance) {
            this.isInstance = this.properties.isInstance;
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
.componentImgDiv {
    border: 2px solid black;
    background-color: white;
}
.leftDiv {
    border: 2px solid black;
    background-color: white;
}
</style>