import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入layout
import Layout from '@/layout'

//引入其他页面
import rainfallRouter from './modules/rainfall'
import floodRouter from './modules/flood'
import authorityRouter from './modules/authority'
import hisresultsRouter from './modules/hisresults'
import profileRouter from './modules/Personalinfo'
import programRouter from './modules/program'
import mapRouter from './modules/map'
import fuzzyEvalutionRouter from './modules/FuzzyEvaluation'
import floodforecastRouter from './modules/floodforecast'
import floodWarningRouter from './modules/floodwarning'
import modelcaliRouter from './modules/modelcali'
import testRouter from './modules/test'


//constantRoutes 是静态路由，不需要动态权限判断，所有角色都可以访问
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: '首页', affix: true }
      }
    ]
  },
  profileRouter,
  rainfallRouter,
  floodRouter,
  modelcaliRouter,
  floodforecastRouter,
  fuzzyEvalutionRouter,
  floodWarningRouter,
  // authorityRouter,
  // hisresultsRouter,
  programRouter,
  // testRouter,
  // mapRouter,
]


//constantRoutes 是动态路由，需要动态权限判断，根据用户信息进行菜单控制显示
export const asyncRoutes = [
  // 导入页面路由
  // componentsRouter,
  // chartsRouter,
  // 404页面必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
