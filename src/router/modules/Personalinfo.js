// 先导入布局组件
import Layout from '@/layout'

// 创建一个路由
const PersonalinfoRouter={
    // 设置路径
    path:'/Personalinfo',
    // 引入页面组件
    component:Layout,
    //设置子路由
    children:[
        {
            // 子路由路径
            path:'index',
            // 页面组件
            component:()=>import('@/views/Personalinfo/index'),
            // 通过子路由name属性确定显示哪个子路由
            name: 'Personalinfo',
            // 路由元信息，affix默认false，如果设置为true，那么它会固定在tags-view中。
            meta: { title: '个人中心',icon:'个人中心',  affix: false },
            // 不想在侧边栏显示就隐藏掉
            hidden:true,
        }
    ]
    
}

export default PersonalinfoRouter