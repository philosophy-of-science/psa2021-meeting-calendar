<template>
  <v-app>
    <v-app-bar app color="#af1f24" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://docs.philsci.net/img/logo-circle-white-on-red-with-black.png"
          transition="scale-transition"
          width="40"
        />

        <p class="mb-0 font-weight-bold">Philosophy of Science Association</p>
      </div>

      <v-spacer></v-spacer>

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
import MeetingCalendar from "./components/MeetingCalendar";

export default {
  name: "App",

  components: {
    MeetingCalendar,
  },

  data: () => ({
    //
  }),
};
</script>
