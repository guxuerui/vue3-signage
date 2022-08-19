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

function createTask(name: string) {
  if (!name)
    return
  taskList.value.push({
    id: taskList.value.length + 1,
    name,
    progressing: false,
    completed: false,
  })
  cancel()
}

function cancel() {
  openModal.value = false
}
</script>

<template>
  <div flex="~">
    <div w-80 min-h-screen pb-10 text-center border="r-1 gray-400/40">
      <Footer />
      <div text-4xl my-5>
        SIGNAGE
      </div>
      <div
        btn w-50 py-1 transition rounded-2
        text-3xl
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
      <div pa-8 grid grid-cols-3>
        <div pa-4 mr-4 bg="gray-400/10" rounded-2 text-center>
          <h2 text-2xl text-left>
            To Do
          </h2>
          <div
            btn w-60 transition rounded-2
            text-3xl mt-4
            class="bg-#e86/70 hover:bg-#e86/90"
            @click="openModal = true"
          >
            <div i-carbon-add mx-auto />
          </div>
        </div>
        <div pa-4 mr-4 bg="gray-400/10" rounded-2 text-center>
          <h2 text-2xl text-left>
            In Progress
          </h2>
          <div
            btn w-60 transition rounded-2
            text-3xl mt-4
            class="bg-#e86/70 hover:bg-#e86/90"
            @click="openModal = true"
          >
            <div i-carbon-add mx-auto />
          </div>
        </div>
        <div pa-4 mr-4 bg="gray-400/10" rounded-2 text-center>
          <h2 text-2xl text-left>
            Completed
          </h2>
          <div
            btn w-60 transition rounded-2
            text-3xl mt-4
            class="bg-#e86/70 hover:bg-#e86/90"
            @click="openModal = true"
          >
            <div i-carbon-add mx-auto />
          </div>
        </div>
      </div>
    </div>
  </div>
  <CreateModal
    :open="openModal"
    @create="createTask"
    @close="cancel"
  />
</template>
