/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import React, { Component } from "react";
import { Select, Input } from "antd";
const { Option } = Select;

export default class InputSelect extends Component {
  state = {
    open: false,
    onBlur_disable: false,
    inputValue: "",
    value: this.props.value,
    data: this.props.options,
    options: this.props.options
  };

  handleChange = (value) => {
    console.log(value);
  };
  setOnBlurDisable = (onBlur_disable) => {
    this.setState({ onBlur_disable });
  };

  render() {
    const { open, onBlur_disable, value, inputValue, options, data } = this.state;
    // const { options } = this.props;
    return (
      <Select
        // defaultValue="default value"
        placeholder="请选择"
        value={value}
        style={{ width: 200 }}
        onSelect={(value) => this.setState({ value, options: data, inputValue: "" })}
        open={open}
        onDropdownVisibleChange={(open) => {
          if (!onBlur_disable) {
            this.setState({ open });
          }
        }}
        dropdownRender={(menu) => {
          return (
            <div>
              <div
                style={{ display: "flex", alignItems: "center" }}
                onMouseEnter={() => this.setOnBlurDisable(true)}
                onMouseLeave={() => this.setOnBlurDisable(false)}
              >
                <Input
                  style={{ width: "150" }}
                  value={inputValue}
                  onChange={(e) => {
                    this.setState({ inputValue: e.target.value });
                    console.log(data, e.target.value);
                    const opts = data.filter((item) => item.includes(e.target.value));
                    this.setState({ options: opts });
                  }}
                />
              </div>

              {menu}
            </div>
          );
        }}
      >
        {options.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  }
}
