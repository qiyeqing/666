<template>
  <div class="usernamage">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-row>
            <el-col :span="8" style=""> 角色名称 :</el-col>
            <el-col :span="16">
              <el-input v-model="table.name" clearable>
              </el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          &nbsp;
        </el-col>
        <el-col :span="6">
          &nbsp;
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
      <el-button size="small" type="success" v-if="routeredit" @click="showRoledia">角色关联</el-button>
      <el-button size="small" type="success" v-else @click="showDia">添加角色</el-button>
    </div>
    <div class="tabledata">
      <el-table :data="tableData" border style="width: 100%"  height="550">
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="remarks" label="备注">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <div v-if="routeredit">
              <el-button type="text" size="small" @click="unlinkRole(scope.row)">取消关联</el-button>
            </div>
            <div v-else>
              <el-button type="text" size="small" @click="showtrees(scope.row.roleCode)">权限关联</el-button>
              <el-button @click="showDia(scope.row,true)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="delrole(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10"
          @current-change="pagechange" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="角色" :visible.sync="dialogVisible" :show-close="false" width="30%">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20">
          <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="hideDia">取 消</el-button>
        <el-button type="primary" v-if="isEdit" @click="editRole">修 改</el-button>
        <el-button type="primary" v-else @click="insetRole">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="权限设置" :visible.sync="tree" :show-close="false" width="30%">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20">
          <el-tree :data="data" show-checkbox node-key="id" ref='tree' :default-checked-keys="defaultChecked">
          </el-tree>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tree = false">取 消</el-button>
        <el-button type="primary" @click="savetree">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 关联操作 -->
    <el-dialog title="角色关联" :visible.sync="dialogVisiblerole" width="40%" :before-close="handleClose" :close-on-click-modal="false" :close-on-press-escape='false'>
      <div class="mainbox">
        <el-row>
          <el-col :span="6" :offset="1">
            <el-input v-model="dis.name" placeholder="请输入名称"></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button size="small" type="primary" @click="searchDiaData">查询</el-button>
          </el-col>
        </el-row>
         <div style="margin:8px auto; height: 200px">
           <el-table :data="diaData" style="width: 100%" max-height="200" @selection-change="tablechange"
            >
            <el-table-column type="selection" width="80">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称">
            </el-table-column>  
          </el-table>
         </div>
          <div class="tablepage">
          <el-pagination background layout="prev, pager, next" :total="totalint"   :page-size="5"  :current-page="diacurrentPage" >
          </el-pagination>
        </div>
         <div style="margin:8px auto; height: 200px;">
           <el-table :data="copydiaData" style="width: 100%" max-height="200"
            >
            <el-table-column prop="roleName" label="角色名称">
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
        <el-button type="primary" @click="saveRoleLink">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    ROLE,seletinfo
  } from '@/config/api.js';
  export default {
    data() {
      return {
        currentPage: 1,
        diacurrentPage:1,
        guidId:'',
        roleid:"",
        routeredit: false,
        dialogVisiblerole: false,
        isEdit: false,
        dialogVisible: false,
        tree: false,
        total: 1,
        totalint:1,
        form: {
          name: '',
          desc: '',
          id: ""
        },
        dis:{
          name:''
        },
        data: [],
        diaData:[],
        copydiaData:[],
        LightData:[],
        defaultChecked:[],
        hashIndex:{},
        table: {
          name: "",
          nickname: ""
        },
        tableData: [],
        rules: {
          name: [{
            required: true,
            message: '角色名',
            trigger: 'blur'
          }, ]
        }
      }
    },
    methods: {
      setnull() {
        this.form.name = '';
        this.form.desc = '';
        this.form.id = '';
      },
      hideDia() {
        this.setnull()
        this.dialogVisible = false;
      },
      pagechange(e) {
        this.currentPage = e;
        this.init();
      },
      editRole() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let par = {
              id: this.form.id,
              roleName: this.form.name,
              remarks: this.form.desc,
            }
            ROLE.updateRoleInfo(par).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.init();
                this.setnull();
                this.isEdit = false;
                this.dialogVisible = false;
              }
            })
          }
        });
      },
      unlinkRole(e){
         this.$confirm('取消角色关联, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 走接口
       ROLE.unLinkRoleGroupWeb({guid:e.guid}).then(res=>{
          console.log(res)
            if(res.data.code==200){
                this.$message({
                type: 'success',
                message: '取消成功!'
              });
              this.init()
          }
         })
        })
       
      },
      insetRole() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let dar = {
              roleName: this.form.name,
              remarks: this.form.desc
            }
            ROLE.insertRoleInfo(dar,{timeout:120000}).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.setnull();
                this.dialogVisible = false
              }
              this.init()
            })
          }
        });
      },
      showRoledia() {
        this.dialogVisiblerole = true
      },
      //关闭
      handleClose() {
        //清空数据
        this.diacurrentPage=1;
        this.totalint=1;
        this.dis.name='';
        this.copydiaData=[];
        this.hashIndex={};
        this.LightData=[];
        this.diaData=[];
        this.dialogVisiblerole = false
      },
      showDia(e, type) {
        if (type) {
          this.form.name = e.roleName;
          this.form.desc = e.remarks;
          this.form.id = e.id;
          this.isEdit = true;
        }
        this.dialogVisible = true
      },
      delrole(e) {
        this.$confirm('删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ROLE.deleteRoleInfo({
            id: e.id
          }).then(res => {
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
      showtrees(e) {    
        this.roleid=e; 
        seletinfo.RoleList({id:e}).then(res=>{
           this.data=res.data.data;
           this.defaultChecked=this.data[0].checkList;
        })
        this.tree = true;   
      },
     
      savetree(){
        let arr=[]
        this.$refs['tree'].getCheckedNodes().forEach((index,item)=>{
            arr.push(index.permissionCode)
        })
        let data={
          "permissionCodes":arr,
          "roleCode": this.roleid
        }  
       if(arr.length>=1){
          ROLE.RoleListSave(data).then(res=>{
          this.tree = false;
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
          this.init()
        })
       }else{
            this.$message({
                type: 'error',
                message: '请勾选对应的权限!'
              });
       }
      },
      searchDiaData(){
        let dat={
          guid:this.guidId,
          roleName:this.dis.name,
          current: this.currentPage,
        }
         ROLE.getLinkRoleWithoutIdWeb(dat).then(res=>{
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
      tablechange(val) {        
        this.LightData=this.LightData.concat(val);   
        let hash = {}
        this.LightData = this.LightData.reduce((item, next) => {
          if (!hash[next.guid]) {
              hash[next.guid] = true
             item.push(next)
          }
          return item
        }, [])
        //给这货 弄成数组
         let arr=[]
          for(let i in hash){
           arr.push(i)
        }
        this.hashIndex=arr;
        this.copydiaData = this.LightData;
      },
      delrowIndex(e){
        let num=0;
        //寻找下标
        for(let i in this.hashIndex){
           if(this.hashIndex[i]==e){
              num=i;
           }   
         }
          this.copydiaData.splice(num,1);
          this.hashIndex.splice(num,1);       
      },
      saveRoleLink(){
            let arr=[];
            this.copydiaData.forEach((item,index)=>{
           arr.push(item.roleCode)
         })
        //roleCodes 数组
        let da={
          userCode:this.guidId,
          roleCodes:arr
        }
        ROLE.linkRoleGroup(da).then(res=>{

          this.handleClose()
          this.init()
        })
      },
      search() {
        this.init()
      },
      reset() {
        this.currentPage = 1;
        this.table.name = ''
        this.init()
      },
      init() {
         let par={}
        if(this.routeredit){
          par = {
             current: this.currentPage,
             guid:  this.guidId,
             roleName:this.table.name
        }
        }else{
            par = {
           current: this.currentPage,
           roleName: this.table.name
        }
        }  
        this.main(par)
      },
      main(data) {
        if(this.routeredit){
            ROLE.getLinkRole(data).then(res => {
               this.total = res.data.data.total;
               this.tableData = res.data.data.records;
            })
        }
         else{
             ROLE.roleInfo(data).then(res => {
               this.total = res.data.data.total;
               this.tableData = res.data.data.records;
            })
         }
      }
    },
     watch:{
      '$route.query.edit':function(e){
         this.routeredit = this.$route.query.edit == '1' ? true : false;
           this.init();
      }
    },
    mounted() { 
        this.guidId= this.$route.query.guid; 
       this.routeredit = this.$route.query.edit == '1' ? true : false;
       this.init();
    }
  }

</script>
<style type="less" scoped>
  .usernamage{text-align: left;text-indent:5px;width: 98%;height: auto;margin: 0 auto;overflow: hidden;font-size: 15px; }
.search{width:100%;height: 50px;line-height: 50px;background:rgba(242, 242, 242, 1);margin-top: 5px; }
 .btns{ width:100%;margin:10px 0;;line-height: 40px; height: 40px;background:#ddd}
.page {text-align: right;margin-top: 8px}
.mainbox{width: 100%;margin: 0 auto; height: 550px}
  .usernamage /deep/ .el-dialog__body {padding: 0 20px;}
  .tablepage{text-align: right;}
</style>
