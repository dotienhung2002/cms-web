// @ts-nocheck
import axios from "axios";
import { toast } from "react-toastify";
import { FORMAT_ERROR } from "../constants/status";
import { HOST } from "../constants/url";

import { getQueryString } from "./common";
function send(Request) {
  const { method = "GET", path, data, query, headers = {}, newUrl } = Request;
  return new Promise((resolve) => {
    let url = HOST+`${path}${getQueryString(query)}`;
    if (newUrl) {
      url = `${newUrl}${getQueryString(query)}`;
    }
    let token = window.localStorage.getItem("accessToken");

    if (token) {
      const newToken = token.replace(/"/g, "");
      headers.Authorization = "Bearer "+newToken;
    }

    axios({
      method,
      url,
      data,
      headers,
    })
      .then((result) => {
        const data = result.data;
        return resolve(data);
      })
      .catch((error) => {
        const { response = {} } = error;

        const result = response.data ? response.data : null;

        if (!result) {
          toast.warn("Somethig was wrong");
        } else {
          const { status, message: data } = result;
          console.log(result);
          
          if (status === 500) {
            toast.warn(FORMAT_ERROR?.[result?.error] || result?.message);
            return resolve(result);
          } else if (status === 404||status==400) {
            toast.error(result?.error)
            return resolve(result);
          } else if (status === 505) {
            toast.warn("Unauthorized");
          } else if (
            status === 401 
          ) {
            window.localStorage.clear();
            window.location.href = "/";
          } else if (
            (status === 401 && data === "Unauthorized") ||
            (status === 403 && data === "InvalidToken")
          ) {
            window.localStorage.clear();
            window.location.href = "/";
          } else if (status) {
            toast.warn(
              data ||
                "Lỗi server! Vui lòng bấm nút F12, mở tab network và chọn response rồi chụp lại gửi cho chúng tôi"
            );
          } else {
            return resolve(result.data);
          }
        }
      });
  });
}

export default {
  send,
};
