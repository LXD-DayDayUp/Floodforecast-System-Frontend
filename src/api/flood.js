import http from "@/utils/request";

// 方法需要抛出后外界才可以接受
export default {
    // 查询所有洪水信息
    async selectAllFlood(){
        return await http.post('/api/flow/selectAllFlow')
    },
    // 根据起止时间查询洪水数据
    async selectFloodByDate(params){
        return await http.post('/api/flow/selectAllFlowByDate',params)
    },
    // 修改洪水数据
    async reviseflood(params){
        return await http.post('/api/flow/reviseflow',params)
    },
    // 删除洪水数据
    async deleteflood(params){
        return await http.post('/api/flow/deleteflow',params)
    },
    // 新增洪水数据
    async addflood(params){
        return await http.post('/api/flow/addflow',params)
    },
}