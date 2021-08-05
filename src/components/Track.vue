<template>
  <div v-if="track">
    <p><v-icon dense left>mdi-pound-box</v-icon> {{ track }}</p>
  </div>
</template>

<script>
export default {
  props: {
    track: String,
  },
};
</script>

<style scoped>
</style>