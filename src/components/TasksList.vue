<script setup lang="ts">
import draggable from 'vuedraggable'
import type { Todo } from '~/types'

interface Props {
  title: string
  taskList: Todo[]
  type: string
}
withDefaults(defineProps<Props>(), {
  title: '',
  taskList: () => [],
  type: '',
})

const emit = defineEmits<{
  (e: 'add', type: string): void
  (e: 'start', index: number): void
  (e: 'complete', index: number, type: string): void
  (e: 'del', index: number, type: string): void
  (e: 'edit', index: number, type: string, list: Todo): void
}>()

function getIndicatorClass(list: Todo) {
  if (list.progressing)
    return 'text-orange'
  if (list.completed)
    return 'text-green'
  return 'text-gray'
}
</script>

<template>
  <div pa-4 mr-4 bg="gray-400/10" rounded-2 text-center>
    <h2 text-2xl text-left>
      {{ title }}
    </h2>
    <div
      btn transition rounded-2
      text-3xl mt-4
      class="bg-#41a8ee/70 hover:bg-#41a8ee/90 w-70%"
      @click="emit('add', type)"
    >
      <div i-carbon-add mx-auto />
    </div>
    <draggable
      :list="taskList"
      group="task"
      item-key="id"
    >
      <template #item="{ element, index }">
        <div
          mx-auto pa-4 my-4
          rounded-3 border="1 gray-400/40"
          class="w-70%"
          @dblclick="emit('edit', index, type, element)"
        >
          <div flex="~" text-xl>
            <div :class="getIndicatorClass(element)" i-carbon-dot-mark />
            <span>{{ element.title }}</span>
          </div>
          <p text-left text-gray pa-2>
            {{ element.content }}
          </p>
          <div flex="~" cursor-pointer mt-2>
            <div
              v-if="!element.progressing && !element.completed"
              i-carbon-play-filled
              transition
              hover:text-blue
              @click="emit('start', index)"
            />
            <div
              v-if="element.progressing || !element.completed"
              i-carbon-checkmark-filled
              mx-2
              transition
              hover:text-green
              @click="emit('complete', index, type)"
            />
            <div
              i-mdi-delete-forever
              transition
              hover:text-red
              @click="emit('del', index, type)"
            />
          </div>
        </div>
      </template>
      <draggable />
    </draggable>
  </div>
</template>

