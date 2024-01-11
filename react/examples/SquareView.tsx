"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import placeHolderImg from "../../assets/images/placeholder.png";
import "@canopassoftware/react-file-upload/style.css";
import {
  SingleFileUpload,
  MultipleFileUpload,
} from "@canopassoftware/react-file-upload";

export default function App() {
  // for single file upload component
  const [previewFileData, setPreviewFileData] = useState(
    {} as {
      previewType: string;
      previewUrl: string | StaticImageData | ArrayBuffer | null;
      previewName: string;
      isDragging: boolean;
    }
  );

  const handleFileUploading = async (file: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPreviewFileData({
      previewType: "image",
      previewUrl: "https://picsum.photos/300/224",
      previewName: file.name,
      isDragging: false,
    });
  };

  // for multiple file upload component
  const uploadedFiles = [] as Array<{
    fileType: string;
    fileUrl: string | StaticImageData;
    fileName: string;
  }>;

  const handleFilesUploading = async (files: any) => {
    const uploadedFiles = [];

    for (var i = 0; i < files.length; i++) {
      uploadedFiles.push({
        fileType: "image",
        fileUrl: "https://picsum.photos/300/224",
        fileName: files[i].name,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    return uploadedFiles;
  };

  return (
    <main className="flex flex-col justify-between p-5">
      <p className="mt-5 ms-6">Single File Upload</p>
      <SingleFileUpload
        uploadedFile={[previewFileData, setPreviewFileData]}
        callback={handleFileUploading}
        uploadBtnText={"Save"}
        progressBtnText={"Saving..."}
      >
        <div className="h-full w-full cursor-pointer mx-5">
          <div className="flex h-[195px] w-[195px] relative bg-[#e7e7e7] rounded-2xl">
            <div className="h-full w-full">
              {previewFileData.previewType != "video" ? (
                <Image
                  className="object-contain rounded-2xl w-full h-full"
                  src={
                    (previewFileData.previewUrl
                      ? previewFileData.previewUrl
                      : placeHolderImg) as string
                  }
                  height={224}
                  width={300}
                  alt="image"
                />
              ) : (
                <video
                  autoPlay
                  loop
                  className="h-full w-full object-contain rounded-2xl"
                >
                  <source
                    src={previewFileData.previewUrl as string}
                    type="video/mp4"
                  />
                </video>
              )}
            </div>
          </div>
          <p className="break-words text-center dark:text-white">
            {previewFileData.previewName}
          </p>
        </div>
      </SingleFileUpload>
      <br />
      <hr />
      <p className="mt-5 ms-6">Multiple File Upload</p>
      <MultipleFileUpload
        accept=""
        uploadedFiles={uploadedFiles}
        callback={handleFilesUploading}
        uploadBtnText={"Upload"}
        progressBtnText={"Uploading..."}
      >
        {(file: any) => (
          <div className="h-full w-full cursor-pointer mx-5">
            <div className="flex h-[195px] w-[195px] relative bg-[#e7e7e7] rounded-2xl">
              <div className="h-full w-full">
                {file.previewType != "video" ? (
                  <Image
                    className="object-contain rounded-2xl w-full h-full"
                    src={
                      (file.previewUrl
                        ? file.previewUrl
                        : placeHolderImg) as string
                    }
                    height={224}
                    width={300}
                    alt="image"
                  />
                ) : (
                  <video
                    autoPlay
                    loop
                    className="h-full w-full object-contain rounded-2xl"
                  >
                    <source src={file.previewUrl as string} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
            <p className="break-words text-center dark:text-white">
              {file.previewName}
            </p>
          </div>
        )}
      </MultipleFileUpload>
    </main>
  );
}
