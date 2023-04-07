import Layout from '@/layout'

const mapRouter = {
    path: '/map',
    component: Layout,
    children: [
        {
            path: 'index',
            component: () => import('@/views/map/index'),
            name: 'map',
            meta: { title: 'Map', icon: 'documentation', affix: false }
        }
    ]
}
export default mapRouter