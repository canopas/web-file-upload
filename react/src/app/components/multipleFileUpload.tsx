"use client";

import React, { useState, useRef, RefObject } from "react";
import pdfPreviewImg from "../../../../assets/images/pdf-icon.png";
import textPreviewImg from "../../../../assets/images/text-icon.png";
import audioPreviewImg from "../../../../assets/images/music-icon.png";
import apkPreviewImg from "../../../../assets/images/apk-icon.png";
import zipPreviewImg from "../../../../assets/images/zip-icon.png";
import sqlPreviewImg from "../../../../assets/images/sql-icon.png";
import filePreviewImg from "../../../../assets/images/file-icon.png";
import { StaticImageData } from "next/image";
type InputElementType = HTMLInputElement;

interface Props {
  accept?: string;
  uploadedFiles?: {
    fileType: string;
    fileUrl: string | StaticImageData;
    fileName: string;
  }[];
  callback: Function;
  removeBtnText?: string;
  uploadBtnText?: string;
  progressBtnText?: string;
  pdfPreview?: string | StaticImageData;
  textPreview?: string | StaticImageData;
  audioPreview?: string | StaticImageData;
  apkPreview?: string | StaticImageData;
  zipPreview?: string | StaticImageData;
  sqlPreview?: string | StaticImageData;
  filePreview?: string | StaticImageData;
  children: (file: {}) => React.ReactNode;
}

