import { instance } from "./instance";

export const getListDishService = () => {
   return instance.get("/dish");
};
