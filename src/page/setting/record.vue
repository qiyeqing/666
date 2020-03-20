<template>
  <div class="usernamage">
     <div class="search">
         <el-row :gutter="20">
            <el-col :span="8">
                <el-row>
                    <el-col :span="5" style=""> 报警时间 :</el-col>
                    <el-col :span="8">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="table.timestart"
                                        value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col :span="2" style="text-align:center">&nbsp;-- </el-col>
                    <el-col :span="8">
                        <el-date-picker type="datetime" placeholder="选择日期"   value-format="yyyy-MM-dd HH:mm:ss"  v-model="table.timeend" style="width: 100%;"></el-date-picker>
                    </el-col>
                 </el-row>
            </el-col>
            <el-col :span="5">
                <el-row>
                    <el-col :span="8">报警级别 :</el-col>
                    <el-col :span="16"> <el-select v-model="table.level" clearable >
                        <el-option
                        v-for="item in leves"
                        :key="item.value"
                        :label="item.name"
                        :value="item.itemCode">
                        </el-option>
                    </el-select></el-col>
                 </el-row>
            </el-col>
            <el-col :span="5">
                <el-row>
                    <el-col :span="8">报警途径 :</el-col>
                    <el-col :span="16">
                        <el-select v-model="table.way" clearable >
                        <el-option
                        v-for="item in ways"
                        :key="item.value"
                        :label="item.name"
                        :value="item.itemCode">
                        </el-option>
                    </el-select>
                    </el-col>
                 </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="8">报警目标： :</el-col>
                    <el-col :span="14">
                        <el-select v-model="table.target" clearable >
                        <el-option
                        v-for="item in person"
                        :key="item.value"
                        :label="item.name"
                        :value="item.itemCode">
                        </el-option>
                    </el-select>
                    </el-col>
                 </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="6">警报内容 :</el-col>
                    <el-col :span="14">
                       <el-input
                    placeholder="请输入内容"
                    v-model="table.content"
                    clearable>
                    </el-input>
                        
                    </el-col>
                 </el-row>
            </el-col>
            <el-col :span="5" :offset="13">
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
      prop="alertTime"
      label="报警时间"
     >
    </el-table-column>
    <el-table-column
      prop="alertLevelName"
      label="报警级别"
      >
    </el-table-column>
  <el-table-column
      prop="alertTargetName"
      label="报警目标"
      >
    </el-table-column>
    <el-table-column
      prop="alertRecipient"
      label="报警接收者"
      >
    </el-table-column>
    <el-table-column
      prop="alertChannelName"
      label="报警途径"
      >
    </el-table-column>
   
    <el-table-column
      label="报警内容"
      >
      <template slot-scope="scope">
          
        <div  v-if="(scope.row.alertMessage).length>=38"><el-tooltip :content="scope.row.alertMessage" placement="bottom" popper-class="topid" effect="light">
           <span>{{scope.row.alertMessage.substring(0,32)}}...</span>     
        </el-tooltip></div>
        <div v-else> 
             <span>{{scope.row.alertMessage}}</span>
          </div>
      </template>
    </el-table-column>
      <el-table-column
      prop="alertResultMessage"
      label="通知结果"
      >
    </el-table-column>

  </el-table>
      </div>
      <div class="page">
        <el-pagination
      :current-page="currentPage"
         @current-change="pagechange"
      :page-size="5"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
      </div>
    
  </div>
</template>
<script>
import {sys,seletinfo} from '@/config/api.js'
export default {
   data () {
        return{   
            total:1,
            currentPage:1,
            table:{
                timestart:"",
                timeend:'',
                content:'',
                level:"",
                target:'',
                way:"",
            },
            tableData: [],
             leves:[],
             ways:[],
             person:[], 
    }
   },
   methods:{
      search(){
         this.currentPage=1;
         this.getdata();
      },
       pagechange(e){
           this.currentPage=e;
           this.getdata();
       },
      reset(){
        this.currentPage=1;
        this.table.level='';
        this.table.target='';
        this.table.way='';
        this.table.content='';
        this.table.timestart='';
        this.table.timeend=''
        this.getdata();
      },
      getdata(){
        let da={
          current:this.currentPage,
          level:this.table.level,
          target:this.table.target,
          way:this.table.way,
          content:this.table.content,
          startTime:this.table.timestart,
          endTime:this.table.timeend,
        }
        sys.errerwarninghistory(da).then(res=>{
           this.total=res.data.data.total;
            this.tableData=res.data.data.records
        })
      },
      getTarget(){
      seletinfo.warperson().then(res=>{
        this.person=res.data.data;
      })
     },
     getLeve(){
        seletinfo.warlevel().then(res=>{
        this.leves=res.data.data;
      })
     },
    getWay(){
        seletinfo.warway().then(res=>{
        this.ways=res.data.data;
      })
     },
     init(){
        this.getTarget();
        this.getLeve();
        this.getWay();
        this.getdata();
     },
       handleClick(e){
           this.centerDialogVisible=true
       }
   },
   mounted () {
     this.init()
   }
}
</script>
<style  type="less"  scoped>

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
</style>
