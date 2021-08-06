<template>
  <div>
    <p>
      <v-icon dense left>{{ icon }}</v-icon
      >{{ type }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    icon: String,
  },
};
</script>

<style scoped>
</style>