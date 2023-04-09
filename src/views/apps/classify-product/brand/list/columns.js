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
const statusBlock:any = {
  1: {
    text: "Đang kinh doanh",
    bgr: "light-success",
  },
  0: {
    text: "Ngừng kinh doanh",
    bgr: "light-danger",
  },
};
const columns = [
  {
    name: "id",
    minWidth: "60px",
    selector: (row:any) => row.id,
    sortable: true,
    sortField: "id",
    cell: (row:any) => row.id,
  },

  {
    name: "Tên",
    minWidth: "200px",
    selector: (row:any) => row?.name,
    sortable: true,
    sortField: "name",
    cell: (row:any) => row?.name,
  },
  

  {
    name: "Trạng thái",
    minWidth: "158px",
    selector: (row:any) => row.status,
    sortable: true,
    sortField: "status",
    cell: (row:any) => (
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
    cell: (row:any) => (
      <div className="column-action d-flex align-items-center">
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/cms/classify/brand/edit/${row.id}`}
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
