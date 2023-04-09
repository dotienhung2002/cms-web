import Request from "../helper/request";

import api, { OVERALL_REPORT, PRODUCT_GET_ALL, PRODUCT_GET_DETAIL, STATISTICAL_COUNT } from '../constants/api'
class StatisticalService {
  static async statusCount(data) {
    
    
    return new Promise(resolve => {
      Request.send({
        path: STATISTICAL_COUNT.path,
        method:STATISTICAL_COUNT.method,
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


  static async overallReport(data) {
    return new Promise(resolve => {
      Request.send({
        path: OVERALL_REPORT.path,
        method:OVERALL_REPORT.method,
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

  static async Create(data) {
    
    return new Promise(resolve => {
      Request.send({
        path: api.PRODUCT_CREATE.path,
        method:api.PRODUCT_CREATE.method,
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
        path: api.PRODUCT_UPDATE.path+`/${data.id}`,
        method:api.PRODUCT_UPDATE.method,
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
        path: PRODUCT_GET_DETAIL.path+`/${id}`,
        method:PRODUCT_GET_DETAIL.method,
        
      }).then((res) => {
          if (!res?.error) {
            resolve(({ data: res, isSuccess: true }));
          } else {
            resolve(({ isSuccess: false, error: res?.error }));
          }
        })
    });
  }
  static async GetAll() {
    
    return new Promise(resolve => {
      Request.send({
        path: PRODUCT_GET_ALL.path,
        method:PRODUCT_GET_ALL.method,
        
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


export default StatisticalService;
