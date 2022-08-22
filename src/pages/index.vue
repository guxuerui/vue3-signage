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
    todoList: [],
    doingList: [],
    doneList: [],
  })
  taskList.value.length === 1 && selectTask(taskList.value[0])
  cancel()
}

function cancel() {
  openModal.value = false
  isDuplicatedName.value = false
}

const selectTaskId = ref<number>(0)
const todoList = ref<Todo[]>([])
const doingList = ref<Todo[]>([])
const doneList = ref<Todo[]>([])
const currentIndex = useArrayFindIndex(taskList, task => task.id === selectTaskId.value)
function selectTask(task: TaskList) {
  selectTaskId.value = task.id
  todoList.value = task.todoList
  doingList.value = task.doingList
  doneList.value = task.doneList
}

function removeTask() {
  taskList.value.splice(currentIndex.value, 1)
  taskList.value.length >= 1 && selectTask(taskList.value[0])
  if (taskList.value.length === 0) {
    todoList.value = []
    doingList.value = []
    doneList.value = []
  }
}

const openTaskModal = ref<boolean>(false)
const taskType = ref<string>('todo')
function addTask(type: string) {
  taskType.value = type
  openTaskModal.value = true
}

const currTaskForm = ref<any>(null)
const currentTaskIndex = ref(0)
function createCurrenntTask(form: Todo) {
  if (currTaskForm.value) { updateTask(taskType.value, form) }
  else {
    switch (taskType.value) {
      case 'todo':
        todoList.value.push({
          id: todoList.value.length + 1,
          title: form.title,
          content: form.content,
          progressing: false,
          completed: false,
        })
        break
      case 'doing':
        doingList.value.push({
          id: doingList.value.length + 1,
          title: form.title,
          content: form.content,
          progressing: true,
          completed: false,
        })
        break
      case 'done':
        doneList.value.push({
          id: doneList.value.length + 1,
          title: form.title,
          content: form.content,
          progressing: false,
          completed: true,
        })
        break
      default:
        break
    }
  }
  closeTaskModal()
}

function editTask(index: number, type: string, list: Todo) {
  addTask(type)
  currentTaskIndex.value = index
  currTaskForm.value = list
}

function updateTask(type: string, form: Todo) {
  switch (type) {
    case 'todo':
      todoList.value[currentTaskIndex.value] = Object.assign(
        todoList.value[currentTaskIndex.value],
        form,
      )
      break
    case 'doing':
      doingList.value[currentTaskIndex.value] = Object.assign(
        doingList.value[currentTaskIndex.value],
        form,
      )
      break
    case 'done':
      doneList.value[currentTaskIndex.value] = Object.assign(
        doneList.value[currentTaskIndex.value],
        form,
      )
      break
    default:
      break
  }
}

function closeTaskModal() {
  openTaskModal.value = false
  currTaskForm.value = null
}

let spliceTask = $ref<Todo[]>([])
function startTask(index: number) {
  spliceTask = todoList.value.splice(index, 1)
  spliceTask[0].progressing = true
  doingList.value.push(spliceTask[0])
}

function completeTask(index: number, type: string) {
  switch (type) {
    case 'todo':
      spliceTask = todoList.value.splice(index, 1)
      spliceTask[0].progressing = false
      spliceTask[0].completed = true
      doneList.value.push(spliceTask[0])
      break
    case 'doing':
      spliceTask = doingList.value.splice(index, 1)
      spliceTask[0].progressing = false
      spliceTask[0].completed = true
      doneList.value.push(spliceTask[0])
      break
    default:
      break
  }
}

function delTask(index: number, type: string) {
  switch (type) {
    case 'todo':
      todoList.value.splice(index, 1)
      break
    case 'doing':
      doingList.value.splice(index, 1)
      break
    case 'done':
      doneList.value.splice(index, 1)
      break
    default:
      break
  }
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
          v-if="taskList.length"
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
        <TasksList
          title="To Do"
          type="todo"
          :task-list="todoList"
          @add="addTask($event)"
          @start="startTask"
          @complete="completeTask"
          @del="delTask"
          @edit="editTask"
        />
        <TasksList
          title="In Progress"
          type="doing"
          :task-list="doingList"
          @add="addTask($event)"
          @complete="completeTask"
          @del="delTask"
          @edit="editTask"
        />
        <TasksList
          title="Completed"
          type="done"
          :task-list="doneList"
          @add="addTask($event)"
          @del="delTask"
          @edit="editTask"
        />
      </div>
      <div v-else bg-blue w-27 mt-4 p="x-2 y-1" rounded-5 text-white>
        No tasks yet
      </div>
    </div>
  </div>
  <CreateModal
    :open="openModal"
    :is-duplicated-name="isDuplicatedName"
    @create="createTask"
    @close="cancel"
  />
  <CreateTask
    :open="openTaskModal"
    :task-form="currTaskForm"
    @confirm="createCurrenntTask($event)"
    @close="closeTaskModal"
  />
</template>
