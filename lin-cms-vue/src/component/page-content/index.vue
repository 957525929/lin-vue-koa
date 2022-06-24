<template>
  <div class="page-content">
    <jhe-table :listData="dataList" :listCount="dataCount" v-bind="contentTableConfig" v-model:page="pageInfo">
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="medium" @click="handleNewClick">新建用户</el-button>
      </template>
      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.create_time) }}</span>
      </template>
      <!--
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template> -->
      <template #handler="scope">
        <div class="handle-btns">
          <el-button plain size="small" type="primary" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-button plain size="small" type="danger" @click="handleDeleteClick(scope.row)">删除</el-button>
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </jhe-table>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'

import JheTable from '@/base-ui/table'

export default defineComponent({
  components: {
    JheTable,
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // watch(pageInfo, () => getPageData())

    // 2.发送网络请求
    const getPageData = queryInfo => {
      store.dispatch('getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo,
        },
      })
      // console.log('store', store.dispatch('getPageListAction'))
    }

    getPageData()
    // 3.从vuex中获取数据
    const dataList = computed(() => store.getters.pageListData(props.pageName))

    // const dataCount = computed(() => store.getters[`system/pageListCount`](props.pageName))
    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(item => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })
    // 5.删除/编辑/新建操作
    const handleDeleteClick = item => {
      console.log(item)
      store.dispatch('deletePageDataAction', {
        pageName: props.pageName,
        id: item.id,
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = item => {
      console.log('item', item)

      emit('editBtnClick', item)
    }

    return {
      dataList,
      // getPageData,
      // dataCount,
      pageInfo,
      otherPropSlots,
      // isCreate,
      // isUpdate,
      // isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
    }
  },
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  /* border-top: 20px solid #f5f5f5; */
}
</style>
