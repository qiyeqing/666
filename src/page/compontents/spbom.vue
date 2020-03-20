<template>
  <div class="usernamage">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-row>
            <el-col :span="8">SP产品编码 :</el-col>
            <el-col :span="16">
              <el-input v-model="table.spProductCode"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row>
            <el-col :span="8">SP产品名称 :</el-col>
            <el-col :span="16">
              <el-input v-model="table.spProductName"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="6" style=""> SP产品同步日期 :</el-col>
            <el-col :span="8">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="table.startime"
                value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="2" style="text-align:center">&nbsp;-- </el-col>
            <el-col :span="8">
              <el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"
                v-model="table.endtime" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button size="small" type="primary" @click="search">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="tabledata">
      <el-table :data="tableData" border height="550" style="width: 100%">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="spProductCode" label="SP产品编码">
        </el-table-column>
        <el-table-column prop="spProductName" label="SP产品名称(配方)">
        </el-table-column>
        <el-table-column prop="startDate" label="生效日期">
        </el-table-column>
        <el-table-column prop="synTime" label="SP产品同步时间">
        </el-table-column>
        <el-table-column prop="relatedNo" label="关联产品数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="showdal1(scope.row)">复制配方</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination :current-page="currentPage" @current-change="pagechange" :page-size="5"
        layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="JDE原料/原物料" :visible.sync="dialogVisible" :close-on-click-modal="false"
      :close-on-press-escape="false" :show-close='false' width="40%" center>
      <div class="titels">JDE原料信息</div>
      <el-table :data="JDEData" max-height="200" border style="width: 100%">
        <el-table-column prop="jdeCode" label="JDE原料编码">
        </el-table-column>
        <el-table-column prop="jdeName" label="JDE原料名称">
        </el-table-column>
        <el-table-column prop="amount" label="数量">
        </el-table-column>
        <el-table-column prop="spUnitName" label="单位">
        </el-table-column>
      </el-table>
      <div class="titels">原物料信息</div>
      <el-table max-height="200" border :data="JDEData" style="width: 100%;padding-bottom:10px">
        <el-table-column prop="basicmaterialCode" label="原物料编码">
        </el-table-column>
        <el-table-column prop="basicmaterialName" label="原物料名称">
        </el-table-column>
        <el-table-column prop="basicAmount" label="数量">
        </el-table-column>
        <el-table-column prop="unitName" label="单位">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editthis(scope.row,scope)"> 修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer" v-if="JDEData.length>=1">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toCopy">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="errors" :close-on-click-modal="false" :close-on-press-escape="false" :show-close='false'
      width="20%">
      <div style="padding:20px 0" v-if="isInit">
        <p>JDE原料信息和原物料信息单位不一致</p>
        </br>
        <p>请确认信息是否正确</p>
      </div>
      <div style="padding:15px 0" v-else-if="errormsg">
        <p>JDE原料信息和原物料信息数量不一致</p>
        </br>
        <p>确定要复制该配方吗？</p>
      </div>
      <div style="padding:15px 0" v-else-if="okmsg">
        <p>确定要复制该配方吗？</p>
        </br>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align:center" v-if="okmsg||errormsg">
        <el-button @click="allfalse">关 闭</el-button>
        <el-button @click="copyReadyOk">确 认</el-button>
      </span>
      <span slot="footer" class="dialog-footer" style="text-align:center" v-else>
        <el-button @click="allfalse">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="edit" title="编辑" center :close-on-click-modal="false" :close-on-press-escape="false"
      :show-close='false' width="30%">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" style="margin:10px 0 ;line-height:35px">原物料编码 : {{row.unitName}}</el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" style="margin:10px 0;line-height:35px">原物料名称 : {{row.basicmaterialName}}</el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" style="margin:10px 0;line-height:35px">
          <el-row>
            <el-col :span="4">数 &nbsp;&nbsp; 量 : </el-col>
            <el-col :span="20">
              <el-input v-model="copyAmount" :maxlength="5" @change="changeroomArea"></el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" style="margin:10px 0;line-height:35px">单 &nbsp;&nbsp;位 : {{row.spUnitName}}</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="editAmout()">确 认</el-button>
        <el-button @click="edit = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="关联产品" :visible.sync="link" :close-on-click-modal="false" :close-on-press-escape="false"
      :show-close='false' width="40%" center :before-close="closeall">
      <el-row style="margin:10px 0">
        <el-col :span="5">
          <el-input v-model="linkdata.code" placeholder="产品编码" clearable></el-input>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-input v-model="linkdata.name" placeholder="产品名称" clearable></el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" size="small" @click="searchlist">查询</el-button>
        </el-col>
      </el-row>
      <el-table :data="linkDatas" max-height="300" border style="width: 100%">
        <el-table-column prop="productCode" label="产品编码">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称">
        </el-table-column>
        <el-table-column prop="amount" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="lastcopy(scope.row)"> 复 制 </el-button>
          </template>
        </el-table-column>
      </el-table>
     
      <div class="titels">已复制</div>
      <el-table max-height="300" border :data="copyLinkDatas" style="width: 100%;padding-bottom:10px">
        <el-table-column prop="productCode" label="产品编码">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称">
        </el-table-column>
      </el-table>
       <div style="margin:10px 0">
        <!-- -->
        <el-pagination :current-page="inPage" :page-size="5" @current-change="inpagechange" style="text-align:right"
          layout="total, prev, pager, next" :total="intotal">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="closeall">关 闭</el-button>  
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    SP,
    produce
  } from '@/config/api.js'
  export default {
    data() {
      return {
        total: 1,
        currentPage: 1,
        inPage: 1,
        intotal: 1,
        brandCode: '',

        dialogVisible: false,
        link: false,
        linkdata: {
          code: '',
          name: ""
        },
        errors: false,
        isInit: false,
        amoutIndex: '',
        copyAmount: "",
        errormsg: false,
        okmsg: false,
        edit: false,
        unit: '',
        row: {
          unitName: '',
          basicmaterialName: '',
          spUnitName: ''
        },
        checkcode: '',
        JDEData: [],
        linkDatas: [],
        copyLinkDatas: [],
        table: {
          spProductCode: '',
          spProductName: '',
          startime: '',
          endtime: ''
        },
        tableData: [],

        proinfo: {
          name: "",
        }
      }
    },
    methods: {
      closeall(){         
         this.copyLinkDatas=[];
         this.JDEData=[];
         this.dialogVisible=false;
         this.inPage=1;
         this.allfalse()
         this.link = false;
         
      },
      lastcopy(e){
       let data={
        brandCode:this.brandCode,
        productCode:e.productCode,
         recipeName:this.proinfo.name,
        basicmaterialDatas:this.JDEData,
      }
      SP.copyRecipeAndMaterial(data).then(res=>{
        if(res.data.code==200){
           this.getCopydata(this.inPage);
           this.searchlist()
        }
      })
      },
      getCopydata(){
          SP.getCopiedProductList(this.inPage).then(res=>{
             this.copyLinkDatas=res.data.data.records;
             this.intotal=res.data.data.total;
          })
      },
      inpagechange(e) {
        this.inPage = e;
        this.getCopydata(this.inPage);
      },
      searchlist() {
        this.getlist();
      },
      //关联的产品
      getlist() {
        let data = {
          current: 1,
          productCode: this.linkdata.code,
          productName: this.linkdata.name,
          isVirtualProductFlag: 'N',
          brandCode: this.brandCode,
        }
        SP.getCopyableProductList(data).then(res => {
          this.linkDatas = res.data.data;
          this.intotal = res.data.total;
        })
      },
      allfalse() {
        this.isInit = false;
        this.errors = false;
        this.okmsg = false;
        this.errormsg = false;
      },
      editthis(e, v) {
        this.amoutIndex = v.$index;
        this.copyAmount = e.basicAmount
        this.row = e;
        this.edit = true
      },
      toCopy() {
        let flag = false
        this.JDEData.forEach((a, b) => {
          if (a.basicAmount == a.amount) {
            flag = false
          } else {
            flag = true
          }
        })
        if (flag) {
          this.isInit = false
          this.errors = true;
          this.errormsg = true;
          this.okmsg = false;
        } else {
          this.isInit = false
          this.errors = true;
          this.okmsg = true;
          this.errormsg = false;
        }
      },
      copyReadyOk() {
        this.allfalse();
        this.link = true;
      
        this.getCopydata(this.inPage)
      },
      changeroomArea(val) {
        this.copyAmount = val.replace(/[^\d.]/g, '')
      },
      editAmout() {
        this.JDEData[this.amoutIndex].basicAmount = this.copyAmount;
        this.edit = false
      },
      showdal1(e) {
        console.log(e)
        this.proinfo.name = e.spProductName;
        this.checkcode = e.spProductCode;
        let da = {
          code: this.checkcode
        }
        SP.checkCopyMaterial(da).then(res => {
          this.errors = res.data.data == 1 ? true : false;
          this.isInit = res.data.data == 1 ? true : false
        })
        SP.getLinkedOriginalMaterial(da).then(res => {
          this.JDEData = res.data.data;
        })
        this.dialogVisible = true;
      },
      reset() {
        this.currentPage = 1;
        this.table.spProductCode = '';
        this.table.spProductName = '';
        this.table.startime = '';
        this.table.endtime = '';
        this.init()
      },
      search() {
        this.currentPage = 1;
        this.init();
      },
      pagechange(e) {
        this.currentPage = e;
        this.init()
      },
      init() {
        let data = {
          current: this.currentPage,
          spProductCode: this.table.spProductCode,
          spProductName: this.table.spProductName,
          startTime: this.table.startime,
          endTime: this.table.endtime,
        }
        SP.selectSpbomProduct(data).then(res => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        })
      },
    },
    mounted() {
      this.init()
    }
  }

</script>
<style type="less" scoped>

  .usernamage{text-align: left;text-indent:5px;width: 98%;height: auto;margin: 0 auto;overflow: hidden;font-size: 15px; }
.search{width:100%;height: auto;overflow: hidden;;line-height: 50px;background:rgba(242, 242, 242, 1);margin-top: 5px; }
 .tabledata{margin:15px 0}
  .page {text-align: right;margin-top: 8px}
  .nohover{
      width:100%;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
     -webkit-line-clamp: 3;
     -webkit-box-orient: vertical;
  }
  .nohover:hover{
      width:100%;
      -webkit-line-clamp: 1113;
     
  }
   .usernamage /deep/ .el-dialog__body {
    padding: 0 20px;
    height: auto;
    overflow: hidden;
  }
 .usernamage /deep/ .el-dialog__footer{text-align: center;}
.titels{ width: 100%;background: #efefef;color: #333; line-height: 30px; height: 30px;margin: 5px 0;}
</style>
