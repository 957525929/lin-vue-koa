export const modalConfig = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '学生姓名',
      placeholder: '请输入学生姓名',
    },

    {
      field: 'studentNum',
      type: 'input',
      label: '学号',
      placeholder: '请输入学号',
    },
    {
      field: 'summary',
      type: 'input',
      label: '备注',
      placeholder: '请输入备注',
      textType: 'textarea',
      rows: '5',
    },
  ],
  colLayout: { span: 24 },
  itemStyle: {},
}
