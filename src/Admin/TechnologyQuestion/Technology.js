import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import Header from "components/Headers/Header.jsx";
import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Container, Row, Button } from "reactstrap";
import { bindActionCreators } from 'redux';
import * as techAction from '../../Action/techAction'
import AddQuestions from './AddQuestions'
import AddTechnology from './AddTechnology'
import { Popconfirm } from 'antd';


class Technology extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            cols: [],
            rows: [],
            isedit: false,
            editdata: '',
        };
        this.toggle = this.toggle.bind(this);

    }

    componentDidMount() {
        this.props.techaction.GetTechnologyAction()
    }

    toggle() {
        this.setState(prevState => ({
            isedit: !prevState.isedit
        }));
    }
    EditTechnology = (tech, e) => {
        this.setState({
            isedit: true,
            editdata: tech
        })
    }
    DeleteTechnology = (techId, e) => {
        this.props.techaction.DeleteTechnologyAction(techId);
    }
    ActionbuttonDisplay = (cell, rowData, extradata) => {
        return (
            <div>
                <i style={{ fontSize: "25px", paddingRight: "15px" }} onClick={extradata.EditTechnology.bind(extradata, rowData)} className="ni ni-ruler-pencil"></i>
                <Popconfirm title="Are you sure you want to delete it?" onConfirm={extradata.DeleteTechnology.bind(extradata, cell)} okText="Yes" cancelText="No">
                    <i style={{ fontSize: "25px" }} className="ni ni-fat-remove"></i>
                </Popconfirm>
            </div>
        );
    }
    render() {
        return (
            <div>
                <Header />
                <Container className=" mt--7" fluid>
                    <Row>
                        <div className=" col">
                            <Card className=" shadow">
                                <CardHeader className=" bg-transparent">
                                    <h3 className=" mb-0">Technology</h3>
                                </CardHeader>
                                <CardBody>
                                    <AddTechnology isedit={this.state.isedit} editdata={this.state.editdata} toggle={this.toggle} />
                                    <BootstrapTable data={this.props.technology} striped hover>
                                        <TableHeaderColumn dataField="techName" isKey width="200"
                                                           filter={{ type: 'TextFilter' }} dataSort={true}>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField="techId" formatExtraData={this}
                                                           dataFormat={this.ActionbuttonDisplay} width="100" >Action</TableHeaderColumn>
                                    </BootstrapTable>
                                    <Button color="primary" style={{ width: "7%", padding: "10px", marginTop: "10px" }}>Next</Button>{' '}
                                    <Button color="primary" style={{ width: "7%", padding: "10px", marginTop: "10px" }}>Prev</Button>{' '}

                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                    {/* Questions */}
                    <AddQuestions />
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        technology: state.tech.technology,
        subtechnology: state.tech.subtechnology
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        techaction: bindActionCreators(techAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Technology);
