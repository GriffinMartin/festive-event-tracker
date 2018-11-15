<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">{{ event.title }}</h1>
        <p class="subheading font-weight-regular">Date: {{ event.date }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    event() {
      return this.$store.getters.loadedEvent(this.id);
    }
  }
};
</script>

<style></style>
