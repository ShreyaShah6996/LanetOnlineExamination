import React, { Component } from 'react';
import { Table, Button,Container } from 'reactstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as testAction from '../../Action/testAction';
import moment from 'moment';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount = () => {
        this.props.action.TestAction.getAllTest();
    }

    takeTestClick = (id) => {
        this.props.history.push(`/user/testDescription/${id}`)
    }

    render() {
        let test = [];
        if (this.props.getTest && this.props.getTest.length > 0) {
            test = this.props.getTest.filter((test) => {
                return test.date.split("T")[0] === moment(new Date()).format("YYYY-MM-DD").toString()
            })
        }

        let data = test && test.map((testData, i) => {
            return <tr key={i}>
                <td>{i + 1}</td>
                <td>{testData.testName}</td>
                <td>{testData.duration}</td>
                <td><Button color="warning" onClick={() => this.takeTestClick(testData.testId)}>Take Test</Button></td>
            </tr>
        })

        return (
            <React.Fragment>
                <div className="Test_table_main_div">
                    <Container>
                        <div className="Test_table">
                            <Table responsive>
                                <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Test</th>
                                            <th>Duration</th>
                                            <th>Take Test</th>
                                        </tr>
                                    </thead>
                                <tbody>
                                        {(data.length > 0) ? data : null}
                                    </tbody>
                            </Table>
                        </div>
                    </Container>
                </div>
            </React.Fragment>
        );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Test));