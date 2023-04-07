import Layout from '@/layout'

const rainfallRouter = {
    path: '/Rainfall',
    component: Layout,
    children: [
        {
            path: 'index',
            component: () => import('@/views/rainfall/index'),
            name: 'Rainfall',
            meta: { title: '降雨管理', icon: '降雨量', affix: false }
        }
    ]
}
export default rainfallRouter