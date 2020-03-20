<template>
  <div class="usernamage">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-row>
            <el-col :span="5" style=""> 下发时间 :</el-col>
            <el-col :span="8">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="table.timestart"
                value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="2" style="text-align:center">&nbsp;-- </el-col>
            <el-col :span="8">
              <el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"
                v-model="table.timeend" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="5">产品名称 :</el-col>
            <el-col :span="16">
              <el-input v-model="table.nickname" clearable>
              </el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="5">配方名称 :</el-col>
            <el-col :span="16">
              <el-input v-model="table.type" clearable>
              </el-input>
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
      <el-table :data="tableData" border style="width: 100%"  max-height="550" >
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="startDate" label="下发时间">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称">
        </el-table-column>
        <el-table-column prop="businessDate" label="营业日期">
        </el-table-column>
        <el-table-column label="配方名称">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.recipeName}}</el-button>

          </template>
        </el-table-column>
        <el-table-column prop="recipeCode" label="配方版本">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination :current-page="currentPage" :page-size="10" @current-change="pagechange"
        layout="total,prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="下发餐厅列表" :visible.sync="dialogVisible" width="30%" center>
       <el-table
        :data="listdata"
        border
        style="width: 100%">
         <el-table-column label="序号" type="index" width="100" height="350">
        </el-table-column>
        <el-table-column
          prop="marketName"
          label="营运市场"
          >
        </el-table-column>
        <el-table-column
          prop="cityName"
          label="城市"
     >
        </el-table-column>
        <el-table-column
          prop="storeCode"
          label="餐厅编码">
        </el-table-column>
        <el-table-column
          prop="storeName"
          label="餐厅名称">
        </el-table-column>
      </el-table>
       <el-pagination :current-page="inpage" :page-size="10" @current-change="pagechangein" style="text-align:right"
        layout="total,prev, pager, next" :total="inpagetotal">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
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
        inpage: 1,
        inpagetotal:1,
        dialogVisible: false,
        restaurantId: "",
        brandCode: 3,
        total: 1,
        table: {
          timestart: "",
          timeend: "",
          nickname: "",
          type: ''
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        tableData: [],
        listdata:[]
      }
    },
    methods: {
      handleClick(e) {
        this.restaurantId = e.recipeCode;
        this.tabledetailinfo()
        this.dialogVisible=true;
      },
      pagechangein(e){
         this.inpage=e;
         this.tabledetailinfo()
      },
      tabledetailinfo(){
       let data = {
          brandCode: this.brandCode,
          recipeCode: this.restaurantId,
          current: this.inpage
        };
        task.selectProductRecipeAutomaticLook(data).then(res => {
          this.listdata=res.data.data.records;
          this.inpagetotal=res.data.data.total;
        })
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
      init() {
        let data = {
          startDate: this.table.timestart,
          endDate: this.table.timeend,
          brandCode: this.brandCode, // 登录之后
          productName: this.table.nickname,
          templetName: this.table.type,
          current: this.currentPage
        }
        task.selectProductRecipeAutomatic(data).then(res => {
          this.tableData = res.data.data.records;
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
.usernamage /deep/ .el-dialog__body {padding: 0 20px; height: auto; overflow: hidden; }
 .page {text-align: right;margin-top: 8px}
</style>
