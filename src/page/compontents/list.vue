<template>
  <div class="usernamage">
     <div class="search">
         <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <el-col :span="8" style=""> 发布状态 :</el-col>
                    <el-col :span="16"> <el-select v-model="table.type" clearable >
                        <el-option
                        v-for="item in typelist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select></el-col>
                 </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="8">状态 :</el-col>
                    <el-col :span="16"> <el-select v-model="table.type" clearable >
                        <el-option
                        v-for="item in type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select></el-col>
                 </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="8">配方名称 :</el-col>
                    <el-col :span="16">
                         <el-input v-model="table.name" clearable>
                    </el-input>
                    </el-col>
                 </el-row>
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
     <div class="box">
       <el-row style="text-indent:10px;line-height:50px">
        <el-col :span="4">产品编码 : 200020</el-col>
        <el-col :span="4">产品名称 : 香辣鸡腿堡</el-col>
        <el-col :span="4">上市日: 2020-03-02</el-col>
        <el-col :span="4">下市日: 2020-03-02</el-col>
        <el-col :span="4">是否预包装: 否</el-col>
        <el-col :span="4">产品类型: 小食,小食,鸡</el-col>
      </el-row>
      <el-row style="text-indent:10px;line-height:50px">
        <el-col :span="4">用餐时段: 早餐,中餐,午餐,晚餐</el-col>
        <el-col :span="2">成本:</el-col>
        <el-col :span="4">备注: </el-col>
        <el-col :span="6">
          <el-row>
             <el-col :span="12">是否需要维护标准生产流程:</el-col>
             <el-col :span="12"> <el-radio v-model="header.radio" label="1">是</el-radio>
           <el-radio v-model="header.radio" label="2">否</el-radio></el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
           <el-row>
                <el-col :span="8"><span style="color:red">*</span>产品名称首字母 :</el-col>
                  <el-col :span="10"><el-input></el-input></el-col>
                    <el-col :span="3" :offset="1"><el-button type="success"  size="small">生成</el-button></el-col>
           </el-row>
    
        </el-col>
   
        <el-col :span="1"><el-button size="small" type="primary">保存</el-button></el-col>
      </el-row>
     </div>
      <div class="btns">
        <!-- @click="pushmain"  -->
           <el-button size="small" type="success"  @click="look()" >添加配方</el-button>        
            <el-button size="small" type="primary">关联产品</el-button>        
      </div>
      <div class="tabledata">
          <el-table
    :data="tableData"
     border
    style="width: 100%">
    <el-table-column
     label="序号" type="index" width="100"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="配方名称"
     >
    </el-table-column>
    <el-table-column
      prop="province"
      label="配置日期"
     >
      <template slot-scope="scope">
        {{scope.row.startDate.join('-')}}
      </template>
    </el-table-column>
    <el-table-column
      prop="city"
      label="是否默认配方"
      >
    </el-table-column>
    <el-table-column
      prop="zip"
      label="配方生效日期"
     >
    </el-table-column>
    <el-table-column
      prop="zip"
      label="状态"
     >
    </el-table-column>
        <el-table-column
      prop="zip"
      label="发布状态"
     >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="350px"
     >
      <template slot-scope="scope">
        <el-button  @click="look(scope.row)"  type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
         <el-button type="text" size="small" @click="delthisrerord(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="copythisrecord(scope.row)" >复制</el-button>
           <el-button type="text" size="small"  @click="handleClick(scope.row)">历史配方</el-button>
        <span v-if="scope.row.status==1"><el-button type="text" size="small">恢复废弃</el-button></span>
        <span v-else><el-button type="text" size="small"  @click="removethisrecord(scope.row)" >废弃</el-button>
        <el-button type="text" size="small" @click="sendthisrecord(scope.row)">发布</el-button></span>
      </template>
    </el-table-column>
  </el-table>
      </div>
       <div class="page">
          <el-pagination
      :current-page="currentPage"
   
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
      </div>

  </div>
</template>
<script>
import {produce} from '@/config/api.js'
export default {
   data () {
        return{   
          productId:'',
          currentPage:1,
          total:1,

          header:{
            radio:''
          },
            table:{
                name:"",
                nickname:""
            },
            typelist:[
              {
              value: '1',
              label: '已发布'
                } ,
                {
              value: '0',
              label: '未发布'
                }
            ],
            type:[
              {
              value: '1',
              label: '正常'
                } ,
                {
              value: '0',
              label: '废弃'
                }
            ],
             options: [{
              value: '选项1',
              label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }],
            tableData: []    
    }
   },
   mounted(){
     this.productId=this.$route.query.id;
     this.init()
   },
   methods:{
     init(){
        produce.getMenuProductWeb('310099').then(res=>{
          console.log(res)
        this.tableData=res.data.data;
        this.total=res.data.total
        })
     },
       handleClick(e){
           this.$router.push('/home/productHistory')
       },
       pushmain(){
            this.$router.push('/home/productMain')
       },
       delthisrerord(e){
           this.$alert('确认删除此配方', '编辑', {
           confirmButtonText: '确定',
           callback: action => {
             this.$message({
               type: 'info',
               message: `action: ${ action }`
            });
          }
        }); 
       },
       look(){
             this.$router.push({path:'/home/productDetail',query:{id:this.productId}})
       },
       copythisrecord(e){
         this.$prompt('', '请输入配方名称ID', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
       },
       removethisrecord(e){
        this.$alert('确认废弃此配方', '编辑', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                    });
                }
                });
       },
       sendthisrecord(e){
             this.$message({
          message: '发布成功',
          type: 'success'
        });
       }
   }
}
</script>
<style  type="less"  scoped>
.usernamage{text-align: left;text-indent:5px;width: 98%;height: auto;margin: 0 auto;overflow: hidden;font-size: 15px; }
.search{width:100%;height: 50px;line-height: 50px;background:rgba(242, 242, 242, 1);margin-top: 5px; }
 .btns{ width:100%;margin:10px 0;;line-height: 40px; height: 40px;background:#ddd}
 .page {text-align: right;margin-top: 8px}
 .box{ width: 99.5%;height: 100px;border: 1px solid #ccc; margin: 8px 0;}
</style>