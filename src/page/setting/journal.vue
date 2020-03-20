<template>
  <div class="usernamage">
     <div class="search">
         <el-row :gutter="20">
            <el-col :span="9">
                <el-row>
                    <el-col :span="5" style=""> 操作时间 :</el-col>
                    <el-col :span="8">
                        <el-date-picker  
                             type="datetime"
                        placeholder="选择日期" v-model="table.timefrom" style="width: 100%;"  value-format="yyyy-MM-dd-HH-mm-ss"></el-date-picker>
                    </el-col>
                    <el-col :span="2" style="text-align:center">&nbsp;-- </el-col>
                    <el-col :span="8">
                         <el-date-picker
                          style="width:100%"
                            v-model="table.timeto" 
                             type="datetime"
                          placeholder="选择日期"
                           value-format="yyyy-MM-dd-HH-mm-ss"
                          >
                        </el-date-picker>
                                      
                    </el-col>
                 </el-row>
            </el-col>
            <el-col :span="5">
                <el-row>
                    <el-col :span="8">用户名称 :</el-col>
                    <el-col :span="16"><el-input v-model="table.nickname" clearable>
                    </el-input></el-col>
                 </el-row>
            </el-col>
            <el-col :span="5">
                <el-row>
                    <el-col :span="8">模块名 :</el-col>
                    <el-col :span="16">
                      <el-input v-model="table.modelname" clearable>
                    </el-input>
                    </el-col>
                 </el-row>
            </el-col>
            <el-col :span="5">
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="8">
                        <el-button size="small" type="primary" @click="search">查询</el-button>
                    </el-col>
                    <el-col :span="8">
                       <el-button  size="small" @click="reset">重置</el-button>
                    </el-col>
                 </el-row>
            </el-col>
        </el-row>
     </div>
  
      <div class="tabledata">
          <el-table
    :data="tableData"
     border
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
       width="100"
      >
    </el-table-column>
    <el-table-column
      prop="userCode"
      label="用户编码"
     >
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户名称"
     >
    </el-table-column>
    <el-table-column
      prop="ipAddress"
      label="IP地址"
      >
    </el-table-column>
  <el-table-column
      prop="moduleName"
      label="模块名称"
      >
    </el-table-column>
    <el-table-column
      prop="opName"
      label="操作名称"
      >
    </el-table-column>
    <el-table-column
      prop="requestTime"
      label="操作时间"
      >
    </el-table-column>
    <el-table-column
      prop="resultMsg"
      label="操作结果"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
     >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
      </div>
      <div class="page">
        <el-pagination
        :page-size="5"
        :current-page="currentPage"
        @current-change="pagechange"
        layout="total, prev, pager, next"
       :total="total">
    </el-pagination>
      </div>
      <el-dialog
      title="查看"
    :visible.sync="centerDialogVisible"
    :show-close="false"
    class="dialog"
    width="40%"
  center>
   <ul style="padding-left:30px">
       <li>用户编码：   {{row.userCode}}</li>
       <li>用户名称：   {{row.userName}}</li>
       <li>IP地址：     {{row.ipAddress}}</li>
       <li>请求URL：    {{row.requestUri}}</li>
       <li>模块名称：   {{row.moduleName}}</li>
       <li>操作名称：   {{row.opName}}</li>
       <li>类名称：     {{row.className}}</li>
       <li>方法名称：   {{row.methodName}}</li>
       <li>结果编码：   {{row.resultCode}}</li>
       <li>操作结果：   {{row.resultMsg}}</li>
       <li>操作时间：   {{row.requestTime}}</li>
       <li>处理时间：   {{row.execTime}}</li>
       <li>请求参数：    {{row.requestBody}}</li>
       <li>请求头部:      {{row.requestHeaders}}</li>
       <li>异常信息:   {{row.exceptionStacktrace}}</li>
       <li>备注:   {{row.remarks}} </li>

   </ul>
  <span slot="footer" class="dialog-footer">
    <el-button  @click="centerDialogVisible = false">关闭</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import {sys} from '@/config/api.js'
export default {
  components:{sys},
   data () {
        return{   
            total:1,
            centerDialogVisible:false,
            currentPage:1,
            table:{
                modelname:"",
                timefrom:'',
                timeto:'',
                nickname:""
            },
            tableData: [] ,
            row:{
              userCode:"",
              userName:'',
              ipAddress:"",
              requestUri:"",
              moduleName:"",
              opName:"",
              className:"",
              methodName:"",
              resultCode:'',
              resultMsg:"",
              execTime:'',
              requestTime:"",
              requestBody:'',
              requestHeaders:'',
              exceptionStacktrace:'',
              remarks:''
            }   
    }
   },
   mounted () {
     this.init()
   },
   methods:{
     pagechange(e){
       this.currentPage=e;
       let date={
           execTimeFrom:this.table.timefrom,
           execTimeTo:this.table.timeto,
           userName:this.table.nickname,
           moduleName:this.table.modelname,
           current:this.currentPage,
        }

       this.main(date)
     },
       handleClick(e){     
           this.centerDialogVisible=true;
           this.row.userCode=e.userCode;
           this.row.userName=e.userName;
           this.row.ipAddress=e.ipAddress;
           this.row.requestUri=e.requestUri;
           this.row.moduleName=e.moduleName;
           this.row.opName=e.opName;
           this.row.className=e.className;
           this.row.methodName=e.methodName;
            this.row.resultCode=e.resultCode;
            this.row.resultMsg=e.resultMsg;
          this.row.execTime=e.execTime;
          this.row.requestTime=e.requestTime;
             this.row.requestBody=e.requestBody;
            this.row.requestHeaders=e.requestHeaders;
           this.row.exceptionStacktrace=e.exceptionStacktrace;
              this.row.remarks=e.remarks;
         
       },
       search(){
         this.currentPage=1;
        let date={
           execTimeFrom:this.table.timefrom,
           execTimeTo:this.table.timeto,
           userName:this.table.nickname,
           moduleName:this.table.modelname,
           current:this.currentPage,
        }
       this.main(date);
       },
        main(date){
             sys.record(date).then(res=>{
            this.total=res.data.data.total;
           this.tableData=res.data.data.records;
  
         })
        },
       init(){
         let par={
           execTimeFrom:this.table.timefrom,
           execTimeTo:this.table.timeto,
           userName:'',
           moduleName:'',
           current:this.currentPage,
         }
         console.log(par)
       this.main(par);
       },
       reset(){
         this.currentPage=1;
         this.table.modelname='';
         this.table.timefrom='';
         this.table.timeto='';
         this.table.nickname='';  
         this.init();
       }
   }
}
</script>
<style  type="less"  scoped>
.usernamage{text-align: left;text-indent:5px;width: 98%;height: auto;margin: 0 auto;overflow: hidden;font-size: 15px; }
.search{width:100%;height: 50px;line-height: 50px;background:rgba(242, 242, 242, 1);margin-top: 5px; }
 .tabledata{margin:15px 0}

  .page {text-align: right;margin-top: 8px}
</style>
