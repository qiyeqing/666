<template>
  <div class="usernamage">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-row>
            <el-col :span="5" style=""> 报警时间 :</el-col>
            <el-col :span="8">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="table.timestart" value-format="yyyy-MM-dd"
                style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="2" style="text-align:center">&nbsp;-- </el-col>
            <el-col :span="8">
              <el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="table.timeend"
                style="width: 100%;"></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="6">下发状态:</el-col>
            <el-col :span="16">
              <el-select v-model="table.nickname" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="6">下发类型 :</el-col>
            <el-col :span="16">
              <el-select v-model="table.type" clearable>
                <el-option v-for="item in issueTypeoptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <el-button size="small" type="primary" @click="rearch">查询</el-button>
            </el-col>
            <el-col :span="8">
              <el-button size="small" @click="reset">重置</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="tabledata">
      <el-table :data="tableData" border  max-height="550"  style="width: 100%">
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="startDate" label="开始时间">
        </el-table-column>
        <el-table-column prop="endDate" label="结束时间">
        </el-table-column>
        <el-table-column label="下发类型">
          <template slot-scope="scope">
            <span v-if="scope.row.issueState==0">自动</span>
            <span v-else>手动</span>
          </template>
        </el-table-column>
        <el-table-column prop="versions" label="版本号">
        </el-table-column>

        <el-table-column label="下发状态">
          <template slot-scope="scope">
            <span v-if="scope.row.issueType==2" style="">
              <el-button type="text" size="small" @click="routerpush(scope.row)">执行完成</el-button>
            </span>
            <span v-else-if="scope.row.issueType==1" style="">
              <el-button type="text" size="small" @click="failModal(scope.row)">执行失败</el-button>
            </span>
            <span v-else>执行中</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination :current-page="currentPage" :page-size="10" @current-change="pagechange"
        layout="total,prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="30%">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" class="line_h">开始时间:{{row.startDate}}</el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" class="line_h">结束时间:{{row.endDate}}</el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" class="line_h">下发类型: <span v-if="row.issueState==0">自动</span> <span v-else>手动</span></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" class="line_h">版本号:{{row.versions}}</el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" class="line_h">失败信息:{{row.failureMessage}}</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    task
  } from '@/config/api.js'
  export default {
    data() {
      return {
        currentPage: 1,
        total: 1,
        dialogVisible: false,
        table: {
          timestart: "",
          timeend: "",
          nickname: "",
          type: ''
        },
        row: {
          startDate: "",
          endDate: "",
          issueType: "",
          issueState: '',
          msg: "",
          versions: '',
          failureMessage: ''
        },
        options: [{
          value: '0',
          label: '自动'
        }, {
          value: '1',
          label: '手动'
        }],
        issueTypeoptions: [{
          value: '0',
          label: '执行中'
        }, {
          value: '1',
          label: '执行失败'
        }, {
          value: '2',
          label: '执行完成'
        }],
        tableData: []
      }
    },
    methods: {
        routerpush(e){
            console.log(e);
            this.$router.push({path:"/home/version",query:{versions:e.versions}})
        },
      reset() {
        this.table.timestart = '';
        this.table.timeend = '';
        this.table.nickname = '';
        this.table.type = '';
        this.currentPage = 1;
        this.init();
      },
      pagechange(e) {
        this.currentPage = e;
        this.init()
      },
      rearch() {
        this.currentPage = 1;
        this.init()
      },
      failModal(e) {
        this.row = e;
        this.dialogVisible = true;
      },
      init() {
        let data = {
          startDate: this.table.timestart,
          endDate: this.table.timeend,
          brandCode: 1, // 登录之后
          issueState: this.table.nickname,
          issueType: this.table.type,
          current: this.currentPage
        }
        task.selectRecipeIssueTask(data).then(res => {

          this.tableData = res.data.data.records
          this.total = res.data.data.total;
        })
      }
    },
    mounted() {
      this.init()
    }
  }

</script>
<style type="less" scoped>
  .usernamage{text-align: left;text-indent:5px;width: 98%;height: auto;margin: 0 auto;overflow: hidden;font-size: 15px; }
.search{width:100%;height: 50px;line-height: 50px;background:rgba(242, 242, 242, 1);margin-top: 5px; }
 .tabledata{margin:15px 0}
  .page {text-align: right;margin-top: 8px}
  .usernamage /deep/ .el-dialog__body {
    padding: 0 20px;
    height: auto;
    overflow: hidden;
  }
  .line_h{ margin: 15px 0;}
</style>
