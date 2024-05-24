import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";

import styles from "./styles-request-info.module.css";

const { TextArea } = Input;

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex justify-center">
      <Button
        type="primary"
        className="mt-2"
        title="Request additional information from the customer to complete the Review"
        onClick={showModal}
      >
        Request Additional Info
      </Button>
      <Modal
        className={styles.requestInfoModal}
        title="Request Info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        okText="Send"
      >
        <p className={`m-4 ${styles.message}`}>
          Send a message to the Applicant requesting more information on this Application to proceed with the Review
        </p>

        <Form labelCol={{ span: 4 }} layout="horizontal" style={{ maxWidth: 600 }}>
          <Form.Item label="Application:">
            <Input disabled={true} value="AB113012NP" />
          </Form.Item>
          <Form.Item label="Message">
            <TextArea rows={4} defaultValue="Please send the copy of B/L for Application: AB113012NP" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
