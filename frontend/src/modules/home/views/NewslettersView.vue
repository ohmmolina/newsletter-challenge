<script setup lang="ts">
import NewslettersList from '../components/NewslettersList.vue'
import AttachmentDialog from '../components/AttachmentDialog.vue'
import { ref } from 'vue'
import { useNewslettersStore } from '../stores/newslettersStore'

const newsletterStore = useNewslettersStore()

const showingAttachmentsDialog = ref(false)
function showAttachmentsDialog(id: string) {
  newsletterStore.select(id)
  showingAttachmentsDialog.value = true
}
</script>
<template>
  <main class="p-4">
    <AttachmentDialog v-model="showingAttachmentsDialog" />
    <h1 class="my-4">Newsletters</h1>
    <section>
      <NewslettersList @show-attachments="showAttachmentsDialog" />
    </section>
  </main>
</template>
