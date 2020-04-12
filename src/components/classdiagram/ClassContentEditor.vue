<template>
    <div @click.stop="handleClick" style="z-index: 99">
        <div class="top"></div>
        <el-form
            :inline="true"
            class="contentEditor"
            :rules="rules"
            :model="propline"
            ref="propform"
        >
            <el-form-item prop="contentType">
                <el-select
                    v-model="propline.contentType"
                    placeholder="类型"
                    class="selectorStyle"
                    size="mini"
                >
                    <el-option
                        v-for="item in contentOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="modifier">
                <el-select
                    v-model="propline.modifier"
                    placeholder="修饰符"
                    class="selectorStyle"
                    size="mini"
                >
                    <el-option
                        v-for="item in modifierOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="dataType">
                <el-select
                    v-model="propline.dataType"
                    placeholder="数据类型"
                    class="selectorStyle"
                    size="mini"
                    filterable
                    allow-create
                    default-first-option
                >
                    <el-option
                        v-for="item in dataTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="name">
                <el-input style="width:100px;" size="mini" v-model="propline.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item prop="params">
                <el-input
                    style="width:100px"
                    v-show="propline.contentType === 'function'"
                    size="mini"
                    v-model="propline.params"
                    placeholder="方法参数"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="success"
                    round
                    icon="el-icon-check"
                    size="mini"
                    @click.stop="saveProp"
                ></el-button>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="danger"
                    round
                    icon="el-icon-delete"
                    size="mini"
                    @click.stop="deleteProp"
                ></el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { contentOptions, modifierOptions, dataTypeOptions } from "../const.js";
export default {
    name: "ClassContentEditor",
    props: {
        initData: {
            type: Object
        },
        id: {
            type: Number
        }
    },
    data() {
        return {
            contentOptions: contentOptions,
            modifierOptions: modifierOptions,
            dataTypeOptions: dataTypeOptions,
            propline: {
                contentType: null,
                modifier: null,
                dataType: null,
                name: null,
                params: null
            },
            rules: {
                contentType: [
                    {
                        required: true,
                        message: " ",
                        trigger: "change"
                    }
                ],
                modifier: [
                    {
                        required: true,
                        message: " ",
                        trigger: "change"
                    }
                ],
                dataType: [
                    {
                        required: true,
                        message: " ",
                        trigger: "change"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: " ",
                        trigger: "change"
                    }
                ],
                params: [
                    {
                        required: false,
                        message: " ",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    watch: {
        initData: {
            deep: true,
            handler(data) {
                this.propline.contentType = data.contentType;
                this.propline.modifier = data.modifier;
                this.propline.dataType = data.dataType;
                this.propline.name = data.name;
                this.propline.params = data.params;
            }
        }
    },
    methods: {
        handleClick() {},
        saveProp() {
            this.$refs["propform"].validate(valid => {
                if (valid) {
                    if (this.initData.addFlag) {
                        this.$store.dispatch("addClassNodeProp", {
                            id: this.id,
                            contentType: this.propline.contentType + "s",
                            modifier: this.propline.modifier,
                            dataType: this.propline.dataType,
                            name: this.propline.name,
                            params: this.propline.params
                        });
                        this.$emit("change");
                        return;
                    }
                    this.$store.dispatch("changeClassNodeProp", {
                        id: this.id,
                        contentType: this.propline.contentType + "s",
                        modifier: this.propline.modifier,
                        dataType: this.propline.dataType,
                        name: this.propline.name,
                        params: this.propline.params,
                        originContentType: this.initData.contentType + "s",
                        vid: this.initData.vid
                    });
                    this.$emit("change");
                } else {
                    return false;
                }
            });
        },
        deleteProp() {
            if (!this.initData.addFlag) {
                //console.log(this.initData.vid);
                this.$store.dispatch("deleteClassNodeProp", {
                    id: this.id,
                    contentType: this.propline.contentType + "s",
                    vid: this.initData.vid
                });
            }
            this.$emit("change");
        }
    }
};
</script>
<style scoped>
.selectorStyle {
    width: 100px;
}
.top {
    width: 0px;
    height: 0px;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ebeef5;
}
.el-form-item {
    margin-bottom: 0px;
}
.contentEditor {
    padding: 2px 5px;
    min-width: 130px;
    min-height: 30px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    border-radius: 1%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: inline-block;
}
</style>