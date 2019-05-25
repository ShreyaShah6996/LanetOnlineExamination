import React from "react";
import './userHeader.css';
import {withRouter} from "react-router-dom";

import lanetlogo from '../../assets/img/brand/logo_lanetteam.png';
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Navbar,
    Nav,
    Container,
    Media,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem
} from "reactstrap";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as authAction from '../../Action/authAction';

class UserHeader extends React.Component {
    btnLogout(e) {
        e.preventDefault();
        this.props.action.LogoutAction.logoutUser();
        this.props.history.push('/auth/login');
    }

    render() {
        return (
            <Navbar className="header" expand="md" id="navbar-main" light>
                <Container>
                    <NavbarBrand href="/">
                        <img src={lanetlogo} alt="lanet logo"/><br/>
                    </NavbarBrand>
                    <NavbarToggler/>
                    <Collapse navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle className="pr-0" nav>
                                        <Media className="align-items-center">
                                            <span className="avatar avatar-sm rounded-circle">
                                              <img
                                                  alt="..."
                                                  src={require("assets/img/theme/team-4-800x800.jpg")}
                                              />
                                            </span>
                                            <Media className="ml-2 d-none d-lg-block">
                                              <span className="mb-0 text-sm font-weight-bold">
                                                {this.props.login_data.name ? this.props.login_data.name : ""}
                                              </span>
                                            </Media>
                                        </Media>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                        <DropdownItem href="#pablo" onClick={this.btnLogout.bind(this)} >
                                            <i className="ni ni-user-run" />
                                            <span>Logout</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </NavItem>
                            {/*<NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>*/}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
        login_data: state.auth.login_data
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        LogoutAction: bindActionCreators(authAction, dispatch)
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHeader));