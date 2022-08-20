export interface Todo {
  id: number
  title: string
  content: string
}

export interface TaskList {
  id: number
  name: string
  progressing: boolean
  completed: boolean
  todoList: Todo[]
  doingList: Todo[]
  doneList: Todo[]
}
