// ** React Imports
import { useState } from "react";

import voucherService from "@Services/voucherService";
import "@Styles/react/libs/flatpickr/flatpickr.scss";
import { selectThemeColors } from "@Utils";
import Select from "react-select";
// ** Third Party Components
import { SCHEMA_CREATE_BRAND } from "@Constants/constValidate";
import { isObjEmpty } from "@Utils";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
  Spinner,
} from "reactstrap";

import classnames from "classnames";
import * as yup from "yup";

import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { SCHEMA_VOUCHER } from "../../../../constants/constValidate";
import moment from "moment";

const schema = yup.object(SCHEMA_VOUCHER).required();
const initialValues = {
  gender: 1,
  status: {
    value: "1",
    label: "Đang hoạt động",
    number: 1,
  },
};
const EmployeeTab = ({ selectedUser }) => {
  // ** States

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: initialValues,

    resolver: yupResolver(schema),
    mode: "all",
  });
  const history = useHistory();
  const [disable, setDisable] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    const customData = {
      ...data,
      active:data?.status?.value,
      startDate:data?.startDate&&moment(data?.startDate).format("DD/MM/yyyy"),
      endDate:data?.endDate&&moment(data?.endDate).format("DD/MM/yyyy"),
    };
    if (isObjEmpty(errors)) {
      setDisable(true);
      const result = await voucherService.CreateEmployee(customData);
      if (result.isSuccess) {
        toast.success("Thêm Phiếu giảm giá thành công");
        history.push("/cms/voucher/list");
      } else {
        setDisable(false);
      }
      setDisable(false);
    }
  };

  return (
    <Row>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm="4">
              <Label for="nameVerticalIcons">Tên Phiếu giảm giá:</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      className={classnames({ "is-invalid": errors["name"] })}
                      {...field}
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">{errors.name?.message}</p>
            </Col>
            <Col sm="4">
              <Label for="nameVerticalIcons">Mã giảm giá:</Label>
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      className={classnames({ "is-invalid": errors["code"] })}
                      {...field}
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">{errors.code?.message}</p>
            </Col>
            <Col sm="4">
              <Label for="nameVerticalIcons">Tiền giảm giá:</Label>
              <Controller
                name="money"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      className={classnames({ "is-invalid": errors["money"] })}
                      {...field}
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">{errors.money?.message}</p>
            </Col>
            <Col sm="4">
              <Label for="nameVerticalIcons">Số lượng:</Label>
              <Controller
                name="slot"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      className={classnames({ "is-invalid": errors["slot"] })}
                      {...field}
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">{errors.slot?.message}</p>
            </Col>

            <Col md="4" className="mb-2">
              <Label for="search-invoice">Từ:</Label>
              <Controller
                control={control}
                name="startDate"
                rules={{required:"Vui lòng chọn trường này"}}
                render={({ field }) => (
                  <DatePicker
                    className="datepicker form-control"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    selected={field.value}
                    {...field}
                    // selectsStart
                    // maxTime={endDate}
                    // maxDate={new Date()}
                    placeholderText="Chọn thời gian"
                    // dateFormat="mm"
                    // showFullMonthYearPicker
                    // showTimeSelect
                    // showTimeSelectOnly
                    // selecton
                    // timeIntervals={15}
                    // timeCaption="Month"
                    // dateFormat="DD-MM-yyyy"
                    required
                    dateFormat="dd/MM/yyyy"
                  />
                )}
              />
              <p className="text-danger">{errors.startDate?.message}</p>

            </Col>
            <Col md="4" className="mb-2">
              <Label for="search-invoice">Đến:</Label>
              <Controller
                control={control}
                rules={{required:"Vui lòng chọn trường này"}}

                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    className="datepicker form-control"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    selected={field.value}
                    {...field}
                    // selectsStart
                    // maxTime={endDate}
                    // maxDate={new Date()}
                    placeholderText="Chọn thời gian"
                    // dateFormat="mm"
                    // showFullMonthYearPicker
                    // showTimeSelect
                    required
                    // showTimeSelectOnly
                    // selecton
                    // timeIntervals={15}
                    // timeCaption="Month"
                    // dateFormat="DD-MM-yyyy"
                    dateFormat="dd/MM/yyyy"
                  />
                )}
              />
              <p className="text-danger">{errors.endDate?.message}</p>

            </Col>
            <Col sm="4">
              <Label for="nameVerticalIcons">Ghi chú:</Label>
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input type="textarea" {...field} />
                  </InputGroup>
                )}
              />
            </Col>
            <Col sm="4">
              <Label for="nameVerticalIcons">Email:</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      className={classnames({ "is-invalid": errors["email"] })}
                      {...field}
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">{errors.email?.message}</p>
            </Col>
            <Col md="4" className="mb-2">
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
                      { value: "1", label: "Đang hoạt động", number: 2 },
                      { value: "0", label: "Ngừng hoạt động", number: 3 },
                    ]}
                    {...field}
                  />
                )}
              />
            </Col>
          </Row>
          <Row className="justify-content-end">
            <FormGroup className="d-flex mb-0 mx-1">
              <Button.Ripple
                className="mr-1"
                color="primary"
                type="submit"
                disabled={disable}
              >
                {disable ? (
                  <>
                    <Spinner size="sm" />
                    <span className="ml-50">Vui lòng đợi...</span>
                  </>
                ) : (
                  "Thêm"
                )}
              </Button.Ripple>
              <Button.Ripple
                outline
                color="secondary"
                onClick={() => {
                  history.push("/cms/classify/brand/list");
                }}
              >
                Huỷ
              </Button.Ripple>
            </FormGroup>
            {/* </Col> */}
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
export default EmployeeTab;
