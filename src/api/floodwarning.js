import http from "@/utils/request";

export default {
    async queryFloodwarningResult(params) {
        return await http.post('/api/floodwarning/queryFloodwarningResult', params)
    },
    // 预警信息发布
    async warninginfo(params) {
        return await http.post('/api/floodwarning/warninginfo', params)
    },
}