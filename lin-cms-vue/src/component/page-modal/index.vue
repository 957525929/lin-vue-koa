<template>
  <div class="page-modal">
    <el-dialog :title="title" v-model="dialogVisible" width="30%" center destroy-on-close>
      <Jhe-form v-bind="modalConfig" v-model="formData"></Jhe-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确 定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import JheForm from '@/base-ui/form'

export default defineComponent({
  components: {
    JheForm,
  },
  props: {
    modalConfig: {
      type: Object,
      required: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const dialogVisible = ref(false)
    const title = ref('新增用户')
    const formData = ref({})

    watch(
      () => props.defaultInfo,
      newValue => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      },
    )

    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑

        store.dispatch('editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value },
          id: props.defaultInfo.id,
        })
      } else {
        // 新建

        store.dispatch('createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value },
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handleConfirmClick,
      title,
    }
  },
})
</script>

<style scoped></style>
