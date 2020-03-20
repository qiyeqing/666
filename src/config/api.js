import axios from './apire.js';

//日志
export const record = (pars) => {
  return axios.request({
    url: `/sys/log/getLog?requestTimeFrom=${pars.execTimeFrom}&requestTimeTo=${pars.execTimeTo}&userName=${pars.userName}&moduleName=${pars.moduleName}&current=${pars.current}&size=10`,
    method: 'get'
  })
}

//警报
const errerwarning = (par) => {
  return axios.request({
    url: `/sys/alert_config/getAlertConfigInfo?current=${par.current}&size=10&alertLevel=${par.level}&alertTarget=${par.target}&alertChannel=${par.way}`,
    method: 'get'
  })
}
//警报修改
const warningeit = (par) => {
  var data = new FormData()
  data.append('id', par.id);
  data.append('alertLevel', par.alertLevel);
  data.append('alertTarget', par.alertTarget);
  data.append('alertChannel', par.alertChannel);
  data.append('alertMessageTemplate', par.alertMessageTemplate);
  return axios.request({
    url: `/sys/alert_config/setAlertConfigInfo`,
    method: 'post',
    data
  })
}
//警报记录
const errerwarninghistory = (par) => {
  return axios.request({
    url: `/sys/alert_history/getAlertHistoryInfo?current=${par.current}&size=10&alertLevel=${par.level}&alertTarget=${par.target}&alertChannel=${par.way}&alertMessage=${par.content}&startTime=${par.startTime}&endTime=${par.endTime}`,
    method: 'get'
  })
}
//下游系统通知
export const stream = (pars) => {
  return axios.request({
    url: `/sys/notification_url/getNotificationUrlInfo?current=${pars.current}&size=10&name=${pars.name}`,
    method: 'get'
  })
}

//下游信息修改url
export const editurl = (pars) => {
  var data = new FormData()
  data.append('id', pars.id)
  data.append('url', pars.url)
  return axios.request({
    url: `/sys/notification_url/setNotificationUrlInfo`,
    method: 'post',
    data,
  })
}

//参数配置
export const parmas = (par) => {
  return axios.request({
    url: `/sys/config/getParamConfigInfo?current=${par.current}&size=10&key=${par.key}`,
    method: 'get',
  })
}
//参数配置修改
export const editparmas = (par) => {
  var data = new FormData()
  data.append('id', par.id)
  data.append('value', par.value)
  return axios.request({
    url: `/sys/config/setParamConfigInfo`,
    method: 'post',
    data,
  })
}


// 下拉框信息 /sys/dict_item/getAlertTargetInfo
// 报警目标
export const warperson = (par) => {
  return axios.request({
    url: `/sys/dict_item/getAlertTargetInfo`,
    method: 'get'
  })
}

// 报警途径
export const warway = (par) => {
  return axios.request({
    url: `/sys/dict_item/getAlertChannelInfo`,
    method: 'get'
  })
}
// 报警级别
export const warlevel = (par) => {
  return axios.request({
    url: `/sys/dict_item/getAlertLevelInfo`,
    method: 'get'
  })
}

//品牌查询 /sys/brand/selectBrandInfo
const BrandInfo = () => {
  return axios.request({
    url: `/sys/brand/selectBrandInfo`,
    method: 'get'
  })
}
//餐厅版本的info /sys/mission_administration/selectCity
const selectCity = (code) => {
  return axios.request({
    url: `/sys/mission_administration/selectCity?code=${code}`,
    method: 'get'
  })
}
// 市场查询 
const MarketInfo = (par) => {
  return axios.request({
    url: `/sys/market/selectMarketInfo?brandCode=${par.id}`,
    method: 'get'
  })
}
//权限表查询 
const RoleList = (par) => {
  return axios.request({
    url: `/sys/role/selectRolePermissionTree?roleId=${par.id}`,
    method: 'get'
  })
}
//权限表保存 
const RoleListSave = (data) => {
  return axios.request({
    url: `/sys/role/AssignPermissionsToRole`,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data,

  })
}

// 添加用户
const insertUserInfo = (par) => {
  var data = new FormData()
  data.append('emplId', par.emplId);
  data.append('employeeName', par.employeeName);
  data.append('employeeSex', par.employeeSex);
  data.append('emailAddr', par.emailAddr);
  data.append('password', par.password);
  return axios.request({
    url: `/sys/user/insertUserInfoWeb`,
    method: 'post',
    data
  })
}

// 用户组关联
export const linkUserGroup = (par) => {
  var data = new FormData()
  data.append('userCode', par.userCode);
  data.append('userGroupIds', par.userGroupIds);
  return axios.request({
    url: `/sys/user/linkUserGroupWeb`,
    method: 'post',
    data
  })
}

