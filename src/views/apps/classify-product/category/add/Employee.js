// ** React Imports
import { useEffect, useState } from "react";

import categoryService from "@Services/categoryService";
import productSetService from "@Services/productSetService";
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
  const [optionProductSet, setOptionProductSet] = useState();

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
      productSetId: data?.productSet?.value,
    };
    if (isObjEmpty(errors)) {
      setDisable(true);
      const result = await categoryService.CreateEmployee(customData);
      if (result.isSuccess) {
        toast.success("Thêm loại sản phẩm thành công");
        history.push("/cms/classify/category/list");
      } else {
        setDisable(false);
      }
      setDisable(false);
    }
  };

  useEffect(() => {
    handleGetListProductSet();
  }, []);
  const handleGetListProductSet = async () => {
    const result = await productSetService.getAll();
    result.isSuccess &&
      setOptionProductSet(
        result?.data?.data?.map((item, index) => {
          return { value: item.id, label: item.name, number: index };
        })
      );
  };
  return (
    <Row>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm="4">
              <Label for="nameVerticalIcons">Tên thể loại:</Label>
              
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
              <Label for="search-invoice">Tập sản phẩm:</Label>
              <Controller
                control={control}
                name="productSet"
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    placeholder="Chọn tập sản phẩm"
                    classNamePrefix="select"
                    options={optionProductSet}
                    className={classnames("react-select", {
                      "is-invalid": errors["productSet"],
                    })}
                    {...field}
                  />
                )}
              />
              <p className="text-danger">{errors.productSet?.message}</p>
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
