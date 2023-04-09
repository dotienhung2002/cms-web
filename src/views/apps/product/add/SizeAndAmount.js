import { useFieldArray } from "react-hook-form";
// ** React Imports

// ** Custom Components

import "@Styles/react/libs/flatpickr/flatpickr.scss";
import { selectThemeColors } from "@Utils";
import Select from "react-select";
// ** Third Party Components
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";

import classnames from "classnames";
import { Minus, Plus } from "react-feather";

import { Controller } from "react-hook-form";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
const SizeAndAmount = ({
  nestIndex,
  control,
  register,
  errors,
  listSize,
  setValue,
  getValues,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `listProductDetail[${nestIndex}].sizeAndAmount`,
  });
  const [chillrenSizes, setChildrenSizes] = useState();
  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
    if (listSize) {
      setChildrenSizes(listSize);
    }
  }, [listSize]);

  useEffect(() => {
    if (chillrenSizes) {
      let listSizeIsActive =
        (getValues()?.listProductDetail?.length > 0 &&
          getValues()?.listProductDetail[nestIndex]?.sizeAndAmount?.map(
            (item) => item.size?.value
          )) ||
        [];
      const listTemp = [];
      console.log(listSizeIsActive);
      listSize.map((item) => {
        if (!listSizeIsActive.includes(item.value)) {
          listTemp.push(item);
        }
      });
      setChildrenSizes(listTemp);
    }
  }, [loadData]);

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <Row key={item.id}>
            <Col sm="5">
              <Label>Kích cỡ:</Label>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name={`listProductDetail[${nestIndex}].sizeAndAmount[${k}].size`}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    classNamePrefix="select"
                    className={classnames("react-select", {
                      "is-invalid":
                        errors?.listProductDetail &&
                        errors?.listProductDetail[nestIndex]?.sizeAndAmount &&
                        errors?.listProductDetail[nestIndex]?.sizeAndAmount[k]
                          ?.size,
                    })}
                    placeholder="Chọn kích cỡ"
                    options={chillrenSizes}
                    value={field.value}
                    // {...field}
                    {...register(
                      `listProductDetail[${nestIndex}].sizeAndAmount[${k}].size`
                    )}
                    onChange={(e) => {
                      field.onChange(e);
                      setLoadData(!loadData);
                    }}
                    // onChange={(e) => {
                    //   field.onChange(e.target.value);
                    // }}
                  />
                )}
              />
              <p className="text-danger">
                {errors?.listProductDetail &&
                  errors?.listProductDetail[nestIndex]?.sizeAndAmount &&
                  errors?.listProductDetail[nestIndex]?.sizeAndAmount[k]
                    ?.size &&
                  "Vui lòng chọn kích cỡ"}
              </p>
            </Col>
            <Col sm="5">
              <Label for="nameVerticalIcons">Số lượng tồn:</Label>

              <Controller
                name={`listProductDetail[${nestIndex}].sizeAndAmount[${k}].amount`}

                control={control}
                rules={{
                  validate: (value) =>
                    (value && true) || "Vui lòng nhập số lượng tồn",
                  min: { value: 0, message: "Số lượng tồn không hợp lệ" },
                }}
                render={({ field }) => (
                  <InputGroup className="input-group-merge" tag={FormGroup}>
                    <Input
                      type="number"
                      name={`listProductDetail[${nestIndex}].sizeAndAmount[${k}].amount`}
                      className={classnames("react-select", {
                        "is-invalid":
                          errors?.listProductDetail &&
                          errors?.listProductDetail[nestIndex]?.sizeAndAmount &&
                          errors?.listProductDetail[nestIndex]?.sizeAndAmount[k]
                            ?.amount,
                      })}
                     {...field}
                    />
                  </InputGroup>
                )}
              />

              <p className="text-danger">
                {errors?.listProductDetail &&
                  errors?.listProductDetail[nestIndex]?.sizeAndAmount &&
                  errors?.listProductDetail[nestIndex]?.sizeAndAmount[k]?.amount
                    ?.message}
              </p>
            </Col>
            {k > 0 && (
              <Button.Ripple
                className="btn-icon m-0 button-minus mt-2"
                color="danger"
                outline
                onClick={() => {
                  remove(k);
                }}
                tag={Label}
              >
                <Minus size={20} />
              </Button.Ripple>
            )}
          </Row>

          //   <div key={item.id} style={{ marginLeft: 20 }}>
          //     <label>Nested Array:</label>
          //     <input
          //       {...register(`test.${nestIndex}.nestedArray.${k}.field1`, {
          //         required: true
          //       })}
          //       style={{ marginRight: "25px" }}
          //     />

          //     <input {...register(`test.${nestIndex}.nestedArray.${k}.field2`)} />
          //     <button type="button" onClick={() => remove(k)}>
          //       Delete Nested
          //     </button>
          //   </div>
        );
      })}
      <Button.Ripple
        className="btn-icon m-0 "
        color="primary"
        id="image"
        outline
        onClick={() =>
          append({
            size: null,
            amount: null,
          })
        }
        tag={Label}
      >
        <Plus size={20} />
      </Button.Ripple>

      <hr />
    </div>
  );
};

export default SizeAndAmount;

// {sizeAndAmount.fields?.map((itemChildren, indexChildren) => {
//     return (
//
//     );
//   })}
