import http from "@/utils/request";


export default{
    // 查询率定结果
    async queryCaliResults(params){
        return await http.post('/api/gapsopar/queryAllParByFactor',params) 
    },
    // 根据参数查询实测流量与模拟流量
    async queryMqAndCq(params){
        return await http.post('/api/gapsopar/queryMqAndCq',params)
    },
    //将率定后的结果存入数据库
    async storeModelCaliResult(params){
        return await http.post('/api/gapsopar/storeModelCaliResult',params)
    },
    // 修改行数据
    async updaterowdata(params){
        return await http.post('/api/gapsopar/updaterowdata',params)
    }
}