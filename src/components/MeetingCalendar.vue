<template>
  <div class="my-5">
    <v-row>
      <v-col>
        <v-sheet tile height="54" class="d-flex">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon class="ma-2" @click="value = '2021-11-11'">
            <v-icon>mdi-calendar-today</v-icon>
          </v-btn>
          <v-select
            v-model="type"
            :items="types"
            dense
            outlined
            hide-details
            class="ma-2"
            label="Calendar Type"
          ></v-select>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet>
          <v-calendar
            ref="calendar"
            v-model="value"
            start="2021-11-11"
            end="2021-11-14"
            :type="typeToLowerCase"
            :categories="categories"
            :events="events"
            :first-interval="8"
            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
            @click:event="showEvent"
            color="black"
          ></v-calendar>

          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <p v-if="selectedEvent.sessions" class="d-flex align-center">
                  <v-icon class="mr-1">mdi-projector-screen-outline</v-icon
                  >{{ padNum(selectedEvent.sessions) }}
                </p>
                <p v-if="selectedEvent.papers" class="d-flex align-center">
                  <v-icon class="mr-1">mdi-file-document-outline</v-icon>
                  {{ padNum(selectedEvent.papers) }}
                </p>
                <p v-if="selectedEvent.papersPerSession"></p>
                <span v-html="selectedEvent.details"
                  ><v-icon class="mr-1">mdi-file-document-outline</v-icon>
                  {{ padNum(selectedEvent.papersPerSession) }}</span
                >
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { calData } from "./calendarData";
export default {
  data() {
    return {
      value: "",
      type: "4day",
      types: ["Month", "Week", "Day", "4day"],
      categories: ["Breakout", "Special Event", "Services", "Break"],
      colors: ["blue", "indigo", "deep-purple", "brown", "green", "orange"],
      events: calData,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
    };
  },
  computed: {
    typeToLowerCase() {
      return this.type.toLowerCase();
    },
  },
  methods: {
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    padNum(num) {
      return num.toString().padStart(2, "0");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>