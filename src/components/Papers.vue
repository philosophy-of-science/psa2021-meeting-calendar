<template>
  <div v-if="papers">
    <p class="mb-1 font-weight-bold">
      <v-icon dense left>mdi-microphone</v-icon>Speakers
    </p>
    <ol>
      <li v-for="(paper, i) in papers" :key="i">
        <p class="mb-0">
          <em>{{ paper.title }}</em>
        </p>
        <p>{{ paper.author }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    papers: Array,
  },
};
</script>

<style scoped>
</style>