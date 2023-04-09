import { useState } from "react";
import EmployyeTab from "./product";
import { User } from "react-feather";
import {
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
import "@Styles/react/apps/app-users.scss";
const EmployeeAdd = () => {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => setActiveTab(tab);
  return (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <User size={14} />
                  <span className="align-middle d-none d-sm-block">
                    Thêm sản phẩm
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <EmployyeTab />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default EmployeeAdd;
