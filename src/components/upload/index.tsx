import React, { useState } from "react";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps, GetProp } from "antd";
import { Button, Upload, Image } from "antd";

interface uploadProps {
  files?: any[];
  changeFile?: (filelist: any[]) => void;
  action?: string;
  buttonTxt?: string;
  fileType: string;
  multiple: boolean;
  fileLimit?: number;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadComponent: React.FC<uploadProps> = ({
  files = [],
  changeFile,
  action,
  multiple,
  buttonTxt,
  fileType,
  fileLimit = 1,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(files);

  const handlePreview = async (file: UploadFile) => {
    console.log(file, "preview");
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleChange: UploadProps["onChange"] = (info) => {
    console.log(info, "info");
    let newFileList = [...info.fileList];

    newFileList = newFileList.slice(-fileLimit);

    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = `http://10.98.163.8:8088${file.response.imageUrl}`;
      }
      return file;
    });

    setFileList(newFileList);
    changeFile && changeFile(newFileList);
  };

  const props = {
    action: "http://10.98.163.8:8088/api/upload",
    onChange: handleChange,
    multiple,
    fileList,
  };

  return (
    <>
      {fileType === "audio" && (
        <Upload {...props} accept="audio/*" name="audio">
          <Button icon={<UploadOutlined />}>{buttonTxt}</Button>
        </Upload>
      )}
      {fileType === "image" && (
        <>
          <Upload
            name="image"
            accept="image/*"
            {...props}
            listType="picture-card"
            onPreview={handlePreview}
          >
            {fileList.length >= fileLimit ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </>
      )}
    </>
  );
};

export default UploadComponent;
