<template>
    <div class="app-container documentation-container">
        <div class="programtable">
            <el-table class="table" :data="tableData" style="width: 100%;height: 690px;" @row-dblclick="dbclick"
                :cell-class-name="tableCellClassName" tooltip-effect="dark">
                <el-table-column label="流域" prop="basin" width="70" align="center">
                </el-table-column>
                <el-table-column label="方案名" prop="resultname" width="auto" align="center">
                </el-table-column>
                <el-table-column prop="popsize" label="种群大小" width="auto" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.popsize" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.popsize }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="generation" label="迭代次数" width="auto" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.generation" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.generation }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="wum" label="WUM" width="auto" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.wum" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.wum }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="wlm" label="WLM" width="auto" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.wlm" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.wlm }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="wdm" label="WDM" width="auto" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.wdm" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.wdm }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="k" label="K" width="60" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.k" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.k }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sm" label="SM" width="auto" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.sm" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.sm }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cs" label="CS" width="auto" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.cs" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.cs }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="kss" label="KSS" width="auto" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.kss" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.kss }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="kg" label="KG" width="auto" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.kg" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.kg }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="kkss" label="KKSS" width="auto" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.kkss" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.kkss }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="kkg" label="KKG" width="auto" align="center">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.kkg" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.kkg }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="auto">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deletedialogdata(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 删除数据弹窗 -->
            <el-dialog title="删除此条数据" :visible.sync="deletestatus" width="30%">
                <span>确定删除吗?</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deletestatus = false">取 消</el-button>
                    <el-button type="primary" @click="handleDelete">确 定</el-button>
                </span>
            </el-dialog>
        </div>
</div>
</template>
  
<script>
import programApi from '@/api/program'
import store from '@/store';
export default {
    data() {
        return {
            tableData: [],
            search: '',
            username: store.getters.name,
            currentCell: null,
            rowindex: null,
            search: '',
            deletestatus: false,
            deletedialogData: {},

        }
    },
    // 初始化时调用
    created() {
        // 调用查询降雨列表
        this.queryallprogram();
    },
    mounted() {
        setTimeout(() => {
            //这里就写你要执行的语句即可，先让数据库的数据加载进去数组中，你再从数组中取值就好了
        }, 800)
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        // 查询所有预报方案
        async queryallprogram() {
            let params = {
                username: this.username,
            }
            let res = await programApi.queryallprogram(params);
            if (res.success) {
                const { data } = res;
                console.log(data);
                this.tableData = data;
            }
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
                rowData: this.tableData[rowindex],
            }
            console.log(params);
            this.currentCell = null;
            this.rowindex = null;
            let res = await programApi.updaterowdata(params);
        },
        // 删除数据
        async handleDelete() {

            let params = {
                resultname:this.deletedialogData.resultname,
            }
            console.log(params);
            let res = await programApi.deleterowdata(params);
            if (res.success){
                this.deletestatus=false;
                alert("删除成功");
                this.queryallprogram();
            }
        },
        /**
        * 删除弹窗
        */
        deletedialogdata(row) {
            this.deletestatus = true;
            this.deletedialogData.resultname = row.resultname;
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