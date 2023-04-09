import CardAction from "@Components/card-actions";
import { SCHEMA_PRODUCT } from "@Constants/constValidate";
import brandService from "@Services/brandService";
import categoryService from "@Services/categoryService";
import colorService from "@Services/colorService";
import commonService from "@Services/commonService";
import madeinService from "@Services/madeInService";
import productService from "@Services/productService";
import sizeService from "@Services/sizeService";
import "@Styles/react/libs/flatpickr/flatpickr.scss";
import { isObjEmpty, selectThemeColors } from "@Utils";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  Button,
  CardBody,
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

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductImage from "./ProductImage";
import SizeAndAmount from "./SizeAndAmount";

const EmployeeTab = ({ initial }) => {
  const [load, setLoad] = useState(true);
  const [listImage, setListImage] = useState({});
  const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listMadeIn, setListMadeIn] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listSize, setListSize] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadData, setLoadData] = useState(false);
  const genderBlock = {
    1: { value: "1", label: "Nam", number: 1 },
    0: { value: "0", label: "Nữ", number: 2 },
  };

  const statusBlock = {
    1: { value: "1", label: "Còn hàng", number: 1 },
    0: { value: "0", label: "Hết hàng", number: 2 },
    "-1": { value: "-1", label: "Ngừng kinh doanh", number: 2 },
  };
  const availableBlock = {
    1: { value: "1", label: "Đã kích hoạt", number: 1 },
    0: { value: "0", label: "Chưa kích hoạt", number: 2 },
  };
  const [listProductDetail, setListProductDetail] = useState(() => {
    return initial.listProductDetail?.map((item) => {
      return {
        promotionPercentage: item.promotionPercentage + " %",
        promotionPrice: item.promotionPrice,
        price: item.originPrice,
        color: { value: item.color?.id, label: item.color?.name, number: 1 },
        sizeAndAmount: item?.listSize?.map((item) => {
          return {
            size: { value: item.id, label: item.name, number: 1 },
            amount: item.availAmount,
          };
        }),
      };
    });
  });
  const initialValues = {
    ...initial,
    gender: genderBlock[initial.gender],
    status: statusBlock[initial.status],
    available: availableBlock[initial.available],
    brandId: {
      value: initial.brand?.id,
      label: initial.brand?.name,
      number: 1,
    },
    categoryId: {
      value: initial.category?.id,
      label: initial.category?.name,
      number: 1,
    },
    madeInId: {
      value: initial.madeIn?.id,
      label: initial.madeIn?.name,
      number: 1,
    },
    listProductDetail: listProductDetail,
  };
  console.log(initial);

  const [chillrenColors, setChildrenColors] = useState();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: initialValues,
    mode: "all",
    // resolver: yupResolver(schema),
  });
  useEffect(() => {
    let listColorIsActive =
      (getValues()?.listProductDetail?.length > 0 &&
        getValues()?.listProductDetail?.map((item) => item.color?.value)) ||
      [];

    if (listColor) {
      const listTemp = [];
      listColor.map((item) => {
        if (!listColorIsActive.includes(item.value)) {
          listTemp.push(item);
        }
      });
      setChildrenColors(listTemp);
    }
  }, [loadData, listColor]);

  useEffect(() => {
    const init = async () => {
      Promise.all([
        brandService.getAll(),
        categoryService.getAll(),
        colorService.getAll(),
        sizeService.getAll(),
        madeinService.getAll(),
      ]).then((res) => {
        //BRAND
        setListBrand(
          res[0]?.data.map((item, index) => {
            return { value: item.id, label: item.name, number: index };
          })
        );
        //CATEGORY
        setListCategory(
          res[1]?.data.map((item, index) => {
            return { value: item.id, label: item.name, number: index };
          })
        );
        //COLOR
        setListColor(
          res[2]?.data.map((item, index) => {
            return { value: item.id, label: item.name, number: index };
          })
        );
        const listColorBackup = res[2]?.data.map((item, index) => item.id);
        const chillrenColors = initial?.listProductDetail?.map(
          (details) => !listColorBackup.includes[details.color?.id]
        );
        setChildrenColors(chillrenColors);
        //SIZE
        setListSize(
          res[3]?.data.map((item, index) => {
            return { value: item.id, label: item.name, number: index };
          })
        );

        //MADEIN
        setListMadeIn(
          res[4]?.data.map((item, index) => {
            return { value: item.id, label: item.name, number: index };
          })
        );
      });
    };
    init();
  }, []);

  const {
    fields,
    remove,
    append,
    insert,
    prepend,
    move,
    swap,
    update,
    replace,
  } = useFieldArray({
    control,
    name: "listProductDetail",
  });

  const history = useHistory();
  const [disable, setDisable] = useState(false);
  // ** Function to change user image
  const onSelectFile = async (e) => {
    let files = e.target.files;
    const imageData = new FormData();
    imageData.append("file", files[0]);
    const result = await commonService.UploadFile(imageData);
    const keyParent = e.target.getAttribute("keyParent");
    const name = `listProductDetail[${keyParent}].images`;
    const index = e.target.getAttribute("index");

    register(`listProductDetail[${index}].id`);
    setValue(`listProductDetail[${index}].id`, keyParent);

    if (!listImage[name]) {
      setListImage((prev) => {
        return { ...prev, [name]: [{ image: result?.data?.url }] };
      });
    } else {
      const listImageByKey = [...listImage[name]];
      listImageByKey.push({ image: result?.data?.url });
      setListImage((prev) => {
        return { ...prev, [name]: listImageByKey };
      });
    }
    setLoad(!load);
  };
  const onSubmit = async (data) => {
    console.log(listImage);
    const customListProductDetail = [];
    data?.listProductDetail?.map((item, index) => {
      customListProductDetail.push({
        colorId: item?.color?.value || null,
        originPrice: item?.price || null,
        listSizeIds: item?.sizeAndAmount?.map((item) => item.size?.value) || [],
        listAvailAmount:
          item?.sizeAndAmount?.map((item) => parseInt(item.amount)) || [],
        listProductImage:
          listImage[`listProductDetail[${item?.id}].images`] || [],
      });
    });
    const customData = {
      id: id,
      name: data?.name?.trim() || null,
      gender: parseInt(data?.gender?.value),
      description: data?.description?.trim() || null,
      brandId: data?.brandId?.value,
      status: data?.status?.value,
      available: data?.available?.value,

      madeInId: data?.madeInId?.value,
      categoryId: data?.categoryId?.value,
      listProductDetail: customListProductDetail,
    };
    if (isObjEmpty(errors)) {
      setDisable(true);
      const result = await productService.UpdateEmployee(customData);

      if (result.isSuccess) {
        toast.success("Cập nhật sản phẩm thành công");
        history.push("/cms/product/list");
      } else {
        setDisable(false);
      }
      setDisable(false);
    }
  };

  useEffect(() => {
    const listTemp = { ...listImage };
    fields.forEach((item, index) => {
      // initial?.listProductDetail?.forEach((details,index) => {
      // listTemp[`listProductDetail[${item.id}].images`] =details?.listProductImage;

      // });
      listTemp[`listProductDetail[${item.id}].images`] =
        initial?.listProductDetail[index]?.listProductImage;

      console.log(listTemp);
      setListImage(listTemp);
      setValue(`listProductDetail[${index}].id`, item.id);
    });
  }, []);

  return (
    <Row>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mt-2">
            <Col sm="12">
              <Label for="nameVerticalIcons">Tên sản phẩm:</Label>
              <Controller
                name="name"
                control={control}
                rules={{
                  validate: (value) =>
                    (value && value.trim() != "") ||
                    "Vui lòng nhập tên sản phẩm",
                }}
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
            <Col sm="12">
              <Label>Giới tính:</Label>
              <Controller
                control={control}
                name="gender"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    classNamePrefix="select"
                    placeholder="Chọn giới tính"
                    options={[
                      { value: "1", label: "Nam", number: 1 },
                      { value: "0", label: "Nữ", number: 2 },
                    ]}
                    className={classnames("react-select", {
                      "is-invalid": errors["gender"],
                    })}
                    {...field}
                  />
                )}
              />

              <p className="text-danger">
                {errors.gender && "Vui lòng chọn giới tính"}
              </p>
            </Col>
            <Col sm="12" className="mt-1">
              <Label>Thương hiệu:</Label>
              <Controller
                control={control}
                name="brandId"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className={classnames("react-select", {
                      "is-invalid": errors["brandId"],
                    })}
                    classNamePrefix="select"
                    placeholder="Chọn thương hiệu"
                    options={listBrand}
                    {...field}
                  />
                )}
              />
              <p className="text-danger">
                {errors.brandId && "Vui lòng chọn thương hiệu"}
              </p>
            </Col>

            <Col sm="12" className="mt-1">
              <Label>Loại sản phẩm:</Label>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name="categoryId"
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className={classnames("react-select", {
                      "is-invalid": errors["categoryId"],
                    })}
                    classNamePrefix="select"
                    placeholder="Chọn loại sản phẩm"
                    options={listCategory}
                    {...field}
                  />
                )}
              />
              <p className="text-danger">
                {errors.categoryId && "Vui lòng chọn loại sản phẩm"}
              </p>
            </Col>

            <Col sm="12" className="mt-1">
              <Label>Xuất xứ:</Label>
              <Controller
                control={control}
                name="madeInId"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    classNamePrefix="select"
                    placeholder="Chọn xuất xứ"
                    className={classnames("react-select", {
                      "is-invalid": errors["madeInId"],
                    })}
                    options={listMadeIn}
                    {...field}
                  />
                )}
              />
              <p className="text-danger">
                {errors.madeInId && "Vui lòng chọn xuất xứ"}
              </p>
            </Col>
            <Col sm="12" className="mt-1">
              <Label>Trạng thái:</Label>
              <Controller
                control={control}
                name="status"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    classNamePrefix="select"
                    placeholder="Chọn trạng thái"
                    className={classnames("react-select", {
                      "is-invalid": errors["status"],
                    })}
                    options={[
                      { value: "1", label: "Đang hoạt động", number: 1 },
                      { value: "0", label: "Ngừng hoạt động", number: 2 },
                      { value: "-1", label: "Ngừng kinh doanh", number: 2 },
                    ]}
                    {...field}
                  />
                )}
              />
              <p className="text-danger">
                {errors.madeInId && "Vui lòng chọn xuất xứ"}
              </p>
            </Col>
            <Col sm="12" className="mt-1">
              <Label>Kích hoạt:</Label>
              <Controller
                control={control}
                name="available"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    classNamePrefix="select"
                    placeholder="Chọn trạng thái"
                    className={classnames("react-select", {
                      "is-invalid": errors["available"],
                    })}
                    options={[
                      { value: "1", label: "Đã kích hoạt", number: 1 },
                      { value: "0", label: "Chưa kích hoạt", number: 2 },
                    ]}
                    {...field}
                  />
                )}
              />
              <p className="text-danger">
                {errors.madeInId && "Vui lòng chọn xuất xứ"}
              </p>
            </Col>
            <Col sm="12">
              <Label for="nameVerticalIcons">Tên số lượng tồn:</Label>
              <Controller
                name="totalAmount"
                control={control}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input disabled {...field} />
                  </InputGroup>
                )}
              />
            </Col>
            <Col sm="12">
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
            <Col sm="12">
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
            <Col sm="12">
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

          <Button.Ripple className="my-3" color="primary" type="submit">
            Thông tin chi tiết
          </Button.Ripple>

          {fields.map((item, index) => {
            return (
              <CardAction
                title={"Chi tiết " + (index + 1)}
                actions="collapse"
                key={item.id}
                color="secondary"
                isOutline={true}
              >
                <CardBody>
                  <ProductImage
                    {...{
                      getValues,
                      onSelectFile,
                      register,
                      listImage,
                      setListImage,
                    }}
                    nestIndex={index}
                    keyParent={item.id}
                  />
                  <Row>
                    <Col sm="5">
                      <Label>Màu sắc:</Label>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        name={`listProductDetail[${index}].color`}
                        render={({ field }) => (
                          <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            classNamePrefix="select"
                            placeholder="Chọn màu sắc"
                            className={classnames("react-select", {
                              "is-invalid":
                                errors?.listProductDetail &&
                                errors?.listProductDetail[index]?.color,
                            })}
                            value={field.value}
                            options={chillrenColors}
                            {...register(`listProductDetail[${index}].color`)}
                            onChange={(val) => {
                              field.onChange(val);
                              setLoadData(!loadData);
                            }}
                          />
                        )}
                      />
                      <p className="text-danger">
                        {errors?.listProductDetail &&
                          errors?.listProductDetail[index]?.color &&
                          "Vui lòng chọn màu sắc"}
                      </p>
                    </Col>
                    <Col sm="5">
                      <Label for="nameVerticalIcons">Giá gốc:</Label>

                      <Controller
                        name={`listProductDetail[${index}].price`}
                        control={control}
                        rules={{
                          validate: (value) =>
                            (value && true) || "Vui lòng nhập giá",
                          min: { value: 0, message: "Giá không hợp lệ" },
                        }}
                        render={({ field }) => (
                          <InputGroup
                            className="input-group-merge"
                            tag={FormGroup}
                          >
                            <Input
                              type="number"
                              name={`listProductDetail[${index}].price`}
                              className={classnames({
                                "is-invalid":
                                  errors?.listProductDetail &&
                                  errors?.listProductDetail[index]?.price,
                              })}
                              {...field}
                            />
                          </InputGroup>
                        )}
                      />

                      <p className="text-danger">
                        {errors?.listProductDetail &&
                          errors?.listProductDetail[index]?.price?.message}
                      </p>
                    </Col>

                    <Col sm="5">
                      <Label for="nameVerticalIcons">Giảm giá:</Label>
                      <Controller
                        name={`listProductDetail[${index}].promotionPercentage`}
                        control={control}
                        render={({ field }) => (
                          <InputGroup
                            className="input-group-merge"
                            tag={FormGroup}
                          >
                            <Input disabled {...field} />
                          </InputGroup>
                        )}
                      />
                    </Col>
                    <Col sm="5">
                      <Label for="nameVerticalIcons">Giảm sau khi giảm:</Label>
                      <Controller
                        name={`listProductDetail[${index}].promotionPrice`}
                        control={control}
                        render={({ field }) => (
                          <InputGroup
                            className="input-group-merge"
                            tag={FormGroup}
                          >
                            <Input disabled {...field} />
                          </InputGroup>
                        )}
                      />
                    </Col>
                  </Row>
                  <SizeAndAmount
                    nestIndex={index}
                    {...{
                      control,
                      register,
                      errors,
                      listSize,
                      setValue,

                      getValues,
                      initial,
                    }}
                  />

                  <Row className="justify-content-end">
                    {fields.length > 1 && (
                      <Button.Ripple
                        outline
                        className="mt-1 mx-2"
                        color="danger"
                        onClick={() => {
                          // if (fields.length >= 2) {
                          remove(index);
                          const listNew = listImage;
                          delete listNew[
                            `listProductDetail[${item.id}].images`
                          ];
                          setListImage(listNew);
                          // }
                        }}
                      >
                        Xoá
                      </Button.Ripple>
                    )}
                  </Row>
                </CardBody>
              </CardAction>
            );
          })}

          <Button.Ripple
            outline
            className="mt-2"
            color="primary"
            onClick={() => {
              append({
                price: null,
                color: null,
                sizeAndAmount: [{ size: null, amount: null }],
              });

              // setCurrentIndex(fields.length);
            }}
          >
            Thêm chi tiết
          </Button.Ripple>

          <Row>
            <Col sm="12" className="mt-2">
              <Label> Mô tả:</Label>

              <Controller
                name="description"
                control={control}
                rules={{
                  validate: (value) =>
                    (value && value.trim() != "") ||
                    "Vui lòng nhập mô tả sản phẩm",
                }}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      {...field}
                      name="description"
                      type="textarea"
                      className={classnames({
                        "is-invalid": errors["description"],
                      })}
                    />
                  </InputGroup>
                )}
              />
              <p className="text-danger">{errors.description?.message}</p>
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
                  history.push("/cms/product/list");
                }}
              >
                Huỷ
              </Button.Ripple>
            </FormGroup>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
export default EmployeeTab;
