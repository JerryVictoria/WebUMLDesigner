<template>
    <div
        @click.stop="setEditingId"
        :style="{width: this.width*0.98 + 'px', height: this.height*0.98 + 'px'}"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="topDiv"
            :style="{width: this.width*0.8 + 'px', height: this.height * 0.15 + 'px', marginLeft: this.height * 0.15 / 2 + 1 + 'px'}"
        ></div>
        <div
            style="display:flex;"
            :style="{width: this.width*0.8 + this.height*0.15*Math.sqrt(2) + 'px'}"
        >
            <div
                class="bodyDiv"
                :style="{width: this.width*0.8 + 'px', height: this.height*0.8 + 'px'}"
            >
                <div
                    v-if="showInput && id == $store.state.editingId"
                    :style="{marginTop: this.height * 0.25 + 'px', paddingLeft: Math.min(10, this.width*0.2) + 'px', width: this.width*0.6 + 'px'}"
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
                    :style="{width: this.width*0.6+'px', height: this.height*0.5 + 'px', marginTop: this.height * 0.25 + 'px'}"
                    v-else
                    :class="{'contentSpan omitted': true, 'underline': isInstance}"
                    @click="handleNameClick"
                >{{name}}</span>
            </div>
            <div
                class="rightDiv"
                :style="{width: this.height*0.15+ 'px', height: this.height * 0.8 + 'px', marginTop: -this.height * 0.15 / 2 - 1 + 'px'}"
            ></div>
        </div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Node",
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
.bodyDiv {
    border: 2px solid black;
    background-color: white;
}
.topDiv {
    border-top: 2px solid black;
    border-left: 2px solid black;
    border-right: 2px solid black;
    background-color: grey;
    -webkit-transform: skewX(-45deg);
    transform: skewX(-45deg);
}
.rightDiv {
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
    background-color: grey;
    -webkit-transform: skewY(-45deg);
    transform: skewY(-45deg);
}
</style>