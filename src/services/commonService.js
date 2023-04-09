import Request from "../helper/request";

import api, { UPLOAD_FILE } from '../constants/api'
class CommonService {
  // static async updateUserInfo(data = {}, token = undefined) {
  //   return new Promise(resolve => {
  //     Request.send({
  //       data: data,
  //       path: '/user/user-update-info',
  //       method: "POST",
  //       token
  //     })
  //       .then((res) => {
  //         if (res.statusCode === 200) {
  //           resolve(({ data: res.data, isSuccess: true }));
  //         } else {
  //           resolve(({ isSuccess: false, error: res.error }));
  //         }
  //       })
  //   });
  // }

  // static async updateProfile(data = {}) {
  //   return new Promise(resolve => {
  //     Request.send({
  //       path: `/user/user-update-info`,
  //       method: "POST",
  //       data: data
  //     })
  //       .then((res) => {
  //         if (res.statusCode === 200) {

  //           resolve(({ data: res.data || [], isSuccess: true }));
  //         } else {
  //           resolve(({ isSuccess: false, error: res.error }));
  //         }
  //       })
  //   });
  // }

  // static async changePassowrd(data = {}, token = undefined) {
  //   return new Promise(resolve => {
  //     Request.send({
  //       data: data,
  //       path: '/user/change-password',
  //       method: "POST",
  //       token
  //     })
  //       .then((res) => {
  //         if (res.statusCode === 200) {
  //           resolve(({ data: res.data, isSuccess: true }));
  //         } else {
  //           resolve(({ isSuccess: false, error: res.error }));
  //         }
  //       })
  //   });
  // }

  // static async getDetail() {
  //   return new Promise(resolve => {
  //     Request.send({
  //       path: '/user/get-detail',
  //       method: "GET"
  //     })
  //       .then((res) => {
  //         if (res.statusCode === 200) {
  //           resolve(({ data: res.data, isSuccess: true }));
  //         } else {
  //           resolve(({ isSuccess: false, error: res.error }));
  //         }
  //       })
  //   });
  // }
  static async UploadFile(data) {
    return new Promise(resolve => {
      Request.send({
        path: UPLOAD_FILE.path,
        method:UPLOAD_FILE.method,
        data
      }).then((res) => {
        
          if (res) {
            resolve(({ data: res, isSuccess: true }));
          } else {
            resolve(({ isSuccess: false, error: res?.error }));
          }
        })
    });
  }
}


export default CommonService;
