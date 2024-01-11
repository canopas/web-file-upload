"use client";

import React, { useState, useRef } from "react";
import pdfPreviewImg from "../../../../assets/images/pdf-icon.png";
import textPreviewImg from "../../../../assets/images/text-icon.png";
import audioPreviewImg from "../../../../assets/images/music-icon.png";
import apkPreviewImg from "../../../../assets/images/apk-icon.png";
import zipPreviewImg from "../../../../assets/images/zip-icon.png";
import sqlPreviewImg from "../../../../assets/images/sql-icon.png";
import filePreviewImg from "../../../../assets/images/file-icon.png";
import { StaticImageData } from "next/image";

export default function SingleFileUpload({
  accept,
  uploadedFile,
  callback,
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
}: any) {
  const [previewFileData, setPreviewFileData] = uploadedFile;
  const [isUploading, setIsUploading] = useState(false);
  const [fileObj, setFileObj] = useState(null);

  const fileData = {} as {
    previewType: string;
    previewUrl: string | StaticImageData | ArrayBuffer | null;
    previewName: string;
    isDragging: boolean;
    isLoading: boolean;
  };

  const inputRef = useRef(null);

  const selectFile = () => {
    if (isUploading) {
      return;
    }
    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      previewFile(file);
    }
  };

  const previewFile = (file: any) => {
    fileData.previewType = "image";
    const reader = new FileReader();

    reader.onload = () => {
      if (file.type.startsWith("image/")) {
        fileData.previewUrl = reader.result;
      } else if (file.type === "text/plain") {
        fileData.previewUrl = textPreview;
      } else if (file.type === "application/pdf") {
        fileData.previewUrl = pdfPreview;
      } else if (file.type.startsWith("video/")) {
        fileData.previewType = "video";
        fileData.previewUrl = URL.createObjectURL(file);
      } else if (file.type.startsWith("audio/")) {
        fileData.previewUrl = audioPreview;
      } else if (file.type === "application/vnd.android.package-archive") {
        fileData.previewUrl = apkPreview;
      } else if (file.type === "application/zip") {
        fileData.previewUrl = zipPreview;
      } else if (file.type === "application/sql") {
        fileData.previewUrl = sqlPreview;
      } else {
        fileData.previewUrl = filePreview;
      }
      fileData.previewName = file.name;
      setFileObj(file);
      setPreviewFileData(fileData);
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

    await callback(fileObj);
    setFileObj(previewFileData);

    setIsUploading(false);
  };

  const handleDragOver = (event: any) => {
    if (isUploading) {
      return;
    }
    event.preventDefault();
    fileData.isDragging = true;
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    fileData.isDragging = false;
  };

  const handleDrop = (event: any) => {
    if (isUploading) {
      return;
    }
    event.preventDefault();
    fileData.isDragging = false;

    const file = event.dataTransfer.files[0];
    if (file && (accept ? accept.split(", ").includes(file.type) : true)) {
      previewFile(file);
    }
  };

  return (
    <div className="flex">
      <div
        className="cursor-pointer"
        onClick={selectFile}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {children}
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
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
          disabled={fileObj ? false : true}
        >
          {isUploading ? progressBtnText : uploadBtnText}
        </button>
      </div>
    </div>
  );
}
