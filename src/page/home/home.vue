<template>
  <div class="home">
    <el-row style="height:100%">
      <!-- class="homeleft" -->
      <div class="nav"></div>
      <div class="ivew">
        <el-col :span="3" style="height:100%">
          <div class="homeleft">
            <el-menu :default-active="openIndex" class="el-menu-vertical-demo" @open="handleOpen" :unique-opened="true" 
              :collapse-transition="false" background-color="#545c64" text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-bangzhu"></i>
                  <span>
                    <router-link to="/home/productFormulation">配方管理</router-link>
                  </span>
                </template>
                <el-menu-item index="1-1" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/productFormulation" style="display: block;">产品配方</router-link>
                </el-menu-item>
                <!-- <el-menu-item index="1-2" style="text-align: left;text-indent:15px;font-size:12px">
                 <router-link to="/home/productFormulationassociation" style="display: block;">餐厅产品配方关联</router-link></el-menu-item>       -->
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span>
                    <router-link to="/home/manageUser">餐厅管理</router-link>
                  </span>
                </template>
                <el-menu-item index="2-1" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/manageUser" style="display: block;">餐厅配方</router-link>
                </el-menu-item>
                <el-menu-item index="2-2" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/manageRole" style="display: block;"> 配方关联</router-link>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-s-platform"></i>
                  <span>
                    <router-link to="/home/restaurant">任务管理</router-link>
                  </span>
                </template>
                <!--  -->
                <el-menu-item index="3-1" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/restaurant" style="display: block;">餐厅配方下发履历</router-link>
                </el-menu-item>
                <el-menu-item index="3-2" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/version" style="display: block;">
                    餐厅配方版本</router-link>
                </el-menu-item>
                <el-menu-item index="3-3" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/tasks" style="display: block;">
                    餐厅下发任务管理</router-link>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span>
                    <router-link to="/home/manageUser">用户管理</router-link>
                  </span>
                </template>
                <el-menu-item index="4-1" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/manageUser" style="display: block;">用户管理</router-link>
                </el-menu-item>
                <el-menu-item index="4-2" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/manageRole" style="display: block;">角色管理</router-link>
                </el-menu-item>
                <el-menu-item index="4-3" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/manageGroupRole" style="display: block;">用户组管理</router-link>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>
                    <router-link to="/home/manageJournal">系统管理</router-link>
                  </span>
                </template>
                <el-menu-item index="5-1" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/manageJournal" style="display: block;">操作日志</router-link>
                </el-menu-item>
                <el-menu-item index="5-2" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/manageParams" style="display: block;">参数配置</router-link>
                </el-menu-item>
                <el-menu-item index="5-3" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/manageWarning" style="display: block;">报警目标管理</router-link>
                </el-menu-item>
                <el-menu-item index="5-4" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/manageRecord" style="display: block;">报警记录</router-link>
                </el-menu-item>
                <el-menu-item index="5-5" style="text-align: left;text-indent:15px;font-size:12px">
                  <router-link to="/home/manageStream" style="display: block;">下游系统通知</router-link>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="homeright">
            <div class="homeright_header">
              保留参数
              <div style="float:right" size="small">
                <el-button @click=" prev" size="small">返回上一步</el-button>
              </div>
            </div>
          </div>
          <div>
            <router-view />
          </div>
        </el-col>
      </div>
    </el-row>
  </div>

</template>

<script>
  export default {
    data(){
      return{
        openIndex:'1-1'
      }
    },
    methods: {
      handleOpen(key, keyPath) {
         let that=this
         that.openIndex=key;  
         that.$store.commit('SET_Tag',key)  
      },
      prev() {
        this.$router.go(-1)
      }
    },
    watch: {
      '$route': function (e, v) {
      //console.log('new:', e, 'old:', v)
      },
      '$store.getters.currentTag':function(news){
        this.$store.getters.tag=`${JSON.parse(news)}-1`
      }
    },
    mounted(){
      this.openIndex=`${JSON.parse(this.$store.getters.currentTag)}-1`;
    }
  }

</script>

<style scoped>
  .home {
    height: 100%;
  }
  .homeleft {
    overflow: hidden;
    width: 100%;
    background: rgb(84, 92, 100);
    height: 100%;
  }
  .nav {
    overflow: hidden;
    width: 100%;
    background: #199ef8;
    height: 8%;
  }
  .ivew {
    overflow: hidden;
    width: 100%;
    height: 92%;
  }
  .homeright {
    width: 98%;
    height: 40px;
    overflow: hidden;
    margin: 0 auto;
    border-bottom: 2px solid #ccc;
    line-height: 40px;
    text-align: left;
    font-size: 14px;
    text-indent: 5px;
  }
  .homeleft .el-menu {
    border-right: none
  }
  .home a {
    color: rgb(255, 255, 255);
    text-decoration: none;
  }
  .homeleft /deep/ .el-submenu__title {
    text-align: left
  }
  .homeleft /deep/ .el-menu-item.is-active {
    background: #00ffcc !important;
    color: #999;
  }
</style>
