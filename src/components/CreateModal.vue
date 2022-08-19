<script setup lang="ts">
interface Props {
  open: boolean
}
const props = withDefaults(defineProps<Props>(), {
  open: false,
})

const emit = defineEmits<{
  (e: 'create', inputValue: string): void
  (e: 'close'): void
}>()

const vFocus = {
  mounted: (el: any) => el.focus(),
}

const inputValue = ref<string>('')
const modalRef = ref<HTMLElement | null>(null)

const create = () => {
  emit('create', inputValue.value)
}

function close() {
  emit('close')
}

watch(() => props.open, (val) => {
  if (!val)
    inputValue.value = ''
})

onClickOutside(
  modalRef,
  () => close(),
)
</script>

<template>
  <Teleport to="body">
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
          v-model="inputValue"
          v-focus
          placeholder="What's the task name?"
          type="text"
          autocomplete="false"
          p="x-4 y-2"
          w="250px"
          text="center"
          bg="transparent"
          border="~ rounded gray-400 dark:gray-700"
          outline="none active:none"
          @keydown.enter="create"
        >

        <div text-center pt-4>
          <button class="m-3 text-sm btn" @click="close">
            Cancel
          </button>
          <button class="m-3 text-sm btn" @click="create">
            Create
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
