import React, { PureComponent } from 'react'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";

import * as testQuestionAction from '../../Action/testQuestionAction';
import * as userTestAction from '../../Action/userTestAction';
import * as userDataAction from '../../Action/userDataAction';
import QuestionOption from './QuestionOption.jsx';
import UserHeader from "../../components/Headers/UserHeader";
import { Button, Col, Row } from 'reactstrap';
import { findIndex } from 'lodash';

import FlipClock from '../FlipClock/FlipClock';
import QuestionButtons from '../QuestionButtons/QuestionButtons';

class Question extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            testId: "",
            userTestId: "",
            question: [],
            lastQuesId: "",
            index: 0,
            len: 0,
            userId: "",
            status: "RESUME",
            time: {
                h: 0,
                m: 0,
                s: 0
            },
            duration: 0,
            timeout: false
        }
    }
    componentWillMount = () => {
        let id = parseInt(this.props.match.params.id)
        this.props.action.UserTestAction.getUserTest(id);
    }
    componentWillReceiveProps = (props) => {
        let { testId, userTestId, question, lastQuesId, userId, duration, status } = props.getUserTest;
        this.setState({ testId, userTestId, question: JSON.parse(question), lastQuesId, len: question.length, userId, duration, status });
    }

    nextClick = () => {
        const { index, len, question, testId, userTestId, userId, status, duration } = this.state;
        let updateUserTestObj = { userTestId, testId, userId, question: JSON.stringify(question), lastQuesId: question[index].quesId, status, duration };
        this.props.action.UserTestAction.updateUserTest(userTestId, updateUserTestObj);
        this.setState({ index: index + 1, len: len - 1 });
    }

    previousClick = () => {
        const { index, len, question, testId, userTestId, userId, status, duration } = this.state;
        let updateUserTestObj = { userTestId, testId, userId, question: JSON.stringify(question), lastQuesId: question[index].quesId, status, duration };
        this.props.action.UserTestAction.updateUserTest(userTestId, updateUserTestObj);
        this.setState({ index: index - 1, len: len + 1 });
    }
    handleChange = (quesId, answer, status) => {
        const { question } = this.state;
        let answeredQuestion = { quesId, answer, status };
        let indexOfQuestion = findIndex(question, ['quesId', quesId]);
        question[indexOfQuestion] = answeredQuestion;
        this.setState({ question, lastQuesId: quesId });
    }

    finishClick = () => {
        const { index,  question, testId, userTestId,  userId, status, duration } = this.state;
        let updateUserTestObj = { userTestId, testId, userId, question: JSON.stringify(question), lastQuesId: question[index].quesId, status, duration };
        console.log(updateUserTestObj);
        this.props.action.UserTestAction.updateUserTest(userTestId, updateUserTestObj).then((res) => {
            this.props.action.UserDataAction.getUserData(userTestId).then((res) => {
                this.props.history.push(`/user/testResult/${userTestId}`)
            });
        });
    }

    onTimeOut = () => {
        const { index, question, testId, userTestId,  userId, status, duration } = this.state;
        let updateUserTestObj = { userTestId, testId, userId, question: JSON.stringify(question), lastQuesId: question[index].quesId, status, duration };
        this.props.action.UserTestAction.updateUserTest(userTestId, updateUserTestObj).then((res) => {
            this.props.action.UserDataAction.getUserData(userTestId).then((res) => {
                this.props.history.push(`/user/testResult/${userTestId}`)
            });
        });
        this.setState({ timeout: true })
    }
    getTime = (h, m, s) => {
        this.setState({
            ...this.state,
            time: {
                h, m, s
            }
        })
    }
    onJumpQuestion = (index) => {
        this.setState({ index })
    }

    render() {
        const { testId,  question, index, duration } = this.state;

        return (
            <div>
                <UserHeader/>
                <Row style={{ margin: "5%" }}>
                    <Col >
                        <Row>
                            {(question !== [] && question.length > 0) ? <QuestionOption ques={question[index]} handleChange={this.handleChange} testId={testId} /> : null}
                        </Row>
                        <Row>
                            {(index > 0) ? <Button color="warning" onClick={() => this.previousClick()}>Previous</Button> : null}
                            {(index !== question.length - 1) ? <Button color="warning" onClick={() => this.nextClick()}>Next</Button> : null}
                            {(index > -1 || index === question.length - 1) ? <Button color="warning" onClick={() => this.finishClick()}>Finish</Button> : null}
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            {(duration !== 0) ? <FlipClock onTimeOut={this.onTimeOut} duration={this.state.duration} getTime={this.getTime} /> : null}
                        </Row>
                        <Row>
                            <QuestionButtons question={question} onJumpQuestion={this.onJumpQuestion} />

                        </Row>
                    </Col>


                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        getTestQues: state.testQuestion.test_question,
        getUserTest: state.userTest.get_userTest
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        TestQuestionAction: bindActionCreators(testQuestionAction, dispatch),
        UserTestAction: bindActionCreators(userTestAction, dispatch),
        UserDataAction: bindActionCreators(userDataAction, dispatch)
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));

//export default Question
