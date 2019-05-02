import React from "react";
import { Card, CardHeader, CardBody, Container, Badge, Table, Label, Row, Button, Form, FormGroup, Input, TabContent, TabPane, Nav, NavItem, NavLink, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Select from 'react-select';

//OutTable,
import { ExcelRenderer } from 'react-excel-renderer';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import classnames from 'classnames';

import Header from "components/Headers/Header.jsx";

var users = [
    {
        Name: "React JS"
    },
    {
        Name: "Node JS"
    }
];

const options = [
    { value: 1, label: 'React JS' },
    { value: 2, label: 'Node JS' },
];

class Technology extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            subTechInput: 1,
            selectedOption: null,
            activeTab: '1',
            cols: [],
            rows: []
        };

        this.QuestionToggle = this.QuestionToggle.bind(this);
    }

    QuestionToggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    plusTechnology() {
        document.getElementById("AddTechForm").hidden = false;
        document.getElementById("plusIcon").hidden = true;
    }

    SelectHandleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    addTechnology() {
        // document.getElementById("AddTechForm").hidden = true;
    }

    cancelTechnology() {
        document.getElementById("AddTechForm").hidden = true;
        document.getElementById("plusIcon").hidden = false;

    }
    cancelSubTechnology(e) {
        this.setState({
            checked: !this.state.checked,
            subTechInput: 1
        })
        document.getElementById("AddSubTechForm").hidden = true;
        document.getElementById("addTech").hidden = false;
        document.getElementById("cancelTech").hidden = false;
        document.getElementById("level").disabled = false;
    }

    checked(e) {
        this.setState({
            checked: !this.state.checked
        })
    }

    addSubTechInput = () => {
        this.setState({ subTechInput: this.state.subTechInput + 1 })
    }

    removeSubTechInput = () => {
        this.setState({ subTechInput: this.state.subTechInput - 1 })
    }

    fileHandler = (event) => {
        let fileObj = event.target.files[0];
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                this.setState({
                    cols: resp.cols,
                    rows: resp.rows
                });
            }
        });
    }

    mcqClick() {
        document.getElementById("mcq").hidden = false;
        document.getElementById("fillup").hidden = true;
    }

    fillUpClick() {
        document.getElementById("mcq").hidden = true;
        document.getElementById("fillup").hidden = false;
    }

    questionEditor() {

    }

    render() {
        const { checked, selectedOption } = this.state;
        if (checked) {
            document.getElementById("AddSubTechForm").hidden = false;
            document.getElementById("addTech").hidden = true;
            document.getElementById("cancelTech").hidden = true;
            document.getElementById("level").disabled = true;
        }

        function ActionbuttonDisplay(cell) {
            return (
                <div>
                    <i style={{ fontSize: "25px", paddingRight: "15px" }} className="ni ni-ruler-pencil"></i>
                    <i style={{ fontSize: "25px" }} className="ni ni-fat-remove"></i>
                </div>
            );
        }

        let subTechDisplay = [], renderSubTechInput;
        for (let i = 0; i < this.state.subTechInput; i++) {
            subTechDisplay.push(i);
        }

        renderSubTechInput = subTechDisplay.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div>
                            <i style={{ fontSize: "25px" }} onClick={() => this.addSubTechInput()} className="ni ni-fat-add"></i>
                            {this.state.subTechInput >= 2
                                ? <i style={{ fontSize: "25px" }} onClick={() => this.removeSubTechInput()} className="ni ni-fat-delete"></i>
                                : ""}
                        </div>
                        : ""}
                    <Input type="text" id="technology" placeholder="Sub-Technology" style={{ marginBottom: "5px" }} />
                </div>
            );
        });

        return (
            <>
                <Header />
                <Container className=" mt--7" fluid>
                    {/* Technology */}
                    <Row>
                        <div className=" col">
                            <Card className=" shadow">
                                <CardHeader className=" bg-transparent">
                                    <h3 className=" mb-0">Technology</h3>
                                </CardHeader>
                                <CardBody>
                                    <i className="ni ni-fat-add" style={{ fontSize: "40px" }} id="plusIcon" onClick={this.plusTechnology}></i>
                                    <Container id="AddTechForm" hidden style={{ border: "1px solid lightgrey", borderRadius: "6px", marginBottom: "10px" }}>
                                        <Form>
                                            <h3 style={{ marginTop: "6px" }}> Add Technology</h3>
                                            <FormGroup>
                                                <Input type="text" id="technology" placeholder="Technology" />
                                            </FormGroup>
                                            <FormGroup check style={{ marginTop: "-20px", marginBottom: "15px", fontSize: "15px" }}>
                                                <Label check>
                                                    <Input type="checkbox" id="level" checked={this.state.checked} onChange={this.checked.bind(this)} />{' '}
                                                    Want to add Level?
                                                </Label>
                                            </FormGroup>
                                            <FormGroup>
                                                <Button id="addTech" onClick={this.addTechnology}>Add</Button>
                                                <Button id="cancelTech" onClick={this.cancelTechnology}>Cancel</Button>
                                            </FormGroup>
                                        </Form>
                                        <Container id="AddSubTechForm" hidden style={{ border: "1px solid lightgrey", borderRadius: "6px", marginBottom: "10px" }}>
                                            <Form>
                                                <h3 style={{ marginTop: "6px" }}> Add Sub-Technology</h3>
                                                <FormGroup>
                                                    {/* <i className="ni ni-fat-add" style={{ fontSize: "35px" }} id="plus"></i> */}
                                                    {this.state.subTechInput
                                                        ? <div className='header-center mt10'>
                                                            {renderSubTechInput}
                                                        </div> : ""}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Button onClick={this.addTechnology}>Add</Button>
                                                    <Button onClick={this.cancelSubTechnology.bind(this)}>Cancel</Button>
                                                </FormGroup>
                                            </Form>
                                        </Container>
                                    </Container>
                                    <BootstrapTable data={users} striped hover>
                                        <TableHeaderColumn isKey dataField="Name" width="200"
                                            filter={{ type: 'TextFilter' }} dataSort={true}>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataFormat={ActionbuttonDisplay} width="100" >Action</TableHeaderColumn>
                                    </BootstrapTable>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                    {/* Questions */}
                    <Row style={{ marginTop: "10px" }}>
                        <div className="col">
                            <Card className=" shadow">
                                <CardHeader className=" bg-transparent">
                                    <h3 className=" mb-0">Question</h3>
                                </CardHeader>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.QuestionToggle('1'); }}>
                                            Add Manually
                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.QuestionToggle('2'); }}>
                                            Add through Excel Sheet
                                    </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Container>
                                                <CardBody>
                                                    <Select
                                                        placeholder="Select Technology"
                                                        value={selectedOption}
                                                        onChange={this.SelectHandleChange}
                                                        options={options}
                                                    />
                                                    <br />
                                                    <Form>
                                                        <FormGroup>
                                                            <Input type="text" id="technology" placeholder="Question" onClick={this.questionEditor.bind(this)} />
                                                        </FormGroup>
                                                        <FormGroup style={{ float: "right", cursor: "pointer" }}>
                                                            <Badge color="primary" pill onClick={this.mcqClick.bind(this)}>MCQ</Badge>{' '}
                                                            <Badge color="primary" pill onClick={this.fillUpClick.bind(this)}>Fill Up</Badge>
                                                        </FormGroup>
                                                        <div>
                                                            <Table id="mcq">
                                                                <thead className="thead-light">
                                                                    <tr>
                                                                        <th scope="col">Sr.No</th>
                                                                        <th scope="col">Option</th>
                                                                        <th scope="col">Answer</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>a</td>
                                                                        <td><Input type="text" placeholder="Option a" /></td>
                                                                        <td><Input style={{ marginLeft: "20px" }} type="radio" name="radio1" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>b</td>
                                                                        <td><Input type="text" placeholder="Option b" /></td>
                                                                        <td><Input style={{ marginLeft: "20px" }} type="radio" name="radio1" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>c</td>
                                                                        <td><Input type="text" placeholder="Option c" /></td>
                                                                        <td><Input style={{ marginLeft: "20px" }} type="radio" name="radio1" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>d</td>
                                                                        <td><Input type="text" placeholder="Option d" /></td>
                                                                        <td><Input style={{ marginLeft: "20px" }} type="radio" name="radio1" /></td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                            <Input id="fillup" hidden type="text" placeholder="Answer" />
                                                        </div>
                                                        <Button style={{ float: "right", margin: "15px" }}>Add Question</Button>
                                                    </Form>
                                                </CardBody>
                                            </Container>
                                        </Row>
                                    </TabPane>

                                    <TabPane tabId="2">
                                        <Row>
                                            <Col sm="8">
                                                <Card body>
                                                    <Select
                                                        placeholder="Select Technology"
                                                        value={selectedOption}
                                                        onChange={this.SelectHandleChange}
                                                        options={options}
                                                    />
                                                    <input type="file" onChange={this.fileHandler.bind(this)} style={{ margin: "20px" }} />
                                                    <Button>Upload</Button>
                                                </Card>
                                            </Col>
                                            {/* <Container style={{ "padding": "30px" }}>
                                                <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
                                            </Container> */}
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

export default Technology;