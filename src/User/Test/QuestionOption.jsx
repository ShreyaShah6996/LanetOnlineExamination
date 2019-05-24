import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { Input} from 'reactstrap';
import * as questionAction from '../../Action/queAction';


class QuestionOption extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            question:"",
            a:"",
            b:"",
            c:"",
            d:"",
            quesId:"",
        }
    }
    componentWillMount=()=>{
        let {quesId}=this.props.ques;
        this.props.action.QuestionAction.getQuestionById(quesId).then((res)=>{
            let {question,a,b,c,d,quesId}=this.props.getQuestion;
            this.setState({question,a,b,c,d,quesId});
        });

    }

    componentWillReceiveProps = (nextProps) => {
        if(this.state.quesId !== nextProps.ques.quesId){
            let {quesId}=nextProps.ques;
            this.props.action.QuestionAction.getQuestionById(quesId).then((res)=>{
                let {question,a,b,c,d}=nextProps.getQuestion;
                this.setState({question,a,b,c,d});
            });
        }
    }

    render(){
        const {question,a,b,c,d}=this.state;
        return(
            <div>
                <p>{question}</p>
                <p><Input type={"radio"} name="option"/>{a}</p>
                <p><Input type={"radio"} name="option"/>{b}</p>
                <p><Input type={"radio"} name="option"/>{c}</p>
                <p><Input type={"radio"} name="option"/>{d}</p>
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