import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UserNavbar from "../components/Navbars/UserNavbar";
import UserFooter from "../components/Footers/UserFooter";

import routes from "../userRoutes";

class User extends React.Component {
//false= admin, true  = student
    componentDidMount() {
        let userId = localStorage.getItem("userId");
        if (!userId) {
            this.props.history.push('/auth/login');
        }
    }

    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }

    getRoutes = routes => {
        return routes.map((prop, key) => {
            let role = localStorage.getItem("role");
            if(role==="true") {
                if (prop.layout === "/user") {
                    return (
                        <Route
                            path={prop.layout + prop.path}
                            component={prop.component}
                            key={key}
                        />
                    );
                } else {
                    return null;
                }
            }
            else{
                this.props.history.push('/admin/index');
            }
            return null;
        });
    };
    getBrandText = path => {
        for (let i = 0; i < routes.length; i++) {
            if (
                this.props.location.pathname.indexOf(
                    routes[i].layout + routes[i].path
                ) !== -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };
    render() {
        return (
            <>
            <div className="main-content" ref="mainContent">
                <UserNavbar
                    {...this.props}
                />
                <Switch>{this.getRoutes(routes)}</Switch>
                <Container fluid>
                    <UserFooter />
                </Container>
            </div>
            </>
        );
    }
}

export default User;