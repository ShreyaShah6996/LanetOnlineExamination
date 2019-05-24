import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {
    Table,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Button,
    Form,
    FormGroup,
    Input,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Col,
    CardFooter,
    ButtonGroup
} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import {TimePicker, notification, Popconfirm} from 'antd';
import moment from 'moment';
import Switch from "react-switch";
import {forEach, includes, map, findIndex } from 'lodash';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import "react-datepicker/dist/react-datepicker.css";
import classnames from 'classnames';
import 'antd/dist/antd.css';
import "../../assets/css/styles.css";

import Header from "components/Headers/Header.jsx";
import * as techAction from '../../Action/techAction';
import * as testAction from '../../Action/testAction';

let allTech = [];
let subTechRatio = [];
let techRatio = [];
let totalRatioCount = 0;

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            activeTab: '1',
            startDate: new Date(),
            checked: false,
            test: {
                testName: "",
                totalQuestion: 0,
                date: "",
                duration: "",
                professor: "",
                ratio: [],
                token: "",
                description: ""
            },
            errors: {
                selectedOption: "",
                testName: "",
                totalQuestion: "",
                date: "",
                duration: "",
                professor: "",
                ratio: "",
                token: "",
                description: ""
            },
            recordPerPage: 5,
            offset: 0,
            fieldName: 'testId',
            sortDirection: 'ASC',
            showRatioForTech: false,
            selectAll:false,
            RatioInputDisabled:true
        };

        this.TestTabToggle = this.TestTabToggle.bind(this);
        this.DateHandleChange = this.DateHandleChange.bind(this);
        this.DurationToggle = this.DurationToggle.bind(this);
    }

    componentDidMount() {
        this.props.action.TechAction.GetTechnologyAction();
        this.props.action.TestAction.getTest(this.state.offset, this.state.recordPerPage, this.state.fieldName, this.state.sortDirection);
    }

    getTestData(offset, recordPerPage, fieldName, sortDirection) {
        this.props.action.TestAction.getTest(offset, recordPerPage, fieldName, sortDirection);
    }

    recordPerPageChangeHandler(e) {
        let recordPerPage = e.target.value;
        let offset = 0;
        if (recordPerPage !== 'All') {
            document.getElementById("PrevNext").hidden = false;
            this.setState({recordPerPage, offset});
            this.getTestData(offset, recordPerPage, this.state.fieldName, this.state.sortDirection);
        } else {
            this.props.action.TestAction.getAllTest();
            document.getElementById("PrevNext").hidden = true;
        }
    }

    btnNextPrevClick(e) {
        let recordPerPage = this.state.recordPerPage;
        let offset = 0;
        if (e.target.name === "Prev") {
            offset = this.state.offset - this.state.recordPerPage;
        } else if (e.target.name === "Next") {
            offset = this.state.offset + this.state.recordPerPage;
        }
        this.setState({offset});
        this.getTestData(offset, recordPerPage, this.state.fieldName, this.state.sortDirection);
    }

    TestTabToggle(tab) {
        this.props.action.TestAction.getTest(this.state.offset, this.state.recordPerPage, this.state.fieldName, this.state.sortDirection);
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
        if (parseInt(this.state.activeTab) === 1) {
            this.props.action.TestAction.getTest(this.state.offset, this.state.recordPerPage, this.state.fieldName, this.state.sortDirection);
        }
    }

    openNotificationWithIcon = (type, msg) => {
        notification[type]({
            message: msg
        });
    };

    DurationToggle(checked) {
        this.setState({checked});
    }

    GetDateFormat(date) {
        var month = (date.getMonth() + 1).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + date.getFullYear();
    }

    DateHandleChange = (date) => {
        this.setState({errors: {}})
        let dateObj = new Date(date);
        let dt = this.GetDateFormat(dateObj);
        this.setState({
            startDate: dateObj,
            test: {
                ...this.state.test,
                date: dt
            }
        });
    }

    TimeChangeHandler(time, timeString) {
        this.setState({errors: {}})
        this.setState({
            test: {
                ...this.state.test,
                duration: timeString
            }
        });
    }

    TechRatioChangeHandler(techId, e) {
        this.setState({errors: {}})
        var find = findIndex(techRatio, (x, value) => { return +Object.keys(x)[0] === techId });
        if (find !== -1 || find === 0) {
            techRatio[find][e.target.name] = e.target.value;
        } else {
            techRatio.push({ [e.target.name]: e.target.value })
        }
    }

    SubTechRatioChangeHandler(techId, e) {
        this.setState({errors: {}})
        var find = findIndex(subTechRatio, (x, value) => { return +Object.keys(x)[0] === techId });
        if (find !== -1 || find === 0) {
            subTechRatio[find][techId][e.target.name] = e.target.value;
        } else {
            subTechRatio.push({
                [techId]: { [e.target.name]: e.target.value }
            })
        }
    }

    updateTestRatio = (selectedOption) => {
        const { test: { ratio = [] } } = this.state;
        let selectedOptionValue = [];
        selectedOption.forEach(_ => {
            selectedOptionValue.push(_.value);
        });
        ratio.forEach(_=>{
            if(!includes(selectedOptionValue, _.techId)){
                const techRatioIndex = findIndex(ratio, _);
                ratio.splice(techRatioIndex, 1);
            }
        })
        this.setState({test : { ...this.state.test, ratio }, selectedOption,selectAll:false})
    };

    SelectHandleChange = (selectedOption) => {
        const { test: { ratio = [] } } = this.state;
        ratio.length && this.updateTestRatio(selectedOption);
        this.setState({errors: {}});
        let extra = this;
        if (selectedOption.length < 1) {
            techRatio = [];
            subTechRatio = [];
            this.setState({showRatioForTech: false,selectAll:false});
        } else {
            allTech = [];
            techRatio = [];
            subTechRatio = [];
            this.setState({showRatioForTech: true});
            selectedOption.map(option => {
                if (option.label === "All") {
                    this.setState({selectAll:true});
                    selectedOption = selectedOption.filter((t) => {
                        return t.label === option.label
                    })
                    allTech = [];
                    if (extra.props.getTechnology.length) {
                        extra.props.getTechnology.map((technology, i) => {
                            if (technology.level === 1) {
                                technology.SubTechnologies.map((subTech, j) => {
                                    allTech.push(<tr key={j}>
                                            <td> {subTech.subTechName} </td>
                                            <td><input type="text"
                                                       name={subTech.subTechId}
                                                       onChange={this.SubTechRatioChangeHandler.bind(this, technology.techId)}
                                                       style={{height: "33px", width: "30%", borderRadius: "7px", border: "1px solid #b3b3b3", padding: "9px"}}
                                            /></td>
                                        </tr>
                                    )
                                    return null;
                                })
                            } else {
                                allTech.push(<tr key={i}>
                                        <td> {technology.techName} </td>
                                        <td><input type="text"
                                                   name={technology.techId}
                                                   onChange={this.TechRatioChangeHandler.bind(this, technology.techId)}
                                                   style={{height: "33px", width: "30%", borderRadius: "7px", border: "1px solid #b3b3b3", padding: "9px"}}
                                        /></td>
                                    </tr>
                                )
                            }
                            return null;
                        })
                    }
                } else {
                    this.setState({selectAll:false})
                    if (extra.props.getTechnology && extra.props.getTechnology.length) {
                        extra.props.getTechnology.map((technology, i) => {
                            if (option.label === technology.techName) {
                                if (technology.level === 1) {
                                    technology.SubTechnologies.map((subTech, j) => {
                                        return allTech.push(<tr key={j}>
                                                <td style={
                                                    {width: "30%"}
                                                }> {subTech.subTechName} </td>
                                                <td style={
                                                    {width: "30%"}
                                                }>< input type="text"
                                                          name={subTech.subTechId}
                                                          onChange={this.SubTechRatioChangeHandler.bind(this, technology.techId)}
                                                          style={{height: "33px", width: "30%", borderRadius: "7px", border: "1px solid #b3b3b3", padding: "9px"}}
                                                /></td>
                                            </tr>
                                        )
                                    })
                                } else {
                                    return allTech.push(<tr key={i}>
                                            <td style={
                                                {width: "30%"}
                                            }> {technology.techName} </td>
                                            <td style={
                                                {width: "30%"}
                                            }>< input type="text"
                                                      name={technology.techId}
                                                      onChange={this.TechRatioChangeHandler.bind(this, technology.techId)}
                                                      style={{height: "33px", width: "30%", borderRadius: "7px", border: "1px solid #b3b3b3", padding: "9px" }}
                                            /></td>
                                        </tr>
                                    )
                                }
                            }
                            return null;
                        })
                    }
                }
                return null;
            })
        }
        extra.setState({selectedOption});
    }

    onInputChangeHandler(e) {
        this.setState({errors: {}});
        this.setState({
            test: {
                ...this.state.test,
                [e.target.name]: e.target.value
            }
        });
    }

    btnAddRatio(e) {
        let techId = [];
        techRatio.map(techratio => {
            return techId.push({
                techId: parseInt(Object.keys(techratio).toString()),
                ratio: parseInt(Object.values(techratio).toString())
            });
        })
        let subTechRatioList = subTechRatio;
        let subTech = [];
        let uniqueKey = [];
        forEach(subTechRatioList, (x) => {
            forEach(x, (value, key) => {
                if (!includes(uniqueKey, key)) {
                    uniqueKey.push(key);
                    subTech.push({
                        techId: parseInt(key),
                        subTech: map(value, (value, key) => ({subTechId: parseInt(key), ratio: parseInt(value)}))
                    })
                } else {
                    let i = findIndex(subTech, function (o) {
                        return parseInt(o.techId) === parseInt(key)
                    })
                    forEach(value, (value, key) => {
                        subTech[i].subTech.push({subTechId: parseInt(key), ratio: parseInt(value)})
                    })
                }
            })
        })
        let Ratio = techId.concat(subTech);
        if (Ratio.length <= 0) {
            this.setState({
                ...this.state.errors,
                errors: {
                    ratio: "* Ratio cannot be empty"
                }
            })
        } else {
            let totalRatioCount = 0;
            let rat = Ratio;
            rat.forEach(r => {
                if (r.subTech && r.subTech.length) {
                    r.subTech.map(sub => {
                        return totalRatioCount += sub.ratio
                    })
                } else {
                    return totalRatioCount += r.ratio
                }
            })
            if (totalRatioCount > 100) {
                this.openNotificationWithIcon('warning', "Ratio cannot be more than 100");
            } else if (totalRatioCount < 100) {
                this.openNotificationWithIcon('warning', "Ratio cannot be less than 100");
            } else {
                this.setState({
                    test: {
                        ...this.state.test,
                        ratio: Ratio
                    }
                })
                this.openNotificationWithIcon('success', "Ratio Added");
            }
        }
    }

    btnAddTest(e) {
        let dt;
        e.preventDefault();
        let fieldsErrors = {};
        const {test,startDate, errors, selectedOption} = this.state;
        if (
            test.testName === "" &&
            test.totalQuestion === 0 &&
            test.date === "" &&
            test.duration === "" &&
            test.professor === "" &&
            test.description === "" &&
            test.token === "" &&
            selectedOption === null) {
            this.openNotificationWithIcon('error', "Please Fill the Details to add Test");
        } else {
            //token
            if (test.token === "") {
                fieldsErrors = {
                    ...errors,
                    token: "* Token Required"
                }
            }
            //professor
            if (test.professor === "") {
                fieldsErrors = {
                    ...errors,
                    professor: "* Professor name Required"
                }
            }
            //duration
            if (this.state.checked)
                if (test.duration === "") {
                    fieldsErrors = {
                        ...errors,
                        duration: "* Duration Required"
                    }
                }
            //date
            if (test.date === "") {
                let dateObj = new Date(startDate);
                 dt = this.GetDateFormat(dateObj);
                this.setState({test: {
                        ...test,
                        date:dt
                    }
                })
            }
            //totalQuestion
            if (test.totalQuestion <= 1) {
                fieldsErrors = {
                    ...errors,
                    totalQuestion: "* Total Question Required or cannot be less than 1"
                }
            }
            //description
            if (test.description === "") {
                fieldsErrors = {
                    ...errors,
                    description: "* Description Required"
                }
            }
            //testName
            if (test.testName === "") {
                fieldsErrors = {
                    ...errors,
                    testName: "* Test Name Required"
                }
            }
            //selectedoption
            if (selectedOption === null) {
                fieldsErrors = {
                    ...errors,
                    selectedOption: "* Please select technology"
                }
            }
            let testData;
            if (!fieldsErrors.testName && !fieldsErrors.description && !fieldsErrors.totalQuestion && !fieldsErrors.duration && !fieldsErrors.professor && !fieldsErrors.selectedOption && !fieldsErrors.token) {
                if (this.state.checked) {
                    testData = {
                        testName: test.testName,
                        description: test.description,
                        totalQuestion: test.totalQuestion,
                        date: (test.date ? test.data:dt),
                        duration: test.duration,
                        professor: test.professor,
                        ratio: JSON.stringify(test.ratio),
                        token: test.token
                    }
                } else {
                    testData = {
                        testName: test.testName,
                        description: test.description,
                        totalQuestion: test.totalQuestion,
                        date: (test.date ? test.data:dt),
                        professor: test.professor,
                        ratio: JSON.stringify(test.ratio),
                        token: test.token
                    }
                }
                if (test.ratio && test.ratio.length) {
                    this.setState({test: {}, selectedOption: null})
                    this.props.action.TestAction.addTest(testData).then(response =>{
                        this.TestTabToggle('1');
                    });

                } else {
                    this.openNotificationWithIcon('warning', "Please Add Ratio");
                }

            } else {
                this.setState({
                    errors: fieldsErrors
                });
            }
        }
    }

    ActionbuttonDisplay(cell, rowData, extraData) {
        return (<Popconfirm title="Are you sure you want to delete it?"
                            onConfirm={extraData.deleteTestHandler.bind(extraData, cell)}
                            okText="Yes"
                            cancelText="No">
                <i style={
                    {fontSize: "25px"}
                }
                   className="ni ni-fat-remove"> </i>
            </ Popconfirm>
        );
    }

    deleteTestHandler = (testId, e) => {
        this.props.action.TestAction.deleteTest(testId, this.state.offset, this.state.recordPerPage, this.state.fieldName, this.state.sortDirection)
    }

    render() {
        const {selectedOption, showRatioForTech,selectAll } = this.state;
        const { getTechnology = [], getTest = [] } = this.props;
        let techOptions = [];
        let testData = [];
        let noMoreData = 0;

        if(selectAll){
            if (getTechnology.length) {
                getTechnology.map(technology => {
                    return techOptions.push({value: technology.techId, label: technology.techName,disabled:'true'})
                })
            }
        }
        else {
            if (getTechnology.length) {
                getTechnology.map(technology => {
                    return techOptions.push({value: technology.techId, label: technology.techName})
                })
            }
        }
        techOptions.push({value: getTechnology.length + 1, label: 'All'});
        if (getTest.length) {
            getTest.map((test, key) => {
                noMoreData = key + 1;
                return testData.push(test);
            })
        }

        function dateFormatter(celll, row) {
            let cell = new Date(celll);
            // return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
            return `${('0' + (cell.getMonth() + 1)).slice(-2)}/${('0' + cell.getDate()).slice(-2)}/${cell.getFullYear()}`;
        }

        return (
            <><Header/>
                <Container className=" mt--7" fluid>
                    <Row style={{marginTop: "10px"}}>
                        <div className="col">
                            <Card className=" shadow">
                                <CardHeader className=" bg-transparent"><h3 className=" mb-0"> Test </h3></CardHeader>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({active: this.state.activeTab === '1'})}
                                            onClick={() => {
                                                this.TestTabToggle('1')
                                            }}>Test</NavLink>
                                    </NavItem>
                                    <NavItem>
                                    <NavLink className={classnames({active: this.state.activeTab === '2'})}
                                             onClick={() => {
                                                 this.TestTabToggle('2')
                                             }}>Add Test
                                    </NavLink>
                                </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <div className=" col">
                                                <Card className=" shadow">
                                                    <Input type="select" name="select" style={{width: "8%", marginTop: "5px"}}
                                                           onChange={this.recordPerPageChangeHandler.bind(this)}>
                                                        <option value="5"> 5</option>
                                                        <option value="10"> 10</option>
                                                        <option value="25"> 25</option>
                                                        <option value="50"> 50</option>
                                                        <option value="100"> 100</option>
                                                        <option value="All"> All</option>
                                                    </Input> <br/>
                                                    <CardBody>
                                                        <BootstrapTable data={testData} striped hover>
                                                            <TableHeaderColumn isKey dataField="testName" width='130'
                                                                               dataSort={true}> Test Name
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn
                                                                dataField="totalQuestion"
                                                                width='120'
                                                                dataSort={true}> Total Questions
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn
                                                                dataField="date"
                                                                width='200'
                                                                dataSort={true}
                                                                dataFormat={dateFormatter}>Date
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn
                                                                dataField="duration"
                                                                width='140'
                                                                dataSort={true}> Duration
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn
                                                                dataField="professor"
                                                                width='140'
                                                                dataSort={true}> Professor
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn
                                                                dataField="testId"
                                                                dataFormat={this.ActionbuttonDisplay}
                                                                formatExtraData={this}
                                                                width="100"> Action
                                                            </TableHeaderColumn>
                                                        </BootstrapTable>
                                                    </CardBody> <CardFooter id="PrevNext">
                                                    <ButtonGroup> {(this.state.offset !== 0) ?
                                                        <Button color="primary"
                                                                onClick={this.btnNextPrevClick.bind(this)}
                                                                name="Prev"> Prev </Button> : null}{' '}
                                                      {noMoreData >= this.state.recordPerPage ?
                                                            <Button color="primary"
                                                                    onClick={this.btnNextPrevClick.bind(this)}
                                                                    name="Next"> Next </Button> : null
                                                        } </ButtonGroup>
                                                </CardFooter>
                                                </Card></div>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col sm="6">
                                                <Card body>
                                                    <Form>
                                                        <FormGroup>
                                                            <Select placeholder="Select Technology"
                                                                    value={selectedOption}
                                                                    onChange={this.SelectHandleChange.bind(this)}
                                                                    options={techOptions}
                                                                    isMulti={true}
                                                                    isOptionDisabled={(option)=>option.disabled === 'true'}
                                                                     />
                                                            <span
                                                                style={{color: "red"}}> {this.state.errors.selectedOption} </span>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="text"
                                                                   name="testName"
                                                                   placeholder="Test Name"
                                                                   onChange={this.onInputChangeHandler.bind(this)}/>
                                                            <span
                                                                style={{color: "red"}}>{this.state.errors.testName} </span>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="textarea"
                                                                   name="description"
                                                                   placeholder="Description"
                                                                   onChange={this.onInputChangeHandler.bind(this)}/>
                                                            <span
                                                                style={{color: "red"}}> {this.state.errors.description} </span>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="number" name="totalQuestion"
                                                                   placeholder="Total Questions"
                                                                   onChange={this.onInputChangeHandler.bind(this)}
                                                                   min="1"
                                                            />
                                                            <span
                                                                style={{color: "red"}}> {this.state.errors.totalQuestion} </span>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <DatePicker selected={this.state.startDate}
                                                                        onChange={this.DateHandleChange}/>
                                                            <span
                                                                style={{color: "red"}}> {this.state.errors.date} </span>
                                                        </FormGroup>
                                                        <FormGroup className="test-timepiker">
                                                            <TimePicker onChange={this.TimeChangeHandler.bind(this)}
                                                                        placeholder="Select Duration"
                                                                        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
                                                            {' '}
                                                            <Switch onChange={this.DurationToggle}
                                                                    checked={this.state.checked}/>
                                                            <span
                                                                style={{color: "red"}}> {this.state.errors.duration} </span>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="text" name="professor" placeholder="Professor"
                                                                   onChange={this.onInputChangeHandler.bind(this)}/>
                                                            <span
                                                                style={{color: "red"}}> {this.state.errors.professor} </span>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="text" name="token" placeholder="Token"
                                                                   onChange={this.onInputChangeHandler.bind(this)}/>
                                                            <span
                                                                style={{color: "red"}}> {this.state.errors.token} </span>
                                                        </FormGroup>
                                                        <Button id="btnAddTest"
                                                                onClick={this.btnAddTest.bind(this)}> Add Test </Button>
                                                    </Form>
                                                </Card>
                                            </Col>
                                            {showRatioForTech && <Col sm="6" id="allTech">
                                                <Card body>
                                                    <h3> Ratio for Technology </h3>
                                                    <Form>
                                                        <Table style={{listStyle: "none", padding: "0", margin: "0"}}>
                                                            <tbody>{allTech}</tbody>
                                                        </Table>
                                                        <span style={{color: "red"}}> {this.state.errors.ratio} </span>
                                                        <br/>
                                                        <Button onClick={this.btnAddRatio.bind(this)}> Add
                                                            Ratio </Button>
                                                    </Form>
                                                </Card>
                                            </Col>}
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

const mapStateToProps = state => {
    return {
        getTechnology: state.tech.technology,
        addTest: state.test.test,
        getTest: state.test.get_test
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        TechAction: bindActionCreators(techAction, dispatch),
        TestAction: bindActionCreators(testAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Test);