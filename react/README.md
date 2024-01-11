# React File Management with Preview - Fully Customized

React file management system built with React, Next.js and TypeScript that allows for single and multiple file uploading with a preview feature. It allows you to select files and preview them, returning an array of selected files. It allows customizing design by overriding the style classes.

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Properties and Events](#properties-and-events)
- [Usage](#usage)

---

## Getting Started

Follow below instructions to configure this package into your project.

### Prerequisites

Before you begin, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) - v20.x
- React

### Installation

Using npm:

```
npm install @canopassoftware/react-file-upload
```

Using yarn:

```
yarn add @canopassoftware/react-file-upload
```

Note: we have already configure this in demo project. so, refer it for more information.

---

## Properties and Events

### props

- **callback="handleFileUploading"**

  - `required`
  - **Description:** Add your upload callback function while receive the selected file/files

- **uploadedFile="setPreviewFileData"** - For single file component

  - `required`
  - Uploaded file object with below format,
    ```
    {
      fileType: string,
      fileUrl: string,
      fileName: string
    }
    ```

- **uploadedFiles="setPreviewFilesData"** - For multiple file component

  - `required`
  - Uploaded files array with below format,
    ```
    [
      {
        fileType: string,
        fileUrl: string,
        fileName: string
      }
    ]
    ```

- **uploadBtnText="'Upload'"**

  - **default** : Upload
  - Text for save or upload file button

- **progressBtnText="'Uploading...'"**

  - **default** : Uploading...
  - Text for the progress bar, showing file uploading under the process

- **removeBtnText="'Uploading...'"**

  - **default** : x
  - Text for remove file button

- **accept="'image/jpg, image/jpeg, image/png, video/mp4, audio/mp3, application/zip'"**

  - Validation for file type. By default it will select all the type of file.

- **(filetype)Preview="'(file location)'"**
  - **default** : Default file icons as per file types
  - Set path for your customized icon if needed

---

## Usage

To manage and preview files with this library, follow these steps:

### Import the library into your file

```js
// using CommonJS
const {
  SingleFileUpload,
  MultipleFileUpload,
} = require("@canopassoftware/react-file-upload");

OR;

// using esModules
import {
  SingleFileUpload,
  MultipleFileUpload,
} from "@canopassoftware/react-file-upload";
```

### Use default CSS

- Use `style.css` for UI by importing like,

```js
import "@canopassoftware/react-file-upload/style.css";
```

### Creating custom UI with file preview

- You can customize file uploading UI in inner part of component.
- The `file` containing `file` object with following keys, we will use this object to show preview.

  ```js
  file = file: {
    previewType: 'video', // type of the preview. like, file is image or video
    previewUrl: 'data:image/jpeg;base64,/9j/D1AAAACRsdW1pAAAD...', // URL of the file preview
    previewName: 'a152148640581.62d918f12a0b4.mp4', // preview file name
    isDragging: false // you will get it `true` when you dragging the file on design
  }
  ```

### Single File Upload Management

```js
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { SingleFileUpload } from '@canopassoftware/react-file-upload';

export default function App() {
  const [previewFileData, setPreviewFileData] = useState(
    {} as {
      previewType: string;
      previewUrl: string | ArrayBuffer | null;
      previewName: string;
      isDragging: boolean;
    }
  );

  // callback function
  const handleFileUploading = async (file: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPreviewFileData({
      previewType: "image",
      previewUrl: "https://picsum.photos/300/224",
      previewName: file.name,
      isDragging: false,
    });
  };
```

```html
  return (
    <main className="min-h-screen flex flex-col justify-between p-5">
      <SingleFileUpload
        uploadedFile={setPreviewFileData}
        callback={handleFileUploading}
        uploadBtnText={"Save"}
        progressBtnText={"Saving..."}
      >
      <!-- write a code to manage file design or use code from examples -->
      </SingleFileUpload>
    </main>
  );
}
```

### Multiple File Upload Management

```js
"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";
import MultipleFileUpload from "@canopassoftware/react-file-upload";

export default function App() {
  const uploadedFiles = [] as Array<{
    fileType: string;
    fileUrl: string | StaticImageData;
    fileName: string;
  }>;

  // callback function
  const handleFilesUploading = async (files: any) => {
    const uploadedFiles = [];

    for (var i = 0; i < files.length; i++) {
      uploadedFiles.push({
        fileType: "image",
        fileUrl: images[i],
        fileName: files[i].name,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    return uploadedFiles;
  };
```

```html
return (
    <main className="min-h-screen flex flex-col justify-between p-5 dark:bg-black">
      <MultipleFileUpload
        accept=""
        uploadedFiles={uploadedFiles}
        callback={handleFilesUploading}
        removeBtnText={"remove"}
        uploadBtnText={"Save"}
        progressBtnText={"Saving..."}
      >
        {(file: any) => (
          <!-- write a code to manage file design or use code from examples -->
        )}
      </MultipleFileUpload>
    </main>
  );
}
```
