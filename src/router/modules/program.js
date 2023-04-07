import Layout from '@/layout'

const programRouter = {
    //路由路径
    path: '/program',
    //设置页面组件
    component: Layout,
    meta:{
        title:"方案管理",
        icon:"方案管理",
    },
    //设置子路由
    children: [
        {
            //子路由路径
            path: 'Model',
            //设置具体页面
            component: () => import('@/views/program/Model/index'),
            //通过name属性确定子路由
            name: 'Model',
            //设置路由元信息
            meta: { title: '模型率定方案', icon: "方案管理", affix: false }
        },
        {
            //子路由路径
            path: 'Reservoir',
            //设置具体页面
            component: () => import('@/views/program/Reservoir/index'),
            //通过name属性确定子路由
            name: 'Reservoir',
            //设置路由元信息
            meta: { title: '水库调度方案', icon: "方案管理", affix: false }
        }
    ]
}

export default programRouter