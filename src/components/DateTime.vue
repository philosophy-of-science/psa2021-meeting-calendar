<template>
  <div>
    <p>
      <v-icon dense left>{{ icon }}</v-icon>
      {{ dateTime }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    dateTime: String,
    icon: String,
  },
};
</script>

<style scoped>
</style>