<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" style="padding-top: 2%">
      <el-card style="margin-bottom: 10px">
        <div class="header">
          <div class="title">学生列表</div>
        </div>

        <page-search
          :searchFormConfig="searchFormConfig"
          @resetBtnClick="handleResetClick"
          @queryBtnClick="handleQueryClick"
        ></page-search>
      </el-card>
      <!-- 表格 -->
      <el-card>
        <page-content
          ref="pageContentRef"
          :contentTableConfig="contentTableConfig"
          pageName="student"
          @newBtnClick="handleNewData"
          @editBtnClick="handleEditData"
        ></page-content>
      </el-card>

      <page-modal
        :defaultInfo="defaultInfo"
        ref="pageModalRef"
        pageName="student"
        :modalConfig="modalConfigRef"
      ></page-modal>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'

import PageSearch from '@/component/page-search'
import PageContent from '@/component/page-content'
import PageModal from '@/component/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
export default {
  components: {
    PageContent,
    PageSearch,
    PageModal,
  },
  setup() {
    // onMounted(() => {
    //   // getBooks()
    // })

    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const modalConfigRef = computed(() => {
      // const departmentItem = modalConfig.formItems.find(item => item.field === 'departmentId')
      // departmentItem.options = store.state.entireDepartment.map(item => {
      //   return { title: item.name, value: item.id }
      // })

      // const roleItem = modalConfig.formItems.find(item => item.field === 'roleId')
      // roleItem.options = store.state.entireRole.map(item => {
      //   return { title: item.name, value: item.id }
      // })
      return modalConfig
    })

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal()

    return {
      modalConfigRef,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      modalConfig,
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      // height: 30px;
      // line-height: 30px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
