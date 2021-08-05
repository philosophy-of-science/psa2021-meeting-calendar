<template>
  <div v-if="needsMod">
    <p class="mb-1 font-weight-bold">
      <v-icon dense left>mdi-account-clock</v-icon>Moderator
    </p>
    <p v-if="mod">{{ mod }}</p>
    <p class="red--text" v-else>Moderator needed!</p>
  </div>
</template>

<script>
export default {
  props: {
    mod: String,
    needsMod: Boolean,
  },
};
</script>

<style scoped>
</style>