<template>
  <div class="usernamage">
     <div class="search">
         <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <el-col :span="8" style=""> 产品编码 :</el-col>
                    <el-col :span="16"><el-input v-model="table.name" clearable>
                    </el-input></el-col>
                 </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="8"> 产品名称 :</el-col>
                    <el-col :span="16"><el-input v-model="table.nickname" clearable>
                    </el-input></el-col>
                 </el-row>
            </el-col>
            <el-col :span="6">           
               &nbsp;
            </el-col>
            <el-col :span="6">
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="8">
                        <el-button size="small" type="primary">查询</el-button>
                    </el-col>
                    <el-col :span="8">
                       <el-button  size="small">重置</el-button>
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
      prop="date"
      label="序号"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="产品编码"
     >
    </el-table-column>
    <el-table-column
      prop="province"
      label="产品名称"
     >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="250px"
      
     >
      <template slot-scope="scope">
        <div v-if="lookhasclick"><el-button  @click="handleClick(scope.row)" type="text" size="small">配方关联</el-button></div>
         <div v-else>
            <el-button  type="text" size="small">操作1</el-button>
        <el-button  type="text" size="small">操作2</el-button>
        <el-button  type="text" size="small">操作3</el-button>
        <el-button  type="text" size="small">操作4</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
      </div>
      <div class="page">
          <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next"
      :total="40">
    </el-pagination>
      </div>
  </div>
</template>
<script>
export default {
   data () {
        return{   
            lookhasclick:true,
            currentPage:1,
            table:{
                name:"",
                nickname:""
            },
             options: [{
              value: '选项1',
              label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }],
            tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]    
    }
   },
   methods:{
       handleClick(e){
          this.lookhasclick=false;
       }
   }
}
</script>
<style  type="less"  scoped>
.usernamage{text-align: left;text-indent:5px;width: 98%;height: auto;margin: 0 auto;overflow: hidden;font-size: 15px; }
.search{width:100%;height: 50px;line-height: 50px;background:rgba(242, 242, 242, 1);margin-top: 5px; }
 .page {text-align: right;margin-top: 8px}
 .tabledata{margin:15px 0}
</style>