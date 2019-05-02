import React from "react";
import { Card, CardHeader, CardBody, Container, Row, Form, FormGroup, Label, Input, Button, Table } from "reactstrap";
import Select from 'react-select';

import Header from "components/Headers/Header.jsx";

const options = [
    { value: 1, label: 'Test 1' },
    { value: 2, label: 'Test 2' }
];

class TestQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
        };
    }

    SelectHandleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    render() {
        const { selectedOption } = this.state;

        return (
            <>
                <Header />
                <Container className=" mt--7" fluid>
                    <Row>
                        <div className=" col">
                            <Card className=" shadow">
                                <CardHeader className=" bg-transparent">
                                    <h3 className=" mb-0">Test Questions</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <FormGroup>
                                            <Select
                                                placeholder="Select Test"
                                                value={selectedOption}
                                                onChange={this.SelectHandleChange}
                                                options={options}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormGroup>
                                                <Label for="exampleText">Questions</Label>
                                                <div>
                                                    <Table id="mcq">
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th scope="col">Sr.No</th>
                                                                <th scope="col">Questions</th>
                                                                <th scope="col">Compulsory</th>
                                                                <th scope="col">Marks</th>
                                                                <th scope="col">Negative marks</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td><Input type="textarea" disabled /></td>
                                                                <td><Input style={{ marginLeft: "28px" }} type="checkbox" /></td>
                                                                <td><Input type="number" defaultValue="1" /></td>
                                                                <td><Input type="number" defaultValue="0.5" /></td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                    <Input id="fillup" hidden type="text" placeholder="Answer" />
                                                </div>
                                            </FormGroup>
                                        </FormGroup>
                                        <Button color="warning" outline style={{ float: "right" }}>Shuffle</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

export default TestQuestion;
