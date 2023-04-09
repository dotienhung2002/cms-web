import Avatar from "@Components/avatar";
import InputPasswordToggle from "@Components/input-password-toggle";
import { SCHEMA_LOGIN } from "@Constants/constValidate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSkin } from "@Hooks/useSkin";
import { handleLogin } from "@Store/actions/auth";
import { getHomeRouteForLoggedInUser, isObjEmpty } from "@Utils";
import classnames from "classnames";
import { Fragment, useState } from "react";
import { Coffee } from "react-feather";
import { useForm,Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Slide, toast } from "react-toastify";
import {
  Button,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner
} from "reactstrap";
import * as yup from "yup";
import Service from "../../../helper/request";

import api from "@Constants/api";
import "@Styles/base/pages/page-auth.scss";
import { Link } from "react-router-dom";

const ToastContent = ({ name, roleName }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">Xin chào, {name}</h6>
      </div>
    </div>
    {/* <div className="toastify-body">
      <span>to Kiemdinhoto.vn. Now you can start to explore. Enjoy!</span>
    </div> */}
  </Fragment>
);
const schema = yup.object(SCHEMA_LOGIN).required();
const Login = (props) => {
  const [skin] = useSkin();

  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    
    resolver: yupResolver(schema),
    mode: "all",
  });
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@Assets/images/pages/${illustration}`).default;

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      Service.send({
        method: api.EMPLOYEE_LOGIN.method,
        path: api.EMPLOYEE_LOGIN.path,
        data,
      }).then((result) => {
        if (result) {
          const { status, access_token, refresh_token, information } = result;
          if (status === 200) {
            const newData = {
              information,
              accessToken: access_token,
              refreshToken: refresh_token,
            };
            dispatch(handleLogin(newData));
            // history(getHomeRouteForLoggedInUser('admin'))
            toast.success(
              <ToastContent
                name={
                  newData.information.name ||
                  newData.information.username ||
                  "John Doe"
                }
                roleName={newData.roleName || ""}
              />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            );
            setTimeout(() => {
              window.location.href = getHomeRouteForLoggedInUser("admin");
            }, 1500);
          }
          else {
            setDisable(false);
          }
        }
      });
    }
  };

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              Đăng nhập! 👋
            </CardTitle>

            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* <Col md='6' sm='12'>
            <FormGroup>
              <Label for='validState'>Valid State</Label>
              <Input type='text' id='validState' name='validState' valid />
              <FormFeedback valid>Sweet! That name is available.</FormFeedback>
            </FormGroup>
          </Col>
          <Col md='6' sm='12'>
            <FormGroup>
              <Label for='invalidState'>Invalid State</Label>
              <Input type='text' id='invalidState' name='invalidState' invalid />
              <FormFeedback>Oh no! That name is already taken.</FormFeedback>
            </FormGroup>
          </Col> */}
              <FormGroup>
                <Label className="form-label" for="login-username">
                  Tên tài khoản
                </Label>
                
                 <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                  {...field}
                  className={classnames({ "is-invalid": errors["username"] })}
                />
                )}
              />
                <p className="text-danger">{errors.username?.message}</p>
              </FormGroup>
              <FormGroup>
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Mật khẩu
                  </Label>
                  <Link to="/cms/forgot-password">
                    <small>Quên mật khẩu?</small>
                  </Link>
                </div>
              


<Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <InputPasswordToggle
                  className={classnames({ "is-invalid": errors["password"] })}
                  {...field}
                />
                )}
              />
                <p className="text-danger">{errors.password?.message}</p>
              </FormGroup>
              {/* <FormGroup>
                <CustomInput
                  type="checkbox"
                  className="custom-control-Primary"
                  id="remember-me"
                  label="Remember Me"
                />
              </FormGroup> */}


              <Button.Ripple
                type="submit"
                color="primary"
                block
                disabled={disable}
              >
                {disable ? (
                  <>
                    <Spinner size="sm" />
                    <span className="ml-50">Đang đăng nhập...</span>
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button.Ripple>
            </Form>
            {/* <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button.Ripple color='facebook'>
                <Facebook size={14} />
              </Button.Ripple>
              <Button.Ripple color='twitter'>
                <Twitter size={14} />
              </Button.Ripple>
              <Button.Ripple color='google'>
                <Mail size={14} />
              </Button.Ripple>
              <Button.Ripple className='mr-0' color='github'>
                <GitHub size={14} />
              </Button.Ripple>
            </div>
          */}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
