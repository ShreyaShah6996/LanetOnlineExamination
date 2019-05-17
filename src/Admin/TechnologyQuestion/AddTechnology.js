import React, { Component } from 'react'
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import * as techAction from '../../Action/techAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import '../../assets/css/styles.css'

class AddTechnology extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isopen: false,
            checked: false,
            subTechInput: 0,
            technology: '',
            subtechnology: [],
        }
    }

    onChangeTechnology = (e) => {
        let value = e.target.value;
        if (e.target.name === "technology") {
            this.setState({ technology: value })
        }
    }
    onChangeSubtechnology = (e) => {
        let subTech = this.state.subtechnology;

        for (let i = 0; i < this.state.subTechInput; i++) {
            if (e.target.name === "subtech" + JSON.stringify(i)) {
                subTech[i] = e.target.value
            }
        }
        this.setState({ subtechnology: subTech })
    }
    plusTechnology = () => {
        this.setState({ isopen: !this.state.isopen })
        document.getElementById("AddTechForm").hidden = false;
        document.getElementById("plusIcon").hidden = true;
    }
    checked = (e) => {
        this.setState({
            checked: !this.state.checked,
            subTechInput: 1
        })
    }
    validate = () => {
        var flag = 1;

        if (this.state.technology === '') {

            flag = 0;
            document.getElementById("technology").focus();
        }
        else {
            let st = this.state.subtechnology;
            for (let x = 0; x < this.state.subTechInput; x++) {
                if (st[x] === undefined) {
                    st[x] = ""
                }
            }
            for (let i = 0; i < st.length; i++) {
                if (st[i] === "") {
                    document.getElementById("subtech" + JSON.stringify(i)).focus();
                    flag = 0;
                    break;
                }
            }
        }
        return flag
    }
    addTechnology = () => {
        if (this.validate()) {

            var l = (this.state.checked) ? 1 : 0;
            let obj = {
                techName: this.state.technology,
                level: l,
                subTechnologies: this.state.subtechnology
            }
            this.props.techaction.AddTechnologyAction(obj);
            this.setState({
                checked: false,
                subTechInput: 0,
                technology: '',
                subtechnology: []
            })
            document.getElementById("AddTechForm").hidden = true;
            document.getElementById("plusIcon").hidden = false;
            document.getElementById("addTech").hidden = false;
            document.getElementById("cancelTech").hidden = false;
            document.getElementById("AddSubTechForm").hidden = true;
            document.getElementById("level").disabled = false;
        }
        else {
            console.log("error..:(")
        }
    }

    cancelTechnology = () => {
        document.getElementById("AddTechForm").hidden = true;
        document.getElementById("plusIcon").hidden = false;

        this.setState({
            checked: false,
            subTechInput: 0,
            technology: '',
            subtechnology: []
        })
    }
    cancelSubTechnology = (e) => {
        this.setState({
            checked: !this.state.checked,
            subTechInput: 0,
            subtechnology: []
        })
        document.getElementById("AddSubTechForm").hidden = true;
        document.getElementById("addTech").hidden = false;
        document.getElementById("cancelTech").hidden = false;
        document.getElementById("level").disabled = false;

    }
    addSubTechInput = () => {
        this.setState({ subTechInput: this.state.subTechInput + 1 })
    }

    removeSubTechInput = () => {
        let subTech = this.state.subtechnology
        subTech.pop();
        this.setState({ subTechInput: this.state.subTechInput - 1, subtechnology: subTech })
    }

    render() {
        const { checked } = this.state;
        if (checked) {
            document.getElementById("AddSubTechForm").hidden = false;
            document.getElementById("addTech").hidden = true;
            document.getElementById("cancelTech").hidden = true;
            document.getElementById("level").disabled = true;
        }

        let subTechDisplay = [], renderSubTechInput;
        for (let i = 0; i < this.state.subTechInput; i++) {
            subTechDisplay.push(i);
        }

        renderSubTechInput = subTechDisplay.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div>
                            <i style={{ fontSize: "25px" }} onClick={() => this.addSubTechInput()} className="ni ni-fat-add"></i>
                            {this.state.subTechInput >= 2
                                ? <i style={{ fontSize: "25px" }} onClick={() => this.removeSubTechInput()} className="ni ni-fat-delete"></i>
                                : ""}
                        </div>
                        : ""}
                    <Input type="text" id={"subtech" + JSON.stringify(value)} name={"subtech" + JSON.stringify(value)}
                        placeholder="Sub-Technology"
                        style={{ marginBottom: "5px" }}
                        key={value}
                        value={this.state.subtechnology[value]}
                        onChange={this.onChangeSubtechnology.bind(this)} />
                </div>
            );
        });

        return (
            <>
                {/* <i className="ni ni-fat-add" style={{ fontSize: "40px" }} id="plusIcon" onClick={this.plusTechnology}></i> */}
                <div className="tech_header">
                    <div className="tech_add">
                        <i className="ni ni-fat-add" style={{ fontSize: "40px" }} id="plusIcon" onClick={this.plusTechnology}></i>
                    </div>
                    <div className="number_drp">
                        <Container>
                            <Input type="select" name="select" >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="All">All</option>
                            </Input>
                        </Container>
                    </div>
                </div>
                <Container id="AddTechForm" hidden style={{ border: "1px solid lightgrey", borderRadius: "6px", marginBottom: "10px" }}>
                    <Form>
                        <h3 style={{ marginTop: "6px" }}> Add Technology</h3>
                        <FormGroup>
                            <Input type="text" id="technology" name="technology" value={this.state.technology} placeholder="Technology" onChange={this.onChangeTechnology.bind(this)} />
                        </FormGroup>
                        <FormGroup check style={{ marginTop: "10px", marginBottom: "15px", fontSize: "15px" }}>
                            <Label check>
                                <Input type="checkbox" id="level" checked={this.state.checked} onChange={this.checked.bind(this)} />{' '}
                                <div style={{ marginLeft: '20px' }}>Want to add Level?</div>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Button id="addTech" onClick={this.addTechnology}>Add</Button>
                            <Button id="cancelTech" onClick={this.cancelTechnology}>Cancel</Button>
                        </FormGroup>
                    </Form>
                    <Container id="AddSubTechForm" hidden style={{ border: "1px solid lightgrey", borderRadius: "6px", marginBottom: "10px" }}>
                        <Form>
                            <h3 style={{ marginTop: "6px" }}> Add Sub-Technology</h3>
                            <FormGroup>
                                {/*  <i className="ni ni-fat-add" style={{ fontSize: "35px" }} id="plus"></i>  */}
                                {this.state.subTechInput
                                    ? <div className='header-center mt10'>
                                        {renderSubTechInput}
                                    </div> : ""}
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.addTechnology}>Add</Button>
                                <Button onClick={this.cancelSubTechnology.bind(this)}>Cancel</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </Container>


            </>
        )
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
        techaction: bindActionCreators(techAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTechnology); 