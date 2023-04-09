import { yupResolver } from "@hookform/resolvers/yup";
import madeInService from "@Services/madeInService";
import "@Styles/react/libs/flatpickr/flatpickr.scss";
import { selectThemeColors } from "@Utils";
import classnames from "classnames";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import * as yup from "yup";

import { SCHEMA_CREATE_PRODUCT_SET } from "@Constants/constValidate";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
  Spinner
} from "reactstrap";
const statusObject = {
  1: { value: "1", label: "Đang kinh doanh", number: 1 },
  0: { value: "0", label: "Ngừng kinh doanh", number: 2 },
};
const schema = yup.object(SCHEMA_CREATE_PRODUCT_SET).required();

const EmployeeTab = ({ initial }) => {
  const [disable, setDisable] = useState(false);
  const initialValues = {
    ...initial,
    status: statusObject[initial.status],
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
  const onSubmit = async (data) => {
    setDisable(true);
    const customData = {
      id: initial.id,
      name: data.name,
    };
    const result = await madeInService.UpdateEmployee(customData);
    if (result.isSuccess) {
      toast.success("Cập nhật xuất xứ thành công");
      history.push("/cms/property/made-in/list");
    } else {
      setDisable(false);
    }
  };

  return (
    <Row>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm="4">
              <Label for="nameVerticalIcons">Tên:</Label>
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
                  history.push("/cms/property/made-in/list");
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
