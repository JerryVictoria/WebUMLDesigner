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
            class="outsideDiv"
            :style="{
                width: this.width * 0.97 + 'px',
                height: this.height * 0.97 + 'px'
            }"
        >
            <div
                class="insideDiv"
                v-show="isWeak"
                :style="{
                    width: this.width * 0.9 + 'px',
                    height: this.height * 0.9 + 'px'
                }"
            ></div>
            <div
                class="insideContent"
                :style="{
                    width: this.width * 0.9 + 'px',
                    height: this.height * 0.9 + 'px',
                    paddingTop: this.height * 0.2 + 'px'
                }"
            >
                <div v-if="showInput && id == $store.state.editingId">
                    <el-checkbox v-model="isWeak">弱</el-checkbox>
                    <el-input
                        class="contentSpan"
                        v-model="name"
                        size="mini"
                        :autofocus="true"
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
                    >{{ name }}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Entity",
    extends: CommonComponent,
    data() {
        return {
            name: "",
            isWeak: true
        };
    },
    watch: {
        properties: {
            deep: true,
            handler(prop) {
                this.name = prop.name;
                this.isWeak = prop.isWeak;
            }
        },
        name(newName) {
            this.$store.commit("modifyNode", {
                nodeKey: "properties",
                key: "name",
                value: newName,
                id: this.id
            });
        },
        isWeak(newBool) {
            this.$store.commit("modifyNode", {
                nodeKey: "properties",
                key: "isWeak",
                value: newBool,
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
.outsideDiv {
    border: 2px solid black;
    position: relative;
    background: white;
}
.insideDiv {
    border: 1px solid black;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
.insideContent {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
</style>
