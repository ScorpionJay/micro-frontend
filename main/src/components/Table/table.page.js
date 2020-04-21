/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import React from "react";
import { Table as AntTable, Pagination } from "antd";
import "./style";

export default function TablePage(props) {
  return (
    <AntTable
      size="middle"
      bordered={props.bordered || true}
      {...props}
      // rowKey={props.rowKey || "id"}
      pagination={props.pagination}
      footer={() =>
        !props.pagination && (
          <div style={{ textAlign: "right" }}>
            <Pagination
              current={props.current}
              showQuickJumper
              bordered
              total={props.total}
              // showTotal={(total, range) =>
              //   `${range[0]}-${range[1]} 总共${total}条`
              // }
              //   hideOnSinglePage={true}
              onChange={(page) => props.onChangePage(page)}
              // showSizeChanger={true}// 是否切换分页
              onShowSizeChange={(current, size) => props.onChangePageSize(current, size)}
            />
          </div>
        )
      }
    />
  );
}
