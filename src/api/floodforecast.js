import http from "@/utils/request";

export default {
    // 根据条件获取实测流量和模拟流量
    async getMqAndCq(params) {
        return await http.post('/api/modelcaliresult/getMqAndCq', params)
    },

}