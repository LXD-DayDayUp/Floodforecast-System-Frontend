<template><!-- 模版中有且只能有一个主div，其他div放在主div中 -->
  <div class="app-container documentation-container">
    <div class="form">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label-width="75px" label="种群大小:">
          <el-input class="input1" v-model="popsize" clearable></el-input>
        </el-form-item>
        <el-form-item label-width="75px" label="迭代次数:">
          <el-input class="input1" v-model="generation" clearable></el-input>
        </el-form-item>
        <el-form-item label-width="75px" label="流量站:">
          <el-select class="select" ref="site" v-model="flowsitevalue" placeholder="请选择流量站" clearable>
            <el-option v-for="item in flowsite" :key="item.label" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="75px" label="洪水场次:">
          <el-input class="input2" v-model="floodnumber" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" @click="modelcali">开始率定</el-button>
          <el-button class="button" @click="export2Excel">导出表格</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 参数率定结果表格 -->
    <div>
      <el-table :data="GAtableData" style="width: 100%" height="100" :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange" @row-dblclick="dbclick" :cell-class-name="tableCellClassName"
        tooltip-effect="dark">
        <el-table-column type="selection" width="70">
        </el-table-column>
        <el-table-column prop="basin" label="子流域" width="75">
        </el-table-column>
        <el-table-column prop="wum" label="WUM" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.wum" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.wum }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wlm" label="WLM" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.wlm" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.wlm }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wdm" label="WDM" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.wdm" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.wdm }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="k" label="K" width="70">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.k" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.k }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="c" label="C" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.c" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="b" label="B" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.b" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.b }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="imp" label="IMP" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.imp" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.imp }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sm" label="SM" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.sm" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.sm }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cs" label="CS" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.cs" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.cs }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ex" label="EX" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.ex" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.ex }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="kss" label="KSS" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.kss" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.kss }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="kg" label="KG" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.kg" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.kg }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="kkss" label="KKSS" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.kkss" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.kkss }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="kkg" label="KKG" width="75">
          <template slot-scope="scope">
            <!--v-if去判断双击的是不是当前单元格-->
            <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
              v-model="scope.row.kkg" v-if="scope.row.index + ',' + scope.column.index == currentCell">
            </el-input>
            <span v-else>{{ scope.row.kkg }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 存储结果弹窗 -->
      <el-dialog title="保存率定方案" :visible.sync="storeResultStatus" width="30%">
        <el-form label-width="30%">
          <el-form-item label="用户名:">
            <el-input disabled v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="方案编号:">
            <el-input v-model="resultName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="storeResultStatus = false">取 消</el-button>
          <el-button type="primary" @click="storeResult">保 存</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 生成图像按钮 -->
    <div class="genchart">
      <el-button class="button" @click="queryMqAndCq">生成图像</el-button>
      <el-button class="button" @click="storeResultDialogData">存储结果</el-button>
    </div>
    <!-- echarts可视图部分,该div相当于一个容器 -->
    <div id="main" style="width:100%;height:458px;"></div>
</div>
</template>

<script type="text/javascript">
import modelcaliApi from '@/api/modelcali'
import store from '@/store'

export default {
  data() {
    return {
      username: store.getters.name,
      popsize: "200",
      generation: "80",
      basin: "多布水库入库",
      floodnumber: "20160101",
      GAtableData: [],
      multipleSelection: [],
      Site: [],
      MQ: [],
      CQ: [],
      hyDate: [],
      storeResultStatus: false,
      resultName: "",
      // 用一个字符串来保存当前双击的是哪一个单元格
      currentCell: null,
      rowindex: null,
      flowsite: [{
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
      flowsitevalue: '多布水库入库'
    }
  },
  // 初始化时调用
  created() {
    this.modelcali();
  },
  mounted() {
    setTimeout(() => {
      //这里就写你要执行的语句即可，先让数据库的数据加载进去数组中，你再从数组中取值就好了
    }, 750)
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    onSubmit() {
      console.log('submit!');
    },
    // 根据种群大小和迭代次数向后台查询数据
    async modelcali() {
      let params = {
        popsize: this.popsize,
        generation: this.generation,
      };
      let res = await modelcaliApi.queryCaliResults(params)
      if (res.success) {
        const { data } = res
        this.GAtableData = JSON.parse(JSON.stringify(data));
      }
    },
    // 根据表格中参数通过新安江模型计算流量，获取实测与模拟流量
    async queryMqAndCq() {
      let site = []
      let hyDate = []
      let mq = []
      let cq = []
      let params = {
        flowsite: this.flowsitevalue,
        floodnumber: this.floodnumber,
        modelpar: this.multipleSelection,
      }
      let res = await modelcaliApi.queryMqAndCq(params);
      if (res.success) {
        const { data } = res;
        site = data[0].site;
        hyDate = data[0].date;
        mq = data[0].mq;
        cq = data[0].cq;
        this.Site = site;
        this.hyDate = hyDate;
        this.MQ = mq;
        this.CQ = cq;
      }
      this.modelcaliChart();
    },
    // 保存率定结果到数据库,前后端交互函数需要添加async,以及需要使用await请求后台数据
    async storeResult() {
      let params = {
        username: this.username,
        resultName: this.resultName,
        resultTableData: this.multipleSelection,
      }
      console.log(params);
      let res = await modelcaliApi.storeModelCaliResult(params);
      if (res.success) {
        alert("保存成功!")
        this.storeResultStatus = false;
      } else {
        alert("数据已存在!")
        this.storeResultStatus = true;
      }

    },
    // 参数率定图像
    modelcaliChart() {
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
            magicType: { show: true, type: ['bar', 'line'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        title: {
          left: 'left',
          text: '参数率定结果图'
        },
        // 图例
        legend: {
          data: ['实测流量', '模拟流量'],
        },
        // X轴
        xAxis: [
          {
            type: 'category',
            data: hyDate,
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
            data: MQ,
          },
          {
            name: '模拟流量',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },
            data: CQ,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 获取表格行数据，console.log(this.multipleSelection);输出的既是表格数据，所有被选中的行会存入multipleSelection数组中
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 导出excel
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/Export2Excel");
        const tHeader = ["姓名", "年龄", "性别", "成绩"]; // 设置Excel的表格第一行的标题
        const filterVal = ["name", "age", "sex", "score"]; // 对象tableData中一个对象的属性
        const list = this.GAtableData; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list); //对数据过滤
        const head = "hh_excel";
        // tHeader：第一行标题； data:要显示的数据；head：下载的文件名
        export_json_to_excel(tHeader, data, head);
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    storeResultDialogData() {
      this.storeResultStatus = true;
    },
    // 给单元格绑定横向和竖向的index，这样就能确定是哪一个单元格
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
    },
    // 获得当前双击的单元格的横竖index，然后拼接成一个唯一字符串用于判断，并赋给currentCell
    // 拼接后类似这样："1,0","1,1",
    dbclick(row, column) {
      this.currentCell = row.index + ',' + column.index;
      this.rowindex = row.index
      // 这里必须要setTimeout，因为在点击的时候，input才刚被v-if显示出来，不然拿不到dom
      setTimeout(() => {
        // 双击后自动获得焦点
        this.$refs[row.index + ',' + column.index].focus();
      })
    },
    // 当input失去焦点的时候，隐藏input
    async hideInput(row, column) {
      var rowindex = this.rowindex;
      // 获取修改表格的行列索引
      let params = {
        rowData: this.GAtableData[rowindex],
      }
      console.log(params);
      this.currentCell = null;
      this.rowindex = null;
      let res = await modelcaliApi.updaterowdata(params);

      if (res.success) {
        console.log("success");
      }

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

    .input1 {
      width: 75px;
      margin-right: 30px;
    }

    .input2 {
      width: 120px;
      margin-right: 30px;
    }

    .select {
      width: 140px;
      margin-right: 30px;
    }
  }

  .genchart {
    .button {
      margin-right: 50px;
      margin-top: 20px;
    }
  }
}
</style>