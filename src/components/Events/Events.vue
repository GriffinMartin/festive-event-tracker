<template>
  <v-container>
    <v-layout v-if="loading">
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
    <v-layout
      row
      wrap
      v-for="event in events"
      v-if="!loading"
      :key="event.id"
      class="mb-2"
    >
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card>
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img :src="event.imageUrl" height="130px"></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5>{{ event.title }}</h5>
                    <div>{{ event.date | date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn
                    flat
                    :to="'/events/' + event.id"
                    class="light-blue accent-1"
                  >
                    <v-icon left light>arrow_forward</v-icon>
                    View event
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    events() {
      return this.$store.getters["events/loadedEvents"];
    },
    loading() {
      return this.$store.getters["events/loading"];
    }
  }
};
</script>

<style></style>
