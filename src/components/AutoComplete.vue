<template>
  <div>
    <v-row>
      <v-autocomplete
        v-model="detail"
        auto-select-first
        clearable
        :items="autocompleteDataset"
        label="Search program"
        :return-object="true"
      ></v-autocomplete>
    </v-row>

    <v-row v-if="detail">
      <v-dialog width="500" v-model="detail">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ detail.session }}
          </v-card-title>

          <v-card-text class="mt-3">
            <p>
              <v-icon dense left>mdi-calendar</v-icon>
              {{ detail.date }} ({{ detail.start }} - {{ detail.end }})
            </p>

            <event-type :icon="detail.icon" :type="detail.category" />

            <Location :location="detail.location" />

            <Track :track="detail.track" />

            <Moderator :mod="detail.mod" :needsMod="detail.needsMod" />
            <Papers :papers="detail.papers" :compare="detail.text" />
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="detail = null"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import Papers from "./Papers.vue";
import Moderator from "./Moderator.vue";
import Track from "./Track.vue";
import Location from "./Location.vue";
import EventType from "./EventType.vue";
export default {
  components: {
    Papers,
    Moderator,
    Track,
    Location,
    EventType,
  },

  props: {
    events: Array,
  },

  data() {
    return {
      detail: null,
    };
  },

  computed: {
    autocompleteDataset() {
      const ds = this.events.reduce((prev, current) => {
        prev.push({
          text: current.name,
          value: current.name,
          session: current.name,
          papers: current.papersAndAuthors,
          mod: current.mod,
          needsMod: current.needsMod,
          category: current.category,
          icon: current.icon,
          type: "title",
          track: current.track,
          date: current.start.toLocaleDateString(undefined, {
            dateStyle: "full",
          }),
          start: current.start.toLocaleTimeString(undefined, {
            timeStyle: "short",
          }),
          end: current.end.toLocaleTimeString(undefined, {
            timeStyle: "short",
          }),
          location: current.location,
        });

        if (current.papersAndAuthors) {
          current.papersAndAuthors.forEach((item) => {
            if (item.author) {
              prev.push({
                text: item.author.trim(),
                track: current.track,
                value: item.author.trim(),
                session: current.name,
                papers: current.papersAndAuthors,
                mod: current.mod,
                needsMod: current.needsMod,
                type: "author",
                category: current.category,
                icon: current.icon,

                date: current.start.toLocaleDateString(undefined, {
                  dateStyle: "full",
                }),
                start: current.start.toLocaleTimeString(undefined, {
                  timeStyle: "short",
                }),
                end: current.end.toLocaleTimeString(undefined, {
                  timeStyle: "short",
                }),
                location: current.location,
              });

              prev.push({
                text: item.title && item.title.trim(),
                track: current.track,
                value: item.title && item.title.trim(),
                session: current.name,
                papers: current.papersAndAuthors,
                icon: current.icon,

                mod: current.mod,
                category: current.category,

                needsMod: current.needsMod,
                type: "title",
                date: current.start.toLocaleDateString(undefined, {
                  dateStyle: "full",
                }),
                start: current.start.toLocaleTimeString(undefined, {
                  timeStyle: "short",
                }),
                end: current.end.toLocaleTimeString(undefined, {
                  timeStyle: "short",
                }),
                location: current.location,
              });
            }
          });
        }
        return prev;
      }, []);

      const filtered = ds
        .filter((item) => {
          return !!item.value;
        })
        .sort((a, b) => (a.value > b.value ? 1 : -1));
      return filtered;
    },
  },
};
</script>

<style scoped>
</style>