import Request from "../helper/request";

import api, {
  PROMOTION_CATEGORY_CREATE,
  PROMOTION_CATEGORY_GET_ALL,
  PROMOTION_CATEGORY_GET_DETAIL,
  PROMOTION_CATEGORY_UPDATE,
} from "../constants/api";
class PromotionCategoryService {
  static async getListEmployee(data) {
    return new Promise((resolve) => {
      Request.send({
        path: PROMOTION_CATEGORY_GET_ALL.path,
        method: PROMOTION_CATEGORY_GET_ALL.method,
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
        path: PROMOTION_CATEGORY_CREATE.path,
        method: PROMOTION_CATEGORY_CREATE.method,
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
        path: PROMOTION_CATEGORY_UPDATE.path + `/${data.id}`,
        method: PROMOTION_CATEGORY_UPDATE.method,
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
        path: PROMOTION_CATEGORY_GET_DETAIL.path + `/${id}`,
        method: PROMOTION_CATEGORY_GET_DETAIL.method,
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

export default PromotionCategoryService;
