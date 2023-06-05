<template>
    <div id="app">
        <div class="panel">
            <div class="back-board" style="padding:0">
                <div class="title" style="padding:10px;border-bottom: 1px solid #ccc">组件绑定的数据:</div>
                <el-scrollbar style="flex:1;overflow: hidden">
                    <pre style="font-family:Arial,serif">{{ treeData }}</pre>
                </el-scrollbar>
            </div>
            <div class="back-board">
                <div class="title">单选:(可选所有节点)</div>
                <tree-select :data="treeData" v-model="selectValueSingle" clearable filterable :props="{id:'id',name:'name',children:'children'}"/>
                <div style="color:#999;">
                    <span>已选id：</span>
                    <span style="color:#666">{{ selectValueSingle }}</span>
                </div>
                <div>
                  <el-button type="primary" plain @click="selectValueSingle=111">选中'三级1-1-1'</el-button>
                  <el-button type="primary" plain @click="selectValueSingle=1">选中'一级1'</el-button>
                </div>
                <div style="border-bottom: 1px solid #ccc;margin:60px 0 10px"/>
                <div class="title">单选:(仅选叶子节点，leafOnly)</div>
                <tree-select :data="treeData" v-model="selectValueSingleLeafOnly" clearable filterable leaf-only/>
                <div style="color:#999;">
                    <span>已选id：</span>
                    <span style="color:#666">{{ selectValueSingleLeafOnly }}</span>
                </div>
                <div>
                    <el-button type="primary" plain @click="selectValueSingleLeafOnly=111">选中'三级1-1-1'</el-button>
                    <el-button type="danger" plain @click="selectValueSingleLeafOnly=1">选中'一级1'</el-button>
                </div>
            </div>
            <div class="back-board">
                <div class="title">多选:（仅选叶子节点，强制leafOnly）</div>
                <tree-select :data="treeData" v-model="selectValueMulti" clearable filterable multiple/>
                <div style="color:#999;margin:10px 0 0 0">
                    <span>已选id：</span>
                    <span style="color:#666">{{ selectValueMulti }}</span>
                </div>
                <div>
                    <el-button type="primary" plain @click="selectValueMulti=[111,112,113]">选中'三级1-1-1', '三级1-1-2', '三级1-1-3'</el-button>
                </div>
                <div>
                    <el-button type="danger" plain @click="selectValueMulti=[1,2]">选中'一级1', '一级2'</el-button>
                </div>
            </div>
        </div>
        <div class="link">
            <a href="https://github.com/MissThee/elementui-tree-select">查看源码：https://github.com/MissThee/elementui-tree-select</a>
        </div>
    </div>
</template>

<script>
import TreeSelect from "./treeSelect.vue";

export default {
    name: 'App',
    components: {
        TreeSelect
    },
    data() {
        return {
            selectValueMulti: [],
            selectValueSingle: null,
            selectValueSingleLeafOnly: null,
            treeData: [{
                id: 1,
                name: '一级 1',
                children: [{
                    id: 11,
                    name: '二级 1-1',
                    children: [{
                        id: 111,
                        name: '三级 1-1-1'
                    }, {
                        id: 112,
                        name: '三级 1-1-2'
                    }, {
                        id: 113,
                        name: '三级 1-1-3'
                    }, {
                        id: 114,
                        name: '三级 1-1-4'
                    }, {
                        id: 115,
                        name: '三级 1-1-5'
                    }]
                }]
            }, {
                id: 2,
                name: '一级 2',
                children: [{
                    id: 21,
                    name: '二级 2-1'
                }, {
                    id: 22,
                    name: '二级 2-2'
                }]
            }, {
                id: 3,
                name: '一级 3',
                children: [{
                    id: 31,
                    name: '二级 3-1 比较长的选项，比较长的选项，比较长的选项'
                }, {
                    id: 32,
                    name: '二级 3-2'
                }, {
                    id: 33,
                    name: '二级 3-3'
                }]
            }, {
                id: 4,
                name: '一级 4',
                children: [{
                    id: 41,
                    name: '二级 4-1'
                }, {
                    id: 42,
                    name: '二级 4-2'
                }, {
                    id: 43,
                    name: '二级 4-3'
                }]
            }, {
                id: 5,
                name: 'A',
                children: [{
                    id: 51,
                    name: 'B',
                    children: [{
                        id: 511,
                        name: 'C'
                    }]
                }]
            }]
        }
    }
}
</script>

<style scoped>
.panel {
    display: flex;
    justify-items: center;
    justify-content: center;
    margin: 5vh auto 0;
    min-height: 450px;
    height: 80vh;
}

.back-board {
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin: 0 5px;
    overflow: auto;
    display: flex;
    flex-direction: column;
}

.back-board > * {
    margin-top: 10px;
}

.back-board > *:first-child {
    margin-top: 0;
}

.back-board .title {
    color: #666;
    font-weight: bold;
}

.link {
    text-align: center;
    margin-top: 5px;
}

/deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>
