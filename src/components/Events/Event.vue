<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
        >
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ event.title }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-event-details-dialog :event="event">
              </app-edit-event-details-dialog>
            </template>
          </v-card-title>
          <v-img :src="event.imageUrl" height="400px"></v-img>
          <v-card-text>
            <div class="info--text">
              {{ event.date | date }} - {{ event.location }}
              <template v-if="userIsCreator">
                <app-edit-event-date-dialog :event="event">
                </app-edit-event-date-dialog>
                <app-edit-event-time-dialog :event="event">
                </app-edit-event-time-dialog>
              </template>
            </div>
            <div>{{ event.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Purchase Tickets</v-btn>
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
    },
    loading() {
      return this.$store.getters["events/loading"];
    },
    userIsAuthenticated() {
      return (
        this.$store.getters["user/user"] !== null &&
        this.$store.getters["user/user"] !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters["user/user"].id === this.event.creatorId;
    }
  }
};
</script>
