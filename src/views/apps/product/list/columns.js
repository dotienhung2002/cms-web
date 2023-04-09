import "@Styles/react/libs/react-select/_react-select.scss";
import "@Styles/react/libs/tables/react-dataTable-component.scss";
import { Edit, MoreVertical } from "react-feather";
import { Link } from "react-router-dom";
import {numberToCurrencyStyle} from '@Utils'

import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
const statusBlock = {
  1: {
    text: "Đang hoạt động",
    bgr: "light-success",
  },
  0: {
    text: "Không hoạt động",
    bgr: "light-danger",
  },
};
const columns = [
  {
    name: "Tên sản phẩm",
    minWidth: "250px",
    selector: (row) => row?.productName,
    sortField: "productName",
    sortable: true,
    cell: (row) => row?.productName,
  },
  {
    name: "Tổng SL đã bán",
    minWidth: "250px",
    selector: (row) => row?.total_sales,
    sortField: "total_sales",
    sortable: true,
    cell: (row) => row?.total_sales,
  },
  
  {
    name: "Tổng tiền đã bán",
    minWidth: "250px",
    selector: (row) => row?.total_payment,
    sortField: "total_payment",
    sortable: true,
    cell: (row) => numberToCurrencyStyle(row?.total_payment),
  },
 

];

export default columns;
