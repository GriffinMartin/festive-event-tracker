<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ event.title }}</h6>
          </v-card-title>
          <v-img :src="event.imageUrl" height="400px"></v-img>
          <v-card-text>
            <div class="info--text">
              {{ event.date }} - {{ event.location }}
            </div>
            <div>{{ event.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    event() {
      return this.$store.getters["events/loadedEvent"](this.id);
    }
  }
};
</script>
