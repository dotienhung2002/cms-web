import ExtensionsHeader from "@Components/extensions-header";
import brandService from "@Services/brandService";
import categoryService from "@Services/categoryService";
import colorService from "@Services/colorService";
import madeinService from "@Services/madeInService";
import ProductService from "@Services/productService";
import sizeService from "@Services/sizeService";
import "@Styles/react/libs/react-select/_react-select.scss";
import Swal from "sweetalert2";

import "@Styles/react/libs/react-select/_react-select.scss";
import "@Styles/react/libs/tables/react-dataTable-component.scss";
import { selectThemeColors } from "@Utils";
import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown, Edit, MoreVertical } from "react-feather";
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
  CustomInput,
} from "reactstrap";

import {
  Badge,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          <Button.Ripple
            color="primary"
            className="mx-1"
            tag={Link}
            to="/cms/product/add"
          >
            Thêm mới
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  );
};

const EmployeesList = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [employeeData, setEmployeeData] = useState({
    data: [],
    currentPage: 0,
    countItems: null,
    countPages: null,
  });
  const [isAvailable, setIsAvailable] = useState();
  const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listMadeIn, setListMadeIn] = useState([]);
  const [pending, setPending] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerpage, setRowsPerPage] = useState(10);
  const [params, setParams] = useState({
    name: null,

    status: null,
    gender: null,
    available: null,
    madeIn: {
      id: null,
    },
    brand: {
      id: null,
    },
    category: {
      id: null,
    },
    pageNumber: currentPage,
    pageSize: rowsPerpage,
    sortBy: "id",
    sortDirection: "DESC",
  });
  async function handleGetListEmployee(value) {
    setPending(true);
    const result = await ProductService.getListEmployee(params);
    result.isSuccess && setEmployeeData(result?.data);
    setPending(false);
  }

  const statusBlock = {
    1: {
      text: "Còn hàng",
      bgr: "light-success",
    },
    0: {
      text: "Hết hàng",
      bgr: "light-danger",
    },
    "-1": {
      text: "Ngừng kinh doanh",
      bgr: "light-danger",
    },
  };
  const availableBlock = {
    1: {
      text: "Đã kích hoạt",
      bgr: "light-success",
    },
    0: {
      text: "Chưa kích hoạt",
      bgr: "light-danger",
    },
  };
  const genderBlock = {
    1: {
      text: "Nam",
    },
    0: {
      text: "Nữ",
    },
  };
  const columns = [
    {
      name: "id",
      minWidth: "60px",
      selector: (row) => row.id,
      sortable: true,

      sortField: "id",
      cell: (row) => row.id,
    },
    {
      name: "Tên sản phẩm",
      minWidth: "380px",
      selector: (row) => row.name,
      sortable: true,

      sortField: "name",
      cell: (row) => row.name,
    },
    {
      name: "Giới tính",
      minWidth: "140px",
      selector: (row) => row.gender,
      sortable: true,

      sortField: "gender",
      cell: (row) => genderBlock[row.gender].text,
    },
    {
      name: "Loại sản phẩm",
      minWidth: "200px",
      selector: (row) => row?.category?.name,
      // sortable: true,

      sortField: "name",
      cell: (row) => row?.category?.name,
    },
    {
      name: "Thương hiệu",
      minWidth: "170px",
      selector: (row) => row?.brand?.name,
      // sortable: true,

      sortField: "name",
      cell: (row) => row?.brand?.name,
    },
    {
      name: "Xuất xứ",
      minWidth: "170px",
      selector: (row) => row?.madeIn?.name,
      // sortable: true,

      sortField: "name",
      cell: (row) => row?.madeIn?.name,
    },
    {
      name: "Có sẵn",
      minWidth: "130px",
      selector: (row) => row.totalAmount,
      sortable: true,

      sortField: "totalAmount",
      cell: (row) => row.totalAmount,
    },

    {
      name: "Trạng thái",
      minWidth: "158px",
      selector: (row) => row.status,
      sortable: true,

      sortField: "status",
      cell: (row) => (
        <Badge
          className="text-capitalize"
          color={statusBlock[row.status].bgr}
          pill
        >
          {statusBlock[row.status].text}
        </Badge>
      ),
    },
    {
      name: "Kích hoạt",
      minWidth: "158px",
      selector: (row) => row.available,
      sortable: true,

      sortField: "available",
      cell: (row) => (
        <Badge
          className="text-capitalize"
          color={availableBlock[row.available]?.bgr}
          pill
        >
          {availableBlock[row.available]?.text}
        </Badge>
        // <CustomInput
        // onChange={(e)=>{
        //   const handleQuestions = () => {
        //     return MySwal.fire({
        //       icon:"warning",
        //       text: 'Bạn có chắc chắn không?',
        //       confirmButtonText: 'Đồng ý',
        //       showConfirmButton:true,
        //       cancelButtonText:"Huỷ",
        //       showCancelButton: true,
        //       buttonsStyling: false,
        //       customClass: {
        //         confirmButton: 'btn btn-primary',
        //         cancelButton: 'btn btn-danger ml-1'
        //       }
        //     })
        //       .then(function (result) {
        //         if (result.value) {
        //           MySwal.fire({
        //             title: 'All done!',
        //             html: `Your answers: <pre><code>${JSON.stringify(result.value)}</code></pre>`,
        //             confirmButtonText: 'Lovely!',
        //             customClass: { confirmButton: 'btn btn-primary' }
        //           })
        //          setIsAvailable(true)
        //         }
        //         else{
        //           setIsAvailable
        //         }
        //       })
        //   }
        //   handleQuestions()

        // }}
        //   type='switch'
        //   id={row.id}
        //   checked={isAvailable}
        // />
      ),
    },
    {
      name: "Thao tác",
      minWidth: "150px",
      selector: "",
      sortable: true,

      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <MoreVertical size={17} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag={Link}
                to={`/cms/product/edit/${row.id}`}
                className="w-100"
              >
                <Edit size={14} className="mr-50" />
                <span className="align-middle">Xem/Sửa</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const init = async () => {
      Promise.all([
        brandService.getAll(),
        categoryService.getAll(),
        colorService.getAll(),
        sizeService.getAll(),
        madeinService.getAll(),
      ]).then((res) => {
        //BRAND
        setListBrand([
          { value: null, label: "Chọn thương hiệu", number: 0 },
          ...res[0]?.data.map((item, index) => {
            return { value: item.id, label: item.name, number: index };
          }),
        ]);
        //CATEGORY
        setListCategory([
          { value: null, label: "Chọn loại sản phẩm", number: 0 },
          ...res[1]?.data.map((item, index) => {
            return { value: item.id, label: item.name, number: index };
          }),
        ]);

        //MADEIN
        setListMadeIn([
          { value: null, label: "Chọn xuất xứ", number: 0 },
          ...res[4]?.data.map((item, index) => {
            return { value: item.id, label: item.name, number: index };
          }),
        ]);
      });
    };
    init();
  }, []);
  useEffect(() => {
    handleGetListEmployee();
  }, [params]);

  const onSubmit = (data) => {
    setCurrentPage(0);
    setParams((prev) => {
      return {
        ...prev,
        name: data?.name?.trim() || null,
        gender: data?.gender?.value || null,
        available: data?.available?.value || null,
        status: data?.status?.value || null,
        madeIn: {
          id: data?.madein?.value || null,
        },
        brand: {
          id: data?.brand?.value || null,
        },
        category: {
          id: data?.category?.value || null,
        },

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
      <ExtensionsHeader title="Sản phẩm" />

      <Card>
        <CardBody className="px-3 py-1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">Tên sản phẩm:</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
              <Col md="3" className="mb-2">
                <Label>Giới tính:</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      isClearable={false}
                      classNamePrefix="select"
                      placeholder="Chọn giới tính"
                      options={[
                        { value: null, label: "Chọn giới tính", number: 0 },
                        { value: "1", label: "Nam", number: 1 },
                        { value: "0", label: "Nữ", number: 2 },
                      ]}
                      className="react-select"
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">Loại sản phẩm:</Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      isClearable={false}
                      classNamePrefix="select"
                      placeholder="Chọn loại sản phẩm"
                      options={listCategory}
                      className="react-select"
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">Thương hiệu:</Label>
                <Controller
                  control={control}
                  name="brand"
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      isClearable={false}
                      classNamePrefix="select"
                      placeholder="Chọn thương hiệu"
                      options={listBrand}
                      className="react-select"
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col md="3" className="mb-2">
                <Label for="search-invoice">Xuất xứ:</Label>
                <Controller
                  control={control}
                  name="madein"
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      isClearable={false}
                      classNamePrefix="select"
                      placeholder="Chọn xuất xứ"
                      options={listMadeIn}
                      className="react-select"
                      {...field}
                    />
                  )}
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
                        { value: "1", label: "Còn hàng", number: 2 },
                        { value: "0", label: "Hết hàng", number: 3 },
                        { value: "-1", label: "Ngừng kinh doanh", number: 4 },
                      ]}
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col md="3" className="mb-2">
                <Label for="search-invoice">Kích hoạt:</Label>
                <Controller
                  control={control}
                  name="available"
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      isClearable={false}
                      className="react-select"
                      placeholder="Chọn trạng thái"
                      classNamePrefix="select"
                      options={[
                        { value: null, label: "Chọn trạng thái", number: 0 },
                        { value: "1", label: "Đã kích hoạt", number: 2 },
                        { value: "0", label: "Chưa kích hoạt", number: 3 },
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
          title="Desserts"
          pagination
          highlightOnHover
          subHeader
          responsive
          paginationServer
          progressPending={pending}
          sortServer
          onSelectedRowsChange={props.onSelectedRow}
          selectableRows={props.isModal || false}
          columns={columns}
          onSort={handleSort}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={employeeData?.data}
          subHeaderComponent={
            <CustomHeader handlePerPage={handlePerPage} props={props} />
          }
        />
      </Card>
    </Fragment>
  );
};

export default EmployeesList;
