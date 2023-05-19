import Avatar from "@Components/avatar";
import customerService from "@Services/customerService";
import { selectThemeColors } from "@Utils";
import "@Styles/react/libs/flatpickr/flatpickr.scss";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { useState } from "react";
import Select from "react-select";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  CustomInput,
  InputGroup,
  Label,
  Media,
  Row,
  Spinner,
} from "reactstrap";
import * as yup from "yup";

import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  SCHEMA_CREATE_EMPLOYEE,
  SCHEMA_UPDATE_CUSTOMER,
} from "@Constants/constValidate";
const statusObject = {
  1: { value: "1", label: "Đang hoạt động", number: 1 },
  0: { value: "0", label: "Ngừng hoạt động", number: 2 },
};
const roleObject = {
  1: { value: "1", label: "Quản trị viên", number: 1 },
  0: { value: "0", label: "Nhân viên", number: 2 },
};
const genderObject = {
  1: { value: "1", label: "Nam", number: 1 },
  0: { value: "0", label: "Nữ", number: 1 },
};
const schema = yup.object(SCHEMA_UPDATE_CUSTOMER).required();

const EmployeeTab = ({ initial }) => {
  // ** States
  const [img, setImg] = useState(null);
  const [userData, setUserData] = useState(null);

  const [disable, setDisable] = useState(false);
  const initialValues = {
    ...initial,
    role: roleObject[initial.role],
    status: statusObject[initial.status],
    gender: genderObject[initial.gender],
    birthDay: null,
  };

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
  // ** Function to change user image
  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const onSubmit = async (data) => {
    setDisable(true);
    const customData = {
      id: initial.id,
      name: data.name?.trim() || null,
      birthDay: moment(data.birthday).format("yyyy-MM-DD"),
      phone: data.phone?.trim() || null,
      gender: data?.gender?.value || null,
      email: data.email?.trim() || null,
      status: data.status.value,
      heigth: data.heigth,
      weight: data.weight,
    };
    const result = await customerService.UpdateCustomer(customData);
    if (result.isSuccess) {
      toast.success("Cập nhật khách hàng thành công");
      history.push("/cms/customer/list");
    } else {
      setDisable(false);
    }
  };

  // ** Renders User
  const renderUserAvatar = () => {
    if (img === null) {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          "light-success",
          "light-danger",
          "light-warning",
          "light-info",
          "light-primary",
          "light-secondary",
        ],
        color = states[stateNum];
      return (
        <Avatar
          initials
          color={color}
          className="rounded mr-2 my-25"
          content={" "}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(36px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "90px",
            width: "90px",
          }}
        />
      );
    } else {
      return (
        <img
          className="user-avatar rounded mr-2 my-25 cursor-pointer"
          src={img}
          alt="user profile avatar"
          height="90"
          width="90"
        />
      );
    }
  };

  return (
    <Row>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm="4">
              <Label for="nameVerticalIcons">Họ và tên:</Label>
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

            {/* <Col sm="4">
              <FormGroup>
                <Label className="d-block" for="dob">
                  Ngày sinh
                </Label>
                <Controller
                  control={control}
                  name="birthDay"
                  render={({ field }) => (
                    <ReactDatePicker
                      className={classnames("form-control input", {
                        "is-invalid": errors["birthDay"],
                      })}
                      placeholderText="Select date"
                      onChange={(e) => field.onChange(e)}
                      selected={field.value}
                    />
                  )}
                />
                <p className="text-danger">{errors.birthDay?.message}</p>
              </FormGroup>
            </Col> */}
            <Col sm="4">
              <Label>Số điện thoại:</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      className={classnames({ "is-invalid": errors["phone"] })}
                      {...field}
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">{errors.phone?.message}</p>
            </Col>

            <Col sm="4">
              <Label className="d-block mb-1">Giới tính:</Label>

              <FormGroup>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      isClearable={false}
                      className="react-select"
                      classNamePrefix="select"
                      options={[
                        { value: "1", label: "Nam", number: 1 },
                        { value: "0", label: "Nữ", number: 2 },
                      ]}
                      {...field}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col sm="4">
              <Label> Email:</Label>
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
            {/* <Col sm="4">
              <Label>Cân nặng:</Label>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      name="weight"
                      type="number"
                      placeholder={"kg"}
                      {...field}
                      className={classnames({ "is-invalid": errors["weight"] })}
                    />
                  </InputGroup>
                )}
              />

              <p className="text-danger">
                {errors.weight?.message && "Cân nặng không hợp lệ"}
              </p>
            </Col>
            <Col sm="4">
              <Label>Chiều cao:</Label>
              <Controller
                name="height"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      type="number"
                      placeholder={"cm"}
                      {...field}
                      className={classnames({ "is-invalid": errors["height"] })}
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">
                {errors.height?.message && "Chiều cao không hợp lệ"}
              </p>
            </Col> */}

            <Col sm="4">
              <Label>Trạng thái:</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    options={[
                      { value: "1", label: "Đang hoạt động", number: 1 },
                      { value: "0", label: "Ngừng hoạt động", number: 2 },
                    ]}
                    {...field}
                  />
                )}
              />
            </Col>
            <Col sm="4">
              <Label>Thông tin giao hàng:</Label>
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      type="textarea"
                      className={classnames({ "is-invalid": errors["note"] })}
                      {...field}
                      disabled
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">{errors.note?.message}</p>
            </Col>
            <Col sm="4">
              <Label for="nameVerticalIcons">Ngày tạo:</Label>
              <Controller
                name="createdAt"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input disabled {...field} />
                  </InputGroup>
                )}
              />
            </Col>
            <Col sm="4">
              <Label for="nameVerticalIcons">Ngày cập nhật:</Label>
              <Controller
                name="updatedAt"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input disabled {...field} />
                  </InputGroup>
                )}
              />
            </Col>
            <Col sm="4">
              <Label for="nameVerticalIcons">Cập nhật bởi:</Label>
              <Controller
                name="updatedBy"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input disabled {...field} />
                  </InputGroup>
                )}
              />
            </Col>
          </Row>
          <Row className="justify-content-end">
            {/* <Col sm="4"> */}
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
                  "Cập nhật"
                )}
              </Button.Ripple>
              <Button.Ripple
                outline
                color="secondary"
                onClick={() => {
                  history.push("/cms/customer/list");
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
