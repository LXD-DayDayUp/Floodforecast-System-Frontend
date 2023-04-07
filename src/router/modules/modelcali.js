import Layout from '@/layout'

const modelcaliRouter = {
    path: '/Modelcali',
    component: Layout,
    meta:{
        title:"模型率定",
        icon:"模型率定",
    },
    children: [
        {
            path: 'Parcali',
            component: () =>import('@/views/modelcali/Parcali/index'),
            name:'Parcali',
            meta:{
                title:'参数率定',
                icon:'参数率定',   
                affix:false,
            }
        },
        {
            path: 'Parvali',
            component: () =>import('@/views/modelcali/Parvali/index'),
            name:'Parvali',
            meta:{
                title:'参数验证',
                icon:'参数验证',   
                affix:false,
            }
        }
    ]
}

export default modelcaliRouter