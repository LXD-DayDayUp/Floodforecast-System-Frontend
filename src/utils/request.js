import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from "qs"

// Axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 响应超时时间
})

// 请求前拦截
service.interceptors.request.use(
  config => {
    // 判断store中是否存在token
    if (store.getters.token) {
      // 读取token信息，将token添加到headers头部信息中
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应时拦截
service.interceptors.response.use(
  response => {
    // 获取后端返回的数据
    const res = response.data
    if (res.code !== 200) {
      Message.error({
        message: res.message|| 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 500 || res.code === 600 || res.code === 700) {
        MessageBox.confirm('账户已过期，请重新登录', '系统提示', {
          confirmButtonText: '登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message.error({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
const http = {
  /**
   * 
   * @param {*} url 请求路径
   * @param {*} params 请求参数
   * @returns 返回值
   */
  // 提交数据
  post(url, params) {
    return service.post(url, params, {
      transformRequest: [(params => {
        return JSON.stringify(params)
      })],
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }, 
  // 更新数据
  put(url, params) {
    return service.put(url, params, {
      transformRequest: [(params) => {
        return JSON.stringify(params)
      }],
      headers: { 'Content-Type': 'application/json' }
    })
  },
  // 获取数据
  get(url, params) {
    return service.get(url, {
      params: params, 
      paramsSerializer: (params) => {
        return qs.stringify(params)
      }
    })
  },
  getRestApi(url, params) {
    let _params
    if (Object.is(params, undefined || null)) { _params = '' } else {
      _params = '/'
      for (const key in params) {
        console.log(key)
        console.log(params[key])
        if (params.hasOwnProperty(key) 
            && params[key] !== null 
            && params[key] !== ''
            ) {
          _params += `${params[key]}/`
        }
      }
      _params = _params.substr(0, _params.length - 1)
    }
    if (_params) {
      return service.get(`${url}${_params}`)
    } else {
      return service.get(url)
    }
  },
  // 删除数据
  delete(url, params) { 
    let _params 
    if (Object.is(params, undefined || null)) { 
      _params = '' 
    } else { 
      _params = '/'
      for (const key in params) {
        if (params.hasOwnProperty(key) 
        && params[key] !== null 
        && params[key] !== '') { 
          _params += `${params[key]}/` 
        } 
      }
      _params = _params.substr(0, _params.length - 1) 
    }if (_params) { 
      return service.delete(`${url}${_params}`)
      .catch(err => { 
        message.error(err.msg) 
        return Promise.reject(err) 
      }) 
    } else { 
      return service.delete(url).catch(err => { 
        message.error(err.msg) 
        return Promise.reject(err) 
      }) 
    } 
  },
  // 上传数据
  upload(url, params) { 
    return service.post(url, params, { 
      headers: { 'Content-Type': 'multipart/form-data' 
    }
  }) 
},
  login(url, params) {
    return service.post(url, params, {
      transformRequest: [(params => {
        return qs.stringify(params)
      })],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}

export default http
