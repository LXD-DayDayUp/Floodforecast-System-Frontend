<template>
    <!-- 模版中有且只能有一个主div，其他div放在主div中 -->
    <div class="app-container documentation-container">
        <div class="form">
            <el-form :inline="true" class="demo-form-inline">

                <el-form-item label-width="75px" label="水库水位:">
                    <el-select class="select" ref="site" v-model="reservoirlevelweightvalue" placeholder="请选择重要程度"
                        clearable>
                        <el-option v-for="item in reservoirlevelweight" :key="item.label" :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="75px" label="水库库容:">
                    <el-select class="select" ref="site" v-model="reservoircapacityweightvalue" placeholder="请选择重要程度"
                        clearable>
                        <el-option v-for="item in reservoircapacityweight" :key="item.label" :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="100px" label="水库出库流量:">
                    <el-select class="select" ref="site" v-model="reservoirQweightvalue" placeholder="请选择重要程度" clearable>
                        <el-option v-for="item in reservoirQweight" :key="item.label" :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="100px" label="预警断面水位:">
                    <el-select class="select" ref="site" v-model="bayilevelweightvalue" placeholder="请选择重要程度" clearable>
                        <el-option v-for="item in bayilevelweight" :key="item.label" :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="100px" label="预警断面流量:">
                    <el-select class="select" ref="site" v-model="bayiQweightvalue" placeholder="请选择重要程度" clearable>
                        <el-option v-for="item in bayiQweight" :key="item.label" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="button" @click="fuzzy">开始优选</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 参数率定结果表格 -->
        <div>
            <el-table :data="tableData" height="200" :row-class-name="tableRowClassName"
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
                <el-table-column prop="bayiq" label="预警断面流量" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.bayiq" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.bayiq }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- echarts可视图部分,该div相当于一个容器 -->
        <div id="main" style="width:100%;height:420px;margin-top: 30px;"></div>
    </div>
</template>
  
<script type="text/javascript">
import floodprogramApi from '@/api/floodprogram'
import store from '@/store'

export default {
    data() {
        return {
            username: store.getters.name,
            tableData: [],
            chartData: [],
            programname: [],
            superiority: [],
            reservoirlevelweight: [{
                reservoirlevelweightvalue: '选项1',
                label: '极其重要',
            }, {
                reservoirlevelweightvalue: '选项2',
                label: '十分重要'
            }, {
                reservoirlevelweightvalue: '选项3',
                label: '明显重要'
            }, {
                reservoirlevelweightvalue: '选项4',
                label: '略微重要'
            },
            ],
            reservoircapacityweight: [{
                reservoircapacityweightvalue: '选项1',
                label: '极其重要',
            }, {
                reservoircapacityweightvalue: '选项2',
                label: '十分重要'
            }, {
                reservoircapacityweightvalue: '选项3',
                label: '明显重要'
            }, {
                reservoircapacityweightvalue: '选项4',
                label: '略微重要'
            },
            ],
            reservoirQweight: [{
                reservoirQweightvalue: '选项1',
                label: '极其重要',
            }, {
                reservoirQweightvalue: '选项2',
                label: '十分重要'
            }, {
                reservoirQweightvalue: '选项3',
                label: '明显重要'
            }, {
                reservoirQweightvalue: '选项4',
                label: '略微重要'
            },
            ],
            bayilevelweight: [{
                bayilevelweightvalue: '选项1',
                label: '极其重要',
            }, {
                bayilevelweightvalue: '选项2',
                label: '十分重要'
            }, {
                bayilevelweightvalue: '选项3',
                label: '明显重要'
            }, {
                bayilevelweightvalue: '选项4',
                label: '略微重要'
            },
            ],
            bayiQweight: [{
                bayiQweightvalue: '选项1',
                label: '极其重要',
            }, {
                bayiQweightvalue: '选项2',
                label: '十分重要'
            }, {
                bayiQweightvalue: '选项3',
                label: '明显重要'
            }, {
                bayiQweightvalue: '选项4',
                label: '略微重要'
            },
            ],
            reservoirlevelweightvalue: '十分重要',
            reservoircapacityweightvalue: '十分重要',
            reservoirQweightvalue: '十分重要',
            bayilevelweightvalue: '十分重要',
            bayiQweightvalue: '十分重要'
        }
    },
    // 初始化时调用
    created() {
        this.queryprogram();
    },
    mounted() {
        setTimeout(() => {
            //这里就写你要执行的语句即可，先让数据库的数据加载进去数组中，你再从数组中取值就好了
        }, 750)
    },
    methods: {
        async queryprogram() {
            let res = await floodprogramApi.queryallprogram();
            if (res.success) {
                const { data } = res
                this.tableData = JSON.parse(JSON.stringify(data));
                console.log(tableData);
            }
        },
        async fuzzy() {
            let res = await floodprogramApi.fuzzyevalution();
            if (res.success) {
                const { data } = res
                this.chartData = JSON.parse(JSON.stringify(data));
                for (var i = 0; i < this.chartData.length; i++) {
                    this.programname[i] = this.chartData[i].programname
                    this.superiority[i] = this.chartData[i].superiority
                }
            }
            this.fuzzychart();
        },
        fuzzychart() {
            var myChart = this.$echarts.init(document.getElementById('main'))
            var programname = this.programname
            var superiority = this.superiority
            console.log(superiority);
            var option = {
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false,
                            backgroundColor: '#faecec',
                            textareaColor: '#faecec',
                        },
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                title: {
                    text: '水库调度方案模糊优选结果',
                    left: 'center',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 28,
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    show: 'true',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#505765'
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: programname,
                },
                yAxis: {
                    type: 'value',
                    max: function (value) {
                            return Math.trunc(value.max) + Math.trunc(value.max)*0.5;//Math.trunc()取整函数
                        }
                },
                series: [
                    {
                        data: superiority,
                        type: 'bar'
                    }
                ]
            };

            option && myChart.setOption(option);
        }
    }
}
</script>
  
  
<style lang="scss" scoped>
.documentation-container {
    background-color: rgb(228, 223, 217);

    .form {
        .button {
            margin-left: 20px;
            margin-right: 20px;
        }

        .select {
            width: 105px;
            margin-right: 0px;
        }
    }
}
</style>