<template>
  <div class="app-container documentation-container">
    <!-- 选择控件 -->
    <div class="block">
      <el-date-picker class="date" v-model="starttime" type="date" placeholder="选择开始日期" clearable>
      </el-date-picker>
      <el-date-picker class="date" v-model="endtime" type="date" placeholder="选择结束日期" clearable>
      </el-date-picker>
      <el-select class="select" ref="site" v-model="sitevalue" placeholder="请选择流量站" clearable>
        <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label">
        </el-option>
      </el-select>
      <el-button class="button" @click="queryAllFloodByDate()">查询</el-button>
      <el-button class="button" @click="adddialogdata">新增</el-button>
    </div>
    <!-- 流量数据表格主体 -->
    <div class="flowtable">
      <!-- 用return里面的数据用   :data="tableData"    -->
      <el-table :data="FloodTableData" height="250" border class="table">
        <el-table-column prop="site" label="流量站" width="auto">
        </el-table-column>
        <el-table-column prop="date" label="观测日期" width="auto" sortable>
        </el-table-column>
        <el-table-column prop="mq" label="洪水流量" width="auto" sortable>
        </el-table-column>
        <el-table-column width="auto" label="数据操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="revisedialogdata(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deletedialogdata(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增流量弹窗 -->
      <el-dialog title="新增流量数据" :visible.sync="addstatus" width="30%">
        <el-form ref="adddialogform" :model="adddialogData" label-width="80px">
          <el-form-item label="流量站点">
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
          <el-form-item label="流量">
            <el-input v-model="adddialogData.mq"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addstatus = false">取 消</el-button>
          <el-button type="primary" @click="addflood">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改洪水数据弹窗 -->
      <el-dialog title="修改流量数据" :visible.sync="revisestatus" width="30%">
        <el-form ref="revisedialogform" :model="revisedialogData" label-width="80px">
          <el-form-item label="站点">
            <el-input v-model="revisedialogData.site" :disabled="revisedialogdisabled"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-input v-model="revisedialogData.date" :disabled="revisedialogdisabled"></el-input>
          </el-form-item>
          <el-form-item label="流量">
            <el-input v-model="revisedmq"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="revisestatus = false">取 消</el-button>
          <el-button type="primary" @click="reviseflood">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除流量数据弹窗 -->
      <el-dialog title="删除此条数据" :visible.sync="deletestatus" width="30%">
        <span>确定删除吗?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deletestatus = false">取 消</el-button>
          <el-button type="primary" @click="deleteflood">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- echarts可视图部分 -->
    <div id="main" style="width:100%;height:400px;"></div>
  </div>
</template>
<script type="text/javascript">
import DropdownMenu from '@/components/Share/DropdownMenu'
import floodApi from '@/api/flood'

export default {
  name: 'Flood',
  components: { DropdownMenu },
  data() {
    return {
      revisedmq: '',//修改流量值
      revisedialogdisabled: true,//对话框中禁用
      addstatus: false,
      revisestatus: false,
      deletestatus: false,
      revisedialogData: {},
      adddialogData: {},
      deletedialogData: {},
      FloodTableData: [],
      MQData: [],
      MQDate: [],
      site: [],
      starttime: '2016-01-01',
      endtime: '2016-12-31',
      options: [{
        sitevalue: '选项1',
        label: '增巴站',
      }, {
        sitevalue: '选项2',
        label: '工布江达站'
      }, {
        sitevalue: '选项3',
        label: '巴河桥站'
      }, {
        sitevalue: '选项4',
        label: '更张站'
      }, {
        sitevalue: '选项5',
        label: '泥曲站'
      }, {
        sitevalue: '选项6',
        label: '多布水库入库'
      }],
      sitevalue: '多布水库入库'
    }
  },
  // 初始化时调用
  created() {
    // 调用查询降雨列表
    this.queryAllFloodByDate();
  },
  mounted() {
    setTimeout(() => {
      this.flow();
      //这里就写你要执行的语句即可，先让数据库的数据加载进去数组中，你再从数组中取值就好了
    }, 800)
  },
  // 页面用到的方法
  methods: {
    /**
     * 查询数据库流量表中所有洪水数据
     */
    async queryAllFlood() {
      // 发送查询请求
      let res = await floodApi.selectAllFlood();
      // 判断是否成功
      if (res.success) {
        this.FloodTableData = res.data;
      }
    },
    /**
     * 根据日期查询洪水数据
     */
    async queryAllFloodByDate() {
      let mqdata = []
      let mqdate = []
      let params = {
        starttime: this.starttime,
        endtime: this.endtime,
        sitevalue: this.sitevalue,
      }
      // 发送查询请求
      let res = await floodApi.selectFloodByDate(params);
      // 判断是否成功
      if (res.success) {
        // 把data从返回值res中解构出来
        const { data } = res
        this.FloodTableData = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < this.FloodTableData.length; i++) {
          mqdata[i] = this.FloodTableData[i].mq
          mqdate[i] = this.FloodTableData[i].date
        }
        this.MQData = mqdata
        this.MQDate = mqdate
      }
      this.flow();
    },
    /**
     * 修改洪水数据
     */
    async reviseflood() {
      let params = {
        site: this.revisedialogData.site,
        date: this.revisedialogData.date,
        mq: this.revisedmq,
      }
      // 发送修改请求
      let res = await floodApi.reviseflood(params)
      // 判断是否成功
      if (res.success) {
        this.queryAllFloodByDate();
        this.revisestatus = false;
      }
    },
    /**
     * 删除洪水数据
     */
    async deleteflood() {
      let params = {
        site: this.deletedialogData.site,
        date: this.deletedialogData.date,
      }
      // 发送删除请求
      let res = await floodApi.deleteflood(params);
      // 判断是否成功
      if (res.success) {
        this.queryAllFloodByDate();
        this.deletestatus = false;
      }
    },
    /**
     * 新增流量操作
     */
    async addflood() {
      let params = {
        site: this.sitevalue,
        date: this.adddialogData.date,
        mq: this.adddialogData.mq,
      }
      console.log(params);
      // 发送新增请求
      let res = await floodApi.addflood(params)
      // 判断是否成功
      if (res.success) {
        alert(res.message);
        this.queryAllFloodByDate();
        this.addstatus = false;
      } else {
        alert("插入失败!")
      }
    },
    /**
     * 新增洪水数据弹窗表单数据
     */
    adddialogdata() {
      this.addstatus = true;
    },
    /**
     * 修改洪水数据弹窗表单数据
     */
    revisedialogdata(row) {
      this.revisestatus = true
      this.revisedialogData.site = row.site
      this.revisedialogData.date = row.date
    },
    /**
     * 删除洪水数据弹窗
     */
    deletedialogdata(row) {
      this.deletestatus = true;
      this.deletedialogData.site = row.site;
      this.deletedialogData.date = row.date;

    },

    /**
     * 流量可视化图像
     */
    flow() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))
      var mqdata = this.MQData;
      var mqdate = this.MQDate;
      var flowsite = this.sitevalue;
      // 指定图表的配置项和数据
      var option = {
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
          text: flowsite + '流量数据图',
          left: 'center',
          textStyle: {
            fontWeight: 'bolder',
            fontSize: 28,
          }
        },
        xAxis: {
          type: 'category',
          data: mqdate
        },
        yAxis: {
          name: '洪水流量(m³/s)',
          type: 'value'
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
            name: '流量',
            data: mqdata,
            type: 'line',
            smooth: true
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

  .block {

    .date {
      width: 195px;
      margin-right: 50px;
    }

    .select {
      width: 195px;
      margin-right: 50px;
    }

    .button {
      width: 130px;
      margin-right: 40px;
    }
  }

  .flowtable {
    margin-top: 10px;

    .table {
      width: 100%;
      background-color: rgb(228, 223, 217);
    }
  }
}
</style>
