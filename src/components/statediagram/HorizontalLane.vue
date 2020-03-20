<template>
    <div
        class="objectDiv"
        @click.stop="setEditingId"
        :style="{
            minWidth: this.width * 0.95 + 'px',
            minHeight: this.height * 0.95 + 'px',
            display: 'flex'
        }"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="laneTitle"
            :style="{
                width: this.width * 0.2 + 'px',
                height: this.height * 0.95 + 'px'
            }"
        >
            <el-input
                class="contentSpan rotate90"
                v-model="name"
                v-if="showInput && id == $store.state.editingId"
                size="mini"
                :autofocus="true"
                @focus="saveOriginValue"
                @blur="submitChange"
                :style="{
                    width: this.height * 0.8 + 'px',
                    marginTop: this.height * 0.4 + 'px',
                    marginLeft: -this.height * 0.3 + 'px'
                }"
            ></el-input>
            <span
                class="contentSpan omitted rotate90"
                :style="{
                    width: this.height * 0.9 + 'px',
                    marginTop: this.height * 0.4 + 'px',
                    marginLeft: -this.height * 0.35 + 'px'
                }"
                v-else
                @click="handleNameClick"
                >{{ name }}</span
            >
        </div>
        <div
            class="laneBody"
            :style="{
                width: this.width * 0.78 + 'px',
                height: this.height * 0.95 + 'px'
            }"
        ></div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "HorizontalLane",
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
.laneTitle {
    border: 2px solid black;
    background: white;
}
.laneBody {
    border-top: 2px solid black;
    border-right: 2px solid black;
    border-bottom: 2px solid black;
}
.rotate90 {
    transform: rotate(-90deg);
}
</style>
