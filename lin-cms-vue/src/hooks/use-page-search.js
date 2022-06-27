import { ref } from 'vue'
// import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = queryInfo => {
    pageContentRef.value?.getPageData(queryInfo)
    // console.log(' pageContentRef.value', pageContentRef.value)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
