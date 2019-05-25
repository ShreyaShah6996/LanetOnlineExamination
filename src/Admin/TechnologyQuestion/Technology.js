import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import { Popconfirm } from 'antd';
import Header from "components/Headers/Header.jsx";
import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux'
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Container, Input, Row } from "reactstrap";
import { bindActionCreators } from 'redux';
import * as techAction from '../../Action/techAction'
import AddQuestions from './AddQuestions'
import AddTechnology from './AddTechnology'
import './Technologyquestion.css';


class Technology extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            cols: [],
            rows: [],
            isedit: false,
            editdata: '',
            recordPerPage: 5,
            offset: 0,
            fieldName: 'techId',
            sortDirection: 'ASC'
        };
        this.toggle = this.toggle.bind(this);

    }

    componentDidMount() {
        this.props.techaction.GetLimitedTechnologyAction(this.state.offset, this.state.recordPerPage, this.state.fieldName, this.state.sortDirection);
    }
    getTechnologies = (offset, recordPerPage, fieldName, sortDirection) => {
        this.props.techaction.GetLimitedTechnologyAction(offset, recordPerPage, fieldName, sortDirection);
    }
    recordPerPageChangeHandler = (e) => {
        let recordPerPage = e.target.value;
        let offset = 0;
        if (recordPerPage !== 'All') {
            document.getElementById("PrevNext").hidden = false;
            this.setState({ recordPerPage, offset });
            this.getTechnologies(offset, recordPerPage, this.state.fieldName, this.state.sortDirection);
        }
        else {
            document.getElementById("PrevNext").hidden = true;
            this.props.techaction.GetTechnologyAction();
        }
    }
    btnNextPrevClick(e) {
        let recordPerPage = this.state.recordPerPage;
        let offset = 0;
        if (e.target.name === "Prev") {
            offset = this.state.offset - this.state.recordPerPage;
        }
        else if (e.target.name === "Next") {
            offset = this.state.offset + this.state.recordPerPage;
        }
        this.setState({ offset });
        this.getTechnologies(offset, recordPerPage, this.state.fieldName, this.state.sortDirection);
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
        this.props.techaction.DeleteTechnologyAction(techId).then((res) => {
            this.props.techaction.GetLimitedTechnologyAction(this.state.offset, this.state.recordPerPage, this.state.fieldName, this.state.sortDirection);
        })
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
        let techdata = [];
        let noMoreData = 0;
        if (this.props.technology && this.props.technology.length !== 0) {
            this.props.technology.map((tech, key) => {
                noMoreData = key + 1;
                return techdata.push(tech);
            })
            if (techdata.length > this.state.recordPerPage) {
                techdata.pop()
            }
        }
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
                                    <div class="records_per_page">
                                        <Input className="records_per_page_input" type="select" name="select" onChange={this.recordPerPageChangeHandler.bind(this)} >
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="All">All</option>
                                        </Input>
                                    </div>
                                    <BootstrapTable data={techdata} striped hover>
                                        <TableHeaderColumn dataField="techName" isKey width="200"
                                            filter={{ type: 'TextFilter' }} dataSort={true}>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField="techId" formatExtraData={this}
                                            dataFormat={this.ActionbuttonDisplay} width="100" >Action</TableHeaderColumn>
                                    </BootstrapTable>
                                    <CardFooter id="PrevNext">
                                        <ButtonGroup>
                                            {(this.state.offset !== 0) ?
                                                <Button color="primary" onClick={this.btnNextPrevClick.bind(this)} name="Prev">Prev</Button>
                                                : null}&nbsp;&nbsp;&nbsp;
                                            {noMoreData >= this.state.recordPerPage ?
                                                <Button color="primary" onClick={this.btnNextPrevClick.bind(this)} name="Next">Next</Button>
                                                : null
                                            }
                                        </ButtonGroup>
                                    </CardFooter>
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
