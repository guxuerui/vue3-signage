<script setup lang="ts">
import type { TaskList, Todo } from '~/types'
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

const taskList = ref<TaskList[]>([])
const openModal = ref<boolean>(false)
const isDuplicatedName = ref<boolean>(false)
useStorage('signage-tasklist', taskList)

function createTask(name: string) {
  if (!name)
    return

  // Is there duplicate data
  const haveDuplicate = useArraySome(taskList, task => task.name === name)
  isDuplicatedName.value = haveDuplicate.value
  !haveDuplicate.value && taskList.value.push({
    id: taskList.value.length + 1,
    name,
    progressing: false,
    completed: false,
    todoList: [],
    doingList: [],
    doneList: [],
  })
  taskList.value.length === 1 && selectTask(taskList.value[0])
}

function cancel() {
  openModal.value = false
  isDuplicatedName.value = false
}

const selectTaskId = ref<number>(0)
const todoList = ref<Todo[]>([])
const doingList = ref<Todo[]>([])
const doneList = ref<Todo[]>([])
function selectTask(task: TaskList) {
  selectTaskId.value = task.id
  todoList.value = task.todoList
  doingList.value = task.doingList
  doneList.value = task.doneList
}

function removeTask() {
  taskList.value.splice(selectTaskId.value - 1, 1)
  taskList.value.length >= 1 && selectTask(taskList.value[0])
  if (taskList.value.length === 0) {
    todoList.value = []
    doingList.value = []
    doneList.value = []
  }
}

function createCurrenntTask(type: string) {
  console.log(type)
}

onMounted(() => {
  if (taskList.value.length)
    selectTask(taskList.value[0])
})
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
        class="bg-gray/70 hover:bg-gray"
        @click="openModal = true"
      >
        <div i-carbon-add mx-auto />
      </div>
      <div
        v-for="item in taskList"
        :key="item.id"
        btn w-50 py-3 mt-4 transition rounded-2
        text-xl text="hover:white dark:white"
        class="hover:bg-#e86a3d/50"
        :class="{
          'bg-#e86a3d': selectTaskId === item.id,
          'text-white': selectTaskId === item.id,
          'text-black': selectTaskId !== item.id,
          'bg-transparent': selectTaskId !== item.id,
        }"
        @click="selectTask(item)"
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
          @click="removeTask"
        >
          REMOVE TASK
        </button>
      </div>
      <div v-if="taskList.length" pa-8 grid grid-cols-3>
        <div pa-4 mr-4 bg="gray-400/10" rounded-2 text-center>
          <h2 text-2xl text-left>
            To Do
          </h2>
          <div
            btn transition rounded-2
            text-3xl mt-4
            class="bg-#e86/70 hover:bg-#e86/90 w-70%"
            @click="createCurrenntTask('todo')"
          >
            <div i-carbon-add mx-auto />
          </div>
          <div
            v-for="list in todoList"
            :key="list.id"
            mx-auto pa-4 my-4
            rounded-3 border="1 gray-400/40"
            class="w-70%"
          >
            <div flex="~" text-xl>
              <div text-orange i-carbon-dot-mark />
              <span>{{ list.title }}</span>
            </div>
            <p text-left text-gray pa-2>
              {{ list.content }}
            </p>
          </div>
        </div>
        <div pa-4 mr-4 bg="gray-400/10" rounded-2 text-center>
          <h2 text-2xl text-left>
            In Progress
          </h2>
          <div
            btn transition rounded-2
            text-3xl mt-4
            class="bg-#e86/70 hover:bg-#e86/90 w-70%"
            @click="openModal = true"
          >
            <div i-carbon-add mx-auto />
          </div>
          <div
            v-for="list in doingList"
            :key="list.id"
            mx-auto pa-4 my-4
            rounded-3 border="1 gray-400/40"
            class="w-70%"
          >
            <div flex="~" text-xl>
              <div text-orange i-carbon-dot-mark />
              <span>Title</span>
            </div>
            <p text-left text-gray pa-2>
              Content
            </p>
          </div>
        </div>
        <div pa-4 mr-4 bg="gray-400/10" rounded-2 text-center>
          <h2 text-2xl text-left>
            Completed
          </h2>
          <div
            btn transition rounded-2
            text-3xl mt-4
            class="bg-#e86/70 hover:bg-#e86/90 w-70%"
            @click="openModal = true"
          >
            <div i-carbon-add mx-auto />
          </div>
          <div
            v-for="list in doneList"
            :key="list.id"
            mx-auto pa-4 my-4
            rounded-3 border="1 gray-400/40"
            class="w-70%"
          >
            <div flex="~" text-xl>
              <div text-orange i-carbon-dot-mark />
              <span>Title</span>
            </div>
            <p text-left text-gray pa-2>
              Content
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CreateModal
    :open="openModal"
    :is-duplicated-name="isDuplicatedName"
    @create="createTask"
    @close="cancel"
  />
</template>
