# Vue File Management with Preview - Fully Customized

Vue file management system built with Vue.js and TypeScript that allows for single and multiple file uploading with a preview feature. It allows you to select files and preview them, returning an array of selected files. It allows customizing design by overriding the style classes.

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
- Vue3

### Installation

Using npm:

```
npm install @canopassoftware/vue-file-upload
```

Using yarn:

```
yarn add @canopassoftware/vue-file-upload
```

---

## Properties and Events

### props

- **:callback="handleFileUploading"**

  - `required`
  - **Description:** Add your upload callback function while receive the selected file/files

- **:uploadedFile="uploadedFile"** - For single file component

  - `required`
  - Uploaded file object with below format,
    ```
    {
      fileType: string,
      fileUrl: string,
      fileName: string
    }
    ```

- **:uploadedFiles="uploadedFiles"** - For multiple file component

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

- **:uploadBtnText="'Upload'"**

  - **default** : Upload
  - Text for save or upload file button

- **:progressBtnText="'Uploading...'"**

  - **default** : Uploading...
  - Text for the progress bar, showing file uploading under the process

- **:removeBtnText="'Uploading...'"**

  - **default** : x
  - Text for remove file button

- **:accept="'image/jpg, image/jpeg, image/png, video/mp4, audio/mp3, application/zip'"**

  - Validation for file type. By default it will select all the type of file.

- **:(filetype)Preview="'(file location)'"**
  - **default** : Default file icons as per file types
  - Set path for your customized icon if needed

---

## Usage

To manage and preview files with this library, follow these steps:

### Import the library into your file

```js
// using CommonJS
const { SingleFileUpload, MultipleFileUpload } = require('@canopassoftware/vue-file-upload');

OR
// using esModules
import { SingleFileUpload, MultipleFileUpload } from '@canopassoftware/vue-file-upload';
```

### Use default CSS

- Use `style.css` for UI by importing like,

```js
import '@canopassoftware/vue-file-upload/style.css';
```

### Creating custom UI with file preview

- You can customize file uploading UI in `template` block.
- The `file` slot containing `file` object with following keys, we will use this object to show preview.

  ```js
  file = file: {
    previewType: 'video', // type of the preview. like, file is image or video
    previewUrl: 'data:image/jpeg;base64,/9j/D1AAAACRsdW1pAAAD...', // URL of the file preview
    previewName: 'a152148640581.62d918f12a0b4.mp4', // preview file name
    isDragging: false // you will get it `true` when you dragging the file on design
  }
  ```

### Single File Upload Management

```html
<div class="flex flex-wrap">
  <SingleFileUpload
    :uploadBtnText="'Upload'"
    :progressBtnText="'Uploading...'"
    :isUploading="isUploading"
    :accept="'image/jpg, image/jpeg, image/png, video/mp4, audio/mp3, application/zip'"
    :pdfPreview="'../assets/images/pdf-icon.png'"
    :textPreview="'../assets/images/text-icon.png'"
    :audioPreview="'../assets/images/music-icon.png'"
    :apkPreview="'../assets/images/apk-icon.png'"
    :zipPreview="'../assets/images/zip-icon.png'"
    :sqlPreview="'../assets/images/sql-icon.png'"
    :filePreview="'../assets/images/file-icon.png'"
    :uploadedFile="uploadedFile"
    :callback="handleFileUploading"
  >
    <template v-slot="file">
      <!-- write a code to manage file design or use code from examples -->
    </template>
  </SingleFileUpload>
</div>
```

```js
<script lang="ts">
import { SingleFileUpload } from '@canopassoftware/vue-file-upload'

export default {
  components: {
    SingleFileUpload
  },
  data() {
    return {
      uploadedFile: {} as {
        fileType: string
        fileUrl: string
        fileName: string
      }
    }
  },
  methods: {
    async handleFileUploading(file: any) {
      // add your fileuploading logic to server and set data to the uploadedFile
      this.uploadedFile.fileType = 'image'
      this.uploadedFile.fileUrl = 'https://picsum.photos/300/224'
      this.uploadedFile.fileName = file.name

      await new Promise((resolve) => setTimeout(resolve, 2000))
    },
  }
}
</script>
```

### Multiple File Upload Management

```html
<div class="flex flex-wrap">
  <MultipleFileUpload
    :removeBtnText="'remove'"
    :uploadBtn="'Upload'"
    :progressBtnText="'Uploading...'"
    :accept="'image/jpg, image/jpeg, image/png, video/mp4, audio/mp3, application/zip'"
    :pdfPreview="'../assets/images/pdf-icon.png'"
    :textPreview="'../assets/images/text-icon.png'"
    :audioPreview="'../assets/images/music-icon.png'"
    :apkPreview="'../assets/images/apk-icon.png'"
    :zipPreview="'../assets/images/zip-icon.png'"
    :sqlPreview="'../assets/images/sql-icon.png'"
    :filePreview="'../assets/images/file-icon.png'"
    :uploadedFiles="uploadedFiles"
    :callback="handleFilesUploading"
  >
    <template v-slot="file">
      <!-- write a code to manage file design or use code from examples -->
    </template>
  </MultipleFileUpload>
</div>
```

```js
<script lang="ts">
import { MultipleFileUpload } from '@canopassoftware/vue-file-upload'

export default {
  components: {
    MultipleFileUpload
  },
  data() {
    return {
      uploadedFiles: [] as Array<{
        fileType: string
        fileUrl: string
        fileName: string
      }>
    }
  },
  methods: {
    async handleFilesUploading(files: any) {
      // add your fileuploading to server logic and set data to the uploadedFiles
      this.uploadedFiles = []
      for (var i = 0; i < files.length; i++) {
        this.uploadedFiles.push({
          fileType: 'image',
          fileUrl: 'https://picsum.photos/300/224',
          fileName: files[i].name
        })
      }

      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }
}
</script>
```