// 角色关联
export const linkRoleGroup = (par) => {
  var data = new FormData()
  data.append('userCode', par.userCode);
  data.append('roleCodes', par.roleCodes);
  return axios.request({
    url: `/sys/user/linkRoleGroupWeb`,
    method: 'post',
    data
  })
}

// 用户查询
const getUserInfo = (par) => {
  return axios.request({
    url: `/sys/user/getUserInfoWeb?emplId=${par.emplId}&emplName=${par.emplName}&userFlag=${par.loginType}&current=${par.current}&size=10`,
    method: 'get'
  })
}

// 用户编辑
const updateUserInfo = (par) => {
  var data = new FormData()
  data.append('guid', par.guid);
  data.append('employeeName', par.employeeName);
  data.append('employeeSex', par.employeeSex);
  data.append('emailAddr', par.emailAddr);
  data.append('password', par.password);
  return axios.request({
    url: `/sys/user/updateUserInfoWeb`,
    method: 'post',
    data
  })
}

// 用户删除
const deleteUserInfo = (par) => {
  var data = new FormData()
  data.append('guid', par.guid);
  return axios.request({
    url: `/sys/user/deleteUserInfoWeb`,
    method: 'post',
    data
  })
}

// 用户组关联查询
const getLinkUserGroup = (par) => {
  return axios.request({
   //
    url: `/sys/user/getLinkUserGroupWithoutIdWeb?guid=${par.guid}&businessUnit=${par.businessUnit}&userGroupName=${par.userGroupName}&marketName=${par.marketName}&current=${par.current}&size=5`,
    method: 'get'
  })
}

// 关联用户组的初始化 
const getLinkUserGroupWeb = (par) => {
  return axios.request({
    url: `/sys/user/getLinkUserGroupWeb?guid=${par.guid}&businessUnit=${par.businessUnit}&userGroupName=${par.userGroupName}&marketName=${par.marketName}&current=${par.current}&size=10`,
    method: 'get'
  })
}

// 关联 角色关联初始化
export const getLinkRole = (par) => {
  return axios.request({
    url: `/sys/user/getLinkRoleWeb?guid=${par.guid}&roleName=${par.roleName}&current=${par.current}&size=10`,
    method: 'get'
  })
}

//用户组初始化
const UserGroupInfo = (par) => {
  return axios.request({
    url: `/sys/user_group/selectUserGroupInfo?current=${par.current}&size=10&userGroupName=${par.userGroupName}&remarks=${par.remarks}&brandCode=${par.brandCode}&marketName=${par.marketName}`,
    method: 'get'
  })
}


//角色初始化 
const roleInfo = (par) => {
  return axios.request({
    url: `/sys/role/selectRoleInfo?current=${par.current}&size=10&roleName=${par.roleName}`,
    method: 'get'
  })
}
//新增角色
const insertRoleInfo = (par) => {
  var data = new FormData()
  data.append('roleName', par.roleName);
  data.append('remarks', par.remarks);
  return axios.request({
    url: `/sys/role/insertRoleInfo`,
    method: 'post',
    data
  })
}
//删除角色 
const deleteRoleInfo = (par) => {
  var data = new FormData()
  data.append('id', par.id);
  return axios.request({
    url: `/sys/role/deleteRoleInfo`,
    method: 'post',
    data
  })
}

//修改角色 /sys/role/updateRoleInfo
const updateRoleInfo = (par) => {
  var data = new FormData()
  data.append('id', par.id);
  data.append('roleName', par.roleName);
  data.append('remarks', par.remarks);
  return axios.request({
    url: `/sys/role/updateRoleInfo`,
    method: 'post',
    data
  })
}

//删除用户组 
const deleteUserGroupInfo = (par) => {
  var data = new FormData()
  data.append('id', par.id);
  return axios.request({
    url: `/sys/user_group/deleteUserGroupInfo`,
    method: 'post',
    data
  })
}
//用户组修改 
const updateUserGroupInfo = (par) => {
  var data = new FormData()
  data.append('userGroupName', par.userGroupName);
  data.append('remarks', par.remarks);
  data.append('brandCode', par.brandCode);
  data.append('marketCode', par.marketCode);
  data.append('id', par.id);
  return axios.request({
    url: `/sys/user_group/updateUserGroupInfo`,
    method: 'post',
    data
  })
}
//添加用户组
const insertUserGroupInfo = (par) => {
  var data = new FormData()
  data.append('userGroupName', par.userGroupName);
  data.append('remarks', par.remarks);
  data.append('brandCode', par.brandCode);
  data.append('marketCode', par.marketCode);
  return axios.request({
    url: `sys/user_group/insertUserGroupInfo`,
    method: 'post',
    data
  })
}

