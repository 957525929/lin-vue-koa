import * as types from './mutation-type'
import Common from '@/model/common'
import { ElMessage } from 'element-plus'

export default {
  setUserAndState({ commit }, user) {
    commit(types.SET_USER, user)
    commit(types.SET_LOGGED_IN, true)
  },

  loginOut({ commit }) {
    localStorage.clear()
    commit(types.REMOVE_LOGGED_IN, false)
  },

  readMessage({ commit }, message) {
    commit(types.REMOVE_UNREAD_MESSAGE, message.id)
    commit(types.MARK_READ_MESSAGE, message)
  },

  async getPageListAction({ commit }, payload) {
    //1.获取pageUrl
    // console.log(payload)
    const pageName = payload.pageName
    const pageUrl = `/v1/${pageName}`

    //2.对页面发生请求
    const pageResult = await Common.getPageListData(pageUrl, payload.queryInfo)
    // console.log('pageResult', pageResult)
    // const { list, totalCount } = pageResult.data
    const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
    commit(`change${changePageName}List`, pageResult)
    // commit(`change${changePageName}Count`, totalCount)
  },
  async deletePageDataAction({ dispatch }, payload) {
    // 1.获取pageName和id
    // pageName -> /users
    // id -> /users/id
    const { pageName, id } = payload
    const pageUrl = `/v1/${pageName}`

    // 2.调用删除网络请求
    const res = await Common.deletePageData(pageUrl, id)
    ElMessage.success(`${res.message}`)
    // 3.重新请求最新的数据
    dispatch('getPageListAction', {
      pageName,
      queryInfo: {
        offset: 0,
        size: 10,
      },
    })
  },

  async createPageDataAction({ dispatch }, payload) {
    // 1.创建数据的请求
    const { pageName, newData } = payload
    console.log('newData', newData)
    console.log('pageName', pageName)
    const pageUrl = `/v1/${pageName}`
    const res = await Common.createListData(pageUrl, newData)
    ElMessage.success(`${res.message}`)
    // 2.请求最新的数据
    dispatch('getPageListAction', {
      pageName,
      queryInfo: {
        offset: 0,
        size: 10,
      },
    })
  },

  async editPageDataAction({ dispatch }, payload) {
    // 1.编辑数据的请求
    const { pageName, editData, id } = payload
    // console.log(editData)
    const pageUrl = `/v1/${pageName}`
    const res = await Common.updateListData(pageUrl, id, editData)
    ElMessage.success(`${res.message}`)
    // 2.请求最新的数据
    dispatch('getPageListAction', {
      pageName,
      queryInfo: {
        offset: 0,
        size: 10,
      },
    })
  },
}
