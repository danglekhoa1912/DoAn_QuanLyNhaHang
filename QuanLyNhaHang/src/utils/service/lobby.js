import { instance } from "./instance";

export const getListLobbyService = () => {
   return instance.get("/wedding_hall");
};

export const getLobbyByIdService = (id) => {
   return instance.get(`/wedding_hall/${id}`);
};
