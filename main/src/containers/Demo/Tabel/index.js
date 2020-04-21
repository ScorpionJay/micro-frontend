/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import React, { Component } from "react";
import { Table } from "@components";

export class TableContainer extends Component {
  render() {
    const dataSource = [
      {
        key: "1",
        name: "jack",
        age: 32,
        address: "shanghai"
      },
      {
        key: "2",
        name: "jay",
        age: 42,
        address: "beijing"
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
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default TableContainer;
