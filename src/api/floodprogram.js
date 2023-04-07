import http from "@/utils/request";

export default {
    // 查询所有方案
    async queryallprogram() {
        return await http.post('/api/floodprogram/queryallprogram')
    },
    async fuzzyevalution(){
        return await http.post('/api/floodprogram/fuzzyevalution')
    },
    // 添加行数据
    async addrowdata(params){
        return await http.post('/api/floodprogram/addrowdata',params)
    },
    // 修改行数据
    async updaterowdata(params){
        return await http.post('/api/floodprogram/updaterowdata',params)
    },
    // 删除行数据
    async deleterowdata(params){
        return await http.post('/api/floodprogram/deleterowdata',params)
    },
}