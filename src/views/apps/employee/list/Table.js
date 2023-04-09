import ExtensionsHeader from "@Components/extensions-header";
import EmployeeService from "@Services/employeeService";
import "@Styles/react/libs/react-select/_react-select.scss";
import "@Styles/react/libs/tables/react-dataTable-component.scss";
import { selectThemeColors } from "@Utils";

import ModalSizes from "@Views/components/modal/ModalSizes";
import { FC, Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown, Sidebar } from "react-feather";
import ProductModal from "@Views/apps/product/list/Table";
import { Controller, useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Select from "react-select";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

import columns from "./Columns";
const CustomHeader = ({handlePerPage}) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <Label for="rows-per-page">Hiển thị</Label>
            <CustomInput
              className="form-control mx-50"
              type="select"
              id="rows-per-page"
              onChange={(e) => {
                handlePerPage(e.target.value)
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
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          <Button.Ripple
            color="primary"
            className="mx-1"
            tag={Link}
            to="/cms/employee/add"
          >
            Thêm mới
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  );
};

const EmployeesList = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSelectedProduct = (value) => {
    console.log(value);
    setSelectedProduct(value);
  };
  const [employeeData, setEmployeeData] = useState({
    data: [],
    currentPage: 0,
    countItems: null,
    countPages: null,
  });
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const open = () => {
    setToggleSidebar(true);
  };
  const [pending, setPending] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerpage, setRowsPerPage] = useState(10);
  const [params, setParams] = useState({
    name: null,
    username: null,
    phone: null,
    identityCard: null,
    email: null,
    status: null,
    pageNumber: currentPage,
    pageSize: rowsPerpage,
    sortBy: "id",
    sortDirection: "DESC",
  });

  async function handleGetListEmployee() {
    setPending(true);
    const result = await EmployeeService.getListEmployee(params);
    result.isSuccess && setEmployeeData(result?.data);
    setPending(false);
  }
  useEffect(() => {
    handleGetListEmployee();
  }, [params]);

  const onSubmit = (data) => {
    setCurrentPage(0);
    setParams((prev) => {
      return {
        ...prev,
        name: data?.name?.trim() || null,
        username: data?.username?.trim() || null,
        phone: data?.phone?.trim() || null,
        identityCard: data?.identityCard?.trim() || null,
        email: data?.email?.trim() || null,
        status: data?.status?.value || null,
        pageNumber: 0,
      };
    });
  };
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={employeeData.countPages || 1}
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
      <ExtensionsHeader title="Nhân viên" />

      <Card>
        
        <CardBody className="px-3 py-1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">Họ và tên:</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">Tên đăng nhập:</Label>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">Số điện thoại:</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">CMND/CCCD:</Label>
                <Controller
                  name="identityCard"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">Email:</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">Trạng thái:</Label>
                <Controller
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
                />
              </Col>
            </Row>
            <Row className="justify-content-end mt-2">
              <Button.Ripple color="primary" className="mx-1" type="submit">
                Lọc dữ liệu
              </Button.Ripple>
            </Row>
          </Form>
        </CardBody>
      </Card>
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
          data={employeeData?.data}
          subHeaderComponent={
            <CustomHeader handlePerPage={handlePerPage} open={open} />
          }
        />
      </Card>
      <Modal
        isOpen={toggleSidebar}
        toggle={() => setToggleSidebar(!toggleSidebar)}
        className={`modal-dialog-centered modal-xl`}
      >
        <ModalHeader toggle={() => setToggleSidebar(!toggleSidebar)}>
          Chọn sản phẩm
        </ModalHeader>
        <ModalBody>
          <ProductModal isModal={true} onSelectedRow={onSelectedProduct} />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setToggleSidebar(false);
              console.log(selectedProduct);
            }}
            outline
          >
            Chọn
          </Button>
        </ModalFooter>
      </Modal>
      {/* <Sidebar
      size="lg"
      open={open}
      title="New User"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={true}
    >
      fdfdf
    </Sidebar> */}
    </Fragment>
  );
};

export default EmployeesList;
