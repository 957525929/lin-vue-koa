/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Common {
  async getPageListData(url, data) {
    const res = await get(url, data)
    return res
  }
  async createListData(url, data) {
    return _axios({
      method: 'post',
      url: url,
      data,
    })
  }
  async updateListData(url, id, data) {
    const res = await put(`${url}/${id}`, data)
    return res
  }
  async deletePageData(url, id) {
    const res = await _delete(`${url}/${id}`)
    return res
  }
}

export default new Common()
