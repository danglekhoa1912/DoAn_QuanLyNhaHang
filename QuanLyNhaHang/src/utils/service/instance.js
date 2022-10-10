import axios from "axios";

export const instance = axios.create({
   baseURL: "https://633804d3132b46ee0be8e760.mockapi.io/",
   timeout: 1000,
});
