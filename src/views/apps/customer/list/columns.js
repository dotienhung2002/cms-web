import "@Styles/react/libs/react-select/_react-select.scss";
import "@Styles/react/libs/tables/react-dataTable-component.scss";
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
    name: "id",
    minWidth: "60px",
    selector: (row) => row.id,
    sortable: true,
    sortField: "id",
    cell: (row) => row.id,
  },
  {
    name: "Họ và tên",
    minWidth: "250px",
    selector: (row) => row.name,
    sortField: "name",
    sortable: true,
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
    name: "Trạng thái",
    minWidth: "158px",
    selector: (row) => row.status,
    sortable: true,
    sortField: "status",
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={statusBlock[row.status].bgr}
        pill
      >
        {statusBlock[row.status].text}
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
              to={`/cms/customer/edit/${row.id}`}
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
