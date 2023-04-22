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
import { Image, Minus, Plus, Trash, Trash2 } from "react-feather";

import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
const ProductImage = ({
  getValues,
  onSelectFile,
  nestIndex,
  register,
  listImage,
  setListImage,
  keyParent,
}) => {
  console.log(listImage);

  return (
    <>
      <Row className="justify-content-start mb-2 px-1">
        {listImage[`listProductDetail[${keyParent}].images`]?.map(
          (item, index) => {
            return (
              <div
                key={index}
                style={{
                  margin: "0px 10px",
                }}
                className="position-relative"
              >
                <img
                  className="user-avatar   cursor-pointer"
                  src={item?.image}
                  alt="user profile avatar"
                  height="87"
                  width="90"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="position-absolute cursor-pointer"
                  style={{
                    bottom: 0,
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    background: "#7367f0",
                  }}
                  onClick={() => {
                    const listTemp =
                      listImage[`listProductDetail[${keyParent}].images`];
                    listTemp.splice(index, 1);
                    setListImage((prev) => {
                      return {
                        ...prev,
                        [`listProductDetail[${keyParent}].images`]: listTemp,
                      };
                    });
                  }}
                >
                  <Trash2 size={15} />
                </div>
              </div>
            );
          }
        )}
        {listImage[`listProductDetail[${keyParent}].images`] ? (
          listImage[`listProductDetail[${keyParent}].images`]?.length < 5 && (
            <Button.Ripple
              className="btn-icon m-0 "
              color="primary"
              id="image"
              outline
              tag={Label}
            >
              <input
                type="file"
                hidden
                onChange={onSelectFile}
                accept="image/*"
                // multiple
                name="file"
                keyParent={keyParent}
                index={nestIndex}
              />
              <Image size={20} />
              <div
                className="mt-1"
                style={{ maxWidth: "65px", fontSize: "10px" }}
              >
                Thêm hình ảnh (
                {listImage[`listProductDetail[${keyParent}].images`]?.length ||
                  0}
                /5)
              </div>
            </Button.Ripple>
          )
        ) : (
          <Button.Ripple
            className="btn-icon m-0 "
            color="primary"
            id="image"
            outline
            tag={Label}
          >
            <input
              type="file"
              hidden
              onChange={onSelectFile}
              accept="image/*"
              // multiple
              name="file"
              keyParent={keyParent}
              index={nestIndex}
            />
            <Image size={20} />
            <div
              className="mt-1"
              style={{ maxWidth: "65px", fontSize: "10px" }}
            >
              Thêm hình ảnh (
              {listImage[`listProductDetail[${keyParent}].images`]?.length || 0}
              /5)
            </div>
          </Button.Ripple>
        )}
      </Row>
    </>
  );
};

export default ProductImage;

// {ProductImage.fields?.map((itemChildren, indexChildren) => {
//     return (
//
//     );
//   })}
