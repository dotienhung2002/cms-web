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
  true: {
    text: "Đang sử dụng",
    bgr: "light-success",
  },
  false: {
    text: "Không sử dụng",
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
    name: "Tên",
    minWidth: "170px",
    selector: (row) => row.name,
    sortable: true,
    sortField: "name",
    cell: (row) => row.name,
  },
  {
    name: "Phần trăm",
    minWidth: "170px",
    selector: (row) => row.percentage,
    sortable: true,
    sortField: "percentage",
    cell: (row) => <span>{row.percentage}%</span>,
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
    name: "Loại sản phẩm",
    minWidth: "170px",
    selector: (row) => row?.category?.name,
    sortable: true,
    sortField: "name",
    cell: (row) => row?.category?.name,
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
              to={`/cms/promotion/category/edit/${row.id}`}
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
