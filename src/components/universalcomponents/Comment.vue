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
            class="outRectDiv"
            :style="{
                width: this.width * 0.98 + 'px',
                height: this.height * 0.8 + 'px'
            }"
        >
            <div
                class="inRectDiv"
                :style="{
                    width: this.width * 0.3 + 'px',
                    height: this.height * 0.1 + 'px'
                }"
            >
                <div
                    class="lineDiv"
                    :style="{
                        width: this.width * 0.3 + 'px', 
                        transform: 'skewY('+ 180*Math.atan(this.height/ this.width / 3)/Math.PI +'deg)',
                        marginTop: this.height * 0.05 + 'px'
                    }"
                ></div>
            </div>
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
.inRectDiv {
    border-left: 2px solid black;
    border-top: 2px solid white;
    border-right: 2px solid white;
    border-bottom: 2px solid black;
    background-color: white;
    float: right;
    margin-top: -2px;
    margin-right: -2px;
}
.lineDiv {
    background-color: black;
    height: 2px;
}
.outRectDiv {
    background-color: white;
    border: 2px solid black;
}
</style>