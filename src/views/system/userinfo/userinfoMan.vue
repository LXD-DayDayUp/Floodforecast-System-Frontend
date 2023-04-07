<template>
    <div class="app-container documentation-container">
        <div>
            <el-table :data="tableData" style="width: 100%,height=100%" @row-dblclick="dbclick"
                :cell-class-name="tableCellClassName">
                <el-table-column fixed prop="username" label="用户名" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.username" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.username }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed prop="realName" label="真实姓名" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.realName" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.realName }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed prop="phone" label="联系方式" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.phone" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.phone }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed prop="email" label="用户邮箱" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.email" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.email }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed prop="departmentName" label="所属部门" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.departmentName"
                            v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.departmentName }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed prop="createTime" label="注册时间" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <el-input @blur="hideInput" size="mini" :ref="scope.row.index + ',' + scope.column.index"
                            v-model="scope.row.createTime" v-if="scope.row.index + ',' + scope.column.index == currentCell">
                        </el-input>
                        <span v-else>{{ scope.row.createTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed prop="isAdmin" label="是否为管理员" width="auto">
                    <template slot-scope="scope">
                        <!--v-if去判断双击的是不是当前单元格-->
                        <span v-if="scope.row.isAdmin == 1">{{ Admin.isAdmin }}</span>
                        <span v-else>{{ Admin.noAdmin }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="用户操作" width="auto" >
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" @click="" size="medium">设置为管理员</el-button> -->
                        <el-button type="danger" @click="deletedialogdata(scope.row)" size="medium">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <!-- 删除用户确认弹窗 -->
            <el-dialog title="删除此条数据" :visible.sync="deletestatus" width="30%">
                <span>确定删除吗?</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deletestatus = false">取 消</el-button>
                    <el-button type="primary" @click="deleteUserInfoByUserid">确 定</el-button>
                </span>
            </el-dialog>
        </div>
</div>
</template>

<script>
// 在script中引用接口
import userinfoApi from '@/api/userinfo'

export default {
    data() {
        return {
            // 用一个字符串来保存当前双击的是哪一个单元格
            currentCell: null,
            rowindex: null,
            tableData: [],
            deletestatus: false,
            querystatus: false,
            deletedialogData: {},
            querydialogData: {},
            Admin: {
                isAdmin: '管理员用户',
                noAdmin: '普通用户',
            }
        }
    },
    // 初始化时调用
    created() {
        // 查询所有用户信息
        this.selectAllUserInfo();
    },
    methods: {
        // 查询所有用户信息
        async selectAllUserInfo() {
            let res = await userinfoApi.selectAllUserInfo();
            if (res != null) {
                this.tableData = res.data;
                console.log(this.tableData);
            }
        },
        // 根据用户id查询用户具体信息
        async selectUserInfoByUserid() {
            // 获取当前行的用户id 
            let params = {
                userid: this.tableData.id,
            }
            console.log(userid);
            let res = await userinfoApi.getUserInfoByUserid(params);
            if (res.success) {
                console.log(res);
            }
        },
        // 根据用户id删除用户信息
        async deleteUserInfoByUserid() {
            let params = {
                userid: this.deletedialogData.id,
            }
            let res = await userinfoApi.deleteUserInfoByUserid(params);
            if (res.success) {
                alert("删除成功!")
            }
            this.deletestatus = false;
            this.selectAllUserInfo();
        },
        /**
        * 删除弹窗
        */
        deletedialogdata(row) {
            this.deletestatus = true;
            this.deletedialogData.id = row.id;
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
        async hideInput() {
            var rowindex = this.rowindex;
            // 获取修改表格的行列索引
            let params = {
                rowData: this.tableData[rowindex],
            }
            console.log(params);
            this.currentCell = null;
            this.rowindex = null;
            let res = await userinfoApi.updaterowdata(params);
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
    width: 100%;
    height: 715px;


}
</style>