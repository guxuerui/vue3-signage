<script setup lang="ts">
import type { TaskList } from '~/types'
// setup websit title
const siteData = reactive({
  title: 'My Signage',
  description: 'My beautiful signage',
})

useHead({
  // Can be static or computed
  title: computed(() => siteData.title),
  meta: [
    {
      name: 'description',
      content: computed(() => siteData.description),
    },
  ],
})

const taskList = ref<TaskList[]>([
  {
    id: 1,
    name: 'Task 1',
    progressing: false,
    completed: false,
  },
  {
    id: 2,
    name: 'Task 2',
    progressing: false,
    completed: false,
  },
  {
    id: 3,
    name: 'Task 3',
    progressing: false,
    completed: false,
  },
])
const openModal = ref<boolean>(false)

function createTask() {
  taskList.value.push({
    id: taskList.value.length + 1,
    name: 'New Task',
    progressing: false,
    completed: false,
  })
}

function cancel() {
  openModal.value = false
}
</script>

<template>
  <div flex="~">
    <div w-80 min-h-screen pb-10 text-center border="r-1 gray-400/40">
      <Footer />
      <div text-4xl>
        SIGNAGE
      </div>
      <div
        btn w-50 py-3 mt-4 transition rounded-2
        class="bg-#e86/70 hover:bg-#e86/90"
        @click="openModal = true"
      >
        <div i-carbon-add mx-auto />
      </div>
      <div
        v-for="item in taskList"
        :key="item.id"
        btn w-50 py-3 mt-4 transition rounded-2
        class="bg-#e86a3d/80 hover:bg-#e86a3d"
      >
        {{ item.name }}
      </div>
    </div>
    <div w-full pa-10>
      <div flex="~">
        <div text-4xl pt-1>
          ALL TASKS
        </div>
        <button
          btn rounded-2 transition ml-4 py-2
          bg="transparent"
          hover:bg="#e86a3d"
          border="1 #e86a3d"
          text="#e86a3d"
          hover:text="#fff"
        >
          REMOVE TASK
        </button>
      </div>
      <CreateModal :open="openModal" @create="createTask" @cancel="cancel" />
    </div>
  </div>
</template>
