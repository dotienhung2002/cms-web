// ** Third Party Components
import { selectThemeColors } from "@Utils";
import classNames from "classnames";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import {numberToCurrencyStyle} from '@Utils'

import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import Service from "../../../../helper/request";
import { ORDER_UPDATE } from "./../../../../constants/api";
const statusBlock = {
  0: { value: "0", label: "Chờ tiếp nhận", number: 1 },
  1: { value: "1", label: "Đã tiếp nhận", number: 2 },
  2: { value: "2", label: "Đang xử lý", number: 3 },
  3: { value: "3", label: "Đang vận chuyển", number: 4 },
  4: { value: "4", label: "Đã giao", number: 5 },
  5: { value: "5", label: "Đã huỷ", number: 6 },
};

const paymentStatusBlock = {
  true: { value: "true", label: "Đã thanh toán", number: 5 },
  false: { value: "false", label: "Chưa thanh toán", number: 6 },
};
const PreviewCard = ({ data }) => {
  console.log(data);
  const history = useHistory();
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    statusBlock[data?.status]
  );

  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(
    paymentStatusBlock[data?.paymentStatus]
  );

  const [disable, setDisable] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: statusBlock[data?.status],
      paymentStatus: paymentStatusBlock[data?.paymentStatus],
    },
    // resolver: yupResolver(schema),
    mode: "all",
  });
  const handleUpdate = async () => {
    console.log({
      method: ORDER_UPDATE.method,
      path: ORDER_UPDATE.path + "/" + data?.id,
      data: {
        status: selectedStatus?.value,
        paymentStatus: selectedPaymentStatus?.value,
        name: data?.name,
        phone: data?.phone,
        address: data?.address,
        note: data?.note,
      },
    });
    Service.send({
      method: ORDER_UPDATE.method,
      path: ORDER_UPDATE.path + "/" + data?.id,
      data: {
        status: selectedStatus?.value,
        paymentStatus: selectedPaymentStatus?.value,
        name: data?.name,
        phone: data?.phone,
        address: data?.address,
        note: data?.note,
      },
    }).then((result) => {
      if (result) {
        console.log(result);
        const { status } = result;
        if (status === 200) {
          toast.success("cập nhật thành công");
          history.push("/cms/invoice/list");
        } else {
          setDisable(false);
        }
      }
    });
  };
  console.log(selectedStatus);
  return data !== null ? (
    <Card className="invoice-preview-card px-5  py-5">
      <CardBody className="invoice-padding pb-5">
        {/* Header */}
        <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
          <div className="mt-md-0 mt-2  p-0 col-lg-8">
            <h4 className="invoice-title mb-2">
              Đơn hàng <span className="invoice-number">#{data?.id}</span>
            </h4>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">- Thời gian tạo:</p>
              <p className="invoice-date">{data?.createdAt}</p>
            </div>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">- Thời gian cập nhật:</p>
              <p className="invoice-date">{data?.updatedAt}</p>
            </div>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">
                - Được cập nhật bởi:{" "}
                <span className="text-primary font-weight-bold">
                  {data?.updatedBy}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-md-0 mt-2  p-0 col-lg-4">
            <h4 className="invoice-title mb-2">Thông tin vận chuyển</h4>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">
                - Tên khách hàng:{" "}
                <span className="font-weight-bold text-primary">
                  {data?.name}
                </span>
              </p>
            </div>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">
                - Email:{" "}
                <span className="font-weight-bold text-primary">
                  {data?.email}
                </span>
              </p>
            </div>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">
                - Số điện thoại:{" "}
                <span className="font-weight-bold text-primary">
                  {data?.phone}
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className="invoice-spacing" />

      {/* Address and Contact */}
      <CardBody className="invoice-padding pt-0">
        <Row className="invoice-spacing">
          <Col className="p-0" lg="8">
            <h6 className="mb-2">Địa chỉ nhận hàng:</h6>
            <CardText className="mb-25">- {data?.address}</CardText>
          </Col>
          <Col className="p-0 mt-xl-0 mt-2" lg="4">
            <h6 className="mb-1">Phương thức thanh toán:</h6>
            <span className="pr-1">
              -{(data?.paymentType == 1 && "SHIP COD") || "VNPAY"}
            </span>
            <h6 className="mt-2">Phương thức giao hàng:</h6>
            <span className="pr-1">- Tiêu chuẩn</span>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Invoice Description */}
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th className="py-1">#</th>
            <th className="py-1">Ảnh</th>
            <th className="py-1">Tên sản phẩm</th>
            <th className="py-1">Số lượng</th>
            <th className="py-1">Giá niêm yết</th>
            <th className="py-1">Biến thể</th>
            <th className="py-1">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {data?.listOrderDetail?.map((item, index) => (
            <tr key={index}>
              {/* <td className='py-1'>
              <p className='card-text font-weight-bold mb-25'>Native App Development</p>
              <p className='card-text text-nowrap'>
                Developed a full stack native app using React Native, Bootstrap & Python
              </p>
            </td> */}
              <td className="py-1">
                <span className="font-weight-bold">{item?.id}</span>
              </td>
              <td className="py-1">
                <img src={item?.image} width={80} height={80} />
              </td>
              <td className="py-1">
                <span className="font-weight-bold">{item?.name}</span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold">{item?.quantity}</span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold">{numberToCurrencyStyle(item?.listedPrice)}</span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold">{item?.variant}</span>
              </td>
              <td className="py-1">
                <span className="font-weight-bold">{numberToCurrencyStyle(item?.subPrice)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className="invoice-padding pb-0 px-5">
        <Row className="invoice-sales-total-wrapper  justify-content-between">
          <Col className="mt-md-0 mt-3" md="6" order={{ md: 1, lg: 2 }}></Col>
          <Col
            className="d-flex justify-content-end"
            md="6"
            order={{ md: 2, lg: 1 }}
          >
            <div className="invoice-total-wrapper">
              <div className="invoice-total-item d-flex justify-content-between">
                <p className="invoice-total-title font-weight-bold px-5">
                  Tổng tiền
                </p>
                <p className="invoice-total-amount font-weight-bold ">
                  {numberToCurrencyStyle(data?.totalPrice)} đ
                </p>
              </div>
              <div className="invoice-total-item d-flex justify-content-between">
                <p className="invoice-total-title font-weight-bold px-5">
                  Phiếu quà tặng:
                </p>
                <p className="invoice-total-amount font-weight-bold ">
                  - {numberToCurrencyStyle(data?.voucher)} đ
                </p>
              </div>
              <div className="invoice-total-item d-flex justify-content-between">
                <p className="invoice-total-title font-weight-bold px-5">
                  Phí giao hàng:
                </p>
                <p className="invoice-total-amount font-weight-bold ">
                + {numberToCurrencyStyle(data?.shipCost)} đ 
                </p>
              </div>
             
              <hr className="my-50" />
              <div className="invoice-total-item d-flex justify-content-between">
                <p className="invoice-total-title font-weight-bold px-5">
                  Tổng thanh toán:
                </p>
                <p className="invoice-total-amount font-weight-bold ">
                  {numberToCurrencyStyle(data?.totalPayment)} đ
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* /Total & Sales Person */}

      {/* Invoice Note */}
      {data?.note && (
        <>
          <hr className="invoice-spacing" />

          <CardBody className="invoice-padding pt-0">
            <Row>
              <Col sm="12">
                <span className="font-weight-bold">Ghi chú: </span>
                <span>{data?.note}</span>
              </Col>
            </Row>
          </CardBody>
        </>
      )}
      <hr className="invoice-spacing" />
      <Card className="invoice-action-wrapper pb-5" >
        <CardBody className="pb-5">
          {/* <Button.Ripple color='primary' block className='mb-75' onClick={() => setSendSidebarOpen(true)}>
          Send Invoice
        </Button.Ripple>
        <Button.Ripple color='secondary' block outline className='mb-75'>
          Download
        </Button.Ripple>
        <Button.Ripple
          color='secondary'
          tag={Link}
          to='/apps/invoice/print'
          target='_blank'
          block
          outline
          className='mb-75'
        >
          Print
        </Button.Ripple> */}
          {/* <Button.Ripple tag={Link} to={`/apps/invoice/edit/${id}`} color='secondary' block outline className='mb-75'>
          Edit
        </Button.Ripple> */}
          {/* <Col sm="12"> */}

          {/* </Col> */}
          <Button.Ripple
            className="float-right px-5 mx-2"
            color="danger"
            onClick={() => {
              history.push("/cms/invoice/list");
            }}
          >
            Huỷ
          </Button.Ripple>
          <Button.Ripple
            className="float-right px-5 mx-2"
            color="primary"
            onClick={() => {
              handleUpdate();
            }}
            disabled={disable}
          >
            {disable ? (
              <>
                <Spinner size="sm" />
                <span className="ml-50">Vui lòng đợi...</span>
              </>
            ) : (
              "Cập nhật"
            )}
          </Button.Ripple>

          {/* <Button.Ripple color='primary' className="float-right px-5 mx-2" onClick={() => setAddPaymentOpen(true)}>
        Trạng thái
        </Button.Ripple> */}
          <div style={{ width: "200px", float: "right", zIndex: "999" }}>
            <Controller
              control={control}
              name="status"
              // rules={{
              //   required: true,
              // }}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  classNamePrefix="menu_status"
                  options={[
                    { value: "0", label: "Chờ tiếp nhận", number: 1 },
                    { value: "1", label: "Đã tiếp nhận", number: 2 },
                    { value: "2", label: "Đang xử lý", number: 3 },
                    { value: "3", label: "Đang vận chuyển", number: 4 },
                    { value: "4", label: "Đã giao", number: 5 },
                    { value: "5", label: "Đã huỷ", number: 6 },
                  ]}
                  className={classNames("react-select", {
                    "is-invalid": errors["gender"],
                  })}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedStatus(e);
                  }}
                />
              )}
            />
          </div>
          <div
            style={{
              width: "200px",
              float: "right",
              zIndex: "999",
              margin: "0px 20px ",
            }}
          >
            <Controller
              control={control}
              name="paymentStatus"
              // rules={{
              //   required: true,
              // }}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  classNamePrefix="menu_status"
                  options={[
                    { value: "true", label: "Đã thanh toán", number: 1 },
                    { value: "false", label: "Chưa thanh toán", number: 2 },
                  ]}
                  className={classNames("react-select", {
                    "is-invalid": errors["paymentStatus"],
                  })}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedPaymentStatus(e);
                  }}
                />
              )}
            />
          </div>
        </CardBody>
      </Card>
      <div className="pb-5"> </div>
      {/* /Invoice Note */}
    </Card>
  ) : null;
};

export default PreviewCard;
