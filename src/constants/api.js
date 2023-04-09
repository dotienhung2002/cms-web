import BASE_URL from "./config";

const api = {
  //--------------------AUTHENTICATION------------------------
  EMPLOYEE_LOGIN: {
    path: `/login`,
    method: "POST",
  },
  EMPLOYEE_RESET_PASSWORD: {
    path: `/reset-password`,
    method: "POST",
  },
  EMPLOYEE_CHANGE_PASSWORD: {
    path: `/change-password`,
    method: "POST",
  },
  EMPLOYEE_REFRESH_TOKEN: {
    path: `/employee/token/refresh`,
    method: "GET",
  },
  //EMPLOYEE
  EMPLOYEE_CREATE: {
    path: `/employee/create`,
    method: "POST",
  },
  EMPLOYEE_UPDATE: {
    path: `/employee/update`,
    method: "PUT",
  },
  EMPLOYEE_GET_DETAIL: {
    path: `/employee/get-detail`,
    method: "GET",
  },
  EMPLOYEE_GET_LIST: {
    path: `/employee/get-list`,
    method: "POST",
  },
  //CUSTOMER
  CUSTOMER_CREATE: {
    path: `/customer/create`,
    method: "POST",
  },
  CUSTOMER_UPDATE: {
    path: `/customer/update`,
    method: "PUT",
  },
  CUSTOMER_GET_DETAIL: {
    path: `/customer/get-detail`,
    method: "GET",
  },
  CUSTOMER_GET_LIST: {
    path: `/customer/get-list`,
    method: "POST",
  },
  CUSTOMER_GET_ALL: {
    path: `/customer/get-list`,
    method: "GET",
  },

  //PRODUCT SET
  PRODUCT_SET_CREATE: {
    path: `/product-set/create`,
    method: "POST",
  },
  PRODUCT_SET_UPDATE: {
    path: `/product-set/update`,
    method: "PUT",
  },
  PRODUCT_SET_GET_DETAIL: {
    path: `/product-set/get-detail`,
    method: "GET",
  },
  PRODUCT_SET_GET_LIST: {
    path: `/product-set/get-list`,
    method: "POST",
  },
  PRODUCT_SET_GET_ALL: {
    path: `/product-set/get-list`,
    method: "GET",
  },
  //CATEGORY
  CATEGORY_CREATE: {
    path: `/category/create`,
    method: "POST",
  },
  CATEGORY_UPDATE: {
    path: `/category/update`,
    method: "PUT",
  },
  CATEGORY_GET_DETAIL: {
    path: `/category/get-detail`,
    method: "GET",
  },
  CATEGORY_GET_LIST: {
    path: `/category/get-list`,
    method: "POST",
  },
  //BRAND
  BRAND_CREATE: {
    path: `/brand/create`,
    method: "POST",
  },
  BRAND_UPDATE: {
    path: `/brand/update`,
    method: "PUT",
  },
  BRAND_GET_DETAIL: {
    path: `/brand/get-detail`,
    method: "GET",
  },
  BRAND_GET_LIST: {
    path: `/brand/get-list`,
    method: "POST",
  },
  //VOUCHER
  VOUCHER_CREATE: {
    path: `/voucher/create`,
    method: "POST",
  },
  VOUCHER_UPDATE: {
    path: `/voucher/update`,
    method: "PUT",
  },
  VOUCHER_GET_DETAIL: {
    path: `/voucher`,
    method: "GET",
  },
  VOUCHER_GET_LIST: {
    path: `/voucher/get-list`,
    method: "POST",
  },
  VOUCHER_CREATE: {
    path: `/voucher/create`,
    method: "POST",
  },
  
  VOUCHER_UPDATE: {
    path: `/voucher/update`,
    method: "PUT",
  },
  
  //MADE IN
  MADE_IN_CREATE: {
    path: `/madein/create`,
    method: "POST",
  },
  MADE_IN_UPDATE: {
    path: `/madein/update`,
    method: "PUT",
  },
  MADE_IN_GET_DETAIL: {
    path: `/madein/get-detail`,
    method: "GET",
  },
  MADE_IN_GET_LIST: {
    path: `/madein/get-list`,
    method: "POST",
  },
  //COLOR
  COLOR_CREATE: {
    path: `/color/create`,
    method: "POST",
  },
  COLOR_UPDATE: {
    path: `/color/update`,
    method: "PUT",
  },
  COLOR_GET_DETAIL: {
    path: `/color/get-detail`,
    method: "GET",
  },
  COLOR_GET_LIST: {
    path: `/color/get-list`,
    method: "POST",
  },
  //SIZE
  SIZE_CREATE: {
    path: `/size/create`,
    method: "POST",
  },
  SIZE_UPDATE: {
    path: `/size/update`,
    method: "PUT",
  },
  SIZE_GET_DETAIL: {
    path: `/size/get-detail`,
    method: "GET",
  },
  SIZE_GET_LIST: {
    path: `/size/get-list`,
    method: "POST",
  },
  //PRODUCT
  PRODUCT_CREATE: {
    path: `/product/create`,
    method: "POST",
  },
  PRODUCT_UPDATE: {
    path: `/product/update`,
    method: "PUT",
  },
 
  PRODUCT_GET_LIST: {
    path: `/product/get-list`,
    method: "POST",
  },
};
export default api;
export const UPLOAD_FILE = {
  path: `/upload-file`,
  method: "POST",
};

