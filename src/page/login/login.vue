<template>
  <div class="login">
    <el-row :gutter="20">
      <el-col :span="5" :offset="17">
        <div class="loginbox" v-if="next">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="24">
              <div class="graycontent  graycontentheight">用户登录</div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg " justify="center">
            <el-col :span="22">
              <el-form :model="ruleForm" label-width="50px" class="margint20">
                <el-form-item label="账户" prop="pass">
                  <el-input type="password" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center" style="margin-top:20px">
            <el-col :span="20">
              <div class="btnlogin" @click="sbumit">登录</div>
            </el-col>
          </el-row>
        </div>
        <div v-else class="loginbox">
           <div class="graycontent  graycontentheight">选择品牌</div>
              <div class="nextbox">
                 <el-select v-model="brand" placeholder="请选择品牌">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </div>
              <div class=""> <el-button style="width:80%" type="primary">确定</el-button></div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        next:true,
        ruleForm: {
          username: '',
          password: '',
        },
          options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        brand: ''
 
      }
    },
    methods: {
      sbumit() {
        this.$router.push('/home/productFormulation')
      }
    },
    mounted() {

    }
  }

</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
    background: url('../../assets/image/loginbg.jpg') no-repeat;
    background-size: 100% 100%;
  }

  .login /deep/ .el-row {
    margin: 0
  }

  .loginbox {
    width: 100%;
    height: 280px;
    background: #fff;
    border-radius: 8px;
     overflow: hidden;
    margin-top: 250px;
  }

  .graycontentheight {
    height: 60px;
    line-height: 60px;
    font-size: 20px
  }

  .btnlogin {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #199ef8;
    text-align: center;
    color: #fff;
    font-size: 15px
  }
 .nextbox{ width: 100%;height: 50px;line-height: 50px;margin: 55px 0;overflow: hidden;}
</style>
