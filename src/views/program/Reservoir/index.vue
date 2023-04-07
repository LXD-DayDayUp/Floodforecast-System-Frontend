<template>
    <div class="app-container documentation-container">
        <div style="width=100%;margin-bottom: 20px;margin-left: 900px;">
            <div style="width: 200px;margin-right: 20px;">
                <el-button size="medium" @click="adddialogdata" type="primary" style="width: 200px;margin-right: 20px;">新增调度方案</el-button>
            </div>
            
        </div>
        <div>
            <el-table :data="tableData" height="710" :row-class-name="tableRowClassName"
                @selection-change="handleSelectionChange" @row-dblclick="dbclick" :cell-class-name="tableCellClassName"
                tooltip-effect="dark">
                <el-table-column prop="programname" label="方案名" width="auto">
                </el-table-column>
                <el-table-column prop="reservoirlevel" label="水库水位" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.reservoirlevel"
                            v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.reservoirlevel }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="reservoircapacity" label="水库库容" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.reservoircapacity"
                            v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.reservoircapacity }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="reservoirq" label="水库出库流量" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.reservoirq" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.reservoirq }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="bayilevel" label="预警断面水位" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.bayilevel" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.bayilevel }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="bayiq" label="预警断面流量" width="auto" >
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.bayiq" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.bayiq }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="auto" text-align="center">
                    <template slot-scope="scope">
                        <el-button size="medium" type="danger" style="margin-right: 30px;" @click="deletedialogdata(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
  
<script>
import floodprogramApi from '@/api/floodprogram'
import store from '@/store';
export default {
    data() {
        return {
            tableData: [],
        }
    },
    // 初始化时调用
    created() {
        // 调用查询降雨列表
        this.queryprogram();
    },
    mounted() {
        setTimeout(() => {
            //这里就写你要执行的语句即可，先让数据库的数据加载进去数组中，你再从数组中取值就好了
        }, 800)
    },
    methods: {
        async queryprogram() {
            let res = await floodprogramApi.queryallprogram();
            if (res.success) {
                const { data } = res
                this.tableData = JSON.parse(JSON.stringify(data));
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.documentation-container {
    background-color: rgb(228, 223, 217);
    width: 100%;
    height: 715px;

    .programtable {

        .table {
            background-color: rgb(228, 223, 217);

            el-table-column {
                background-color: rgb(228, 223, 217);
            }
        }
    }
}
</style>