export const BRAND_GET_ALL = {
  path: `/brand/get-all`,
  method: "GET",
};

export const CATEGORY_GET_ALL = {
  path: `/category/get-all`,
  method: "GET",
};
export const COLOR_GET_ALL = {
  path: `/color/get-all`,
  method: "GET",
};
export const SIZE_GET_ALL = {
  path: `/size/get-all`,
  method: "GET",
};
export const MADEIN_GET_ALL = {
  path: `/madein/get-all`,
  method: "GET",
};

export const PRODUCT_SET_GET_ALL = {
  path: `/product-set/get-list`,
  method: "GET",
};
export const PRODUCT_GET_DETAIL = {
  path: `/product/get-detail`,
  method: "GET",
};

export const PRODUCT_GET_ALL = {
  path: `/public/product/get-all-ready`,
  method: "GET",
};


export const ORDER_GET_ALL = {
  path: `/order/get-list`,
  method: "POST",
};
export const ORDER_GET_DETAIL = {
  path: `/order/get-detail`,
  method: "GET",
};
export const ORDER_UPDATE = {
  path: `/order/update`,
  method: "PUT",
};




export const PROMOTION_PRODUCT_GET_ALL = {
  path: `/promotion/product/get-list`,
  method: "POST",
};

export const PROMOTION_PRODUCT_GET_DETAIL = {
  path: `/promotion/product/get-detail`,
  method: "GET",
};
export const PROMOTION_PRODUCT_UPDATE = {
  path: `/promotion/product/update`,
  method: "PUT",
};
export const PROMOTION_PRODUCT_CREATE = {
  path: `/promotion/product/create`,
  method: "POST",
};



export const STATISTICAL_COUNT = {
  path: `/stats/status-count`,
  method: "GET",
};

export const OVERALL_REPORT = {
  path: `/stats/overall-report`,
  method: "GET",
};


export const PROMOTION_CATEGORY_GET_ALL = {
  path: `/promotion/category/get-list`,
  method: "POST",
};

export const PROMOTION_CATEGORY_GET_DETAIL = {
  path: `/promotion/category/get-detail`,
  method: "GET",
};
export const PROMOTION_CATEGORY_UPDATE = {
  path: `/promotion/category/update`,
  method: "PUT",
};

export const PROMOTION_CATEGORY_CREATE = {
  path: `/promotion/category/create`,
  method: "POST",
};
export const CUSTOMER_GET_TOP = {
  path: `/stats/top-sales-customer`,
  method: "GET",
};
export const PRODUCT_GET_TOP = {
  path: `/stats/top-sales-product`,
  method: "GET",
};