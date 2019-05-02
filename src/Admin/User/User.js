import React from "react";
import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import Header from "components/Headers/Header.jsx";

var users = [{
    id: "User1",
    Name: "User1 test",
    Email: "user1@gmail.com",
    College: "BMIIT",
    Date: "12/2/2019",
    Contact: "9999919999"
}, {
    id: "User2",
    Name: "User2 test",
    Email: "user2@gmail.com",
    College: "CGPIT",
    Date: "12/4/2019",
    Contact: "9999939999"
}];

class User extends React.Component {
    render() {
        function ActionbuttonDisplay(cell) {
            return (
                <i style={{ fontSize: "25px" }} className="ni ni-fat-remove"></i>
            );
        }

        function dateFormatter(celll, row) {
            let cell = new Date(celll);
            return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
        }

        return (
            <>
                <Header />
                <Container className=" mt--7" fluid>
                    <Row>
                        <div className=" col">
                            <Card className=" shadow">
                                <CardHeader className=" bg-transparent">
                                    <h3 className=" mb-0">User</h3>
                                </CardHeader>
                                <CardBody>
                                    <BootstrapTable data={users} striped hover>
                                        <TableHeaderColumn isKey dataField='id' width='180' dataSort={true}>Username</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Name" width='180' dataSort={true}>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Email" width='180' dataSort={true}>Email</TableHeaderColumn>
                                        <TableHeaderColumn dataField="College" width="200"
                                            filter={{ type: 'TextFilter' }} dataSort={true}>College</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Date" width="300" dataFormat={dateFormatter}
                                            filter={{ type: 'DateFilter' }} dataSort={true}>Registered Date</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Contact" width='180' dataSort={true}>Contact</TableHeaderColumn>
                                        <TableHeaderColumn dataFormat={ActionbuttonDisplay} width="100" >Action</TableHeaderColumn>
                                    </BootstrapTable>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

export default User;
