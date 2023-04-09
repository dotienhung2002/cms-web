import { useEffect, useState } from 'react'
import EmployyeTab from './Employee'
import { User } from 'react-feather'
import { Card, CardBody, Col, Nav,Alert, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import '@Styles/react/apps/app-users.scss'
import categoryService from "@Services/categoryService";

import { useParams } from "react-router-dom";

const EmployeeAdd = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState();
  const toggle = (tab) => setActiveTab(tab);
  console.log(id);
  useEffect(() => {
    const init = async () => {
      const result = await categoryService.GetDetailEmployee(id);
      if (result.data) {
        setData(result.data);
      }
    };
    init();
  }, []);
  return data ? (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === '1'} onClick={() => toggle('1')}>
                  <User size={14} />
                  <span className='align-middle d-none d-sm-block'>Thông tin loại sản phẩm</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <EmployyeTab initial={data}  />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) 
  : (
    <Alert color="danger">
      <h4 className="alert-heading">Loại sản phẩm Không tồn tại</h4>
    </Alert>
  );
}
export default EmployeeAdd
