import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => { require(['@/page/login/login'], resolve) }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => { require(['@/page/login/login'], resolve) }
    },
    {
      path: '/home',
      name: 'home',
      meta:{
        name:'首页',
        requireAuth:true
      },
      component: resolve => { require(['@/page/home/home'], resolve) },
         children: [
          
           {
            name:"productFormulation",
            path: "productFormulation",
            meta:{
              requireAuth:true
            },
            component: resolve => { require(['@/page/home/productFormulation'], resolve) }
             },
             
           {
            name:"productFormulationassociation",
            path: "productFormulationassociation",
            meta:{
              requireAuth:true
            },
            component: resolve => { require(['@/page/home/restaurantProductFormulaAssociation'], resolve) }
             },
             {
              name:"spbom",
              path: "spbom",
              meta:{
                requireAuth:true
              },
              component: resolve => { require(['@/page/compontents/spbom'], resolve) }
               }
      // 任务管理
           , {
            name:"taskforres",
            path: "restaurant",
            meta:{
              name:'餐厅配方下发履历',
              requireAuth:true
            },
            component: resolve => { require(['@/page/task/restaurant'], resolve) }
             },
             {
              name:"tasks",
              path: "tasks",
              meta:{
                name:'餐厅下发任务管理',
                requireAuth:true
              },
              component: resolve => { require(['@/page/task/task'], resolve) }
               },
               {
                name:"taskdetail",
                path: "taskdetail",
                meta:{
                  name:'产品信息',
                  requireAuth:true
                },
                component: resolve => { require(['@/page/task/productDetail'], resolve) }
                 },
             {
              name:"taskforver",
              path: "version",
              meta:{
                name:'餐厅配方版本',
                requireAuth:true
              },
              component: resolve => { require(['@/page/task/version'], resolve) }
               },
      // 角色管理 
         {
        name:"manageForUser",
        path: "manageUser",
        meta:{
          requireAuth:true
        },
        component: resolve => { require(['@/page/manageForUser/user'], resolve) }
         },
         {
          name:"manageRole",
          path: "manageRole",
          meta:{
            requireAuth:true
          },
          component: resolve => { require(['@/page/manageForUser/role'], resolve) }
           },
           {
            name:"manageGroupRole",
            path: "manageGroupRole",
            meta:{
              requireAuth:true
            },
            component: resolve => { require(['@/page/manageForUser/groupRole'], resolve) }
          },
    // 系统管理
    {
      name:"manageJournal",
      path: "manageJournal",
      meta:{
        requireAuth:true
      },
      component: resolve => { require(['@/page/setting/journal'], resolve) }
    },{
      name:"manageParams",
      path: "manageParams",
      meta:{
        requireAuth:true
      },
      component: resolve => { require(['@/page/setting/parmas'], resolve) }
    },{
      name:"manageWarning",
      path: "manageWarning",
      meta:{
        requireAuth:true
      },
      component: resolve => { require(['@/page/setting/warning'], resolve) }
    },{
      name:"manageRecord",
      path: "manageRecord",
      meta:{
        requireAuth:true
      },
      component: resolve => { require(['@/page/setting/record'], resolve) }
    },,{
      name:"manageStream",
      path: "manageStream",
      meta:{
        requireAuth:true
      },
      component: resolve => { require(['@/page/setting/stream'], resolve) }
    },

    //单独页面
    {
      name:"productList",
      path: "productList",
      meta:{
        requireAuth:true
      },
      component: resolve => { require(['@/page/compontents/list'], resolve) }
       },
       {
        name:"productHistory",
        path: "productHistory",
        meta:{
          requireAuth:true
        },
        component: resolve => { require(['@/page/compontents/history'], resolve) }
         },
         {
          name:"productDetail",
          path: "productDetail",
          meta:{
            requireAuth:true
          },
          component: resolve => { require(['@/page/compontents/detail'], resolve) }
           },
           {
            name:"productMain",
            path: "productMain",
            meta:{
              requireAuth:true
            },
            component: resolve => { require(['@/page/compontents/main'], resolve) }
             },  
     ]
    },
  ]
})
