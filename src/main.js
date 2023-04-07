// 入口文件，加载组件，初始化
import VueAMap from 'vue-amap';

import Vue from 'vue'

import Cookies from 'js-cookie'

import myconfirm from './utils/myconfirm'// 导入封装信息提示框组件脚本

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

// 全局引入echarts
import * as echarts from 'echarts'


import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.prototype.$myconfirm=myconfirm

Vue.prototype.$echarts=echarts

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

 
Vue.use(VueAMap);
 // 初始化高德地图的 key 和插件
VueAMap.initAMapApiLoader({
  key: "683b36c9de26224053b6179e9bd0a724", // "key"
  plugin: [
    'AMap.Autocomplete', // 输入提示插件
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView', // 地图鹰眼插件
    'AMap.ToolBar', // 地图鹰眼插件
    'AMap.MapType', // 地图类型切换插件，可用于切换卫星地图
    'AMap.PolyEditor', // 多边形编辑器，绘制和编辑折现
    'AMap.CircleEditor', // 圆编辑插件
    'AMap.Geolocation', // 定位控件，用来获取和展示用户主机所在的经纬度位置
    'AMap.Geocoder' // 逆地理编码,通过经纬度获取地址所在位置详细信息
    // 按实际需求添加插件
  ],
  v: '1.4.4', // amap版本（默认1.4.4）
  // uiVersion: '1.0' // 地图ui版本（忽略，就是不配置）
});
 
//高德的安全密钥
window._AMapSecurityConfig = {
	securityJsCode:"217765126ff90c7989c03bce4eabb2b4" // "安全密钥",
}

