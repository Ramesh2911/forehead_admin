import API from "./api";
import {
  AUTH,
  CUSTOMERS,
  MODULES,
  PERMISSIONS,
  RETAILERS,
  SUBSCRIPTIONS
} from "./endpoints";

export const loginApi = (payload) => {
  return API.post(AUTH.LOGIN, payload);
};

export const logoutApi = () => {
  return API.post(AUTH.LOGOUT);
};

export const changePasswordApi = (payload) => {
  return API.put(AUTH.CHANGEPASSWORD, payload);
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

export const getAllSubscriptions = () => {
  return API.get(SUBSCRIPTIONS.LIST);
};

export const getSubscriptionsDetails = (id) => {
  return API.get(SUBSCRIPTIONS.DETAILS, {
    params: { id },
  });
};

export const getAllCustomers = () => {
  return API.get(CUSTOMERS.LIST);
};

export const getCustomerDetails = (id) => {
  return API.get(CUSTOMERS.DETAILS, {
    params: { id },
  });
};

export const getAllPermission = () => {
  return API.get(PERMISSIONS.LIST);
};

