import "@Styles/react/apps/app-users.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  CardBody,
  TabPane,
  Card
} from "reactstrap";
import TabSize from "./size/list/index";
import TabColor from "./color/list/index";
import TabMadeIn from "./made-in/list/index";
const UsersList = () => {
  const history = useHistory();
  const [active] = useState(() => history.location.pathname.split("/")[3]);
  return (
    <div className="app-user-list">
    <Card>
    <CardBody>
        {" "}
        <Nav className="justify-content-center" pills>
          <NavItem >
            <NavLink
            className="px-4 py-1 font-weight-bold"  
              active={active === "made-in"}
              onClick={() => {
                history.push("/cms/property/made-in/list");
              }}
            >
             Xuất xứ
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
            className="px-4 py-1 font-weight-bold"
              active={active === "size"}
              onClick={() => {
                history.push("/cms/property/size/list");
              }}
            >
              Kích thước
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
            className="px-4 py-1 font-weight-bold"
              active={active === "color"}
              onClick={() => {
                history.push("/cms/property/color/list");
              }}
            >
              Màu sắc
            </NavLink>
          </NavItem>
        </Nav>
      </CardBody>
    </Card>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="made-in">
          {active == "made-in" && <TabMadeIn />}
        </TabPane>
        <TabPane tabId="size">{active == "size" && <TabSize />}</TabPane>
        <TabPane tabId="color">
          {active == "color" && <TabColor />}
        </TabPane>
      </TabContent>
    </div>
  );
};

export default UsersList;
