import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as questionAction from '../../Action/queAction';

import { Form, FormGroup, Input, Label } from 'reactstrap';


class QuestionOption extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            a: "",
            b: "",
            c: "",
            d: "",
            quesId: "",
            status: false,
            answer: ""
        }
    }
    componentWillMount = () => {

        let { quesId, answer } = this.props.ques;
        this.props.action.QuestionAction.getQuestionById(quesId).then((res) => {
            let { question, a, b, c, d, quesId } = this.props.getQuestion;
            this.setState({ question, a, b, c, d, quesId });
        });
        this.setState({ answer });

    }
    componentWillReceiveProps = (nextProps) => {

        if (this.state.quesId !== nextProps.ques.quesId) {
            let { quesId, answer } = nextProps.ques;
            this.props.action.QuestionAction.getQuestionById(quesId).then((res) => {

                let { question, a, b, c, d, quesId } = nextProps.getQuestion;
                this.setState({ question, a, b, c, d, status: nextProps.ques.status, quesId });
            });
            this.setState({ answer });
        }
    }

    onHandleChange = (e) => {
        this.setState({ answer: e.target.value, status: true })
        this.props.handleChange(this.state.quesId, e.target.value, true)
    }

    render() {
        const { question, a, b, c, d, answer } = this.state;

        return (
            <div>
                <Form>
                    <div dangerouslySetInnerHTML={{ __html: question }} />
                    <FormGroup check>
                        <Label check>
                            <Input type="radio"
                                   name="option"
                                   value={a}
                                   onChange={this.onHandleChange.bind(this)}
                                   checked={(answer === a && answer !== "") ? true : false}
                            />{' '}
                            {a}
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio"
                                   name="option"
                                   value={b}
                                   onChange={this.onHandleChange.bind(this)}
                                   checked={(answer === b && answer !== "") ? true : false}
                            />{' '}
                            {b}
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio"
                                   name="option"
                                   value={c}
                                   onChange={this.onHandleChange.bind(this)}
                                   checked={(answer === c && answer !== "") ? true : false}
                            />{' '}
                            {c}
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio"
                                   name="option"
                                   value={d}
                                   onChange={this.onHandleChange.bind(this)}
                                   checked={(answer === d && answer !== "") ? true : false}
                            />{' '}
                            {d}
                        </Label>
                    </FormGroup>
                </Form>
            </div>);
    }
}

const mapStateToProps = state => {
    return {
        getTestQues: state.testQuestion.test_question,
        getUserTest: state.userTest.get_userTest,
        getQuestion: state.question.questionById
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        QuestionAction: bindActionCreators(questionAction, dispatch)
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionOption));