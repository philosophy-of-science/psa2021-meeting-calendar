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

    <v-row v-if="dialog">
      <v-dialog width="500" v-model="dialog">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ detail.session }}
          </v-card-title>

          <v-card-text class="mt-3">
            <p>
              <v-icon>mdi-calendar</v-icon>
              {{ detail.date }} ({{ detail.start }} - {{ detail.end }})
            </p>
            <p>
              <v-icon>mdi-floor-plan</v-icon>
              {{ detail.location }}
            </p>
            <Track :track="detail.track" />

            <Moderator :mod="detail.mod" :needsMod="detail.needsMod" />
            <Papers :papers="detail.papers" />
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
export default {
  components: {
    Papers,
    Moderator,
    Track,
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
    dialog() {
      return Boolean(this.detail);
    },

    autocompleteDataset() {
      const ds = this.events.reduce((prev, current) => {
        prev.push({
          text: current.name,
          value: current.name,
          session: current.name,
          papers: current.papersAndAuthors,
          mod: current.mod,
          needsMod: current.needsMod,
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
                text: item.title.trim(),
                track: current.track,
                value: item.title.trim(),
                session: current.name,
                papers: current.papersAndAuthors,
                mod: current.mod,
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

      const sorted = ds.sort((a, b) => {
        return a.value > b.value ? 1 : -1;
      });

      return sorted;
    },
  },
};
</script>

<style scoped>
</style>