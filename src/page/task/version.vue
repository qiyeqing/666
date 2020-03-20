<template>
  <div class="usernamage">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-row>
            <el-col :span="5" style=""> 营运市场 :</el-col>
            <el-col :span="18">
              <el-select v-model="table.market" clearable>
                <el-option v-for="item in marketlist" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="4">城 市 :</el-col>
            <el-col :span="20">
              <el-select v-model="table.city" clearable>
                <el-option v-for="item in citylist" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col :span="6">餐 厅 :</el-col>
            <el-col :span="18">
              <el-input v-model="table.name" clearable>
              </el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <el-button size="small" type="primary">查询</el-button>
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
        <el-table-column prop="marketName" label="营运市场">
        </el-table-column>
        <el-table-column prop="cityName" label="城市">
        </el-table-column>
        <el-table-column prop="storeName" label="餐厅">
        </el-table-column>
        <el-table-column label="当前版本">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="routerpush(scope.row,true)">{{scope.row.currentVersion}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="最新版本">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="routerpush(scope.row)">{{scope.row.latestVersion}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination :current-page="currentPage" :page-size="10" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    task,
    seletinfo
  } from '@/config/api.js'
  export default {
    data() {
      return {
        editRouter: false,
        currentPage: 1,
        versions:'',
        brandCode: 3,
        total: 1,
        citylist: [],
        marketlist: [],
        table: {
          market: '',
          city: "",
          name: ''
        },
        tableData: [],
        listdata: []
      }
    },
    methods: {
      routerpush(e,type){
       this.$router.push({path:'/home/taskdetail',query:{storeCode:e.storeCode,versions:type?e.currentVersion:e.latestVersion}})
      },
      handleClick(e) {
        this.restaurantId = e.recipeCode;
        this.tabledetailinfo()
        this.dialogVisible = true;
      },
      pagechangein(e) {
        this.inpage = e;
        this.tabledetailinfo()
      },
      tabledetailinfo() {
        let data = {
          brandCode: this.brandCode,
          recipeCode: this.restaurantId,
          current: this.inpage
        };
        task.selectProductRecipeAutomaticLook(data).then(res => {
          this.listdata = res.data.data.records;
          this.inpagetotal = res.data.data.total;
        })
      },
      reset() {
        this.table.market = '';
        this.table.city = '';
        this.table.name = '';
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
          brandCode: this.brandCode,
          draftCode: this.table.market,
          cityCode: this.table.city,
          diningRoom: this.table.name,
          versions:this.versions?this.versions:'',
          current: this.currentPage
        }
        task.selectRecipeStoreVersion(data).then(res => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        })
      },
      seleinfo() {
        seletinfo.selectCity(this.brandCode).then(res => {
          this.citylist = res.data.data.city;
          this.marketlist = res.data.data.market;
        })
      }
    },
      watch: {
      '$route.query.versions': function (e) {
         this.versions=this.$route.query.versions?this.$route.query.versions:'';
          this.init();
      }
    },
    mounted() {
      this.versions=this.$route.query.versions;  
      this.seleinfo();
      this.init();
    }
  }

</script>
<style type="less" scoped>
  .usernamage{text-align: left;text-indent:5px;width: 98%;height: auto;margin: 0 auto;overflow: hidden;font-size: 15px; }
.search{width:100%;height: 50px;line-height: 50px;background:rgba(242, 242, 242, 1);margin-top: 5px; }
 .tabledata{margin:15px 0}
  .page {text-align: right;margin-top: 8px}
</style>
