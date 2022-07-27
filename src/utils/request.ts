/* axoios 封装 */
import axios, { AxiosPromise } from "axios";
import store from "@/store";
import { ElNotification } from 'element-plus'
import router from '@/router'

// 通用错误状态码提示
const tips: any = {
  1: '服务请求超时，请检查您的网络！',
  404: '无效的请求！',
  500: '服务器内部错误',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  507: '服务器内部错误',

}

// 需要处理的 400 错误状态码
const tip_super: Array<number> = [400, 401, 402, 403]

class HTTP {
  request(params: any): AxiosPromise<any> {
    if (!params.method) {
      params.method = 'GET'
    }
    // create an axios instance
    const service = axios.create({
      baseURL: params.v ? store.state.baseUrl + params.v : store.state.baseUrl + store.state.apiVerson,
      timeout: 500000 // 请求超时时间
    });

    // 请求拦截器
    service.interceptors.request.use(
      (config: any) => {
        config.timeout = 500000
        return config;
      },
      (error: any) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    service.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: { response: { status: number; data: any; }; }) => {
        let err_code = 0;
        try {
          err_code = error.response.status
        } catch (error: any) {
          if (error.name === 'TypeError') {
            err_code = 1
          }
        }
        if (tip_super.indexOf(err_code) === -1) {
          this._deal_error(err_code)
        } else {
          this._deal_400_error(error.response.data)
        }
        return { ResponseError: true };
      }
    )
    return service(params)
  }

  _deal_400_error(res: { [s: string]: string; } | { [s: string]: Array<string>; }) {
    if (Object.values(res).length === 1) {
      let err_msg: any = '发生了一些错误!'

      if (typeof Object.values(res)[0] === 'string') {
        err_msg = Object.values(res)[0]

      } else {
        err_msg = typeof Object.values(res)[0][0] === 'string' ? Object.values(res)[0][0] : (Object.values(Object.values(res)[0])[0] as any)[0]
      }
      if (err_msg === 'Signature has expired.' || err_msg === 'Invalid signature.') {
        // 签名失效
        return this._deal_sign_exprited()
      }
      if (err_msg == 'Error decoding signature.') {
        // 签名 解析失败
        return this._deal_sign()
      }
      if (err_msg == 'User account is disabled.') {
        // 被封号
        return this._deal_disable()
      }
      if (err_msg == 'Invalid Authorization header. No credentials provided.') {
        return
      }
      console.log(err_msg);

      ElNotification({ title: '失败', message: err_msg, type: 'error' })
    } else if (Object.keys(res).indexOf('non_field_errors') !== -1) {
      ElNotification({ title: '失败', message: res.non_field_errors[0], type: 'error' })
    } else if (Object.keys(res).indexOf('message') !== -1) {
      ElNotification({ title: '失败', message: <string>res.message, type: 'error' })
    } else {
      let err_msg = '发生了一些错误!'
      if (typeof (Object.values(res)[0]) === 'string') {
        err_msg = Object.values(res)[0]
      } else {
        err_msg = Object.values(res)[0][0]
      }
      ElNotification({ title: '失败', message: err_msg, type: 'error' })
    }

  }

  _deal_error(error_code: string | number) {
    error_code = String(error_code)
    if (!error_code) {
      error_code = '1'
    }
    if (Object.keys(tips).indexOf(error_code) !== -1) {
      ElNotification({ title: '失败', message: tips[error_code] as string, type: 'error' })
    } else {
      // 特殊状态码处理
    }
  }

  // 签名失效或者无效签名方法
  _deal_sign_exprited() {
    store.commit('clearUserKey')
    router.push('/Login')
    ElNotification({ title: '失败', message: '登录失效，请重新登录！', type: 'error' })
  }
  // 签名无效，解析失败方法
  _deal_sign() {
    store.commit('clearUserKey')
    ElNotification({ title: '失败', message: '缓存失效，请重新登录！！', type: 'error' })
    setTimeout(() => {
      location.reload()
    }, 1000)
  }
  // 封号签名失效
  _deal_disable() {
    store.commit('clearUserKey')
    ElNotification({ title: '失败', message: '您的账号已被封禁！', type: 'error' })
    setTimeout(() => {
      location.reload()
    }, 1000)
  }

}


export default HTTP;