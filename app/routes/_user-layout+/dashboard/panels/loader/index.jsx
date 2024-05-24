import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { triggerPanelCreatePaymentApp } from "..";

const { Dragger } = Upload;

const switchToListTab = () => {
  triggerPanelCreatePaymentApp();
}

const props = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (status === "done") {
      //message.success(`${info.file.name} file uploaded successfully.`);
       switchToListTab();
    } else if (status === "error") {
      //message.error(`${info.file.name} file upload failed.`);
      switchToListTab();
    }
  },
  async onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export default function Loader() {
  return (
    <div className="flex h-full justify-center items-center">
      <Dragger {...props} className="h-2/4 w-2/4">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Select a file of CSV type and click to upload the file for processing.</p>
      </Dragger>
    </div>
  );
}
