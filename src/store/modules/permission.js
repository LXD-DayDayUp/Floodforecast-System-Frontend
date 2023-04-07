// 导入路由脚本文件中的属性
import { asyncRouters,constantRoutes } from '@/router'
// 导入获取菜单数据的方法
import { getMenuList } from '@/api/user'
// 导入Layout组件
import Layout from '@/layout'

/**
 * 判断当前用户是否拥有该角色下的菜单信息
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 过滤出所有拥有权限的菜单信息
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    // 用hasPermission判断是否拥有相应的权限
    if (hasPermission(roles, tmp)) {
      // 获取该路由对应的组件
      const component = tmp.component
      // 判断是否有相应的根组件
      if (route.component) {
        // 判断是否有根组件
        if (component === 'Layout') {
          tmp.component = Layout
        } else {
          //  获取对应的组件信息
          // ！！！！！！！！！！！！！！！！！！！！动态路由页面不跳转是因为没有   require   ！！！！！！！！！！！！！！！！！！！！
          tmp.component = (resolve) => require([`@/views${component}`],resolve)
        }
      }
      // 判断是否有子菜单
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  // 路由
  routes: [],
  // 添加路由
  addRoutes: []
}

const mutations = {
  // 将路由信息保存到store当中（VUEX中）
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // 合并静态路由和动态路由
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  /**
   * 动态生成路由
   * @param {*} param0 
   * @param {*} roles 
   * @returns 
   */
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      // 发送查询菜单数据的请求
      getMenuList().then(res => {
        console.log(res);
        // 存放对应权限的路由信息
        let accessedRoutes
        // 判断状态码是否为200，如果是200则表示请求成功
        if (res.code === 200) {
          accessedRoutes = filterAsyncRoutes(res.data, roles)
        }
        // 将路由信息保存到store当中
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
