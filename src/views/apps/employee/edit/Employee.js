import Avatar from "@Components/avatar";
import commonService from "@Services/commonService";
import employeeService from "@Services/employeeService";
import { selectThemeColors } from "@Utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useState } from "react";
import Select from "react-select";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Media,
  Row,
  Spinner,
} from "reactstrap";
import * as yup from "yup";

import { SCHEMA_EMPLOYEE } from "@Constants/constValidate";
import classnames from "classnames";
import { Edit, Trash2 } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

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
const schema = yup.object(SCHEMA_EMPLOYEE).required();

const EmployeeTab = ({ initial }) => {
  // ** States
  const [avatar, setAvatar] = useState(initial.image);
  const [userData, setUserData] = useState(null);

  const [disable, setDisable] = useState(false);
  const initialValues = {
    ...initial,
    role: roleObject[initial.role],
    status: statusObject[initial.status],
    gender: genderObject[initial.gender],
    note: initial.note || " ",
    birthDay:null
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
  const onChange = async (e) => {
    let files = e.target.files;
    const imageData = new FormData();
    imageData.append("file", files[0]);
    const result = await commonService.UploadFile(imageData);
    setAvatar(result?.data?.url);
  };

  const onSubmit = async (data) => {
    setDisable(true);
    const customData = {
      ...data,
      id: initial.id,
      image: avatar,
      role: data.role.value,
      status: data.status.value,
      gender: data.gender.value,
      birthDay: moment(data.birthday).format("DD/MM/yyyy"),
    };
    delete customData.createdAt;
    const result = await employeeService.UpdateEmployee(customData);
    if (result.isSuccess) {
      toast.success("Cập nhật nhân viên thành công");
      history.push("/cms/employee/list");
    } else {
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


<Controller
    control={control}
    name='birthDay'
    render={({ field }) => (
      <DatePicker
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
