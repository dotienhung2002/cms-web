import Avatar from "@Components/avatar";
import { Table, Card } from "reactstrap";
import {
  Monitor,
  Coffee,
  Watch,
  TrendingUp,
  TrendingDown,
} from "react-feather";
import {numberToCurrencyStyle} from '@Utils'
const CompanyTable = ({ statusCount }) => {
  
  const data = [
    {
      // img: require("@Assets/images/icons/toolbox.svg").default,
      name: "Sản phẩm",
      // email: "meguc@ruj.io",
      // icon: <Monitor size={18} />,
      active: statusCount?.productStatusDto?.active,
      inactive: statusCount?.productStatusDto?.inactive,
      outOfStock: statusCount?.productStatusDto?.outOfStock,
      // time: "24 hours",
      // revenue: "891.2",
      // sales: "68",
      
    },
      {
        // img: require("@Assets/images/icons/toolbox.svg").default,
        name: "Khách hàng",
        // email: "meguc@ruj.io",
        // icon: <Monitor size={18} />,
        active: statusCount?.customerStats?.active,
        inactive: statusCount?.customerStats?.inactive,
        // time: "24 hours",
        // revenue: "891.2",
        // sales: "68",
      },
      {
        // img: require("@Assets/images/icons/parachute.svg").default,
        name: "Nhân viên",
        // email: "vecav@hodzi.co.uk",
        // icon: <Coffee size={18} />,
        active: statusCount?.employeeStats?.active,
        inactive: statusCount?.employeeStats?.inactive,
        // time: "2 days",
        // revenue: "668.51",
        // sales: "97",
        // salesUp: true,
      },
      {
        // img: require("@Assets/images/icons/star.svg").default,
        name: "Thể loại",
        // email: "us@cuhil.gov",
        // icon: <Monitor size={18} />,
        active: statusCount?.productStatusDto?.categoryStats?.active,
        inactive: statusCount?.productStatusDto?.categoryStats?.inactive,
      },
      {
        // img: require("@Assets/images/icons/book.svg").default,
        name: "Thương hiệu",
        // email: "pudais@jife.com",
        // icon: <Coffee size={18} />,
        active: statusCount?.productStatusDto?.brandStats?.active,
        inactive:  statusCount?.productStatusDto?.brandStats?.inactive,
      },
      {
        // img: require("@Assets/images/icons/rocket.svg").default,
        name: "Xuất xứ",
        // email: "bipri@cawiw.com",
        // icon: <Watch size={18} />,
        active:  statusCount?.productStatusDto?.allMadeIns,
        inactive: statusCount?.productStatusDto?.allMadeIns,
      },
      
    ],
    colorsArr = {
      active: "light-success",
      inactive: "light-warning",
    };

  const renderData = () => {
    return data.map((col) => {
      const IconTag = col.salesUp ? (
        <TrendingUp size={15} className="text-success" />
      ) : (
        <TrendingDown size={15} className="text-danger" />
      );

      return (
        <tr key={col.name}>
          <td>
            <div className="d-flex align-items-center">
              <div>
                <div className="font-weight-bolder">{col.name}</div>
                {/* <div className="font-small-2 text-muted">{col.email}</div> */}
              </div>
            </div>
          </td>
          {/* <td>
            <div className="d-flex align-items-center">
              <Avatar
                className="mr-1"
                color={colorsArr[col.category]}
                icon={col.icon}
              />
              <span>{col.category}</span>
            </div>
          </td> */}
         
          <td style={{color:"#28c76f"}}>{col.active}</td>
          <td style={{color:"#ff9f43"}}>{col.inactive}</td>
          <td style={{color:"red"}}>{col.outOfStock}</td>
          
          {/* <td>
            <div className="d-flex align-items-center">
              <span className="font-weight-bolder mr-1">{col.sales}%</span>
              {IconTag}
            </div>
          </td> */}
        </tr>
      );
    });
  };

  return (
    <Card className="card-company-table">
      <Table responsive>
        <thead>
          <tr>
            <th></th>
            <th>Đang hoạt động</th>
            <th>Ngừng hoạt động</th>
            <th>Hết hàng</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
      
    </Card>
  );
};

export default CompanyTable;
