import React, { PureComponent } from 'react'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";

import * as testAction from '../../Action/testAction';

import UserHeader from "../../components/Headers/UserHeader";
import TokenModel from './TokenModel.jsx';

import { Card, Button, CardTitle, CardText } from 'reactstrap';

class TestDescription extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            modal: false,
        }
    }
    componentDidMount = () => {
        let id = this.props.match.params.id;
        this.setState({ id });
        this.props.action.TestAction.getAllTest();
    }

    toggleTokenModel = () => {
        this.setState({ modal: !this.state.modal });
    }

    render() {
        let test = [];
        const { id } = this.state;

        if (this.props.getTest && this.props.getTest.length > 0) {
            test = this.props.getTest.filter((testData) => {
                return testData.testId === parseInt(id);
            })
        }
        return (
            <div>
                <UserHeader />
                <TokenModel isOpen={this.state.modal}
                            toggle={this.toggleTokenModel}
                            test={(test.length > 0) ? test : null}>
                    Take Test
                </TokenModel>
                {(test !== [] && test.length !== 0) ?
                    <div style={{ margin: "5% 30%" }}>
                        <Card body>
                            <CardTitle style={{ textAlign: "center", fontSize: "30px", fontWeight: "500" }}>{test[0].testName}</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.{(test[0].description !== "" && test[0].description !== null) ? test[0].description : null}</CardText>
                            <Button color="danger" onClick={() => this.toggleTokenModel()}>Start Test</Button>
                        </Card>

                    </div> : null}
            </div>);
    }
}

const mapStateToProps = state => {
    return {
        getTest: state.test.get_test
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        TestAction: bindActionCreators(testAction, dispatch)
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestDescription));