const stuRouter = {
  route: null,
  name: null,
  title: '学生',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/student/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '学生列表',
      type: 'view',
      name: 'BookCreate',
      route: '/student/index',
      filePath: 'view/student/index.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default stuRouter
