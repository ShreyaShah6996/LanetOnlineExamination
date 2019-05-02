import React from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col, Row
} from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as authAction from '../../Action/authAction';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      contactNo: "",
      password: "",
      errors: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        contactNo: "",
        password: ""
      }
    };
  }

  inputChangeHandler(e) {
    this.setState({ errors: {} })
    this.setState({ [e.target.name]: e.target.value });
  }

  btnRegister() {
    let fieldsErrors = {};
    //password
    if (this.state.password === "") {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        password: "* Password Required"
      }
    } else if (this.state.password.length < 6) {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        password: "* Password must contain minimum 6 characters"
      }
    }
    //ContactNo
    if (this.state.contactNo === "") {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        contactNo: "* Contact No Required"
      }
    } else if (!this.state.contactNo.match(/^[0-9]{10}$/)) {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        contactNo: "* Contact No must be 10 digits number only"
      }
    }
    //email
    if (this.state.email === "") {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        email: "* Email Required"
      }
    } else if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        email: "* Invalid Email"
      }
    }
    //username
    if (this.state.userName === "") {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        userName: "* User Name Required"
      }
    } else if (!this.state.userName.match(/^[a-zA-Z 0-9]+$/i)) {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        userName: "* Invalid User Name"
      }
    }
    //lastname
    if (this.state.lastName === "") {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        lastName: "* Last Name Required"
      }
    } else if (!this.state.lastName.match(/^[a-zA-Z ]+$/i)) {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        lastName: "* Last Name must contain only alphabets"
      }
    }
    //firstname
    if (this.state.firstName === "") {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        firstName: "* First Name Required"
      }
    } else if (!this.state.firstName.match(/^[a-zA-Z ]+$/i)) {
      fieldsErrors = {
        ...this.state.fieldsErrors,
        firstName: "* First Name must contain only alphabets"
      }
    }
    if (!fieldsErrors.firstName && !fieldsErrors.lastName && !fieldsErrors.userName && !fieldsErrors.email && !fieldsErrors.password && !fieldsErrors.contactNo) {
      // this.props.action.RegisterAction.RegisterUser(this.state.registerData);
      alert("Registered Successfully");
    }
    else {
      this.setState({
        errors: fieldsErrors
      });
    }

  }

  render() {
    return (
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader style={{ fontSize: "30px", fontVariantCaps: "small-caps" }}>
            Register
            </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-badge" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="First Name" type="text" name="firstName" value={this.state.firstName} onChange={this.inputChangeHandler.bind(this)} />
                </InputGroup>
                <span style={{ color: "red" }}>{this.state.errors.firstName}</span>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-badge" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Last Name" type="text" name="lastName" value={this.state.lastName} onChange={this.inputChangeHandler.bind(this)} />
                </InputGroup>
                <span style={{ color: "red" }}>{this.state.errors.lastName}</span>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Username" type="text" name="userName" value={this.state.userName} onChange={this.inputChangeHandler.bind(this)} />
                </InputGroup>
                <span style={{ color: "red" }}>{this.state.errors.userName}</span>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" name="email" value={this.state.email} onChange={this.inputChangeHandler.bind(this)} />
                </InputGroup>
                <span style={{ color: "red" }}>{this.state.errors.email}</span>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Contact No" type="text" name="contactNo" value={this.state.contactNo} onChange={this.inputChangeHandler.bind(this)} />
                </InputGroup>
                <span style={{ color: "red" }}>{this.state.errors.contactNo}</span>
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
                <Button className="mt-4" color="primary" type="button" onClick={this.btnRegister.bind(this)}>
                  Create account
                  </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col>
            <a
              href="/auth/login"
              className="text-light"
              style={{ cursor: "pointer", float: "right" }}
            >
              <small>Have an account ?</small>
            </a>
          </Col>
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    registered_data: state.auth.registered_data,
    register_error: state.auth.register_error,
    email: state.auth.email
  }
}

const mapDispatchToProps = (dispatch) => ({
  action: {
    RegisterAction: bindActionCreators(authAction, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);
