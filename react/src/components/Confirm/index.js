/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import { Modal } from "antd";

const confirm = Modal.confirm;

export const Confirm = (title = "", content = "", onOk, onCancel) =>
  confirm({
    title: title,
    content: content,
    onOk() {
      onOk && onOk();
    },
    onCancel() {
      onCancel && onCancel();
    }
  });
