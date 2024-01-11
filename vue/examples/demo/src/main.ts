import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@canopassoftware/vue-file-upload/style.css"
import { SingleFileUpload, MultipleFileUpload } from '@canopassoftware/vue-file-upload'

const app = createApp(App)

app.component('SingleFileUpload', SingleFileUpload)
app.component('MultipleFileUpload', MultipleFileUpload)

app.use(router)

app.mount('#app')
