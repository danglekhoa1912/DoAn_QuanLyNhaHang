import { instance } from "./instance";

export const getListCategoryService = () => {
   return instance.get("/category_dish");
};
