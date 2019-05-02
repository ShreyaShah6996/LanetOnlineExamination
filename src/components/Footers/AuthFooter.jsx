/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col>
                <div className="copyright text-center text-xl-left text-muted">
                  © Copyright -
                  <a
                    className="font-weight-bold ml-1"
                    href="http://lanetteam.com/"
                    target="_blank"
                  >
                    Lanetteam (P) LTD. All rights reserved
                  </a>
                </div>
              </Col>

            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
