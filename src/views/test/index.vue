<template>
    <div class="container">
        <el-table 
        :data="tableData" 
        border 
        @row-dblclick="dbclick" 
        :row-style="{height:'45px'}"
        :cell-class-name="tableCellClassName">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
                <template slot-scope="scope">
                    <!--v-if去判断双击的是不是当前单元格-->
                    <el-input 
                        @blur="hideInput" 
                        size="mini" 
                        :ref="scope.row.index + ',' + scope.column.index" 
                        v-model="scope.row.name" 
                        v-if="scope.row.index + ',' + scope.column.index == currentCell">
                    </el-input>
                    <span v-else>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址" align="center">
                <template slot-scope="scope">
                    <el-input 
                        @blur="hideInput" 
                        size="mini" 
                        :ref="scope.row.index + ',' + scope.column.index" 
                        v-model="scope.row.address" 
                        v-if="scope.row.index + ',' + scope.column.index == currentCell">
                    </el-input>
                    <span v-else>{{scope.row.address}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 用一个字符串来保存当前双击的是哪一个单元格
            currentCell: null,
            tableData: [
                {
                    date: "2016-05-02",
                    name: "张三",
                    address: "上海市普陀区金沙江路 1518 弄",
                    id: 1
                },
                {
                    date: "2016-05-02",
                    name: "李四",
                    address: "上海市普陀区金沙江路 1518 弄",
                    id: 2
                },
            ],
        }
    },
    methods: {
        // 给单元格绑定横向和竖向的index，这样就能确定是哪一个单元格
        tableCellClassName({row, column, rowIndex, columnIndex}){
            row.index=rowIndex;
            column.index=columnIndex;
        },
        // 获得当前双击的单元格的横竖index，然后拼接成一个唯一字符串用于判断，并赋给currentCell
        // 拼接后类似这样："1,0","1,1",
        dbclick(row,column) {
            this.currentCell = row.index + ',' + column.index;
            // 这里必须要setTimeout，因为在点击的时候，input才刚被v-if显示出来，不然拿不到dom
            setTimeout(() => {
                // 双击后自动获得焦点
                this.$refs[row.index + ',' + column.index].focus();
            })
        },
        // 当input失去焦点的时候，隐藏input
        hideInput(){
            this.currentCell = null;
            
        },
        /**
         * 可视化图像
         */
         rainfall() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('main'))
            const categories = (function () {
                let now = new Date();
                let res = [];
                let len = 20;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                    now = new Date(+now - 2000);
                }
                return res;
            })();
            const categories2 = (function () {
                let res = [];
                let len = 20;
                while (len--) {
                    res.push(10 - len - 1);
                }
                return res;
            })();
            const data = (function () {
                let res = [];
                let len = 20;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })();
            const data2 = (function () {
                let res = [];
                let len = 0;
                while (len < 20) {
                    res.push(+(Math.random() * 10 + 5).toFixed(1));
                    len++;
                }
                return res;
            })();
            var option = {
                title: {
                    text: '动态图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#283b56'
                        }
                    }
                },
                legend: {},
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: {
                    show: false,
                    start: 0,
                    end: 100
                },
                // X的上下两个轴
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: categories
                    },
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: categories2
                    }
                ],
                // Y的左右两个轴
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        name: 'Price',
                        max: 30,
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                    },
                    {
                        type: 'value',
                        scale: true,
                        name: 'Order',
                        max: 1200,
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: '水位',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: data
                    },
                    {
                        name: '流量',
                        type: 'line',
                        data: data2
                    }
                ]
            };
            app.count = 11;
            setInterval(function () {
                let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
                data.shift();
                data.push(Math.round(Math.random() * 1000));
                data2.shift();
                data2.push(+(Math.random() * 10 + 5).toFixed(1));
                categories.shift();
                categories.push(axisData);
                categories2.shift();
                categories2.push(app.count++);
                myChart.setOption({
                    xAxis: [
                        {
                            data: categories
                        },
                        {
                            data: categories2
                        }
                    ],
                    series: [
                        {
                            data: data
                        },
                        {
                            data: data2
                        }
                    ]
                });
            }, 2100);
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },

    },
}
</script>