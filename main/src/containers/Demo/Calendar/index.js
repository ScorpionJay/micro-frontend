/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import React, { Component } from "react";
import { CalendarWeekTouch } from "@components";

export class CalendarContainer extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.fnCombineData();
  }

  /**
   * combile data
   */
  fnCombineData = (obj) => {
    console.log("combine data-----", obj);
    let data = [];
    // day
    for (let index = 1; index <= 7; index++) {
      let arr = [];
      // hour
      for (let i = 0; i <= 19; i++) {
        arr.push({ index: index + "-" + i });
      }
      data.push(arr);
    }

    this.setState({
      data
    });
  };

  /**
   * click
   */
  /* eslint-disable-next-line no-unused-vars */
  fnClickItem = ({ dayIndex, hourIndex, day, hour }) => {
    // console.log(dayIndex, hourIndex, day, hour);
    // call api
    const { data } = this.state;
    data[dayIndex][hourIndex].flag = !data[dayIndex][hourIndex].flag;
    this.setState({ data });
  };

  render() {
    return (
      <div>
        <CalendarWeekTouch data={this.state.data} onClickItem={this.fnClickItem} />
        {/* <CalendarMonth /> */}
      </div>
    );
  }
}

export default CalendarContainer;
