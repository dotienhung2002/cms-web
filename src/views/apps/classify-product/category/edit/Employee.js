// ** React Imports
import { useState } from "react";

import categoryService from "@Services/categoryService";
import "@Styles/react/libs/flatpickr/flatpickr.scss";
import { selectThemeColors } from "@Utils";
import Select from "react-select";
// ** Third Party Components
import { SCHEMA_CREATE_CATEGORY } from "@Constants/constValidate";
import { yupResolver } from "@hookform/resolvers/yup";
import { isObjEmpty } from "@Utils";
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

const schema = yup.object(SCHEMA_CREATE_CATEGORY).required();
const statusObject = {
  1: { value: "1", label: "Đang kinh doanh", number: 1 },
  0: { value: "0", label: "Ngừng kinh doanh", number: 2 },
};
const EmployeeTab = ({ initial }) => {
  // ** States
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
  const [disable, setDisable] = useState(false);

  const onSubmit = async (data) => {
    if (isObjEmpty(errors)) {
      const customData = {
        id: initial.id,
        name: data.name,
        productSetId: initialValues?.productSet?.id,
        status: data?.status?.value,
      };
      setDisable(true);
      const result = await categoryService.UpdateEmployee(customData);
      if (result.isSuccess) {
        toast.success("Cập nhật loại sản phẩm thành công");
        history.push("/cms/classify/category/list");
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
              <Label for="nameVerticalIcons">Tên loại sản phẩm:</Label>

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
              <Label for="nameVerticalIcons">Tập sản phẩm:</Label>
              <InputGroup className="input-group-merge" tag={FormGroup}>
                <Input
                  disabled
                  defaultValue={initialValues?.productSet?.name}
                />
              </InputGroup>
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
                      { value: "1", label: "Đang kinh doanh", number: 1 },
                      { value: "0", label: "Ngừng kinh doanh", number: 2 },
                    ]}
                    {...field}
                  />
                )}
              />
            </Col>
            <Col sm="4">
              <Label for="nameVerticalIcons">Ngày tạo:</Label>

              <Controller
                name="createdAt"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input {...field} disabled />
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
                  <Input {...field} disabled />
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
                <Input {...field} disabled />
              </InputGroup>
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
                  "Cập nhật"
                )}
              </Button.Ripple>
              <Button.Ripple
                outline
                color="secondary"
                onClick={() => {
                  history.push("/cms/classify/category/list");
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
