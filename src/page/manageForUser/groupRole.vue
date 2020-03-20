<template>
  <div class="usernamage">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-row>
            <el-col :span="8" style=""> 用户组名称 :</el-col>
            <el-col :span="16">
              <el-input v-model="table.name" clearable=""></el-input>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row>
            <el-col :span="8"> 品 &nbsp;牌 :</el-col>
            <el-col :span="16">
              <!---->
              <el-select v-model="table.company" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.brandNameCn" :value="item.brandCode">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="8"> 市 &nbsp;场 :</el-col>
            <el-col :span="16">
              <el-input v-model="table.market" clearable=""> </el-input>
            </el-col>
          </el-row>

        </el-col>
        <el-col :span="6">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <el-button size="small" type="primary" @click="search">查询</el-button>
            </el-col>
            <el-col :span="8">
              <el-button size="small" @click="reset">重置</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="btns">
      <el-button size="small" type="success" v-if="routeredit" @click="showRoledia">用户组关联</el-button>
      <el-button size="small" type="success" v-else @click="showDia">添加用户组</el-button>
    </div>
    <div class="tabledata">
      <el-table :data="tableData" border style="width: 100%" height="550">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="userGroupName" label="用户组名称">
        </el-table-column>
         <el-table-column prop="businessUnit" label="品牌" v-if="routeredit">
        </el-table-column>
        <el-table-column prop="brandNameCN" label="品牌" v-else>
        </el-table-column>    
        <el-table-column prop="marketName" label="市场">
        </el-table-column>
        <el-table-column prop="remarks" label="备注">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <div v-if="routeredit">
              <el-button type="text" size="small" @click="unlinkGrounp(scope.row)">取消关联</el-button>
            </div>
            <div v-else>
              <el-button @click="routerpush(scope.row)" type="text" size="small">用户关联</el-button>
              <el-button @click="showDia(scope.row,true)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="delgroup(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10"
        @current-change="pagechange" layout="total, prev, pager, next" :total="totalout">
      </el-pagination>
    </div>
    <el-dialog title="用户组" :visible.sync="dialogVisible" :show-close="false" width="30%" :close-on-click-modal="false" :close-on-press-escape='false'>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20">
          <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <el-form-item label="用户组名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="品牌" prop="company">
              <el-select v-model="form.company" placeholder="请选择品牌" @change="getmarket">
                <el-option v-for="item in options" :key="item.value" :label="item.brandNameCn" :value="item.brandCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="市场" prop="market">
              <el-select v-model="form.market" multiple filterable reserve-keyword placeholder="请输入关键词">
                <el-option v-for="item in marketList" :key="item.value" :label="item.marketName"
                  :value="item.marketCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="hideDia">取 消</el-button>
        <el-button type="primary" v-if="isEdit">修 改</el-button>
        <el-button type="primary" v-else @click="insetGounp">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="用户组关联" :visible.sync="dialogVisiblerole" width="40%" :before-close="handleClose" :close-on-click-modal="false" :close-on-press-escape='false'>
      <div class="mainbox">
        <el-row>
          <el-col :span="6">
            <el-select v-model="dis.conpany" placeholder="请选择品牌">
              <el-option v-for="item in options" :key="item.value" :label="item.brandNameCn" :value="item.brandCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-input v-model="dis.name" placeholder="请输入名称"></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button size="small" type="primary" @click="getdiaList">查询</el-button>
          </el-col>
        </el-row>
        <div class="selebox">
          <el-table :data="diaData" style="width: 100%" max-height="200"  ref="checkTable"   @selection-change="tablechange"
            :row-key="getrowkeys">
             <!-- :reserve-selection="true" -->
            <el-table-column type="selection" width="80" >
            </el-table-column>
            <el-table-column prop="userGroupName" label="用户组名称">
            </el-table-column>
            <el-table-column prop="businessUnit" label="品牌">
            </el-table-column>
            <el-table-column prop="marketName" label="市场">
            </el-table-column>
            <el-table-column prop="remarks" label="备注">
            </el-table-column>
          </el-table>
        </div>
        <div class="tablepage">
          <el-pagination background layout="prev, pager, next" :total="total"   :page-size="5"  :current-page="diacurrentPage"  @current-change="diapagechange">
          </el-pagination>
        </div>
        <el-row>
          <el-col> 已选择列表</el-col>
        </el-row>
        <div class="gettable">
          <el-table :data="copyData" style="width: 100%" max-height="200">
            <el-table-column prop="userGroupName" label="用户组名称">
            </el-table-column>
            <el-table-column prop="businessUnit" label="品牌">
            </el-table-column>
            <el-table-column prop="marketName" label="市场">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" circle @click="delrowIndex(scope.row.guid)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="savelinkUserGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    sys,
    seletinfo,
    GROUP
  } from '@/config/api.js'
  export default {
    data() {
      return {
        routeredit: false,
        currentPage: 1,
        diacurrentPage:1,
        isEdit: false,
        total: 1,
        guidId:'',
        totalout: 1,
        dialogVisible: false,
        dialogVisiblerole: false,
        dis: {
          conpany: '',
          name: ""
        },
        table: {
          name: "",
          company: "",
          market: ''
        },
        marketList: [],
        value: '',
        form: {
          name: "",
          company: "",
          market: "",
          remark: ""
        },
        options: [],
        tableData: [],
        copyData: [],
        diaData: [],
        LightData:[],
        hashIndex:{},
        rules: {
          name: [{
            required: true,
            message: '请输入用户组名称',
            trigger: 'blur'
          }, ],
          company: [{
            required: true,
            message: '请输入品牌',
            trigger: 'blur'
          }, ],
          market: [{
            required: true,
            message: '请输入市场',
            trigger: 'blur'
          }, ]

        }
      }
    },
    methods: {
      pagechange(e) {
        this.currentPage = e;
        this.init()
      },
      getBrand() {
        seletinfo.BrandInfo().then(res => {
          if (res.data.code == 200) {
            this.options = res.data.data;
          }
        })
      },
      getmarket() {
        this.form.market = []
        let par = {
          id: this.form.company
        }
        seletinfo.MarketInfo(par).then(res => {    
          this.marketList = res.data.data;
        })
      },
      tablechange(val) {      
       this.LightData=this.LightData.concat(val);   
       let hash = {}
       this.LightData = this.LightData.reduce((item, next) => {
          if (!hash[next.guid]) {
              hash[next.guid] = true
             item.push(next)
          }
          return item
        }, [])
        //给这货 弄成数组
         let arr=[]
          for(let i in hash){
           arr.push(i)
        }
        this.hashIndex=arr;
        this.copyData = this.LightData;
      
      },
      delrowIndex(e){
        let num=0;
        //寻找下标
        for(let i in this.hashIndex){
           if(this.hashIndex[i]==e){
             num=i;
           }   
         }
          this.copyData.splice(num,1);
          this.hashIndex.splice(num,1);       
      },
      //设置选中
   
       savelinkUserGroup(){
         let arr=[];
         this.copyData.forEach((item,index)=>{
           arr.push(item.guid)
         })
        let dat={
          userCode:this.guidId,
          userGroupIds:arr,
        }
        GROUP.linkUserGroup(dat).then(res=>{
         this.handleClose()
         this.init()
        })
      },
      getrowkeys(e) {
       
      },
      getdiaList(has) {
        this.diacurrentPage = has==true?this.diacurrentPage:1;
        let par = {
          guid:this.guidId,
          current:this.diacurrentPage,      
          businessUnit:this.dis.conpany,
          marketName:'',
          userGroupName:this.dis.name,
        }
        sys.getLinkUserGroup(par).then(res => {
          this.diaData = res.data.data.records;
          this.total = res.data.data.total;     
         let sameData = '';
          let sameArr = [];
          this.LightData.forEach((ab, cd) => {
            this.diaData.forEach((a, c) => {
              if (ab.guid == a.guid) {
                sameData = this.diaData[c] = this.LightData[cd]
                sameArr.push(sameData)
              }
            })
          })
          this.checkDom(sameArr)
        })
      },
       checkDom(sameArr) {
        if (sameArr.length >= 1) {
          this.$nextTick(() => {
            sameArr.forEach(row => {
              this.$refs.checkTable.toggleRowSelection(row);
            });
          })
        }
      },
      //模态框的分页
      diapagechange(e){
       this.diacurrentPage=e;
       this.getdiaList(true);
      },
      showRoledia() {
         this. getBrand();
         this.dialogVisiblerole = true
      },
      unlinkGrounp(e){
        console.log(e)
          this.$confirm('取消用户组关联, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 走接口
           let dat={
             guid:e.guid
            }
        GROUP.unLinkUserGroupWeb(dat).then(res=>{
          if(res.data.code==200){
                this.$message({
                type: 'success',
                message: '取消成功!'
              });
              this.init()
           }
         })
        })
      
      },
      //关闭
      handleClose() {
        //清空数据
        this.dis.name='';
        this.diacurrentPage=1;
        this.copyData=[];
        this.diaData=[];
        this.total=1;
        this.dis.conpany='';
        this.dialogVisiblerole = false;
        this.LightData=[];
        this.hashIndex={}
      },
      routerpush(e) {   
        this.$router.push({
          path: "/home/manageUser",
          query: {
            edit: 1,
            guid:e.id
          }
        })
      },
      showDia(e, type) {
         this.getmarket();
        if (type) {
          this.isEdit = true;
          this.form.name = e.userGroupName
          this.form.company = e.brandCode
          this.form.market = e.marketCode.split(",")
          this.form.remark = e.remarks
        }  
        this.dialogVisible = true
        console.log(e.marketCode,this.form.market)
      },
      hideDia() {
        this.isEdit = false;
        this.form.name = ''
        this.form.company = ''
        this.form.market = ''
        this.form.remark = ''
        this.dialogVisible = false;
      },
      delgroup(e) {
        this.$confirm('删除该用户组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 走接口
          GROUP.deleteUserGroupInfo({
            id: e.id
          }).then(res => {
            if (res.data.code == 200) {
              this.init()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        })
      },
      init() {    
       
        let par={}
        if(this.routeredit){
            par = {        
             guid:this.guidId, 
             businessUnit:this.table.company,       
             userGroupName: this.table.name,
             current: this.currentPage,
             marketName:this.table.market
         } 
        }else{
            par = {         
           current: this.currentPage,
           userGroupName: this.table.name,
           brandCode: this.table.company,
           marketName: this.table.market,
        } 
        }
        if(this.routeredit){
          GROUP.getLinkUserGroupWeb(par).then(res => {
          this.totalout = res.data.data.total;
          this.tableData = res.data.data.records;
        })
        }else{      
        GROUP.UserGroupInfo(par).then(res => {
          this.totalout = res.data.data.total;
          this.tableData = res.data.data.records;
        })
        }
       
      },
      reset() {
        this.currentPage = 1;
        this.table.name = '';
        this.table.company = '';
        this.table.market = '';
        this.init()
      },
      search() {
        this.init()
      },
      insetGounp() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let data = {
              userGroupName: this.form.name,
              remarks: this.form.remark,
              brandCode: this.form.company,
              marketCode: this.form.market,
            }
            GROUP.insertUserGroupInfo(data).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.$refs['form'].resetFields();
                this.form.remark = '';
                this.init();
                this.dialogVisible = false
              }
            })
          }
        });
      }
    },
    watch: {
      '$route.query.edit': function (e) {
        this.routeredit = this.$route.query.edit == '1' ? true : false;
          this.init();
      }
    },
    mounted() {  
      this.guidId= this.$route.query.guid; 
      this.routeredit = this.$route.query.edit == '1' ? true : false;
      this.init();
      this.getBrand();
    }
  }

</script>
<style type="less" scoped>
  .usernamage{text-align: left;text-indent:5px;width: 98%;height: auto;margin: 0 auto;overflow: hidden;font-size: 15px; }
.search{width:100%;height: 50px;line-height: 50px;background:rgba(242, 242, 242, 1);margin-top: 5px; }
 .btns{ width:100%;margin:10px 0;;line-height: 40px; height: 40px;background:#ddd}
 .page {text-align: right;margin-top: 8px}
 
 .mainbox{width: 100%;margin: 0 auto; height: 550px;}
  .usernamage /deep/ .el-dialog__body {padding: 0 20px;}
  .selebox{ width: 100%;height: 200px;margin-top: 8px;}
  .tablepage{text-align: right; height: 45px;margin: 10px 0 10px 0;width: auto;overflow: hidden;;}
  .gettable{  width: 100%;height: 200px;margin-top: 8px;}
</style>
