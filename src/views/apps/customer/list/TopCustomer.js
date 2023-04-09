import ExtensionsHeader from "@Components/extensions-header";
import CustomerService from "@Services/customerService";
import "@Styles/react/libs/react-select/_react-select.scss";
import "@Styles/react/libs/tables/react-dataTable-component.scss";
import { selectThemeColors } from "@Utils";
import {numberToCurrencyStyle} from '@Utils'

import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { Card, Col, Label, Row } from "reactstrap";

// ** React Imports

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { number_to_price } from "../../../../helper/common";

const CustomHeader = ({ handlePerPage, control ,handleGetListCustomer}) => {
  const [time,setTime] = useState(null)
  useEffect(()=>{
    handleGetListCustomer(time&&{year:moment(time).format("yyyy"),month:moment(time).format("MM")})
  },[time])
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
      <Row>
        {/* <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <Label for="rows-per-page">Hiển thị</Label>
            <CustomInput
              className="form-control mx-50"
              type="select"
              id="rows-per-page"
              onChange={(e) => {
                handlePerPage(e.target.value);
              }}
              style={{
                width: "5rem",
                padding: "0 0.8rem",
                backgroundPosition:
                  "calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0",
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </CustomInput>
            <Label for="rows-per-page">dòng</Label>
          </div>
        </Col>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <Label for="rows-per-page">Hiển thị</Label>
            <CustomInput
              className="form-control mx-50"
              type="select"
              id="rows-per-page"
              onChange={(e) => {
                handlePerPage(e.target.value);
              }}
              style={{
                width: "5rem",
                padding: "0 0.8rem",
                backgroundPosition:
                  "calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0",
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </CustomInput>
            <Label for="rows-per-page">dòng</Label>
          </div>
        </Col> */}
        <Col md="4" className="mb-2">
          <Label for="search-invoice">Thời gian:</Label>
          {/* <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      isClearable={false}
                      className="react-select"
                      placeholder="Chọn trạng thái"
                      classNamePrefix="select"
                      options={[
                        { value: null, label: "Chọn trạng thái", number: 0 },
                        { value: "1", label: "Đang hoạt động", number: 2 },
                        { value: "0", label: "Ngừng hoạt động", number: 3 },
                      ]}
                      {...field}
                    />
                  )}
                /> */}
          <Controller
            control={control}
            name="startDate"
            render={() => (
              <DatePicker
                className="datepicker form-control"
                onChange={(date) => {
                  setTime(date);
                }}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={time}
                value={time}
                // selectsStart
                // maxTime={endDate}
                // maxDate={new Date()}
                placeholderText="Chọn năm tháng"
                // dateFormat="mm"
                // showFullMonthYearPicker
                // showTimeSelect
                showMonthYearPicker
                // showTimeSelectOnly
                // selecton
                // timeIntervals={15}
                // timeCaption="Month"
                dateFormat="MM-yyyy"
              />
            )}
          />
        </Col>
       
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          {/* <Button.Ripple
            color="primary"
            className="mx-1"
            tag={Link}
            to="/cms/Customer/add"
          >
            Thêm mới
          </Button.Ripple> */}
        </Col>
      </Row>
    </div>
  );
};

const TopCustomer = () => {
  const columns = [
    {
      name: "Email",
      minWidth: "250px",
      selector: (row) => row?.email,
      sortField: "email",
      sortable: true,
      cell: (row) => row?.email,
    },
    {
      name: "Tổng tiền đã chi",
      minWidth: "250px",
      selector: (row) => row?.totalPayment,
      sortField: "totalPayment",
      sortable: true,
      cell: (row) => numberToCurrencyStyle(row?.totalPayment),
    },
   
  
  ];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [customerData, setCustomerData] = useState({
    data: [],
    currentPage: 0,
    countItems: null,
    countPages: null,
  });
  const [pending, setPending] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerpage, setRowsPerPage] = useState(10);
  const [params, setParams] = useState({
    name: null,
    email: null,
    status: null,
    phone: null,
    pageNumber: currentPage,
    pageSize: rowsPerpage,
    sortBy: "id",
    sortDirection: "DESC",
  });

  async function handleGetListCustomer(query) {
    setPending(true);
  const result = await CustomerService.getTopCustomer(query);
    result.isSuccess && setCustomerData(result?.data);
    
    setPending(false);
  }

  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={customerData.countPages || 1}
        activeClassName="active"
        forcePage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page.selected);
          setParams((prev) => {
            return { ...prev, pageNumber: page.selected };
          });
        }}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pr-1"
        }
      />
    );
  };

  const handleSort = async (column, sortDirection) => {
    setParams((prev) => {
      return {
        ...prev,
        sortBy: column.sortField,
        sortDirection: sortDirection.toUpperCase(),
      };
    });
  };
  const handlePerPage = (rowsPerpage) => {
    setCurrentPage(0);
    setRowsPerPage(rowsPerpage);
    setParams((prev) => {
      return { ...prev, pageSize: rowsPerpage, pageNumber: 0 };
    });
  };
  return (
    <Fragment>
      <ExtensionsHeader title="Top khách hàng mua nhiều nhất" />

      <Card>
        <DataTable
          noHeader
          pagination
          highlightOnHover
          subHeader
          responsive
          paginationServer
          sortServer
          columns={columns}
          onSort={handleSort}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={customerData.data}
          subHeaderComponent={
            <CustomHeader handlePerPage={handlePerPage} control={control} handleGetListCustomer={handleGetListCustomer}/>
          }
        />
      </Card>
    </Fragment>
  );
};

export default TopCustomer;
