<template>
    <el-select @blur="selectBlurHandler" filterable :filter-method="TreeSelectFilter" v-model="selectedText" placeholder="请选择所属单位" style="width: 100%;" ref="selectReport">
        <el-option disabled style="width: 100%;height:245px;overflow: auto;background-color:#fff" value="">
            <el-tree :filter-node-method="filterNode" :data="treeData" :props="props" :node-key="nodeKey" default-expand-all :expand-on-click-node="false" highlight-current @node-click="handleNodeClick" ref="InnerTree"/>
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: 'TreeSelect',
        props: {
            value: [String, Number],//组件绑定值
            //从外部传入树形组件的数据、配置参数，组件暂时可设置这些内容：
            treeData: {type: Array, default: []},//树形组件数据
            props: {type: Object, default: {children: 'children', label: 'label'}},//树形组件属性设置
            nodeKey: {type: String, default: undefined},//树形组件nodeKey（必须）
        },

        data() {
            return {
                selectedId: undefined,
                selectedText: undefined,
            };
        },
        created() {
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
            TreeSelectFilter(value) {
                this.$refs.InnerTree.filter(value);
            },
            //点击tree节点选中
            handleNodeClick(node) {
                this.selectedText = node[this.props.label];
                this.$refs.selectReport.blur();
                this.$emit('input', node[this.nodeKey]);
                // this.value=node[this.nodeKey]
            },
            // //设置组件初始值
            // setCurrentKey(key) {
            //   this.$refs.InnerTree.setCurrentKey(key);
            //   let currentNode = this.$refs.InnerTree.getCurrentNode();
            //   this.selectedText = currentNode[this.props.label];
            // },
            //使用nodeKey获取节点，给组件设置显示的值
            setSelectShowTextBeyKey(key) {
                this.$refs.InnerTree.setCurrentKey(key);
                let currentNode = this.$refs.InnerTree.getCurrentNode();
                if (currentNode !== null) {
                    this.selectedText = currentNode[this.props.label];
                }
            }
        },
        watch: {
            value(key) {
                this.setSelectShowTextBeyKey(key);
            }
        }
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
</style>
