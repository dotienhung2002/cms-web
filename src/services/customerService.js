import Request from "../helper/request";

import api, { CUSTOMER_GET_TOP, PRODUCT_GET_TOP } from '../constants/api'
class CustomerService {
  static async getAll(data) {
    
    
    return new Promise(resolve => {
      Request.send({
        path: api.CUSTOMER_GET_ALL.path,
        method:api.CUSTOMER_GET_ALL.method,
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
  static async getListCustomer(data) {
    
    
    return new Promise(resolve => {
      Request.send({
        path: api.CUSTOMER_GET_LIST.path,
        method:api.CUSTOMER_GET_LIST.method,
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
  static async getTopCustomer(query) {
    
    
    return new Promise(resolve => {
      Request.send({
        path: CUSTOMER_GET_TOP.path,
        method:CUSTOMER_GET_TOP.method,
        query
      }).then((res) => {
          if (!res?.error) {
            resolve(({ data: res, isSuccess: true }));
          } else {
            resolve(({ isSuccess: false, error: res?.error }));
          }
        })
    });
  }
  static async getTopProduct(query) {
    
    
    return new Promise(resolve => {
      Request.send({
        path: PRODUCT_GET_TOP.path,
        method:PRODUCT_GET_TOP.method,
        query
      }).then((res) => {
          if (!res?.error) {
            resolve(({ data: res, isSuccess: true }));
          } else {
            resolve(({ isSuccess: false, error: res?.error }));
          }
        })
    });
  }
  static async CreateCustomer(data) {
    
    return new Promise(resolve => {
      Request.send({
        path: api.CUSTOMER_CREATE.path,
        method:api.CUSTOMER_CREATE.method,
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
  static async UpdateCustomer(data) {
    
    return new Promise(resolve => {
      Request.send({
        path: api.CUSTOMER_UPDATE.path+`/${data.id}`,
        method:api.CUSTOMER_UPDATE.method,
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
  static async GetDetailCustomer(id) {
    
    return new Promise(resolve => {
      Request.send({
        path: api.CUSTOMER_GET_DETAIL.path+`/${id}`,
        method:api.CUSTOMER_GET_DETAIL.method,
        
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


export default CustomerService;
