import "@Styles/react/apps/app-users.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody,
} from "reactstrap";
import TabBrand from "./brand/list/index";
import TabCategory from "./category/list/index";
import TabProductSet from "./product-set/list/index";
const UsersList = () => {
  const history = useHistory();
  const [active] = useState(() => history.location.pathname.split("/")[3]);
  return (
    <div className="app-user-list">
      <Card>
        <CardBody>
          <Nav className="justify-content-center" pills>
            <NavItem>
              <NavLink
                active={active === "product-set"}
                onClick={() => {
                  history.push("/cms/classify/product-set/list");
                }}
              >
                Tập sản phẩm
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "brand"}
                onClick={() => {
                  history.push("/cms/classify/brand/list");
                }}
              >
                Thương hiệu
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "category"}
                onClick={() => {
                  history.push("/cms/classify/category/list");
                }}
              >
                Loại sản phẩm
              </NavLink>
            </NavItem>
          </Nav>
        </CardBody>
      </Card>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="product-set">
          {active == "product-set" && <TabProductSet />}
        </TabPane>
        <TabPane tabId="brand">{active == "brand" && <TabBrand />}</TabPane>
        <TabPane tabId="category">
          {active == "category" && <TabCategory />}
        </TabPane>
      </TabContent>
    </div>
  );
};

export default UsersList;
