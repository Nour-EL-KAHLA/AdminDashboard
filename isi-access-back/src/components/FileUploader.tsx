import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ fieldChange }) => {
  const [fileUrl, setFileUrl] = React.useState<string>("");
  const [file, setFile] = React.useState<File>("" as any);
  const onDrop = useCallback(
    (acceptedFile: any) => {
      setFile(acceptedFile[0]);
      fieldChange(acceptedFile[0]);
      setFileUrl(URL.createObjectURL(acceptedFile[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center flex-col bg-slate-100  cursor-pointer rounded-xl"
    >
      <input {...getInputProps()} />
      {fileUrl ? (
        <div className="flex flex-1 justify-center w-full p-5">
          <img src={fileUrl} alt="image" />
        </div>
      ) : (
        <span className="py-8">
          Drag 'n' drop some files here, or click to select files
        </span>
      )}
    </div>
  );
};

export default FileUploader;
