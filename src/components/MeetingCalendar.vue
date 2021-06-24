<template>
  <div class="my-5">
    <v-row>
      <v-spacer />
      <v-col>
        <v-chip-group>
          <v-chip color="indigo" outlined>
            <v-icon class="mr-2">mdi-account</v-icon>
            Contributed Papers {{ countPapers.contributed }}</v-chip
          >
          <v-chip color="indigo" outlined>
            <v-icon class="mr-2">mdi-account-multiple</v-icon>
            Symposium Papers
            {{ countPapers.symposiumPapers }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-spacer />
    </v-row>

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
        <v-sheet height="900">
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
            max-width="350"
            nudge-left="15"
          >
            <v-card color="grey lighten-4" width="350">
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn text color="white" @click="selectedOpen = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-toolbar>
              <v-card-text>
                <p class="text-uppercase d-flex align-center">
                  <v-icon small class="mr-1">mdi-shape-outline</v-icon
                  >{{ selectedEvent.category }}
                </p>
                <v-row>
                  <v-col
                    v-if="
                      selectedEvent.papers &&
                      selectedEvent.papers.contributedPapers
                    "
                  >
                    <p>
                      <v-icon class="mr-1">mdi-file-document-outline</v-icon>
                      {{ padNum(selectedEvent.papers.contributedPapers) }}
                      Contributed Papers
                    </p>
                  </v-col>
                  <v-col
                    v-if="
                      selectedEvent.papers &&
                      selectedEvent.papers.symposiumPapers
                    "
                  >
                    <p>
                      <v-icon class="mr-1">mdi-file-document-outline</v-icon>
                      {{ padNum(selectedEvent.papers.symposiumPapers) }}
                      Symposium Papers
                    </p>
                  </v-col>
                  <v-col
                    v-if="
                      selectedEvent.papers && selectedEvent.papers.cognatePapers
                    "
                  >
                    <p>
                      <v-icon class="mr-1">mdi-file-document-outline</v-icon>
                      {{ padNum(selectedEvent.papers.cognatePapers) }}
                      Cognate Society Papers
                    </p>
                  </v-col>
                  <v-col
                    v-if="
                      selectedEvent.papers && selectedEvent.papers.upssPapers
                    "
                  >
                    <p>
                      <v-icon class="mr-1">mdi-file-document-outline</v-icon>
                      {{ padNum(selectedEvent.papers.upssPapers) }}
                      UPSS Papers
                    </p>
                  </v-col>
                </v-row>

                <p
                  style="max-width: 66ch"
                  class="mt-4 mb-0"
                  v-html="selectedEvent.details"
                ></p>
              </v-card-text>
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
    countPapers() {
      const count = this.events.reduce((acc, current) => {
        if (current.papers?.contributedPapers) {
          acc.contributed = acc.contributed
            ? acc.contributed + current.papers.contributedPapers
            : current.papers.contributedPapers;
        }

        if (current.papers?.symposiumPapers) {
          acc.symposiumPapers = acc.symposiumPapers
            ? acc.symposiumPapers + current.papers.symposiumPapers
            : current.papers.symposiumPapers;
        }

        return acc;
      }, {});
      return count;
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