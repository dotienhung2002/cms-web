// ** React Imports
import { useEffect, useState } from "react";

import productSetService from "@Services/productSetService";
import brandService from "@Services/brandService";
import "@Styles/react/libs/flatpickr/flatpickr.scss";
import { selectThemeColors } from "@Utils";
import Select from "react-select";
// ** Third Party Components
import { SCHEMA_CREATE_BRAND } from "@Constants/constValidate";
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

const schema = yup.object(SCHEMA_CREATE_BRAND).required();
const initialValues = {
  gender: 1,
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

  const onSubmit = async (data) => {
    console.log(data);
    const customData = {
      name: data.name,
    };
    if (isObjEmpty(errors)) {
      setDisable(true);
      const result = await brandService.CreateEmployee(customData);
      if (result.isSuccess) {
        toast.success("Thêm thương hiệu thành công");
        history.push("/cms/classify/brand/list");
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
              <Label for="nameVerticalIcons">Tên thương hiệu:</Label>
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
