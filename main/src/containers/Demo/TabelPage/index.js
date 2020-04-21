/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import React, { Component } from "react";
import { TablePage } from "@components";

export class TableContainer extends Component {
  render() {
    const dataSource = [
      {
        key: "1",
        name: "Jay",
        age: 32,
        address: "beijing"
      },
      {
        key: "2",
        name: "jack",
        age: 42,
        address: "shanghai"
      }
    ];

    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "address"
      }
    ];
    return (
      <div>
        table
        <TablePage dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default TableContainer;
