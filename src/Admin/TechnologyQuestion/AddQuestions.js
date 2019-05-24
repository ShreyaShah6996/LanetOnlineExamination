import classnames from 'classnames';
import React, { Component } from 'react'
import { ExcelRenderer } from 'react-excel-renderer';
import { connect } from 'react-redux'
import Select from 'react-select';
import { Badge, Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane } from "reactstrap";
import { bindActionCreators } from 'redux';
import * as queAction from '../../Action/queAction'
import sample from '../../assets/excelsheet/sample.xls';
import CustomeSwitch from '../../components/CustomeSwitch/CustomeSwitch'
import RichTextBox from '../../components/RichTextEditor/richtext'


class AddQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            fileJson: [],
            checked_a: false,
            checked_b: false,
            checked_c: false,
            checked_d: false,
            eopt_a: '',
            eopt_b: '',
            eopt_c: '',
            eopt_d: '',
            glob_que: '',
            op_a: '',
            op_b: '',
            op_c: '',
            op_d: '',
            answer: '',
            fanswer: '',
            selectedtech: null,
            selectedsubtech: null,
            ismcq: true,
            validQue: true,
            validfile: true,
            ishide: {
                selectsubtech: true,
                fselectsubtech: true,
                mcq: false,
                fillup: true,
                radio1: false,
                isupload: true
            },
            textEditor: ''
        };
        this.QuestionToggle = this.QuestionToggle.bind(this);
    }
    componentDidMount() {
        this.props.queaction.GetAllTechnologyAction()
        this.setState({
            ...this.state,
            ishide: {
                ...this.state.ishide,
                selectsubtech: true,
                fselectsubtech: true
            }
        })
        document.getElementById("selectsubtech").hidden = true;
        document.getElementById("fselectsubtech").hidden = true;
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
        this.setState({
            ...this.state,
            validQue: true,
            ishide: {
                ...this.state.ishide,
                selectsubtech: true,
                fselectsubtech: true
            }
        })
        let techId = selectedOption.value
        this.props.technology.map((t) => {
            if (t.techId === JSON.parse(techId)) {
                if (t.level === 1) {
                    this.props.queaction.GetSubtechnologyAction(techId).then((res) => {
                        this.setState({
                            ...this.state,
                            ishide: {
                                ...this.state.ishide,
                                selectsubtech: false,
                                fselectsubtech: false
                            }
                        })
                        document.getElementById("selectsubtech").hidden = false;
                        document.getElementById("fselectsubtech").hidden = false;
                    })
                    this.validateUpload(selectedOption, false, null, this.state.fileJson)
                }
                else {
                    this.validateUpload(selectedOption, true, null, this.state.fileJson)
                }
            }
            return true
        })
        this.setState({
            ...this.state,
            selectedtech: selectedOption,
            selectedsubtech: null,
        });
    }
    SelectSubtechHandleChange = (selectedOption) => {
        this.setState({ selectedsubtech: selectedOption, validQue: true });
        this.validateUpload(this.state.selectedtech, this.state.ishide.fselectsubtech, selectedOption, this.state.fileJson)
    }
    hideUpload = () => {
        this.setState({ ishide: { ...this.state.ishide, isupload: true } })
        document.getElementById("uploadfile").hidden = true
    }
    showUpload = () => {
        this.setState({ ishide: { ...this.state.ishide, isupload: false } })
        document.getElementById("uploadfile").hidden = false
    }
    validateUpload = (selectedtech, fselectsubtech, selectedsubtech, fileJson) => {
        if (selectedtech !== null) {
            if (!fselectsubtech) {
                if (selectedsubtech !== null) {
                    if (this.state.validfile && fileJson.length !== 0) {
                        this.showUpload()
                    }
                    else {
                        this.hideUpload()
                    }
                }
                else {
                    this.hideUpload()
                }
            }
            else {
                if (this.state.validfile && fileJson.length !== 0) {
                    this.showUpload()
                }
                else {
                    this.hideUpload()
                }
            }
        }
        else {
            this.hideUpload()
        }
    }
    fileHandler = (event) => {
        this.setState({ validfile: true })
        let fileObj = event.target.files[0];
        if (fileObj !== undefined) {
            let fname = fileObj.name
            let ext = fname.split(".")
            const extension = ext[1];
            if (extension === "xlsx" || extension === "xls") {
                ExcelRenderer(fileObj, (err, resp) => {
                    if (!err) {
                        let jsonArray = []
                        var column = resp.rows[0]
                        var row = resp.rows.slice(1, resp.rows.length)
                        row.map((r) => {
                            let o = {}
                            for (let i = 0; i < r.length; i++) {
                                let key = column[i]
                                o = {
                                    ...o,
                                    [key]: r[i]
                                }
                            }
                            jsonArray.push(o);
                            return true
                        })
                        this.setState({
                            fileJson: jsonArray
                        });
                        this.validateUpload(this.state.selectedtech, this.state.ishide.fselectsubtech, this.state.selectedsubtech, jsonArray);
                    }
                });
            }
            else {
                this.setState({ validfile: false })
                this.hideUpload()
            }
        }
    }
    UploadFile = () => {
        const techid = (this.state.selectedtech !== null) ? this.state.selectedtech.value : 0;
        const subtechid = (this.state.selectedsubtech !== null) ? this.state.selectedsubtech.value : null;
        let fobj = this.state.fileJson.map((f) => {
            return {
                ...f,
                techId: parseInt(techid),
                subTechId: parseInt(subtechid),
            }
        })
        let qobj = {
            questions: fobj
        }
        this.props.queaction.AddQuestionAction(qobj).then((res)=>{
            this.clearState()
        })
    }
    mcqClick = () => {
        this.setState({
            ismcq: true,
            validQue: true,
            ishide: {
                ...this.state.ishide,
                mcq: false,
                fillup: true
            }
        })
    }
    fillUpClick = () => {
        this.setState({
            ismcq: false,
            validQue: true,
            ishide: {
                ...this.state.ishide,
                mcq: true,
                fillup: false
            }
        })
    }
    EditToggle_a = () => {
        this.setState({ checked_a: !this.state.checked_a, validQue: true });
    }
    EditToggle_b = () => {
        this.setState({ checked_b: !this.state.checked_b, validQue: true });
    }
    EditToggle_c = () => {
        this.setState({ checked_c: !this.state.checked_c, validQue: true });
    }
    EditToggle_d = () => {
        this.setState({ checked_d: !this.state.checked_d, validQue: true });
    }
    addQuestion = () => {
        var a, b, c, d;
        const state = this.state
        const techid = (state.selectedtech !== null) ? state.selectedtech.value : null;
        const subtechid = (state.selectedsubtech !== null) ? state.selectedsubtech.value : null;
        let obj, ans
        if (state.ismcq) {
            a = (state.checked_a) ? state.eopt_a : state.op_a
            b = (state.checked_b) ? state.eopt_b : state.op_b
            c = (state.checked_c) ? state.eopt_c : state.op_c
            d = (state.checked_d) ? state.eopt_d : state.op_d
            ans = (state.answer === 'a') ? a : (((state.answer === 'b') ? b : (state.answer === 'c') ? c : (state.answer === 'd') ? d : ''))
        }
        else {
            ans = state.fanswer
            a = b = c = d = null;
        }
        obj = {
            techId: techid,
            subTechId: subtechid,
            question: state.glob_que,
            a: a,
            b: b,
            c: c,
            d: d,
            answer: ans
        }
        if (obj.techId === null || (obj.subTechId === null && !state.ishide.selectsubtech) || obj.question === "" || obj.a === "" || obj.b === "" || obj.c === "" || obj.d === "" || obj.answer === "") {
            this.setState({ validQue: false })
        }
        else {
            this.setState({ validQue: true })
            let qobj = {
                questions: [obj]
            }
            this.props.queaction.AddQuestionAction(qobj).then((res) => {
                this.clearState()
            });
        }
    }
    clearState=()=>{
        this.setState({
            checked_a: false,
            checked_b: false,
            checked_c: false,
            checked_d: false,
            selectedtech: null,
            selectedsubtech: null,
            eopt_a: '',
            eopt_b: '',
            eopt_c: '',
            eopt_d: '',
            glob_que: '',
            answer: '',
            fanswer: '',
            op_a: '',
            op_b: '',
            op_c: '',
            op_d: '',
            ismcq: true,
            validfile: true,
            fileJson:[],
            ishide: {
                ...this.state.ishide,
                radio1: false,
                selectsubtech: true,
                fselectsubtech: true,
            }
        })
    }
    onChangeAnswer = (e) => {
        if (e.target.id === 'fillup') {
            this.setState({ fanswer: e.target.value })
        }
        else {
            this.setState({ answer: e.target.value })
        }
    }
    onChangeOption = (e) => {
        if (e.target.id === "op_a") {
            this.setState({ op_a: e.target.value });
        }
        else if (e.target.id === "op_b") {
            this.setState({ op_b: e.target.value });
        }
        else if (e.target.id === "op_c") {
            this.setState({ op_c: e.target.value });
        }
        else {
            this.setState({ op_d: e.target.value });
        }
        this.setState({ validQue: true });
    }
    handleChange = (value, type) => {
        this.setState({ [type]: value, validQue: true });
    }
    render() {
        var techoptions = []
        var subtechoptions = []
        this.props.technology.map((t) => {
            let obj = {
                value: t.techId,
                label: t.techName
            }
            techoptions.push(obj)
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
            <div>
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
                                                    hidden={this.state.ishide.selectsubtech}
                                                    onChange={this.SelectSubtechHandleChange}
                                                    options={subtechoptions}
                                                />
                                                <br />
                                                <Form>
                                                    <FormGroup>
                                                        {/* question editor */}
                                                        <RichTextBox txttype='glob_que' value={this.state.glob_que} text="Enter Question" handleChange={this.handleChange} />
                                                    </FormGroup>
                                                    <FormGroup style={{ float: "right", cursor: "pointer" }}>
                                                        <Badge color="primary" pill onClick={this.mcqClick.bind(this)}>MCQ</Badge>{' '}
                                                        <Badge color="primary" pill onClick={this.fillUpClick.bind(this)}>Fill Up</Badge>
                                                    </FormGroup>
                                                    <div>
                                                        <Table id="mcq" hidden={this.state.ishide.mcq}>
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
                                                                            ? (<RichTextBox txttype='eopt_a' value={this.state.eopt_a} text="Enter Option" handleChange={this.handleChange} />)
                                                                            : (<Input type="text" id="op_a" value={this.state.op_a} onChange={this.onChangeOption.bind(this)} placeholder="Option a" />)}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <CustomeSwitch
                                                                        onChange={this.EditToggle_a}
                                                                        checked={this.state.checked_a} />
                                                                </td>
                                                                <td><Input value="a" style={{ marginLeft: "20px" }} type="radio" id="radio1" name="radio1" onChange={this.onChangeAnswer.bind(this)} /></td>
                                                            </tr>
                                                            <tr>
                                                                <td>b</td>
                                                                <td>
                                                                    <div style={{ width: '650px' }}>
                                                                        {(this.state.checked_b)
                                                                            ? (<RichTextBox txttype='eopt_b' value={this.state.eopt_b} text="Enter Option" handleChange={this.handleChange} />)
                                                                            : (<Input type="text" id="op_b" value={this.state.op_b} placeholder="Option b" onChange={this.onChangeOption.bind(this)} />)}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <CustomeSwitch
                                                                        onChange={this.EditToggle_b}
                                                                        checked={this.state.checked_b} />
                                                                </td>
                                                                <td><Input value="b" style={{ marginLeft: "20px" }} type="radio" id="radio2" name="radio1" onChange={this.onChangeAnswer.bind(this)} /></td>
                                                            </tr>
                                                            <tr>
                                                                <td>c</td>
                                                                <td>
                                                                    <div style={{ width: '650px' }}>
                                                                        {(this.state.checked_c)
                                                                            ? (<RichTextBox txttype='eopt_c' value={this.state.eopt_c} text="Enter Option" handleChange={this.handleChange} />)
                                                                            : (<Input type="text" id="op_c" value={this.state.op_c} placeholder="Option c" onChange={this.onChangeOption.bind(this)} />)}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <CustomeSwitch
                                                                        onChange={this.EditToggle_c}
                                                                        checked={this.state.checked_c} />
                                                                </td>
                                                                <td><Input value="c" style={{ marginLeft: "20px" }} type="radio" id="radio3" name="radio1" onChange={this.onChangeAnswer.bind(this)} /></td>
                                                            </tr>
                                                            <tr>
                                                                <td>d</td>
                                                                <td>
                                                                    <div style={{ width: '650px' }}>
                                                                        {(this.state.checked_d)
                                                                            ? (<RichTextBox txttype='eopt_d' value={this.state.eopt_d} text="Enter Option" handleChange={this.handleChange} />)
                                                                            : (<Input type="text" id="op_d" value={this.state.op_d} placeholder="Option d" onChange={this.onChangeOption.bind(this)} />)}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <CustomeSwitch
                                                                        onChange={this.EditToggle_d}
                                                                        checked={this.state.checked_d} />
                                                                </td>
                                                                <td><Input value="d" style={{ marginLeft: "20px" }} type="radio" id="radio4" name="radio1" onChange={this.onChangeAnswer.bind(this)} /></td>
                                                            </tr>
                                                            </tbody>
                                                        </Table>
                                                        <Input id="fillup" value={this.state.fanswer} hidden={this.state.ishide.fillup} type="text" placeholder="Answer" onChange={this.onChangeAnswer.bind(this)} />
                                                    </div>
                                                    <Button onClick={this.addQuestion} style={{ float: "right", margin: "15px" }}>Add Question</Button>
                                                </Form>
                                            </CardBody>
                                            <div hidden={this.state.validQue} style={{ color: 'red' }}>* Please fill the all details</div>
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
                                                    hidden={this.state.ishide.fselectsubtech}
                                                    onChange={this.SelectSubtechHandleChange}
                                                    options={subtechoptions}
                                                />
                                                <input type="file" onChange={this.fileHandler.bind(this)} style={{ margin: "20px" }} />
                                                <div hidden={this.state.validfile} style={{ color: 'red' }}>* Accepts only Excel file</div><br />
                                                <a href={sample}>Sample Excel file</a>
                                                <Button id="uploadfile" hidden onClick={this.UploadFile}>Upload</Button>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </Card>
                    </div>
                </Row>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        technology: state.question.alltech,
        subtechnology: state.question.subtechnology
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        queaction: bindActionCreators(queAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestions);
