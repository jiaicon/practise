/// <reference types="vite/client" />
interface ListData<d> {
  list: d[];
  total: number;
}

export namespace IResponse {
  export interface Response<d> {
    data: d,
    status: boolean;
  }
  export interface ResponseList<d> {
    data: d[],
    status: boolean;
  }
  export interface ResponsePageList<d> {
    data: ListData<d>,
    status: boolean;
  }
}
