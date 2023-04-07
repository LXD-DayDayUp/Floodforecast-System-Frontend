<template>
    <div class="app-container documentation-container">
        <div class="el-form">
            <el-form class="form" label-width="120px" inline>
                <!-- 选择验证的流域断面 -->
                <el-form-item class="formitem" label="选择流域断面:">
                    <el-select v-model="flowsitevalue" clearable placeholder="请选择:">
                        <!-- v-for循环 -->
                        <el-option v-for="item in flowsite" :key="item.label" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="formitem" label="选择参数方案:">
                    <el-select v-model="programvalue" clearable placeholder="请选择:">
                        <el-option v-for="item in programs" :key="item.label" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 选择开始时间 -->
                <el-form-item class="formitem" label="选择开始时间:">
                    <el-date-picker v-model="starttime" type="date" placeholder="选择开始日期">
                    </el-date-picker>
                </el-form-item>
                <!-- 选择结束时间-->
                <el-form-item class="formitem" label="选择结束时间:">
                    <el-date-picker v-model="endtime" type="date" placeholder="选择结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-button class="button" @click="getMqAndCq">开始预报</el-button>
            </el-form>
        </div>
        <!-- 预报结果页面 -->
        <div class="forecastresult">
            <div class="element">
                <h3 class="title">模拟流量峰值(m³/s)</h3><br>
                <span class="span"> {{ flow_max }}</span>
            </div>
            <div class="element">
                <h3 class="title">洪峰出现时间</h3><br>
                <span class="span"> {{ flow_max_time }}</span>
            </div>
            <div class="element">
                <h3 class="title">洪水总量(亿m³)</h3><br>
                <span class="span">{{ floodsum }}</span>
            </div>
        </div>
        <!-- 预报图结果图页面 -->
        <div id="main" class="forecastchart" style="width:80%;height:570px;background-color: wheat;float: right;">

        </div>
</div>
</template>

<script type="text/javascript">
import store from '@/store'
import programApi from '@/api/program'
import floodforecastApi from '@/api/floodforecast'

export default {
    data() {
        return {
            username: store.getters.name,
            starttime: "2016-01-01",
            endtime: "2016-12-30",
            P: [],
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
            floodsum: '',
            flow_max: '',
            flow_max_time: '',
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
            let P = []
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
            let res = await floodforecastApi.getMqAndCq(params);
            if (res.success) {
                const { data } = res;
                for (var i = 0; i < data.length; i++) {
                    site[i] = data[i].site;
                    P[i] = data[i].p
                    hyDate[i] = data[i].date;
                    mq[i] = data[i].mq;
                    cq[i] = data[i].cq;
                }
                this.Site = site;
                this.P = P;
                this.hyDate = hyDate;
                this.MQ = mq;
                this.CQ = cq;
            }
            this.floodforcecastchart();
            this.calielement();
        },
        /**
         * 洪水预报结果图
         */
        floodforcecastchart() {
            let hyDate = this.hyDate;
            let P = this.P;
            let Site = this.Site;
            let MQ = this.MQ;
            let CQ = this.CQ;
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('main'));

            var option = {
                title: {
                    text: Site[0] + '降雨流量关系图',
                    left: 'left'
                },
                grid: {
                    bottom: 80
                },
                // 工具栏
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
                // 提示框组件
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#505765'
                        }
                    }
                },
                // 图例
                legend: {
                    data: ['实测流量', '模拟流量', '降雨'],
                    center: 10,
                },
                // 图下方拖拽区域
                // dataZoom: [
                //     {
                //         show: true,
                //         realtime: true,
                //         start: 20,//初始显示区域百分比
                //         end: 80,
                //     },
                //     {
                //         type: 'inside',
                //         realtime: true,
                //         start: 20,
                //         end: 80,
                //     }
                // ],
                // X轴数据
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        data: hyDate[0].map(function (str) {
                            return str.toString().replace(' ', '\n');//str.replace()报错不是一个函数需要将str强制转换成String  语句改为str.toString().replace()
                        })
                    }
                ],
                // Y轴数据
                yAxis: [
                    {
                        name: '流量(m³/s)',
                        type: 'value',
                        max: function (value) {
                            return Math.trunc(value.max) + 2000;//Math.trunc()取整函数
                        }
                    },
                    {
                        name: '降雨量(mm)',
                        nameLocation: 'start',
                        alignTicks: true,
                        type: 'value',
                        inverse: true,
                        max: function (value) {
                            return value.max + 20;
                        }
                    }
                ],
                series: [
                    {
                        name: '降雨',
                        type: 'bar',
                        yAxisIndex: 1,
                        areaStyle: {},
                        barStyle: {
                            width: 1
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        markArea: {
                            silent: true,
                            itemStyle: {
                                opacity: 0.3
                            },
                            data: [
                                [
                                    {
                                        xAxis: hyDate[0]
                                    },
                                    {
                                        xAxis: hyDate[30]
                                    }
                                ]
                            ]
                        },
                        // 降雨数据
                        data: P[0],
                    },
                    {
                        name: '实测流量',
                        type: 'line',
                        areaStyle: {},
                        lineStyle: {
                            width: 1
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        markArea: {
                            silent: true,
                            itemStyle: {
                                opacity: 0.3
                            },
                            data: [
                                [
                                    {
                                        xAxis: hyDate[0]
                                    },
                                    {
                                        xAxis: hyDate[30]
                                    }
                                ]
                            ]
                        },
                        // 实测流量数据
                        data: MQ[0],
                    },
                    {
                        name: '模拟流量',
                        type: 'line',
                        areaStyle: {},
                        lineStyle: {
                            width: 1
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        markArea: {
                            silent: true,
                            itemStyle: {
                                opacity: 0.3
                            },
                            data: [
                                [
                                    {
                                        xAxis: hyDate[0]
                                    },
                                    {
                                        xAxis: hyDate[30]
                                    }
                                ]
                            ]
                        },
                        // 模拟流量数据
                        data: CQ[0],
                    },

                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        /**
         * 计算预报参数
         */
        calielement() {
            var CQ = this.CQ[0];
            // 流量峰值
            var flow_max = Math.max.apply(Math, CQ);
            // 峰现时间
            var n = CQ.indexOf(flow_max);
            var flow_max_time = this.hyDate[0][n];
            var floodsum = 0;
            // 洪水总量
            for (var i = 0; i < CQ.length; i++) {
                floodsum = floodsum + CQ[i] * 24 * 60 * 60;
            }
            this.flow_max = Math.trunc(flow_max);
            this.flow_max_time = flow_max_time;
            this.floodsum = Math.trunc(floodsum / 10 ** 8);
        },
    }
}
</script>


<style lang="scss" scoped>
.documentation-container {
    background-color: rgb(228, 223, 217);
    width: 100%;
    height: 710px;

    .el-form {
        .form {

            .formitem {
                width: 195px;
                margin-right: 50px;
            }

            .button {
                width: 130px;
                margin-top: 35px;
            }
        }

    }

    .forecastresult {
        width: 20%;
        height: 570px;
        background-color: wheat;
        float: right;

        .element {
            width: 100%;
            height: 25%;
            padding-top: 0px;
            margin-top: 0px;
            border-radius: 4px;
            background-color: wheat;

            .title {
                margin-top: 30px;
                text-align: center;
            }

            .span {
                font-size: 28px;
                display: block;
                width: 220px;
                text-align: center;
            }
        }
    }

    .forecastchart {
        width: 80%;
        height: 570px;
        background-color: wheat;
        float: right;
    }
}
</style>