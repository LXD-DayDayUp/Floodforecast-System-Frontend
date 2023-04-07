import http from "@/utils/request";

export default {
    // 查询方案
    async queryprogram(params) {
        return await http.post('/api/modelcaliresult/queryprogram', params)
    },

    // 根据条件获取实测流量和模拟流量
    async getMqAndCq(params) {
        return await http.post('/api/modelcaliresult/getMqAndCq', params)
    },

    // 查询所有方案
    async queryallprogram(params) {
        return await http.post('/api/modelcaliresult/queryallprogram', params)
    },

    // 修改行数据
    async updaterowdata(params){
        return await http.post('/api/modelcaliresult/updaterowdata',params)
    },
    // 删除行数据
    async deleterowdata(params){
        return await http.post('/api/modelcaliresult/deleterowdata',params)
    },
}