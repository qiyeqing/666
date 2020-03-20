<template>
  <div class="sele">
    <el-dialog title="选择范围" :visible.sync="dialogVisible" :close-on-press-escape="false" :show-close='false'
      :close-on-click-modal="false" width="1200px" :before-close="handleClose">
      <div class="main">
        <div class="mainleft">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="营运市场" name="1">
              <div class="treediv">
                <div class="treedivhea">
                  <el-row>
                    <el-col :span="12">
                      <el-input placeholder="请输入搜索内容" v-model="tag1"></el-input>
                    </el-col>
                    <el-col :span="3" :offset='1'>
                      <el-button size="small" type="primary">查询</el-button>
                    </el-col>
                  </el-row>
                </div>
                <div class="treename">
                  <el-tree :data="tag1tree" show-checkbox ref="tree1" node-key="id" @check="checktag1tree"
                    :filter-node-method="filterNode">
                  </el-tree>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="行政区划" name="2">
              <div class="treediv">
                <div class="treediv">
                  <div class="treedivhea">
                    <el-row>
                      <el-col :span="12">
                        <el-input placeholder="请输入搜索内容" v-model="tag2"></el-input>
                      </el-col>
                      <el-col :span="3" :offset='1'>
                        <el-button size="small" type="primary">查询</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="treename">
                    <el-tree :data="alltree" ref="alltreecheckref" :filter-node-method="filterNode"
                      @check="alltreecheck" show-checkbox node-key="id" accordion>
                      <!--      :props="props"
                              :load="loadNode"
                                lazy
                              :props="props"       -->
                    </el-tree>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="指定餐厅" name="3">
              <div class="treediv">
                <div class="treediv">
                  <div class="treedivhea">
                    <el-row>
                      <el-col :span="6">
                        <el-input placeholder="请输入搜索内容" v-model="tag3.code"></el-input>
                      </el-col>
                      <el-col :span="6" :offset='1'>
                        <el-input placeholder="请输入搜索内容" v-model="tag3.name"></el-input>
                      </el-col>
                      <el-col :span="3" :offset='1'>
                        <el-button size="small" type="primary">查询</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="treename">
                    <el-table :data="tag3tree" style="width: 100%" max-height="280" ref="checkTable1"
                      @selection-change="tag3treetableclick">
                      <el-table-column type="selection" width="80">
                      </el-table-column>
                      <el-table-column prop="storeCode" label="餐厅编号">
                      </el-table-column>
                      <el-table-column prop="storeNameWithCnFull" label="餐厅名称">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="排除餐厅" name="4">
              <div class="treediv">
                <div class="treediv">
                  <div class="treedivhea">
                    <el-row>
                      <el-col :span="6">
                        <el-input placeholder="请输入搜索内容" v-model="tag4.code"></el-input>
                      </el-col>
                      <el-col :span="6" :offset='1'>
                        <el-input placeholder="请输入搜索内容" v-model="tag4.name"></el-input>
                      </el-col>
                      <el-col :span="3" :offset='1'>
                        <el-button size="small" type="primary">查询</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="treename">
                    <el-table :data="tag4tree" style="width: 100%" max-height="280" ref="checkTable2"
                      @selection-change="tag4treetableclick">
                      <el-table-column type="selection" width="80">
                      </el-table-column>
                      <el-table-column prop="storeCode" label="餐厅编号">
                      </el-table-column>
                      <el-table-column prop="storeNameWithCnFull" label="餐厅名称">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="城市级别" name="5">
              <div class="treediv">
                <div class="treedivhea">
                  <el-row>
                    <el-col :span="12">
                      <el-input placeholder="请输入搜索内容" v-model="tag5"></el-input>
                    </el-col>
                    <el-col :span="3" :offset='1'>
                      <el-button size="small" type="primary">查询</el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="配销" name="6">
              <div class="treediv">
                <div class="treedivhea">
                  <el-row>
                    <el-col :span="12">
                      <el-input placeholder="请输入搜索内容" v-model="tag6"></el-input>
                    </el-col>
                    <el-col :span="3" :offset='1'>
                      <el-button size="small" type="primary">查询</el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="mainright">
          <div class="mainrightheader">选择结果</div>
          <!-- <div class="mainrightheader mainrightheader2">
            <el-button type="primary" size="small" @click="delIndexAll">批量删除</el-button>
          </div> -->
          <div class="tabletee">
            <el-table :data="diaData" style="width: 100%" max-height="365" ref="table" @selection-change="tablechange">
              <!-- type="selection" -->
              <el-table-column width="80">
              </el-table-column>
              <el-table-column prop="way" label="选择范围">
              </el-table-column>
              <el-table-column prop="userGroupName" label="例外餐厅">
              </el-table-column>
              <el-table-column prop="marketName" label="选择类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1">营运市场</span>
                  <span v-else-if="scope.row.type==2">行政区划</span>
                  <span v-else-if="scope.row.type==3">指定餐厅</span>
                  <span v-else-if="scope.row.type==4">排除餐厅</span>
                  <span v-else-if="scope.row.type==5">城市级别</span>
                  <span v-else-if="scope.row.type==6">配销</span>
                </template>
              </el-table-column>
              <!-- <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-button type="danger" icon="el-icon-delete" circle @click="circledel(scope.row,scope.row.type)">
                    </el-button>
                  </div>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>
      <div class="titl"> 筛选规则</div>
      <div class="ways">
        <el-tabs v-model="wayname" type="card">
          <el-tab-pane label="条件1" name="1">
            <div class="tagcheck">
              <el-row>
                <el-col :span="20" :offset="1" style="margin:20px 15px;line-height:40px">
                  <el-row>
                    <el-col :span="2">筛 选 类 型</el-col>
                    <el-col :span="18">
                      <el-select v-model="way1" placeholder="请选择">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <div v-if="way1">
                  <el-col :span="20" :offset="1" style="margin:0px 15px;line-height:40px">
                    <el-row>
                      <el-col :span="2">待选择列表</el-col>
                      <el-col :span="18">
                        <el-tag v-for="(item,index) in tagoption1" :key="index" @click="tag1click(item)" type="info"
                          style="padding: 0 20px;margin-right:15px;text-align:center;text-indent: 0;cursor:pointer">
                          {{item.name}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="20" :offset="1" style="margin:20px 15px;line-height:40px">
                    <el-row>
                      <el-col :span="2">已选择列表</el-col>
                      <el-col :span="18">
                        <el-tag v-for="(item,index) in tagoptioncheck1" @close="tag1close(item,index)" :key="index"
                          closable type="info"
                          style="padding: 0 20px;margin-right:15px;text-align:center;text-indent: 0;cursor:pointer">
                          {{item.name}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </div>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="条件2" name="2">
            <div class="tagcheck">
              <el-row>
                <el-col :span="20" :offset="1" style="margin:20px 15px;line-height:40px">
                  <el-row>
                    <el-col :span="2">筛 选 类 型</el-col>
                    <el-col :span="18">
                      <el-select v-model="way2" placeholder="请选择">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <div v-if="way2">
                  <el-col :span="20" :offset="1" style="margin:0px 15px;line-height:40px">
                    <el-row>
                      <el-col :span="2">待选择列表</el-col>
                      <el-col :span="18">
                        <el-tag v-for="(item,index) in tagoption1" :key="index" type="info"
                          style="padding: 0 20px;margin-right:15px;text-align:center;text-indent: 0;cursor:pointer">
                          {{item.name}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="20" :offset="1" style="margin:20px 15px;line-height:40px">
                    <el-row>
                      <el-col :span="2">已选择列表</el-col>
                      <el-col :span="18">
                        <el-tag v-for="(item,index) in tagoptioncheck1" :key="index" closable type="info"
                          style="padding: 0 20px;margin-right:15px;text-align:center;text-indent: 0;cursor:pointer">
                          {{item.name}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </div>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="条件3" name="3">
            <div class="tagcheck">
              <el-row>
                <el-col :span="20" :offset="1" style="margin:20px 15px;line-height:40px">
                  <el-row>
                    <el-col :span="2">筛 选 类 型</el-col>
                    <el-col :span="18">
                      <el-select v-model="way3" placeholder="请选择">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <div v-if="way3">
                  <el-col :span="20" :offset="1" style="margin:0px 15px;line-height:40px">
                    <el-row>
                      <el-col :span="2">待选择列表</el-col>
                      <el-col :span="18">
                        <el-tag v-for="(item,index) in tagoption1" :key="index" type="info"
                          style="padding: 0 20px;margin-right:15px;text-align:center;text-indent: 0;cursor:pointer">
                          {{item.name}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="20" :offset="1" style="margin:20px 15px;line-height:40px">
                    <el-row>
                      <el-col :span="2">已选择列表</el-col>
                      <el-col :span="18">
                        <el-tag v-for="(item,index) in tagoptioncheck1" :key="index" closable type="info"
                          style="padding: 0 20px;margin-right:15px;text-align:center;text-indent: 0;cursor:pointer">
                          {{item.name}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </div>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="条件4" name="4">
            <div class="tagcheck">
              <el-row>
                <el-col :span="20" :offset="1" style="margin:20px 15px;line-height:40px">
                  <el-row>
                    <el-col :span="2">筛 选 类 型</el-col>
                    <el-col :span="18">
                      <el-select v-model="way4" placeholder="请选择">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <div v-if="way4">
                  <el-col :span="20" :offset="1" style="margin:0px 15px;line-height:40px">
                    <el-row>
                      <el-col :span="2">待选择列表</el-col>
                      <el-col :span="18">
                        <el-tag v-for="(item,index) in tagoption1" :key="index" type="info"
                          style="padding: 0 20px;margin-right:15px;text-align:center;text-indent: 0;cursor:pointer">
                          {{item.name}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="20" :offset="1" style="margin:20px 15px;line-height:40px">
                    <el-row>
                      <el-col :span="2">已选择列表</el-col>
                      <el-col :span="18">
                        <el-tag v-for="(item,index) in tagoptioncheck1" :key="index" closable type="info"
                          style="padding: 0 20px;margin-right:15px;text-align:center;text-indent: 0;cursor:pointer">
                          {{item.name}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </div>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="条件5" name="5">
            <div class="tagcheck">
              <el-row>
                <el-col :span="20" :offset="1" style="margin:20px 15px;line-height:40px">
                  <el-row>
                    <el-col :span="2">筛 选 类 型</el-col>
                    <el-col :span="18">
                      <el-select v-model="way5" placeholder="请选择">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <div v-if="way5">
                  <el-col :span="20" :offset="1" style="margin:0px 15px;line-height:40px">
                    <el-row>
                      <el-col :span="2">待选择列表</el-col>
                      <el-col :span="18">
                        <el-tag v-for="(item,index) in tagoption1" :key="index" type="info"
                          style="padding: 0 20px;margin-right:15px;text-align:center;text-indent: 0;cursor:pointer">
                          {{item.name}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="20" :offset="1" style="margin:20px 15px;line-height:40px">
                    <el-row>
                      <el-col :span="2">已选择列表</el-col>
                      <el-col :span="18">
                        <el-tag v-for="(item,index) in tagoptioncheck1" :key="index" closable type="info"
                          style="padding: 0 20px;margin-right:15px;text-align:center;text-indent: 0;cursor:pointer">
                          {{item.name}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </div>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="titl"> 范围描述</div>
      <div class="textare">
        <el-input :readonly="true" :autosize="{ minRows: 4, maxRows: 6}" type="textarea" v-model="desc"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    modal
  } from '@/config/api.js'
  export default {
    data() {
      return {
        dialogVisible: true,
        privinceCodeList: [],
        activeName: '1',
        wayname: '1',
        desc: '',
        tag1: '',
        way1: '',
        options1: [{
            value: '1',
            label: '业务类型'
          },
          {
            value: '2',
            label: '是否清真餐厅'
          },
          {
            value: '3',
            label: '营业模式'
          }
        ],
        tagoption1: [{
          'name': '堂食',
          id: '0'
        }, {
          'name': '外带',
          id: '1'
        }, {
          'name': '宅急送',
          id: '2'
        }, {
          'name': '甜品站',
          id: '3'
        }],
        tagoptioncheck1: [],
        tag1tree: [],

        tag2: '',
        way2: '',
        alltree: [],
        cityall: [],
        props: {
          label: 'label',
          children: 'fuck',
          isLeaf: 'leaf'
        },


        tag3: {
          code: '',
          name: ''
        },
        way3: '',
        tag3tree: [],

        tag4: {
          code: '',
          name: ''
        },
        way4: '',
        tag4tree: [],

        tag5: '',
        way5: '',

        tag6: '',
        diaData: []
      }
    },
    watch: {
      tag2(val) {
        this.$refs.alltreecheckref.filter(val);

      },
      tag1(val) {
        this.$refs.tree1.filter(val);
      }
    },
    methods: {
      //   loadNode(node,resolve){ 
      //    if(node.parent){    
      //       if(node.parent.label){
      //           if(node.level==3){
      //                 return resolve([]);  
      //           }
      //           else{
      //             this.cityall.forEach((a,b)=>{
      //              if(a.label==node.parent.label){
      //               a.children.forEach((v,g)=>{
      //                   if(node.key==v.id){
      //                     if(v.children.length>=1){
      //                        return resolve(this.alltree[b].children[g].children=v.children);  
      //                     }else{
      //                          return resolve([]);  
      //                     }

      //                   }
      //               })
      //            }
      //       })  }
      //       }
      //       else{
      //           this.cityall.forEach((a,b)=>{
      //           if(a.id==node.key){
      //                 return resolve( this.alltree[b].children=a.children);  
      //           }
      //       })
      //       }
      //     }
      //   },
      delIndexAll(node, resolve) {

      },
      //指定餐厅
      tag3treetableclick(val) {
        this.setData(val, 3)
      },
      //排除餐厅
      tag4treetableclick(val) {
        this.setData(val, 4)
      },
      checktag1tree(e) {
        this.setData(this.$refs.tree1.getCheckedNodes(), 1)
      },
      setData(data, les, contats, removeid) {
        //data 数据 les 类型 contats 直接赋值无需去重! removeida删除省份
        //添加type 显示类型
        data.forEach((a, b) => {
          a.type = les;
          if (les == 1 || les == 2) {
            a.way = a.label
          } else if (les == 3 || les == 4) {
            a.userGroupName = a.storeNameWithCnFull
          }
        })
        if (!contats) {
          // 过滤重复的
          this.diaData = this.diaData.filter(item => {
            return item.type !== les
          });
        }
        //删除 
        if (removeid) {
          this.diaData = this.diaData.filter(item => {
            return item.id !== removeid
          });
        } else {
          this.diaData = this.diaData.concat(data)
        }
      },
      unique(arr) {
        return arr.filter(function (item, index, arr) {
          return arr.indexOf(item, 0) === index;
        });
      },
      alltreecheck(e) {
        //console.log(this.$refs.alltreecheckref.getCheckedNodes(),e)
        if (e.parentName === null) {
          // 整个省变成一条数据  保留省份的id 
          // 万一是先部分在点击省份的话 要删除整个省份的信息
          // 当前省份是否有
          //no
          if (!this.privinceCodeList.includes(e.id) && this.$refs.alltreecheckref.getCheckedNodes()) {
            this.privinceCodeList.push(e.id);
            this.setData([e], 2, true)
          }
          //yes
          else {
            //若是取消
            this.privinceCodeList.forEach((a, b) => {
              if (a == e.id) {
                this.privinceCodeList.splice(b, 1)
              }
            })
            let arr = [];
            this.diaData.forEach((a, b) => {
              arr.push(a.id)
            })
            if (arr.includes(e.id)) {
              this.setData([e], 2, true, e.id)
            }
          }
        } else {
          console.log('非省份点击', e, this.$refs.alltreecheckref.getCheckedNodes())
          if (this.diaData.length == 0) {
            this.setData(this.$refs.alltreecheckref.getCheckedNodes(), 2)
          } else {
            this.diaData.forEach((a, b) => {
              //父级已经存在 this.diaData         
              if (a.label == e.parentName) {
                this.diaData.splice(b, 1);
                let data = this.$refs.alltreecheckref.getCheckedNodes().filter(item => {
                  return item.parentName == a.label
                })
                this.setData(data, 2)
              } else {
                this.setData(this.$refs.alltreecheckref.getCheckedNodes(), 2)
              }
            })
          }
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleClose() {
        this.$emit('changes', false)
      },
      tag1click(e) {
        if (this.tagoptioncheck1.length >= 1) {
          let arr = []
          this.tagoptioncheck1.forEach((a, b) => {
            arr.push(a.id)
          })
          if (!arr.includes(e.id)) {
            this.tagoptioncheck1.push(e)
          }
        } else {
          this.tagoptioncheck1.push(e)
        }
      },
      tag1close(e, v) {
        this.tagoptioncheck1.splice(v, 1)
      },
      circledel(e, type) {
        let num = ''
        let arr = []
        this.diaData.forEach((a, c) => {
          if (a.id == e.id) {
            num = c
          }
          if (a.type === 1 || a.type === 2) {
            arr.push(a)
          }
        })
        this.diaData.splice(num, 1);
        arr.splice(num, 1);
        if (type == 1) {
          this.checkDom(arr, 'tree1')
        } else if (type == 2) {
          this.checkDom(arr, 'alltreecheckref')
        }
      },
      checkDom(sameArr, name) {
        this.$nextTick(() => {
          this.$refs[name].setCheckedNodes(sameArr);
        })
      },
      tablechange(val) {},
      //营运市场
      getMarketWebList() {
        modal.getMarketWeb().then(res => {
          this.tag1tree = res.data.data;
        })
      },
      //行政区域
      getXZQHWebList() {
        modal.getXZQHWeb('').then(res => {
          this.cityall = JSON.parse(JSON.stringify(res.data.data))
          //   let parent = res.data.data.map((a, b) => {
          //     let obj = {};
          //     obj.id = a.id;
          //     obj.label = a.label;  
          //     obj.parentName = a.parentName;
          //     return obj
          //   })      
          this.alltree = res.data.data;

        })
      },
      //餐厅
      getStoreInfoWebList() {
        let data = {
          storeCode: '',
          storeName: ''
        }
        modal.getStoreInfoWeb(data).then(res => {
          this.tag3tree = res.data.data;
          this.tag4tree = JSON.parse(JSON.stringify(res.data.data));
        })
      },
      //城市
      getCityInfoWebList() {
        modal.getCityInfoWeb().then(res => {
          // console.log(res, 5)
        })
      }
    },
    mounted() {
      this.getMarketWebList() //1
      this.getXZQHWebList() //2
      this.getStoreInfoWebList() //3
      this.getCityInfoWebList() //5
      // this.getXZQHWebList() //6 
    }
  }

</script>
<style scoped>
  .sele /deep/ .el-dialog__body {
    padding: 0 20px;
    height: auto;
    overflow: hidden;
  }

  .main {
    width: 1160px;
    min-height: 300px;
    overflow: hidden;
  }

  .mainleft {
    width: 590px;
    min-height: 400px;
    float: left;
  }

  .mainright {
    float: right;
    width: 565px;
  }

  .mainrightheader {
    height: 40px;
    width: 100%;
    border-radius: 8px 8px 0 0;
    border: 1px solid #efefef;
    line-height: 40px;
    text-indent: 10px;
  }

  .mainrightheader2 {
    border-top: none;
    border-radius: 0
  }

  .treediv {
    height: 350px;
    width: 100%;
  }

  .tabletee {
    width: 100%;
    height: 362px;
  }

  .titl {
    margin: 10px auto;
    background: #ccc;
    text-indent: 10px;
    ;
    height: 30px;
    line-height: 30px;
  }

  .ways {
    min-height: 250px;
    width: 100%;
    overflow: hidden;
    ;
  }

  .textare {
    min-height: 110px;
    line-height: 30px;
    width: 100%;
  }

  .sele /deep/ .el-tabs__content {
    border: 1px solid #efefef;
  }

  .treedivhea {
    height: 40px;
    line-height: 40px;
    width: 100%;
  }

  .tagcheck {
    width: 100%;
    height: 200px;
  }

  .treename {
    height: 310px;
    overflow-y: scroll;
  }

  .treename::-webkit-scrollbar {
    width: 0;
    display: none;
  }

</style>
