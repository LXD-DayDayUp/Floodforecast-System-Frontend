import http from "@/utils/request"

export default {
    // 查询当前所有用户信息
    async selectAllUserInfo(){
        return await http.post('/api/user/selectAllUserInfo')
    },
    // 根据用户userid查询用户信息
    async getUserInfoByUserid(params){
        return await http.post('/api/user/selectUserInfoByUserid',params)
    },
    // 修改当前用户信息
    async reviseUserinfoByUserid(params){
        return await http.post('/api/user/reviseUsinfoByUserid',params)
    },
    // 修改当前用户密码
    async reviseUserPass(params){
        return await http.post('/api/user/reviseUserPass',params)
    },
    // 根据用户id删除用户信息
    async deleteUserInfoByUserid(params){
        return await http.post('/api/user/deleteUserInfoByUserid',params)
    },
    // 验证用户名密码是否正确
    async vailUserPass(params){
        return await http.post('/api/user/valiUserPass',params)
    },
    // 修改用户管理数据行
    async updaterowdata(params){
        return await http.post('/api/user/updaterowdata',params)
    },
}