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
import TabCategory from './category/list/index'
import TabProduct from './product/list/index'
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
              active={active === "product"}
              onClick={() => {
                history.push("/cms/promotion/product/list");
              }}
            >
            Sản phẩm
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
            className="px-4 py-1 font-weight-bold"
              active={active === "category"}
              onClick={() => {
                history.push("/cms/promotion/category/list");
              }}
            >
              Loại sản phẩm
            </NavLink>
          </NavItem>
       
        </Nav>
      </CardBody>
    </Card>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="product">
          {active == "product" && <TabProduct />}
        </TabPane>
        <TabPane tabId="category">{active == "category" && <TabCategory />}</TabPane>
      </TabContent>
    </div>
  );
};

export default UsersList;
