<script setup lang="ts">
import type { Todo } from '~/types'

interface Props {
  title: string
  taskList: Todo[]
}
withDefaults(defineProps<Props>(), {
  title: '',
  taskList: () => [],
})
</script>

<template>
  <div pa-4 mr-4 bg="gray-400/10" rounded-2 text-center>
    <h2 text-2xl text-left>
      {{ title }}
    </h2>
    <div
      btn transition rounded-2
      text-3xl mt-4
      class="bg-#e86/70 hover:bg-#e86/90 w-70%"
    >
      <div i-carbon-add mx-auto />
    </div>
    <div
      v-for="list in taskList"
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
</template>

