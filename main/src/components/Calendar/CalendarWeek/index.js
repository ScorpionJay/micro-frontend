/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import React, { Component } from "react";
import moment from "moment";
import "./style";

export class Calendar extends Component {
  state = {
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

  fnChoose = (dayIndex, hourIndex) => {
    const { days, hours } = this.state;
    const { onClickItem } = this.props;
    // console.log(dayIndex, hourIndex, days[dayIndex], hours[hourIndex]);
    onClickItem({
      dayIndex,
      hourIndex,
      day: days[dayIndex],
      hour: hours[hourIndex]
    });
  };

  render() {
    const { data } = this.props;
    const { day, days, hours } = this.state;
    console.log("123", data, days);
    console.log(this.props.data);
    return (
      <div className="c-calendar-week">
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
            onTouchStart={() => {
              console.log("touch start");
            }}
            onTouchMove={(e) => {
              console.log("touch start", e.touches[0]);
            }}
            onTouchEnd={() => {
              console.log("touch end");
            }}
          >
            {data &&
              data.map((dayItem, dayIndex) => (
                <div key={dayIndex} className="day">
                  {dayItem &&
                    dayItem.map((hourItem, hourIndex) => (
                      <div
                        key={hourIndex}
                        className={`item  ${hourItem.flag ? "high" : ""} `}
                        onClick={() => this.fnChoose(dayIndex, hourIndex)}
                      >
                        {/* {arr.index} */}
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
