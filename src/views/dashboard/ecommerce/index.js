import RevenueReport from "@Views/ui-elements/cards/analytics/RevenueReport";
import StatsCard from "@Views/ui-elements/cards/statistics/StatsCard";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import StatisticalService from "./../../../services/statisticalService";
import TopCustomer from "./../../../views/apps/customer/list/TopCustomer";
import TopProduct from "./../../../views/apps/product/list/TopProduct";
import CompanyTable from "./CompanyTable";

import "@Styles/base/pages/dashboard-ecommerce.scss";
import "@Styles/react/libs/charts/apex-charts.scss";
import OrderTable from "./OrderTable";

const EcommerceDashboard = () => {
  const { colors } = useContext(ThemeColors),
    trackBgColor = "#e9ecef";
  const [statusCount, setStatusCount] = useState();
  const [overallReport, setOverallReport] = useState();

  const getStatusCount = async () => {
    await StatisticalService.statusCount().then((res) => {
      setStatusCount(res?.data?.data);
    });
  };
  const getOverallReport = async () => {
    await StatisticalService.overallReport().then((res) => {
      setOverallReport(res?.data?.data);
    });
  };

  useEffect(() => {
    getStatusCount();
    getOverallReport();
  }, []);

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        {/* <Col xl='4' md='6' xs='12'>
          <CardMedal />
        </Col> */}
        <Col xl="12" md="6" xs="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} statusCount={statusCount} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="12" xs="12">
          <OrderTable statusCount={statusCount} />
        </Col>

        {/* <Col lg='4' md='6' xs='12'>
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col> */}
        {/* <Col lg='4' md='6' xs='12'>
          <GoalOverview success={colors.success.main} />
        </Col> */}
        {/* <Col lg='4' md='6' xs='12'>
          <CardTransactions />
        </Col> */}
      </Row>
      <Row className="match-height">
        <Col lg="12" xs="12">
          <CompanyTable statusCount={statusCount} />
        </Col>
        {/* <Col lg='4' md='6' xs='12'>
          
          <CardMeetup />
        </Col> */}
        {/* <Col lg='4' md='6' xs='12'>
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col> */}
        {/* <Col lg='4' md='6' xs='12'>
          <GoalOverview success={colors.success.main} />
        </Col> */}
        {/* <Col lg='4' md='6' xs='12'>
          <CardTransactions />
        </Col> */}
      </Row>

      <Row className="match-height">
        <Col lg="12" md="12">
          <RevenueReport
            primary={colors.primary.main}
            warning={colors.warning.main}
            overallReport={overallReport}
          />
        </Col>

        <Col lg="12" md="12">
          <Row className="match-height">
            <Col lg="6" md="3" xs="6">
              {/* <OrdersBarChart warning={colors.warning.main} /> */}
              <TopProduct />
            </Col>
            <Col lg="6" md="3" xs="6">
              {/* <OrdersBarChart warning={colors.warning.main} /> */}
              <TopCustomer />
            </Col>

            {/* <Col lg="6" md="3" xs="6">
              <ProfitLineChart info={colors.info.main} />
            </Col>
            <Col lg="12" md="6" xs="12">
              <Earnings success={colors.success.main} />
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default EcommerceDashboard;
