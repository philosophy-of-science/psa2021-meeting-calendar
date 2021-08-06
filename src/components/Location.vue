<template>
  <div class="mt-3">
    <p v-if="location">
      <v-icon dense left>mdi-floor-plan</v-icon>
      {{ location }}
    </p>
    <p v-else class="red--text">Location needed!</p>
  </div>
</template>

<script>
export default {
  props: {
    location: String,
  },
};
</script>

<style scoped>
</style>