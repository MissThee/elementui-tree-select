<template>
    <el-select ref="selectRef"
               v-model="selectedIds"
               v-bind="$attrs"
               :filter-method="selectFilterMethod"
               @visible-change="selectVisibleChangeHandler"
               @focus="focusHandler"
               @change="selectChangeHandler">
        <el-option disabled class="tree-option" :value="null">
            <el-tree :data="treeData"
                     class="tree"
                     ref="treeRef"
                     v-bind="treeOptions"
                     :node-key="treeOptions&&treeOptions.nodeKey||commonProps.id"
                     :props="{
                         id:commonProps.id,
                         label:commonProps.name,
                         children:commonProps.children
                     }"
                     :filterNodeMethod="filterNodeMethod"
                     :show-checkbox="multiple"
                     default-expand-all
                     :highlight-current="!multiple"
                     :expand-on-click-node="multiple || leafOnly"
                     @node-expand="nodeExpandHandler"
                     @node-collapse="nodeCollapseHandler"
                     @node-click="treeClickHandler"
                     @check="treeCheckHandler"/>
        </el-option>
        <!--  将其余的选型隐藏掉  -->
        <el-option v-for="item in plainData.filter(e=> multiple? e.isLeaf : ( leafOnly? e.isLeaf:true))"
                   :key="item[commonProps.id]"
                   :value="item[commonProps.id]"
                   :label="item[commonProps.name]"
                   v-show="false"
        />
    </el-select>
</template>
<script>
import Vue from "vue";

export default {
    name: 'treeSelect',
    props: {
        value: {
            type: [Array, String, Number],
        },
        data: {
            type: Array,
            default: () => []
        },
        leafOnly: Boolean,
        treeOptions: {
            type: Object,
            default: () => ({})
        },
    },
    data: () => ({
        treeData: [],
        plainData: [],
        selectedIds: [],
        lastHighlightNodeId: undefined,
        panelScrollTop: 0,
    }),
    watch: {
        data: {
            handler() {
                this.treeData = this.data
                this.plainData = this.getPlainTreeData(this.data)
                this.panelScrollTop = 0
            },
            deep: true,
            immediate: true
        },
        value: {
            handler() {
                if (this.multiple) {
                    // 多选
                    this.selectedIds = JSON.parse(JSON.stringify(this.value))
                    this.$nextTick(() => {
                        this.$refs.treeRef.setCheckedKeys(this.value.filter(id => this.plainData.find(item => item.id === id)?.isLeaf))
                    })
                } else {
                    // 单选
                    this.selectedIds = this.value
                    if (this.leafOnly && !this.plainData.find(e => e[this.commonProps.id] === this.value)?.isLeaf) {
                        this.lastHighlightNodeId = undefined
                        this.$nextTick(() => {
                            this.$refs.treeRef.setCurrentKey(undefined)
                        })
                    } else {
                        this.lastHighlightNodeId = this.value || undefined
                        this.$nextTick(() => {
                            this.$refs.treeRef.setCurrentKey(this.value || undefined)
                        })
                    }
                }
            },
            deep: true,
            immediate: true
        },

    },
    computed: {
        commonProps() {
            return {
                id: this.$attrs?.props?.id || 'id',
                name: this.$attrs?.props?.name || 'name',
                children: this.$attrs?.props?.children || 'children'
            }
        },
        multiple() {
            return Object.keys(this.$attrs).includes('multiple') && this.$attrs.multiple !== false
        }
    },
    methods: {
        getPlainTreeData(treeData, result = []) { // 初始化下拉菜单本身的选项
            treeData.forEach(e => {
                const current = {
                    [this.commonProps.id]: e[this.commonProps.id],
                    [this.commonProps.name]: e[this.commonProps.name]
                }
                result.push(current)
                if (e[this.commonProps.children]?.length) {
                    this.getPlainTreeData(e[this.commonProps.children], result)
                } else {
                    current.isLeaf = true
                }
            })
            return result
        },
        treeClickHandler(val, node) {// 树选中节点（单选时）
            if (!this.multiple) {
                if (this.leafOnly && !node.isLeaf) {
                    this.$refs.treeRef.setCurrentKey(this.lastHighlightNodeId)
                    return
                }
                this.lastHighlightNodeId = val.id

                this.selectedIds = val[this.commonProps.id]
                this.$refs.selectRef.handleClose();
                this.$emit('input', this.selectedIds)
            }
        },
        treeCheckHandler() {// 树选中节点（多选时）
            if (this.multiple) {
                this.selectedIds = this.$refs.treeRef.getCheckedKeys(true)
                this.$emit('input', [...this.selectedIds])
            }
        },
        selectChangeHandler(values) { // 下拉选中内容改变时
            if (this.multiple) {
                this.$refs.treeRef.setCheckedKeys(values)
            } else {
                this.lastHighlightNodeId = values || undefined
                this.$refs.treeRef.setCurrentKey(values || undefined)
            }
            this.$emit('input', values)
        },
        nodeCollapseHandler() {
            setTimeout(() => {
                this.$refs.selectRef.broadcast('ElSelectDropdown', 'updatePopper');
            }, 10)
        },
        nodeExpandHandler() {
            setTimeout(() => {
                this.$refs.selectRef.broadcast('ElSelectDropdown', 'updatePopper');
            }, 10)
        },
        // 筛选功能相关
        selectFilterMethod(val) {
            this.$refs.treeRef.filter(val)
        },
        filterNodeMethod(val, data) {
            if (!val) {
                return true
            }
            return String(data.name).toLowerCase().includes(String(val).toLowerCase());
        },
        selectVisibleChangeHandler(isVisible) {
            if (!isVisible) {
                this.panelScrollTop = this.$refs.selectRef.$refs.scrollbar.$el.children[0].scrollTop
            }
            setTimeout(() => {
                this.$refs.treeRef.filter()
            }, 100)
        },
        focusHandler() {
            setTimeout(() => {
                this.$refs.selectRef.$refs.scrollbar.$el.children[0].scrollTo({top: this.panelScrollTop || 0})
            })
        }
    }
}
</script>

<style scoped>
.tree-option {
    width: 100%;
    line-height: 0;
    padding: 0 !important;
    height: 100%;
    overflow: auto;
}

.tree {
    font-weight: normal;
    width: 100%;
}

/deep/ .el-tree-node__content {
    padding-right: 10px;
}

/deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    font-weight: bold;
}

/deep/ .el-tree-node__children {
    width: 0;
    overflow: hidden;
}

/deep/ .el-tree-node__children[aria-expanded='true'] {
    position: relative;
    width: 100%;
}

/deep/ .el-select-dropdown__list > * {
    display: none;
}

/deep/ .el-select-dropdown__list > *:first-child {
    display: block;
}
</style>
