// 用户处理接口
import http from '@/utils/request'

// 登录
export async function login(data) {
  return await http.login("/api/user/login", data)
}
// 获取用户信息
export async function getInfo() {
  return await http.get("/api/sysUser/getInfo")
}
// 退出登录
export async function logout(param) {
  return await http.post("/api/sysUser/logout", param)
}
// 获取用户菜单信息
export async function getMenuList(){
  return await http.get("/api/sysUser/getMenuList")
}
