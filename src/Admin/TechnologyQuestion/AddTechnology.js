import React, { Component } from 'react'
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import * as techAction from '../../Action/techAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class AddTechnology extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isedit: false,
            editdata: '',
            isopen: false,
            checked: false,
            subTechInput: 0,
            technology: '',
            subtechnology: [],
            delTechId: [],
            ishide: {
                plusIcon: false,
                AddSubTechForm: true,
                AddTechForm: true,
                addTech: false,
                cancelTech: false,
                level: false,
            },
            flag: true
        }
    }
    componentWillReceiveProps = (nextProps) => {

        if (nextProps.isedit && this.state.flag) {
            this.plusTechnology()
            const data = nextProps.editdata

            if (data.level !== 0) {

                const subtech = data.SubTechnologies
                let subt = subtech.map((t) => {
                    return {
                        subTechId: t.subTechId,
                        subTechName: t.subTechName
                    }

                })
                this.setState({
                    checked: true,
                    subTechInput: subtech.length,
                    subtechnology: subt,
                    ishide: {
                        ...this.state.ishide,
                        AddTechForm: false,
                        plusIcon: true,
                        AddSubTechForm: false,
                        addTech: true,
                        cancelTech: true,
                        level: true
                    }
                })
            }
            else {
                this.setState({

                    checked: false,
                    subTechInput: 0,
                    subtechnology: [],
                    ishide: {
                        flag: true,
                        ...this.state.ishide,
                        AddTechForm: false,
                        plusIcon: true,
                        AddSubTechForm: true,
                        addTech: false,
                        cancelTech: false,
                        level: false
                    }
                })
            }
            this.setState({
                technology: data.techName,
            })
        }
        this.setState({
            flag: true,
            isedit: nextProps.isedit,
            editdata: nextProps.editdata
        })
    }
    addSubTechInput = () => {
        if (this.state.isedit) {
            const subtech = this.state.subtechnology
            subtech.push({ subTechName: '' })
            this.setState({ subtechnology: subtech })
        }
        this.setState({ subTechInput: this.state.subTechInput + 1 })
    }

    removeSubTechInput = () => {

        let subTech = this.state.subtechnology
        let deleted = subTech.pop();
        if (this.state.isedit) {
            if (deleted.subTechId !== undefined) {
                const dtech = this.state.delTechId
                dtech.push(deleted.subTechId)
            }
        }
        this.setState({ subTechInput: this.state.subTechInput - 1, subtechnology: subTech })
    }

    onChangeTechnology = (e) => {
        let value = e.target.value;
        if (e.target.name === "technology") {
            this.setState({ technology: value })
        }
    }
    onChangeSubtechnology = (e) => {
        let subTech = this.state.subtechnology;
        if (this.state.isedit) {
            for (let i = 0; i < this.state.subTechInput; i++) {
                if (e.target.name === "subtech" + JSON.stringify(i)) {
                    subTech[i] = {
                        ...subTech[i],
                        subTechName: e.target.value
                    }
                }
            }
        }
        else {

            for (let i = 0; i < this.state.subTechInput; i++) {
                if (e.target.name === "subtech" + JSON.stringify(i)) {
                    subTech[i] = e.target.value
                }
            }
        }
        this.setState({ subtechnology: subTech })
    }
    plusTechnology = () => {
        this.setState({
            isopen: !this.state.isopen,
            ishide: {
                ...this.state.ishide,
                AddTechForm: false,
                plusIcon: true
            }
        })
        // document.getElementById("AddTechForm").hidden = false;
        // document.getElementById("plusIcon").hidden = true;
    }
    checked = (e) => {
        if (this.state.isedit) {
            this.setState({
                subtechnology: [{ subTechName: '' }]
            })
        }
        this.setState({
            checked: !this.state.checked,
            subTechInput: 1,
            ishide: {
                ...this.state.ishide,
                AddSubTechForm: false,
                addTech: true,
                cancelTech: true,
                level: true
            }
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
            console.log("==", st)
            if (this.state.isedit) {
                for (let i = 0; i < st.length; i++) {
                    if (st[i].subTechName === "") {
                        document.getElementById("subtech" + JSON.stringify(i)).focus();
                        flag = 0;
                        break;
                    }
                }
            }
            else {
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

        }
        return flag
    }
    addTechnology = () => {
        debugger
        if (this.validate()) {
            if (this.state.delTechId.length > 0) {
                this.state.delTechId.map((sid) => {
                    debugger
                    this.props.techaction.DeleteSubtechnologyAction(sid)
                    return true
                })
            }
            var l = (this.state.checked) ? 1 : 0;
            let obj = {
                techName: this.state.technology,
                level: l,
                subTechnologies: this.state.subtechnology
            }
            if (this.state.isedit) {
                this.setState({ flag: false })
                this.props.techaction.EditTechnologyAction(this.state.editdata.techId, obj);
            } else {
                this.props.techaction.AddTechnologyAction(obj);
            }

            this.setState({
                isedit: false,
                editdata: '',
                checked: false,
                subTechInput: 0,
                technology: '',
                subtechnology: [],
                isopen: false,
                ishide: {
                    ...this.state.ishide,
                    AddSubTechForm: true,
                    AddTechForm: true,
                    plusIcon: false,
                    addTech: false,
                    cancelTech: false,
                    level: false
                }
            })
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
            subtechnology: [],
            isopen: false,
            ishide: {
                ...this.state.ishide,
                AddTechForm: true,
                plusIcon: false
            }
        })
        if (this.props.isedit) {
            this.props.toggle()
        }
    }
    cancelSubTechnology = (e) => {
        if (this.state.isedit) {
            if (this.state.subtechnology.length > 0) {

                let st = this.state.delTechId
                this.state.subtechnology.map((s) => {
                    if (s.subTechId !== undefined) {
                        st.push(s.subTechId)
                    }
                    return true
                })
                this.setState({
                    delTechId: st
                })
            }
        }
        this.setState({
            checked: !this.state.checked,
            subTechInput: 0,
            subtechnology: [],
            ishide: {
                ...this.state.ishide,
                AddSubTechForm: true,
                addTech: false,
                cancelTech: false,
                level: false
            }
        })

    }

    render() {
        let subTechDisplay = [], renderSubTechInput;
        for (let i = 0; i < this.state.subTechInput; i++) {
            subTechDisplay.push(i);
        }

        renderSubTechInput = subTechDisplay.map((value) => {
            const stechvalue = (this.state.isedit) ? this.state.subtechnology[value].subTechName : this.state.subtechnology[value]
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
                           value={stechvalue}
                           onChange={this.onChangeSubtechnology.bind(this)} />
                </div>
            );
        });

        return (
            <>
            <i className="ni ni-fat-add" hidden={this.state.ishide.plusIcon} style={{ fontSize: "40px" }} id="plusIcon" onClick={this.plusTechnology}></i>
            <Container id="AddTechForm" hidden={this.state.ishide.AddTechForm} style={{ border: "1px solid lightgrey", borderRadius: "6px", marginBottom: "10px" }}>
                <Form>
                    <h3 style={{ marginTop: "6px" }}>{this.props.isedit?"Update Technology":"Add Technology"} </h3>
                    <FormGroup>
                        <Input type="text" id="technology" name="technology" value={this.state.technology} placeholder="Technology" onChange={this.onChangeTechnology.bind(this)} />
                    </FormGroup>
                    <FormGroup check style={{ marginTop: "10px", marginBottom: "15px", fontSize: "15px" }}>
                        <Label check>
                            <Input type="checkbox" id="level" checked={this.state.checked} onChange={this.checked.bind(this)} disabled={this.state.ishide.level} />{' '}
                            <div style={{ marginLeft: '20px' }}>Want to add Level?</div>
                        </Label>
                    </FormGroup>
                    <FormGroup>

                        <Button id="addTech"  hidden={this.state.ishide.addTech} onClick={this.addTechnology}>{this.state.isedit ? ("Edit") : ("Add")}</Button>

                        <Button id="cancelTech" hidden={this.state.ishide.cancelTech} onClick={this.cancelTechnology}>Cancel</Button>
                    </FormGroup>
                </Form>
                <Container id="AddSubTechForm" hidden={this.state.ishide.AddSubTechForm} style={{ border: "1px solid lightgrey", borderRadius: "6px", marginBottom: "10px" }}>
                    <Form>
                        <h3 style={{ marginTop: "6px" }}>{this.props.isedit?"Update Sub-Technology":"Add Sub-Technology"}</h3>
                        <FormGroup>
                            {this.state.subTechInput
                                ? <div className='header-center mt10'>
                                    {renderSubTechInput}
                                </div> : ""}
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={this.addTechnology}>{this.state.isedit ? ("Edit") : ("Add")}</Button>

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
