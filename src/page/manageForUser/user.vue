<template>
  <div class="usernamage">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-row>
            <el-col :span="8" style="text-indent:5px"> 登录账户 :</el-col>
            <el-col :span="16">
              <el-input v-model="table.name" clearable>
              </el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="8">用户名称 :</el-col>
            <el-col :span="16">
              <el-input v-model="table.nickname" clearable>
              </el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="8">用户类型 :</el-col>
            <el-col :span="16">
              <el-select v-model="table.type" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <el-button size="small" type="primary" @click="search">查询</el-button>
            </el-col>
            <el-col :span="8">
              <el-button size="small" @click="reset">重置</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="btns">
      <div v-if="!routeredit">
        <el-button size="small" type="success" @click="insert">添加用户</el-button>
      </div>
      <div v-else>
        <el-button size="small" type="success" @click="showDia">用户关联</el-button>
        <el-button size="small" type="success" @click="unlinkUser">取消关联</el-button>
      </div>
    </div>
    <div class="tabledata">
      <el-table :data="tableData" border style="width: 100%" height="550" @selection-change="tablechangeout">
        <el-table-column v-if="routeredit" type="selection" width="100">
        </el-table-column>
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="empLID" label="登录账户" v-if="routeredit">
        </el-table-column>
        <el-table-column prop="emplId" label="登录账户" v-else>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" v-if="routeredit">
        </el-table-column>
        <el-table-column prop="emplName" label="姓名" v-else>
        </el-table-column>
        <el-table-column prop="employeeSex" label="性别" v-if="routeredit">
        </el-table-column>
        <el-table-column prop="employeeSex" label="性别" v-else>
          <template slot-scope="scope">
            <span v-if="scope.row.employeeSex=='F'">女</span>
            <span v-else>男</span>
          </template>
        </el-table-column>
        <el-table-column prop="emailAddress" label="邮箱" v-if="routeredit">
        </el-table-column>
        <el-table-column prop="emailAddr" label="邮箱" v-else>
        </el-table-column>
        <el-table-column prop="userFlag" label="用户类型">
          <template slot-scope="scope">
            <span v-if="scope.row.userFlag==1">YUMC用户</span>
            <span v-else>外部用户</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <div v-if="!routeredit">
              <el-button @click="grouprouter(scope.row)" type="text" size="small">用户组关联</el-button>
              <el-button @click="rolorouter(scope.row)" type="text" size="small">角色关联</el-button>
              <el-button @click="lookperson(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="editperson(scope.row)" type="text" size="small" v-if="scope.row.userFlag!=1">编辑
              </el-button>
              <el-button @click="delperson(scope.row)" type="text" size="small" v-if="scope.row.userFlag!=1">删除
              </el-button>
            </div>
            <div v-else>
              <el-button @click="handleClick(scope.row)" type="text" size="small">取消关联</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10"
        @current-change="pagechange" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="用户" :visible.sync="InsertCenterDialogVisible" :show-close="false" class="dialog" width="40%"
      center :before-close="hideDia" :close-on-click-modal="false" :close-on-press-escape='false'>
      <ul style="padding-left:30px;width:80%">
        <!--  -->
        <el-form :model="row" ref="row" label-width="100px" :rules="rules">
          <el-form-item label="登录账号:" v-if="lookedit">
            <el-input v-model="row.userCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="登录账号:" v-else prop="userCode">
            <el-col :span="3">RC+</el-col>
            <el-col :span="21">
              <el-input v-model="row.userCode" clearable> </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="姓名:" prop="userName">
            <el-input v-model="row.userName" clearable> </el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="userSex">
            <el-radio v-model="row.userSex" label="M" clearable>男</el-radio>
            <el-radio v-model="row.userSex" label="F" clearable>女</el-radio>
          </el-form-item>
          <el-form-item label="邮箱:" prop="emailAddr">
            <el-input v-model="row.emailAddr" clearable> </el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password" maxlength="20">
            <el-input v-model="row.password" show-password>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="passwordConfirm" maxlength="20">
            <el-input v-model="row.passwordConfirm" show-password>
            </el-input>
          </el-form-item>
        </el-form>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="lookedit" @click="savepersonEdit()"> 修改</el-button>
        <el-button v-else @click="saveperson()"> 添加</el-button>
        <el-button @click="hideDia">取消</el-button>
      </span>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog title="查看" :visible.sync="lookpersonDia" :show-close="false" class="dialog" width="40%" center>
      <el-row type="flex" class="row-bg" justify="center" style="margin-bottom:8px">
        <el-col :span="8">
          <el-row type="flex" class="row-bg">
            <el-col :span="8">登录账号</el-col>
            <el-col :span="12">{{show.emplId}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" class="row-bg">
            <el-col :span="8">姓 名</el-col>
            <el-col :span="12">{{show.emplName}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center" style="margin-bottom:8px">
        <el-col :span="8">
          <el-row type="flex" class="row-bg">
            <el-col :span="8">邮 箱</el-col>
            <el-col :span="12">{{show.emailAddr}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" class="row-bg">
            <el-col :span="8">性 别</el-col>
            <el-col :span="12">{{show.employeeSex=='F'?'女':'男'}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center" style="margin-bottom:8px">
        <el-col :span="8">
          <el-row type="flex" class="row-bg">
            <el-col :span="8">用户类型</el-col>
            <el-col :span="12">{{show.userFlag=='1'?'YUMC用户':'外部用户'}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          &nbsp;
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center" style="margin-bottom:8px">
        <el-col :span="8">
          <el-row type="flex" class="row-bg">
            <el-col :span="8">所在市场</el-col>
            <el-col :span="12">{{show.marketName}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          &nbsp;
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lookpersonDia = false">确定</el-button>
        <el-button @click="lookpersonDia = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 用户关联 -->
    <!-- -->
    <el-dialog title="用户关联" :visible.sync="dialogVisiblerole" width="60%" :before-close="handleClose"
      :close-on-click-modal="false" :close-on-press-escape='false'>
      <div class="mainbox">
        <el-row>
          <el-col :span="5">
            <el-input v-model="dis.name" placeholder="请输入登录账号"></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="dis.username" placeholder="请输入用户名称"></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-select v-model="dis.marketname" clearable placeholder="请选择用户类型">
              <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" :offset="1">
            <!-- @click="searchDiaData" -->
            <el-button size="small" type="primary" @click="searchDiaData">查询</el-button>
          </el-col>
        </el-row>
        <div style="margin:8px auto; height: 200px">
          <el-table :data="diaData" style="width: 100%" max-height="200" @selection-change="tablechange"
            ref="checkTable">
            <el-table-column type="selection" width="80">
            </el-table-column>
            <el-table-column prop="empLID" label="登录账户">
            </el-table-column>
            <el-table-column prop="userName" label="姓名">
            </el-table-column>
            <el-table-column prop="employeeSex" label="性别">
            </el-table-column>
            <el-table-column prop="emailAddress" label="邮箱">
            </el-table-column>
            <el-table-column prop="roleName" label="用户类型">
              <template slot-scope="scope">
                <span v-if="scope.row.userFlag==1">YUMC用户</span>
                <span v-else>外部用户</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="tablepage">
          <el-pagination background layout="prev, pager, next" :total="totalint" :page-size="5"
            @current-change="diapagechange" :current-page="diacurrentPage">
          </el-pagination>
        </div>
        <div style="margin:8px auto; height: 200px;">
          <el-table :data="copydiaData" style="width: 100%" max-height="200">
            <el-table-column prop="empLID" label="登录账户">
            </el-table-column>
            <el-table-column prop="userName" label="姓名">
            </el-table-column>
            <el-table-column prop="employeeSex" label="性别">
            </el-table-column>
            <el-table-column prop="emailAddress" label="邮箱">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" circle @click="delrowIndex(scope.row.guid)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveDiadata">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    sys,
    USER
  } from '@/config/api.js'
  export default {
    data() {
      var emailCheck = (rule, value, callback) => {
        if (value != '') {
          if (value.length > 50) {
            callback(new Error('邮箱字符长度不能超过50个字符'));
          }
          var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
          if (!emailReg.test(value)) {
            callback(new Error('邮箱格式不正确'));
          } else {
            callback();
          }
        }
      };
      var pasCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.row.password) {
          callback(new Error('两次输入密码不一致!'));
        } else if (20 >= value >= 6) {
          callback(new Error('密码长度在6~20位'));
        } else {
          callback();
        }
      };
      return {
        routeredit: false,
        lookedit: false,
        total: 1,
        totalint: 1,
        guidId: '', //不吹不黑 这个值 字段取得不好 明面上是用户信息 实则是分组信息 
        InsertCenterDialogVisible: false,
        dialogVisiblerole: false,
        lookpersonDia: false,
        currentPage: 1,
        diacurrentPage: 1,
        table: {
          name: "",
          nickname: '',
          type: ""
        },
        dis: {
          name: '',
          username: '',
          marketname: ''
        },
        options: [{
          value: '1',
          name: "YUMC用户"
        }, {
          value: '2',
          name: "外部用户"
        }],
        tableData: [],
        diaData: [],
        copydiaData: [],
        LightData: [],
        hashIndex: {},
        outData: [],
        row: {
          guid: "",
          userCode: "",
          userName: '',
          userSex: 'F',
          emailAddr: '',
          password: '',
          passwordConfirm: ''
        },
        show: {
          emplId: "",
          marketName: "",
          emplName: '',
          employeeSex: '1',
          emailAddr: '',
          userFlag: '',
        },
        //验证
        rules: {
          userCode: [{
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          }, ],
          userName: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }, ],
          userSex: [{
            required: true,
            message: '请输入性别',
            trigger: 'blur'
          }, ],
          emailAddr: [{
            validator: emailCheck,
            required: true,
            trigger: 'blur'
          }, ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ],
          passwordConfirm: [{
            validator: pasCheck,
            required: true,
            trigger: 'blur'
          }, ],
        }
      }
    },
    watch: {
      '$route.query.edit': function (e) {
        this.routeredit = this.$route.query.edit == '1' ? true : false;
        this.init();
      }
    },
    mounted() {
      this.guidId = this.$route.query.guid;
      this.routeredit = this.$route.query.edit == '1' ? true : false; //
      this.init();
    },
    methods: {
      tablechangeout(e) {
        this.outData = e;
      },
      unlinkUser() {
        this.$confirm('取消勾选的用户关联, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.outData.length > 0) {
            let arr = [];
            this.outData.forEach((index, item) => {
              arr.push(index.userId)
            })
            let data = {
              userIds: arr
            }
            USER.deleteUserGroupUserInfoAll(data).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.init()
              }
            })
          }
        })
      },
      saveDiadata() {
        let arr = [];
        this.copydiaData.forEach((item, index) => {
          arr.push(item.guId)
        })
        let data = {
          userGroupId: this.guidId,
          guIds: arr
        }
        USER.addUserGroupRelation(data).then(res => {
          this.handleClose()
          this.init()
        })
      },
      tablechange(val) {
        this.LightData = this.LightData.concat(val);
        let hash = {}
        this.LightData = this.LightData.reduce((item, next) => {
          if (!hash[next.guId]) {
            hash[next.guId] = true
            item.push(next)
          }
          return item
        }, [])
        //给这货 弄成数组
        let arr = []
        for (let i in hash) {
          arr.push(i)
        }
        this.hashIndex = arr;
        this.copydiaData = this.LightData;
      },
      diapagechange(e) {
        this.diacurrentPage = e;
        this.searchDiaData()
      },
      handleClose() {
        this.dis.name = '';
        this.dis.username = '';
        this.dis.marketname = '';
        this.diacurrentPage = 1;
        this.totalint = 1;
        this.copydiaData = [];
        this.hashIndex = {};
        this.diaData = [];
        this.LightData = [];
        this.dialogVisiblerole = false
      },
      delrowIndex(e) {
        let num = 0;
        //寻找下标
        for (let i in this.hashIndex) {
          if (this.hashIndex[i] == e) {
            num = i;
          }
        }
        this.copydiaData.splice(num, 1);
        this.hashIndex.splice(num, 1);
      },
      showDia() {
        this.dialogVisiblerole = true
      },
      searchDiaData() {
        let data = {
          userGroupId: this.guidId,
          current: this.diacurrentPage,
          empLID: this.dis.name,
          userName: this.dis.username,
          userFlag: this.dis.marketname,
        }
        USER.getNoInThisGroupUserInfo(data).then(res => {
          this.totalint = res.data.data.total;
          this.diaData = res.data.data.records;
          let sameData = '';
          let sameArr = [];
          this.LightData.forEach((ab, cd) => {
            this.diaData.forEach((a, c) => {
              if (ab.guId == a.guId) {
                sameData = this.diaData[c] = this.LightData[cd]
                sameArr.push(sameData)
              }
            })
          })
          this.checkDom(sameArr)
        })
      },
      checkDom(sameArr) {
        if (sameArr.length >= 1) {
          this.$nextTick(() => {
            sameArr.forEach(row => {
              this.$refs.checkTable.toggleRowSelection(row);
            });
          })
        }
      },
      pagechange(e) {
        this.currentPage = e;
        this.init();
      },
      //添加用户
      saveperson() {
        this.$refs['row'].validate((valid) => {
          if (valid) {
            let data = {
              emplId: this.row.userCode,
              employeeName: this.row.userName,
              employeeSex: this.row.userSex,
              emailAddr: this.row.emailAddr,
              password: this.row.passwordConfirm,
            }
            USER.insertUserInfo(data).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.hideDia()
                this.init();
              }
              this.InsertCenterDialogVisible = false;
            })
          }
        });
      },
      grouprouter(e) {
        console.log(e)
        this.$router.push({
          path: "/home/manageGroupRole",
          query: {
            edit: '1',
            guid: e.guid
          }
        })
      },
      rolorouter(e) {
        this.$router.push({
          path: "/home/manageRole",
          query: {
            edit: '1',
            guid: e.guid
          }
        })
      },
      hideDia() {
        //关闭验证 table
        this.lookedit = false;
        this.$refs['row'].resetFields();
        this.row.userCode = '';
        this.row.userName = ''
        this.row.userSex = 'F'
        this.row.emailAddr = ''
        this.row.guid = ''
        this.InsertCenterDialogVisible = false;
      },
      editperson(e) {
        this.lookedit = true; //开启判断条件
        this.InsertCenterDialogVisible = true;
        this.row.userCode = e.emplId;
        this.row.userName = e.emplName;
        this.row.userSex = e.employeeSex;
        this.row.emailAddr = e.emailAddr;
        this.row.guid = e.guid;
      },
      //编辑用户
      savepersonEdit() {
        this.$refs['row'].validate((valid) => {
          if (valid) {
            //验证通过
            let par = {
              guid: this.row.guid,
              employeeName: this.row.userName,
              employeeSex: this.row.userSex,
              emailAddr: this.row.emailAddr,
              password: this.row.passwordConfirm
            }
            console.log(par)
            USER.updateUserInfo(par).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.init();
                this.InsertCenterDialogVisible = false;
              }
            })
          } else {
            //验证失败
          }
        });

      },
      lookperson(e) {
        this.lookpersonDia = true;
        this.show = e
      },
      delperson(e) {
        this.$confirm('删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            guid: e.guid
          }
          USER.deleteUserInfo(data).then(res => {
            this.total = res.data.data.total;
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.init()
            }
          })

        })

      },
      handleClick(e) {
        this.$confirm('取消该用户关联, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            userId: e.userId
          }
          USER.deleteUserGroupUserInfo(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.init()
            }
          })

        })
      },
      insert() {
        this.InsertCenterDialogVisible = true;
      },
      editUserInfo(data) {
        if (this.lookedit) {
          sys.updateUserInfo(data).then(res => {
            if (res.data.data == 1) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.init();
              this.centerDialogVisible = false;
            }
          })
        } else {
          sys.insertUserInfo(data).then(res => {
            if (res.data.data == 1) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.init();
              this.$refs['row'].resetFields();
              this.centerDialogVisible = false;
            }
          })
        }
      },
      search() {
        this.currentPage = 1;
        let data = {
          emplId: this.table.name,
          emplName: this.table.nickname,
          loginType: this.table.type,
          current: this.currentPage,
        }
        this.main(data);
      },
      main(date) {
        console.log(this.routeredit)
        if (this.routeredit) {
          USER.getUserGroupUserInfo(date).then(res => {
            this.total = res.data.data.total;
            this.tableData = res.data.data.records;
          })
        } else {
          USER.getUserInfo(date).then(res => {
            this.total = res.data.data.total;
            this.tableData = res.data.data.records;
          })
        }
      },
      init() {
        let par = {};
        if (this.routeredit) {
          par = {
            current: this.currentPage,
            empLID: this.table.nickname,
            userName: this.table.name,
            userGroupId: this.guidId,
            userFlag: this.table.type
          }
        } else {
          par = {
            emplId: this.table.name,
            emplName: this.table.nickname,
            loginType: this.table.type,
            current: this.currentPage,
          }
        }
        this.main(par);
      },
      reset() {
        this.currentPage = 1;
        this.table.name = '';
        this.table.nickname = '';
        this.table.type = '';
        this.init();
      }
    }
  }

</script>
<style type="less" scoped>
  .usernamage{text-align: left;width: 98%;height: auto;margin: 0 auto;overflow: hidden;font-size: 15px; }
.search{width:100%;height: 50px;line-height: 50px;background:rgba(242, 242, 242, 1);margin-top: 5px; }
 .btns{ width:100%;margin:10px 0;;line-height: 40px; height: 40px;background:#ddd}
 .page {text-align: right;margin-top: 8px}
 .usernamage /deep/ .el-dialog__body {padding: 0 20px;}
  .tablepage{text-align: right;}
</style>
