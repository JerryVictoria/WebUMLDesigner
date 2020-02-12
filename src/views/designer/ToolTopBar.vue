<template>
    <div>
        tooltopbar
    </div>
</template>

<script>
    export default {
        name: "tool-top-bar",
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