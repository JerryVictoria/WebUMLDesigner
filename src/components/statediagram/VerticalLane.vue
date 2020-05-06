<template>
    <div
        class="objectDiv"
        @click.stop="setEditingId"
        :style="{
            minWidth: this.width * 0.95 + 'px',
            minHeight: this.height * 0.95 + 'px'
        }"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="laneTitle"
            :style="{
                width: this.width * 0.95 + 'px',
                height: this.height * 0.15 + 'px'
            }"
        >
            <el-input
                class="contentSpan"
                v-model="name"
                v-if="showInput && id == $store.state.editingId"
                size="mini"
                :autofocus="true"
                @focus="saveOriginValue"
                @blur="submitChange"
                :style="{ marginTop: this.height * 0.05 + 'px' }"
            ></el-input>
            <span
                :style="{
                    width: this.width * 0.6 + 'px',
                    maxHeight: this.height * 0.2 + 'px',
                    marginTop: this.height * 0.05 + 'px'
                }"
                v-else
                class="contentSpan omitted"
                @click="handleNameClick"
                >{{ name }}</span
            >
        </div>
        <div
            class="laneBody"
            :style="{
                width: this.width * 0.95 + 'px',
                height: this.height * 0.75 + 'px'
            }"
        ></div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "State",
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
        getName() {
            //calculate 中点
            return "";
        },
    }
};
</script>
<style scoped>
.laneTitle {
    border: 2px solid black;
    background: white;
}
.laneBody {
    border-left: 2px solid black;
    border-right: 2px solid black;
    border-bottom: 2px solid black;
}
</style>
