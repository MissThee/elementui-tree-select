<template>
    <div id="app">
        <div style="width:250px;margin: auto">
            <tree-select v-model="testValue" :treeData="unitTreeData" :props="{ children: 'children', label: 'label' }" nodeKey="id"/>
            <div>选中的节点值：{{testValue}}</div>
        </div>
        <a href="https://github.com/MissThee/elementui-tree-select">查看源码https://github.com/MissThee/elementui-tree-select</a>
    </div>
</template>

<script>

    import TreeSelect from "./components/TreeSelect";

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
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