export default function MultipleFileUpload({
  accept = "",
  uploadedFiles = [] as Array<{
    fileType: string;
    fileUrl: string | StaticImageData;
    fileName: string;
  }>,
  callback,
  removeBtnText = "x",
  uploadBtnText = "Upload",
  progressBtnText = "Uploading...",
  pdfPreview = pdfPreviewImg,
  textPreview = textPreviewImg,
  audioPreview = audioPreviewImg,
  apkPreview = apkPreviewImg,
  zipPreview = zipPreviewImg,
  sqlPreview = sqlPreviewImg,
  filePreview = filePreviewImg,
  children,
}: Props) {
  const defaultPreview = [] as Array<{
    previewType: string;
    previewUrl: string | StaticImageData | ArrayBuffer | null;
    previewName: string;
    isDragging: boolean;
  }>;

  const defaultFiles = [] as Array<{
    fileType: string;
    fileUrl: string | StaticImageData;
    fileName: string;
  }>;

  if (uploadedFiles) {
    for (var i = 0; i < uploadedFiles.length; i++) {
      const obj = {
        previewType: uploadedFiles[i].fileType,
        previewUrl: uploadedFiles[i].fileUrl,
        previewName: uploadedFiles[i].fileName,
        isDragging: false,
      };

      defaultPreview.push(obj);
      defaultFiles.push(uploadedFiles[i]);
    }
  }

  const [filesPreview, setFilesPreview] = useState(defaultPreview);
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState(defaultFiles);

  const inputRefs = useRef<Array<RefObject<InputElementType> | null>>(
    new Array().fill(null)
  );
  const selectFile = (index: number) => {
    if (isUploading) {
      return;
    }
    if (inputRefs.current[index] && inputRefs.current[index]?.current) {
      inputRefs.current[index]?.current.click();
    }
  };

  const inputsRef = useRef(null);
  const selectFiles = () => {
    if (isUploading) {
      return;
    }
    if (inputsRef.current) {
      (inputsRef.current as HTMLInputElement).click();
    }
  };

  const add = (
    previewType: any,
    previewUrl: string | StaticImageData | ArrayBuffer | null,
    previewName: string,
    isDragging: boolean,
    file: any
  ) => {
    // add file
    setFiles((files) => {
      return [...files, file];
    });
    // add file preview
    setFilesPreview((filesPreview) => {
      return [
        ...filesPreview,
        {
          previewType: previewType,
          previewUrl: previewUrl,
          previewName: previewName,
          isDragging: isDragging,
        },
      ];
    });
  };

  const update = (
    previewType: any,
    previewUrl: string | StaticImageData | ArrayBuffer | null,
    previewName: string,
    isDragging: boolean,
    file: any,
    index: number
  ) => {
    // update file
    setFiles((files) => {
      const newFiles = [...files];
      newFiles[index] = file;
      return newFiles;
    });
    // update file preview
    setFilesPreview((filesPreview) => {
      const newFiles = [...filesPreview];
      newFiles[index].previewType = previewType;
      newFiles[index].previewUrl = previewUrl;
      newFiles[index].previewName = previewName;
      newFiles[index].isDragging = isDragging;
      return newFiles;
    });
  };

  const handleFileChange = (event: any, index: number, action: string) => {
    const files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      try {
        previewFile(files[i], index + i, action);
      } catch (error) {
        console.error("error : ", error);
      }
    }
  };

  const previewFile = (file: any, index: number, action: string) => {
    var obj = {
      previewType: "image",
      previewUrl: "" as string | StaticImageData | ArrayBuffer | null,
      previewName: file.name,
      isDragging: false,
    };

    const reader = new FileReader();
    reader.onload = () => {
      if (file.type.startsWith("image/")) {
        obj.previewUrl = reader.result;
      } else if (file.type === "text/plain") {
        obj.previewUrl = textPreview;
      } else if (file.type === "application/pdf") {
        obj.previewUrl = pdfPreview;
      } else if (file.type.startsWith("video/")) {
        obj.previewType = "video";
        obj.previewUrl = URL.createObjectURL(file);
      } else if (file.type.startsWith("audio/")) {
        obj.previewUrl = audioPreview;
      } else if (file.type === "application/vnd.android.package-archive") {
        obj.previewUrl = apkPreview;
      } else if (file.type === "application/zip") {
        obj.previewUrl = zipPreview;
      } else if (file.type === "application/sql") {
        obj.previewUrl = sqlPreview;
      } else {
        obj.previewUrl = filePreview;
      }
      obj.previewName = file.name;

      if (action == "reset") {
        update(
          obj.previewType,
          obj.previewUrl,
          obj.previewName,
          obj.isDragging,
          file,
          index
        );
      } else {
        add(
          obj.previewType,
          obj.previewUrl,
          obj.previewName,
          obj.isDragging,
          file
        );
      }
    };
    reader.onerror = (error) => {
      console.error(`Error while reading file ${file.name}: ${error}`);
    };
    reader.readAsDataURL(file);
  };

  const uploadingFunction = async () => {
    if (isUploading) {
      return;
    }
    setIsUploading(true);

    const gotFiles = await callback(files);

    setFilesPreview([]);
    setFiles([]);

    if (gotFiles) {
      for (var i = 0; i < gotFiles.length; i++) {
        const obj = {
          previewType: gotFiles[i].fileType,
          previewUrl: gotFiles[i].fileUrl,
          previewName: gotFiles[i].fileName,
          isDragging: false,
        };

        setFilesPreview((filesPreview) => {
          return [...filesPreview, obj];
        });

        const file = gotFiles[i];

        setFiles((files) => {
          return [...files, file];
        });
      }
    }

    setIsUploading(false);
  };

  const handleDragOver = (event: any, index: number, action: string) => {
    if (isUploading) {
      return;
    }
    event.preventDefault();
    if (action == "reset") {
      filesPreview[index].isDragging = true;
    }
  };

  const handleDragLeave = (event: any, index: number, action: string) => {
    event.preventDefault();
    if (action == "reset") {
      filesPreview[index].isDragging = false;
    }
  };

  const handleDrop = (event: any, index: number, action: string) => {
    if (isUploading) {
      return;
    }
    event.preventDefault();
    if (action == "reset") {
      filesPreview[index].isDragging = false;
    }
    const files = event.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
      try {
        if (accept ? accept.split(", ").includes(files[i].type) : true) {
          previewFile(files[i], index + i, action);
        }
      } catch (error) {
        console.error("error : ", error);
      }
    }
  };

  const removeImg = (index: any) => {
    if (isUploading) {
      return;
    }
    // remove file
    setFiles((files) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      return newFiles;
    });
    // remove file preview
    setFilesPreview((filesPreview) => {
      const newFiles = [...filesPreview];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div className="flex flex-wrap">
      {filesPreview.map((item: any, index: any) => (
        <div className="flex" key={index}>
          <div
            className="cursor-pointer"
            onClick={() => selectFile(index)}
            onDragOver={(event) => handleDragOver(event, index, "reset")}
            onDragLeave={(event) => handleDragLeave(event, index, "reset")}
            onDrop={(event) => handleDrop(event, index, "reset")}
          >
            {children && children(item)}
            <input
              type="file"
              ref={(element) => {
                inputRefs.current[index] = element
                  ? { current: element }
                  : null;
              }}
              className="hidden"
              onChange={(event) => handleFileChange(event, index, "reset")}
            />
          </div>
          <button
            className="remove-btn bg-[#ccc] h-7 rounded-full dark:bg-stone-500 dark:text-white px-2.5"
            onClick={() => removeImg(index)}
          >
            {removeBtnText}
          </button>
        </div>
      ))}
      <div className="flex">
        <div
          className="cursor-pointer"
          onClick={selectFiles}
          onDragOver={(event) =>
            handleDragOver(event, filesPreview.length, "add")
          }
          onDragLeave={(event) =>
            handleDragLeave(event, filesPreview.length, "add")
          }
          onDrop={(event) => handleDrop(event, filesPreview.length, "add")}
        >
          {children({})}
          <input
            type="file"
            ref={inputsRef}
            className="hidden"
            onChange={(event) =>
              handleFileChange(event, filesPreview.length, "add")
            }
            multiple
          />
        </div>
        <div
          className={
            isUploading
              ? "progress progress-striped active upload-btn relative"
              : "upload-btn relative"
          }
        >
          <button
            type="button"
            className={
              isUploading
                ? "progress-bar cursor-wait flex items-center justify-center bg-slate-700 dark:text-slate-300 dark:bg-blue-700 text-white flex-none py-3 px-8 rounded-full bottom-0 absolute disabled:opacity-70 disabled:cursor-not-allowed"
                : "flex items-center justify-center bg-slate-700 dark:text-slate-300 dark:bg-blue-700 text-white flex-none py-3 px-8 rounded-full bottom-0 absolute disabled:opacity-70 disabled:cursor-not-allowed"
            }
            onClick={uploadingFunction}
            disabled={filesPreview.length > 0 ? false : true}
          >
            {isUploading ? progressBtnText : uploadBtnText}
          </button>
        </div>
      </div>
    </div>
  );
}