//用户组取消关联 
const unLinkUserGroupWeb = (par) => {
  var data = new FormData()
  data.append('guid', par.guid);
  return axios.request({
    url: `/sys/user/unLinkUserGroupWeb`,
    method: 'post',
    data
  })
}
// 角色关联取消
const unLinkRoleGroupWeb = (par) => {
  var data = new FormData()
  data.append('guid', par.guid);
  return axios.request({
    url: `/sys/user/unLinkRoleGroupWeb`,
    method: 'post',
    data
  })
}
//关联角色弹框 查询 
const getLinkRoleWithoutIdWeb = (par) => {
  return axios.request({
    url: `sys/user/getLinkRoleWithoutIdWeb?guid=${par.guid}&roleName=${par.roleName}&current=${par.current}&size=10`,
    method: 'get'
  })
}

// 用户关联 用户关联 

const getUserGroupUserInfo = (par) => {
  return axios.request({
    url: `/sys/user_group/getUserGroupUserInfo?current=${par.current}&size=10&empLID=${par.empLID}&userName=${par.userName}&userFlag=${par.userFlag}&userGroupId=${par.userGroupId}`,
    method: 'get'
  })
}

//用户关联用户关联的查询  
const getNoInThisGroupUserInfo = (par) => {
  return axios.request({
    url: `/sys/user_group/getNotInThisGroupUserInfo?userGroupId=${par.userGroupId}&current=${par.current}&size=10&empLID=${par.empLID}&userName=${par.userName}&userFlag=${par.userFlag}`,
    method: 'get'
  })
}
//用户的关联 确认按钮 
const addUserGroupRelation = (data) => {
  return axios.request({
    url: `/sys/user_group/addUserGroupRelation`,
    method: 'post',
    headers: { 'Content-Type': 'application/json'  },
    data
  })
}
// 用户的关联 删除按钮  
const deleteUserGroupUserInfo = (par) => {
  var data = new FormData()
  data.append('userId', par.userId);
  return axios.request({
    url: `/sys/user_group/deleteUserGroupUserInfo`,
    method: 'post',
    data
  })
}
// 用户的关联多个 删除按钮  
const deleteUserGroupUserInfoAll = (data) => {
  return axios.request({
    url: `/sys/user_group/batchDeleteUserGroupUserInfo`,
    method: 'post',
    headers: { 'Content-Type': 'application/json'  },
    data
  })
}
//系统页面
export const sys = {
  record,
  editurl,
  errerwarning,
  stream,
  parmas,
  editparmas,
  warningeit,
  errerwarninghistory,
  insertUserInfo,
  getUserInfo,
  getLinkUserGroup,
}
//下拉框的信息
export const seletinfo = {
  warperson,
  warway,
  warlevel,
  BrandInfo,
  MarketInfo,
  RoleList,
  selectCity
}
//用户页面
export const USER = {
  getUserInfo,
  insertUserInfo,
  updateUserInfo,
  deleteUserInfo,
  
  getUserGroupUserInfo,
  getNoInThisGroupUserInfo,
  addUserGroupRelation,
  deleteUserGroupUserInfo,
  deleteUserGroupUserInfoAll,
}
// 角色页面
export const ROLE = {
  roleInfo,
  insertRoleInfo,
  deleteRoleInfo,
  updateRoleInfo,
  RoleListSave,
  unLinkRoleGroupWeb,

  getLinkRole,
  getLinkRoleWithoutIdWeb,
  linkRoleGroup
  
}
//分组页面
export const GROUP = {
  UserGroupInfo,
  deleteUserGroupInfo,
  updateUserGroupInfo,
  insertUserGroupInfo,
  unLinkUserGroupWeb

  ,getLinkUserGroupWeb,
  linkUserGroup
}

const  getXZQHWeb=(name)=>{
  return axios.request({
    url: `sys/prescription/getXZQHWeb?zxqhName=${name}`,
    method: 'get'
  })
}

 const  getStoreInfoWeb=(par)=>{
  return axios.request({
    url: `sys/prescription/getStoreInfoWeb?storeCode=${par.storeCode}&storeName=${par.storeName}`,
    method: 'get'
  })
}
///
const  getCityInfoWeb=()=>{
  return axios.request({
    url: `sys/prescription/getCityInfoWeb`,
    method: 'get'
  })
}

const  getMarketWeb=()=>{
  return axios.request({
    url: `sys/prescription/getMarketWeb`,
    method: 'get'
  })
}
//添加配方范围
export const modal = {
  getXZQHWeb,
  getStoreInfoWeb,
  getCityInfoWeb,
  getMarketWeb
}
const  selectMenuProductInfo=(par)=>{
  return axios.request({
    url: `sys/menu_product/selectMenuProductInfo?current=${par.current}&size=10&productCode=${par.productCode}&productName=${par.productName}&isVirtualProductFlag=${par.isVirtualProductFlag}&brandCode=${par.brandCode}`,
    method: 'get'
  })
}

