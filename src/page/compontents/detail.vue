<template>
  <div class="detail">
    <div class="ties">基本信息</div>
    <el-row :gutter="20" style="margin:15px 0">
      <el-col :span="6" :offset="2">产品编码：200020</el-col>
      <el-col :span="6">产品名称：香辣鸡腿堡</el-col>
      <el-col :span="6">配方名称：常温包配方</el-col>
    </el-row>
    <div class="ties">物料信息</div>
    <el-row :gutter="20" style="margin:15px 0">
      <el-col :span="18" :offset="2" style="margin:5px 0">
        <el-button type="primary" size="medium">添加物料</el-button>
      </el-col>
      <el-col :span="18" :offset="2">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="序号">
          </el-table-column>
          <el-table-column prop="name" label="原物料编码">
          </el-table-column>
          <el-table-column prop="province" label="原物料名称">
          </el-table-column>
          <el-table-column prop="province" label="交易类型 (多选)">
          </el-table-column>
          <el-table-column prop="province" label="数量">
          </el-table-column>
          <el-table-column prop="province" label="单位">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <div>
                <!-- v-if 判断 -->
                <el-button type="text" size="small">修改</el-button>
                <el-button type="text" size="small">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="ties">范围和时间</div>
    <div v-if="!routeredit">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
        <el-row :gutter="20" style="margin:15px 0">
          <el-col :span="11" :offset="1">
            <el-form-item label="是否默认配方" prop="isdefault">
              <el-select v-model="ruleForm.isdefault" style="width: 60%;">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生效日期" >  
               <el-form-item >
                  <el-date-picker type="date" placeholder="选择生效日期" v-model="ruleForm.date" style="width: 100%;">
                  </el-date-picker>
                </el-form-item>        
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:15px 0">
          <el-col :span="19" :offset="1">
           <el-form-item label="适用范围" prop="way">            
            <el-row>
              <el-col :span="3">    <el-button type="primary" size="medium" @click="showSele"> 选择范围</el-button></el-col>
              <el-col :span="21">
                  <el-input type="textarea" v-model="ruleForm.way"></el-input>
              </el-col>
            </el-row>
           </el-form-item>
           </el-col>
        </el-row>
       <el-row :gutter="20" style="margin:15px 0">
          <el-col :span="19" :offset="1">
           <el-form-item label="备注" >                                 
               <el-input type="textarea" v-model="ruleForm.remark"></el-input>                     
           </el-form-item>
           </el-col>
        </el-row>
      </el-form>
    </div>
  <el-row type="flex" class="row-bg" justify="center" >
  <el-col :span="2">  <el-button size="medium">返回</el-button></el-col>
  <el-col :span="2">  <el-button type="primary" size="medium">保存</el-button></el-col>
  <el-col :span="2">  <el-button type="primary" size="medium">保存并发布</el-button></el-col>
</el-row>
  <div class="ties">变更历史记录</div>
  <sele v-if="seled" @changes="changes"></sele>
  </div>
</template>
<script>
import sele from './sele.vue'
  export default {
    components:{
      sele
    },
    data() {
      return {
        seled:false,
        ruleForm: {
          isdefault: '0',
          date:new Date((new Date()/1000+86400)*1000),
          way:'',
          remark:'南瓜杏仁露'
        },
        routeredit: false,
        tableData: [{
          date: '1',
          name: 'ss',
          province: 'xxx',
          city: 'xxxx',
          status: 1,
          address: 'xxxx',
          zip: 'xxx'
        }],
        rules: {
          isdefault: [{
            required: true,
            message: '请选择是否默认配方',
            trigger: 'blur'
          }],
          way:[{      required: true,
            message: '请选择适用范围',
            trigger: 'blur'}]
        }
      }

    },
    methods: {
      showSele(){
        this.seled=true
      },
      changes(data){
      
        this.seled=data;
      }
    },
    watch: {
      '$route.query.edit': function (e) {
        this.routeredit = this.$route.query.edit == '1' ? true : false;
        this.init();
      }
    },
    mounted() {
      this.routeredit = this.$route.query.edit == '1' ? true : false;
    }
  }

</script>
<style scoped>
  .detail {
    text-align: left;
    text-indent: 5px;
    width: 98%;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    font-size: 15px;
  }

  .ties {
    width: 150px;
    margin-top: 15px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(215, 215, 215, 1);
    color: #333;
    font-size: 13px;
  }

</style>
