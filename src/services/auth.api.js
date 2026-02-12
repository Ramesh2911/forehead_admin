import API from "./api";
import {
  AUTH,
  MODULES,
  RETAILERS
} from "./endpoints";

export const loginApi = (payload) => {
  return API.post(AUTH.LOGIN, payload);
};

export const logoutApi = () => {
  return API.post(AUTH.LOGOUT);
};

export const getAllRetailers = () => {
  return API.get(RETAILERS.LIST);
};

export const getRetailerDetails = (id) => {
  return API.get(RETAILERS.DETAILS, {
    params: { id },
  });
};

export const getAllModules = () => {
  return API.get(MODULES.LIST);
};

