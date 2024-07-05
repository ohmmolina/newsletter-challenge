<script setup lang="ts">
import DataView from 'primevue/dataview'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '../stores/usersStore'

const usersStore = useUsersStore()
const { loading, saving, unsubscribing, deleting, selectedUser, users } =
  storeToRefs(usersStore)

function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  usersStore.getAll()
})
</script>
<template>
  <DataView :value="users" paginator :rows="5">
    <template #empty>
      <div class="p-text-center">
        <p class="p-3 italic">Add users to see them here</p>
      </div>
    </template>
    <template #header>
      <form
        @submit.prevent="usersStore.add()"
        class="flex flex-col md:flex-row md:items-center justify-end gap-4"
      >
        <div class="flex items-center gap-2">
          <label class="text-lg font-semibold" for="email">Email</label>
          <InputText
            class="w-full"
            id="email"
            v-model.trim="selectedUser.email"
            placeholder="Ex. example@email.com"
          />
        </div>
        <Button
          label="Add user"
          icon="pi pi-plus"
          size="small"
          type="submit"
          :loading="saving"
          :disabled="loading || !selectedUser.email"
        />
      </form>
    </template>
    <template #list="{ items }">
      <div class="flex flex-col">
        <div v-for="item in items" :key="item.id">
          <div class="m-3 p-3 bg-zinc-100 dark:bg-zinc-800 rounded">
            <div
              class="grid grid-cols-5 md:flex items-center justify-between gap-1 md:gap-10"
            >
              <div class="col-span-5 md:flex-grow flex flex-col gap-0.5">
                <span class="text-zinc-600 dark:text-zinc-400 text-xs">
                  Email
                </span>
                <h3 class="text-lg font-semibold">{{ item.email }}</h3>
              </div>
              <div class="col-span-2 w-fit flex flex-col gap-0.5">
                <span class="text-zinc-600 dark:text-zinc-400 text-xs">
                  Status
                </span>
                <Tag :severity="item.subscribed ? 'success' : 'warn'">
                  {{ item.subscribed ? 'Subscribed' : 'Unsubscribed' }}
                </Tag>
              </div>
              <div class="col-span-2 flex flex-col gap-0.5">
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
              <div class="grid grid-cols-2 gap-2">
                <Button
                  v-if="item.subscribed"
                  icon="pi pi-times-circle"
                  severity="warn"
                  text
                  :disabled="deleting"
                  :loading="unsubscribing"
                  @click="usersStore.unsubscribe(item.id)"
                  v-tooltip.top="'Unsubscribe user'"
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  :disabled="unsubscribing"
                  :loading="deleting"
                  @click="usersStore.del(item.id)"
                  v-tooltip.left="'Delete user'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
