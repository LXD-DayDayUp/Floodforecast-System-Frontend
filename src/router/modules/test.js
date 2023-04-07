// 引入layout组件
import Layout from '@/layout'

const testRouter = {
    // 路径
    path:'/Test',
    // 页面组件
    component:Layout,
    // 子路由
    children:[
        {
            // 子路由路径
            path:'index',
            // 页面组件
            component:()=>import('@/views/test/index'),
            // 子路由名字
            name:'Test',
            // 子路由元信息
            meta:{title:'TEST',icon:'测试',affix:false}
        }
    ]
}

export default testRouter