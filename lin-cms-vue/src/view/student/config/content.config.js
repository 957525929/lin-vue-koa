export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '学生姓名' },
    { prop: 'studentNum', label: '学号' },
    { prop: 'summary', label: '备注' },
    {
      prop: 'create_time',
      label: '创建时间',
      slotName: 'createAt',
    },

    { label: '操作', slotName: 'handler' },
  ],
  showIndexColumn: true,
  showSelectColumn: true,
}
