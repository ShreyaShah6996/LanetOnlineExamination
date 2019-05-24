import React, { PureComponent } from 'react'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";

import { Modal, ModalBody, Button, Form, FormGroup, Input } from 'reactstrap';
import * as testQuestionAction from '../../Action/testQuestionAction';
import * as userTestAction from '../../Action/userTestAction';

export let randomQuestions = [];
class TokenModel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            isValidate: "",
            errMsg: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = () => {
        const { test } = this.props;
        const { token } = this.state;
        if (test[0].token === token) {
            this.props.action.TestQuestionAction.getTestQuestion(parseInt(test[0].testId)).then((res) => {
                const { quesId } = this.props.getTestQues;
                let ids = quesId.map((quesid) => {
                    return quesid.quesId;
                })
                var questions = ids;
                var noQuestion = ids.length;
                while (noQuestion > 0) {
                    var random1 = Math.floor(Math.random() * questions.length);
                    var choice1 = questions[random1];
                    questions.splice(random1, 1);
                    randomQuestions.push(choice1);
                    noQuestion--;
                }
                let updatedQuestions = randomQuestions.map((randomQues) => {
                    let newQuestion = quesId.filter((ques) => {
                        return ques.quesId === randomQues
                    })
                    return newQuestion[0];
                })
                let userTestObj = {
                    userId: parseInt(localStorage.getItem("userId")),
                    testId: parseInt(test[0].testId),
                    question: JSON.stringify(updatedQuestions),
                    lastQuesId: updatedQuestions[0].quesId
                }
                this.props.action.UserTestAction.addUserTest(userTestObj).then((res) => {
                    let { userTestId } = this.props.userTest;
                    this.props.action.UserTestAction.getUserTest(userTestId)
                    this.props.history.push(`/user/question/${userTestId}`);
                });

            });
            this.props.toggle();
            this.setState({ token: "" });
        }
        else {
            this.setState({ token: "", errMsg: true });
        }
    }

    onCancel = () => {
        this.setState({ token: "", errMsg: false });
        this.props.toggle();
    }

    render() {
        const { token, isValidate, errMsg } = this.state;
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="token"
                                    placeholder="Enter token here"
                                    onChange={this.handleChange}
                                    value={token} />
                                {
                                    (isValidate && token === "") ? (
                                        <span style={{ color: "red" }}>* Token Required</span>
                                    ) : null
                                }
                                {
                                    (errMsg === true) ? <span style={{ color: "red" }}>* Incorrect Token</span> : null
                                }
                            </FormGroup>
                            <FormGroup>
                                <Button color="success" onClick={this.onSubmit}>Submit</Button>
                                <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        getTestQues: state.testQuestion.test_question,
        userTest: state.userTest.userTest
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        TestQuestionAction: bindActionCreators(testQuestionAction, dispatch),
        UserTestAction: bindActionCreators(userTestAction, dispatch)
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TokenModel));