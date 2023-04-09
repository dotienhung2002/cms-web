import ExtensionsHeader from "@Components/extensions-header";
import OrderService from "@Services/orderService";
import "@Styles/react/libs/react-select/_react-select.scss";
import "@Styles/react/libs/tables/react-dataTable-component.scss";
import { selectThemeColors } from "@Utils";
import ProductModal from "@Views/apps/product/list/Table";
import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown, Edit, MoreVertical } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import columns from "./columns";

const CustomHeader = ({ handlePerPage }) => {
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
        {/* <Col
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
        </Col> */}
      </Row>
    </div>
  );
};

const InvoiceList = () => {
  const { handleSubmit, control } = useForm();
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const onSelectedProduct = (value) => {
    setSelectedProduct(value);
  };
  const [employeeData, setEmployeeData] = useState({
    data: [],
    currentPage: 0,
    countItems: null,
    countPages: null,
  });
  const open = () => {
    setToggleSidebar(true);
  };

  const [selectedProduct, setSelectedProduct] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerpage, setRowsPerPage] = useState(10);
  const [params, setParams] = useState({
    name: null,
    phone: null,
    identityCard: null,
    email: null,
    status: null,
    paymentStatus: null,
    pageNumber: currentPage,
    pageSize: rowsPerpage,
    sortBy: "id",
    sortDirection: "DESC",
  });
  // DESC

  async function handleGetListEmployee() {
    const result = await OrderService.getListEmployee(params);
    console.log(result);
    result.isSuccess && setEmployeeData(result?.data);
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
        paymentStatus: data?.paymentStatus?.value || null,
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
      <ExtensionsHeader title="Đơn hàng" />

      <Card>
        <CardBody className="px-3 py-1 mt-2">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">Tên khách hàng:</Label>
                <Controller
                  name="name"
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
                        { value: "0", label: "Chờ tiếp nhận", number: 1 },
                        { value: "1", label: "Đã tiếp nhận", number: 2 },
                        { value: "2", label: "Đang xử lý", number: 3 },
                        { value: "3", label: "Đang vận chuyển", number: 4 },
                        { value: "4", label: "Đã giao", number: 5 },
                        { value: "5", label: "Đã huỷ", number: 6 },
                      ]}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">Thanh toán:</Label>
                <Controller
                  control={control}
                  name="paymentStatus"
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      isClearable={false}
                      className="react-select"
                      placeholder="Chọn trạng thái"
                      classNamePrefix="select"
                      options={[
                        { value: null, label: "Chọn trạng thái", number: 0 },
                        { value: "1", label: "Đã thanh toán", number: 2 },
                        { value: "0", label: "Chưa thanh toán", number: 3 },
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

export default InvoiceList;
