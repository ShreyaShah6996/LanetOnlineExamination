import React from "react";
import "../../assets/css/styles.css";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { notification } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import 'antd/dist/antd.css';

import * as authAction from '../../Action/authAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: ""
      }
    };
  }

  inputChangeHandler(e) {
    this.setState({ errors: {} })
    this.setState({ [e.target.name]: e.target.value });
  }

  openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg
    });
  };


  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      let err_msg = this.props.login_error;
      if (err_msg === "User doesn't exists" || err_msg === "Incorrect Password." || err_msg === "Missing Credentials") {
        this.setState({ err_msg: err_msg })
      }
      else if (err_msg === "") {
        this.props.history.push('/admin/index');

      }
    }
  }

  btnLogin() {
    let fieldsErrors = {};
    //password
    const { email, password, errors } = this.state
    if (email === "" && password === "") {
      this.openNotificationWithIcon('error', "Please Fill the Details for Login");
    }
    else {
      if (password === "") {
        fieldsErrors = {
          ...errors,
          password: "* Password Required"
        }
      }
      //email
      if (email === "") {
        fieldsErrors = {
          ...errors,
          email: "* Email Required"
        }
      } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        fieldsErrors = {
          ...errors,
          email: "* Invalid Email"
        }
      }

      if (!fieldsErrors.email && !fieldsErrors.password) {
        let LoginData = {
          email: email,
          password: password
        }
        this.props.action.LoginAction.LoginUser(LoginData);
      }

      else {
        this.setState({
          errors: fieldsErrors
        });
      }
    }

  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0" style={{ padding: "10%" }}>
            <div style={{ fontSize: "24px", fontVariantCaps: "small-caps", textAlign: "center", textTransform: "uppercase", fontWeight: "500" }}>
              Login
            </div>
            <div className="social" >
              <ul >
                <li className="facebook">
                  <a href="/">
                    <i className="fab fa-facebook-f" ></i>
                  </a>
                </li>
                <li className="insta">
                  <a href="/" >
                    <i className="fab fa-instagram" ></i>
                  </a>
                </li>
                <li className="google-pluse">
                  <a href="/" >
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
              </ul>
            </div>
            <span style={{ textAlign: "center" }}>or use your account
            </span>
            <CardBody className="px-lg-3 py-lg-3">
              <Form role="form">
                {this.props.login_error ? <span style={{ color: "red" }}>{this.state.err_msg}</span> : ""}
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="text" name="email" value={this.state.email} onChange={this.inputChangeHandler.bind(this)} />
                  </InputGroup>
                  <span style={{ color: "red" }}>{this.state.errors.email}</span>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.inputChangeHandler.bind(this)} />
                  </InputGroup>
                  <span style={{ color: "red" }}>{this.state.errors.password}</span>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={this.btnLogin.bind(this)}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col>
              <a
                href="/auth/register"
                className="text-light"
                style={{ cursor: "pointer", float: "right" }}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}


const mapStateToProps = state => {
  return {
    login_data: state.auth.login_data,
    login_error: state.auth.login_error,
  }
}

const mapDispatchToProps = (dispatch) => ({
  action: {
    LoginAction: bindActionCreators(authAction, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);