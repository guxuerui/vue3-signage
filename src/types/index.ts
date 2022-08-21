export interface Todo {
  id?: number
  title: string
  content: string
  progressing?: boolean
  completed?: boolean
}

export interface TaskList {
  id: number
  name: string
  todoList: Todo[]
  doingList: Todo[]
  doneList: Todo[]
}
