<template>
  <div class="app-container documentation-container">
    <!-- 选择控件 -->
    <div class="block">
      <el-date-picker class="date" v-model="starttime" type="date" placeholder="选择开始日期" clearable>
      </el-date-picker>
      <el-date-picker class="date" v-model="endtime" type="date" placeholder="选择结束日期" clearable>
      </el-date-picker>
      <el-select class="select" ref="site" v-model="sitevalue" placeholder="请选择雨量站" clearable>
        <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label">
        </el-option>
      </el-select>
      <el-button @click="queryAllByDate" class="button">查询</el-button>
      <el-button @click="adddialogdata" class="button">新增</el-button>
    </div>
    <!-- 表格主体 -->
    <div class="rainfalltable">
      <!-- 用return里面的数据用   :data="tableData"    -->
      <el-table :data="tableData" height="250" width="auto" border class="table">
        <el-table-column prop="site" label="雨量站" width="auto"></el-table-column>
        <el-table-column prop="date" label="观测日期" width="auto" sortable
          :default-sort="{ prop: 'date', order: 'ascending' }"></el-table-column>
        <el-table-column prop="p" label="降雨量" width="auto" sortable></el-table-column>
        <el-table-column label="数据操作" width="auto">
          <template slot-scope="scope">
            <el-button size="mini" @click="revisedialogdata(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deletedialogdata(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹窗 -->
      <el-dialog title="新增降雨数据" :visible.sync="addstatus" width="30%">
        <el-form ref="adddialogform" :model="adddialogData" label-width="80px">
          <el-form-item label="站点">
            <el-select ref="site" v-model="sitevalue" placeholder="请选择雨量站">
              <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker width="30px" value-format="yyyy-MM-dd" v-model="adddialogData.date" type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="降雨量">
            <el-input v-model="adddialogData.p"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addstatus = false">取 消</el-button>
          <el-button type="primary" @click="addrainfall">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改降雨数据弹窗 -->
      <el-dialog title="修改降雨数据" :visible.sync="revisestatus" width="30%">
        <el-form ref="revisedialogform" :model="revisedialogData" label-width="80px">
          <el-form-item label="站点">
            <el-input v-model="revisedialogData.site" :disabled="revisedialogdisabled"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-input v-model="revisedialogData.date" :disabled="revisedialogdisabled"></el-input>
          </el-form-item>
          <el-form-item label="降雨量">
            <el-input v-model="revisedp"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="revisestatus = false">取 消</el-button>
          <el-button type="primary" @click="reviserainfall">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除数据弹窗 -->
      <el-dialog title="删除此条数据" :visible.sync="deletestatus" width="30%">
        <span>确定删除吗?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deletestatus = false">取 消</el-button>
          <el-button type="primary" @click="deleterainfall">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- echarts可视图部分 -->
    <div id="main" style="width:100%;height:400px;"></div>
  </div>
</template>
<script type="text/javascript">
import DropdownMenu from '@/components/Share/DropdownMenu'
import rainfallApi from '@/api/rainfall'

