import Request from "../helper/request";
import api from '../constants/api'
class EmployeeService {
  static async getListEmployee(data) {
    
    
    return new Promise(resolve => {
      Request.send({
        path: api.EMPLOYEE_GET_LIST.path,
        method:api.EMPLOYEE_GET_LIST.method,
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
        path: api.EMPLOYEE_CREATE.path,
        method:api.EMPLOYEE_CREATE.method,
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
        path: api.EMPLOYEE_UPDATE.path+`/${data.id}`,
        method:api.EMPLOYEE_UPDATE.method,
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
        path: api.EMPLOYEE_GET_DETAIL.path+`/${id}`,
        method:api.EMPLOYEE_GET_DETAIL.method,
        
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
