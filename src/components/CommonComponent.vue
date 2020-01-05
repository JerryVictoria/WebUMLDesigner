<script>
export default {
    name: "CommonComponent",
    props: {
        id: String,
        type: String, // e.g. class
        styles: Object,
        properties: Object
    },
    data() {
        return {
            width: "200px",
            height: "180px",
            showInput: false
        };
    },
    watch: {
        styles: {
            deep: true,
            handler(sty) {
                this.width = sty.width;
                this.height = sty.height;
                //console.log("style change");
            }
        }
    },
    mounted() {
        if (this.styles) {
            this.width = this.styles.width ? this.styles.width : this.width;
            this.height = this.styles.height ? this.styles.height : this.height;
        }
        if (this.properties && this.properties.name) {
            this.name = this.properties.name;
        }
    },
    methods: {
        setWidth(width) {
            this.width = width;
        },
        setHeight(height) {
            this.height = height;
        },
        hideInputAndSave() {
            this.setEditStateFalse();
        },
        setEditStateFalse() {
            this.$store.commit("setEditState", { editing: false });
            if ("" != this.$store.state.editingId) {
                this.$store.commit("setEditId", { id: "" });
            }
        },
        setEditStateTrue() {
            this.$store.commit("setEditState", { editing: true });
        },
        setEditingId() {
            this.$store.commit("setEditId", { id: this.id });
        },
        commitWidth() {
            this.$store.commit("modifyNode", {
                nodeKey: "styles",
                key: "width",
                value: this.width,
                id: this.$store.state.editingId
            });
        },
        commitHeight() {
            this.$store.commit("modifyNode", {
                nodeKey: "styles",
                key: "height",
                value: this.height,
                id: this.$store.state.editingId
            });
        },
        commitTop(top) {
            this.$store.commit("modifyNode", {
                nodeKey: "styles",
                key: "top",
                value: top,
                id: this.$store.state.editingId
            });
        },
        commitLeft(left) {
            this.$store.commit("modifyNode", {
                nodeKey: "styles",
                key: "left",
                value: left,
                id: this.$store.state.editingId
            });
        },
        handleNameClick() {
            this.showInput = true;
            this.setEditStateTrue();
        }
    }
};
</script>