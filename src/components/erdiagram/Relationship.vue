<template>
    <div
        @click.stop="setEditingId"
        :style="{
            width: this.width * 0.98 + 'px',
            height: this.height * 0.98 + 'px'
        }"
        v-clickoutside="hideInputAndSave"
    >
        <div>
            <img
                v-if="isWeak"
                draggable="false"
                :style="{maxWidth: this.width*0.9 + 'px', maxHeight: this.height*0.9 + 'px', display: 'block'}"
                src="../../assets/weakRelationship.png"
            />
            <img
                v-else
                draggable="false"
                :style="{maxWidth: this.width*0.9 + 'px', maxHeight: this.height*0.9 + 'px', display: 'block'}"
                src="../../assets/strongRelationship.png"
            />
            <div class="insideContent">
                <div v-if="showInput && id == $store.state.editingId">
                    <el-checkbox v-model="isWeak">弱</el-checkbox>
                    <el-input
                        class="contentSpan"
                        v-model="name"
                        size="mini"
                        :autofocus="true"
                        @focus="saveOriginValue"
                        @blur="submitChange"
                    ></el-input>
                </div>
                <span
                    :style="{
                        width: this.width * 0.8 + 'px',
                        height: this.height * 0.4 + 'px',
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
    name: "Relationship",
    extends: CommonComponent,
    data() {
        return {
            name: "",
            isWeak: true,
            originValue: ""
        };
    },
    mounted() {
        if (this.properties && this.properties.isWeak) {
            this.isWeak = this.properties.isWeak;
        }
    },
    watch: {
        properties: {
            deep: true,
            handler(prop) {
                this.name = prop.name;
                this.isWeak = prop.isWeak;
            }
        },
        isWeak(newBool) {
            if (newBool == undefined) {
                return;
            }
            this.$store.dispatch("modifyNode", {
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
.insideContent {
}
</style>
