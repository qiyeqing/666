<template>
 <div class="main">
    <div class="step">
        <ul>
            <li :class="{'bg':step==1,'bg1':step!=1}">1.基本信息</li>
            <li :class="{'bg':step==2,'bg1':step!=2}">2.物料信息</li>
            <li :class="{'bg':step==3,'bg1':step!=3}" >3.其他属性</li>
        </ul>
    </div>
    <div class="stepbox">
        <div class="box" v-if="step==1">
            <div class="stpebtn"><el-button type="primary" @click="goStepSecord">下一步</el-button></div>
            <ul>
                <li>
                    <el-row>
                <el-col :span="3">产品编码:</el-col>
                <el-col :span="12">200020</el-col>
                </el-row>
                </li>
                <li>
                 <el-row>
                <el-col :span="3">产品名称:</el-col>
                <el-col :span="12">香辣鸡腿堡</el-col>
                </el-row></li>
                <li>
                <el-row>
                <el-col :span="3">配方名称:</el-col>
                <el-col :span="12"><el-input v-model="box.main" placeholder="请输入内容"></el-input></el-col>
                </el-row>
                 </li>
                </ul>
        </div>
        <div class="box box2" v-if="step==2">
             <div class="stpebtn stpebtn2">
                 <el-button @click="goStepOne">上一步</el-button>
                 <el-button type="primary" @click="goStepThreed">下一步</el-button></div>
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
      label="原物料编码"
     >
    </el-table-column>
    <el-table-column
      prop="province"
      label="原物料名称"
     >
    </el-table-column>
     <el-table-column
      prop="province"
      label="交易类型（多选）"
      width="200px"
     >
    </el-table-column>
    <el-table-column
      prop="province"
      label="数量"
     >
    </el-table-column>
    <el-table-column
      prop="province"
      label="单位"
     >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
     >
      <template slot-scope="scope">
        <el-button @click="editSecord(scope.row)" type="text" size="small">编辑</el-button>
        <el-button  @click="del(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
   </el-table>
        </div>
        <div class="box box2 box3" v-if="step==3" >
           <div class="stpebtn stpebtn3">
                 <el-button @click="goStepSecord">上一步</el-button>
                 <el-button type="primary" @click="save">保存</el-button>
                   <el-button type="primary" @click="save">保存并发布</el-button>
                 </div>
               
        <el-row style="line-height:40px;margin-bottom:15px">
          <el-col :span="10">
            <el-row>
          <el-col :span="9">是否默认配方</el-col>
          <el-col :span="14"> <el-select v-model="box.buyway" clearable >
         <el-option v-for="item in defal" :key="item.value" :label="item.label"
      :value="item.value"> </el-option> </el-select></el-col>
        </el-row>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-row>
          <el-col :span="9">是否全国配方</el-col>
          <el-col :span="14"> <el-select v-model="box.buyway" clearable >
         <el-option v-for="item in defal" :key="item.value" :label="item.label"
      :value="item.value"> </el-option> </el-select></el-col>
        </el-row>
          </el-col>
        </el-row>
         <el-row style="line-height:40px;margin-bottom:15px">
          <el-col :span="10">
            <el-row>
          <el-col :span="9">市 场 :</el-col>
          <el-col :span="14"> <el-input></el-input></el-col>
        </el-row>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-row>
          <el-col :span="9">行政区划 :</el-col>
          <el-col :span="14"> <el-input></el-input></el-col>
        </el-row>
          </el-col>
        </el-row>
          <el-row style="line-height:40px;margin-bottom:15px">
          <el-col :span="10">
            <el-row>
          <el-col :span="9">餐 厅 :</el-col>
          <el-col :span="14"> <el-input></el-input></el-col>
        </el-row>
          </el-col>
        </el-row>
          <el-row style="line-height:40px;margin-bottom:15px">
          <el-col :span="10">
            <el-row>
          <el-col :span="9"> 统一执行日期 :</el-col>
          <el-col :span="14"> <el-date-picker
      type="date"
      placeholder="选择日期">
    </el-date-picker></el-col>
        </el-row>
          </el-col>
        </el-row>
         <el-row style="line-height:40px;margin-bottom:15px">
          <el-col :span="18">
            <el-row>
          <el-col :span="5">备注 :</el-col>
          <el-col :span="19"> <el-input
  type="textarea"
  :rows="2">
