export interface ICategory {
  id: number;
  name: string;
}

export interface IDish {
  price: number;
  id: number;
  name: string;
  image: string;
  categoryId: ICategory;
  status?: boolean;
}

export interface IRequestParams {
  page?: number;
  searchByName?: string;
  categoryId?: number;
}

export interface IDishRes {
  id?: number;
  name: string;
  image: File;
  price: number;
  category: number;
}
