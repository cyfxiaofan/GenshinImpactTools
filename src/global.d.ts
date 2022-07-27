export declare namespace API {
  interface ILoginForm {
    username: string,
    password: string
  }
  interface IRole {
    administrator: boolean,
    desc: string,
    id: number,
    menu: Array<string>,
    name: string,
    rank: number
  }
  interface IParams { [key: string]: any }
  interface IPageParams { current?: number; pageSize?: number; }
  interface INewPageParams { page?: number; page_size?: number; }
  interface INewListResponse {
    count: number,
    next: string,
    previous: string,
    results: Array<{}>
  }
  interface IListResponse {
    data: Array<{}>,
    total: number
  }
  interface IMapProps {
    title?: string,
    width: string,
    height: string,
    center: Array<number>
  }
  interface IObject {
    [key: string]: any;
  }
}