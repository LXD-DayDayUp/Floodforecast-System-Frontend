import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// 使用Vuex插件
Vue.use(Vuex)

// 获取store目录的下的modules目录的所有文件
const modulesFiles = require.context('./modules', true, /\.js$/)

// 遍历上述文件
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  //将每个文件注册为文件名对应的模块
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
