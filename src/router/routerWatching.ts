import { ElNotification } from "element-plus";
import { Router, RouteRecordRaw } from "vue-router";
import store from "../store";
// 路由守卫
class RouterWatching {

  public router: Router;
  public to: any;
  public from: any;

  constructor(router: Router) {
    this.router = router;
    router.afterEach((to, from) => {
      this.to = to;
      this.from = from;
      this.setNowurl();
      // this.initPermission();
    })
  }


  // 设置当前url
  setNowurl() {
    store.commit('changeNowurl', {
      name: this.to.name, path: this.to.path, meta: {
        showTop: this.to.meta.showTop === undefined ? true : this.to.meta.showTop,
        hasToken: this.to.meta.hasToken === undefined ? true : this.to.meta.hasToken
      }
    })
  }

  initPermission() {
    if (store.state.nowUrl.meta.hasToken) {
      if (store.state.userKey.token) {
        return
      }
      ElNotification({
        title: "失败",
        message: `请先登录！`,
        type: "error",
      });
      this.router.push(`/Login?redirect=${this.to.path}`)
    } else {
      return
    }
  }
}

export default RouterWatching