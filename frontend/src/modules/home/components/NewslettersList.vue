<script setup lang="ts">
import DataView from 'primevue/dataview'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useNewslettersStore } from '../stores/newslettersStore'

const emit = defineEmits(['show-attachments'])

const newsletterStore = useNewslettersStore()
const { loading, saving, sending, deleting, selectedNewsletter, newsletters } =
  storeToRefs(newsletterStore)

function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  newsletterStore.getAll()
})
</script>
<template>
  <DataView :value="newsletters" paginator :rows="5">
    <template #empty>
      <div class="p-text-center">
        <p class="p-3 italic">Add newsletters to see them here</p>
      </div>
    </template>
    <template #header>
      <form
        @submit.prevent="newsletterStore.add()"
        class="flex flex-col md:flex-row md:items-center justify-end gap-4"
      >
        <div class="flex items-center gap-2">
          <label class="text-lg font-semibold" for="title">Title</label>
          <InputText
            class="w-full"
            id="title"
            v-model.trim="selectedNewsletter.title"
            placeholder="Ex. Sales newsletter"
          />
        </div>
        <Button
          label="Add newsletter"
          icon="pi pi-plus"
          size="small"
          type="submit"
          :loading="saving"
          :disabled="loading || !selectedNewsletter.title"
        />
      </form>
    </template>
    <template #list="{ items }">
      <div class="flex flex-col">
        <div v-for="item in items" :key="item.id">
          <div class="m-3 p-3 bg-zinc-100 dark:bg-zinc-800 rounded">
            <div
              class="grid grid-cols-3 md:flex items-center justify-between gap-1 md:gap-10"
            >
              <div class="col-span-2 md:flex-grow flex flex-col">
                <span class="text-zinc-600 dark:text-zinc-400 text-xs">
                  Title
                </span>
                <h3 class="text-lg font-semibold">{{ item.title }}</h3>
              </div>
              <div class="flex flex-col">
                <span class="text-zinc-600 dark:text-zinc-400 text-xs">
                  Sended times
                </span>
                <span class="font-semibold text-right">
                  {{ item.sendedTimes }}
                </span>
              </div>
              <div class="col-span-2 flex flex-col">
                <span class="text-zinc-600 dark:text-zinc-400 text-xs">
                  Last updated
                </span>
                <span class="font-semibold">
                  {{
                    item.updatedAt
                      ? formatDate(item.updatedAt)
                      : formatDate(item.createdAt)
                  }}
                </span>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <Button
                  icon="pi pi-image"
                  severity="info"
                  text
                  @click="emit('show-attachments', item.id)"
                  :disabled="sending || deleting"
                  v-tooltip.top="'Attached files'"
                />
                <Button
                  icon="pi pi-envelope"
                  severity="success"
                  text
                  :disabled="deleting"
                  :loading="sending"
                  @click="newsletterStore.send(item.id)"
                  v-tooltip.top="'Send newsletter'"
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  :disabled="sending"
                  :loading="deleting"
                  @click="newsletterStore.del(item.id)"
                  v-tooltip.left="'Delete newsletter'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
