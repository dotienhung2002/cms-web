import InputPasswordToggle from "@Components/input-password-toggle";
import api from "@Constants/api";
import { SCHEMA_CHANGE_PASSWORD } from "@Constants/constValidate";
import { isObjEmpty } from "@Utils";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Row } from "reactstrap";
import * as yup from "yup";
import Service from "../../../helper/request";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";
const schema = yup.object(SCHEMA_CHANGE_PASSWORD).required();

const PasswordTabContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const [disable, setDisable] = useState();
  const history = useHistory();
  const store = useSelector((state) => state.auth);
  const onSubmit = (values) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      Service.send({
        method: api.EMPLOYEE_CHANGE_PASSWORD.method,
        path: api.EMPLOYEE_CHANGE_PASSWORD.path,
        data: {
          current_password: values.current_password,
          new_password: values.new_password,
          username: store.userData.username,
        },
      }).then((result) => {
        if (result) {
          const { status, access_token, refresh_token, information } = result;
          if (status === 200) {
            toast.success("Đổi mật khẩu thành công");
            reset();
            setDisable(true);
            setTimeout(() => {
              localStorage.clear();
              window.location.href = "/";
            }, [3000]);
          } else {
            setDisable(false);
          }
        }
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Controller
              name="current_password"
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  label="Mật khẩu cũ"
                  htmlFor="Mật khẩu cũ"
                  name="current_password"
                  {...field}
                  className={classnames({
                    "is-invalid": errors["current_password"],
                  })}
                />
              )}
            />

            <p className="text-danger">{errors.current_password?.message}</p>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Controller
              name="new_password"
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  label="Mật khẩu mới"
                  htmlFor="Mật khẩu mới"
                  className={classnames({
                    "is-invalid": errors["new_password"],
                  })}
                  {...field}

                />
              )}
            />

            <p className="text-danger">{errors.new_password?.message}</p>
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Controller
              name="retype_new_password"
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  label="Nhập lại mật khẩu mới"
                  htmlFor="Nhập lại mật khẩu mới"
                  name="retype_new_password"
                  className={classnames({
                    "is-invalid": errors["retype_new_password"],
                  })}
                  {...field}
                />
              )}
            />

            <p className="text-danger">{errors.retype_new_password?.message}</p>
          </FormGroup>
        </Col>
        <Col className="mt-1" sm="12">
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
              "Đổi mật khẩu"
            )}
          </Button.Ripple>
          <Button.Ripple color="secondary" outline onClick={() => history("/")}>
            Huỷ
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  );
};

export default PasswordTabContent;
