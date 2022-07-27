const state = {
  recvMessage:''
}

const getters = {
  recvMessage : (state: { recvMessage: any; }) => state.recvMessage
}

const mutations = {
  recvMessage(state: { recvMessage: any; }, data: any) {
    // console.log(data);
    state.recvMessage = data
  }
}

const actions = {
  INIT_CONTENT({commit}: {commit: any}) {
    window.addEventListener("message", function(e:MessageEvent<any>){
      commit('recvMessage',e.data)
    });
  },
  IFMSG_SEND(_: any, data: any) {
    window.top!.postMessage(data, '*'); 
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}

