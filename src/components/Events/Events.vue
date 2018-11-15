<template>
  <div>
    <v-container v-for="event in events" :key="event.id">
      <v-layout text-xs-center wrap>
        <v-flex mb-4>
          <h1 class="display-2 font-weight-bold mb-3">{{ event.title }}</h1>
          <p class="subheading font-weight-regular">
            Date: {{ event.date }}, Location: {{ event.location }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// import Event from "./Event";

export default {
  // components: {
  //   Event
  // },
  computed: {
    events() {
      return this.$store.getters.loadedEvents;
    }
  },
  data: () => ({})
};
</script>

<style></style>
