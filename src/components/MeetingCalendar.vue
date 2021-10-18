<template>
  <div class="my-5">
    <auto-complete :events="events" />

    <v-row>
      <v-col>
        <v-chip-group>
          <v-chip
            outlined
            v-for="(key, val) in Array.from(catMap)"
            :color="key[1].color"
            :key="val"
            @click="changeCat(key[1].name)"
          >
            <v-icon class="mr-2">{{ key[1].icon }}</v-icon>
            {{ key[1].name }}</v-chip
          >
        </v-chip-group>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-sheet tile height="54" class="d-flex">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn icon class="ma-2" @click="calendarReset">
            <v-icon>mdi-refresh-circle</v-icon>
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

          <v-select
            v-model="mode"
            :items="modes"
            dense
            outlined
            hide-details
            class="ma-2"
            label="Stacking Type"
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
            :categories="selectedCategory"
            :events="events"
            :first-interval="15"
            :interval-minutes="30"
            :interval-count="28"
            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
            @click:event="showEvent"
            :event-overlap-mode="mode"
            :event-ripple="true"
            :category-hide-dynamic="true"
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
                <v-toolbar-title class="d-flex align-center">
                  {{ dateFormat(selectedEvent.start) }} -
                  {{ dateFormat(selectedEvent.end) }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn text color="white" @click="selectedOpen = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-toolbar>
              <v-card-text>
                <p>
                  <strong>{{ selectedEvent.name }}</strong>
                </p>

                <event-type
                  :icon="selectedEvent.icon"
                  :type="selectedEvent.category"
                />

                <Location :location="selectedEvent.location" />

                <div v-show="selectedEvent.details">
                  <p class="mb-3">
                    <v-icon dense left>mdi-text</v-icon>
                    {{ selectedEvent.details }}
                  </p>
                </div>

                <Track :track="selectedEvent.track" />

                <Moderator
                  :mod="selectedEvent.mod"
                  :needsMod="selectedEvent.needsMod"
                />

                <Papers :papers="selectedEvent.papersAndAuthors" />
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { calData, catMap } from "./calendarData";
console.log(calData.filter((e) => /Poster/.exec(e.name)));
import AutoComplete from "./AutoComplete.vue";
import Papers from "./Papers.vue";
import Moderator from "./Moderator.vue";
import Track from "./Track.vue";
import Location from "./Location.vue";
import EventType from "./EventType.vue";
export default {
  components: {
    AutoComplete,
    Papers,
    Moderator,
    Track,
    Location,
    EventType,
  },

  data() {
    return {
      detail: null,
      value: "",
      type: "4day",
      types: ["Month", "Week", "Day", "4day", "Category"],
      category: [],
      events: calData,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      mode: "stack",
      modes: ["stack", "column"],
      catMap: catMap,
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

    selectedCategory() {
      if (this.category === "All" || Array.isArray(this.category)) {
        return Array.from(this.catMap.keys());
      } else {
        return [this.category];
      }
    },
  },

  methods: {
    calendarReset() {
      this.value = "";
      this.mode = "stack";
      this.type = "4day";
    },

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

    changeCat(e) {
      if (e === this.category) {
        this.type = "4day";
        this.category = "All";
        return;
      }
      this.type = "Category";
      this.category = e;
    },

    dateFormat(e) {
      const d = new Date(e);
      return d.toLocaleTimeString(undefined, { timeStyle: "short" });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>