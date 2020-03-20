<template>
  <div class="usernamage">
     <div class="search">
         <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <el-col :span="7" style=""> 报警级别 :</el-col>
                    <el-col :span="16">
                         <el-select v-model="table.level" clearable >
                        <el-option
                        v-for="item in leves"
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
                    <el-col :span="7">报警途径 :</el-col>
                    <el-col :span="16">
                        
                        <el-select v-model="table.way" clearable >
                        <el-option
                        v-for="item in ways"
                        :key="item.value"
                        :label="item.name"
                        :value="item.itemCode">
                        </el-option>
                    </el-select></el-col>
                 </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="7">报警目标 :</el-col>
                    <el-col :span="16">
                       <el-select v-model="table.target" clearable >
                        <el-option
                        v-for="item in person"
                        :key="item.itemCode"
                        :label="item.name"
                        :value="item.itemCode">
                        </el-option>
                    </el-select>
                  
                    </el-col>
                 </el-row>
            </el-col>
            <el-col :span="6">
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
      prop="alertName"
      label="报警名称"
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
      prop="alertChannelName"
      label="报警途径"
      >
    </el-table-column>
     <el-table-column
      label="报警内容"
      >
           <template slot-scope="scope">
          
        <div  v-if="(scope.row.alertMessageTemplate).length>=38"><el-tooltip :content="scope.row.alertMessageTemplate" placement="bottom" popper-class="topid" effect="light">
           <span>{{scope.row.alertMessageTemplate.substring(0,32)}}...</span>     
        </el-tooltip></div>
        <div v-else> 
             <span>{{scope.row.alertMessageTemplate}}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
     >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
      </div>
      <div class="page">
     <el-pagination
      :current-page="currentPage"
      :page-size="5"
       @current-change="pagechange"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
      </div>
     <el-dialog
      title="编辑"
     :visible.sync="centerDialogVisible"
     :show-close="false"
     class="dialog"
     width="35%"
  center>
   <ul style="padding-left:30px">
      <el-row style="margin-bottom:15px">
   <el-col :span="8">报警名称：</el-col>
   <el-col :span="16">{{row.name}}</el-col>
   </el-row>
    <el-row style="line-height:45px;margin-bottom:10px">
  <el-col :span="8">报警级别：</el-col>
  <el-col :span="14">
      <el-select v-model="row.level" clearable >
         <el-option v-for="item in leves" :key="item.value" :label="item.name"
      :value="item.itemCode"> </el-option> </el-select></el-col>
</el-row> 
  <el-row style="line-height:45px;margin-bottom:10px">
  <el-col :span="8">报警目标：</el-col>
  <el-col :span="14">
       <el-select v-model="row.target"    clearable >
         <el-option v-for="item in person" :key="item.value" :label="item.name"
      :value="item.itemCode"> </el-option> </el-select></el-col>
</el-row>  
<el-row style="line-height:45px;margin-bottom:15px">
  <el-col :span="8">报警途径：</el-col>
  <el-col :span="14">
       <el-select v-model="row.way" clearable >
         <el-option v-for="item in ways" :key="item.value" :label="item.name"
          :value="item.itemCode"> </el-option> </el-select></el-col>
</el-row>  
<el-row style="line-height:45px;">
  <el-col :span="8">报警内容：</el-col>
  <el-col :span="14">
      <el-input
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  placeholder="请输入内容"
  v-model="row.content">
</el-input></el-col>
</el-row> 
   </ul>
  <span slot="footer" class="dialog-footer">
    <el-button  @click="centerDialogVisible = false">取消</el-button>
      <el-button type="primary"  @click="savewarn">确认</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import {sys,seletinfo} from '@/config/api.js'
export default {
   data () {
        return{   
            currentPage:1,
            total:1,
            centerDialogVisible:false,
            table:{
                 way:"",
                 target:'',
                 level:""
            },
            row:{
                 id:"",
                 way:"",
                 target:'',
                 level:"",
                 content:"",
                 name:"",
            },
             leves:[],
             ways:[],
         
             person:[],
             tableData: []    
    }
   },
   methods:{
     search(){
          this.currentPage=1
       this.getdata();
     },
       pagechange(e){
           this.currentPage=e;
           this.getdata();
       },
      savewarn(){
        let dat={
          id:this.row.id,
          alertLevel:this.row.level,
          alertTarget:this.row.target,
           alertChannel:this.row.way,
         alertMessageTemplate:this.row.content
       }
       console.log(dat)
       sys.warningeit(dat).then(res=>{
      if(res.data.data==1){
         this.$message({
              message: '修改成功',
              type: 'success'
            });
               this.getdata();
               this.centerDialogVisible=false;
      }
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
     getdata(){
       let data={
         current:this.currentPage,
         level:this.table.level,
         target:this.table.target,
         way:this.table.way,
       }
       sys.errerwarning(data).then(res=>{
         this.tableData=res.data.data.records;
          this.total=res.data.data.total;
       })
     },
     init(){
       this.getTarget();
       this.getLeve();
       this.getWay();
       this.getdata()
     },
     reset(){
       this.table.way='';
       this.table.level='';
       this.table.target='';
       this.currentPage=1;
        this.getdata()
     },
       handleClick(e){
          this.row.name=e.alertName;
          this.row.way=e.alertChannel;
          this.row.target=e.alertTarget;
          this.row.level=e.alertLevel;
          this.row.content=e.remarks;  
          this.row.id=e.id;
          this.row.content=e.alertMessageTemplate;
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
.search{width:100%;height: 50px;line-height: 50px;background:rgba(242, 242, 242, 1);margin-top: 5px; }
 .tabledata{margin:15px 0}
  .page {text-align: right;margin-top: 8px}
</style>
