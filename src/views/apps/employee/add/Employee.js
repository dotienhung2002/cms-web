// ** React Imports
import { useState } from "react";

// ** Custom Components
import Avatar from "@Components/avatar";
import commonService from "@Services/commonService";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import employeeService from "@Services/employeeService";
// import "@Styles/react/libs/flatpickr/flatpickr.scss";
import { selectThemeColors } from "@Utils";
import Select from "react-select";
// ** Third Party Components
import { SCHEMA_EMPLOYEE } from "@Constants/constValidate";
import { yupResolver } from "@hookform/resolvers/yup";
import { isObjEmpty } from "@Utils";
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Media,
  Row,
  Spinner,
} from "reactstrap";

import classnames from "classnames";
import { Edit, Trash2 } from "react-feather";
import * as yup from "yup";

import moment from "moment";
import Flatpickr from "react-flatpickr";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object(SCHEMA_EMPLOYEE).required();
const initialValues = {
  gender: { value: "1", label: "Nam", number: 1 },
  role: { value: "0", label: "Nhân viên", number: 2 },
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
  const [avatar, setAvatar] = useState(null);
  const [birthDay,setBirthday] = useState(new Date())
  // ** Function to change user image
  const onChange = async (e) => {
    let files = e.target.files;
    const imageData = new FormData();
    imageData.append("file", files[0]);
    const result = await commonService.UploadFile(imageData);
    setAvatar(result?.data?.url);
  };
  const onSubmit = async (data) => {
    
    const customData = {
      ...data,
      image: avatar,
      birthDay: moment(data.birthDay).format("DD/MM/yyyy"),
      role: parseInt(data?.role?.value),
      gender: parseInt(data?.gender?.value),
      status: parseInt(data?.status?.value),
    };
    if (isObjEmpty(errors)) {
      setDisable(true);
      const result = await employeeService.CreateEmployee(customData);

      if (result.isSuccess) {
        toast.success("Thêm nhân viên thành công");
        history.push("/cms/employee/list");
      } else {
        setDisable(false);
      }
      setDisable(false);
    }
  };

  // ** Renders User
  const renderUserAvatar = () => {
    if (avatar === null) {
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
          src={avatar}
          alt="user profile avatar"
          height="90"
          width="90"
        />
      );
    }
  };

  return (
    <Row>
      <Col sm="4">
        <Media className="mb-2">
          {renderUserAvatar()}
          <Media className="mt-50" body>
            <h4>Ảnh </h4>
            <div className="d-flex flex-wrap mt-1 px-0">
              <Button.Ripple
                id="change-img"
                tag={Label}
                className="mr-75 mb-0"
                color="primary"
              >
                <span className="d-none d-sm-block">Tải lên</span>
                <span className="d-block d-sm-none">
                  <Edit size={14} />
                </span>
                <input
                  type="file"
                  hidden
                  id="change-img"
                  onChange={onChange}
                  accept="image/*"
                />
              </Button.Ripple>
              <Button.Ripple
                color="secondary"
                outline
                onClick={() => setAvatar(null)}
              >
                <span className="d-none d-sm-block">Đặt lại</span>
                <span className="d-block d-sm-none">
                  <Trash2 size={14} />
                </span>
              </Button.Ripple>
            </div>
          </Media>
        </Media>
      </Col>
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
            <Col sm="4">
              <Label for="nameVerticalIcons">Tên đăng nhập:</Label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      className={classnames({
                        "is-invalid": errors["username"],
                      })}
                      {...field}
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">{errors.username?.message}</p>
            </Col>

            <Col sm="4">
              <FormGroup>
                <Label className="d-block" for="dob">
                  Ngày sinh
                </Label>
                {/* <Controller
                  name="birthDay"
                  control={control}
                  render={({ field }) => (
              
                  )}
                /> */}
                 <Controller
            control={control}
            name="birthDay"
            render={({ field }) => (
              <ReactDatePicker
                className={classnames("form-control input", {
                  "is-invalid": errors['birthDay'],
                })}
                placeholderText="Select date"
                onChange={(e) => field.onChange(e)}
                selected={field.value}
              />
            )}
          />
                      {/* <Flatpickr
                      className={classnames("form-control", {
                        "is-invalid": birthDay&&!birthDay,
                      })}
                      placeholder="DD/MM/YYYY"
                      options={{
                        dateFormat: "d-m-Y",
                        maxDate: moment(new Date()).format("DD/MM/yyyy"),
                        allowInput: true
                      }}
                      onChange={(e) => setBirthday(e)}
                      value={birthDay}
                      
                    /> */}
              <p className="text-danger">{errors.birthDay?.message}</p>

                {/* <p className="text-danger">{birthDay&&"Vui lòng chọn ngày sinh"}</p> */}
              </FormGroup>
            </Col>
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
              <Label>Giới tính:</Label>
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
            <Col sm="4">
              <Label> CMND/CCCD:</Label>
              <Controller
                name="identityCard"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      className={classnames({
                        "is-invalid": errors["identityCard"],
                      })}
                      {...field}
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">{errors.identityCard?.message}</p>
            </Col>
            <Col sm="4">
              <Label> Vai trò:</Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    options={[
                      { value: "1", label: "Quản trị viên", number: 1 },
                      { value: "0", label: "Nhân viên", number: 2 },
                    ]}
                    {...field}
                  />
                )}
              />
            </Col>
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

            <Col sm="12">
              <Label> Ghi chú:</Label>
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      type="textarea"
                      className={classnames({ "is-invalid": errors["note"] })}
                      {...field}
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">{errors.note?.message}</p>
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
                  "Thêm"
                )}
              </Button.Ripple>
              <Button.Ripple
                outline
                color="secondary"
                onClick={() => {
                  history.push("/cms/employee/list");
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
