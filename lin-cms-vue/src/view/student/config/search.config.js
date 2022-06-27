export const searchFormConfig = {
  labelWidth: '120px',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '学生名称',
      placeholder: '请输入学生名称',
    },
    {
      field: 'studentNum',
      type: 'input',
      label: '学号',
      placeholder: '请输入学号',
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange',
      },
    },
  ],
}
