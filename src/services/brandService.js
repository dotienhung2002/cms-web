import Request from "../helper/request";
import api, { BRAND_GET_ALL } from '../constants/api'
class EmployeeService {
  static async getListEmployee(data) {
    
    
    return new Promise(resolve => {
      Request.send({
        path: api.BRAND_GET_LIST.path,
        method:api.BRAND_GET_LIST.method,
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

  static async getAll(data) {
    return new Promise(resolve => {
      Request.send({
        path: BRAND_GET_ALL.path,
        method:BRAND_GET_ALL.method,
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

  static async CreateEmployee(data) {
    
    return new Promise(resolve => {
      Request.send({
        path: api.BRAND_CREATE.path,
        method:api.BRAND_CREATE.method,
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
        path: api.BRAND_UPDATE.path+`/${data.id}`,
        method:api.BRAND_UPDATE.method,
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
  static async GetDetailEmployee(id) {
    
    return new Promise(resolve => {
      Request.send({
        path: api.BRAND_GET_DETAIL.path+`/${id}`,
        method:api.BRAND_GET_DETAIL.method,
        
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


export default EmployeeService;
