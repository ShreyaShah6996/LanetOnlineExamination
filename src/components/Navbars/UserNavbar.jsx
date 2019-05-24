import React from "react";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Navbar,
    Nav,
    Container,
    Media
} from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as authAction from '../../Action/authAction';

class UserNavbar extends React.Component {
    btnLogout(e) {
        e.preventDefault();
        this.props.action.LogoutAction.logoutUser();
        this.props.history.push('/auth/login');
    }

    render() {
        return (
            <>
            <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                <Container fluid>
                    <Link
                        className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                        to="/"
                    >
                        {this.props.brandText}
                    </Link>
                    <Nav className="align-items-center d-none d-md-flex" navbar>
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
                                {/*<DropdownItem to="/admin/user-profile" tag={Link}>*/}
                                {/*<i className="ni ni-single-02" />*/}
                                {/*<span>My profile</span>*/}
                                {/*</DropdownItem>*/}
                                {/*<DropdownItem to="/admin/user-profile" tag={Link}>*/}
                                {/*<i className="ni ni-settings-gear-65" />*/}
                                {/*<span>Settings</span>*/}
                                {/*</DropdownItem>*/}
                                {/*<DropdownItem to="/admin/user-profile" tag={Link}>*/}
                                {/*<i className="ni ni-calendar-grid-58" />*/}
                                {/*<span>Activity</span>*/}
                                {/*</DropdownItem>*/}
                                {/*<DropdownItem to="/admin/user-profile" tag={Link}>*/}
                                {/*<i className="ni ni-support-16" />*/}
                                {/*<span>Support</span>*/}
                                {/*</DropdownItem>*/}
                                {/*<DropdownItem divider />*/}
                                <DropdownItem href="#pablo" onClick={this.btnLogout.bind(this)}>
                                    <i className="ni ni-user-run" />
                                    <span>Logout</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Container>
            </Navbar>
            </>
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


export default connect(mapStateToProps, mapDispatchToProps)(UserNavbar);
