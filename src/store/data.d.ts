declare namespace Vuex {
  interface Store {
    baseUrl: string,
    apiVerson: string,
    gdTk: string,
    slot: string,
    theme: string,
    showTop: boolean,
    oneTap: string,
    twoTap: string,
    nowUrl: InowUrl,
    inputValue: string,
    loading: boolean,
  }

  interface InowUrl {
    name: string,
    path: string,
    meta: any
  }

  interface IChildrenMenuitem {
    id: number,
    name: string,
    path: string,
  }

  interface IMenuitem {
    id: number,
    name: string,
    path: string,
    children: (IChildrenMenuitem)[]
  }

  interface UserKey {
    token: string,
    username: string,
    name: string,
    mobile: string,
    administrator: boolean,
    menu: (IMenuitem)[]
  }
}