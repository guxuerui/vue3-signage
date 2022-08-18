<script setup lang="ts">
interface Props {
  open: boolean
}
withDefaults(defineProps<Props>(), {
  open: false,
})

const emit = defineEmits<{
  (e: 'create', inputValue: string): void
  (e: 'cancel'): void
}>()

const inputValue = $ref<string>('')
const create = () => {
  emit('create', inputValue)
}

function cancel() {
  emit('cancel')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      mx-auto px-6 pt-6 pb-4
      bg="black/50 dark:gray-800/50"
      position-absolute
      top-0 left-0 right-0 bottom-0
      @keydown.esc="cancel"
    >
      <div
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
          <button class="m-3 text-sm btn" @click="cancel">
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