</el-input></el-col>
        </el-row>
          </el-col>
        </el-row>
        </div>
      <el-dialog
  title="编辑"
  :visible.sync="dialogVisible"
  width="30%">
  <el-row style="margin-bottom:15px;line-height:40px;">
      <el-col :span="5">交易类型 :</el-col>
      <el-col :span="16"> <el-select v-model="box.buyway" clearable >
         <el-option v-for="item in buyWayList" :key="item.value" :label="item.label"
      :value="item.value"> </el-option> </el-select></el-col>
      </el-row>
       <el-row style="margin-bottom:15px;line-height:40px;">
      <el-col :span="5">数 量 :</el-col>
      <el-col :span="15"> <el-input v-model="box.amount" clearable >
          </el-input></el-col>
      </el-row>
      <el-row style="margin-bottom:15px;line-height:40px;">
      <el-col :span="5">单 位 :</el-col>
      <el-col :span="16"> <el-select v-model="box.buyway" clearable >
         <el-option v-for="item in companylist" :key="item.value" :label="item.label"
      :value="item.value"> </el-option> </el-select></el-col>
      </el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
    </div>  
 </div>
</template>
<script>
export default {
    data(){
        return{
            dialogVisible:false,
            step:1,     
            box:{
                main:"",
                buyway:'',
                amount:''
            },
            defal:[{value: '0',
                label: '否'},{value: '1',
                label: '是'}],
             tableData: [{
                date: '1',
                name: 'ss',
                province: 'xxx',
                city: 'xxxx',
                status:1,
                address: 'xxxx',
                zip: 'xxx'
                },{
                date: '2',
                name: 'xxx',
                province: 'xx',
                city: 'xxx',
                status:0,
                address: 'xxxx x',
                zip: 'xx'
                }]  
                ,buyWayList:[ {
                value: '0',
                label: '可多选'
                },
                 {
                value: '1',
                label: '食堂'
                },
                 {
                value: '2',
                label: '外卖'
                },
                 {
                value: '3',
                label: '宅急送'
                }],
                companylist:[{
                value: '1',
                label: '克'
                },{
                value: '2',
                label: '片'
                },{
                value: '3',
                label: '袋'
                }]
        }
    },
    methods:{
        goStepOne(){
             this.step=1;
        },
        goStepSecord(){
            this.step=2;
        },
          goStepThreed(){
            this.step=3;
        },
        del(){
           this.$alert('确认删除此条', '编辑', {
           confirmButtonText: '确定',
           callback: action => {
             this.$message({
               type: 'info',
               message: `action: ${ action }`
            });
          }
        }); 
        },
        editSecord(){
        this.dialogVisible=true
        }
    }
}
</script>
<style scoped>
.main{text-align: left;text-indent:5px;width: 98%;height: auto;margin: 0 auto;overflow: hidden;font-size: 15px; }
 .step{ width: 80%;height:45px;line-height: 45px;;margin:25px 0 15px 35px}
.step ul li{ width: 180px;color: #fff;text-align: center;height: 45px; line-height: 45px;font-size: 14px;float: left; margin-right: 25px}
.bg{background: url('../../assets/image/u.png') no-repeat;;background-size: 100% 100%}
.bg1{background: url('../../assets/image/u1.png') no-repeat;;background-size: 100% 100%;color: #999!important}
.box{width: 60%;min-height: 400px; margin: 30px auto;position: relative;}
.box2{width: 80%; }
.box3{width: 60%; }
.box ul li{ line-height: 40px;margin-bottom: 10px;}
.stpebtn{position: absolute;right: 0;width: 100px;height: 45px;;bottom: 0}
.stpebtn2{width: 220px;} 
.stpebtn3{width: 300px;}
</style>