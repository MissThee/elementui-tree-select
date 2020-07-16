<template>
    <el-select @blur="selectBlurHandler" :clearable="clearable" @clear="clearHandler" :size="size" filterable :filter-method="treeSelectFilter" v-model="selectedText" :placeholder="placeholder" style="width: 100%;" ref="selectReport">
        <el-option disabled style="height:100%;max-height: 245px;overflow: auto;background-color:#fff" value="">
            <el-tree :filter-node-method="filterNode" :data="treeData" :props="props" :node-key="nodeKey" default-expand-all :expand-on-click-node="false" highlight-current @node-click="handleNodeClick" ref="InnerTree"/>
        </el-option>
    </el-select>
</template>

<script>
    //elementui相关依赖在App.vue中全局引入

    export default {
        name: 'TreeSelect',
        props: {
            value: [String, Number],//组件绑定值
            //从外部传入树形组件的数据、配置参数，组件暂时可设置这些内容，按需要自行增减就可以了：
            treeData: {type: Array, default: []},//树形组件数据
            props: {type: Object, default: {children: 'children', label: 'label'}},//树形组件属性设置
            nodeKey: {type: String, default: undefined},//树形组件nodeKey（必须）
            placeholder: {type: String, default: ''},//组建空白文字
            size: String,
            clearable: {type: Boolean, default: false},
        },

        data() {
            return {
                selectedId: undefined,
                selectedText: undefined,
                filterValue: undefined,
            };
        },
        created() {
            //检查是否设置了nodeKey，之后的赋值逻辑需要nodeKey才能完成
            if (this.nodeKey === undefined) {
                throw 'TreeSelect Must Use "nodeKey"!';
            }
        },
        mounted() {
            this.setSelectShowTextBeyKey(this.value);
        },
        methods: {
            //失去焦点重置筛选
            selectBlurHandler() {
                this.$refs.InnerTree.filter();
            },
            //tree筛选方法
            filterNode(value, data) {
                if (!value) return true;
                return data[this.props.label].indexOf(value) !== -1;
            },
            //tree筛选触发
            treeSelectFilter(value) {
                this.filterValue=value;
                this.$refs.InnerTree.filter(value);
            },
            //点击tree节点选中
            handleNodeClick(node) {
                this.selectedText = node[this.props.label];
                this.$refs.selectReport.blur();
                //修改通过v-model绑定的value值
                this.$emit('input', node[this.nodeKey]);
            },
            //使用绑定的值，给内部树形组件设置选中的节点，再给select组件设置显示的文字
            //这个方法首次初始化组件时调用一次mounted中；之后每次选中节点后调用一次watch中。
            setSelectShowTextBeyKey(key) {
                //设置tree选中节点
                this.$refs.InnerTree.setCurrentKey(key);
                //拿到节点，将节点名字赋值给select组件
                let currentNode = this.$refs.InnerTree.getCurrentNode();
                if (currentNode !== null) {
                    this.selectedText = currentNode[this.props.label];
                }
            },
            //select组件clear触发的方法
            clearHandler() {
                this.selectedText = undefined;
                this.$refs.InnerTree.setCurrentKey(undefined);
                //修改通过v-model绑定的value值
                this.$emit('input', undefined);
            },
        },
        watch: {
            value(key) {
                this.setSelectShowTextBeyKey(key);
            },

        },
    };
</script>

<style scoped>
    ::-webkit-scrollbar { /*滚动条整体样式*/
        width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 6px;
    }

    ::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #a9a9a9;
    }

    ::-webkit-scrollbar-thumb:hover { /*滚动条里面小方块*/
        background: #d0d0d0;
    }
    /*解决当树的高度小于下拉菜单最大高度时，最后一个节点收起后，将菜单撑出一点点滚动条的问题*/
    /*去除此样式，收起三个根节点，会出现滚动条*/
    /deep/ .el-tree-node__label  {
        line-height: 0;
    }
</style>
