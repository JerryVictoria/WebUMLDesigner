<template>
    <div class="footer">
        <el-row :gutter="12">
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <span class="contentSpan titleSpan">关于平台</span>
                    <span class="contentSpan">
                        平台使用帮助手册
                        <i class="el-icon-files"></i>
                    </span>
                    <span class="contentSpan">
                        我有疑问
                        <i class="el-icon-chat-dot-square"></i>
                    </span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <span class="contentSpan titleSpan">产品介绍</span>
                    <span class="contentSpan">
                        提供的功能
                        <i class="el-icon-question"></i>
                    </span>
                    <span class="contentSpan">
                        项目开发前景
                        <i class="el-icon-s-marketing"></i>
                    </span>
                    <span class="contentSpan">
                        我有疑问
                        <i class="el-icon-s-comment"></i>
                    </span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <span class="contentSpan titleSpan">关于我们</span>
                    <span class="contentSpan">nju_2020_毕设项目</span>
                    <span class="contentSpan">
                        开发团队
                        <i class="el-icon-s-custom"></i>
                    </span>
                    <span class="contentSpan">
                        联系我们：web_uml_nju@163.com
                        <i class="el-icon-message"></i>
                    </span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "PageFooter"
};
</script>
<style scoped>
.footer {
    width: 100%;
    height: 180px;
    border-top: 1px solid #e4e7ed;
    padding-top: 15px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}

.bg-purple-light {
    background: #f2f6fc;
}
.grid-content {
    border-radius: 4px;
    min-height: 165px;
    padding-top: 5px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
.titleSpan {
    font-size: 20px;
    margin: 10px;
    cursor: default;
}
</style>