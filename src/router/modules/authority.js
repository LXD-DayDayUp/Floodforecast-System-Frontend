import Layout from '@/layout'

const authorityRouter = {
    // 路径
    path:'/Authority',
    // 页面组件
    component:Layout,
    // 子路由
    children:[
        {
            // 子路由路径
            path:'index',
            // 页面组件
            component:()=>import('@/views/authority/index'),
            // 子路由名字
            name:'Authority',
            // 子路由元信息
            meta:{title:'权限管理',icon:'email',affix:false}
        }
    ]
}

export default authorityRouter