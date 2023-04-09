import { yupResolver } from "@hookform/resolvers/yup";
import colorService from "@Services/colorService";
import productService from "@Services/productService";
import "@Styles/react/libs/flatpickr/flatpickr.scss";
import { selectThemeColors } from "@Utils";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import PromotionProductService from "@Services/promotionProductService";
import * as yup from "yup";
import { isObjEmpty } from "@Utils";

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
  "true": { value: true, label: "Đang sử dụng", number: 2 },
   "false":{ value: false, label: "Không sử dụng", number: 3 },
 };
const schema = yup.object(SCHEMA_CREATE_PRODUCT_SET).required();

const EmployeeTab = ({ initial }) => {
  const [disable, setDisable] = useState(false);
  const [listProduct, setListProduct] = useState();

  const initialValues = {
    ...initial,
    status: statusObject[initial.status],
    productId:{ value: initial.product?.id, label: initial.product?.name, number: 0 }
  }

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
    if (isObjEmpty(errors)) {
      setDisable(true);
      const result = await PromotionProductService.Update({
        ...data,
        productId: data?.productId?.value,
        status: data?.status?.value,
        percentage: Number(data?.percentage),
        id:initial?.id
      });

      if (result.isSuccess) {
        toast.success("Cập nhật khuyến mại sản phẩm thành công");
        history.push("/cms/promotion/product/list");
      } else {
        setDisable(false);
      }
      setDisable(false);
    }
  };
  useEffect(() => {
    handleGetListProduct();
  }, []);
  const handleGetListProduct = async () => {
    const result = await productService.GetAll();
    result.isSuccess &&
      setListProduct(
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
              <Label for="nameVerticalIcons">Tên:</Label>
              <Controller
                name="name"
                rules={{ required: "Vui lòng nhập tên" }}
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
            <Col md="4" className="mb-2">
              <Label for="search-invoice">Phần trăm:</Label>
              <Controller
                name="percentage"
                rules={{
                  required: "Vui lòng nhập phần trăm",
                  min: {value:0,message:"Phần trăm không hợp lệ"},
                  max: {value:100,message:"Phần trăm không hợp lệ"},

                }}
                control={control}
                render={({ field }) => (
                  <Input
                    className={classnames({
                      "is-invalid": errors["percentage"],
                    })}
                    {...field}
                  />
                )}
              />
              <p className="text-danger">{errors.percentage?.message}</p>
            </Col>
            <Col sm="4">
              <Label for="search-invoice">Sản phẩm:</Label>
              <Controller
                control={control}
                name="productId"
                rules={{
                  required:"Vui lòng chọn sản phẩm"
                }}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    placeholder="Chọn sản phẩm"
                    classNamePrefix="select"
                    options={listProduct}
                    className={classnames("react-select", {
                      "is-invalid": errors["productId"],
                    })}
                    {...field}
                  />
                )}
              />
              <p className="text-danger">{errors.productId?.message}</p>
            </Col>
            <Col md="12" className="mb-2">
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
                      { value: true, label: "Đang sử dụng", number: 2 },
                      { value: false, label: "Không sử dụng", number: 3 },
                    ]}
                    {...field}
                  />
                )}
              />
            </Col>
            <Col sm="12">
              <Label for="nameVerticalIcons">Mô tả:</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      type="textarea"
                      className={classnames({
                        "is-invalid": errors["description"],
                      })}
                      {...field}
                    />
                  </InputGroup>
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
                  history.push("/cms/promotion/product/list");
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
