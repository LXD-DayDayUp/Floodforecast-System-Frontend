<template>
    <div class="app-container documentation-container">
        <!-- 参数验证条件选择 -->
        <div class="form">
            <el-form inline>
                <!-- 选择验证的流域断面 -->
                <el-form-item label-width="100px" class="formitem" label="选择流量站:">
                    <el-select class="select" v-model="flowsitevalue" clearable placeholder="请选择:">
                        <!-- v-for循环 -->
                        <el-option v-for="item in flowsite" :key="item.label" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="100px" class="formitem" label="选择参数方案:">
                    <el-select class="select" v-model="programvalue" clearable placeholder="请选择:">
                        <el-option v-for="item in programs" :key="item.label" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 选择验证起止时间 -->
                <el-form-item label-width="80px" class="formitem" label="开始时间:">
                    <el-date-picker class="date" v-model="starttime" type="date" placeholder="选择开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label-width="80px" class="formitem" label="结束时间:">
                    <el-date-picker class="date" v-model="endtime" type="date" placeholder="选择结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-button class="button" @click="getMqAndCq">开始验证</el-button>
            </el-form>
        </div>
        <!-- 参数验证结果表格，所选流域的模拟流量、实测流量 -->
        <!-- <div>
            <el-table>

            </el-table>
        </div> -->
        <!-- 参数验证可视化，根据验证结果表格生成可视化图像 -->
        <div id="main" style="width:100%;height:610px;"></div>
    </div>
</template>

<script type="text/javascript">
import store from '@/store'
import programApi from '@/api/program'

export default {
    data() {
        return {
            username: store.getters.name,
            starttime: "2016-01-01",
            endtime: "2016-12-31",
            Site: [],
            MQ: [],
            CQ: [],
            hyDate: [],
            rainfallsite: [
                {
                    rainfallsitevalue: '选项1',
                    label: '邦格站',
                }, {
                    rainfallsitevalue: '选项2',
                    label: '贡巴站'
                }, {
                    rainfallsitevalue: '选项3',
                    label: '则木站'
                }, {
                    rainfallsitevalue: '选项4',
                    label: '盈则站'
                }, {
                    rainfallsitevalue: '选项5',
                    label: '拉弄站'
                }, {
                    rainfallsitevalue: '选项6',
                    label: '色卜站'
                }, {
                    rainfallsitevalue: '选项7',
                    label: '拉噶站'
                }, {
                    rainfallsitevalue: '选项8',
                    label: '托贡巴站'
                }, {
                    rainfallsitevalue: '选项9',
                    label: '扎巴站'
                }, {
                    rainfallsitevalue: '选项10',
                    label: '错巴站'
                }, {
                    rainfallsitevalue: '选项11',
                    label: '折郎站'
                }, {
                    rainfallsitevalue: '选项12',
                    label: '增巴站'
                }
            ],
            flowsite: [
                {
                    flowsitevalue: '选项1',
                    label: '增巴站',
                }, {
                    flowsitevalue: '选项2',
                    label: '工布江达站'
                }, {
                    flowsitevalue: '选项3',
                    label: '巴河桥站'
                }, {
                    flowsitevalue: '选项4',
                    label: '更张站'
                }, {
                    flowsitevalue: '选项5',
                    label: '泥曲站'
                }, {
                    flowsitevalue: '选项6',
                    label: '多布水库入库'
                },
            ],
            programs: [],
            programvalue: '',
            rainfallsitevalue: '邦格站',
            flowsitevalue: "多布水库入库",
        }
    },
    // 初始化调用的方法
    created() {
        this.queryprogram();
    },
    /**
     * 页面用到的所有方法集合
     */
    methods: {
        /**
         * 查询率定方案
         */
        async queryprogram() {
            let params = {
                username: this.username,
                flowsite: this.flowsitevalue,
            }
            let res = await programApi.queryprogram(params);
            if (res.success) {
                const { data } = res;
                for (var i = 0; i < data.length; i++) {
                    var program = {
                        programvalue: '选项' + i,
                        label: data[i].resultname,
                    }
                    this.programs.push(program);
                }
                this.programvalue = data[0].resultname;
            }
        },
        /**
         * 根据选定条件获取实测流量及模拟流量
         */
        async getMqAndCq() {
            let site = []
            let hyDate = []
            let mq = []
            let cq = []
            let params = {
                username: this.username,
                flowsite: this.flowsitevalue,
                starttime: this.starttime,
                endtime: this.endtime,
                resultname: this.programvalue,
            }
            console.log(params);
            let res = await programApi.getMqAndCq(params);
            console.log(res);
            if (res.success) {
                const { data } = res;
                for (var i = 0; i < data.length; i++) {
                    site[i] = data[i].site;
                    hyDate[i] = data[i].date;
                    mq[i] = data[i].mq;
                    cq[i] = data[i].cq;
                }
                this.Site = site;
                this.hyDate = hyDate;
                this.MQ = mq;
                this.CQ = cq;
            }
            this.modelvailChart();
        },
        /**
         * 参数验证结果图
         */
        // 参数率定图像
        modelvailChart() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('main'));

            let hyDate = this.hyDate;
            let Site = this.Site;
            let MQ = this.MQ;
            let CQ = this.CQ;
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                // 工具栏
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                title: {
                    left: 'left',
                    text: '参数验证结果图'
                },
                // 图例
                legend: {
                    // top: autoDiscover,
                    data: ['实测流量', '模拟流量']
                },
                // X轴
                xAxis: [
                    {
                        type: 'category',
                        data: hyDate[0],
                    }
                ],
                // Y轴，数组中分别是主、副坐标
                yAxis: [
                    {
                        type: 'value',
                        name: '流量(m³/s)',
                    },

                ],
                // 图表主体显示的内容
                series: [
                    {
                        name: '实测流量',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            }
                        },
                        data: MQ[0],
                    },
                    {
                        name: '模拟流量',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            }
                        },
                        data: CQ[0],
                    },
                ],
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
    }
}
</script>


<style lang="scss" scoped>
.documentation-container {
    background-color: rgb(228, 223, 217);

    .form {
        .formitem {

            .select {
                width: 160px;
                margin-left: 0px;
                margin-right: 10px;
            }

            .date {
                width: 150px;
                margin-left: 0px;
                margin-right: 10px;
            }

        }

        .button {
            width: 100px;
            margin-left: 10px;
            margin-right: 0px;
        }
    }
}
</style>