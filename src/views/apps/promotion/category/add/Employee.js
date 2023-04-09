// ** React Imports
import { useEffect, useState } from "react";

// ** Custom Components
import { selectThemeColors } from "@Utils";
import Select from "react-select";

import categoryService from "@Services/categoryService";
import PromotionCategoryService from "@Services/promotionCategoryService";

import "@Styles/react/libs/flatpickr/flatpickr.scss";
// ** Third Party Components
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

import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeTab = ({ selectedUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      status: { value: true, label: "Đang sử dụng", number: 2 },
    },
    mode: "all",
  });
  const history = useHistory();
  const [disable, setDisable] = useState(false);

  // ** Function to change user image
  const [listProduct, setListCategory] = useState();

  const onSubmit = async (data) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      const result = await PromotionCategoryService.Create({
        ...data,
        categoryId: data?.categoryId?.value,

        status: data?.status?.value,
        percentage: Number(data?.percentage),
      });

      if (result.isSuccess) {
        toast.success("Thêm khuyến mại loại sản phẩm thành công");
        history.push("/cms/promotion/category/list");
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
    const result = await categoryService.getAll();
    console.log(result);
    result.isSuccess &&
      setListCategory(
        result?.data?.map((item, index) => {
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
                  min: { value: 0, message: "Phần trăm không hợp lệ" },
                  max: { value: 100, message: "Phần trăm không hợp lệ" },
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
              <Label for="search-invoice">Loại sản phẩm:</Label>
              <Controller
                control={control}
                name="categoryId"
                rules={{
                  required: "Vui lòng chọn loại sản phẩm",
                }}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    placeholder="Chọn loại sản phẩm"
                    classNamePrefix="select"
                    options={listProduct}
                    className={classnames("react-select", {
                      "is-invalid": errors["categoryId"],
                    })}
                    {...field}
                  />
                )}
              />
              <p className="text-danger">{errors.categoryId?.message}</p>
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
                  history.push("/cms/promotion/category/list");
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
