const __AccessToken__ = 'AccessToken'

export default {
  setInputValue(state: Vuex.Store, data: string) {
    state.inputValue = data
  },
  setLoading(state: Vuex.Store, data: boolean) {
    state.loading = data
  },
  changeNowurl(state: Vuex.Store, data: Vuex.InowUrl) {
    state.nowUrl = data
  },
}