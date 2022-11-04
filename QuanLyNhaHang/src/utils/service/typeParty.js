import { instance } from "./instance";

export const getTypePartyService = () => {
   return instance.get("order/typeparty");
};
