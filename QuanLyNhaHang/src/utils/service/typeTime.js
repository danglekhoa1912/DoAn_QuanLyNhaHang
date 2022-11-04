import { instance } from "./instance";

export const getTypeTimeService = () => {
   return instance.get("order/typetime");
};

export const getTypeTimeByIdService = (id) => {
   return instance.get(`order/gettypetime?id=${id}`);
};
