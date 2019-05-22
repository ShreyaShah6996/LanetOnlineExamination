/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

class UserFooter extends React.Component {
    render() {
        return (
            <footer className="footer">
                <Row className="align-items-center justify-content-xl-between">
                    <Col>
                        <div className="copyright text-center text-xl-left text-muted">
                            © Copyright -
                            <a
                                className="font-weight-bold ml-1"
                                href="http://lanetteam.com/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Lanetteam (P) LTD. All rights reserved
                            </a>
                        </div>
                    </Col>
                </Row>
            </footer>
        );
    }
}

export default UserFooter;