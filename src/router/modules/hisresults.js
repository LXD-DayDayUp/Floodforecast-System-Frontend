import Layout from '@/layout'

const hisresultsRouter = {
    // 路径
    path:'/Hisresults',
    // 页面组件
    component:Layout,
    // 子路由
    children:[
        {
            // 子路由路径
            path:'index',
            // 页面组件
            component:()=>import('@/views/hisresults/index'),
            // 子路由名字
            name:'Hisresults',
            // 子路由元信息
            meta:{title:'历史结果',icon:'历史结果',affix:false}
        }
    ]
}

export default hisresultsRouter