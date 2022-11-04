import { instance } from "./instance";

export const getListCategoryService = () => {
   return instance.get("order/dish/getcate");
};
