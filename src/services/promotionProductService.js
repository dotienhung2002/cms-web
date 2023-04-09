import Request from "../helper/request";

import api, {
  COLOR_GET_ALL,
  PROMOTION_PRODUCT_CREATE,
  PROMOTION_PRODUCT_GET_ALL,
  PROMOTION_PRODUCT_GET_DETAIL,
  PROMOTION_PRODUCT_UPDATE,
} from "../constants/api";
class PromotionProductService {
  static async getListEmployee(data) {
    return new Promise((resolve) => {
      Request.send({
        path: PROMOTION_PRODUCT_GET_ALL.path,
        method: PROMOTION_PRODUCT_GET_ALL.method,
        data,
      }).then((res) => {
        if (!res?.error) {
          resolve({ data: res, isSuccess: true });
        } else {
          resolve({ isSuccess: false, error: res?.error });
        }
      });
    });
  }
  static async Create(data) {
    return new Promise((resolve) => {
      Request.send({
        path: PROMOTION_PRODUCT_CREATE.path,
        method: PROMOTION_PRODUCT_CREATE.method,
        data,
      }).then((res) => {
        if (!res?.error) {
          resolve({ data: res, isSuccess: true });
        } else {
          resolve({ isSuccess: false, error: res?.error });
        }
      });
    });
  }
  static async Update(data) {
    return new Promise((resolve) => {
      Request.send({
        path: PROMOTION_PRODUCT_UPDATE.path + `/${data.id}`,
        method: PROMOTION_PRODUCT_UPDATE.method,
        data,
      }).then((res) => {
        console.log("ress");

        console.log(res);

        if (!res?.error) {
          resolve({ data: res, isSuccess: true });
        } else {
          resolve({ isSuccess: false, error: res?.error });
        }
      });
    });
  }
  static async GetDetailEmployee(id) {
    return new Promise((resolve) => {
      Request.send({
        path: PROMOTION_PRODUCT_GET_DETAIL.path + `/${id}`,
        method: PROMOTION_PRODUCT_GET_DETAIL.method,
      }).then((res) => {
        if (!res?.error) {
          resolve({ data: res, isSuccess: true });
        } else {
          resolve({ isSuccess: false, error: res?.error });
        }
      });
    });
  }
}

export default PromotionProductService;
