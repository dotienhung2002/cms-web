import Avatar from "@Components/avatar";
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
    name: "Ảnh",
    minWidth: "70px",
    cell: (row) => {
      return row.image ? (
        <Avatar className="mr-1" img={row.image} width="32" height="32" />
      ) : (
        <Avatar
          color={"primary"}
          className="mr-1"
          content={row.name || " "}
          initials
        />
      );
    },
  },
  {
    name: "Tên đăng nhập",
    minWidth: "200px",
    selector: (row) => row.username,
    sortable: true,
    sortField: "username",
    cell: (row) => row.username,
  },
  {
    name: "Họ và tên",
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
    name: "CMND",
    minWidth: "170px",
    selector: (row) => row.identityCard,
    sortable: true,
    sortField: "identityCard",
    cell: (row) => row.identityCard,
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
              to={`/cms/employee/edit/${row.id}`}
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
