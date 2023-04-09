import classnames from "classnames";
import Avatar from "@Components/avatar";
import { TrendingUp, User, Box, DollarSign, FileText } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  Media,
} from "reactstrap";

const StatsCard = ({ cols, statusCount }) => {
  let totalCustomer =
    statusCount?.customerStats?.active + statusCount?.customerStats?.inactive;
  let totalEmployee =
    statusCount?.employeeStats?.active + statusCount?.employeeStats?.inactive;
  let totalOrder =
    statusCount?.orderStatusDto?.waitConfirm +
    statusCount?.orderStatusDto?.confirmed +
    statusCount?.orderStatusDto?.waitPrepare +
    statusCount?.orderStatusDto?.shipping +
    statusCount?.orderStatusDto?.cancelled +
    +statusCount?.orderStatusDto?.unpaid +
    statusCount?.orderStatusDto?.paid;
  let totalProduct =
    statusCount?.productStatusDto?.active +
    statusCount?.productStatusDto?.inactive
    + statusCount?.productStatusDto?.outOfStock

    let totalBrand =   statusCount?.productStatusDto?.brandStats?.inactive+ statusCount?.productStatusDto?.brandStats?.active  ;
    let totalMadein= statusCount?.productStatusDto?.allMadeIns;
    let totalCategory=statusCount?.productStatusDto?.categoryStats?.inactive+ statusCount?.productStatusDto?.categoryStats?.active ;
  console.log(statusCount);
  const data = [
    {
      title: totalOrder,
      subtitle: "Đơn hàng",
      color: "light-primary",
      icon: <TrendingUp size={24} />,
    },
    {
      title: totalCustomer,
      subtitle: "khách hàng",
      color: "light-info",
      icon: <User size={24} />,
    },
    {
      title: totalEmployee,
      subtitle: "nhân viên",
      color: "light-info",
      icon: <User size={24} />,
    },
    {
      title: totalProduct,
      subtitle: "sản phẩm",
      color: "light-danger",
      icon: <Box size={24} />,
    },
    {
      title: totalCategory,
      subtitle: 'Thể loại',
      color: 'light-success',
      icon: <FileText size={24} />
    },
    {
      title: totalBrand,
      subtitle: 'Thương hiệu',
      color: 'light-success',
      icon: <FileText size={24} />
    },
    {
      title: totalMadein,
      subtitle: 'Xuất xứ',
      color: 'light-success',
      icon: <FileText size={24} />
    }
  ];

  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols);
      return (
        <Col
          key={index}
          {...cols}
          className={classnames("mt-2",{
            [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1,
          })}
        >
          <Media>
            <Avatar color={item.color} icon={item.icon} className="mr-2" />
            <Media className="my-auto" body>
              <h4 className="font-weight-bolder mb-0">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardBody className="statistics-body">
        <Row >{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
