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
  Col, Row
} from "reactstrap";
import { notification, AutoComplete } from 'antd';
import PhoneInput from 'react-phone-number-input';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import 'react-phone-number-input/style.css';
import 'antd/dist/antd.css';

import * as authAction from '../../Action/authAction';
import * as collegeAction from '../../Action/collegeAction';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      password: "",
      collegeId: 0,
      errors: {
        firstName: "",
        lastName: "",
          email: "",
        contactNo: "",
        password: "",
        collegeId: ""
      }
    };
  }

  componentDidMount() {
    this.props.action.CollegeAction.GetCollege();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      let err_msg = nextProps.login_error;
      if (err_msg === "User already exists") {
        this.setState({ err_msg: "Email already taken!" })
      }
      else if (err_msg === "") {
          if(this.props.login_data.role){
              this.props.history.push('/user/test');
          }
          else {
              this.props.history.push('/admin/index');
          }
      }
    }
  }

  inputChangeHandler(e) {
    this.setState({ errors: {} })
    this.setState({ [e.target.name]: e.target.value });
  }

  collegeHandler(e) {
    let collegeId = 0;
    if (this.props.getCollege) {
      this.props.getCollege.map(college => {
        if (college.collegeName.concat("(" + college.searchKeyword + ")") === e) {
          collegeId = college.collegeId;
        }
        return null;
      })
    }
    this.setState({ collegeId });
  }

  openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg
    });
  };

  btnRegister() {
    let fieldsErrors = {};
    //password
    const { firstName, lastName, email, contactNo, password, errors, collegeId } = this.state
    if (firstName === "" && lastName === "" && email === "" && contactNo === "" && password === "" && collegeId === 0) {
      this.openNotificationWithIcon('error', "Please Fill the Details for Registration");
    }
    else {
      if (password === "") {
        fieldsErrors = {
          ...errors,
          password: "* Password Required"
        }
      } else if (password.length < 6) {
        fieldsErrors = {
          ...errors,
          password: "* Password must contain minimum 6 characters"
        }
      }
      //ContactNo
      if (contactNo === "") {
        fieldsErrors = {
          ...errors,
          contactNo: "* Contact No Required"
        }
      } else if (!contactNo.match(/^(((\+?\(91\))|0|((00|\+)?91))-?)?[7-9]\d{9}$/)) {
        fieldsErrors = {
          ...errors,
          contactNo: "* Contact No must be 10 digits and should not start with 0"
        }
      }
      //College
      if (collegeId === 0) {
        fieldsErrors = {
          ...errors,
          collegeId: "* Please select your college"
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
      //lastname
      if (lastName === "") {
        fieldsErrors = {
          ...errors,
          lastName: "* Last Name Required"
        }
      } else if (!lastName.match(/^[a-zA-Z ]+$/i)) {
        fieldsErrors = {
          ...errors,
          lastName: "* Last Name must contain only alphabets"
        }
      }
      //firstname
      if (firstName === "") {
        fieldsErrors = {
          ...errors,
          firstName: "* First Name Required"
        }
      } else if (!firstName.match(/^[a-zA-Z ]+$/i)) {
        fieldsErrors = {
          ...errors,
          firstName: "* First Name must contain only alphabets"
        }
      }

      if (!fieldsErrors.firstName && !fieldsErrors.lastName && !fieldsErrors.email && !fieldsErrors.password && !fieldsErrors.contactNo && !fieldsErrors.collegeId) {
        let RegisterData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          collegeId: collegeId,
          contactNo: contactNo,
          password: password,
        }
        this.props.action.RegisterAction.RegisterUser(RegisterData);
      }

      else {
        this.setState({
          errors: fieldsErrors
        });
      }
    }

  }

  render() {
    let collegeList = [];
    if (this.props.getCollege && this.props.getCollege.length !== 0) {
      this.props.getCollege.map(college => {
        return collegeList.push(college.collegeName.concat("(" + college.searchKeyword + ")"));
      })
    }
    return (
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0" style={{ padding: "10%" }}>
          <div style={{ fontSize: "24px", fontVariantCaps: "small-caps", textAlign: "center", textTransform: "uppercase", fontWeight: "500" }}>
            Register
                </div>
          <CardBody className="">
            <Form role="form">
              {this.props.login_error ? <span style={{ color: "red" }}>{this.state.err_msg}</span> : ""}
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-badge" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="First Name" type="text" name="firstName" value={this.state.firstName} onChange={this.inputChangeHandler.bind(this)} style={{ color: "#000" }} />
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
                  <Input placeholder="Last Name" type="text" name="lastName" value={this.state.lastName} onChange={this.inputChangeHandler.bind(this)} style={{ color: "#000" }} />
                </InputGroup>
                <span style={{ color: "red" }}>{this.state.errors.lastName}</span>
              </FormGroup>          
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" name="email" value={this.state.email} onChange={this.inputChangeHandler.bind(this)} style={{ color: "#000" }} />
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
                  <Input placeholder="Password" type="password" name="password" value={this.state.password} autoComplete="current-password" onChange={this.inputChangeHandler.bind(this)} style={{ color: "#000" }} />
                </InputGroup>
                <span style={{ color: "red" }}>{this.state.errors.password}</span>
              </FormGroup>
              <FormGroup className="">
                <InputGroup className="input-group-alternative clg-drop">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-university"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <AutoComplete
                    style={{ width: 344, border: "none" }}
                    dataSource={collegeList}
                    placeholder="Type your college"
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    onChange={this.collegeHandler.bind(this)}
                  />
                </InputGroup>
                <span style={{ color: "red" }}>{this.state.errors.collegeId}</span>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <PhoneInput
                    country="IN"
                    placeholder="Contact No"
                    value={this.state.contactNo}
                    className="phone-text"
                    onChange={phone => this.setState({ errors: { contactNo: "" }, contactNo: phone })} />
                </InputGroup>
                <span style={{ color: "red" }}>{this.state.errors.contactNo}</span>
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" type="button" onClick={this.btnRegister.bind(this)} style={{ borderRadius: "20px", backgroundImage: "linear-gradient(to right bottom, #3eb0f7, #35adf8, #2ba9f9, #1fa6fa, #12a2fb)", color: "#fff", padding: "3% 16%" }}>
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
    login_data: state.auth.login_data,
    login_error: state.auth.login_error,
    getCollege: state.college.get_college
  }
}

const mapDispatchToProps = (dispatch) => ({
  action: {
    RegisterAction: bindActionCreators(authAction, dispatch),
    CollegeAction: bindActionCreators(collegeAction, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);