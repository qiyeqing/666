<template>
  <div class="usernamage">
     <div class="search">
         <el-row :gutter="20">
            <el-col :span="9">
                <el-row>
                    <el-col :span="5" style=""> 创建时间： :</el-col>
                    <el-col :span="10">
                        <el-date-picker type="date" placeholder="选择日期" v-model="table.time" style="width: 100%;"></el-date-picker>
                    </el-col>
                 
                 </el-row>
            </el-col>
            
            <el-col :span="5" :offset="10">
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
          ref="multipleTable"
    :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
     border
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="date"
      label="产品名称"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="创建时间"
     >
    </el-table-column>
    <el-table-column
      prop="province"
      label="配方名称"
     >
    </el-table-column>
    <el-table-column
      prop="city"
      label="版本"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
     >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
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
      
            currentPage:1,
            table:{
                name:"",
                time:new Date(),
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
          date: '2x',
          name: 'xxxx',
          province: 'xx',
          city: 'xxx',
          address: 'xxxx 1518 弄',
          zip: 'x'
        }, {
          date: '2xxxx',
          name: 'xxx',
          province: 'x',
          city: 'xx',
          address: 'xxxx 1517 弄',
          zip: 'x'
        }]    ,
         multipleSelection: []
    }
   },
   methods:{
       handleClick(e){
           console.log(e)
         this.$router.push('/home/productDetail')
       },
     handleSelectionChange(val) {
        this.multipleSelection = val;
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