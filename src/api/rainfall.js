import http from "@/utils/request"

export default {
    // 查询降雨信息
    async selectAll() {
        return await http.post('/api/rainfall/selectAll')
    },
    // 根据起止时间查询降雨数据
    async selectAllByDate(params){
        return await http.post('/api/rainfall/selectAllByDate',params)
    },
    // 修改降雨数据
    async reviserainfall(params){
        return await http.post('/api/rainfall/reviserainfall',params)
    },
    // 删除降雨数据
    async deleterainfall(params){
        return await http.post('/api/rainfall/deleterainfall',params)
    },
    // 新增降雨数据
    async addrainfall(params){
        return await http.post('/api/rainfall/addrainfall',params)
    },
}
