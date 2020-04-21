/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import React, { useState } from "react";
import { Select, Input, Button } from "antd";
const { Option } = Select;

function InputSelect() {
  const [options, setOption] = useState(["Tom", "Steven", "Parker", "Chris"]);
  const [new_item, setNewItem] = useState("");
  // const [add_new_component, setAddNewComponent] = useState(false);
  const [dropdown_open, setDropdownOpen] = useState(false);
  const [onBlur_disable, setOnBlurDisable] = useState(false);
  console.log(`onBlur_disable: ${onBlur_disable}`);
  return (
    <Select
      defaultValue="Tom"
      style={{ width: 140 }}
      open={dropdown_open}
      onDropdownVisibleChange={(open) => {
        console.log(open);
        if (!onBlur_disable) {
          setDropdownOpen(open);
        }
      }}
      dropdownRender={(menu) => (
        <div>
          {menu}
          <div
            style={{ padding: "10px", cursor: "pointer" }}
            onMouseEnter={() => setOnBlurDisable(true)}
            onMouseLeave={() => setOnBlurDisable(false)}
          >
            {
              <div>
                <Input
                  style={{ marginBottom: "10px" }}
                  value={new_item}
                  onChange={(e) => setNewItem(e.target.value)}
                  // autoFocus
                />

                <div>
                  <Button
                    size="small"
                    onClick={() => {
                      setNewItem("");
                      setAddNewComponent(false);
                      setOnBlurDisable(false);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="small"
                    type="primary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      setNewItem("");
                      setAddNewComponent(false);
                      setOnBlurDisable(false);
                      setOption(options.concat(new_item));
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            }
          </div>
        </div>
      )}
    >
      {options.map((people) => {
        return (
          <Option key={people} value={people}>
            {people}
          </Option>
        );
      })}
    </Select>
  );
}

export default InputSelect;
