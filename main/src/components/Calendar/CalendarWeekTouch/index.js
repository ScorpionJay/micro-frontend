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
    hours: [],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 },
    array: [],
    box: null
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

  /**
   * 触摸开始
   */
  fnTouchStart = (e) => {
    let { box, startPoint, array } = this.state;

    console.log(this);

    console.log("触摸开始", e);
    box = document.createElement("div");
    box.setAttribute("id", "box");
    box.style.position = "absolute";
    box.style.backgroundColor = "red";
    box.style.opacity = 0.3;
    // container.prepend(box);
    document.body.prepend(box);
    array = [];
    const { clientX, clientY } = e.touches ? e.touches[0] : e; // pc mobile
    startPoint = {
      x: clientX,
      y: clientY
    };
    this.setState({ startPoint, box, array });
  };

  /**
   * 触摸移动
   */
  fnTouchMove = (e) => {
    if (!document.querySelector("#box")) return;
    let { box, startPoint, endPoint, array } = this.state;
    const { clientX, clientY } = e.touches ? e.touches[0] : e; // pc mobile
    // const dom = document.elementFromPoint(clientX, clientY);
    endPoint = {
      x: clientX,
      y: clientY
    };

    box.style.height = Math.abs(startPoint.y - endPoint.y) + "px";
    box.style.width = Math.abs(startPoint.x - endPoint.x) + "px";

    box.style.top = Math.min(startPoint.y, endPoint.y) + "px";
    box.style.left = Math.min(startPoint.x, endPoint.x) + "px";

    Array.from(document.querySelectorAll("[class^=item]")).map((item) => {
      if (this.collisionCheck(box.getBoundingClientRect(), item.getBoundingClientRect())) {
        if (!array.includes(item)) {
          array.push(item);
          // console.log(item.id.split("-"));
          const indexs = item.id.split("-");
          this.props.onClickItem({ dayIndex: indexs[0], hourIndex: indexs[1] });
          // if (item.className.includes("high")) {
          //   item.setAttribute("class", "item");
          // } else {
          //   item.setAttribute("class", "item high");
          // }
        }
      } else {
        const index = array.indexOf(item);
        if (index !== -1) {
          array.splice(index, 1);
          const indexs = item.id.split("-");
          this.props.onClickItem({ dayIndex: indexs[0], hourIndex: indexs[1] });
          // if (item.className.includes("high")) {
          //   item.setAttribute("class", "item");
          // } else {
          //   item.setAttribute("class", "item high");
          // }
        }
      }
    });

    // console.log("touch select array", array);
    this.setState({ array });
  };

  /**
   * 触摸结束
   */
  fnTouchEnd = () => {
    let { box, array } = this.state;
    console.log("触摸结束");
    console.log(array);
    box.remove();
  };

  /**
   * 判断
   */
  collisionCheck = (node1, node2) => {
    return (
      node1.left < node2.left + node2.width &&
      node1.left + node1.width > node2.left &&
      node1.top < node2.top + node2.height &&
      node1.top + node1.height > node2.top
    );
  };

  render() {
    const { data } = this.props;
    const { day, days, hours } = this.state;
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
            onTouchStart={this.fnTouchStart}
            onTouchMove={this.fnTouchMove}
            onTouchEnd={this.fnTouchEnd}
          >
            {data &&
              data.map((dayItem, dayIndex) => (
                <div key={dayIndex} className="day">
                  {dayItem &&
                    dayItem.map((hourItem, hourIndex) => (
                      <div
                        key={hourIndex}
                        id={`${dayIndex}-${hourIndex}`}
                        className={`item  ${hourItem.flag ? "high" : ""} `}
                        onClick={() => this.fnChoose(dayIndex, hourIndex)}
                        // ref={(e) => (this["item" + dayIndex + hourItem] = e)}
                        ref={(e) => (this.itemr = e)}
                      >
                        {/* {hourItem.index} */}
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
