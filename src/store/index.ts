import { createStore } from "vuex";
import mutations from './mutations'
import config from '../../config'
import iframemsg from './iframemsg'
import api from "@/api";


export default createStore({
  state: {
    baseUrl: config.baseUrl,
    apiVerson: config.verson,
    gdTk: config.gdTk,
    slot: 'sesFront',
    inputValue: '',
    showTop: true,
    oneTap: '',
    twoTap: '',
    loading: true,
    theme:'light',
    nowUrl: {
      name: '',
      path: '',
      meta: {
        showTop: false,
        hasToken: false
      },
    }
  },
  mutations,
  modules:{
    iframemsg
  }
})