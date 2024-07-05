<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { API_URL } from '@/utils/api'
import { useNewslettersStore } from '../stores/newslettersStore'

const showing = defineModel<boolean>()

const newsletterStore = useNewslettersStore()
const { saving, selectedNewsletter } = storeToRefs(newsletterStore)

const fileUploadEl = ref<FileUpload | null>(null)
const file = ref({
  url: '',
  type: ''
})

async function loadFile() {
  if (
    !selectedNewsletter.value.id ||
    selectedNewsletter.value.files.length < 1 ||
    !fileUploadEl.value
  ) {
    setTimeout(loadFile, 1000)
    return
  }
  file.value = await newsletterStore.getFile(
    selectedNewsletter.value.id,
    selectedNewsletter.value.files[selectedNewsletter.value.files.length - 1].id
  )
}
async function showUploadedFile() {
  await newsletterStore.getAll()
  newsletterStore.select(selectedNewsletter.value.id)
  loadFile()
}
</script>
<template>
  <Dialog
    class="mx-5 md:mx-10 w-screen"
    v-model:visible="showing"
    :header="`Attachments for ${selectedNewsletter.title}`"
    modal
    :draggable="false"
    @show="loadFile"
  >
    <div
      class="w-full flex justify-center"
      v-if="file.url && file.type.includes('image')"
    >
      <div class="w-fit relative">
        <img class="w-full h-96" :src="file.url" alt="Uploaded attachment" />
        <button
          class="absolute top-2 right-2 p-1 bg-zinc-800/20 dark:bg-zinc-800/40 rounded-full text-xs hover:bg-zinc-800/40 dark:hover:bg-zinc-800/60"
          @click="file = { url: '', type: '' }"
          v-tooltip.top="'Remove attachment'"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>
    <div
      class="w-full relative"
      v-else-if="file.url && file.type.includes('pdf')"
    >
      <embed class="w-full h-96" :src="file.url" type="application/pdf" />
      <button
        class="absolute bottom-2 right-8 p-1 bg-zinc-800/20 dark:bg-zinc-800/40 rounded-full text-xs hover:bg-zinc-800/40 dark:hover:bg-zinc-800/60"
        @click="file = { url: '', type: '' }"
        v-tooltip.top="'Remove attachment'"
      >
        <i class="pi pi-times"></i>
      </button>
    </div>
    <FileUpload
      v-else
      ref="fileUploadEl"
      name="file"
      :url="`${API_URL}/newsletters/${selectedNewsletter.id}/file`"
      accept="image/*, application/pdf"
      :fileLimit="1"
      :maxFileSize="5000000"
      @upload="showUploadedFile"
    >
      <template #empty>
        <span>Drag and drop files to here to upload.</span>
      </template>
    </FileUpload>
  </Dialog>
</template>
