import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { Card, CardHeader, CardBody, Container, Row, Form, FormGroup, Label, Input, Button, Table } from "reactstrap";
import { notification } from 'antd';
import Select from 'react-select';

import Header from "components/Headers/Header.jsx";
import * as testQuestionAction from '../../Action/testQuestionAction';
import * as testAction from '../../Action/testAction';
import * as questionAction from '../../Action/queAction';

class TestQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
        };
    }

    componentDidMount() {
        this.props.action.TestAction.getAllTest();
        this.props.action.QuestionAction.getAllQuestion();
    }

    SelectHandleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.action.TestQuestionAction.getTestQuestion(selectedOption.value);
        document.getElementById('question').hidden = false;
        document.getElementById('shuffleButton').hidden = false;

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

    chkCompulsory(e) {

    }

    render() {
        const { selectedOption } = this.state;
        let testOptions = [];
        let testQuestion = [];
        let testQuesId;

        if (this.props.get_all && this.props.get_all.length !== 0) {
            this.props.get_all.map(test => {

                return testOptions.push({ value: test.testId, label: test.testName })
            })
        }

        if (this.props.test_question && this.props.test_question.length !== 0) {

            if (this.props.test_question.quesId && this.props.test_question.quesId.length !== 0) {
                testQuesId = this.props.test_question.testQuesId;
                this.props.test_question.quesId.map((ques, key) => {
                    if (this.props.get_all_question && this.props.get_all_question.length !== 0) {
                        this.props.get_all_question.filter(allques => {
                            if (allques.quesId === ques.quesId) {
                                return testQuestion.push(<tr key={key}>
                                    <td>{key + 1}</td>
                                    <td><Input type="textarea" disabled value={allques.question.text} /></td>
                                    <td><Input style={{ marginLeft: "28px" }} onChange={this.chkCompulsory.bind(this, ques.quesId)} type="checkbox" value={ques.Coumpulsory} /></td>
                                    <td><Input type="number" defaultValue={ques.marks} /></td>
                                    <td><Input type="number" defaultValue={ques.negativeMarks} /></td>
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
                                                options={testOptions}
                                            />
                                        </FormGroup>
                                        <FormGroup id="question" hidden>
                                            <FormGroup>
                                                <Label for="exampleText">Questions</Label>
                                                <div>
                                                    <Table id="mcq">
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th scope="col">Sr.No</th>
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
                                        </FormGroup>
                                        <Button color="warning" id="shuffleButton" outline style={{ float: "right" }} hidden onClick={this.btnShuffle.bind(this, testQuesId)}>Shuffle</Button>
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