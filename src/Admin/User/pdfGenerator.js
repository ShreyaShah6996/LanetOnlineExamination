import React, { Component } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';
import { Button } from 'reactstrap';

class PDFGenerator extends Component {
    generate = () => {
        var doc = new jsPDF('p', 'pt');
        doc.page = 1;
        // let a = this.state.data[1].College.collegeName + " (" + this.state.data[1].College.searchKeyword + ")-" + new Date().getFullYear();
        let a = "Student Report";
        var res = doc.autoTableHtmlToJson(document.getElementById("basic-table"));
        let b = moment(new Date()).format("DD - MMM - YYYY")
        var header = function (data) {
            //Header
            doc.setFontSize(12.5);
            doc.setTextColor(54, 123, 175);
            doc.setFontStyle('bold');
            //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
            doc.text(a, data.settings.margin.left, 50);
            //Footer Date
            doc.setFontSize(10);
            doc.setTextColor(54, 123, 175);
            doc.setFontStyle('normal');
            doc.text(40, 810, b);
            //Company Name
            doc.setFontSize(10);
            doc.setTextColor(54, 123, 175);
            doc.setFontStyle('normal');
            doc.text(200, 810, 'La Net Team Software Solutions Pvt. LTD.')
            //doc.page++;
            //Page no
            doc.setFontSize(10);
            doc.setTextColor(54, 123, 175);
            doc.setFontStyle('normal');
            doc.text(520, 810, 'Page ' + doc.page)
            doc.page++;
        };

        var options = {
            addPageContent: header,
            margin: {
                top: 80
            },
            startY: doc.autoTableEndPosY() + 80
        };

        doc.autoTable(res.columns, res.data, options);

        doc.save("studentReport.pdf");
    }
    render() {
        let info = this.props.data.map((d, i) => {
            return <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{d.firstName} {d.lastName}</td>
                <td>{d.email}</td>
                <td>{d.College.searchKeyword}</td>
                <td>{d.contactNo}</td>
            </tr>
        })
        return (
            <div>
                <Button onClick={this.generate} style={{ float: "right", marginRight:"0"}}> PDF</Button>
                <table id="basic-table" style={{ display: "none" }} >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>College</th>
                            <th>Contact No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info}
                    </tbody>
                </table>
            </div>);
    }
}

export default PDFGenerator;