<template>
    <div
        @click.stop="setEditingId"
        :style="{width: this.width*0.98 + 'px', height: this.height*0.95 + 'px'}"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="roundDiv"
            :style="{width: this.width*0.98 + 'px', height: this.height*0.7 + 'px'}"
        ></div>
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
            :style="{width: this.width*0.98+'px', height: this.height*0.2 + 'px'}"
            v-else
            class="contentSpan"
            @click="handleNameClick"
        >{{name}}</span>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "ComponentInterface",
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
        getLineLeftPosition() {
            //calculate 中点
            console.log("leftpostion");
            var x = 0;
            var y = this.height * 0.49;
            return [{x, y}];
        },
        getLineRightPosition() {
            //calculate 中点
            var x = this.width * 0.98;
            var y = this.height * 0.49;
            return [{x, y}];
        },
        getLineTopPosition() {
            //calculate 中点
            var x = this.width * 0.49;
            var y = 0;
            return [{x, y}];
        },
        getLineBottomPosition() {
            //calculate 中点
            var x = this.width * 0.49;
            var y = this.height * 0.98;
            return [{x, y}];
        },
    }
};
</script>
<style scoped>
.roundDiv {
    border: 2px solid black;
    border-radius: 50%;
    background: white;
}
</style>