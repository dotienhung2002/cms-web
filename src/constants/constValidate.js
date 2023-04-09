import * as yup from "yup";
import { REGEX_EMAIL, REGEX_PASSWORD, REGEX_PHONE } from "./regex";
export const SCHEMA_LOGIN = {
  username: yup
    .string()
    .trim()
    .required("Vui lòng nhập tên đăng nhập")
    .min(3, "Tên đăng nhập phải tối thiểu 3 ký tự")
    .max(30, "Tên đăng nhập tối đa 30 ký tự"),
  password: yup
    .string()
    .trim()
    .required("Vui lòng nhập mật khẩu")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu phải tối thiểu 8 ký tự ít nhất một ký tự hoa, một ký tự thường, một ký tự số và một ký tự đặc biệt"
    ),
};
export const SCHEMA_FORGOT_PASSWORD = {
  email: yup
    .string()
    .trim()
    .required("Vui lòng nhập email")
    .matches(REGEX_EMAIL, "Email không hợp lệ"),
};


export const SCHEMA_VOUCHER = {
  name: yup
  .string()
  .trim()
  .required("Vui lòng nhập tên"),
  code: yup
  .string()
  .trim()
  .required("Vui lòng nhập mã"),
  money:yup.number("Không hợp lệ").min(0,"Không hợp lệ").nullable(true),
  slot:yup.number("Không hợp lệ").min(0,"Không hợp lệ").nullable(true),

};
export const SCHEMA_CHANGE_PASSWORD = {
  current_password: yup.string().trim().required("Vui lòng nhập mật khẩu cũ"),
  new_password: yup
    .string()
    .trim()
    .required("Vui lòng nhập mật mới")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu phải tối thiểu 8 ký tự ít nhất một ký tự hoa, một ký tự thường, một ký tự số và một ký tự đặc biệt"
    ),
  retype_new_password: yup
    .string()
    .trim()

    .required("Vui lòng nhập lại mật khẩu mới")
    .oneOf([yup.ref(`new_password`), null], "Mật khẩu mới không khớp"),
};
export const SCHEMA_RESET_PASSWORD = {
  new_password: yup
    .string()
    .trim()
    .required("Vui lòng nhập mật mới")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu phải tối thiểu 8 ký tự ít nhất một ký tự hoa, một ký tự thường, một ký tự số và một ký tự đặc biệt"
    ),
  retype_new_password: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu mới")
    .oneOf([yup.ref(`new_password`), null], "Mật khẩu mới không khớp"),
};
//EMPLOYEE
export const SCHEMA_EMPLOYEE = {
  username: yup
    .string()
    .trim()
    .required("Vui lòng nhập tên đăng nhập")
    .min(3, "Tên đăng nhập phải tối thiểu 3 ký tự")
    .max(30, "Tên đăng nhập tối đa 30 ký tự"),
  name: yup
    .string()
    .trim()
    .required("Vui lòng nhập họ tên"),
    identityCard: yup
    .string()
    .trim()
    .required("Vui lòng nhập CMND/CCCD"),
    phone: yup
    .string()
    .trim()
    .required("Vui lòng nhập số điện thoại")
    .matches(
      REGEX_PHONE,
      "Số điện thoại không hợp lệ"
    ),
    email: yup
    .string()
    .trim()
    .required("Vui lòng nhập email")
    .matches(REGEX_EMAIL, "Email không hợp lệ"),
    birthDay: yup.date().nullable()
    .required("Vui lòng chọn ngày sinh")
 
};
//CUSTOMER
export const SCHEMA_UPDATE_CUSTOMER = {
  name: yup
    .string()
    .trim()
    .required("Vui lòng nhập họ tên")
    .max(255, "Họ tên tối đa 255 ký tự"),
    phone: yup
    .string()
    .trim()
    .required("Vui lòng nhập số điện thoại")
    .matches(
      REGEX_PHONE,
      "Số điện thoại không hợp lệ"
    ),
    email: yup
    .string()
    .trim()
    .required("Vui lòng nhập email")
    .matches(REGEX_EMAIL, "Email không hợp lệ"),
    height:yup.number().min(0),
    weight:yup.number().min(0),
};


//
//PRODUCT_SET
export const SCHEMA_CREATE_PRODUCT_SET = {
  name: yup
    .string()
    .trim()
    .required("Vui lòng nhập tên").max(255, "Tên tối đa 255 ký tự"),
};
//BRAND
export const SCHEMA_CREATE_BRAND = {
  name: yup
    .string()
    .trim()
    .required("Vui lòng nhập tên").max(255, "Tên tối đa 255 ký tự"),
    // productSet:yup.object().required("Vui lòng chọn tập sản phẩm")
};
//BRAND
export const SCHEMA_CREATE_CATEGORY= {
  name: yup
    .string()
    .trim()
    .required("Vui lòng nhập tên").max(255, "Tên tối đa 255 ký tự"),
    productSet:yup.object().required("Vui lòng chọn tập sản phẩm")
};

//PROPERTY PRODUCT 
export const SCHEMA_PROPERTY_PRODUCT= {
  name: yup
    .string()
    .trim()
    .required("Vui lòng nhập tên").max(255, "Tên tối đa 255 ký tự"),
};
//PRODUCT
export const SCHEMA_PRODUCT= {
  name: yup
  .string()
  .trim()
  .required("Vui lòng nhập tên sản phẩm").max(255, "Tên tối đa 255 ký tự"),
  gender:yup.object().required("Vui lòng chọn giới tính").nullable(),
  brandId:yup.object().required("Vui lòng chọn thương hiệu").nullable(),
  categoryId:yup.object().required("Vui lòng chọn loại sản phẩm").nullable(),
  madeInId:yup.object().required("Vui lòng chọn xuất xứ").nullable(),
};

