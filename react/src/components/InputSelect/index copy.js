/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import React, { Component } from "react";
import { Select, Input, Button } from "antd";
const { Option } = Select;

export class InputSelect extends Component {
  state = {
    open: false,
    onBlur_disable: false,
    inputValue: ""
  };

  handleChange = (value) => {
    console.log(value);
  };
  setOnBlurDisable = (onBlur_disable) => {
    this.setState({ onBlur_disable });
  };

  render() {
    const { open, onBlur_disable, value, inputValue } = this.state;
    const { options } = this.props;
    return (
      <Select
        // defaultValue="default value"
        placeholder="请选择"
        value={value}
        style={{ width: 200 }}
        onSelect={(value) => this.setState({ value })}
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
                  onChange={(e) => this.setState({ inputValue: e.target.value })}
                  autoFocus
                />
                <Button
                  size="small"
                  type="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    console.log(this.state.inputValue);
                    this.setState({
                      value: this.state.inputValue,
                      open: false
                    });
                    //   setNewItem("");
                    //   setAddNewComponent(false);
                    //   setOnBlurDisable(false);
                    //   setOption(options.concat(new_item));
                  }}
                >
                  确定
                </Button>
                {/* <Button
                  size="small"
                  onClick={() => {
                    //   setNewItem("");
                    //   setAddNewComponent(false);
                    //   setOnBlurDisable(false);
                  }}
                >
                  取消
                </Button> */}
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
