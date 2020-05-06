<template>
    <div
        v-clickoutside="hideInputAndSave"
        class="useCaseDiv"
        @click.stop="setEditingId"
        :style="{
            minWidth: this.width * 0.7 + 'px',
            minHeight: this.height * 0.6 + 'px'
        }"
    >
        <el-input
            class="contentSpan"
            v-model="name"
            v-if="showInput && id == $store.state.editingId"
            :style="{
                width: this.width * 0.6 + 'px',
                minHeight: this.height * 0.2 + 'px',
                marginTop: this.height * 0.1 + 'px'
            }"
            size="mini"
            :autofocus="true"
            @focus="saveOriginValue"
            @blur="submitChange"
        ></el-input>
        <span
            v-else
            @click="handleNameClick"
            class="contentSpan"
            :style="{
                width: this.width * 0.6 + 'px',
                height: this.height * 0.3 + 'px',
                marginTop: this.height * 0.1 + 'px'
            }"
            >{{ name }}</span
        >
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "UseCase",
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
            console.log("hideInputAndSave");
            this.showInput = false;
            this.setEditStateFalse();
        },
        getLineLeftPosition() {
            //calculate 中点
            console.log("leftpostion");
            var x = 0;
            var y = this.height * 0.49;
            return [{ x, y }];
        },
        getLineRightPosition() {
            //calculate 中点
            var x = this.width * 0.98;
            var y = this.height * 0.49;
            return [{ x, y }];
        },
        getLineTopPosition() {
            //calculate 中点
            var x = this.width * 0.49;
            var y = 0;
            return [{ x, y }];
        },
        getLineBottomPosition() {
            //calculate 中点
            var x = this.width * 0.49;
            var y = this.height * 0.98;
            return [{ x, y }];
        },
        getName() {
            //calculate 中点
            return "";
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
.useCaseDiv {
    border: 2px solid black;
    border-radius: 50%;
    padding: 10px;
    background-color: white;
}
</style>
