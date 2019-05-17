import React from "react";
import { Input, Card, CardHeader, CardBody, CardFooter, Container, Row, ButtonGroup, Button } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Popconfirm, Input as antInput } from 'antd';
import 'antd/dist/antd.css';
import Header from "components/Headers/Header.jsx";
import * as userAction from '../../Action/userAction';
import PDFGenerator from './pdfGenerator';
const Search = antInput.Search;
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recordPerPage: 5,
            offset: 0,
            fieldName: 'userId',
            sortDirection: 'ASC'
        }
    }

    componentDidMount() {
        this.props.action.UserAction.getUser(this.state.offset, this.state.recordPerPage, this.state.fieldName, this.state.sortDirection);
    }

    getUserData(offset, recordPerPage, fieldName, sortDirection) {
        this.props.action.UserAction.getUser(offset, recordPerPage, fieldName, sortDirection);
    }

    recordPerPageChangeHandler(e) {
        let recordPerPage = e.target.value;
        let offset = 0;
        if (recordPerPage !== 'All') {
            document.getElementById("PrevNext").hidden = false;
            this.setState({ recordPerPage, offset });
            this.getUserData(offset, recordPerPage, this.state.fieldName, this.state.sortDirection);
        }
        else {
            document.getElementById("PrevNext").hidden = true;
            this.props.action.UserAction.getAllUser();
        }
    }

    btnNextPrevClick(e) {
        let recordPerPage = this.state.recordPerPage;
        let offset = 0;
        if (e.target.name === "Prev") {
            offset = this.state.offset - this.state.recordPerPage;
        }
        else if (e.target.name === "Next") {
            offset = this.state.offset + this.state.recordPerPage;
        }
        this.setState({ offset });
        this.getUserData(offset, recordPerPage, this.state.fieldName, this.state.sortDirection);
    }

    ActionbuttonDisplay(cell, rowData, extraData) {
        return (
            <Popconfirm title="Are you sure you want to delete it?" onConfirm={extraData.deleteUserHandler.bind(extraData, cell)} okText="Yes" cancelText="No">
                <i style={{ fontSize: "25px" }} className="ni ni-fat-remove"></i>
            </Popconfirm>
        );
    }

    deleteUserHandler = (userId, e) => {
        this.props.action.UserAction.deleteUser(userId, this.state.offset, this.state.recordPerPage, this.state.fieldName, this.state.sortDirection)
    }

    render() {
        let users = [];
        let noMoreData = 0;
        if (this.props.get_limited_user && this.props.get_limited_user.length !== 0) {
            this.props.get_limited_user.map((user, key) => {
                noMoreData = key + 1;
                return users.push(user);
            })
        }

        function dateFormatter(celll, row) {
            let cell = new Date(celll);
            return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
        }

        function NameDisplay(value, row, index) {
            return value + " " + row.lastName;
        }
        function collegeFunction(value) {
            return value.collegeName.concat("(" + value.searchKeyword + ")");
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
                                <Container style={{ marginTop: "5px", marginLeft: "10px" }}>
                                    <Input type="select" name="select" style={{ width: "8%" }} onChange={this.recordPerPageChangeHandler.bind(this)} >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="All">All</option>
                                    </Input>
                                </Container>
                                <br />
                                <Search placeholder="input search text"  style={{ width: "30%", marginLeft: "24px" }} onSearch={value => console.log(value)} enterButton />
                                
                                {/* <Input style={{ width: "30%", marginLeft: "24px" }} type="text" placeholder="Search" /> */}
                                <PDFGenerator data={this.props.get_limited_user} />
                                <CardBody>
                                    <BootstrapTable data={users} striped hover>
                                        {/* <TableHeaderColumn isKey dataField='userName' width='180' dataSort={true}>Username</TableHeaderColumn> */}
                                        <TableHeaderColumn dataField='firstName' dataFormat={NameDisplay} width='180' dataSort={true}>Name</TableHeaderColumn>
                                        <TableHeaderColumn isKey dataField="email" width='180' dataSort={true}>Email</TableHeaderColumn>
                                        <TableHeaderColumn dataField="College" width="300"
                                            filter={{ type: 'TextFilter' }} filterFormatted dataFormat={collegeFunction}>College</TableHeaderColumn>
                                        <TableHeaderColumn dataField="createdDate" width="150" dataFormat={dateFormatter}
                                            dataSort={true}>Registered Date</TableHeaderColumn>
                                        {/* filter={{ type: 'DateFilter' }} */}
                                        <TableHeaderColumn dataField="contactNo" width='180'>Contact</TableHeaderColumn>
                                        <TableHeaderColumn dataField="userId" formatExtraData={this}
                                            dataFormat={this.ActionbuttonDisplay} width="100" >Action</TableHeaderColumn>
                                    </BootstrapTable>
                                </CardBody>
                                <CardFooter id="PrevNext">
                                    <ButtonGroup>
                                        {(this.state.offset !== 0) ?
                                            <Button color="primary" onClick={this.btnNextPrevClick.bind(this)} name="Prev">Prev</Button>
                                            : null}&nbsp;&nbsp;&nbsp;
                                        {noMoreData >= this.state.recordPerPage ?
                                            <Button color="primary" onClick={this.btnNextPrevClick.bind(this)} name="Next">Next</Button>
                                            : null
                                        }
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        get_limited_user: state.user.get_limited_user,
        get_user_error: state.user.get_user_error,
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        UserAction: bindActionCreators(userAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(User);