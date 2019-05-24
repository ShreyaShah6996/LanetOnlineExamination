import React, { PureComponent } from 'react'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { Button,Card } from 'reactstrap';

import UserHeader from "../../components/Headers/UserHeader";
import * as testQuestionAction from '../../Action/testQuestionAction';
import * as userTestAction from '../../Action/userTestAction';
import QuestionOption from './QuestionOption.jsx';

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
        }
    }
    componentWillReceiveProps = (props) => {
        let { testId, userTestId, question, lastQuesId } = props.getUserTest;
        this.setState({ testId, userTestId, question: JSON.parse(question), lastQuesId, len: question.length });
    }

    nextClick = () => {
        const { index, len } = this.state;
        this.setState({ index: index + 1, len: len - 1 });
    }

    previousClick = () => {
        const { index, len } = this.state;
        this.setState({ index: index - 1, len: len + 1 });
    }

    render() {
        const { question, index } = this.state;
        return (
            <div>
                <UserHeader/>
                <Card style={{width:"500px",marginLeft:"30%",marginTop:"5%"}} >
                    {(question !== [] && question.length > 0) ? <QuestionOption ques={question[index]} /> : null}
                </Card>
                {(index > 0) ? <Button color="warning" onClick={() => this.previousClick()}>Previous</Button> : null}
                {(index !== question.length-1) ? < Button color="warning" onClick={() => this.nextClick()}>Next</Button> : null}
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
        UserTestAction: bindActionCreators(userTestAction, dispatch)
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));