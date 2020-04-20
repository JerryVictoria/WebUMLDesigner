<template>
    <div
        class="wrapbox"
        :draggable="$store.state.editingId == id && !$store.state.editing"
    >
        <div
            v-show="$store.state.editingId == id && !$store.state.editing"
            class="line line-t"
            data-type="t"
            @mousedown="mousedownHanlder"
        />
        <div
            v-show="$store.state.editingId == id && !$store.state.editing"
            class="line line-l"
            data-type="l"
            @mousedown="mousedownHanlder"
        />
        <div
            v-show="$store.state.editingId == id && !$store.state.editing"
            class="line line-r"
            data-type="r"
            @mousedown="mousedownHanlder"
        />
        <div
            v-show="$store.state.editingId == id && !$store.state.editing"
            class="line line-b"
            data-type="b"
            @mousedown="mousedownHanlder"
        />
        <div
            v-show="$store.state.editingId == id && !$store.state.editing"
            class="block block-tl"
            data-type="tl"
            @mousedown="mousedownHanlder"
        />
        <div
            v-show="$store.state.editingId == id && !$store.state.editing"
            class="block block-tr"
            data-type="tr"
            @mousedown="mousedownHanlder"
        />
        <div
            v-show="$store.state.editingId == id && !$store.state.editing"
            class="block block-bl"
            data-type="bl"
            @mousedown="mousedownHanlder"
        />
        <div
            v-if="$store.state.editingId == id && !$store.state.editing"
            class="block block-br"
            data-type="br"
            @mousedown="mousedownHanlder"
        />
        <slot />
    </div>
</template>
<script>
    import html2canvas from "html2canvas";
    import canvg from "canvg";
    import * as qiniu from 'qiniu-js'
export default {
    name: "Resizer",
    props: {
        id: Number
    },
    data() {
        return {
            max: { height: 1000, width: 1000 },
            min: { height: 0, width: 0 },
            speed: 1,
            heightChangeFlag: false,
            widthChangeFlag: false,
            leftChangeFlag: false,
            topChangeFlag: false
        };
    },
    watch: {},
    created() {
        this.$watch(
            function isShowing() {
                return (
                    this.$store.state.editingId == this.id &&
                    !this.$store.state.editing
                );
            },
            function cb(newVal, oldVal) {
                if (newVal) {
                    document.body.addEventListener(
                        "mouseup",
                        this.mouseupHanlder
                    );
                } else {
                    document.body.removeEventListener(
                        "mouseup",
                        this.mouseupHanlder
                    );
                }
            }
        );
    },
    destroyed() {
        document.body.removeEventListener("mouseup", this.mouseupHanlder);
    },
    methods: {
        pauseEvent(e) {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
            e.cancelBubble = true;
            e.returnValue = false;
            return false;
        },
        getStyle(element) {
            if (element.currentStyle) {
                return element.currentStyle;
            } else {
                return getComputedStyle(element, false);
            }
        },
        mousedownHanlder(event) {
            this.pauseEvent(event);
            let { cursor } = this.getStyle(event.target);
            this.dataType = event.target.getAttribute("data-type");
            this.event = event;
            document.body.addEventListener("mousemove", this.mousemoveHandler);
            document.body.style.cursor = cursor;
        },
        mouseupHanlder(event) {
            //console.log(event);
            document.body.removeEventListener(
                "mousemove",
                this.mousemoveHandler
            );
            document.body.style.cursor = "default";
            console.log("up");
            //数据修改
            if (this.id == this.$store.state.editingId) {
                var keys = [];
                var values = [];
                if (this.widthChangeFlag) {
                    keys.push("width");
                    values.push(this.deletePx(this.$el.style.width));
                }
                if (this.heightChangeFlag) {
                    keys.push("height");
                    values.push(this.deletePx(this.$el.style.height));
                }
                if (this.topChangeFlag) {
                    keys.push("top");
                    values.push(this.deletePx(this.$el.style.top));
                }
                if (this.leftChangeFlag) {
                    keys.push("left");
                    values.push(this.deletePx(this.$el.style.left));
                }
                if (
                    this.widthChangeFlag ||
                    this.heightChangeFlag ||
                    this.topChangeFlag ||
                    this.leftChangeFlag
                ) {
                    this.$store.dispatch("modifyNode", {
                        nodeKey: "styles",
                        key: keys,
                        value: values,
                        id: this.$store.state.editingId
                    });
                    this.widthChangeFlag = false;
                    this.heightChangeFlag = false;
                    this.topChangeFlag = false;
                    this.leftChangeFlag = false;
                }
            }
        },
        mousemoveHandler(event) {
            this.pauseEvent(event);
            let { width, height } = this.getStyle(this.$el);
            width = parseInt(width);
            height = parseInt(height);
            this[this.dataType]({ event, width, height });
            this.event = event;
            this.$slots.default[0].componentInstance.setWidth(
                parseFloat(this.$el.style.width)
            );
            this.$slots.default[0].componentInstance.setHeight(
                parseFloat(this.$el.style.height)
            );
        },
        t({ event, height }) {
            this.heightChangeFlag = true;
            this.topChangeFlag = true;
            var styleTop = parseFloat(this.$el.style.top);
            var originHeight = parseFloat(this.$el.style.height);
            if (event.y > this.event.y) {
                this.$el.style.height = this.min.height
                    ? `${Math.max(
                          this.min.height,
                          height - (event.y - this.event.y) * this.speed
                      )}px`
                    : `${height - (event.y - this.event.y) * this.speed}px`;
                this.$el.style.top =
                    styleTop +
                    Math.abs(originHeight - parseFloat(this.$el.style.height)) +
                    "px";
            } else {
                this.$el.style.height = this.max.height
                    ? `${Math.min(
                          this.max.height,
                          height + (this.event.y - event.y) * this.speed
                      )}px`
                    : `${height + (this.event.y - event.y) * this.speed}px`;
                this.$el.style.top =
                    styleTop -
                    Math.abs(originHeight - parseFloat(this.$el.style.height)) +
                    "px";
            }
        },
        l({ event, width }) {
            this.widthChangeFlag = true;
            this.leftChangeFlag = true;
            var styleLeft = parseFloat(this.$el.style.left);
            var originWidth = parseFloat(this.$el.style.width);
            if (event.x > this.event.x) {
                this.$el.style.width = this.min.width
                    ? `${Math.max(
                          this.min.width,
                          width - (event.x - this.event.x) * this.speed
                      )}px`
                    : `${width - (event.x - this.event.x) * this.speed}px`;

                this.$el.style.left =
                    styleLeft +
                    Math.abs(originWidth - parseFloat(this.$el.style.width)) +
                    "px";
            } else {
                this.$el.style.width = this.max.width
                    ? `${Math.min(
                          this.max.width,
                          width + (this.event.x - event.x) * this.speed
                      )}px`
                    : `${width + (this.event.x - event.x) * this.speed}px`;
                this.$el.style.left =
                    styleLeft -
                    Math.abs(originWidth - parseFloat(this.$el.style.width)) +
                    "px";
            }
        },
        r({ event, width }) {
            this.widthChangeFlag = true;
            if (event.x > this.event.x) {
                this.$el.style.width = this.max.width
                    ? `${Math.min(
                          this.max.width,
                          width + (event.x - this.event.x) * this.speed
                      )}px`
                    : `${width + (event.x - this.event.x) * this.speed}px`;
            } else {
                this.$el.style.width = this.min.width
                    ? `${Math.max(
                          this.min.width,
                          width - (this.event.x - event.x) * this.speed
                      )}px`
                    : `${width - (this.event.x - event.x) * this.speed}px`;
            }
        },
        b({ event, height }) {
            this.heightChangeFlag = true;
            if (event.y > this.event.y) {
                this.$el.style.height = this.max.height
                    ? `${Math.min(
                          this.max.height,
                          height + (event.y - this.event.y) * this.speed * 1.2
                      )}px`
                    : `${height +
                          (event.y - this.event.y) * this.speed * 1.2}px`;
            } else {
                this.$el.style.height = this.min.height
                    ? `${Math.max(
                          this.min.height,
                          height - (this.event.y - event.y) * this.speed
                      )}px`
                    : `${height - (this.event.y - event.y) * this.speed}px`;
            }
        },
        tl({ event, width, height }) {
            this.t({ event, height });
            this.l({ event, width });
        },
        tr({ event, width, height }) {
            this.t({ event, height });
            this.r({ event, width });
        },
        bl({ event, width, height }) {
            this.b({ event, height });
            this.l({ event, width });
        },
        br({ event, width, height }) {
            this.b({ event, height });
            this.r({ event, width });
        },
        deletePx(num) {
            if (num.includes("px")) {
                return num.substring(0, num.length - 2);
            }
        }
    }
};
</script>
<style scoped>
.wrapbox {
    position: relative;
    display: table;
    position: absolute;
}
.line,
.block {
    position: absolute;
    margin: auto;
}
.line-t {
    top: -2px;
    left: 0;
    right: 0;
    width: 100%;
    height: 10px;
    cursor: s-resize;
    border-top: 1px solid rgb(187, 187, 187);
}
.line-l {
    top: 0;
    left: -2px;
    bottom: 0;
    width: 10px;
    height: 100%;
    cursor: w-resize;
    border-left: 1px solid rgb(187, 187, 187);
}
.line-r {
    top: 0;
    right: -2px;
    bottom: 0;
    width: 10px;
    height: 100%;
    cursor: w-resize;
    border-right: 1px solid rgb(187, 187, 187);
}
.line-b {
    left: 0;
    right: 0;
    bottom: -2px;
    width: 100%;
    height: 10px;
    cursor: s-resize;
    border-bottom: 1px solid rgb(187, 187, 187);
}
.block {
    width: 5px;
    height: 5px;
    border: 1px solid rgb(187, 187, 187);
    background-color: rgb(187, 187, 187);
}
.block-tl {
    top: -5px;
    left: -5px;
    cursor: se-resize;
}
.block-tr {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
}
.block-bl {
    bottom: -5px;
    left: -5px;
    cursor: ne-resize;
}
.block-br {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
}
</style>
