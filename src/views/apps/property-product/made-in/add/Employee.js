// ** React Imports
import { useState } from "react";

// ** Custom Components

import madeInService from "@Services/madeInService";
import "@Styles/react/libs/flatpickr/flatpickr.scss";
// ** Third Party Components
import {
  SCHEMA_CREATE_PRODUCT_SET,
  SCHEMA_PROPERTY_PRODUCT,
} from "@Constants/constValidate";
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

const schema = yup.object(SCHEMA_PROPERTY_PRODUCT).required();

const EmployeeTab = ({ selectedUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const history = useHistory();
  const [disable, setDisable] = useState(false);

  // ** Function to change user image

  const onSubmit = async (data) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      const result = await madeInService.CreateEmployee(data);

      if (result.isSuccess) {
        toast.success("Thêm xuất xứ thành công");
        history.push("/cms/property/made-in/list");
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
