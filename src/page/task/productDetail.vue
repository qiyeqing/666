<template>
  <div class="usernamage">
     <div class="search">
         <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <el-col :span="6" style=""> 产品编码 :</el-col>
                    <el-col :span="16">
                        <el-input v-model="table.code"></el-input></el-col>
                 </el-row>
            </el-col>
          
              <el-col :span="6">
                <el-row>
                    <el-col :span="6" style=""> 产品名称 :</el-col>
                    <el-col :span="16">
                        <el-input v-model="table.name"></el-input></el-col>
                 </el-row>
            </el-col>
       
         
            <el-col :span="6" :offset="6">
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
     center
     max-height="550" 
    style="width: 100%">
    <el-table-column
       type="index"
       label="序号"
       width="100"
      >
    </el-table-column>
    <el-table-column
      prop="productCode"
      label="产品编码"
     >
    </el-table-column>
    <el-table-column
      prop="productName"
      label="产品名称"
     >
    </el-table-column>
    <el-table-column
      prop="templetName"
      label="产品配方"
     >
    </el-table-column>
    <el-table-column
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
import {task} from '@/config/api.js'
export default {
   data () {
        return{   
           brandCode:'3',
           storeCode:'',
           versions:'',
            total:1,
            currentPage:1,
            table:{
                name:"",
                code:'',
            },   
            tableData: []    
    }
   },
   methods:{
     init(){
       let par={
          brandCode:this.brandCode,
          storeCode:this.storeCode,
          versions:this.versions,
          current:this.currentPage,
          productName:this.table.name,
          productCode:this.table.code,
        }    
       task.selectRecipeStoreProduct(par).then(res=>{
            this.tableData=res.data.data.records;
            this.total=res.data.data.total;
       })
      },    
       reset(){
          this.currentPage=1
          this.table.name='';
          this.table.code='';
          this.init();
       },
       search(){
             this.currentPage=1
             this.init()
       },
       pagechange(e){
         this.currentPage=e;
         this.init()
     },
   },
   mounted () {
         this.storeCode=this.$route.query.storeCode;
         this.versions=this.$route.query.versions;
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