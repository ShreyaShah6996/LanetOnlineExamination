import React, { Component } from 'react'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";

import * as userDataAction from '../../Action/userDataAction';

import { Card, CardTitle, CardText } from 'reactstrap';
import UserHeader from "../../components/Headers/UserHeader";
class Result extends Component {

    componentWillMount = () => {
        let userTestId = parseInt(this.props.match.params.userTestId)
        this.props.action.UserDataAction.getUserData(userTestId);
    }

    render() {
        let { getUserData } = this.props;

        if (getUserData && Object.keys(getUserData).length > 0) {
           
            let { testName, totalQuestion } = getUserData.Test;
    
            return (

                <div>
                    <UserHeader/>
                    {
                        (getUserData) ?
                            < div style={{ margin: "5% 30%" }}>
                                <Card body>
                                    <CardTitle style={{ textAlign: "center", fontSize: "30px", fontWeight: "500" }}>Result</CardTitle>
                                    <CardText style={{ textAlign: "center", fontSize: "20px", fontWeight: "400" }}>{testName}</CardText>
                                    <CardText>Total Question: {totalQuestion}</CardText>
                                    <CardText>Total Attempt: {getUserData.totalAttempt}/{totalQuestion}</CardText>
                                    <CardText>Total Correct Answer: {getUserData.totalCorrectAnswer}</CardText>
                                    <CardText>Total Wrong Answer: {getUserData.totalWrongAnswer}</CardText>
                                    <CardText style={{ fontSize: "16px", fontWeight: "bold" }}>Final Result: {getUserData.totalMarks}</CardText>
                                </Card>

                            </div> : null}
                </div>
            )
        }
        else {
            return <div></div>;
        }
    }
}

const mapStateToProps = state => {
    return {
        getUserData: state.userData.userData
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        UserDataAction: bindActionCreators(userDataAction, dispatch)
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Result));

