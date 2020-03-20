<template>
  <div class="usernamage">
     <div class="search">
         <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <el-col :span="6" style=""> 通知名称 :</el-col>
                    <el-col :span="16">
                        <el-input v-model="table.name"></el-input></el-col>
                 </el-row>
            </el-col>
            <el-col :span="12">
               &nbsp;
            </el-col>
         
            <el-col :span="6">
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="8">
                        <el-button size="small" type="primary"  @click="search" >查询</el-button>
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
      prop="name"
      label="通知名称"
     >
    </el-table-column>
    <el-table-column
      prop="url"
      label="URL"
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
      
       @current-change="pagechange"
      :page-size="5"
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
   <el-col :span="8">通知名称 :</el-col>
   <el-col :span="16">{{row.name}}</el-col>
   </el-row>
    <el-row style="line-height:45px">
  <el-col :span="8">URL :</el-col>
  <el-col :span="14"><el-input v-model="row.url" clearable>
                    </el-input></el-col>
</el-row>   
   </ul>
  <span slot="footer" class="dialog-footer">
    <el-button  @click="centerDialogVisible = false">取消</el-button>
      <el-button type="primary"  @click="saveUrl">确认</el-button>
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
            row:{
              id:'',
              url:"",
              name:""
            },
            currentPage:1,
            table:{
                name:"",
            },   
            tableData: []    
    }
   },
   methods:{
     init(){
       let par={
          current:this.currentPage,
          name:this.table.name
        }
         sys.stream(par).then(res=>{
            this.total=res.data.data.total;
            this.tableData=res.data.data.records
       })
      },
       handleClick(e){                 
            this.row.url=e.url;
            this.row.id=e.id;
            this.row.name=e.name;
            this.centerDialogVisible=true; 
       },
       reset(){
          this.currentPage=1
          this.table.name='';
          this.init();
       },
       search(){
            this.currentPage=1
          this.init()
       },
       pagechange(e){
        this.init()
     },
     saveUrl(){
       let par={
         id:this.row.id,
         url:this.row.url
       }
       sys.editurl(par).then(res=>{      
          if(res.data.data==1){
            this.$message({
              message: '修改成功',
              type: 'success'
             });
              this.init();
              this.centerDialogVisible=false;
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
</style>