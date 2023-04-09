import Avatar from "@Components/avatar";
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
    text: "Ngừng hoạt động",
    bgr: "light-danger",
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
    name: "code",
    minWidth: "200px",
    selector: (row) => row.code,
    sortable: true,
    sortField: "code",
    cell: (row) => row.code,
  },

  {
    name: "Tên",
    minWidth: "400px",
    selector: (row) => row?.name,
    sortable: true,
    sortField: "name",
    cell: (row) => row?.name,
  },
  
  {
    name: "Số tiền giảm",
    minWidth: "200px",
    selector: (row) => row?.money,
    sortable: true,
    sortField: "money",
    cell: (row) => numberToCurrencyStyle(row?.money),
  },

  {
    name: "Số lượng",
    minWidth: "140px",
    selector: (row) => row?.slot,
    sortable: true,
    sortField: "slot",
    cell: (row) => row?.slot,
  },

  {
    name: "Ngày hết hạn",
    minWidth: "200px",
    selector: (row) => row?.endDate,
    sortable: true,
    sortField: "endDate",
    cell: (row) => row?.endDate,
  },
  
  {
    name: "Trạng thái",
    minWidth: "158px",
    selector: (row) => row.active,
    sortable: true,
    sortField: "active",
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={statusBlock[row.active]?.bgr}
        pill
      >
        {statusBlock[row.active]?.text}
      </Badge>
    ),
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
              to={`/cms/voucher/edit/${row.id}`}
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
