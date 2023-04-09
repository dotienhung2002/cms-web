import Request from "../helper/request";

import api, { ORDER_GET_ALL, ORDER_GET_DETAIL, ORDER_UPDATE, PRODUCT_GET_DETAIL } from '../constants/api'
class OrderService {
  static async getListEmployee(data) {
    
    
    return new Promise(resolve => {
      Request.send({
        path: ORDER_GET_ALL.path,
        method:ORDER_GET_ALL.method,
        data
      }).then((res) => {
          if (!res?.error) {
            resolve(({ data: res, isSuccess: true }));
          } else {
            resolve(({ isSuccess: false, error: res?.error }));
          }
        })
    });
  }

  static async UpdateEmployee(data) {
    
    return new Promise(resolve => {
      Request.send({
        path: ORDER_UPDATE.path+`/${data.id}`,
        method:ORDER_UPDATE.method,
        data
      }).then((res) => {
        console.log("ress");
        
        console.log(res);
        
          if (!res?.error) {
            resolve(({ data: res, isSuccess: true }));
          } else {
            resolve(({ isSuccess: false, error: res?.error }));
          }
        })
    });
  }
  static async GetDetailProduct(id) {
    
    return new Promise(resolve => {
      Request.send({
        path: ORDER_GET_DETAIL.path+`/${id}`,
        method:ORDER_GET_DETAIL.method,
        
      }).then((res) => {
          if (!res?.error) {
            resolve(({ data: res, isSuccess: true }));
          } else {
            resolve(({ isSuccess: false, error: res?.error }));
          }
        })
    });
  }
}


export default OrderService;