export default {
  name: 'Rainfall',
  components: { DropdownMenu },
  data() {
    return {
      revisedp: '',//修改p值
      revisedialogdisabled: true,//对话框中禁用
      addstatus: false,
      revisestatus: false,
      deletestatus: false,
      revisedialogData: {},
      adddialogData: {},
      deletedialogData: {},
      tableData: [],
      PData: [],
      PDate: [],
      site: [],
      starttime: '2016-01-01',
      endtime: '2016-12-31',
      options: [{
        sitevalue: '选项1',
        label: '更张站'
      }, {
        sitevalue: '选项2',
        label: '贡巴站'
      }, {
        sitevalue: '选项3',
        label: '则木站'
      }, {
        sitevalue: '选项4',
        label: '盈则站'
      }, {
        sitevalue: '选项5',
        label: '拉弄站'
      }, {
        sitevalue: '选项6',
        label: '色卜站'
      }, {
        sitevalue: '选项7',
        label: '拉噶站'
      }, {
        sitevalue: '选项8',
        label: '托贡巴站'
      }, {
        sitevalue: '选项9',
        label: '扎巴站'
      }, {
        sitevalue: '选项10',
        label: '错巴站'
      }, {
        sitevalue: '选项11',
        label: '折郎站'
      }, {
        sitevalue: '选项12',
        label: '增巴站'
      }, {
        sitevalue: '选项13',
        label: '邦格站',
      },],
      sitevalue: '更张站'
    }
  },
  // 初始化时调用
  created() {
    // 调用查询降雨列表
    this.queryAllByDate()
  },
  mounted() {
    setTimeout(() => {
      this.rainfall()
      //这里就写你要执行的语句即可，先让数据库的数据加载进去数组中，你再从数组中取值就好了
    }, 800)
  },
  // 页面用到的方法
  methods: {
    /**
     * 查询所有降雨数据
     */
    async queryAll() {
      // 发送查询请求
      let res = await rainfallApi.selectAll()
      // 判断是否成功
      if (res.success) {
        this.tableData = res.data
      }
    },
    /**
     * 根据日期查询降雨数据
     */
    async queryAllByDate() {
      let pdata = []
      let pdate = []
      let params = {
        starttime: this.starttime,
        endtime: this.endtime,
        sitevalue: this.sitevalue,
      }
      // 发送查询请求
      let res = await rainfallApi.selectAllByDate(params)
      // 判断是否成功
      if (res.success) {
        const { data } = res
        this.tableData = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < this.tableData.length; i++) {
          pdata[i] = this.tableData[i].p
          pdate[i] = this.tableData[i].date
        }
        this.PData = pdata
        this.PDate = pdate
      }
      this.rainfall()
    },
    /**
     * 修改降雨数据
     */
    async reviserainfall() {
      let params = {
        site: this.revisedialogData.site,
        date: this.revisedialogData.date,
        p: this.revisedp
      }
      // 发送修改请求
      let res = await rainfallApi.reviserainfall(params)
      // 判断是否成功
      if (res.success) {
        this.queryAllByDate()
        this.revisestatus = false
      }
    },
    /**
     * 删除数据
     */
    async deleterainfall() {
      let params = {
        site: this.deletedialogData.site,
        date: this.deletedialogData.date,
      }
      // 发送删除请求
      let res = await rainfallApi.deleterainfall(params);
      // 判断是否成功
      if (res.success) {
        this.queryAllByDate()
        alert("删除成功!")
        this.deletestatus = false
      }
    },
    /**
     * 新增操作
     */
    async addrainfall() {
      let params = {
        site: this.sitevalue,
        date: this.adddialogData.date,
        p: this.adddialogData.p,
      }
      // 发送新增请求
      let res = await rainfallApi.addrainfall(params)
      // 判断是否成功
      if (res.success) {
        alert(res.message)
        this.queryAllByDate()
        this.addstatus = false
      }
    },
    /**
     * 新增弹窗表单数据
     */
    adddialogdata() {
      this.addstatus = true
    },
    /**
     * 修改弹窗表单数据
     */
    revisedialogdata(row) {
      this.revisestatus = true
      this.revisedialogData.site = row.site
      this.revisedialogData.date = row.date
    },
    /**
     * 删除弹窗
     */
    deletedialogdata(row) {
      this.deletestatus = true
      this.deletedialogData.site = row.site
      this.deletedialogData.date = row.date
    },

    /**
     * 可视化图像
     */
    rainfall() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))
      var pdata = this.PData
      var pdate = this.PDate
      var rainfallsite = this.sitevalue
      // 指定图表的配置项和数据
      var option = {
        // 工具栏
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        title: {
          text: rainfallsite + '降雨数据图',
          x: 'center',
          textStyle: {
            fontWeight: 'bolder',
            fontSize: 28,
          }
        },
        xAxis: {
          type: 'category',
          data: pdate,
        },
        yAxis: {
          name: '降雨量(mm)',
          nameLocation: 'start',
          // alignTicks: true,

          type: 'value',
          inverse: true,
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
        series: [
          {
            name: '降雨量',
            lineStyle: {//图形线的样式
              width: 2
            },
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            markArea: {
              silent: true,//鼠标触发
              itemStyle: {
                opacity: 0.9,//图形透明度
              },
            },
            data: pdata,
          }
        ]
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

  .block{
    .date{
      margin-right: 50px;
    }

    .select{
      margin-right: 50px;
    }

    .button{
      width: 100px;
      margin-right: 40px;
    }
  }

  .rainfalltable {
    margin-top: 20px;

    .table {
      width: 100%;
      background-color: rgb(228, 223, 217);
    }
  }
}
</style>
