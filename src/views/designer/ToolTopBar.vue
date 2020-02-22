<template>
    <div style="margin-bottom:1%;display: block;position:absolute;width:100%">
        <el-page-header @back="goBack" content="制图页面">
        </el-page-header>
        <div style="margin-top:1%">
            <el-breadcrumb separator="/" style="display:inline-flex;left:10%;position:absolute;width:10%">
                <el-breadcrumb-item>保存</el-breadcrumb-item>
                <el-breadcrumb-item>删除</el-breadcrumb-item>
                <el-breadcrumb-item>下载</el-breadcrumb-item>
            </el-breadcrumb>
            <el-color-picker v-model="lcolor" size="mini"
                             style="display:inline-flex;left:21%;position:absolute;width:5%;margin: -0.5% 1% 0 1%" @change="linecolor"></el-color-picker>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tool-top-bar",
        data() {
            return {
                lcolor: '#409EFF',
            }
        },
        methods: {
            goBack() {
                console.log('go back');
            },
            linecolor(){
                console.log('linecolor'+this.lcolor);
                console.log('lineid'+this.$store.state.lineEditingId);
                this.$store.commit("modifyLine", {
                    lineKey: "styles",
                    key: "stroke",
                    value: this.lcolor,
                    id: this.$store.state.lineEditId
                });
            }
        },
        state: {
            editor: {
                toolList: [
                    //线条颜色
                    {
                        name: 'lineColor',
                        label: 'line color',
                        type: 'dropdown-color-picker',

                    },
                    //线条宽度linewidth
                    //线条样式linedash
                    //线条类型linetype
                    //线条开端样式startarrow
                    //线条尾端样式endarrow
                ]
            }
        }
    }
</script>

<style scoped>

</style>