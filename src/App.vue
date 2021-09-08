<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://docs.philsci.net/img/logo-circle-red-on-white.png"
          transition="scale-transition"
          width="40"
        />

        <p class="mb-0 font-weight-bold">Philosophy of Science Association</p>
      </div>

      <v-spacer></v-spacer>
      <v-chip-group>
        <v-tooltip bottom color="pink">
          <template v-slot:activator="{ on, attrs }">
            <v-chip class="mb-0 mr-2" v-bind="attrs" v-on="on" color="pink">
              <v-icon class="mr-1">mdi-account</v-icon>{{ inPersonCount }}
            </v-chip>
          </template>
          <span>In-Person Sessions</span>
        </v-tooltip>

        <v-tooltip bottom color="indigo">
          <template v-slot:activator="{ on, attrs }">
            <v-chip class="mb-0 mr-2" v-bind="attrs" v-on="on" color="indigo">
              <v-icon class="mr-1">mdi-video-account</v-icon>{{ hybridCount }}
            </v-chip>
          </template>
          <span>Hybrid Sessions</span>
        </v-tooltip>

        <v-tooltip bottom color="blue">
          <template v-slot:activator="{ on, attrs }">
            <v-chip class="mb-0 mr-2" v-bind="attrs" v-on="on" color="blue">
              <v-icon class="mr-1">mdi-wifi</v-icon>{{ remoteCount }}
            </v-chip>
          </template>
          <span>Remote Sessions</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip class="mb-0 mr-2" v-bind="attrs" v-on="on">
              <v-icon class="mr-1">mdi-account-edit</v-icon>{{ authors }}
            </v-chip>
          </template>
          <span>Presenters</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip class="mb-0 mr-2" v-bind="attrs" v-on="on">
              <v-icon class="mr-1">mdi-file-document-multiple</v-icon
              >{{ papers }}
            </v-chip>
          </template>
          <span>Papers</span>
        </v-tooltip>
      </v-chip-group>
      <v-btn href="https://psa2020.philsci.org" target="_blank" text>
        <span class="mr-2">PSA 2021</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <MeetingCalendar />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {
  paperCount,
  authorCount,
  inPersonCount,
  remoteCount,
  hybridCount,
} from "./components/calendarData";
import MeetingCalendar from "./components/MeetingCalendar";

export default {
  name: "App",

  components: {
    MeetingCalendar,
  },

  data: () => ({
    papers: paperCount,
    authors: authorCount,
    inPersonCount,
    remoteCount,
    hybridCount,
  }),
};
</script>
