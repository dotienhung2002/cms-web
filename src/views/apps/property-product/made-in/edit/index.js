import { useEffect, useState } from "react";
import EmployyeTab from "./Employee";
import { User } from "react-feather";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import madeInService from "@Services/madeInService";
import "@Styles/react/apps/app-users.scss";
import { useParams } from "react-router-dom";
const EmployeeEdit = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState();
  const toggle = (tab) => setActiveTab(tab);
  const { id } = useParams();
  useEffect(() => {
    const init = async () => {
      const result = await madeInService.GetDetailEmployee(id);
      if (result.data) {
        setData(result.data);
      }
    };
    init();
  }, []);

  return data ? (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <User size={14} />
                  <span className="align-middle d-none d-sm-block">
                    Thông tin tập sản phẩm
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <EmployyeTab initial={data} />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Xuất xứ Không tồn tại</h4>
    </Alert>
  );
};
export default EmployeeEdit;
