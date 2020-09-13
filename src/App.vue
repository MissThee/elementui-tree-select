<template>
    <div id="app">
        <div style="width:250px;margin: 80px auto 0">
            <tree-select
                    v-model="testValue"
                    clearable
                    placeholder="请选择"
                    :treeData="unitTreeData"
                    :props="{ children: 'children', label: 'label' }"
                    nodeKey="id"
            />
            <div style="color:#999;margin:10px 0 0 0">
                <div>当前选中节点id：<span style="color:#666d">{{testValue?testValue:'（尚未选择）'}}</span></div>
                <div>组件绑定的数据：</div>
                <div style="height: 400px;border:1px solid #ccc;overflow: auto">
                    <pre style="font-family:Arial,serif">{{unitTreeData}}</pre>
                </div>
            </div>
        </div>
        <div style="text-align: center">
            <a href="https://github.com/MissThee/elementui-tree-select">查看源码：https://github.com/MissThee/elementui-tree-select</a>
        </div>
    </div>
</template>

<script>
    const TreeSelect = () => import(/* webpackChunkName: "TreeSelect" */ "./components/TreeSelect")
    // import TreeSelect from "./components/TreeSelect";

    export default {
        name: 'App',
        components: {
            TreeSelect
        },
        data() {
            return {
                testValue: '',
                unitTreeData: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }, {
                            id: 11,
                            label: '三级 1-1-3'
                        }, {
                            id: 12,
                            label: '三级 1-1-4'
                        }, {
                            id: 13,
                            label: '三级 1-1-5'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }]
            }
        }
    }
</script>

<style>

</style>
