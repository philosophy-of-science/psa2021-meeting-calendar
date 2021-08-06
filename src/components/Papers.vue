<template>
  <div v-if="papers">
    <p class="mb-1 font-weight-bold">
      <v-icon dense left>mdi-microphone</v-icon>Speakers
    </p>
    <ol>
      <li v-for="(paper, i) in papers" :key="i">
        <p
          class="mb-0"
          :class="{
            match: compare === paper.title,
          }"
        >
          <v-icon class="blue--text" v-if="compare === paper.title" dense
            >mdi-menu-right</v-icon
          >
          <em>{{ paper.title }}</em>
        </p>
        <p
          :class="{
            match: compare === paper.author,
          }"
        >
          <v-icon class="blue--text" v-if="compare === paper.author" dense
            >mdi-menu-right</v-icon
          >{{ paper.author }}
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    papers: Array,
    compare: String,
  },
};
</script>

<style scoped>
.match {
  font-weight: 700;
}
</style>