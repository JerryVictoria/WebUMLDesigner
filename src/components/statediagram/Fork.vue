<template>
    <div
        @click.stop="setEditingId"
        :style="{width: this.width*0.98 + 'px', height: this.height*0.98 + 'px', display: 'flex'}"
        v-clickoutside="hideInputAndSave"
    >
        <div
            class="leftTriDiv"
            :style="{borderRightWidth: this.width*0.45 + 'px',
                     borderTopWidth: this.height*0.45 + 'px', borderBottomWidth: this.height*0.45 + 'px'}"
        >
            <div
                class="leftTriWhiteDiv"
                :style="{borderRightWidth: this.width*0.45 - 2 + 'px',
                     borderTopWidth: this.height*0.45 - 1 + 'px', borderBottomWidth: this.height*0.45 - 1 + 'px',
                     marginTop: -this.height*0.45 + 1 + 'px'}"
            ></div>
        </div>
        <div
            class="rightTriDiv"
            :style="{borderLeftWidth: this.width*0.45 + 'px',
                     borderTopWidth: this.height*0.45 + 'px', borderBottomWidth: this.height*0.45 + 'px'}"
        >
            <div
                class="rightTriWhiteDiv"
                :style="{borderLeftWidth: this.width*0.45 - 2  + 'px',
                     borderTopWidth: this.height*0.45 - 1 + 'px', borderBottomWidth: this.height*0.45 - 1 + 'px',
                     marginLeft: -this.width*0.45 + 'px' , marginTop: -this.height*0.45 + 1 + 'px'}"
            ></div>
        </div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
export default {
    name: "Fork",
    extends: CommonComponent,
    methods: {
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
.leftTriDiv {
    width: 0;
    height: 0;
    border-right: solid black;
    border-top: solid transparent;
    border-bottom: solid transparent;
    border-left: solid transparent;
}
.leftTriWhiteDiv {
    width: 0;
    height: 0;
    border-right: solid white;
    border-top: solid transparent;
    border-bottom: solid transparent;
    border-left: solid transparent;
}
.rightTriDiv {
    width: 0;
    height: 0;
    border-left: solid black;
    border-top: solid transparent;
    border-bottom: solid transparent;
    border-right: solid transparent;
}
.rightTriWhiteDiv {
    width: 0;
    height: 0;
    border-left: solid white;
    border-top: solid transparent;
    border-bottom: solid transparent;
    border-right: solid transparent;
}
</style>