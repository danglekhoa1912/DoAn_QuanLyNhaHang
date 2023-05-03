export interface ISelectItem {
  id: number;
  label: string;
  value: number;
  disabled?: boolean;
}

export interface ISearchParam {
  page?: number;
  searchByName?: string;
}

export interface IRoute {
  label: string;
  path: string;
  element: JSX.Element;
}

export enum SORT_ENUM {
  asc = 'asc',
  desc = 'desc',
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ColumnData {
  id:
    | ColumnId.ORIDINALNUM
    | ColumnId.CREATED
    | ColumnId.PUBLISHED
    | ColumnId.TITLE
    | ColumnId.STATUS;

  label: string;
  minWidth?: number;
  align?: 'center' | 'left' | 'right';
  format?: (value: number) => string;
}

export enum ColumnId {
  ORIDINALNUM = 'ordinalNum',
  TITLE = 'title',
  STATUS = 'status',
  THUMNAIL = 'thumImage',
  CREATED = 'createdTime',
  PUBLISHED = 'publishedTime',
}

export enum STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface ITableData {
  data: RowData[];
  itemCount: number;
  pageCount: number;
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  size: number;
}

export interface RowData {
  id: number;
  ordinalNum: number;
  title: string;
  status: number;
  thumbnailImage: string;
  createdTime: Date;
  publishedTime: Date;
}
