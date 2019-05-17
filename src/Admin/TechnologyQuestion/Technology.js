import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import classnames from 'classnames';
import Header from "components/Headers/Header.jsx";
import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ExcelRenderer } from 'react-excel-renderer';
import Select from 'react-select';
import { Badge, Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane } from "reactstrap";
import CustomeSwitch from '../../components/CustomeSwitch/CustomeSwitch'
import RichTextBox from '../../components/RichTextEditor/richtext'
import * as techAction from '../../Action/techAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import AddTechnology from './AddTechnology'
import * as queAction from '../../Action/queAction'
import { glob_que, opt_a, opt_b, opt_c, opt_d } from '../../components/RichTextEditor/richtext'

class Technology extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            cols: [],
            rows: [],
            checked_a: false,
            checked_b: false,
            checked_c: false,
            checked_d: false,
            selectedtech: null,
            selectedsubtech: null,
            ismcq: true,
        };

        this.QuestionToggle = this.QuestionToggle.bind(this);
    }
    // componentWillReceiveProps=(nextProps)=>{
    //     if(nextProps.technology !== this.props.technology){
    //         console.log("called");
    //     }
    // }
    componentDidMount() {
        this.props.techaction.GetTechnologyAction().then((res) => {
            document.getElementById("selectsubtech").hidden = true;
            document.getElementById("fselectsubtech").hidden = true;
        })
    }
    QuestionToggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    SelectTechHandleChange = (selectedOption) => {
        document.getElementById("selectsubtech").hidden = true;
        document.getElementById("fselectsubtech").hidden = true;
        let techId = selectedOption.value
        this.props.technology.map((t) => {
            if (t.techId === JSON.parse(techId)) {
                if (t.level === 1) {
                    this.props.techaction.GetSubtechnologyAction(techId)
                    document.getElementById("selectsubtech").hidden = false;
                    document.getElementById("fselectsubtech").hidden = false;
                }
            }
            return true
        })
        this.setState({ selectedtech: selectedOption, selectedsubtech: null });
    }
    SelectSubtechHandleChange = (selectedOption) => {
        this.setState({ selectedsubtech: selectedOption });
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
        this.setState({ ismcq: true });
    }
    fillUpClick() {
        document.getElementById("mcq").hidden = true;
        document.getElementById("fillup").hidden = false;
        this.setState({ ismcq: false });
    }
    questionEditor() {

    }
    EditToggle_a = (e) => {
        this.setState({ checked_a: !this.state.checked_a });
    }
    EditToggle_b = (e) => {
        this.setState({ checked_b: !this.state.checked_b });
    }
    EditToggle_c = (e) => {
        this.setState({ checked_c: !this.state.checked_c });
    }
    EditToggle_d = (e) => {
        this.setState({ checked_d: !this.state.checked_d });
    }
    addQuestion = () => {
        var a, b, c, d;
        const techid = (this.state.selectedtech !== null) ? this.state.selectedtech.value : 0;
        const subtechid = (this.state.selectedsubtech !== null) ? this.state.selectedsubtech.value : null;
        let obj
        if (this.state.ismcq) {
            if (this.state.checked_a) {
                a = { text: opt_a };
            }
            else {
                let aa = document.getElementById("op_a").value
                a = { text: aa }
            }
            if (this.state.checked_b) {
                b = { text: opt_b };
            }
            else {
                let bb = document.getElementById("op_b").value
                b = { text: bb }
            }
            if (this.state.checked_c) {
                c = { text: opt_c };
            }
            else {
                let cc = document.getElementById("op_c").value
                c = { text: cc }
            }
            if (this.state.checked_d) {
                d = { text: opt_d };
            }
            else {
                let dd = document.getElementById("op_d").value
                d = { text: dd }
            }
            let ans = ''
            if (document.getElementById("radio1").checked) {
                ans = a
            }
            else if (document.getElementById("radio2").checked) {
                ans = b
            }
            else if (document.getElementById("radio3").checked) {
                ans = c
            }
            else if (document.getElementById("radio4").checked) {
                ans = d
            }
            obj = {
                techId: parseInt(techid),
                subTechId: parseInt(subtechid),
                question: JSON.stringify({ text: glob_que }),
                a: JSON.stringify(a),
                b: JSON.stringify(b),
                c: JSON.stringify(c),
                d: JSON.stringify(d),
                answer: JSON.stringify(ans)
            }
        }
        else {
            let ans = document.getElementById("fillup").value
            obj = {
                techId: parseInt(techid),
                subTechId: parseInt(subtechid),
                question: JSON.stringify({ text: glob_que }),
                a: null,
                b: null,
                c: null,
                d: null,
                answer: JSON.stringify({ text: ans })
            }
        }
        let qobj = {
            questions: [obj]
        }
        this.props.queaction.AddQuestionAction(qobj).then((res) => {
            this.setState({
                checked_a: false,
                checked_b: false,
                checked_c: false,
                checked_d: false,
                selectedtech: null,
                selectedsubtech: null,
                ismcq: true,
            })
            document.getElementById("fillup").value = '';
            document.getElementById("op_d").value = ''
            document.getElementById("op_c").value = ''
            document.getElementById("op_b").value = ''
            document.getElementById("op_a").value = ''
            document.getElementById("radio1").checked = false;
            document.getElementById("radio2").checked = false;
            document.getElementById("radio3").checked = false;
            document.getElementById("radio4").checked = false;
        });

        console.log("que", qobj)

    }
    render() {
        var techoptions = []
        var subtechoptions = []
        var techdata = []

        function ActionbuttonDisplay(cell) {
            return (
                <div>
                    <i style={{ fontSize: "25px", paddingRight: "15px" }} className="ni ni-ruler-pencil"></i>
                    <i style={{ fontSize: "25px" }} className="ni ni-fat-remove"></i>
                </div>
            );
        }

        this.props.technology.map((t) => {
            let obj = {
                value: t.techId,
                label: t.techName
            }
            let tobj = {
                Name: t.techName
            }
            techoptions.push(obj)
            techdata.push(tobj)
            return true;
        })

        this.props.subtechnology.map((st) => {
            let obj = {
                value: st.subTechId,
                label: st.subTechName
            }
            subtechoptions.push(obj)

            return true;
        })

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
                                    <AddTechnology />
                                    <BootstrapTable data={techdata} striped hover>
                                        <TableHeaderColumn isKey dataField="Name" width="200"
                                            filter={{ type: 'TextFilter' }} dataSort={true}>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataFormat={ActionbuttonDisplay} width="100" >Action</TableHeaderColumn>
                                    </BootstrapTable>
                                    <Button color="primary" style={{ width: "7%", padding: "10px", marginTop: "10px" }}>Next</Button>{' '}
                                    <Button color="primary" style={{ width: "7%", padding: "10px", marginTop: "10px" }}>Prev</Button>{' '}
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
                                                    {/* {selecttechnology} */}
                                                    <Select
                                                        name="selecttech"
                                                        placeholder="Select Technology"
                                                        value={this.state.selectedtech}
                                                        onChange={this.SelectTechHandleChange}
                                                        options={techoptions}
                                                    />
                                                    <br />
                                                    <Select
                                                        id="selectsubtech"
                                                        name="selectsubtech"
                                                        placeholder="Select Sub-Technology"
                                                        value={this.state.selectedsubtech}
                                                        hidden
                                                        onChange={this.SelectSubtechHandleChange}
                                                        options={subtechoptions}
                                                    />
                                                    <br />

                                                    <Form>
                                                        <FormGroup>
                                                            {/* <Input type="text" id="technology" placeholder="Question" onClick={this.questionEditor.bind(this)} /> */}
                                                            <RichTextBox txttype='que' text="Enter Question" />
                                                        </FormGroup>
                                                        <FormGroup style={{ float: "right", cursor: "pointer" }}>
                                                            <Badge color="primary" pill onClick={this.mcqClick.bind(this)}>MCQ</Badge>{' '}
                                                            <Badge color="primary" pill onClick={this.fillUpClick.bind(this)}>Fill Up</Badge>
                                                        </FormGroup>
                                                        <div>
                                                            <Table id="mcq" responsive>
                                                                <thead className="thead-light">
                                                                    <tr>
                                                                        <th scope="col">Sr.No</th>
                                                                        <th scope="col">Option</th>
                                                                        <th scope="col">Text with Image</th>
                                                                        <th scope="col">Answer</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>a</td>
                                                                        <td>
                                                                            <div style={{ width: '650px' }}>
                                                                                {(this.state.checked_a)
                                                                                    ? (<RichTextBox txttype='opt_a' text="Enter Option" />)
                                                                                    : (<Input type="text" id="op_a" placeholder="Option a" />)}
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <CustomeSwitch
                                                                                onChange={this.EditToggle_a}
                                                                                checked={this.state.checked_a} />
                                                                        </td>
                                                                        <td><Input value="a" type="radio" style={{position:"unset",margin:" 0 45%"}} id="radio1" name="radio1" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>b</td>
                                                                        <td>
                                                                            <div style={{ width: '650px' }}>
                                                                                {(this.state.checked_b)
                                                                                    ? (<RichTextBox txttype='opt_b' text="Enter Option" />)
                                                                                    : (<Input type="text" id="op_b" placeholder="Option b" />)}
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <CustomeSwitch
                                                                                onChange={this.EditToggle_b}
                                                                                checked={this.state.checked_b} />
                                                                        </td>
                                                                        <td><Input value="b"  type="radio" style={{position:"unset",margin:" 0 45%"}} id="radio2" name="radio2" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>c</td>
                                                                        <td>
                                                                            <div style={{ width: '650px' }}>
                                                                                {(this.state.checked_c)
                                                                                    ? (<RichTextBox txttype='opt_c' text="Enter Option" />)
                                                                                    : (<Input type="text" id="op_c" placeholder="Option c" />)}
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <CustomeSwitch
                                                                                onChange={this.EditToggle_c}
                                                                                checked={this.state.checked_c} />
                                                                        </td>
                                                                        <td><Input value="c" type="radio" style={{position:"unset",margin:" 0 45%"}} id="radio3" name="radio3" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>d</td>
                                                                        <td>
                                                                            <div style={{ width: '650px' }}>
                                                                                {(this.state.checked_d)
                                                                                    ? (<RichTextBox txttype='opt_d' text="Enter Option" />)
                                                                                    : (<Input type="text" id="op_d" placeholder="Option d" />)}
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <CustomeSwitch
                                                                                onChange={this.EditToggle_d}
                                                                                checked={this.state.checked_d} />
                                                                        </td>
                                                                        <td><Input value="d" style={{position:"unset",margin:" 0 45%"}} type="radio" id="radio4" name="radio4" /></td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                            <Input id="fillup" hidden type="text" placeholder="Answer" />
                                                        </div>
                                                        <Button onClick={this.addQuestion} style={{ float: "right", margin: "15px" }}>Add Question</Button>
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
                                                        name="fselecttech"
                                                        placeholder="Select Technology"
                                                        value={this.state.selectedtech}
                                                        onChange={this.SelectTechHandleChange}
                                                        options={techoptions}
                                                    /> <br />
                                                    <Select
                                                        id="fselectsubtech"
                                                        name="fselectsubtech"
                                                        placeholder="Select Sub-Technology"
                                                        value={this.state.selectedsubtech}
                                                        hidden
                                                        onChange={this.SelectSubtechHandleChange}
                                                        options={subtechoptions}
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

const mapStateToProps = (state) => {
    return {
        technology: state.tech.technology,
        subtechnology: state.tech.subtechnology
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        techaction: bindActionCreators(techAction, dispatch),
        queaction: bindActionCreators(queAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Technology);
