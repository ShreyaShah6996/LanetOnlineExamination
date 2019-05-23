import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { Card, CardHeader, CardBody, Container, Row, Form, FormGroup, Label, Input, Button, Table } from "reactstrap";
import { notification } from 'antd';
import Select from 'react-select';
import { findIndex } from 'lodash';


import Header from "components/Headers/Header.jsx";
import * as testQuestionAction from '../../Action/testQuestionAction';
import * as testAction from '../../Action/testAction';
import * as questionAction from '../../Action/queAction';

//let quesId = [];

class TestQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            questionHidden: false,
            shuffleButtonHidden: false,
            applyChangesHidden: false,
            testQuestionList: [],
            // quesId:[]
        };
    }

    componentDidMount() {
        this.props.action.TestAction.getAllTest();
        this.props.action.QuestionAction.getAllQuestion();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.test_question !== nextProps.test_question){
            this.setState({testQuestionList:nextProps.test_question});
        }
    }

    SelectHandleChange = (selectedOption) => {
        this.setState({ selectedOption,questionHidden:true,applyChangesHidden:false,shuffleButtonHidden:true });
        this.props.action.TestQuestionAction.getTestQuestion(selectedOption.value);
    }

    openNotificationWithIcon = (type, msg) => {
        notification[type]({
            message: msg
        });
    };

    btnShuffle(testQuesId, e) {
        this.openNotificationWithIcon('success', "Question Updated");
        this.props.action.TestQuestionAction.shuffleQuestion(this.state.selectedOption.value, testQuesId);
    }

    findIndex(ques){
        const {testQuestionList:{quesId}}=this.state;
        var find = findIndex(quesId, (x, value) => {
            return +x.quesId === ques.quesId
        });
        return find;
    }

    addChangesState(){
        this.setState({ applyChangesHidden:true});
    }

    chkCompulsoryHandler(ques,e) {
        const {testQuestionList:{quesId}}=this.state;
        var find = this.findIndex(ques);
        if (find !== -1 || find === 0) {
            quesId[find]["Coumpulsory"] = e.target.checked;
        } else {
            quesId.push({
                quesId:ques.quesId,
                Coumpulsory: e.target.checked
            })
        }
        this.setState({testQuestionList:{...this.state.testQuestionList,quesId:quesId}});
        this.addChangesState();
    }

    marksChangeHandler(ques,e){
        const {testQuestionList:{quesId}}=this.state;
        var find = this.findIndex(ques);
        if (find !== -1 || find === 0) {
            quesId[find]["marks"] = parseInt(e.target.value);
        } else {
            quesId.push({
                quesId:ques.quesId,
                marks: parseInt(e.target.value)
            })
        }
        this.setState({testQuestionList:{...this.state.testQuestionList,quesId:quesId}});
        this.addChangesState();
    }

    negativeMarksChangeHandler(ques,e){
        const {testQuestionList:{quesId}}=this.state;
        var find = this.findIndex(ques);
        if (find !== -1 || find === 0) {
            quesId[find]["negativeMarks"] = parseInt(e.target.value);
        } else {
            quesId.push({
                quesId:ques.quesId,
                negativeMarks: parseInt(e.target.value)
            })
        }
        this.setState({testQuestionList:{...this.state.testQuestionList,quesId:quesId}});
        this.addChangesState();
    }

    btnApplyChanges(testQuesId,quesList,e){
        const { selectedOption, testQuestionList:{quesId} } = this.state;
        quesList.forEach(quelist => {
            quesId.forEach(queId => {
                if(quelist.quesId === queId.quesId){
                    Object.keys(queId).forEach(key => {
                        if(key === "marks")
                            quelist[key]=queId[key]
                        if(key === "Coumpulsory")
                            quelist[key]=queId[key]
                        if(key === "negativeMarks")
                            quelist[key]=queId[key]
                    })
                }
            })
        })
        let question = {quesId:JSON.stringify(quesList)};
        this.props.action.TestQuestionAction.updateQuestion(selectedOption.value,testQuesId,question);
        this.setState({ applyChangesHidden: false});
    }

    render() {
        const { selectedOption ,questionHidden,shuffleButtonHidden,applyChangesHidden} = this.state;
        let testOptions = [];
        let testQuestion = [];
        let testQuesId;
        let quesList=[];

        if (this.props.get_all && this.props.get_all.length !== 0) {
            this.props.get_all.map(test => {
                return testOptions.push({ value: test.testId, label: test.testName })
            })
        }
        if (this.state.testQuestionList) {
            if (this.state.testQuestionList.quesId && this.state.testQuestionList.quesId.length) {
                testQuesId = this.state.testQuestionList.testQuesId;
                this.state.testQuestionList.quesId.map((ques, key) => {
                    if (this.props.get_all_question.length) {
                        this.props.get_all_question.filter(allques => {
                            if (allques.quesId === ques.quesId) {
                                quesList.push(ques);
                                return testQuestion.push(<tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{allques.SubTechnology.subTechName ? allques.SubTechnology.subTechName : allques.Technology.TechName}</td>
                                    <td><Input type="textarea" disabled value={allques.question} /></td>
                                    <td><Input type="checkbox" style={{ marginLeft: "28px" }} onChange={this.chkCompulsoryHandler.bind(this,ques)} checked={ques.Coumpulsory} /></td>
                                    <td><Input type="number" onChange={this.marksChangeHandler.bind(this,ques)} value={ques.marks} /></td>
                                    <td><Input type="number" onChange={this.negativeMarksChangeHandler.bind(this,ques)} value={ques.negativeMarks} /></td>
                                </tr>)
                            }
                            return null;
                        })

                    }
                    return null;
                })
            }
        }
        return (
            <>
                <Header />
                <Container className=" mt--7" fluid>
                    <Row>
                        <div className=" col">
                            <Card className=" shadow">
                                <CardHeader className=" bg-transparent">
                                    <h3 className=" mb-0">Test Questions</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <FormGroup>
                                            <Select
                                                placeholder="Select Test"
                                                value={selectedOption}
                                                onChange={this.SelectHandleChange}
                                                options={testOptions} />
                                        </FormGroup>
                                        {questionHidden && <FormGroup id="question">
                                            <FormGroup>
                                                <Label for="exampleText">Questions</Label>
                                                <div>
                                                    <Table id="mcq">
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th scope="col">Sr.No</th>
                                                                <th scope="col">Technology</th>
                                                                <th scope="col">Questions</th>
                                                                <th scope="col">Compulsory</th>
                                                                <th scope="col">Marks</th>
                                                                <th scope="col">Negative marks</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {testQuestion}
                                                        </tbody>
                                                    </Table>
                                                    <Input id="fillup" hidden type="text" placeholder="Answer" />
                                                </div>
                                            </FormGroup>
                                        </FormGroup>}
                                        {applyChangesHidden && <Button color="warning" outline onClick={this.btnApplyChanges.bind(this, testQuesId,quesList)}> Apply Changes </Button>}
                                        {/*testQuesId*/}
                                        {shuffleButtonHidden && <Button color="warning" id="shuffleButton" outline style={{ float: "right" }} onClick={this.btnShuffle.bind(this, testQuesId)}>Shuffle</Button>}
                                    </Form>
                                </CardBody>
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
        get_all: state.test.get_all,
        test_question: state.testQuestion.test_question,
        get_all_question: state.question.get_all_question
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        TestQuestionAction: bindActionCreators(testQuestionAction, dispatch),
        TestAction: bindActionCreators(testAction, dispatch),
        QuestionAction: bindActionCreators(questionAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TestQuestion);