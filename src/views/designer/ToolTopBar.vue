<template>
    <div id="tool">
        <div style="margin-bottom:1%;display: block;position:absolute">
            <el-page-header @back="goBack" content="制图页面" style="display:flex;margin-bottom:6%">
            </el-page-header>
            <el-breadcrumb separator="/" style="display:inline-flex;left:56%;position:absolute;width:400px">
                <el-breadcrumb-item><a href="/personal">个人主页</a></el-breadcrumb-item>
                <el-breadcrumb-item>保存</el-breadcrumb-item>
                <el-breadcrumb-item>删除</el-breadcrumb-item>
                <el-breadcrumb-item>下载</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tool-top-bar",
        data(){
            return{
                color1: '#409EFF',
            }
        },
        methods:{
            goBack() {
                console.log('go back');
            }
        },
        state:{
            editor:{
                toolList:[
                    //线条颜色
                    {
                    name:'lineColor',
                    label:'line color',
                    type:'dropdown-color-picker',

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