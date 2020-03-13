<template>
    <div
        v-clickoutside="hideInputAndSave"
        @click.stop="setEditingId"
        :style="{height: this.height*0.98 + 'px'}"
    >
        <div :style="{width: this.width*0.98 + 'px'}">
            <img
                draggable="false"
                class="horizontal-middle"
                :style="{maxWidth: this.width*0.9 + 'px', maxHeight: this.height*0.9 + 'px', display: 'block'}"
                src="../../assets/character.png"
            />
        </div>
        <el-input
            class="contentSpan"
            v-model="name"
            v-if="showInput && id == $store.state.editingId"
            :style="{width: this.width*0.9 + 'px'}"
            size="mini"
            :autofocus="true"
        ></el-input>
        <span
            @click="handleNameClick"
            class="contentSpan"
            :style="{width: this.width*0.9 + 'px'}"
            v-else
        >{{name}}</span>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Character",
    extends: CommonComponent,
    data() {
        return {
            name: ""
        };
    },
    watch: {
        properties: {
            deep: true,
            handler(prop) {
                this.name = prop.name;
            }
        },
        name(newName) {
            this.$store.dispatch("modifyNode", {
                nodeKey: "properties",
                key: "name",
                value: newName,
                id: this.id
            });
        }
    },
    methods: {
        hideInputAndSave() {
            this.showInput = false;
            this.setEditStateFalse();
        },
        getLineLeftPosition(){
            //calculate 中点
            console.log("leftpostion")
            var x=0;
            var y=this.height*0.49
            return [{x,y}];
        },
        getLineRightPosition(){
            //calculate 中点
            var x=this.width*0.98;
            var y=this.height*0.49
            return [{x,y}];
        },
        getLineTopPosition(){
            //calculate 中点
            var x=this.width*0.49;
            var y=0
            return [{x,y}];
        },
        getLineBottomPosition(){
            //calculate 中点
            var x=this.width*0.49;
            var y=this.height*0.98
            return [{x,y}];
        }

    }
};
</script>