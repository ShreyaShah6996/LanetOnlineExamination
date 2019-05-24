import React, { Component } from 'react';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';
import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";
import UserLayout from "layouts/User.jsx";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/user" render={props => <UserLayout {...props} />} />
                    <Route path="/admin" render={props => <AdminLayout {...props} />} />
                    <Route path="/auth" render={props => <AuthLayout {...props} />} />
                    <Redirect from="/" to="/admin/index" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);