import React from "react";
import { Card, CardHeader, CardBody, Container, Row, Button, Form, FormGroup, Input, TabContent, TabPane, Nav, NavItem, NavLink, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { TimePicker } from 'antd';
import moment from 'moment';
import Switch from "react-switch";

//OutTable,
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import "react-datepicker/dist/react-datepicker.css";
import classnames from 'classnames';
import 'antd/dist/antd.css';
import Header from "components/Headers/Header.jsx";

var users = [{
    id: "React JS",
    testName: "Test 1",
    totalQuestion: 40,
    date: "12/2/2019",
    duration: 30,
    professor: "Mr. Snehal Shah"
}, {
    id: "Node JS",
    testName: "Test 2",
    totalQuestion: 50,
    date: "12/4/2019",
    duration: "-",
    professor: "Mr. Ajeet Singh"
},];

const options = [
    { value: 1, label: 'React JS' },
    { value: 2, label: 'Node JS' },
    { value: 3, label: 'All' },
];

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            activeTab: '1',
            startDate: new Date(),
            checked: false
        };

        this.TestToggle = this.TestToggle.bind(this);
        this.DateHandleChange = this.DateHandleChange.bind(this);
        this.DurationToggle = this.DurationToggle.bind(this);
    }

    TestToggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    DurationToggle(checked) {
        this.setState({ checked });
    }

    DateHandleChange(date) {
        this.setState({
            startDate: date
        });
    }

    SelectHandleChange = (selectedOption) => {
        if (selectedOption.label === "All") {
            document.getElementById("allTech").hidden = false;
        }
        else {
            document.getElementById("allTech").hidden = true;
        }
        this.setState({ selectedOption });
    }

    TimeChangeHandler(time, timeString) {
        console.log(time, timeString);
    }

    render() {
        const { selectedOption } = this.state;

        function ActionbuttonDisplay(cell) {
            return (
                <i style={{ fontSize: "25px" }} className="ni ni-fat-remove"></i>
            );
        }

        return (
            <>
                <Header />
                <Container className=" mt--7" fluid>
                    <Row style={{ marginTop: "10px" }}>
                        <div className="col">
                            <Card className=" shadow">
                                <CardHeader className=" bg-transparent">
                                    <h3 className=" mb-0">Test</h3>
                                </CardHeader>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.TestToggle('1'); }}>
                                            Test
                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.TestToggle('2'); }}>
                                            Add Test
                                    </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <div className=" col">
                                                <Card className=" shadow">
                                                    <CardBody>
                                                        <BootstrapTable data={users} striped hover>
                                                            {/* <TableHeaderColumn isKey dataField='id' width='180' dataSort={true}>Username</TableHeaderColumn> */}
                                                            <TableHeaderColumn isKey dataField="id" width='180' dataSort={true}>Technology</TableHeaderColumn>
                                                            <TableHeaderColumn dataField="testName" width='180' dataSort={true}>Test Name</TableHeaderColumn>
                                                            <TableHeaderColumn dataField="totalQuestion" width='180' dataSort={true}>Total Questions</TableHeaderColumn>
                                                            <TableHeaderColumn dataField="date" width='180' dataSort={true}>Date</TableHeaderColumn>
                                                            <TableHeaderColumn dataField="duration" width='180' dataSort={true}>Duration</TableHeaderColumn>
                                                            <TableHeaderColumn dataField="professor" width='180' dataSort={true}>Professor</TableHeaderColumn>
                                                            <TableHeaderColumn dataFormat={ActionbuttonDisplay} width="100" >Action</TableHeaderColumn>
                                                        </BootstrapTable>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        </Row>
                                    </TabPane>

                                    <TabPane tabId="2">
                                        <Row>
                                            <Col sm="6">
                                                <Card body>
                                                    <Form>
                                                        <FormGroup>
                                                            <Select
                                                                placeholder="Select Technology"
                                                                value={selectedOption}
                                                                onChange={this.SelectHandleChange}
                                                                options={options}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="text" id="testname" placeholder="Test Name" />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="number" id="totalQuestions" placeholder="Total Questions" />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <DatePicker
                                                                selected={this.state.startDate}
                                                                onChange={this.DateHandleChange}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <TimePicker onChange={this.TimeChangeHandler.bind(this)} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                                                            {' '}
                                                            <Switch onChange={this.DurationToggle} checked={this.state.checked} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="text" id="testname" placeholder="Professor" />
                                                        </FormGroup>
                                                        <Button>Add Test</Button>
                                                    </Form>
                                                </Card>
                                            </Col>

                                            <Col sm="6" id="allTech" hidden>
                                                <Card body>
                                                    <h3>Priority for Technology</h3>
                                                    <Form>
                                                        <ul>
                                                            <li>React JS{' '}
                                                                <input type="text" />
                                                            </li>
                                                            <li>Node JS {' '}
                                                                <input type="text" />
                                                            </li>
                                                        </ul>
                                                        <Button>Add Priority</Button>
                                                    </Form>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Test;