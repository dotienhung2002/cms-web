import Avatar from "@Components/avatar";
import { Table, Card } from "reactstrap";
import {
  Monitor,
  Coffee,
  Watch,
  TrendingUp,
  TrendingDown,
} from "react-feather";

const OrderTable = ({ statusCount }) => {
  const data = [
      {
        // img: require("@Assets/images/icons/toolbox.svg").default,
        name: "Đơn hàng",
        // email: "meguc@ruj.io",
        // icon: <Monitor size={18} />,
        waitConfirm: statusCount?.orderStatusDto?.waitConfirm,
        confirmed: statusCount?.orderStatusDto?.confirmed,
        waitPrepare: statusCount?.orderStatusDto?.waitPrepare,
        shipping: statusCount?.orderStatusDto?.shipping,
        shipped: statusCount?.orderStatusDto?.shipped,
        cancelled: statusCount?.orderStatusDto?.cancelled,
        unpaid: statusCount?.orderStatusDto?.unpaid,
        paid: statusCount?.orderStatusDto?.paid,
        // time: "24 hours",
        // revenue: "891.2",
        // sales: "68",
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

          {/* waitConfirm: statusCount?.orderStatusDto?.waitConfirm,
      confirmed: statusCount?.orderStatusDto?.confirmed,
      waitPrepare: statusCount?.orderStatusDto?.waitPrepare,
      shipping: statusCount?.orderStatusDto?.shipping,
      shipped: statusCount?.orderStatusDto?.shipped,
      cancelled: statusCount?.orderStatusDto?.cancelled,
      unpaid: statusCount?.orderStatusDto?.unpaid,
      paid: statusCount?.orderStatusDto?.paid, */}

          <td>{col.waitConfirm}</td>
          <td >{col.confirmed}</td>

          <td>{col.waitPrepare}</td>

          <td>{col.shipping}</td>
          <td style={{ color: "#28c76f" }}>{col.shipped}</td>

          <td style={{ color: "red" }}>{col.cancelled}</td>
          <td>{col.unpaid}</td>
          <td>{col.paid}</td>

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
      {/* <td>{col.waitConfirm}</td>
          <td style={{ color: "#28c76f" }}>{col.confirmed}</td>

          <td>{col.waitPrepare}</td>

          <td>{col.shipping}</td>
          <td>{col.shipped}</td>

          <td style={{ color: "red" }}>{col.cancelled}</td>
          <td>{col.unpaid}</td>
          <td>{col.paid}</td> */}

        <thead>
          <tr>
            <th></th>
            <th>Chờ xác nhận</th>
            <th>Đã xác nhận</th>
            <th>Đang xử lý</th>
            <th>Đang giao </th>
            <th>Đã giao</th>
            <th>Đã huỷ</th>
            <th>Chưa thanh toán</th>
            <th>Đã thanh toán</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  );
};

export default OrderTable;
