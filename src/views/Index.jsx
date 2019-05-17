import React from "react";
import { find, filter, groupBy } from 'lodash';
import { Table, Row, Col } from 'antd';
import { Chart } from "react-google-charts";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import Header from "components/Headers/Header.jsx";
import * as userAction from '../Action/userAction';

const resultColor = {
  Excellent: { color: 'green' },
  Good: { color: 'blue' },
  OK: { color: 'red' },
};

let sData = [];
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: null,
      yearChart: null,
      listData: null,
      resultChart: null,
      resultData: null,
      selectedCollege: null,
      chartColors: null
    };
  }

  componentDidMount() {
    this.props.action.UserAction.getAllUser();
    this.columns = [
      // {
      //   title: 'Student ID',
      //   dataIndex: 'userId',
      //   key: 'userId',
      // },
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      }
    ];
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.get_limited_user && nextProps.get_limited_user.length !== 0) {
        let studData = nextProps.get_limited_user;
        sData = studData;
        sData.map(obj => {
          obj.joiningYear = new Date(obj.createdDate).getFullYear();
          obj.collegeKeyword = obj.College.searchKeyword;
          return obj;
        });
        this.yearWiseChart();
      }
    }
  }

  yearWiseChart = () => {
    let studentData = sData;
    let yearWiseData = groupBy(studentData, 'joiningYear');
    let allColleges = Object.keys(groupBy(studentData, 'collegeKeyword'));
    let finalData = Object.keys(yearWiseData).map(x => { return { year: x, data: groupBy(yearWiseData[x], 'collegeKeyword') } });
    const chartType = 'Year';
    let yearChart = [];
    yearChart.push([chartType, ...allColleges]);
    Object.keys(yearWiseData).map(year => {
      let data = find(finalData, { year: year });
      let row = [];
      yearChart[0].map(col => {
        if (col === chartType) {
          row = [year];
        } else {
          if (col in data.data) {
            row = [...row, data.data[col].length];
          } else {
            row = [...row, 0];
          }
        }
        return row;
      });
      return yearChart.push(row);
    });
    this.setState({
      yearChart
    });

    this.chartEvents = [
      {
        eventName: "select",
        callback: ({ chartWrapper }) => {
          this.showTable(chartWrapper);
        }
      }
    ]
  };

  showTable = (chartWrapper) => {
    const { yearChart } = this.state;
    let studentData = sData;
    let obj = chartWrapper.getChart().getSelection();
    const college = yearChart[0][obj[0].column];
    const year = parseInt(yearChart[obj[0].row + 1][0]);
    let listData = filter(studentData, { joiningYear: year, collegeKeyword: college });
    this.setResultChart(listData);
    let selectedCollege = null;
    if (listData.length > 0) {
      selectedCollege = listData[0].College;
    }
    this.setState({
      listData,
      selectedCollege
    });
  };

  setResultChart = (listData) => {
    let resultChart = [];
    resultChart.push(['Task', 'Result']);
    const groupData = groupBy(listData, 'result');

    let chartColors = [];

    Object.keys(groupData).map((resultType, index) => {
      resultChart.push([resultType, groupData[resultType].length]);
      chartColors.push(resultColor[resultType]);
      return null;
    });
    this.setState({
      resultChart,
      chartColors
    });
  };

  render() {
    const { yearChart, listData, selectedCollege } = this.state;
    return (
      <>
        <Header />
        <div style={{ marginTop: '1%' }}>
          <Row>
            <Col span={5} />
            <Col span={14}>
              {
                yearChart &&
                <Chart
                  width={'100%'}
                  height={'500px'}
                  chartType="Bar"
                  loader={<div>Loading Chart</div>}
                  data={yearChart}
                  options={{
                    chart: {
                      title: 'Student',
                      subtitle: 'Year wise students',
                    },
                  }}
                  chartEvents={this.chartEvents}
                  rootProps={{ 'data-testid': '2' }}
                />
              }
            </Col>
            <Col span={5} />
          </Row>
          <Row>
            <Col span={2} />
            <Col span={20}>
              {
                selectedCollege &&
                <div style={{ backgroundColor: '#fafafa', paddingTop: '2%', paddingBottom: '2%' }}>
                  <h3 style={{ textAlign: 'center' }}>
                    {selectedCollege.collegeName || ''}
                  </h3>
                </div>
              }
            </Col>
            <Col span={2} />
          </Row>

          <Row>
            <Col span={5} />
            <Col span={14}>
              {
                listData &&
                <div style={{ marginTop: '5%' }}>
                  <h1 style={{ textAlign: 'center' }}>Student List</h1>
                  <Table rowKey="email" columns={this.columns}
                    dataSource={listData} />
                </div>
              }
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    get_limited_user: state.user.get_limited_user,
    get_user_error: state.user.get_user_error,
  }
}

const mapDispatchToProps = (dispatch) => ({
  action: {
    UserAction: bindActionCreators(userAction, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);