import { useState } from "react";
import Chart from "react-apexcharts";
import {
  Button,
  Card,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown,
} from "reactstrap";

import { EyeOff, Home, Settings, User } from "react-feather";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const RevenueReport = (props) => {
  const [data, setData] = useState(props?.overallReport);
  const years = new Set();
  console.log(data);

  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const revenueOptions = {
      chart: {
        stacked: true,
        type: "bar",
        toolbar: { show: false },
      },
      grid: {
        padding: {
          top: -20,
          bottom: -10,
        },
        yaxis: {
          lines: { show: false },
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
        labels: {
          style: {
            colors: "#b9b9c3",
            fontSize: "0.86rem",
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: [props.primary, props.warning],
      plotOptions: {
        bar: {
          columnWidth: "17%",
          endingShape: "rounded",
        },
        distributed: true,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#b9b9c3",
            fontSize: "0.86rem",
          },
        },
      },
    },
    revenueSeries = [
      {
        name: "Earning",
        data: [95, 177, 284, 256, 105, 63, 168, 218, 72],
      },
      {
        name: "Expense",
        data: [-145, -80, -60, -180, -100, -60, -85, -75, -100],
      },
    ];

  const budgetSeries = [
      {
        data: [61, 48, 69, 52, 60, 40, 79, 60, 59, 43, 62],
      },
      {
        data: [20, 10, 30, 15, 23, 0, 25, 15, 20, 5, 27],
      },
    ],
    budgetOptions = {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        type: "line",
        sparkline: { enabled: true },
      },
      stroke: {
        curve: "smooth",
        dashArray: [0, 5],
        width: [2],
      },
      colors: [props.primary, "#dcdae3"],
      tooltip: {
        enabled: false,
      },
    };

  return data !== null ? (
    <Card className="card-revenue-budget">
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <p>
            Candy canes donut chupa chups candy canes lemon drops oat cake
            wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps
            lemon drops candy marzipan donut brownie tootsie roll. Icing
            croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum
            cookie chocolate cake powder croissant.
          </p>
          <p>
            Carrot cake tiramisu danish candy cake muffin croissant tart
            dessert. Tiramisu caramels candy canes chocolate cake sweet roll
            liquorice icing cupcake. Candy cookie sweet roll bear claw sweet
            roll.
          </p>
        </TabPane>
        <TabPane tabId="2">
          <p>
            Dragée jujubes caramels tootsie roll gummies gummies icing bonbon.
            Candy jujubes cake cotton candy. Jelly-o lollipop oat cake
            marshmallow fruitcake candy canes toffee. Jelly oat cake pudding
            jelly beans brownie lemon drops ice cream halvah muffin. Brownie
            candy tiramisu macaroon tootsie roll danish.
          </p>
          <p>
            Croissant pie cheesecake sweet roll. Gummi bears cotton candy tart
            jelly-o caramels apple pie jelly danish marshmallow. Icing caramels
            lollipop topping. Bear claw powder sesame snaps.
          </p>
        </TabPane>
        <TabPane tabId="3">
          <p>
            Gingerbread cake cheesecake lollipop topping bonbon chocolate sesame
            snaps. Dessert macaroon bonbon carrot cake biscuit. Lollipop lemon
            drops cake gingerbread liquorice. Sweet gummies dragée. Donut bear
            claw pie halvah oat cake cotton candy sweet roll. Cotton candy sweet
            roll donut ice cream.
          </p>
          <p>
            Halvah bonbon topping halvah ice cream cake candy. Wafer gummi bears
            chocolate cake topping powder. Sweet marzipan cheesecake jelly-o
            powder wafer lemon drops lollipop cotton candy.
          </p>
        </TabPane>
      </TabContent>
      <Row className="mx-0">
        <Col className="revenue-report-wrapper" md="8" xs="12">
          <div className="d-sm-flex justify-content-between align-items-center mb-3">
            <CardTitle className="mb-50 mb-sm-0">Tổng quan</CardTitle>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center mr-2">
                <span className="bullet bullet-primary mr-50 cursor-pointer"></span>
                <span>Earning</span>
              </div>
              {/* <div className='d-flex align-items-center'>
                <span className='bullet bullet-warning mr-50 cursor-pointer'></span>
                <span>Expense</span>
              </div> */}
            </div>
          </div>
          <Nav tabs>
            <NavItem>
              <NavLink
                active={active === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                <Home size={14} />
                <span className="align-middle">Home</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "2"}
                onClick={() => {
                  toggle("2");
                }}
              >
                <Settings size={14} />
                <span className="align-middle">Service</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink disabled>
                <EyeOff size={14} />
                <span className="align-middle">Disabled</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "3"}
                onClick={() => {
                  toggle("3");
                }}
              >
                <User size={14} />
                <span className="align-middle">Account</span>
              </NavLink>
            </NavItem>
          </Nav>
          <Chart
            id="revenue-report-chart"
            type="bar"
            height="230"
            options={revenueOptions}
            series={revenueSeries}
          />
        </Col>
        <Col className="budget-wrapper" md="4" xs="12">
          <UncontrolledButtonDropdown>
            <DropdownToggle
              className="budget-dropdown"
              outline
              color="primary"
              size="sm"
              caret
            >
              2023
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="w-100">2023</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <h2 className="mb-25">${data?.price}</h2>
          <div className="d-flex justify-content-center">
            <span className="font-weight-bolder mr-25">Budget:</span>
            <span>{data?.budget}</span>
          </div>
          <Chart
            id="budget-chart"
            type="line"
            height="80"
            options={budgetOptions}
            series={budgetSeries}
          />
          <Button color="primary">Increase Budget</Button>
        </Col>
      </Row>
    </Card>
  ) : null;
};

export default RevenueReport;
