import Avatar from "@Components/avatar";
import "@Styles/react/libs/react-select/_react-select.scss";
import "@Styles/react/libs/tables/react-dataTable-component.scss";
import {numberToCurrencyStyle} from '@Utils'
import { Edit, MoreVertical } from "react-feather";
import { Link } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const statusBlock = {
  0: {
    text: "Chờ tiếp nhận",
    bgr: "light-secondary",
  },
  1: {
    text: "Đã tiếp nhận",
    bgr: "light-primary",
  },
  2: {
    text: "Đang xử lý",
    bgr: "light-warning",
  },
  3: {
    text: "Đang vận chuyển",
    bgr: "light-info",
  },
  4: {
    text: "Đã giao",
    bgr: "light-success",
  },
  5: {
    text: "Đã huỷ",
    bgr: "light-danger",
  },
};
const paymentStatusBlock = {
  true: {
    text: "Đã thanh toán",
    bgr: "light-success",
  },
  false: {
    text: "Chưa thanh toán",
    bgr: "light-warning",
  },
};
const columns = [
  {
    name: "id",
    minWidth: "60px",
    selector: (row) => row.id,
    sortable: true,
    sortField: "id",
    cell: (row) => row.id,
  },
  {
    name: "Tên kh",
    minWidth: "170px",
    selector: (row) => row.name,
    sortable: true,
    sortField: "name",
    cell: (row) => row.name,
  },
  {
    name: "Email",
    minWidth: "250px",
    selector: (row) => row.email,
    sortField: "email",
    sortable: true,
    cell: (row) => row.email,
  },
  {
    name: "Số điện thoại",
    minWidth: "180px",
    selector: (row) => row.phone,
    sortable: true,
    sortField: "phone",
    cell: (row) => row.phone,
  },
  {
    name: "Tổng số tiền",
    minWidth: "180px",
    selector: (row) => row.totalPayment,
    sortable: true,
    sortField: "totalPayment",
    cell: (row) => numberToCurrencyStyle(row.totalPayment),
  },
  {
    name: "Trạng thái",
    minWidth: "158px",
    selector: (row) => row?.status,
    sortable: true,
    sortField: "status",
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={statusBlock[row?.status]?.bgr}
        pill
      >
        {statusBlock[row?.status]?.text}
      </Badge>
    ),
  },
  {
    name: "Thanh toán",
    minWidth: "158px",
    selector: (row) => row?.paymentStatus,
    sortable: true,
    sortField: "status",
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={paymentStatusBlock[row?.paymentStatus]?.bgr}
        pill
      >
        {paymentStatusBlock[row?.paymentStatus]?.text}
      </Badge>
    ),
  },
  {
    name: "Ngày tạo",
    minWidth: "180px",
    selector: (row) => row.createdAt,
    sortable: true,
    sortField: "createdAt",
    cell: (row) => row.createdAt,
  },
  {
    name: "Thao tác",
    minWidth: "150px",
    selector: "",
    sortable: true,
    cell: (row) => (
      <div className="column-action d-flex align-items-center">
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/cms/invoice/edit/${row.id}`}
              className="w-100"
            >
              <Edit size={14} className="mr-50" />
              <span className="align-middle">Xem/Sửa</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
export default columns;
