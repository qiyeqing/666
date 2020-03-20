<template>
  <div class="usernamage">
     <div class="search">
         <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <el-col :span="8" style=""> 参数名称 :</el-col>
                    <el-col :span="16"><el-input v-model="table.name" clearable>
                    </el-input></el-col>
                 </el-row>
            </el-col>
            <el-col :span="13">
               &nbsp;
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
      prop="key"
      label="参数名称"
     >
    </el-table-column>
   <el-table-column
      prop="value"
      label="参数键值"
     >
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
      layout="total,  prev, pager, next"
       @current-change="pagechange"
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
   <el-col :span="6">参数名称：</el-col>
   <el-col :span="16" style="text-indent:25px">{{row.key}}</el-col>
   </el-row>
    <el-row style="line-height:45px">
  <el-col :span="6">参数键值：</el-col>
  <el-col :span="14"><el-input v-model="row.value" clearable>
                    </el-input></el-col>
</el-row>   
   </ul>
  <span slot="footer" class="dialog-footer">
    <el-button  @click="centerDialogVisible = false">取消</el-button>
      <el-button type="primary"  @click="savekey">确认</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import {sys} from '@/config/api.js'
export default {
   data () {
        return{   
            centerDialogVisible:false,
            total:1,
            currentPage:1,
            row:{
             key:'',
             value:"",
             id:""
            },
            table:{
                name:""
            },
            tableData: []    
         }
   },
   methods:{
       handleClick(e){
           this.row.key=e.key;
           this.row.value=e.value;
           this.row.id=e.id;
           this.centerDialogVisible=true;
       },
       init(){
         let par={
           current:this.currentPage,
           key:this.table.name
         }
         sys.parmas(par).then(res=>{
            this.tableData=res.data.data.records;
             this.total=res.data.data.total;
         })
       },
       search(){
         this.currentPage=1
         this.init();
       },
       reset(){
          this.currentPage=1;
          this.table.name='';
          this.init();
       },
       pagechange(e){
           this.currentPage=e;
           this.init();
       },
       savekey(){
         let dat={
           id:this.row.id,
           value:this.row.value
         }
         sys.editparmas(dat).then(res=>{     
              if(res.data.data==1){
               this.$message({
              message: '修改成功',
              type: 'success'
            });
               this.init();
               this.centerDialogVisible=false;
          }else{
              this.$message({
              message:'修改失败',
              type: 'error'
            });
         }
         })
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
 .btns{ width:100%;margin:10px 0;;line-height: 40px; height: 40px;background:#ddd}
 .page {text-align: right;margin-top: 8px}
  .tabledata{margin:15px 0}
  .dialog ul li{ height: 35px;line-height: 35px;margin-bottom: 8px;}
</style>