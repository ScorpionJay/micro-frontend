/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import React, { Component } from "react";
import moment from "moment";
import { Modal } from "antd";
import "./style";

export class Calendar extends Component {
  state = {
    visible: false,
    day: this.props.day || new Date(),
    hour: null,
    days: [],
    hours: []
  };

  componentDidMount() {
    this.fnCombineData();
  }
  fnCombineData = () => {
    // days
    let { day } = this.state;
    let days = [];
    for (let index = 0; index < 7; index++) {
      const temp = moment(day)
        .add(index, "days")
        .format("YYYY-MM-DD");
      days.push(temp);
    }

    // hours
    let startHour = 9;
    let hours = [];
    do {
      hours.push(startHour);
      startHour += 0.5;
    } while (startHour <= 18);
    console.log(123);
    this.setState({ days, hours });
  };
  fnChangeDate = (flag) => {
    let { day } = this.state;
    if (flag === "add") {
      day = moment(day)
        .add(7, "days")
        .format("YYYY-MM-DD");
    } else {
      day = moment(day)
        .subtract(7, "days")
        .format("YYYY-MM-DD");
    }

    this.setState({ day }, this.fnCombineData);
  };

  fnModal = (day, hour) => {
    console.log(day, hour);
    this.setState({ visible: true, day, hour });
  };

  fnOk = () => {
    console.log("ok");
    const { onModify } = this.props;
    const { day, hour } = this.state;
    onModify(day, hour, () => this.setState({ visible: false }));
  };

  render() {
    const { data: list } = this.props;
    const { day, days, hours } = this.state;
    return (
      <div>
        <div className="opt">
          <span className="pre" onClick={() => this.fnChangeDate("subtract")}></span>

          <span className="title">
            {moment(day).format("YYYY年MM月")} 全年第
            {moment(day).format("WW")}周
          </span>
          <span className="next" onClick={() => this.fnChangeDate("add")}></span>
        </div>

        <div className="top">
          {days &&
            days.map((item) => (
              <div className="top-item" key={item}>
                {item}
              </div>
            ))}
        </div>
        <div className="bottom">
          <div className="hour">
            {hours &&
              hours.map((item) => <div key={item}>{Number.isInteger(item) && `${item}:00`}</div>)}
          </div>
          <div
            className="container"
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around"
            }}
          >
            {list &&
              list.map((item, index) => (
                <div key={index} className="day">
                  {item &&
                    item.map((arr, i) => (
                      <div key={i} className="item" onClick={() => this.fnModal(index, i)}>
                        {/* {arr.index} */}
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>

        {this.state.visible && (
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.fnOk}
            onCancel={() => this.setState({ visible: false })}
          >
            <p>Some contents...</p>
          </Modal>
        )}
      </div>
    );
  }
}

export default Calendar;
