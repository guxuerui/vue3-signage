<script setup lang="ts">
import type { Todo } from '~/types'

interface Props {
  open: boolean
  taskForm?: Todo
}
const props = withDefaults(defineProps<Props>(), {
  open: false,
  taskFrom: () => null,
})

const emit = defineEmits<{
  (e: 'confirm', inputForm: Todo): void
  (e: 'close'): void
}>()

const vFocus = {
  mounted: (el: any) => el.focus(),
}

const inputForm = ref<Todo>({
  title: '',
  content: '',
})
const modalRef = ref<HTMLElement | null>(null)

const confirm = () => {
  emit('confirm', inputForm.value)
}

function close() {
  emit('close')
}

watch([() => props.open, () => props.taskForm], ([newOpen, newForm]) => {
  if (!newOpen) {
    inputForm.value = {
      title: '',
      content: '',
    }
  }
  if (newForm) {
    const { title, content } = newForm
    inputForm.value = { title, content }
  }
})

onClickOutside(
  modalRef,
  () => close(),
)
</script>

<template>
  <Teleport to="#app">
    <div
      v-if="open"
      mx-auto px-6 pt-6 pb-4
      bg="black/50 dark:gray-800/50"
      position-absolute top-0 left-0 right-0
      bottom-0
    >
      <div
        ref="modalRef"
        position-absolute
        border="1 gray-400 dark:gray-800"
        bg="gray-200 dark:gray-800"
        px-8 pt-8 pb-4
        class="top-50% left-50%"
        style="transform: translate(-50%, -50%);"
      >
        <input
          id="input"
          v-model="inputForm.title"
          v-focus
          display-block
          placeholder="What's the task title?"
          type="text"
          autocomplete="false"
          p="x-4 y-2"
          w="250px"
          text="center"
          bg="transparent"
          border="~ rounded gray-400 dark:gray-700"
          outline="none active:none"
        >
        <input
          id="input"
          v-model="inputForm.content"
          display-block
          placeholder="What's the task content?"
          type="text"
          autocomplete="false"
          p="x-4 y-2" mt-4
          w="250px"
          text="center"
          bg="transparent"
          border="~ rounded gray-400 dark:gray-700"
          outline="none active:none"
          @keydown.enter="confirm"
        >

        <div text-center pt-4>
          <button class="m-3 text-sm btn" @click="close">
            Cancel
          </button>
          <button class="m-3 text-sm btn" @click="confirm">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
