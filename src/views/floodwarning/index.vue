<template>
    <div class="app-container documentation-container">
        <div class="el-form">
            <el-form class="form" label-width="120px" inline>
                <!-- 选择开始时间 -->
                <el-form-item label="选择开始时间:">
                    <el-date-picker v-model="starttime" style="width: 150px;" type="date" placeholder="请选择:" clearable>
                    </el-date-picker>
                </el-form-item>
                <!-- 选择结束时间-->
                <el-form-item label="选择结束时间:">
                    <el-date-picker v-model="endtime" style="width: 150px;" type="date" placeholder="请选择:" clearable>
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="formitem"  label="选择预警对象:">
                    <el-select v-model="objectvalue" style="width: 150px;" clearable placeholder="请选择:">
                        <!-- v-for循环 -->
                        <el-option v-for="item in object" :key="item.label" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="formitem" label="调度方案:">
                    <el-select v-model="reservalue" style="width: 150px;" clearable placeholder="请选择:">
                        <!-- v-for循环 -->
                        <el-option v-for="item in reser" :key="item.label" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button class="button" @click="queryFloodwarningResult">查询</el-button>
            </el-form>
        </div>
        <div class="table">
            <el-table :data="tabledata" height="690" style="width: 100%">
                <el-table-column prop="object"  label="预警对象"></el-table-column>
                <el-table-column prop="date"    label="日期"></el-table-column>
                <el-table-column prop="duobu"   label="多布水库出库流量"></el-table-column>
                <el-table-column prop="bajiqu"  label="巴及曲流量"></el-table-column>
                <el-table-column prop="juemuqu" label="觉木曲流量"></el-table-column>
                <el-table-column prop="preQ"    label="预测流量"></el-table-column>
                <el-table-column prop="prelevel" label="预测水位"></el-table-column>
                <el-table-column prop="warlevel" label="预警水位"></el-table-column>
                <el-table-column prop="leader"  label="安全责任人"></el-table-column>
                <el-table-column label="发布预警信息" width="150">
                    <template slot-scope="scope">
                        <el-button type="warning" @click="dialogdata(scope.row)">发布预警</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <!-- 发布预警弹窗 -->
            <el-dialog title="预警信息发布" :visible.sync="dialogVisible" width="30%">
                <el-form :label-position="labelPosition" label-width="120px" :model="warninginfo">
                    <el-form-item label="预警对象">
                        <el-input v-model="warninginfo.object"></el-input>
                    </el-form-item>
                    <el-form-item label="预警时间">
                        <el-input v-model="warninginfo.date"></el-input>
                    </el-form-item>
                    <el-form-item label="预警断面流量">
                        <el-input v-model="warninginfo.preQ"></el-input>
                    </el-form-item>
                    <el-form-item label="水位超警值">
                        <el-input v-model="warninginfo.warvalue"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="发布方式">
                        <el-select v-model="channel" placeholder="请选择">
                            <el-option v-for="item in warninginfo.channel" :key="item.label" :label="item.label"
                                :value="item.label"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="安全责任人">
                        <el-input v-model="warninginfo.leader"></el-input>
                    </el-form-item>
                    <el-form-item label="预警内容">
                        <el-input type="textarea" placeholder="请输入预警信息" maxlength="40" show-word-limit
                            v-model="warninginfo.warmessage"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sendwarninginfo">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script type="text/javascript">

import floodwarningApi from '@/api/floodwarning';

export default {
    data() {
        return {
            dialogVisible: false,
            labelPosition: 'left',
            tabledata: [],
            starttime: '2016-07-01',
            endtime: '2016-12-30',
            object: [
                {
                    objectValue: '选项1',
                    label: '八一大桥',
                },
                {
                    objectValue: '选项2',
                    label: '多布水库',
                },
            ],
            warninginfo: {
                object: '',
                date: '',
                preQ: '',
                prelevel: '',
                warvalue: '',
                leader: '',
                warmessage: '',
            },
            objectvalue: "八一大桥",
            reservalue:"方案1",
            channel: '短信',
        }
    },
    // 初始化时调用
    created() {
        // 调用预警信息列表
        this.queryFloodwarningResult();
    },
    mounted() {
    },
    // 页面用到的方法
    methods: {
        async queryFloodwarningResult() {
            let params = {
                object: this.objectvalue,
                starttime: this.starttime,
                endtime: this.endtime,
            }
            console.log(params);
            let res = await floodwarningApi.queryFloodwarningResult(params);
            if (res.success) {
                const { data } = res;
                this.tabledata = data;
            }
        },
        /**
         * 弹窗启动方法
         */
        dialogdata(row) {
            this.dialogVisible = true;
            this.warninginfo.object = row.object;
            this.warninginfo.date = row.date;
            this.warninginfo.leader = row.leader;
            this.warninginfo.preQ = row.bajiqu + row.bajiqu + row.duobu;
            this.warninginfo.prelevel = row.prelevel;
            this.warninginfo.warvalue = row.prelevel-row.warlevel;
        },
        /**
         * 发布预警信息
         */
        async sendwarninginfo() {
            let params = {
                object: this.warninginfo.object,
                date: this.warninginfo.date,
                preQ:this.warninginfo.preQ,
                prelevel: this.warninginfo.prelevel,
                warvalue: this.warninginfo.warvalue,
                leader: this.warninginfo.leader,
                warmessage: this.warninginfo.warmessage,
            }
            console.log(params);
            let res = await floodwarningApi.warninginfo(params);
            if (res.success) {
                this.dialogVisible = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.documentation-container {
    background-color: rgb(228, 223, 217);
    width: 100%;
    height: 710px;

    .table {
        width: 100%;
        height: 85%;
        background-color: #f1eaea;
        float: left;
    }
}
</style>