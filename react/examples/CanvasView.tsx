"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
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
        <div className="m-5">
          <div className="flex items-center justify-center">
            {!previewFileData || !previewFileData.previewUrl ? (
              <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-10">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
              </label>
            ) : (
              <div className="flex items-center justify-center">
                {previewFileData.previewType != "video" ? (
                  <Image
                    className="object-contain rounded-2xl w-72 h-56"
                    src={previewFileData.previewUrl as string}
                    height={224}
                    width={300}
                    alt="image"
                  />
                ) : (
                  <video
                    autoPlay
                    loop
                    className="h-64 w-72 object-contain rounded-2xl"
                  >
                    <source
                      src={previewFileData.previewUrl as string}
                      type="video/mp4"
                    />
                  </video>
                )}
              </div>
            )}
          </div>
          <p className="break-words text-center dark:text-white">
            {previewFileData ? previewFileData.previewName : ""}
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
          <div className="m-5">
            <div className="flex items-center justify-center">
              {!file.previewUrl ? (
                <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-10">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF
                    </p>
                  </div>
                </label>
              ) : (
                <div className="flex items-center justify-center">
                  {file.previewType != "video" ? (
                    <Image
                      className="object-contain rounded-2xl w-72 h-56"
                      src={file.previewUrl as string}
                      height={224}
                      width={300}
                      alt="image"
                    />
                  ) : (
                    <video
                      autoPlay
                      loop
                      className="h-64 w-72 object-contain rounded-2xl"
                    >
                      <source
                        src={file.previewUrl as string}
                        type="video/mp4"
                      />
                    </video>
                  )}
                </div>
              )}
            </div>
            <p className="break-words text-center dark:text-white">
              {file ? file.previewName : ""}
            </p>
          </div>
        )}
      </MultipleFileUpload>
    </main>
  );
}
