import { ref } from 'vue'
import PageModal from '@/component/page-modal'

export function usePageModal(newCb, editCb) {
  const pageModalRef = ref()
  // console.log('pageModalRef', pageModalRef)
  const defaultInfo = ref({})
  const handleNewData = () => {
    // console.log('aa222aaa', pageModalRef.value)

    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      pageModalRef.value.title = '新增'
    }
    newCb && newCb()
  }
  const handleEditData = item => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      pageModalRef.value.title = '编辑'
    }
    editCb && editCb(item)
  }
  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
