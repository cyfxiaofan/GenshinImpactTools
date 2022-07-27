//  Api 集中管理
import { API } from '@/global'
import HTTP from '@/utils/request'

class CommonApi extends HTTP {
  // 登录
  GetInfo(params: API.IParams) { return this.request({ url: '/system/ys/get_infos', method: 'GET', params }) }
  // 上传
  UploadList(data: API.IParams) { return this.request({ url: '/system/ys/get_list/', method: 'POST', data }) }


}



export default new CommonApi()