const  getMenuProductWeb=(id)=>{
  return axios.request({
    url: `sys/prescription/getMenuProductWeb?productCode=${id}`,
    method: 'get'
  })
}
///sys//
const  addVirtualProduct=(par)=>{
  var data = new FormData()
  data.append('productName', par.productName);
  return axios.request({
    url: `sys/menu_product/addVirtualProduct`,
    method: 'post',
    data
  })
}
export const produce = {
  selectMenuProductInfo,
  getMenuProductWeb,
  addVirtualProduct
}

// 餐厅配方下发履历 /sys/mission_administration/selectProductRecipeAutomatic
const  selectProductRecipeAutomatic=(par)=>{
  return axios.request({
    url: `/sys/mission_administration/selectProductRecipeAutomatic?startDate=${par.startDate}&endDate=${par.endDate}&brandCode=${par.brandCode}&productName=${par.productName}&templetName=${par.templetName}&current=${par.current}&size=10`,
    method: 'get',
  })
}
 // 下发餐厅列表
 const  selectProductRecipeAutomaticLook=(par)=>{
  return axios.request({
    url: `/sys/mission_administration/selectProductRecipeAutomaticLook?brandCode=${par.brandCode}&recipeCode=${par.recipeCode}&current=${par.current}&size=10`,
    method: 'get',
  })
}

// 餐厅配方版本 /sys/mission_administration/selectRecipeStoreVersion
const  selectRecipeStoreVersion=(par)=>{
  return axios.request({
    url: `/sys/mission_administration/selectRecipeStoreVersion?brandCode=${par.brandCode}&draftCode=${par.draftCode}&diningRoom=${par.diningRoom}&cityCode=${par.cityCode}&current=${par.current}&size=10&versions=${par.versions}`,
    method: 'get',
  })
}
// 产品信息 /sys/mission_administration/selectRecipeStoreProduct

const  selectRecipeStoreProduct=(par)=>{
  return axios.request({
    url: `/sys/mission_administration/selectRecipeStoreProduct?brandCode=${par.brandCode}&storeCode=${par.storeCode}&versions=${par.versions}&productCode=${par.productCode}&productName=${par.productName}&current=${par.current}&size=10`,
    method: 'get',
  })
}

//餐厅下发任务管理  /sys/mission_administration/selectRecipeIssueTask
const  selectRecipeIssueTask=(par)=>{
  return axios.request({
    url: `/sys/mission_administration/selectRecipeIssueTask?startDate=${par.startDate}&endDate=${par.endDate}&brandCode=${par.brandCode}&issueState=${par.issueState}&issueType=${par.issueType}&current=${par.current}&size=10`,
    method: 'get',
  })
}

export const task = {
  //履历下发
  selectRecipeIssueTask,
  selectProductRecipeAutomaticLook,
  //版本管理
  selectRecipeStoreVersion,
  selectRecipeStoreProduct,

 //任务管理
  selectProductRecipeAutomatic
}

//spbom初始化  2020-03-13 18:09:57
const selectSpbomProduct =(par)=>{
  return axios.request({
    url: `/sys/menu_product/selectSpbomProduct?current=${par.current}&size=10&spProductCode=${par.spProductCode}&spProductName=${par.spProductName}&startTime=${par.startTime}&endTime=${par.endTime}`,
    method: 'get',
  })
}
//物料是否一致
const checkCopyMaterial =(par)=>{
  return axios.request({
    url: `/sys/menu_product/checkCopyMaterial?spProductCode=${par.code}`,
    method: 'get',
  })
}
//物料信息 
const getLinkedOriginalMaterial =(par)=>{
  return axios.request({
    url: `/sys/menu_product/getLinkedOriginalMaterial?spProductCode=${par.code}`,
    method: 'get',
  })
}
//复制配方 /sys/menu_product/copyRecipeAndMaterial
const copyRecipeAndMaterial = (data) => {
  return axios.request({
    url: `/sys/menu_product/copyRecipeAndMaterial`,
    method: 'post',
    headers: { 'Content-Type': 'application/json'  },
    data
  })
} 
//初始话 复制列表 
const  getCopyableProductList=(par)=>{
  return axios.request({
    url: `sys/menu_product/getCopyableProductList?productCode=${par.productCode}&productName=${par.productName}&brandCode=${par.brandCode}`,
    method: 'get'
  })
}
//已复制列表  /sys/menu_product/getCopiedProductList?current=1&size=10
const  getCopiedProductList=(par)=>{
  return axios.request({
    url: `sys/menu_product/getCopiedProductList?current=${par}&size=10`,
    method: 'get'
  })
}
export const SP = {
  selectSpbomProduct,
  checkCopyMaterial,
  getLinkedOriginalMaterial,
  copyRecipeAndMaterial,
  getCopyableProductList,
  getCopiedProductList
}