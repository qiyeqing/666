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
                 <el-row>
                    <el-col :span="8"> 虚拟/真实 :</el-col>
                    <el-col :span="16">  <el-select v-model="table.type" clearable placeholder="请选择">
                  <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select></el-col>
                 </el-row>
            </el-col>
            <el-col :span="6">
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="8">
                        <el-button size="small" type="primary">查询</el-button>
                    </el-col>
                    <el-col :span="8">
                       <el-button  size="small" @click="reset">重置</el-button>
                    </el-col>
                 </el-row>
            </el-col>
        </el-row>
     </div>
      <div class="btns">
         <el-button size="small" type="success" @click="open()"> 添加虚拟产品</el-button> 
           <el-button size="small" type="primary" @click="tranfs">配方紧急下发</el-button> 
           <el-button size="small" type="primary">导出excel</el-button> 
           <el-button size="small" type="primary" @click="pushspbom()">SPBOM配方预览</el-button> 
      </div>
      <div class="tabledata">
         <el-table
     :data="tableData"
     border
    style="width: 100%">
    <el-table-column
     label="序号" type="index" width="100">
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
      prop="createTime"
      label="MC同步时间"
     >
    </el-table-column>
     <el-table-column
      prop="isVirtualProductFlag"
      label="虚拟/真实"
     >
    </el-table-column>
     <el-table-column
      prop="recipeCount"
      label="配方总数"
     >
    </el-table-column>
      <el-table-column
      prop="recipePublishedCount"
      label="已发布"
     >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="250px"  
     >
      <template slot-scope="scope">
        <div ><el-button  @click="handleClick(scope.row)" type="text" size="small">查看</el-button></div>
        
      </template>
    </el-table-column>
  </el-table>
      </div>
      <div class="page">
          <el-pagination
      
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next"
         @current-change="pagechange"
      :total="total">
    </el-pagination>
      </div>
      <el-dialog title="配方紧急下发" :visible.sync="dialogVisible" :show-close="false" width="50%" class="transfer">
        <el-transfer
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入城市拼音"
          v-model="value"
          :titles="['待选择列表', '已选择列表']"
          :data="data">
        </el-transfer>
        
      </el-dialog>
  </div>
</template>
<script>
import {produce} from '@/config/api.js'
export default {
   data () {
       const generateData = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
        return{          
            currentPage:1,
            total:1,
            dialogVisible:false,
            brandCode:'',
             value: [],filterMethod(query, item) {
              return item.pinyin.indexOf(query) > -1;
            },
            data: generateData(),
            table:{
                name:"",
                nickname:"",
                type:''
            },
            types:[{value:'Y',label:'虚拟'},{value:'N',label:'实物'}],
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
        }]    
    }
   },
   methods:{
     tranfs(){
       this.dialogVisible=true;
     },
       handleClick(e){
         this.$router.push({path:'/home/productList',query:{id:e.productCode}})      
       },
       getlist(){
         let data={
           current:this.currentPage,
           productCode:'',
           productName:'',
           isVirtualProductFlag:this.table.type,
           brandCode:this.brandCode,
         }
         produce.selectMenuProductInfo(data).then(res=>{
            this.tableData=res.data.data.records;
            this.total=res.data.data.total;
         })
       },
       reset(){
         this.table.name='';
         this.table.nickname='';
         this.table.type='';
         this.currentPage=1;
          this.getlist()
       },
       pagechange(e){
           this.currentPage=e;
           this.getlist()
       },
        open() {
        this.$prompt('请输入虚拟产品名称',  {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
        produce.addVirtualProduct({ productName:value }).then(res=>{
          console.log(res)
          if(res.data.code==200){
            this.$message.success('添加成功！')
          }
        })
        })
      },
      pushspbom(){
        this.$router.push('/home/spbom')
      }
   },
   mounted(){
     this.getlist()
   }
}
</script>
<style  type="less"  scoped>
.usernamage{text-align: left;text-indent:5px;width: 98%;height: auto;margin: 0 auto;overflow: hidden;font-size: 15px; }
.search{width:100%;height: 50px;line-height: 50px;background:rgba(242, 242, 242, 1);margin-top: 5px; }
 .btns{ width:100%;margin:10px 0;;line-height: 40px; height: 40px;background:#ddd}
 .el-table .cell{text-align: center}
 .page {text-align: right;margin-top: 8px}
 .transfer /deep/ .el-transfer-panel{width: 39%;}
 .transfer /deep/ .el-dialog__body{padding: 0 20px;overflow: hidden;
    height: 323px;}
</style>