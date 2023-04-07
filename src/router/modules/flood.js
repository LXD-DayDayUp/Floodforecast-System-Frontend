import Layout from '@/layout'

const floodRouter = {
    // 路径
    path: '/Flood',
    // 页面组件
    component: Layout,
    // children嵌套子路由
    children: [
        {
            // 子路由路径
            path: 'index',
            // 页面组件
            component: () => import('@/views/flood/index'),
            // 通过子路由name属性确定显示哪个子路由
            name: 'Flood',
            // 路由元信息，affix默认false，如果设置为true，那么它会固定在tags-view中。
            meta: { title: '洪水管理', icon: '洪水', affix: false }
        }
    ]
}

export default floodRouter