// 1.先导入layout组建
import Layout from '@/layout'

// 创建路由
const fuzzyEvalutionRouter ={
    // 路由路径
    path:'/FuzzyEvalution',
    // 页面组件
    component:Layout,
    // children里面是子路由，children是个数组
    children:[
        {
            // 子路由路径
            path:'index',
            // 页面组件,就是具体的页面
            component: () => import('@/views/FuzzyEvalution/index'),
            // 通过子路由name属性确定显示哪个子路由
            name:'FuzzyEvalution',
            // 设置路由元信息，affix默认为false，如果设置为true,相应页面会固定在tags-view中
            meta:{
                title:'方案优选',
                icon:'解决方案',
                affix:false,
            }
        }
    ]
}

// 抛出路由才能被其他页面获取
export default fuzzyEvalutionRouter